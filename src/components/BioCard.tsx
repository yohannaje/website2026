import { InstagramLogo, Envelope } from "@phosphor-icons/react";

const AVATAR = "https://cdn.cosmos.so/images/c60c8c7a-0609-434a-b980-117c4dbaef66?format=webp&w=300";

export default function BioCard() {
  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "1.75rem", height: "100%",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
    }}>
      {/* Name + avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <img src={AVATAR} alt="Yoh" width={52} height={52} style={{
          width: 52, height: 52, borderRadius: "50%", objectFit: "cover", flexShrink: 0,
        }} />
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 400, lineHeight: 1.1 }}>
            Yoh
          </h1>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 3 }}>
            Visual artist & designer
          </p>
        </div>
      </div>

      {/* Bio */}
      <p style={{ fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300 }}>
        Visual artist, capturing life and sharing thoughts and process along the way.
      </p>

      {/* Social icons */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <a
          href="https://instagram.com/y.h.n.n"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          style={{
            color: "var(--muted)", display: "flex", alignItems: "center",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <InstagramLogo size={20} weight="light" />
        </a>
        <a
          href="mailto:hello@yhnn.com"
          title="Email"
          style={{
            color: "var(--muted)", display: "flex", alignItems: "center",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <Envelope size={20} weight="light" />
        </a>
      </div>
    </div>
  );
}
