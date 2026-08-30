# maxlbchung — portfolio

Personal site for Max Li-Bo Chung with two personalities, switched by the big
toggle on the home page:

| Mode | Theme | Pages |
| --- | --- | --- |
| **AI** | ASCII terminal — black bg, white text, purple links, UI drawn in characters | Home · Projects · Experience · Dev Diary |
| **Games** (Libo Dev) | dark pixel art — black bg, Pico-8 palette; the chrome is pixel art (chunky borders, hard shadows), the type is a normal sans | Home · Games · Jams · Videos |

Built with [Astro](https://astro.build). No client framework — just vanilla
JS for the toggle and the canvas effects:

- **Mode sweep** (`src/components/ModeSweep.astro`): flipping the toggle runs
  a conversion wave made of the destination mode's matter — purple ASCII
  static when switching to AI, dark cold pixels when switching to games —
  sweeping horizontally toward the side that was toggled, then peeling away
  to reveal the new theme. The leading edge is near-flat; the wake trails
  with jittered cells.
- **Triangle** (`src/components/AsciiTriangle.astro`): a 3D triangle on the
  home hero, rasterized to text at ~20fps — ASCII shading ramp in AI mode,
  block "pixels" in games mode.

Client-side navigations in AI mode type the page title out with a solid
cursor that starts blinking when done; games mode uses the standard
view-transition fade. All effects respect `prefers-reduced-motion` (the
sweep falls back to a cross-fade; typing is skipped).

## Editing the themes

Every color, font, radius, and shadow lives in **`src/styles/theme.css`** as
CSS custom properties, defined once per mode:

- `html[data-mode="ai"]` — the black & white ASCII terminal palette
- `html[data-mode="games"]` — the dark Pico-8 pixel-art palette

Change a token there and it applies everywhere; components never hard-code
values.

## Editing content

**All content lives in one file: `src/data/content.json`** — projects, games,
jams, videos, experience, education, honors, and the skills chips. To add an
entry, append an object to the matching array (order doesn't matter):

- `date` — sortable, `"YYYY-MM"` (or just `"YYYY"` if you don't know the
  month). Pages auto-sort newest-first on this.
- `period` — the date text actually displayed ("July 2026", "2024 — Present").
- `featured: true` — on a project or game, shows it on the home page.
- `image` (optional) — on a project or game, a screenshot shown in the card:
  drop the file in `public/images/` and set `"image": "/images/foo.png"`
  (full `https://` URLs work too).

Everything else:

| What | Where |
| --- | --- |
| Name, socials, nav | `src/data/site.ts` |
| Dev diary posts | drop a `.md` file in `src/content/diary/` |
| Resume | replace `public/resume.pdf` |

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
