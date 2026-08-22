# maxlbchung — portfolio

Personal site for Max Li-Bo Chung with two personalities, switched by the big
toggle on the home page:

| Mode | Theme | Pages |
| --- | --- | --- |
| **AI** | ASCII terminal — black bg, white text, everything drawn in characters | Home · Projects · Experience · Dev Diary |
| **Games** (Libo Dev) | dark pixel art — black bg, Pico-8 palette, pixel fonts | Home · Games · Jams · Videos |

Built with [Astro](https://astro.build). No client framework — just vanilla
JS for the toggle and the canvas effects:

- **Intro** (`src/components/IntroGrid.astro`): every full page load starts
  as a single `@`, then the page re-renders as an ASCII/pixel mosaic whose
  grid resolution doubles until it dissolves into the real page. Both modes
  share the same grid dimensions and timing.
- **Mode sweep** (`src/components/ModeSweep.astro`): flipping the toggle runs
  a conversion wave made of the destination mode's matter — ASCII static
  when switching to AI, dark cold pixels when switching to games — sweeping
  horizontally toward the side that was toggled, then peeling away to
  reveal the new theme. Cell timing is jittered so the front is ragged.
- **Triangle** (`src/components/AsciiTriangle.astro`): a 3D triangle on the
  home hero, rasterized to text at ~20fps — ASCII shading ramp in AI mode,
  block "pixels" in games mode.

All effects respect `prefers-reduced-motion` (the sweep falls back to a
cross-fade; the intro is skipped).

## Editing the themes

Every color, font, radius, and shadow lives in **`src/styles/theme.css`** as
CSS custom properties, defined once per mode:

- `html[data-mode="ai"]` — the black & white ASCII terminal palette
- `html[data-mode="games"]` — the dark Pico-8 pixel-art palette

Change a token there and it applies everywhere; components never hard-code
values.

## Editing content

| What | Where |
| --- | --- |
| Name, socials, nav | `src/data/site.ts` |
| AI projects | `src/data/projects.ts` |
| Experience / education / skills | `src/data/experience.ts` |
| Games | `src/data/games.ts` |
| Game jams | `src/data/jams.ts` |
| Videos | `src/data/videos.ts` |
| Dev diary posts | drop a `.md` file in `src/content/diary/` |
| Resume | replace `public/resume.pdf` |

> Some itch.io links in `src/data/games.ts` are marked `// verify slug` — they
> were inferred from game titles, so double-check them against libodev.itch.io.

## How the mode toggle works

- `<html data-mode="ai|games">` drives everything: theme tokens, which nav
  set renders, and which home panel shows.
- An inline script in `src/layouts/Layout.astro` resolves the mode before
  first paint (no flash): pages pass `mode="ai"` or `mode="games"` to force
  it, while the home page (`mode="auto"`) restores the visitor's last choice
  from `localStorage`.
- The big switch on home (`src/components/ModeToggle.astro`) is the
  full-size two-sided toggle, stylized per mode (terminal box with a
  bracketed inverse-video thumb / pixel-art slab). It dispatches a
  `libo:modeswap` event; `ModeSweep.astro` runs the conversion wave and
  flips the attribute under it. Visiting any games page switches you into
  games mode and vice versa.

## Commands

```sh
npm install
npm run dev      # localhost:4321/portfolio
npm run build    # output in dist/
npm run preview
```

## Deploying

Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`
(the workflow enables the Pages site automatically on first run). The site is
configured for `maxlbchung.github.io/portfolio`; to use a custom domain,
follow the comments at the top of `astro.config.mjs`.
