/**
 * Shared canvas helpers for the two full-screen FX overlays:
 *   IntroGrid.astro — page-open "growing ASCII/pixel grid" reveal
 *   ModeSweep.astro — char↔pixel conversion sweep when the mode flips
 *
 * Both overlays think in square cells. A cell is either painted as a
 * terminal character (white glyph on black) or as a pixel-art pixel
 * (inset colored square on black), so the same grid can render either
 * mode — and convert between them.
 */

/** Character ramp, empty → dense. Used to "rasterize" the page as text. */
export const ASCII_RAMP = " ·:-=+*#%@";

/** Glyph soup for the sweep's flickering static. */
export const SWEEP_GLYPHS = "@#%&$8B0XW*+=~^:·";

/** Pico-8 flavored ramp for pixel cells, dark → bright. */
export const PIXEL_RAMP = ["#1d2b53", "#3b3f5c", "#5f574f", "#83769c", "#a5a6ad", "#c2c3c7", "#fff1e8"];

/** Saturated pop colors sprinkled into bright pixel cells. */
export const PIXEL_POP = ["#ff004d", "#29adff", "#00e436", "#ffec27"];

/** Sweep-transition pixels: dark, cold blues and purples with rare cold pops. */
export const SWEEP_PIXELS_COLD = [
  "#0d1330", "#14213d", "#1d2b53", "#1b2f63", "#253a5e",
  "#1b4965", "#2a3d66", "#31306b", "#123047", "#0e3a4a",
];
export const SWEEP_PIXELS_COLD_POP = ["#29adff", "#5d8bf4", "#3f6df4", "#3fb5c9"];

/** Sweep-transition glyph colors: purples in varied depths with bright pops. */
export const SWEEP_GLYPHS_PURPLE = [
  "#4a2a6b", "#5b3591", "#6d40b0", "#8250cf", "#9a68e0",
  "#7c53a8", "#3d2356", "#5e4383", "#8a63c4", "#6b4d94",
];
export const SWEEP_GLYPHS_PURPLE_POP = ["#c084fc", "#d8b4fe", "#e9d5ff", "#b18cff"];

export const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Create a viewport-covering overlay canvas (caller appends + removes it). */
export const makeOverlayCanvas = (): [HTMLCanvasElement, CanvasRenderingContext2D] => {
  const canvas = document.createElement("canvas");
  canvas.className = "fx-canvas";
  canvas.setAttribute("aria-hidden", "true");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.round(window.innerWidth * dpr));
  canvas.height = Math.max(1, Math.round(window.innerHeight * dpr));
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.scale(dpr, dpr);
  return [canvas, ctx];
};

/** Paint one cell as a terminal character: black cell, glyph on top. */
export const drawAsciiCell = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  char: string,
  color = "#ffffff",
): void => {
  ctx.fillStyle = "#000000";
  ctx.fillRect(x, y, size + 0.5, size + 0.5);
  if (char === " ") return;
  ctx.fillStyle = color;
  ctx.font = `${Math.ceil(size * 0.96)}px VT323, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, x + size / 2, y + size / 2 + size * 0.06);
};

/** Paint one cell as a pixel-art pixel: black cell, inset colored square. */
export const drawPixelCell = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string | null,
): void => {
  ctx.fillStyle = "#000000";
  ctx.fillRect(x, y, size + 0.5, size + 0.5);
  if (!color) return;
  const inset = Math.max(0.5, size * 0.09);
  ctx.fillStyle = color;
  ctx.fillRect(x + inset, y + inset, size - inset * 2, size - inset * 2);
};

/** density 0..1 → ASCII ramp character. */
export const densityChar = (d: number): string => {
  const i = Math.min(ASCII_RAMP.length - 1, Math.floor(clamp01(d) * ASCII_RAMP.length));
  return ASCII_RAMP[i] ?? " ";
};

/** density 0..1 → pixel color (null = leave the cell black). */
export const densityColor = (d: number): string | null => {
  const v = clamp01(d);
  if (v < 0.06) return null;
  if (v > 0.8 && Math.random() < 0.12) {
    return PIXEL_POP[Math.floor(Math.random() * PIXEL_POP.length)] ?? null;
  }
  const i = Math.min(PIXEL_RAMP.length - 1, Math.floor(v * PIXEL_RAMP.length));
  return PIXEL_RAMP[i] ?? null;
};

/**
 * Rasterize the current page layout into a cols×rows brightness map, by
 * splatting the bounding boxes of visible text-bearing elements. This is
 * what lets the intro mosaic actually *resemble* the page while it grows.
 */
export const buildDensityMap = (cols: number, rows: number): Float32Array => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const map = new Float32Array(cols * rows);

  const splat = (r: DOMRect, weight: number) => {
    if (r.width <= 0 || r.height <= 0 || r.bottom < 0 || r.top > h || r.right < 0 || r.left > w) return;
    const x0 = Math.max(0, Math.floor((r.left / w) * cols));
    const x1 = Math.min(cols - 1, Math.ceil((r.right / w) * cols) - 1);
    const y0 = Math.max(0, Math.floor((r.top / h) * rows));
    const y1 = Math.min(rows - 1, Math.ceil((r.bottom / h) * rows) - 1);
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const i = y * cols + x;
        if (weight > (map[i] ?? 0)) map[i] = weight;
      }
    }
  };

  const weigh = (el: Element): number => {
    const tag = el.tagName;
    if (tag === "H1") return 1;
    if (tag === "H2" || tag === "H3") return 0.85;
    if (tag === "BUTTON" || el.classList.contains("btn")) return 0.8;
    if (tag === "A") return 0.68;
    return 0.55;
  };

  const selector = [
    "main h1", "main h2", "main h3", "main p", "main li", "main pre",
    "main a", "main button", "main .chip",
    "body > header nav a", "body > header button",
    "footer p", "footer a",
  ].join(", ");

  document.querySelectorAll(selector).forEach((el) => {
    const weight = weigh(el);
    for (const r of el.getClientRects()) splat(r, weight);
  });

  return map;
};

/** Average a fractional region [x0f..x1f)×[y0f..y1f) of a density map. */
export const sampleMap = (
  map: Float32Array,
  cols: number,
  rows: number,
  x0f: number,
  y0f: number,
  x1f: number,
  y1f: number,
): number => {
  const x0 = Math.max(0, Math.floor(x0f * cols));
  const x1 = Math.min(cols - 1, Math.max(x0, Math.ceil(x1f * cols) - 1));
  const y0 = Math.max(0, Math.floor(y0f * rows));
  const y1 = Math.min(rows - 1, Math.max(y0, Math.ceil(y1f * rows) - 1));
  let sum = 0;
  let n = 0;
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      sum += map[y * cols + x] ?? 0;
      n++;
    }
  }
  return n > 0 ? sum / n : 0;
};
