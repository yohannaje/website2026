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
        Designer, maker, and visual artist chasing movement and shape. Fueled by 🇦🇷 mate, bouldering, soaking up the sun and two cats who definitely run the studio.
      </p>
    </div>
  );
}
