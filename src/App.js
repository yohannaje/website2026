import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "@/components/Header";
import BioCard from "@/components/BioCard";
import BlogCard from "@/components/BlogCard";
import CosmosCard from "@/components/CosmosCard";
import MapCard from "@/components/MapCard";
import ClockCard from "@/components/ClockCard";
import GatosCard from "@/components/GatosCard";
import ArtCard from "@/components/ArtCard";
import MusicCard from "@/components/MusicCard";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";
export default function App() {
    return (_jsxs("main", { className: "page-main", children: [_jsx(Header, {}), _jsxs("div", { className: "bento-grid", children: [_jsx("div", { className: "s2 cell-full", children: _jsx(BioCard, {}) }), _jsx("div", { className: "s1 cell-img", children: _jsx(CosmosCard, {}) }), _jsx("div", { className: "s1 cell-img", children: _jsx(MapCard, {}) }), _jsx("div", { className: "s2 cell-full", children: _jsx(BlogCard, {}) }), _jsx("div", { className: "s1 cell-img", children: _jsx(ClockCard, {}) }), _jsx("div", { className: "s1 cell-img", children: _jsx(GatosCard, {}) }), _jsx("div", { className: "s1 r2 cell-art", children: _jsx(ArtCard, {}) }), _jsx("div", { className: "s3 r2", children: _jsx(MusicCard, {}) }), _jsx("div", { className: "s2 cell-full", children: _jsx(ProjectCard, { ...PROJECTS[0] }) }), _jsx("div", { className: "s2 cell-full", children: _jsx(ProjectCard, { ...PROJECTS[1] }) })] }), _jsxs("footer", { style: {
                    marginTop: "3rem", paddingTop: "1.25rem",
                    borderTop: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }, children: [_jsxs("span", { style: { fontSize: "0.72rem", color: "var(--muted)" }, children: ["\u00A9 ", new Date().getFullYear(), " Yoh"] }), _jsx("span", { style: { fontSize: "0.72rem", color: "var(--muted)" }, children: "C\u00F3rdoba, Spain" })] })] }));
}
