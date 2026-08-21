/**
 * Prefix an internal path with the configured base path (astro.config.mjs).
 * Always use this for internal links so the site works both at
 * maxlbchung.github.io/portfolio and at a custom domain root.
 */
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};
