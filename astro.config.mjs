// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// ── Deployment ────────────────────────────────────────────────────────────────
// Built by the Cloudflare Worker named `portfolio` from the GitHub repo
// (branch: main) and served at https://libo.dev. Build command
// `npm run build`, static assets in `dist`, Node version pinned by .nvmrc.
export default defineConfig({
  site: "https://libo.dev",
  base: "/",
  trailingSlash: "never",
  // Prefetch every internal link as soon as a page loads (the intro plays
  // over it), so page swaps — including the other mode's pages — are instant.
  prefetch: { prefetchAll: true, defaultStrategy: "load" },
  integrations: [icon()],
});
