// Direct CDN URLs work fine in <img> tags — no CORS issue for image elements.
// Some images use cdn.cosmos.so/images/{id}, others cdn.cosmos.so/{id}.
// The scraper captures the full path from HTML so we preserve the correct format.
const AVATAR_ID = "c60c8c7a-0609-434a-b980-117c4dbaef66";
// path = "images/uuid" or "uuid"
export const cosmosUrl = (path) => `https://cdn.cosmos.so/${path}?format=webp&w=800`;
export async function fetchCosmosImages(username, limit = 20) {
    try {
        // Try fetching the page directly (works server-side; may fail in browser due to CORS on fetch)
        const proxies = [
            `https://corsproxy.io/?url=${encodeURIComponent(`https://www.cosmos.so/${username}`)}`,
            `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.cosmos.so/${username}`)}`,
        ];
        let html = "";
        for (const proxy of proxies) {
            try {
                const res = await fetch(proxy);
                if (res.ok) {
                    html = await res.text();
                    break;
                }
            }
            catch { /* try next */ }
        }
        if (!html)
            return fallback();
        // Capture full CDN path (with or without /images/ prefix)
        const matches = [
            ...html.matchAll(/cdn\.cosmos\.so\/((?:images\/)?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/g),
        ];
        // Collect content images only — those with the /images/ prefix.
        // Cosmos page is ordered newest→oldest; no reversal needed.
        // Images WITHOUT /images/ prefix are structural (cover/pinned) and are skipped.
        const seen = new Set();
        const paths = [];
        for (const [, path] of matches) {
            if (!path.startsWith("images/"))
                continue; // skip structural images
            const id = path.replace("images/", "");
            if (id === AVATAR_ID || seen.has(id))
                continue;
            seen.add(id);
            paths.push(path);
            if (paths.length >= limit)
                break;
        }
        if (paths.length === 0)
            return fallback();
        return paths.map(cosmosUrl);
    }
    catch {
        return fallback();
    }
}
function fallback() {
    // Paths as they appear on cdn.cosmos.so — include /images/ prefix where needed
    return [
        "images/d7f54426-79ba-472b-b50b-3803ca149879",
        "images/ba0abc32-d3d9-418c-9ac1-042ef2532701",
        "images/1d2f9c0c-0f00-4082-9261-abcfdc61dac6",
        "images/ab9ac275-9d18-4b9e-bf90-73c59626b3e7",
        "images/06ff89d2-91f4-4a0c-b94c-ce3a2a84ecff",
        "images/de5a80dd-da21-43a5-823c-815299c34142",
        "images/50ed7c9c-5c11-44d7-ae21-d83737dc544f",
        "images/8c38f538-e171-4166-8fd3-8c51eefcf904",
        "images/f2553b76-cec5-482a-90c8-74907ce52a86",
        "images/7982b057-4deb-4f1b-99d6-370067844888",
        "images/ff797360-ab1c-4917-843d-2be6af81b0bc",
        "images/ddea714c-fbbc-407d-b0b9-a56efdd57198",
        "images/a680ba14-3963-41db-8de7-0a9235d7e127",
        "images/be7cb311-2585-40c9-9ef3-074fe8b00dd1",
        "images/e7e5f3f3-dde5-4a2d-990f-26fa4cf5bfb8",
        "a658f9e9-e757-4f32-8e78-7c5d78bed9a8",
    ].map(cosmosUrl);
}
