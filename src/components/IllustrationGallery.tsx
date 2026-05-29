import { useEffect, useState } from "react";

const IMAGES = [
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%2010.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%2012.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%2011.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%20copy.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%205.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%206.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%208.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%209.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork111.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%203.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%202.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%204.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%20101.jpg",
  "https://ik.imagekit.io/yhnn/Untitled_Artwork%207.jpg",
];

export default function IllustrationGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % IMAGES.length);
      if (e.key === "ArrowLeft") setLightbox((i) => ((i ?? 0) - 1 + IMAGES.length) % IMAGES.length);
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <section>
      <div className="masonry">
        {IMAGES.map((src, i) => (
          <div key={src} className="masonry-item" onClick={() => setLightbox(i)}>
            <img src={src} alt={`Illustration ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(10,10,8,0.92)",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={lightboxBtn({ top: 18, right: 18, size: 38, font: "1.3rem" })}
          >
            ×
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => ((i ?? 0) - 1 + IMAGES.length) % IMAGES.length);
            }}
            style={lightboxBtn({ left: 16, size: 44, font: "1.4rem" })}
          >
            ‹
          </button>
          <img
            src={IMAGES[lightbox]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "88vw",
              maxHeight: "86vh",
              objectFit: "contain",
              borderRadius: 10,
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => ((i ?? 0) + 1) % IMAGES.length);
            }}
            style={lightboxBtn({ right: 16, size: 44, font: "1.4rem" })}
          >
            ›
          </button>
          <p
            style={{
              position: "absolute",
              bottom: 18,
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
            }}
          >
            {lightbox + 1} / {IMAGES.length}
          </p>
        </div>
      )}
    </section>
  );
}

function lightboxBtn(o: {
  top?: number;
  right?: number;
  left?: number;
  size: number;
  font: string;
}): React.CSSProperties {
  return {
    position: "absolute",
    top: o.top,
    right: o.right,
    left: o.left,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "50%",
    width: o.size,
    height: o.size,
    cursor: "pointer",
    color: "rgba(255,255,255,0.8)",
    fontSize: o.font,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}
