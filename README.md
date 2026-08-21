# maxlbchung — portfolio

Personal site for Max Li-Bo Chung with two personalities, switched by the big
toggle on the home page:

| Mode | Theme | Pages |
| --- | --- | --- |
| **AI** | dark | Home · Projects · Experience · Dev Diary |
| **Games** (Libo Dev) | light | Home · Games · Jams · Videos |

Built with [Astro](https://astro.build). No client framework — just a little
vanilla JS for the mode toggle.

## Editing the themes

Every color, font, radius, and shadow lives in **`src/styles/theme.css`** as
CSS custom properties, defined once per mode:

- `html[data-mode="ai"]` — the dark AI palette
- `html[data-mode="games"]` — the light games palette

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
- The big switch on home (`src/components/ModeToggle.astro`) flips the
  attribute with a cross-fade; visiting any games page switches you into
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
(enable **Settings → Pages → Source: GitHub Actions** once). The site is
configured for `maxlbchung.github.io/portfolio`; to use a custom domain,
follow the comments at the top of `astro.config.mjs`.
