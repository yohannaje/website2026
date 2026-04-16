import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function GatosCard() {
    return (_jsx("a", { href: "https://wearedosgatos.com", target: "_blank", rel: "noopener noreferrer", style: { textDecoration: "none", display: "block", height: "100%" }, children: _jsxs("div", { style: {
                borderRadius: "var(--radius)",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                height: "100%",
                background: "#d6cfc4",
            }, children: [_jsx("img", { src: "/gatos.jpg", alt: "We Are Dos Gatos", style: {
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    } }), _jsx("div", { style: {
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        padding: "2.5rem 0.9rem 0.9rem",
                        background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
                    }, children: _jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [_jsx("span", { style: {
                                    fontSize: "0.7rem", color: "rgba(255,255,255,0.88)",
                                    letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500,
                                }, children: "dos gatos" }), _jsx("svg", { width: "11", height: "11", viewBox: "0 0 11 11", fill: "none", style: { opacity: 0.75 }, children: _jsx("path", { d: "M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })] }) })] }) }));
}
