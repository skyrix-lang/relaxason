# Relaxa'Son

The website of **Relaxa'Son** (Denis Bensoussan, sonotherapist): the treatments
(sound massage, collective sound journeys, body-reconnection seminar, manual
drainage, Swedish massage), their prices, and a contact form. In French.

It is built on the project starter: **versioned packages plus a thin app**, and
shipped as one Docker image.

- **Web:** React 19 single-page app with strict TypeScript and Vite. TanStack
  Router for typed routes and TanStack Query for server data. shadcn/ui-style
  components on Base UI, Tailwind CSS v4, React Hook Form and Zod 4.
- **BFF (backend-for-frontend):** Hono on Node. It serves the built SPA and the
  JSON API, sends the contact form's emails over SMTP (Scaleway), and sets the security
  headers. It also holds the sign-in plumbing (OpenID Connect, sessions in
  PostgreSQL through Drizzle) for features to come: nothing on the public site
  needs an account yet.
- **Contract:** the BFF's routes produce an OpenAPI document. Orval generates
  the typed client, the TanStack Query hooks and the MSW mocks from it.
- **Quality:** oxlint (type-aware) and oxfmt from [oxc.rs](https://oxc.rs),
  Vitest, Playwright with axe, and dependency rules between packages.

## Pages

| Path            | Page                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| `/`             | Home: hero, sonotherapy, benefits, services, testimonials                                                 |
| `/mon-parcours` | The therapist's background and training                                                                   |
| `/sonotherapie` | What sonotherapy is, its benefits, a television report (YouTube)                                          |
| `/soins`        | Every treatment (`#massage`, `#voyage`, `#seminaire`, `#drainage`, `#suedois`) and the prices (`#tarifs`) |
| `/contact`      | Contact details, the contact form, frequent questions                                                     |
| `/sign-in`      | Sign-in, for future screens: not linked from the site, not indexed                                        |

## Structure

```
apps/
  web/                      the site
    index.html              HTML shell: metadata crawlers read first
    src/routes/             TanStack Router file routes (one per page)
    src/components/         navbar, sections of each page, cookie banner
    src/assets/             photos and logos, bundled by Vite
    src/styles.css          Tailwind + UI kit + the Relaxa'Son theme
  bff/                      Hono server
    src/app.ts              security headers, CSRF, routes, static SPA
    src/routes/api.ts       JSON API, declared with Zod (OpenAPI)
    src/contact.ts          the contact form's email
    src/mail.ts             sends mail over SMTP (Nodemailer)
    src/routes/auth.ts      /auth/login, /auth/callback, /auth/logout
    src/env.ts              settings, checked at startup
    src/mail.ts             mail over SMTP (logged when unconfigured)
packages/
  core/                     Zod schemas and constants shared by web and BFF
  db/                       Drizzle schema and migrations (drizzle/)
  api/                      openapi.json + generated client, hooks and MSW mocks
  ui/                       UI kit on theme tokens
  theme-relaxason/          the brand: one CSS-variable file
e2e/                        Playwright tests
scripts/                    setup, dev, session, API generation, boundary check
docker/                     Dockerfile, compose file, Keycloak development realm
docs/decisions.md           decisions and their reasons
```

Each package has a short `AGENTS.md` with its rules.

## Keeping up to date with project-starter

This project was made from `skyrix-lang/project-starter`. Renovate updates
versions with the starter's shared policy (`renovate.json` extends its
`default.json`). For everything else the starter changes (scripts, CI, Docker,
configs), run `yarn sync-from-starter --dry-run`, then `yarn sync-from-starter`:
it merges the starter's changes since the commit in `.starter.json` with this
project's own, then review the diff, `yarn verify`, and commit. Paths this
project owns go in `.starter.json`'s `ignore`.
The whole process, conflicts and the rules for changing the starter:
[docs/starter-sync.md](docs/starter-sync.md).

## Getting started

Requires Node 24 (`.nvmrc`), Corepack (`corepack enable`) and Docker.

