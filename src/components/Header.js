import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Envelope, InstagramLogo } from "@phosphor-icons/react";
export default function Header() {
    const [shopHover, setShopHover] = useState(false);
    return (_jsxs("header", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
        }, children: [_jsx("a", { href: "/", style: { display: "flex", alignItems: "center", textDecoration: "none" }, children: _jsx("img", { src: "/logo.png", alt: "Yoh", style: { height: 30, width: "auto", display: "block" } }) }), _jsxs("nav", { style: { display: "flex", alignItems: "center", gap: "1.5rem" }, children: [_jsxs("div", { style: { position: "relative" }, onMouseEnter: () => setShopHover(true), onMouseLeave: () => setShopHover(false), children: [_jsx("span", { style: {
                                    fontSize: "0.8rem", color: "var(--muted)",
                                    cursor: "default", letterSpacing: "0.01em",
                                }, children: "Shop" }), shopHover && (_jsx("div", { style: {
                                    position: "absolute",
                                    top: "calc(100% + 8px)",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    background: "var(--text)",
                                    color: "var(--bg)",
                                    fontSize: "0.65rem",
                                    padding: "5px 10px",
                                    borderRadius: 8,
                                    whiteSpace: "nowrap",
                                    zIndex: 10,
                                    pointerEvents: "none",
                                }, children: "Coming soon" }))] }), _jsx("a", { href: "mailto:yohanna.j.e@gmail.com", title: "Contact", style: { color: "var(--muted)", display: "flex", alignItems: "center", transition: "color 0.15s" }, onMouseEnter: (e) => (e.currentTarget.style.color = "var(--text)"), onMouseLeave: (e) => (e.currentTarget.style.color = "var(--muted)"), children: _jsx(Envelope, { size: 18, weight: "light" }) }), _jsx("a", { href: "https://instagram.com/y.h.n.n", target: "_blank", rel: "noopener noreferrer", title: "@y.h.n.n", style: { color: "var(--muted)", display: "flex", alignItems: "center", transition: "color 0.15s" }, onMouseEnter: (e) => (e.currentTarget.style.color = "var(--text)"), onMouseLeave: (e) => (e.currentTarget.style.color = "var(--muted)"), children: _jsx(InstagramLogo, { size: 18, weight: "light" }) })] })] }));
}
