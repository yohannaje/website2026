import { useEffect, useState } from "react";
import { fetchCosmosImages, cosmosUrl } from "@/lib/cosmos";

// Seed with a known good image so it renders immediately — no loading flash
// Using the /images/ prefix format which most CDN images require
const FIRST_IMAGE = cosmosUrl("images/d7f54426-79ba-472b-b50b-3803ca149879");

export default function CosmosCard() {
  const [imageUrl, setImageUrl] = useState(FIRST_IMAGE);

  // Fetch in the background to get the actual latest image
  useEffect(() => {
    fetchCosmosImages("yhnna", 1).then((imgs) => {
      if (imgs[0]) setImageUrl(imgs[0]);
    });
  }, []);

  return (
    <a href="https://cosmos.so/yhnna" target="_blank" rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div style={{
        borderRadius: "var(--radius)",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        // Explicit height so the img fills it correctly
        height: "100%",
        minHeight: 200,
        background: "#e8e1d8",
      }}>
        <img
          src={imageUrl}
          alt="Latest from Cosmos"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={() => setImageUrl(FIRST_IMAGE)}
        />

        {/* Label overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "2.5rem 0.9rem 0.9rem",
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.88)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
              cosmos
            </span>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ opacity: 0.75 }}>
              <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
