/**
 * Prefix an internal path with the configured base path (astro.config.mjs).
 * Always use this for internal links so the site works both at
 * maxlbchung.github.io/portfolio and at a custom domain root.
 */
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};

/** Resolve an image filename from public/images, while accepting old paths. */
export const imagePath = (image: string): string => {
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  if (image.startsWith("/")) {
    return withBase(image);
  }
  return withBase(`/images/${image}`);
};