```bash
yarn install
yarn setup        # .env, Postgres, Keycloak, database and migrations
yarn dev          # http://localhost:3000
```

`yarn dev` runs the BFF (port 3001, restarts on change) and Vite (port 3000).
Vite forwards `/api` and `/auth` to the BFF, so the browser sees a single
origin, as in production. The local Postgres listens on **5433** and the local
Keycloak on **8181**, so they don't collide with another project's.

Without SMTP settings in `.env`, the contact form works but its message is
only logged by the BFF.

## Scripts

| Command                                           | What it does                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------- |
| `yarn dev`                                        | BFF and Vite dev servers                                                  |
| `yarn build` / `yarn start`                       | production build; serve it with the BFF                                   |
| `yarn verify`                                     | format, types, type-aware lint, boundaries, API contract, unit tests      |
| `yarn test`                                       | Playwright against the production build (Postgres and Keycloak in Docker) |
| `yarn test:unit` / `yarn test:watch`              | Vitest                                                                    |
| `yarn api:generate`                               | OpenAPI document from the BFF's routes, then client, hooks and mocks      |
| `yarn setup`                                      | prepare a checkout or worktree                                            |
| `yarn sync-from-starter [--dry-run]`              | in a project: merge in what changed in the starter since the last sync    |
| `yarn dev:session [email]`                        | sign in locally without Keycloak, print the cookie                        |
| `yarn db:generate --name=<x>` / `yarn db:migrate` | new migration / apply migrations                                          |
| `yarn db:up` / `yarn keycloak:up`                 | start the local containers                                                |
| `yarn docker:build`                               | build the image                                                           |
| `yarn docker:up` / `yarn docker:down`             | the image with Postgres, migrations and Keycloak (Docker Compose)         |

## Configuration

The BFF reads its settings from the environment when it starts
(`apps/bff/src/env.ts`). A missing or invalid value stops it with a list of
every problem. Nothing is baked in at build time, so the same image runs on any
domain.

