import { jsx as _jsx } from "react/jsx-runtime";
export default function BioCard() {
    return (_jsx("div", { style: {
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "1.75rem 2rem",
            height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
        }, children: _jsx("p", { style: {
                fontFamily: "var(--font-serif)",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                fontWeight: 400,
                color: "var(--text)",
                maxWidth: 380,
            }, children: "Visual artist, capturing life and sharing thoughts and process along the way." }) }));
}
