const LAT = 37.8882, LNG = -4.7794;

export default function MapCard() {
  const openMaps = () => {
    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    window.open(
      isMac
        ? `https://maps.apple.com/?ll=${LAT},${LNG}&q=C%C3%B3rdoba,+Spain&t=m`
        : `https://www.google.com/maps?q=${LAT},${LNG}`,
      "_blank"
    );
  };

  return (
    <div
      onClick={openMaps}
      style={{
        borderRadius: "var(--radius)", overflow: "hidden",
        position: "relative", cursor: "pointer",
        height: "100%",
      }}
    >
      <img
        src="/map.jpg"
        alt="Córdoba, Spain"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          display: "block",
        }}
      />

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "2.5rem 0.9rem 0.9rem",
        background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(8px)",
            borderRadius: 24, padding: "4px 9px",
          }}>
            <span style={{ fontSize: "0.75rem", lineHeight: 1 }}>📍</span>
            <span style={{ fontSize: "0.65rem", fontWeight: 500, color: "#1c1c1a", letterSpacing: "0.01em" }}>
              Córdoba, Spain
            </span>
          </div>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ opacity: 0.75 }}>
            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
