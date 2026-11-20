# apps/web: the customer app

The site: routes (`src/routes`), page sections (`src/components/<page>/`), the
navbar (`components/navbar.tsx`), the theme import and site
tokens (`src/styles.css`). Screens of a feature with its own data would come
from a `packages/feature-*` package; there is none yet.

- Routes are TanStack Router file routes; `src/routeTree.gen.ts` is generated
  (commit it, never edit it).
- App routes call `requireUser` in `beforeLoad` and `usePageMeta` with `noindex`.
- Text is French. Photos are imported from `src/assets` (optimised files), not
  `public/`.
- Google Analytics loads only when the BFF is given `GA_MEASUREMENT_ID` and
  the visitor has accepted the cookie banner (`src/analytics.ts`). Nothing
  that sets a cookie or calls a third party for measurement may run before.
- Never import `@relaxason/db` or anything server-side.
- The root layout (`src/routes/__root.tsx`) has no container: each page is
  `page-section` > `page-container` (AGENTS.md, "Typography and layout").
