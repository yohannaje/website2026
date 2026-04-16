export default function BioCard() {
  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "1.75rem 2rem",
      height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <img
        src="https://cdn.cosmos.so/images/c60c8c7a-0609-434a-b980-117c4dbaef66?format=webp&w=300"
        alt="Yoh"
        style={{
          width: 44, height: 44, borderRadius: "50%",
          objectFit: "cover", marginBottom: "0.9rem", display: "block",
        }}
      />
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
