# website2026

Portfolio de ilustración de YHNN. HTML + CSS, sin framework ni build.

```
site/
  index.html          Work — galería (una imagen por línea)
  bio.html            Bio ES/EN + foto
  shop.html           Shop (coming soon, hasta que esté la Shopify)
  privacy-policy/     Requerida por la app de la API de Pinterest
  style.css           Todo el estilo
  gallery.js          Columnas + lightbox (lo único con JS)
```

## Agregar o reordenar ilustraciones

Editá `site/index.html`: cada `<img>` es una ilustración, en el orden en que aparecen.

## Ver en local

```bash
npx serve site
```

## Deploy

Cloudflare Pages, desde `main`. El build (`npm run build`) solo copia `site/` a `dist/`.

## Historia

La versión bento (reloj, mapa, música, cosmos, etc.) quedó en la rama `archive/bento-2026`.
El simulador riso que vivía en `/riso.html` ahora es su propio repo.
