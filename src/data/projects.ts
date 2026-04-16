export interface Project {
  name: string;
  description: string;
  url: string;
  thumbnail?: string;
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    name: "Zine Editor",
    description: "Build & layout digital zines in the browser",
    url: "https://example.com", // ← replace
    accent: "#fdf4e7",
  },
  {
    name: "Font Manager",
    description: "Organise, preview & test your typefaces",
    url: "https://font-grid-preview.pages.dev",
    thumbnail: "/font.jpg",
    accent: "#eef1ff",
  },
];
