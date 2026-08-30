/**
 * Shared canvas helpers for the full-screen FX overlay:
 *   ModeSweep.astro — char↔pixel conversion wave when the mode flips
 *
 * The overlay thinks in square cells. A cell is either painted as a
 * terminal character (colored glyph on black) or as a pixel-art pixel
 * (inset colored square on black).
 */

/** Glyph soup for the sweep's flickering static. */
export const SWEEP_GLYPHS = "@#%&$8B0XW*+=~^:·";

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

/**
 * Block scrolling while a full-screen FX overlay is up — a scroll would
 * move the real page under the fixed canvas and let it peek out (holes,
 * overscroll rubber-banding). Returns the unlock function.
 */
export const lockScroll = (): (() => void) => {
  const stop = (e: Event) => e.preventDefault();
  const keys = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
  const stopKeys = (e: KeyboardEvent) => {
    if (keys.has(e.key)) e.preventDefault();
  };
  const opts: AddEventListenerOptions = { passive: false };
  window.addEventListener("wheel", stop, opts);
  window.addEventListener("touchmove", stop, opts);
  window.addEventListener("keydown", stopKeys);
  return () => {
    window.removeEventListener("wheel", stop, opts);
    window.removeEventListener("touchmove", stop, opts);
    window.removeEventListener("keydown", stopKeys);
  };
};

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
