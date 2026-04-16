import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { fetchCosmosImages } from "@/lib/cosmos";
export default function GallerySection() {
    const [images, setImages] = useState([]);
    const [lightbox, setLightbox] = useState(null);
    useEffect(() => {
        fetchCosmosImages("yhnna", 20).then(setImages);
    }, []);
    useEffect(() => {
        const handler = (e) => {
            if (lightbox === null)
                return;
            if (e.key === "ArrowRight")
                setLightbox((i) => ((i ?? 0) + 1) % images.length);
            if (e.key === "ArrowLeft")
                setLightbox((i) => ((i ?? 0) - 1 + images.length) % images.length);
            if (e.key === "Escape")
                setLightbox(null);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightbox, images.length]);
    if (images.length === 0)
        return null;
    return (_jsxs("section", { style: { marginTop: "2.5rem" }, children: [_jsxs("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1rem" }, children: [_jsx("h2", { style: { fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 400, fontStyle: "italic" }, children: "Visual work" }), _jsx("a", { href: "https://cosmos.so/yhnna", target: "_blank", rel: "noopener noreferrer", style: { fontSize: "0.72rem", color: "var(--muted)", textDecoration: "none" }, children: "cosmos.so/yhnna \u2197" })] }), _jsx("div", { style: { columns: "3 180px", columnGap: "0.55rem" }, children: images.map((src, i) => (_jsx("div", { onClick: () => setLightbox(i), style: {
                        breakInside: "avoid", marginBottom: "0.55rem", borderRadius: 14,
                        overflow: "hidden", cursor: "zoom-in",
                        border: "1px solid var(--border)", background: "var(--card)",
                    }, children: _jsx("img", { src: src, alt: `Visual work ${i + 1}`, loading: "lazy", style: { width: "100%", display: "block", transition: "transform 0.3s ease" }, onMouseEnter: (e) => { e.target.style.transform = "scale(1.03)"; }, onMouseLeave: (e) => { e.target.style.transform = "scale(1)"; }, onError: (e) => { e.target.closest("div").style.display = "none"; } }) }, src))) }), lightbox !== null && (_jsxs("div", { onClick: () => setLightbox(null), style: {
                    position: "fixed", inset: 0, zIndex: 1000,
                    background: "rgba(10,10,8,0.92)", backdropFilter: "blur(16px)",
                    display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
                }, children: [_jsx("button", { onClick: () => setLightbox(null), style: {
                            position: "absolute", top: 18, right: 18,
                            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "50%", width: 38, height: 38, cursor: "pointer",
                            color: "rgba(255,255,255,0.8)", fontSize: "1.3rem",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }, children: "\u00D7" }), _jsx("button", { onClick: (e) => { e.stopPropagation(); setLightbox((i) => ((i ?? 0) - 1 + images.length) % images.length); }, style: {
                            position: "absolute", left: 16,
                            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "50%", width: 44, height: 44, cursor: "pointer",
                            color: "rgba(255,255,255,0.8)", fontSize: "1.4rem",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }, children: "\u2039" }), _jsx("img", { src: images[lightbox], alt: "", onClick: (e) => e.stopPropagation(), style: {
                            maxWidth: "88vw", maxHeight: "86vh", objectFit: "contain",
                            borderRadius: 10, boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
                        } }), _jsx("button", { onClick: (e) => { e.stopPropagation(); setLightbox((i) => ((i ?? 0) + 1) % images.length); }, style: {
                            position: "absolute", right: 16,
                            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "50%", width: 44, height: 44, cursor: "pointer",
                            color: "rgba(255,255,255,0.8)", fontSize: "1.4rem",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }, children: "\u203A" }), _jsxs("p", { style: { position: "absolute", bottom: 18, color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "0.1em" }, children: [lightbox + 1, " / ", images.length] })] }))] }));
}
