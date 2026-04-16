import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { fetchCosmosImages, cosmosUrl } from "@/lib/cosmos";
// Fallback = torii gate (confirmed latest upload, valid CDN URL with /images/ prefix)
const FALLBACK = cosmosUrl("images/d7f54426-79ba-472b-b50b-3803ca149879");
const LS_KEY = "cosmos_latest_url";
function getCached() {
    try {
        return localStorage.getItem(LS_KEY) || FALLBACK;
    }
    catch {
        return FALLBACK;
    }
}
export default function CosmosCard() {
    // Render instantly from cache (no loading flash)
    const [imageUrl, setImageUrl] = useState(getCached);
    useEffect(() => {
        // On every page load, fetch the latest — update display + cache if different
        fetchCosmosImages("yhnna", 1).then((imgs) => {
            if (imgs[0] && imgs[0] !== imageUrl) {
                setImageUrl(imgs[0]);
                try {
                    localStorage.setItem(LS_KEY, imgs[0]);
                }
                catch { }
            }
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (_jsx("a", { href: "https://cosmos.so/yhnna", target: "_blank", rel: "noopener noreferrer", style: { textDecoration: "none", display: "block", height: "100%" }, children: _jsxs("div", { style: {
                borderRadius: "var(--radius)",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                // Explicit height so the img fills it correctly
                height: "100%",
                background: "#e8e1d8",
            }, children: [_jsx("img", { src: imageUrl, alt: "Latest from Cosmos", style: {
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }, onError: () => setImageUrl(FALLBACK) }), _jsx("div", { style: {
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        padding: "2.5rem 0.9rem 0.9rem",
                        background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
                    }, children: _jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [_jsx("span", { style: { fontSize: "0.7rem", color: "rgba(255,255,255,0.88)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }, children: "cosmos" }), _jsx("svg", { width: "11", height: "11", viewBox: "0 0 11 11", fill: "none", style: { opacity: 0.75 }, children: _jsx("path", { d: "M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })] }) })] }) }));
}