| Variable                                               | Meaning                                                                                                                      |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `PUBLIC_URL`                                           | the address people use (`https://relaxason.com`); used for canonical URLs, the sitemap, the CSRF check and the OIDC callback |
| `DATABASE_URL`                                         | Postgres: rate limits, users and sessions                                                                                    |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` | the SMTP server mail goes through; unset, mail is only logged (see [Mail](#mail))                                            |
| `MAIL_FROM`                                            | the sender, on a domain the SMTP server may send for                                                                         |
| `RECIPIENT_EMAIL`                                      | who receives the contact form's messages; required in production                                                             |
| `GA_MEASUREMENT_ID`                                    | Google Analytics (GA4) id. Optional: without it there is no analytics and no cookie banner                                   |
| `SESSION_SECRET`                                       | signs the short-lived sign-in cookie (32+ random characters in production)                                                   |
| `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`  | the identity provider and its confidential client (see Authentication)                                                       |
| `PORT`, `HOST`                                         | where the BFF listens (3000 and 0.0.0.0 in the image)                                                                        |
| `LOG_LEVEL`                                            | `debug`, `info` (default), `warn`, `error` or `silent`                                                                       |
| `STATIC_DIR`                                           | the built SPA (set in the image)                                                                                             |

## Contact form

`/contact` posts to `POST /api/contact`. The form and the BFF validate with the
same schema (`packages/core/src/contact-schema.ts`). The BFF sends one email to
`RECIPIENT_EMAIL` through the SMTP server (`apps/bff/src/mail.ts`, see
[Mail](#mail)), with the visitor as the reply-to address and their text escaped
(`apps/bff/src/contact.ts`). One client address may send 5 messages an hour
(429 after that); a refusal by the server is a 502, and the form keeps what was
written.

The reason's keys (`information`, `session`, `workshop`, `other`) and their
labels, for the form and for the email, live together in the schema file.

## Analytics and cookies

With `GA_MEASUREMENT_ID` set, the BFF writes the id into the page and allows
Google's origins in the content security policy; the app then shows the
cookie banner. Nothing is loaded from Google and no cookie is set until the
visitor clicks "Accepter"; measurement then starts at once and on later visits.
After "Refuser", or with no answer, nothing is measured (`apps/web/src/analytics.ts`).

## Authentication

No page of the site needs an account today. The starter's sign-in is kept for
what comes next (online booking, a client area), and the BFF needs an identity
provider configured to start. Any OpenID Connect provider works: Keycloak,
Entra ID, Auth0, Google and others. Create a **confidential** client with:

- the authorization code flow and PKCE (S256);
- the redirect URI `${PUBLIC_URL}/auth/callback`;
- the post-logout redirect URI `${PUBLIC_URL}/`;
- the scopes `openid email profile`.

The browser never sees a token or the client secret. After the callback, the
BFF stores a session row and sets an HttpOnly cookie. Who may sign in is
decided by the provider: every account it accepts gets in, so never point
`OIDC_ISSUER` at a public provider without a restriction.

To add a screen for signed-in users, follow the `new-page` skill: the route
calls `requireUser` in `beforeLoad`, and its API routes go on `userApi` in
`apps/bff/src/routes/api.ts`.

## Mail

`mailer().send({ to, subject, text, html? })` (`apps/bff/src/mail.ts`) sends
through any SMTP server with Nodemailer, such as Scaleway Transactional Email:

```bash
SMTP_HOST=smtp.tem.scaleway.com
SMTP_PORT=465                       # TLS: 465, 2465. STARTTLS: 587, 2587, 25
SMTP_USER=<project id>
SMTP_PASSWORD=<API secret key>
MAIL_FROM="Acme <no-reply@acme.example>"   # on a domain verified in TEM
```

Credentials never travel unencrypted: ports other than 465 and 2465 must
upgrade with STARTTLS, or the mail isn't sent. A refused mail throws.

**No real mail in tests.** Without `SMTP_HOST`, nothing is sent: the mail is
logged (recipient and subject in development, a bare warning in production).
`vitest.config.ts` and `playwright.config.ts` both empty `SMTP_HOST`, which
wins over `.env` and the shell. In production a sent mail is logged by its
message id only, and a refusal by its SMTP codes, without the server's reply
(it often quotes the recipient). `yarn dev`
does send when `.env` has SMTP settings, so use addresses you own there.

Anything that sends mail because of a request must be rate limited with
`hit()` from `apps/bff/src/rate-limit.ts`.

## API

The JSON API lives under `/api`. Its OpenAPI document is at
`/api/openapi.json`, and `packages/api/openapi.json` is the committed copy.

- `POST /api/contact`: the contact form (public, rate limited).
- `GET /api/health`: 200 when the database answers, 503 otherwise.
- `GET /api/me`: the signed-in user, or null.
- Bad input gets 400 with `{ error, issues }`.

To change the API, edit `apps/bff/src/routes/api.ts`, run `yarn api:generate`
and commit both. `yarn verify` fails when the generated client is stale.

## Design

The brand is `packages/theme-relaxason/src/theme.css`: the teal scale, the mint
page, the fonts (Source Sans 3 for text, Josefin Sans for the site's name).
Components use only these tokens, through Tailwind utilities and a few classes
in `apps/web/src/styles.css` (section titles, cards, the fade-in of sections).
The breakpoints are the previous site's: 576, 768, 992, 1200 and 1408 pixels.

Two photos are still missing, for the seminar and the manual drainage: a grey
placeholder stands in (`apps/web/src/components/image-placeholder.tsx`).

## Tests

- **Unit tests** (`yarn test:unit`) live next to the code: the contact schema,
  the email's content, the environment, the server's headers.
- **End-to-end tests** (`yarn test`) build the app and run it with the bundled
  BFF on its own port and database. A fake SMTP server (`e2e/smtp-stub.ts`) receives
  the emails, so the contact form is tested through to the email's content.
  Every test also fails on a browser console error, or on an axe accessibility
  violation on the page it ends on, colour contrast included. `e2e/auth.spec.ts` drives the real Keycloak login.

## Docker

```bash
yarn docker:build
# Apply migrations (a deploy step, never at startup), then start the app
docker build --target migrate -t relaxason-migrate -f docker/Dockerfile .
docker run --rm -e DATABASE_URL=... relaxason-migrate
docker run -p 3000:3000 -e PUBLIC_URL=https://relaxason.com \
  -e DATABASE_URL=... -e SESSION_SECRET=... \
  -e OIDC_ISSUER=... -e OIDC_CLIENT_ID=... -e OIDC_CLIENT_SECRET=... \
  -e SMTP_HOST=smtp.tem.scaleway.com -e SMTP_USER=... -e SMTP_PASSWORD=... \
  -e MAIL_FROM="Contact Sonothérapie <contact@relaxason.com>" -e RECIPIENT_EMAIL=... \
  -e GA_MEASUREMENT_ID=G-XXXXXXXXXX \
  relaxason:1.0.0
