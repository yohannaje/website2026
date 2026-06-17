const ROW_H = 58;

const PROJECTS = [
  { title: "Pocket Zine", url: "https://pocketzineclub.com", logo: "/pocketzine.svg" },
  { title: "Dos Gatos Press", url: "https://www.dosgatos.press", logo: "/dosgatos.svg" },
  { title: "GIF Maker", url: "https://yohannaje.github.io/gifmaker/", logo: "/gifmaker.svg" },
];

const Arrow = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
    style={{ flexShrink: 0, opacity: 0.75 }}>
    <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6"
      stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Row({ project }: { project: typeof PROJECTS[number] }) {
  const inner = (
    <>
      {project.logo ? (
        <img src={project.logo} alt={project.title}
          style={{ height: 24, width: "auto", flexShrink: 0 }} />
      ) : (
        <span style={{
          fontFamily: "var(--font-serif-reading)",
          fontSize: "0.92rem",
          color: "var(--text)",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          flex: 1,
        }}>
          {project.title}
        </span>
      )}
      {project.logo && <span style={{ flex: 1 }} />}
      {project.url ? <Arrow /> : (
        <span style={{
          fontSize: "0.65rem",
          color: "var(--muted)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>
          Coming soon
        </span>
      )}
    </>
  );

  const rowStyle: React.CSSProperties = {
    height: ROW_H,
    display: "flex", alignItems: "center",
    padding: "0 0.9rem",
    gap: 10,
    textDecoration: "none",
    color: "inherit",
    transition: "background 0.12s",
  };

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer"
        style={rowStyle}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        {inner}
      </a>
    );
  }

  return <div style={rowStyle}>{inner}</div>;
}

export default function PlaygroundCard() {
  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", overflow: "hidden",
      display: "flex", flexDirection: "column",
      minHeight: ROW_H * 3 + 2 + 38,
    }}>
      {PROJECTS.map((p, i) => (
        <div key={p.title}>
          <Row project={p} />
          {i < PROJECTS.length - 1 && <div style={{ height: 1, background: "var(--border)" }} />}
        </div>
      ))}

      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "0.6rem 0.9rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: "auto",
      }}>
        <span style={{
          fontSize: "0.6rem", color: "var(--muted)",
          letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500,
        }}>
          Active Projects
        </span>
        <span style={{ fontSize: "0.68rem", color: "var(--muted)" }}>
          2024–2026
        </span>
      </div>
    </div>
  );
}
