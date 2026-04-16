export default function GatosCard() {
  return (
    <div style={{
      borderRadius: "var(--radius)",
      overflow: "hidden",
      position: "relative",
      height: "100%",
      background: "#d6cfc4",
    }}>
      <img
        src="/gatos.jpg"
        alt="Donnie & Sagan"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Label — no link, just the cats' names */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "2.5rem 0.9rem 0.9rem",
        background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
      }}>
        <span style={{
          fontSize: "0.7rem", color: "rgba(255,255,255,0.88)",
          letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500,
        }}>
          Donnie &amp; Sagan
        </span>
      </div>
    </div>
  );
}
