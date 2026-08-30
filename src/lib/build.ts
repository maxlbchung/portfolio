/**
 * A single id shared by every page of one build (the module is evaluated
 * once per build process). Pages embed it in a <meta> so the client can
 * spot a stale cached page after a redeploy and refresh it.
 */
export const buildId = Date.now().toString(36);
