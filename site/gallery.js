// Packs the gallery into two columns (left→right reading order) and adds a
// lightbox. The images themselves live in index.html, one per line.
const gallery = document.querySelector(".gallery");
const images = [...gallery.querySelectorAll("img")];

function pack() {
  const cols = window.innerWidth <= 640 ? 1 : 2;
  if (gallery.dataset.cols === String(cols)) return;
  gallery.dataset.cols = cols;
  gallery.replaceChildren();
  gallery.classList.toggle("is-packed", cols > 1);
  if (cols === 1) return gallery.append(...images);
  const columns = Array.from({ length: cols }, () => {
    const col = document.createElement("div");
    col.className = "gallery-col";
    gallery.append(col);
    return col;
  });
  images.forEach((img, i) => columns[i % cols].append(img));
}

pack();
window.addEventListener("resize", pack);

const box = document.createElement("div");
box.className = "lightbox";
box.hidden = true;
box.innerHTML = `
  <button class="lb-close" aria-label="Close">×</button>
  <button class="lb-prev" aria-label="Previous">‹</button>
  <img alt="">
  <button class="lb-next" aria-label="Next">›</button>
  <p class="lb-count"></p>`;
document.body.append(box);

const big = box.querySelector("img");
const count = box.querySelector(".lb-count");
let current = 0;

function show(i) {
  current = (i + images.length) % images.length;
  big.src = images[current].src;
  count.textContent = `${current + 1} / ${images.length}`;
  box.hidden = false;
}

images.forEach((img, i) => img.addEventListener("click", () => show(i)));
box.addEventListener("click", () => (box.hidden = true));
big.addEventListener("click", (e) => e.stopPropagation());
box.querySelector(".lb-prev").addEventListener("click", (e) => { e.stopPropagation(); show(current - 1); });
box.querySelector(".lb-next").addEventListener("click", (e) => { e.stopPropagation(); show(current + 1); });
window.addEventListener("keydown", (e) => {
  if (box.hidden) return;
  if (e.key === "ArrowRight") show(current + 1);
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "Escape") box.hidden = true;
});
