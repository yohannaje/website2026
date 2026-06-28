export default function BioCard() {
  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "1.75rem 2rem",
      height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <p style={{
        fontFamily: "var(--font-serif-reading)",
        fontSize: "1.05rem",
        lineHeight: 1.75,
        fontWeight: 400,
        color: "var(--text)",
        maxWidth: 380,
      }}>
        Welcome to my digital garden — a space to share who I am and some of the things I do.
      </p>
    </div>
  );
}
