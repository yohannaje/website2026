const ROW_H = 58;

const JOBS = [
  { title: "Principal Designer @ Zuplo", period: "2025 – Present" },
  { title: "Principal Designer @ Arcarta", period: "2022 – 2024" },
  { title: "UX Lead @ Dtail Studio", period: "2021 – 2022" },
];

export default function WorkCard() {
  return (
    <a
      href="https://www.linkedin.com/in/yhnn/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
    >
      <div style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", overflow: "hidden",
        display: "flex", flexDirection: "column",
        height: "100%",
        minHeight: ROW_H * 3 + 2 + 38,
      }}>
        {JOBS.map((job, i) => (
          <div key={job.title}>
            <div style={{
              height: ROW_H,
              display: "flex", alignItems: "center",
              padding: "0 0.9rem",
              gap: 10,
              transition: "background 0.12s",
            }}>
              <span style={{
                fontFamily: "var(--font-serif-reading)",
                fontSize: "0.92rem",
                color: "var(--text)",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                flex: 1,
              }}>
                {job.title}
              </span>
              <span style={{
                fontSize: "0.72rem",
                color: "var(--muted)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}>
                {job.period}
              </span>
            </div>
            {i < JOBS.length - 1 && <div style={{ height: 1, background: "var(--border)" }} />}
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
            Latest Work
          </span>
          <span style={{ fontSize: "0.68rem", color: "var(--muted)" }}>
            linkedin.com/in/yhnn
          </span>
        </div>
      </div>
    </a>
  );
}
