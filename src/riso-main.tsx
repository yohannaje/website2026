import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RisoSimulator from "@/components/RisoSimulator";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="riso-standalone">
      <RisoSimulator maxPreview={2000} />
    </div>
  </StrictMode>,
);
