# Design

The brand, the photos, the icons and the texts.

The brand is `packages/theme-relaxason/src/theme.css`: the teal scale, the mint
page, the fonts (Source Sans 3 for text, Josefin Sans for the site's name).
Components use only these tokens, through Tailwind utilities and a few classes
in `apps/web/src/styles.css` (section titles, cards, the fade-in of sections).
The breakpoints are the previous site's: 576, 768, 992, 1200 and 1408 pixels.

Two photos are still missing, for the seminar and the manual drainage: a grey
placeholder stands in (`apps/web/src/components/image-placeholder.tsx`).

Link previews and icons: `apps/web/public/og-image.jpg` (1200 × 630),
`logo.png`, `favicon.ico` (48, 32 and 16 px) and `apple-touch-icon.png` (180 px),
and the name, URL and logo in `index.html`'s JSON-LD.

Texts: the pages' French copy is written in the components. The starter's own
screens (sign-in) read `apps/web/src/locales/fr.json` through react-i18next;
`LANGUAGES` in `packages/core/src/site.ts` has French only, so no language
picker is shown. There is no dark mode: the previous site had none.
