export interface RssPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  thumbnail?: string;
}

const SUBSTACK_BASE = "https://yhnn.substack.com";

async function proxyFetch(url: string): Promise<string | null> {
  try {
    const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxy);
    return res.ok ? res.text() : null;
  } catch {
    return null;
  }
}

function parseRss(xml: string): RssPost[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  return items.slice(0, 4).map((m) => {
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
  const slugs = [...new Set([...archiveHtml.matchAll(slugRe)].map((m) => m[1]))].slice(0, 1);
  if (!slugs.length) return [];

  const postUrl = `${SUBSTACK_BASE}/p/${slugs[0]}`;
  const postHtml = await proxyFetch(postUrl);
  if (!postHtml) return [];

  const og = (prop: string) =>
    postHtml.match(new RegExp(`property="${prop}"\\s+content="([^"]+)"`))?.[1] ??
    postHtml.match(new RegExp(`content="([^"]+)"\\s+property="${prop}"`))?.[1] ?? "";

  const published =
    postHtml.match(/property="article:published_time"\s+content="([^"]+)"/)?.[1] ?? "";

  const title = og("og:title");
  if (!title) return [];

  return [{
    title,
    link: postUrl,
    pubDate: published,
    contentSnippet: og("og:description").slice(0, 160),
    thumbnail: og("og:image") || undefined,
  }];
}

export async function fetchLatestPost(): Promise<RssPost | null> {
  try {
    const feedXml = await proxyFetch(`${SUBSTACK_BASE}/feed`);
    if (feedXml) {
      const posts = parseRss(feedXml);
      if (posts.length > 0) return posts[0];
    }
    const archive = await fromArchive();
    return archive[0] ?? null;
  } catch {
    return null;
  }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  } catch {
    return "";
  }
}
