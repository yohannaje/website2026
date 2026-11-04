# website2026

Static site: plain HTML + one CSS file, no framework, no build step.

- Everything that gets published lives in `site/`.
- `site/index.html` is the Work gallery (one `<img>` per line; order in the file = order on the site). `site/gallery.js` packs it into two columns and adds the lightbox.
- `site/bio.html`, `site/shop.html`, `site/privacy-policy/` (needed for the Pinterest API app — keep it).
- Hosted on Cloudflare Pages. `npm run build` just copies `site/` to `dist/`.
- Don't add React, a bundler or components back. Other tools (Riso, Object Builder) live in their own repos.
