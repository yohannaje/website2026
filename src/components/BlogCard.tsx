import { useEffect, useState } from "react";
import { fetchLatestPosts, getCachedPosts, type RssPost } from "@/lib/rss";

const ROW_H = 58; // px — 3 rows + footer fits inside 220px desktop height

const Arrow = ({ muted }: { muted?: boolean }) => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
    style={{ flexShrink: 0, opacity: muted ? 0.2 : 0.75 }}>
    <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6"
      stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function PostRow({ post, placeholder }: { post?: RssPost; placeholder?: boolean }) {
  const inner = (
    <>
      <span style={{
        fontFamily: "var(--font-serif-reading)",
        fontSize: "0.92rem",
        color: placeholder ? "var(--muted)" : "var(--text)",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        flex: 1,
      }}>
        {placeholder ? "Coming soon.." : post?.title}
      </span>
      <Arrow muted={placeholder} />
    </>
  );

  const rowStyle: React.CSSProperties = {
    height: ROW_H,
    display: "flex", alignItems: "center",
    padding: "0 0.9rem",
    gap: 10,
    textDecoration: "none",
    color: "inherit",
    transition: "background 0.12s",
  };

  if (!placeholder && post) {
    return (
      <a href={post.link} target="_blank" rel="noopener noreferrer"
        style={rowStyle}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        {inner}
      </a>
    );
  }

  return <div style={rowStyle}>{inner}</div>;
}

export default function BlogCard() {
  const cached = getCachedPosts();
  const [posts, setPosts] = useState<RssPost[]>(cached ?? []);
  const [ready, setReady] = useState(!!cached);

  useEffect(() => {
    fetchLatestPosts().then((fresh) => {
      if (fresh.length > 0) setPosts(fresh);
      setReady(true);
    });
  }, []);

  const rows: (RssPost | null)[] = [
    posts[0] ?? null,
    posts[1] ?? null,
    posts[2] ?? null,
  ];

  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", overflow: "hidden",
      display: "flex", flexDirection: "column",
      // height: 100% works on desktop (220px row); on mobile card sizes from content
      minHeight: ROW_H * 3 + 2 + 38, // 3 rows + 2 dividers + footer
    }}>
      {/* Post rows */}
      {rows.map((post, i) => (
        <div key={i}>
          <PostRow
            post={post ?? undefined}
            placeholder={ready && !post}
          />
          {i < 2 && <div style={{ height: 1, background: "var(--border)" }} />}
        </div>
      ))}

      {/* Footer — same 0.9rem side padding as all other card labels/arrows */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "0.6rem 0.9rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: "auto",
      }}>
        <span style={{
          fontSize: "0.6rem", color: "var(--muted)",
          letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500,
        }}>
          Latest Thoughts
        </span>
        <a
          href="https://yhnn.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.68rem", color: "var(--muted)", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          yhnn.substack.com
        </a>
      </div>
    </div>
  );
}
