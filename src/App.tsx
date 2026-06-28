import { useState } from "react";
import Sidebar, { type Tab } from "@/components/Sidebar";
import BioCard from "@/components/BioCard";
import PlaygroundCard from "@/components/PlaygroundCard";
import CosmosCard from "@/components/CosmosCard";
import MapCard from "@/components/MapCard";
import ClockCard from "@/components/ClockCard";
import GatosCard from "@/components/GatosCard";
import PuzzleCard from "@/components/PuzzleCard";
import InstagramCard from "@/components/InstagramCard";
import WorkCard from "@/components/WorkCard";
import IllustrationGallery from "@/components/IllustrationGallery";
import ComingSoonPage from "@/components/ComingSoonPage";

export default function App() {
  const [tab, setTab] = useState<Tab>("illustration");

  return (
    <div className="layout">
      <Sidebar active={tab} onSelect={setTab} />

      <main className="content">
        {tab === "illustration" && <IllustrationGallery />}
        {tab === "shop" && (
          <ComingSoonPage
            label="Shop"
            sub="Limited-edition prints and originals will live here. Drop a note if you'd like to know when it opens."
          />
        )}
        {tab === "about" && <AboutBento />}
      </main>
    </div>
  );
}

function AboutBento() {
  return (
    <div className="bento-grid">
      {/* Row 1: Bio(2) · Cosmos(1) · Map(1) */}
      <div className="s2 cell-full"><BioCard /></div>
      <div className="s1 cell-img"><CosmosCard /></div>
      <div className="s1 cell-img"><MapCard /></div>

      {/* Row 2: Clock(1) · Gatos(1) · Blog(2) */}
      <div className="s1 cell-img"><ClockCard /></div>
      <div className="s1 cell-img"><GatosCard /></div>
      <div className="s2 cell-full"><PlaygroundCard /></div>

      {/* Row 3: Instagram(1) · Work(2) · Puzzle(1) */}
      <div className="s1 cell-img"><InstagramCard /></div>
      <div className="s2 cell-full"><WorkCard /></div>
      <div className="s1 cell-img"><PuzzleCard /></div>
    </div>
  );
}
