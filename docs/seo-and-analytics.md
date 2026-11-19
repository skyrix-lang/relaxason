# SEO, analytics and compression

What search engines and link previews see, Google Analytics behind a consent banner, and compressed assets.

## SEO

The app renders in the browser. Every URL first returns `apps/web/index.html`,
and the BFF fills in `PUBLIC_URL` when it serves it. That file carries the home
page's title, description, canonical URL, Open Graph tags and JSON-LD; each
page then sets its own once loaded (`apps/web/src/page-meta.ts`). `robots.txt`
and `sitemap.xml` are built from `PUBLIC_URL` and `PUBLIC_PATHS`
(`packages/core/src/site.ts`). A page that has to rank on its own content
needs prerendering (see `docs/decisions.md`).

Unknown addresses answer 404: the build writes the app's routes to
`routes.json` (from TanStack Router's route tree), and the BFF sends the
app's page, which shows its French not-found page, with a 404 status for any path that
matches none. A route that exists but finds nothing (a missing record) still
answers 200, so its page says `noindex` too.

The `www.` twin of `PUBLIC_URL`'s host (or the bare domain, when
`PUBLIC_URL` has `www.`) redirects to `PUBLIC_URL` with a 301, so the site
isn't indexed twice. Point both names at the server, through a proxy that
keeps the request's `Host` header (nginx-proxy does): other hosts are left
alone, since a proxy may pass its own name.

`index.html`'s JSON-LD describes the site and the organisation behind it,
with its logo (`apple-touch-icon.png`), which search results may show.

Link previews use Open Graph and X's card tags: title, description, URL, site
name, locale and a share image (`apps/web/public/og-image.jpg`, 1200 × 630).
Each page passes its own to `usePageMeta` (`apps/web/src/page-meta.ts`):
`title`, `description`, `image`, `imageAlt`, `type`, and `jsonLd` for
structured data such as an `Event` or a `FAQPage`. Platforms that don't run
JavaScript (most link previews) see the home page's tags from `index.html`.

## Analytics and cookies

With `GA_MEASUREMENT_ID` set, the BFF writes the id into the page and allows
Google's origins in the content security policy; the app then shows the
cookie banner. Nothing is loaded from Google and no cookie is set until the
visitor clicks "Accepter"; measurement then starts at once and on later visits.
After "Refuser", or with no answer, nothing is measured (`apps/web/src/analytics.ts`).
Page views of client-side navigations are sent by the app itself. The site has
no footer, so unlike the starter's banner there is no "Cookie settings" button
to change the answer later (see `docs/decisions.md`).

## Compression

`yarn build` writes a brotli (`.br`) and a gzip (`.gz`) copy of each text file
of the SPA (`apps/web/vite.config.ts`). The BFF sends the smallest copy the
browser accepts, with `Content-Encoding` and `Vary: Accept-Encoding`, and
compresses `index.html` once when it starts. A proxy in front need not
compress again: nginx leaves a response that already has an encoding alone.
