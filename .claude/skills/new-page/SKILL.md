---
name: new-page
description: Create a new page or route in this project's React SPA (TanStack Router), with the right metadata, SEO files and tests. Use whenever adding a page, screen, route, landing page or any new URL.
---

# Add a page

## 1. Classify it

Work out which type the page is from the request. Ask only if it's unclear.

- **Public:** should appear in Google, such as a treatment, pricing or article
  page. Every page of the site today is public.
- **App:** a working screen, such as a dashboard, or anything behind a login.
  There is none yet; the sign-in page exists but nothing links to it.

Page text is French and the client's: ask for the copy rather than inventing
it (see "The site and its owner" in `AGENTS.md`).

The app is a client-rendered SPA: crawlers first see `apps/web/index.html`,
then the page after JavaScript runs. A public page that must rank well without
JavaScript needs a prerendered page: raise it, don't work around it.

## 2. Build it

Add `apps/web/src/routes/<path>.tsx` (TanStack Router file route; the Vite
plugin regenerates `routeTree.gen.ts`, commit it). Links to it are type-checked:
a wrong path is a compile error.

```tsx
export const Route = createFileRoute("/pricing")({
  validateSearch: z.object({ plan: z.string().optional().catch(undefined) }),
  component: pageFor("/pricing", PricingPage),
});
```

- Validate search params with Zod in `validateSearch`; use `.catch()` so a bad
  value falls back instead of erroring.
- An app page calls `requireUser(context.queryClient, location.href)` from
  `src/auth.ts` in `beforeLoad`. The BFF still checks every API call.
- Wrap the page component in `pageFor(route, Page)` (`src/overrides.ts`) so a
  customer app can replace it.
- Wrap the content in `PageShell` (`src/components/page-shell.tsx`), the
  centred column every page but the home page uses (the navbar comes from
  `routes/__root.tsx`), and put the page's sections in
  `src/components/<page>/`. Titles use `SectionTitle`; `Reveal` gives the
  fade-in on scroll the other pages have.
- Screens of a feature with its own data live in a `packages/feature-*`
  package; the route file only wires them.

|            | Public page                                          | App page                                |
| ---------- | ---------------------------------------------------- | --------------------------------------- |
| Meta       | `usePageMeta({ title, description })`                | `usePageMeta({ title, noindex: true })` |
| Auth       | None                                                 | `requireUser` in `beforeLoad`           |
| Sitemap    | Add to `PUBLIC_PATHS` in `packages/core/src/site.ts` | Leave out                               |
| Loading UI | Avoid layout shift                                   | Skeleton with `role="status"`           |

## 3. Check the structure

- One `h1`, no skipped heading levels, meaningful `alt` text (or `alt=""` for
  decoration), visible focus, WCAG 2.2 AA contrast for running text. The e2e
  tests run axe, without its colour-contrast rule: the brand's white on teal is
  kept on purpose (`docs/decisions.md`), so check the contrast of new text
  yourself.
- Add it to the navbar (`apps/web/src/components/navbar.tsx`, desktop menu and
  mobile menu) if needed.
- Style with the theme's tokens (`bg-primary`, `text-brand-700`, `text-body`…),
  never raw colours: the brand is one CSS file.
- Style a link as a button with `buttonVariants()`; never a `<button>` in a link.
- Breakpoints are CSS; never read the screen size in render.

## 4. Test and verify

Add tests to `e2e/` for the page's content and main interaction. For a public
page, add to `e2e/seo.spec.ts`: sitemap entry and no `noindex`. For an app
page, check it has `noindex`, isn't in the sitemap, and a signed-out visit goes
to `/sign-in?returnTo=…`.

Run `yarn verify` and `yarn test`.
