// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// ── Deployment ────────────────────────────────────────────────────────────────
// Deployed to GitHub Pages as a project site by default:
//   https://maxlbchung.github.io/portfolio
// If you later point a custom domain (e.g. libo.dev) at this site:
//   1. set `site` to the domain, e.g. "https://libo.dev"
//   2. set `base` to "/"
//   3. add a CNAME file to public/
export default defineConfig({
  site: "https://maxlbchung.github.io",
  base: "/portfolio",
  trailingSlash: "never",
  // Prefetch every internal link as soon as a page loads (the intro plays
  // over it), so page swaps — including the other mode's pages — are instant.
  prefetch: { prefetchAll: true, defaultStrategy: "load" },
  integrations: [icon()],
});
