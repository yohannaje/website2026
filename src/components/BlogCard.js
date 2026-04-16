import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { fetchLatestPost, getCachedPost, formatDate } from "@/lib/rss";
export default function BlogCard() {
    const cached = getCachedPost();
    const [post, setPost] = useState(cached !== undefined ? cached : "loading");
    useEffect(() => {
        if (cached !== undefined) {
            fetchLatestPost().then((fresh) => {
                if (fresh && (post === null || post === "loading" || fresh.link !== post?.link)) {
                    setPost(fresh);
                }
            });
            return;
        }
        fetchLatestPost().then(setPost);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const href = post && post !== "loading" ? post.link : "https://yhnn.substack.com";
    return (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", style: { textDecoration: "none", display: "block", height: "100%" }, children: _jsxs("div", { style: {
                background: "var(--card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", height: "100%", overflow: "hidden",
                cursor: "pointer", display: "flex", flexDirection: "column",
                padding: "1.1rem 1.25rem",
            }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: "0.75rem", flexShrink: 0 }, children: [_jsx("span", { style: { fontSize: "1rem", lineHeight: 1 }, children: "\uD83D\uDCD3" }), _jsx("span", { style: {
                                fontSize: "0.65rem", color: "var(--muted)",
                                letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
                            }, children: "Latest thoughts" })] }), _jsx("div", { style: { flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }, children: post === "loading" ? (_jsx("div", { style: { width: "55%", height: 11, background: "var(--border)", borderRadius: 6 } })) : post ? (_jsxs(_Fragment, { children: [_jsx("p", { style: {
                                    fontFamily: "var(--font-serif)", fontSize: "0.95rem",
                                    lineHeight: 1.35, marginBottom: 5,
                                    display: "-webkit-box", WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical", overflow: "hidden",
                                }, children: post.title }), post.contentSnippet && (_jsx("p", { style: {
                                    fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.55,
                                    display: "-webkit-box", WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical", overflow: "hidden",
                                }, children: post.contentSnippet }))] })) : (_jsx("p", { style: {
                            fontFamily: "var(--font-serif)", fontSize: "0.95rem",
                            fontStyle: "italic", lineHeight: 1.5,
                        }, children: "Writing soon \u2014 thoughts on art, process, and life." })) }), _jsxs("div", { style: {
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        marginTop: "0.75rem", flexShrink: 0,
                    }, children: [_jsx("span", { style: { fontSize: "0.68rem", color: "var(--muted)" }, children: post && post !== "loading" && post.pubDate
                                ? formatDate(post.pubDate)
                                : "yhnn.substack.com" }), _jsx("svg", { width: "11", height: "11", viewBox: "0 0 11 11", fill: "none", style: { opacity: 0.3 }, children: _jsx("path", { d: "M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6", stroke: "var(--text)", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })] })] }) }));
}
