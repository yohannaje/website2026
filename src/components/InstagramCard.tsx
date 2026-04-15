// Instagram's API requires OAuth for post feeds — can't be done without a token.
// For a future upgrade: store an Instagram Basic Display API token in .env
// and use it to fetch your latest post. For now this is a clean link card.
const HANDLE = "y.h.n.n";

export default function InstagramCard() {
  return (
    <a href={`https://instagram.com/${HANDLE}`} target="_blank" rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div style={{
        height: "100%", minHeight: 200, borderRadius: "var(--radius)",
        overflow: "hidden", cursor: "pointer", border: "1px solid var(--border)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 10, position: "relative",
        background: "linear-gradient(145deg, #fef6f0 0%, #fce8f3 55%, #ede9fc 100%)",
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="28" height="28" rx="7.5" stroke="url(#ig)" strokeWidth="2" />
          <circle cx="16" cy="16" r="6.2" stroke="url(#ig)" strokeWidth="2" />
          <circle cx="23.2" cy="8.8" r="1.6" fill="url(#ig)" />
          <defs>
            <linearGradient id="ig" x1="2" y1="30" x2="30" y2="2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f9ce34" />
              <stop offset="0.5" stopColor="#ee2a7b" />
              <stop offset="1" stopColor="#6228d7" />
            </linearGradient>
          </defs>
        </svg>
        <p style={{ fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.01em" }}>@{HANDLE}</p>
      </div>
    </a>
  );
}
