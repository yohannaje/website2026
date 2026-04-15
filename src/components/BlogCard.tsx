import { useEffect, useState } from "react";
import { fetchLatestPost, getCachedPost, formatDate, type RssPost } from "@/lib/rss";

export default function BlogCard() {
  const cached = getCachedPost();
  const [post, setPost] = useState<RssPost | null | "loading">(
    cached !== undefined ? cached : "loading"
  );

  useEffect(() => {
    if (cached !== undefined) {
      fetchLatestPost().then((fresh) => {
        if (fresh && (post === null || post === "loading" || fresh.link !== (post as RssPost)?.link)) {
          setPost(fresh);
        }
      });
      return;
    }
    fetchLatestPost().then(setPost);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const href = post && post !== "loading" ? post.link : "https://yhnn.substack.com";

  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", height: "100%", overflow: "hidden",
        cursor: "pointer", display: "flex", flexDirection: "column",
        padding: "1.1rem 1.25rem",
      }}>
        {/* Label — no arrow here */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.75rem", flexShrink: 0 }}>
          <span style={{ fontSize: "1rem", lineHeight: 1 }}>📓</span>
          <span style={{
            fontSize: "0.65rem", color: "var(--muted)",
            letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
          }}>
            Latest thoughts
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {post === "loading" ? (
            <div style={{ width: "55%", height: 11, background: "var(--border)", borderRadius: 6 }} />
          ) : post ? (
            <>
              <p style={{
                fontFamily: "var(--font-serif)", fontSize: "0.95rem",
                lineHeight: 1.35, marginBottom: 5,
                display: "-webkit-box", WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical", overflow: "hidden",
              } as React.CSSProperties}>
                {post.title}
              </p>
              {post.contentSnippet && (
                <p style={{
                  fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.55,
                  display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical", overflow: "hidden",
                } as React.CSSProperties}>
                  {post.contentSnippet}
                </p>
              )}
            </>
          ) : (
            <p style={{
              fontFamily: "var(--font-serif)", fontSize: "0.95rem",
              fontStyle: "italic", lineHeight: 1.5,
            }}>
              Writing soon — thoughts on art, process, and life.
            </p>
          )}
        </div>

        {/* Bottom: date + arrow */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "0.75rem", flexShrink: 0,
        }}>
          <span style={{ fontSize: "0.68rem", color: "var(--muted)" }}>
            {post && post !== "loading" && post.pubDate
              ? formatDate(post.pubDate)
              : "yhnn.substack.com"}
          </span>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ opacity: 0.3 }}>
            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </a>
  );
}
