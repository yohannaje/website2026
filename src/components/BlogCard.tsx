import { useEffect, useState } from "react";
import { fetchLatestPost, formatDate, type RssPost } from "@/lib/rss";

export default function BlogCard() {
  const [post, setPost] = useState<RssPost | null | "loading">("loading");

  useEffect(() => {
    fetchLatestPost().then(setPost);
  }, []);

  const ArrowIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.3 }}>
      <path d="M2 10L10 2M10 2H4M10 2v6" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const Label = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect width="14" height="14" rx="3" fill="#FF6719" />
          <path d="M2.5 4h9M2.5 7h9M2.5 10.5l4.5-2 4.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: "0.68rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
          Latest post
        </span>
      </div>
      <ArrowIcon />
    </div>
  );

  const href = post && post !== "loading" ? post.link : "https://yhnn.substack.com";

  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", height: "100%", overflow: "hidden",
        cursor: "pointer", display: "flex", flexDirection: "column",
      }}>
        {post === "loading" ? (
          <div style={{ padding: "1.4rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Label />
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <div style={{ width: "60%", height: 12, background: "var(--border)", borderRadius: 6 }} />
            </div>
          </div>
        ) : post ? (
          <>
            <div style={{ padding: "1.25rem 1.4rem 1.4rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <Label />
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", lineHeight: 1.35, marginBottom: 8 }}>
                  {post.title}
                </p>
                {post.contentSnippet && (
                  <p style={{
                    fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.6,
                    display: "-webkit-box", WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                  } as React.CSSProperties}>
                    {post.contentSnippet}
                  </p>
                )}
              </div>
              <p style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: 12 }}>
                {formatDate(post.pubDate)}
              </p>
            </div>
          </>
        ) : (
          <div style={{ padding: "1.5rem 1.4rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Label />
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.6 }}>
              Writing soon — thoughts on art, process, and life.
            </p>
            <p style={{ fontSize: "0.72rem", color: "var(--muted)" }}>yhnn.substack.com</p>
          </div>
        )}
      </div>
    </a>
  );
}
