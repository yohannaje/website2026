import BioCard from "@/components/BioCard";
import BlogCard from "@/components/BlogCard";
import CosmosCard from "@/components/CosmosCard";
import MapCard from "@/components/MapCard";
import ClockCard from "@/components/ClockCard";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

const cell = (col: number): React.CSSProperties => ({
  gridColumn: `span ${col}`,
});

export default function App() {
  return (
    <main style={{ maxWidth: 940, margin: "0 auto", padding: "2.5rem 1.25rem 5rem" }}>

      {/* ── Bento grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "minmax(200px, auto)",
        gap: "0.6rem",
      }}>
        {/* Row 1: Bio(2) · Cosmos(1) · Map(1) */}
        <div style={cell(2)}><BioCard /></div>
        <div style={cell(1)}><CosmosCard /></div>
        <div style={cell(1)}><MapCard /></div>

        {/* Row 2: Blog(2) · Clock(1) · empty(1) */}
        <div style={cell(2)}><BlogCard /></div>
        <div style={cell(1)}><ClockCard /></div>
        <div style={cell(1)} />

        {/* Row 3: Project 1(2) · Project 2(2) */}
        <div style={{ gridColumn: "1 / span 2" }}><ProjectCard {...PROJECTS[0]} /></div>
        <div style={{ gridColumn: "3 / span 2" }}><ProjectCard {...PROJECTS[1]} /></div>

        {/* Row 4: Project 3(2) */}
        <div style={cell(2)}><ProjectCard {...PROJECTS[2]} /></div>
      </div>

      {/* ── Footer ── */}
      <footer style={{
        marginTop: "3rem", paddingTop: "1.25rem",
        borderTop: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>© {new Date().getFullYear()} Yoh</span>
        <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>Córdoba, Spain</span>
      </footer>
    </main>
  );
}