```

The runtime image holds Node, a single bundled `server.js` and the static
files: no `node_modules`, no package manager, and it runs as a non-root user.
Its base image is pinned by digest, and Renovate updates it. The image has a
`HEALTHCHECK` on `GET /api/health` (503 when the database is unreachable), and
on `SIGTERM` the server finishes the requests in progress before it exits.

Deploy it behind a reverse proxy that terminates TLS and sets
`x-forwarded-for`: the rate limits count per client address.

To try the image with everything around it, `yarn docker:up` runs
`docker/compose.yaml`: Postgres, the migrations, a development Keycloak and
the app at http://localhost:8080. It's for local use only: its secrets are
public. Export `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM` and
`RECIPIENT_EMAIL` first to send real emails from it.

### Logs

The BFF writes one line per event to stdout, and warnings and errors to
stderr: JSON in the image, readable text in development. Each request is one
line with its method, path (never the query string), status and duration,
except health checks that succeed. Its id is returned as `x-request-id`. Log
with `log` from `apps/bff/src/log.ts`; lint refuses `console`.

CI builds the image on `main` and on tags, with an SBOM and build provenance,
and signs release tags with cosign. See `SECURITY.md`.

## SEO

The app renders in the browser. Every URL first returns `apps/web/index.html`,
and the BFF fills in `PUBLIC_URL` when it serves it. That file carries the home
page's title, description, canonical URL, Open Graph tags and JSON-LD; each
page then sets its own once loaded (`apps/web/src/page-meta.ts`). `robots.txt`
and `sitemap.xml` are built from `PUBLIC_URL` and `PUBLIC_PATHS`
(`packages/core/src/site.ts`). A page that has to rank on its own content
needs prerendering (see `docs/decisions.md`).

## Security

- The CSP allows scripts from `'self'` only (plus Google's tag when analytics
  is configured), with no `'unsafe-inline'`, and frames from YouTube only, for
  the video. The other headers are HSTS, `X-Frame-Options: DENY`, `nosniff` and
  a strict referrer policy (`apps/bff/src/app.ts`).
- The CSRF check refuses cross-site form posts. There is no CORS, so other
  origins can't send JSON.
- The contact form and sign-ins are rate limited per client address
  (`apps/bff/src/rate-limit.ts`).
- Sign-in uses OIDC with PKCE through a confidential client. Sessions are
  server-side, the cookie is HttpOnly and SameSite=Lax (`__Host-` on https).
- Supply chain: install scripts are disabled, versions younger than 7 days are
  refused, CI installs from the lockfile only, and Renovate waits 7 days too.

## Working with AI agents

`AGENTS.md` is the guide for every agent, with a short `AGENTS.md` per package.
`CLAUDE.md` adds Claude Code's skills, reviewer subagent and hooks.
`yarn verify` is what an agent runs after each step.
