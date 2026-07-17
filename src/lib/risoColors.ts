export type RisoInk = { name: string; rgb: [number, number, number] };

// Standard Riso ink color values, matching the Bracken "Super Riso" palette.
export const RISO_INKS: RisoInk[] = [
  { name: "Black", rgb: [0, 0, 0] },
  { name: "Risofederal Blue", rgb: [61, 85, 136] },
  { name: "Medium Blue", rgb: [50, 85, 164] },
  { name: "Blue", rgb: [0, 120, 191] },
  { name: "Teal", rgb: [0, 131, 150] },
  { name: "Aqua", rgb: [95, 210, 232] },
  { name: "Mint", rgb: [130, 222, 180] },
  { name: "Sea Foam", rgb: [98, 195, 165] },
  { name: "Turquoise", rgb: [0, 170, 147] },
  { name: "Green", rgb: [0, 169, 92] },
  { name: "Hunter Green", rgb: [64, 112, 96] },
  { name: "Moss", rgb: [105, 114, 67] },
  { name: "Yellow", rgb: [255, 232, 0] },
  { name: "Orange", rgb: [255, 108, 47] },
  { name: "Melon", rgb: [255, 158, 107] },
  { name: "Coral", rgb: [255, 142, 145] },
  { name: "Red", rgb: [255, 102, 94] },
  { name: "Bright Red", rgb: [247, 68, 82] },
  { name: "Marine Red", rgb: [210, 81, 94] },
  { name: "Burgundy", rgb: [145, 78, 114] },
  { name: "Purple", rgb: [117, 86, 148] },
  { name: "Brown", rgb: [146, 95, 82] },
  { name: "Light Grey", rgb: [136, 141, 142] },
  { name: "Flat Gold", rgb: [187, 157, 116] },
  { name: "Metallic Gold", rgb: [172, 142, 103] },
  { name: "Fluorescent Pink", rgb: [255, 72, 176] },
  { name: "Fluorescent Orange", rgb: [255, 116, 73] },
  { name: "Fluorescent Red", rgb: [252, 80, 92] },
  { name: "Fluorescent Yellow", rgb: [255, 233, 22] },
  { name: "Fluorescent Green", rgb: [68, 214, 44] },
];

export function findInkIndex(name: string): number {
  const i = RISO_INKS.findIndex((c) => c.name === name);
  return i < 0 ? 0 : i;
}

export function rgbToHex([r, g, b]: [number, number, number]): string {
  const to = (n: number) => n.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

export function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "");
  const v = m.length === 3
    ? m.split("").map((c) => parseInt(c + c, 16))
    : [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
  return [v[0] || 0, v[1] || 0, v[2] || 0];
}
