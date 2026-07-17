import { useState } from "react";
import Topbar, { type Tab } from "@/components/Topbar";
import IllustrationGallery from "@/components/IllustrationGallery";
import AboutPage from "@/components/AboutPage";
import ComingSoonPage from "@/components/ComingSoonPage";

export default function App() {
  const [tab, setTab] = useState<Tab>("work");

  return (
    <div className="layout">
      <Topbar active={tab} onSelect={setTab} />

      <main className="content">
        {tab === "work" && <IllustrationGallery />}
        {tab === "shop" && (
          <ComingSoonPage
            label="Shop"
            sub="Limited-edition prints and originals will live here. Drop a note if you'd like to know when it opens."
          />
        )}
        {tab === "about" && <AboutPage />}
      </main>
    </div>
  );
}
