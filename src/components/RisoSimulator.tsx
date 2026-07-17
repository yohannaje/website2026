import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RISO_INKS, findInkIndex, rgbToHex } from "@/lib/risoColors";

type ChannelKey = "C" | "M" | "Y" | "K";

interface ChannelCfg {
  enabled: boolean;
  inkIndex: number;     // index into RISO_INKS (-1 = custom)
  customHex: string;    // used when inkIndex === -1
}

const DEFAULTS: Record<ChannelKey, ChannelCfg> = {
  C: { enabled: true, inkIndex: findInkIndex("Blue"), customHex: "#0078bf" },
  M: { enabled: true, inkIndex: findInkIndex("Fluorescent Pink"), customHex: "#ff48b0" },
  Y: { enabled: true, inkIndex: findInkIndex("Yellow"), customHex: "#ffe800" },
  K: { enabled: true, inkIndex: findInkIndex("Black"), customHex: "#000000" },
};

const CHANNELS: ChannelKey[] = ["C", "M", "Y", "K"];
const CHANNEL_LABEL: Record<ChannelKey, string> = {
  C: "Cyan", M: "Magenta", Y: "Yellow", K: "Black",
};

const DEFAULT_MAX_PREVIEW = 1100;

function inkColor(cfg: ChannelCfg): [number, number, number] {
  if (cfg.inkIndex === -1) {
    const h = cfg.customHex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16) || 0,
      parseInt(h.slice(2, 4), 16) || 0,
      parseInt(h.slice(4, 6), 16) || 0,
    ];
  }
  return RISO_INKS[cfg.inkIndex].rgb;
}

// Fast deterministic hash → pseudo-random in [0,1)
function hash01(x: number, y: number, seed: number): number {
  let h = (x * 374761393) ^ (y * 668265263) ^ (seed * 1274126177);
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967295;
}

