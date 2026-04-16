import { useState } from "react";
import { Envelope, InstagramLogo } from "@phosphor-icons/react";

export default function Header() {
  const [shopHover, setShopHover] = useState(false);

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1.5rem",
    }}>
      {/* Logo */}
      <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="/logo.png" alt="Yoh" style={{ height: 30, width: "auto", display: "block" }} />
      </a>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {/* Shop — coming soon tooltip */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setShopHover(true)}
          onMouseLeave={() => setShopHover(false)}
        >
          <span style={{
            fontSize: "0.8rem", color: "var(--muted)",
            cursor: "default", letterSpacing: "0.01em",
          }}>
            Shop
          </span>
          {shopHover && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--text)",
              color: "var(--bg)",
              fontSize: "0.65rem",
              padding: "5px 10px",
              borderRadius: 8,
              whiteSpace: "nowrap",
              zIndex: 10,
              pointerEvents: "none",
            }}>
              Coming soon
            </div>
          )}
        </div>

        {/* Contact */}
        <a
          href="mailto:yohanna.j.e@gmail.com"
          title="Contact"
          style={{ color: "var(--muted)", display: "flex", alignItems: "center", transition: "color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <Envelope size={18} weight="light" />
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/y.h.n.n"
          target="_blank"
          rel="noopener noreferrer"
          title="@y.h.n.n"
          style={{ color: "var(--muted)", display: "flex", alignItems: "center", transition: "color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <InstagramLogo size={18} weight="light" />
        </a>
      </nav>
    </header>
  );
}
