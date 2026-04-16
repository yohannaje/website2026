export interface RssPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  thumbnail?: string;
}

const SUBSTACK_BASE = "https://yhnn.substack.com";
const CACHE_KEY = "blog_posts_v2";
const CACHE_TTL = 30 * 60 * 1000;

interface CacheEntry {
  posts: RssPost[];
  fetchedAt: number;
}

export function getCachedPosts(): RssPost[] | undefined {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return undefined;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.fetchedAt > CACHE_TTL) return undefined;
    return entry.posts;
  } catch {
    return undefined;
  }
}

function setCachedPosts(posts: RssPost[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ posts, fetchedAt: Date.now() }));
  } catch {}
}

const PROXIES: ((url: string) => string)[] = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

async function proxyFetch(url: string): Promise<string | null> {
  for (const proxy of PROXIES) {
    try {
      const res = await fetch(proxy(url), { signal: AbortSignal.timeout(6000) });
      if (res.ok) return res.text();
    } catch { /* try next */ }
  }
  return null;
}

function parseRss(xml: string): RssPost[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  return items.slice(0, 3).map((m) => {
    const item = m[1];
    const title =
      item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ??
      item.match(/<title>(.*?)<\/title>/)?.[1] ?? "Untitled";
    const link =
      item.match(/<link>(.*?)<\/link>/)?.[1] ??
      item.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1] ?? "#";
    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "";
    const raw =
      item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ?? "";
    const contentSnippet = raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
    const thumbnail = raw.match(/<img[^>]+src=["']([^"']+)["']/)?.[1];
    return { title, link, pubDate, contentSnippet, thumbnail };
  });
}

async function fromArchive(): Promise<RssPost[]> {
  const archiveHtml = await proxyFetch(`${SUBSTACK_BASE}/archive`);
  if (!archiveHtml) return [];
  const slugRe = new RegExp(`${SUBSTACK_BASE}/p/([^"?#/]+)`, "g");
  const slugs = [...new Set([...archiveHtml.matchAll(slugRe)].map((m) => m[1]))].slice(0, 3);
  const posts = await Promise.all(slugs.map(async (slug) => {
    const postUrl = `${SUBSTACK_BASE}/p/${slug}`;
    const html = await proxyFetch(postUrl);
    if (!html) return null;
    const og = (prop: string) =>
      html.match(new RegExp(`property="${prop}"\\s+content="([^"]+)"`))?.[1] ??
      html.match(new RegExp(`content="([^"]+)"\\s+property="${prop}"`))?.[1] ?? "";
    const title = og("og:title");
    if (!title) return null;
    const published = html.match(/property="article:published_time"\s+content="([^"]+)"/)?.[1] ?? "";
    return { title, link: postUrl, pubDate: published, contentSnippet: og("og:description").slice(0, 160) };
  }));
  return posts.filter(Boolean) as RssPost[];
}

export async function fetchLatestPosts(): Promise<RssPost[]> {
  try {
    const feedXml = await proxyFetch(`${SUBSTACK_BASE}/feed`);
    if (feedXml) {
      const posts = parseRss(feedXml);
      if (posts.length > 0) { setCachedPosts(posts); return posts; }
    }
    const archive = await fromArchive();
    if (archive.length > 0) setCachedPosts(archive);
    return archive;
  } catch {
    return [];
  }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return ""; }
}
