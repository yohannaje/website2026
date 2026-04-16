const PLAYLIST_URL =
  "https://music.apple.com/es/playlist/office-dj-japan/pl.a2e8077550014d08a1c9d13d023f259e?l=en";
const EMBED_URL =
  "https://embed.music.apple.com/es/playlist/office-dj-japan/pl.a2e8077550014d08a1c9d13d023f259e?l=en";

export default function MusicCard() {
  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", height: "100%", overflow: "hidden",
      display: "flex", flexDirection: "column",
      minHeight: 300,
    }}>
      {/* Label row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.85rem 1rem 0",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: "0.85rem", lineHeight: 1 }}>♫</span>
          <span style={{
            fontSize: "0.65rem", color: "var(--muted)",
            letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
          }}>
            Playlist
          </span>
        </div>
        <a
          href={PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in Apple Music"
          style={{ color: "var(--muted)", display: "flex", alignItems: "center" }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ opacity: 0.3 }}>
            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6"
              stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Apple Music embed */}
      <div style={{ flex: 1, padding: "0.6rem", overflow: "hidden" }}>
        <iframe
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          frameBorder="0"
          style={{
            width: "100%", height: "100%", border: "none",
            borderRadius: 12, display: "block",
          }}
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src={EMBED_URL}
          title="Office DJ Japan – Apple Music playlist"
        />
      </div>
    </div>
  );
}
