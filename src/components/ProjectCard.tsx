import type { Project } from "@/data/projects";

export default function ProjectCard({ name, description, url, thumbnail, accent = "#f0ede8" }: Project) {
  const domain = (() => { try { return new URL(url).hostname.replace("www.", ""); } catch { return url; } })();
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", height: "100%", overflow: "hidden",
        display: "flex", flexDirection: "column", cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
      >
        {/* Preview area */}
        <div style={{ flex: 1, background: accent, overflow: "hidden", position: "relative", minHeight: 130 }}>
          {thumbnail ? (
            <img src={thumbnail} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "75%", background: "white", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.09)" }}>
                <div style={{ background: "#f5f4f1", padding: "7px 10px", display: "flex", alignItems: "center", gap: 5, borderBottom: "1px solid #e8e7e3" }}>
                  {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                  <div style={{ flex: 1, marginLeft: 6, background: "#ebe9e4", borderRadius: 4, height: 8 }} />
                </div>
                <div style={{ padding: "14px 12px" }}>
                  {[["70%","7px"],["90%","5px"],["60%","5px"]].map(([w,h],i) => (
                    <div key={i} style={{ height: h, background: i === 0 ? "#ebe9e4" : "#f0ede8", borderRadius: 3, marginBottom: i < 2 ? 6 : 0, width: w }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Info */}
        <div style={{ padding: "0.85rem 1rem", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.3 }}>{name}</p>
            <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: 2 }}>{description}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, marginLeft: 8 }}>
            <span style={{ fontSize: "0.68rem", color: "var(--muted)" }}>{domain}</span>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ opacity: 0.3 }}>
              <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
