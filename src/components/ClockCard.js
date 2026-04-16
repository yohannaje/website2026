import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
// Córdoba, Spain — Europe/Madrid
const TZ = "Europe/Madrid";
function getTime() {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: TZ,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).formatToParts(now);
    const get = (type) => parseInt(parts.find((p) => p.type === type)?.value ?? "0");
    return { h: get("hour") % 12, m: get("minute"), s: get("second") };
}
export default function ClockCard() {
    const [time, setTime] = useState(getTime);
    useEffect(() => {
        const id = setInterval(() => setTime(getTime()), 1000);
        return () => clearInterval(id);
    }, []);
    const { h, m, s } = time;
    // Angles in degrees
    const secDeg = s * 6;
    const minDeg = m * 6 + s * 0.1;
    const hourDeg = h * 30 + m * 0.5;
    const hand = (deg, length, width, color = "var(--text)") => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const cx = 50, cy = 50;
        const x2 = cx + length * Math.cos(rad);
        const y2 = cy + length * Math.sin(rad);
        // Tail: short line behind center
        const tailRad = ((deg + 90) * Math.PI) / 180;
        const tx = cx + 8 * Math.cos(tailRad);
        const ty = cy + 8 * Math.sin(tailRad);
        return (_jsx("line", { x1: tx, y1: ty, x2: x2, y2: y2, stroke: color, strokeWidth: width, strokeLinecap: "round" }));
    };
    // Hour markers
    const markers = Array.from({ length: 12 }, (_, i) => {
        const deg = i * 30;
        const rad = ((deg - 90) * Math.PI) / 180;
        const isMajor = i % 3 === 0;
        const r1 = isMajor ? 38 : 40;
        const r2 = 44;
        return (_jsx("line", { x1: 50 + r1 * Math.cos(rad), y1: 50 + r1 * Math.sin(rad), x2: 50 + r2 * Math.cos(rad), y2: 50 + r2 * Math.sin(rad), stroke: "var(--text)", strokeWidth: isMajor ? 2.5 : 1.2, strokeLinecap: "round", opacity: isMajor ? 0.7 : 0.3 }, i));
    });
    const timeLabel = new Intl.DateTimeFormat("en-US", {
        timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false,
    }).format(new Date());
    return (_jsxs("div", { style: {
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", height: "100%", minHeight: 200,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 10, padding: "1.2rem",
            cursor: "default",
        }, children: [_jsxs("svg", { viewBox: "0 0 100 100", style: { width: 110, height: 110 }, children: [_jsx("circle", { cx: "50", cy: "50", r: "47", fill: "var(--bg)", stroke: "var(--border)", strokeWidth: "1.5" }), markers, hand(hourDeg, 26, 3.5), hand(minDeg, 36, 2.5), hand(secDeg, 40, 1.2, "#e03131"), _jsx("circle", { cx: "50", cy: "50", r: "3", fill: "var(--text)" }), _jsx("circle", { cx: "50", cy: "50", r: "1.5", fill: "#e03131" })] }), _jsxs("p", { style: {
                    fontFamily: "var(--font-serif)", fontStyle: "italic",
                    fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.04em",
                }, children: [timeLabel, " \u00B7 Spain"] })] }));
}
