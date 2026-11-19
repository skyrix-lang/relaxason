# Architecture

How the code is organized, and the JSON API between the web app and the BFF.

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

## API

The JSON API lives under `/api`. Its OpenAPI document is at
`/api/openapi.json`, and `packages/api/openapi.json` is the committed copy.

- `POST /api/contact`: the contact form (public, rate limited).
- `GET /api/health`: 200 when the database answers, 503 otherwise.
- `GET /api/me`: the signed-in user, or null.
- Bad input gets 400 with `{ error, issues }`.

To change the API, edit `apps/bff/src/routes/api.ts`, run `yarn api:generate`
and commit both. `yarn verify` fails when the generated client is stale.
