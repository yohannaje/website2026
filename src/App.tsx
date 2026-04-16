import Header from "@/components/Header";
import BioCard from "@/components/BioCard";
import BlogCard from "@/components/BlogCard";
import CosmosCard from "@/components/CosmosCard";
import MapCard from "@/components/MapCard";
import ClockCard from "@/components/ClockCard";
import GatosCard from "@/components/GatosCard";
import ArtCard from "@/components/ArtCard";
import DosGatosCard from "@/components/DosGatosCard";
import PuzzleCard from "@/components/PuzzleCard";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

export default function App() {
  return (
    <main className="page-main">
      <Header />

      <div className="bento-grid">
        {/* Row 1: Bio(2) · Cosmos(1) · Map(1) */}
        <div className="s2 cell-full"><BioCard /></div>
        <div className="s1 cell-img"><CosmosCard /></div>
        <div className="s1 cell-img"><MapCard /></div>

        {/* Row 2: Clock(1) · Gatos(1) · Blog(2) */}
        <div className="s1 cell-img"><ClockCard /></div>
        <div className="s1 cell-img"><GatosCard /></div>
        <div className="s2 cell-full"><BlogCard /></div>

        {/* Row 3: Art(1) · DosGatos brand(2) · Puzzle(1) */}
        <div className="s1 cell-img"><ArtCard /></div>
        <div className="s2 cell-full"><DosGatosCard /></div>
        <div className="s1 cell-img"><PuzzleCard /></div>

        {/* Row 4: Project(2) · Project(2) */}
        <div className="s2 cell-full"><ProjectCard {...PROJECTS[0]} /></div>
        <div className="s2 cell-full"><ProjectCard {...PROJECTS[1]} /></div>
      </div>

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
