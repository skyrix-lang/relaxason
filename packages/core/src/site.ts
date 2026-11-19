// What the site calls itself. The public address is configuration, read by the
// BFF from PUBLIC_URL when the container starts, not baked into the build.
export const site = {
  name: "Relaxa'Son",
  description:
    "Une approche holistique qui utilise les vibrations et les fréquences sonores pour apaiser le mental, favoriser l'équilibre intérieur, la relaxation et le bien-être.",
};

/**
 * The languages the interface is translated into, the default first. A
 * visitor gets the first one their browser asks for, or the default, and can
 * switch in the header when there is more than one. Each language needs its
 * messages in every package's `locales/` folder; drop one here to stop
 * offering it. Keep `lang` in apps/web/index.html on the default.
 */
export const LANGUAGES = ["fr"] as const;
export type Language = (typeof LANGUAGES)[number];

/** Pages that should rank: listed in the sitemap. App pages aren't. */
export const PUBLIC_PATHS = [
  "/",
  "/mon-parcours",
  "/sonotherapie",
  "/soins",
  "/contact",
] as const;