export default function RisoSimulator({ maxPreview = DEFAULT_MAX_PREVIEW }: { maxPreview?: number } = {}) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [cfg, setCfg] = useState<Record<ChannelKey, ChannelCfg>>(DEFAULTS);
  const [grain, setGrain] = useState(0.22);
  const [contrast, setContrast] = useState(1.0);
  const [paperTone, setPaperTone] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load image when URL changes
  useEffect(() => {
    if (!imgUrl) { setImg(null); return; }
    const el = new Image();
    el.crossOrigin = "anonymous";
    el.onload = () => setImg(el);
    el.src = imgUrl;
  }, [imgUrl]);

  const onPickFile = useCallback((file: File | null) => {
    if (!file) return;
    if (imgUrl) URL.revokeObjectURL(imgUrl);
    setImgUrl(URL.createObjectURL(file));
  }, [imgUrl]);

  // Render whenever inputs change
  useEffect(() => {
    if (!img || !canvasRef.current) return;
    const canvas = canvasRef.current;

    // Scale preview
    const scale = Math.min(1, maxPreview / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(img, 0, 0, w, h);
    const src = ctx.getImageData(0, 0, w, h);
    const out = ctx.createImageData(w, h);

    const ink = {
      C: inkColor(cfg.C),
      M: inkColor(cfg.M),
      Y: inkColor(cfg.Y),
      K: inkColor(cfg.K),
    } as const;
    const on = {
      C: cfg.C.enabled, M: cfg.M.enabled, Y: cfg.Y.enabled, K: cfg.K.enabled,
    };

    const data = src.data;
    const dst = out.data;
    const g = grain;
    const c = contrast;

    // Paper background (very subtle off-white, like newsprint)
    const paper: [number, number, number] = paperTone ? [248, 246, 240] : [255, 255, 255];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = data[i] / 255;
        const gC = data[i + 1] / 255;
        const b = data[i + 2] / 255;

        // RGB → CMYK
        const k = 1 - Math.max(r, gC, b);
        let cC = 0, mC = 0, yC = 0;
        if (k < 1) {
          const inv = 1 - k;
          cC = (1 - r - k) / inv;
          mC = (1 - gC - k) / inv;
          yC = (1 - b - k) / inv;
        }

        // Contrast bend around 0.5 then clamp
        const bend = (v: number) =>
          Math.min(1, Math.max(0, (v - 0.5) * c + 0.5));
        cC = bend(cC);
        mC = bend(mC);
        yC = bend(yC);
        const kC = bend(k);

        // Start from paper and multiply each enabled channel layer
        let rr = paper[0] / 255;
        let gg = paper[1] / 255;
        let bb = paper[2] / 255;

        const applyLayer = (val: number, color: [number, number, number], seed: number) => {
          // Fine-grain stochastic alpha: jitter alpha per pixel with deterministic noise
          // Variance peaks in midtones (sqrt(v*(1-v))*2) → cleaner highlights & shadows
          const variance = Math.sqrt(val * (1 - val)) * 2;
          const n = (hash01(x, y, seed) - 0.5) * g * variance;
          const a = Math.min(1, Math.max(0, val + n));
          if (a <= 0) return;
          // Layer pixel (lerp white → ink by a) then multiply with accumulator
          const lr = 1 - a + a * (color[0] / 255);
          const lg = 1 - a + a * (color[1] / 255);
          const lb = 1 - a + a * (color[2] / 255);
          rr *= lr; gg *= lg; bb *= lb;
        };

        if (on.C) applyLayer(cC, ink.C, 11);
        if (on.M) applyLayer(mC, ink.M, 29);
        if (on.Y) applyLayer(yC, ink.Y, 53);
        if (on.K) applyLayer(kC, ink.K, 97);

        dst[i] = Math.round(rr * 255);
        dst[i + 1] = Math.round(gg * 255);
        dst[i + 2] = Math.round(bb * 255);
        dst[i + 3] = 255;
      }
    }

    ctx.putImageData(out, 0, 0);
  }, [img, cfg, grain, contrast, paperTone, maxPreview]);

  const setChannel = (k: ChannelKey, patch: Partial<ChannelCfg>) =>
    setCfg((prev) => ({ ...prev, [k]: { ...prev[k], ...patch } }));

  const downloadPng = () => {
    const c = canvasRef.current;
    if (!c) return;
    const a = document.createElement("a");
    a.download = "riso-simulacro.png";
    a.href = c.toDataURL("image/png");
    a.click();
  };

  const hasImg = !!img;

  return (
    <div className="riso-page">
      <header className="riso-header">
        <h1>Riso Simulacro</h1>
        <p className="riso-sub">
          Subí una imagen, separala por CMYK y asigná una tinta riso a cada canal.
          Todo en el navegador. Grano fino, mezcla multiply sobre papel.
        </p>
      </header>

      <div className="riso-grid">
        <aside className="riso-controls">
          <div className="riso-uploader">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
              hidden
            />
            <button
              type="button"
              className="riso-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              {hasImg ? "Cambiar imagen…" : "Subir imagen…"}
            </button>
          </div>

          {CHANNELS.map((k) => (
            <ChannelEditor
              key={k}
              channel={k}
              cfg={cfg[k]}
              onChange={(patch) => setChannel(k, patch)}
            />
          ))}

          <div className="riso-row">
            <label className="riso-label">
              Grano (fino) <span>{(grain * 100).toFixed(0)}%</span>
            </label>
            <input
              type="range" min={0} max={0.6} step={0.01}
              value={grain}
              onChange={(e) => setGrain(parseFloat(e.target.value))}
            />
          </div>

          <div className="riso-row">
            <label className="riso-label">
              Contraste <span>{contrast.toFixed(2)}</span>
            </label>
            <input
              type="range" min={0.5} max={2} step={0.05}
              value={contrast}
              onChange={(e) => setContrast(parseFloat(e.target.value))}
            />
          </div>

          <label className="riso-check">
            <input
              type="checkbox"
              checked={paperTone}
              onChange={(e) => setPaperTone(e.target.checked)}
            />
            Tono de papel
          </label>

          <button
            type="button"
            className="riso-btn riso-btn-ghost"
            disabled={!hasImg}
            onClick={downloadPng}
          >
            Descargar PNG
          </button>
        </aside>

        <section className="riso-preview">
          {hasImg ? (
            <canvas ref={canvasRef} className="riso-canvas" />
          ) : (
            <div className="riso-drop">
              <p>Subí una imagen para empezar</p>
              <p className="riso-drop-sub">JPG / PNG · se procesa local</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ChannelEditor({
  channel, cfg, onChange,
}: {
  channel: ChannelKey;
  cfg: ChannelCfg;
  onChange: (patch: Partial<ChannelCfg>) => void;
}) {
  const swatch = useMemo(() => {
    const [r, g, b] = inkColor(cfg);
    return `rgb(${r} ${g} ${b})`;
  }, [cfg]);

  return (
    <div className={`riso-channel ${cfg.enabled ? "" : "is-off"}`}>
      <div className="riso-channel-head">
        <label className="riso-check">
          <input
            type="checkbox"
            checked={cfg.enabled}
            onChange={(e) => onChange({ enabled: e.target.checked })}
          />
          <strong>{channel}</strong>
          <span className="riso-channel-name">{CHANNEL_LABEL[channel]}</span>
        </label>
        <span className="riso-swatch" style={{ background: swatch }} />
      </div>

      <InkDropdown
        inkIndex={cfg.inkIndex}
        customHex={cfg.customHex}
        disabled={!cfg.enabled}
        onChange={(inkIndex) => onChange({ inkIndex })}
      />

      {cfg.inkIndex === -1 && (
        <input
          type="color"
          className="riso-color"
          value={cfg.customHex}
          onChange={(e) => onChange({ customHex: e.target.value })}
          disabled={!cfg.enabled}
        />
      )}
    </div>
  );
}

function InkDropdown({
  inkIndex, customHex, disabled, onChange,
}: {
  inkIndex: number;
  customHex: string;
  disabled: boolean;
  onChange: (inkIndex: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const currentLabel = inkIndex === -1 ? "Custom…" : RISO_INKS[inkIndex].name;
  const currentSwatch =
    inkIndex === -1 ? customHex : rgbToHex(RISO_INKS[inkIndex].rgb);

  return (
    <div className={`ink-dd ${disabled ? "is-disabled" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="ink-dd-trigger"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="ink-dd-swatch" style={{ background: currentSwatch }} />
        <span className="ink-dd-label">{currentLabel}</span>
        <span className="ink-dd-caret">▾</span>
      </button>

      {open && (
        <ul className="ink-dd-menu" role="listbox">
          {RISO_INKS.map((ink, i) => (
            <li
              key={ink.name}
              role="option"
              aria-selected={i === inkIndex}
              className={`ink-dd-item ${i === inkIndex ? "is-active" : ""}`}
              onClick={() => { onChange(i); setOpen(false); }}
            >
              <span
                className="ink-dd-swatch"
                style={{ background: rgbToHex(ink.rgb) }}
              />
              {ink.name}
            </li>
          ))}
          <li
            role="option"
            aria-selected={inkIndex === -1}
            className={`ink-dd-item ${inkIndex === -1 ? "is-active" : ""}`}
            onClick={() => { onChange(-1); setOpen(false); }}
          >
            <span
              className="ink-dd-swatch ink-dd-swatch-custom"
              style={{ background: customHex }}
            />
            Custom…
          </li>
        </ul>
      )}
    </div>
  );
}
