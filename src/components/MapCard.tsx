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
        height: "100%", minHeight: 200,
        border: "1px solid var(--border)",
      }}
    >
      {/* Your custom map image */}
      {/* Centered logo */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--card)",
      }}>
        <img
          src="/logo.svg"
          alt="Córdoba, Spain"
          style={{
            width: "55%",
            height: "55%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* Location pill */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "1rem",
        background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 50%)",
        pointerEvents: "none",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(8px)",
          borderRadius: 24, padding: "5px 10px", width: "fit-content",
        }}>
          <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
            <path d="M5.5 0A4 4 0 001.5 4c0 3.5 4 8.5 4 8.5s4-5 4-8.5A4 4 0 005.5 0z" fill="#e03131"/>
            <circle cx="5.5" cy="4" r="1.4" fill="white"/>
          </svg>
          <span style={{ fontSize: "0.68rem", fontWeight: 500, color: "#1c1c1a", letterSpacing: "0.01em" }}>
            Córdoba, Spain
          </span>
        </div>
      </div>
    </div>
  );
}
