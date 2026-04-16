export default function DosGatosCard() {
  return (
    <a
      href="https://wearedosgatos.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <div style={{
        background: "#E55028",
        borderRadius: "var(--radius)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "0.9rem",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* EST · 2023 top corners */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>EST</span>
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>2023</span>
        </div>

        {/* Centre: wordmark */}
        <div style={{ textAlign: "center", padding: "0 1rem" }}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1,
            marginBottom: "0.35rem",
          }}>
            Dos Gatos
          </h2>
          <p style={{
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.04em",
          }}>
            Press &amp; Zines
          </p>
        </div>

        {/* Bottom: label + arrow — same pattern as Cosmos/Map/Art */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontSize: "0.65rem", color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
          }}>
            Independent Press
          </span>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ opacity: 0.7 }}>
            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6"
              stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </a>
  );
}
