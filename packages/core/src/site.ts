// What the site calls itself. The public address is configuration, read by the
// BFF from PUBLIC_URL when the container starts, not baked into the build.
export const site = {
  name: "Relaxa'Son",
  description:
    "Une approche holistique qui utilise les vibrations et les fréquences sonores pour apaiser le mental, favoriser l'équilibre intérieur, la relaxation et le bien-être.",
};

/** Pages that should rank: listed in the sitemap. App pages aren't. */
export const PUBLIC_PATHS = [
  "/",
  "/mon-parcours",
  "/sonotherapie",
  "/soins",
  "/contact",
] as const;
