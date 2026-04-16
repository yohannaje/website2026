import { useState, useCallback, useEffect } from "react";

const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const IMAGE = "/puzzle.jpg";

function isSolvable(tiles: number[]): boolean {
  const arr = tiles.filter((t) => t !== 0);
  let inversions = 0;
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] > arr[j]) inversions++;
  return inversions % 2 === 0;
}

function shuffle(): number[] {
  let tiles: number[];
  do {
    tiles = [...SOLVED].sort(() => Math.random() - 0.5);
  } while (!isSolvable(tiles) || tiles.join() === SOLVED.join());
  return tiles;
}

function tileBg(v: number): React.CSSProperties {
  const pos = v - 1;
  const col = pos % 3;
  const row = Math.floor(pos / 3);
  return {
    backgroundImage: `url(${IMAGE})`,
    backgroundSize: "300% 300%",
    backgroundPosition: `${col * 50}% ${row * 50}%`,
    backgroundRepeat: "no-repeat",
  };
}

export default function PuzzleCard() {
  const [tiles, setTiles] = useState<number[]>(shuffle);
  const [imgOk, setImgOk] = useState<boolean | null>(null);
  const solved = tiles.join() === SOLVED.join();

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImgOk(true);
    img.onerror = () => setImgOk(false);
    img.src = IMAGE;
  }, []);

  const move = useCallback((idx: number) => {
    setTiles((prev) => {
      const empty = prev.indexOf(0);
      const r = (i: number) => Math.floor(i / 3);
      const c = (i: number) => i % 3;
      const adj =
        (r(idx) === r(empty) && Math.abs(c(idx) - c(empty)) === 1) ||
        (c(idx) === c(empty) && Math.abs(r(idx) - r(empty)) === 1);
      if (!adj) return prev;
      const next = [...prev];
      [next[idx], next[empty]] = [next[empty], next[idx]];
      return next;
    });
  }, []);

  const useImg = imgOk === true;

  return (
    <div
      style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", height: "100%",
        display: "flex", flexDirection: "column",
        padding: "0.55rem",
        overflow: "hidden",
        cursor: solved ? "pointer" : "default",
      }}
      onClick={() => { if (solved) setTiles(shuffle()); }}
      title={solved ? "Click to play again" : undefined}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 3,
        width: "100%",
        flex: 1,
      }}>
        {tiles.map((tile, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); if (tile !== 0) move(idx); }}
            style={{
              ...(tile !== 0 && useImg ? tileBg(tile) : {}),
              backgroundColor: tile === 0
                ? "transparent"
                : useImg
                  ? "transparent"
                  : solved ? "var(--text)" : "var(--bg)",
              border: tile === 0 ? "none" : `1px solid var(--border)`,
              borderRadius: 6,
              cursor: tile === 0 ? "default" : "pointer",
              fontFamily: "var(--font-serif)",
              fontSize: "0.9rem",
              color: solved && !useImg ? "#fff" : "var(--text)",
              display: "flex", alignItems: "center", justifyContent: "center",
              aspectRatio: "1/1",
              width: "100%",
              padding: 0,
              overflow: "hidden",
              transition: "opacity 0.1s",
            }}
            onMouseEnter={(e) => { if (tile !== 0) e.currentTarget.style.opacity = "0.8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            {tile !== 0 && !useImg ? tile : null}
          </button>
        ))}
      </div>
    </div>
  );
}
