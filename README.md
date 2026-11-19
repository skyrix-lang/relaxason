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

## Quick start

Requires Node 24 (`.nvmrc`), Corepack (`corepack enable`) and Docker.

```bash
yarn install
yarn setup        # .env, Postgres, Keycloak, database and migrations
yarn dev          # http://localhost:3000
```

Sign in as `ada` / `ada` on the local Keycloak. `yarn verify` checks
everything in seconds (format, types, lint, boundaries, API contract, unit
tests); `yarn test` runs the end-to-end tests. Every command:
[docs/development.md](docs/development.md#scripts).

## Documentation

| Guide                                                       | What's in it                                                              |
| ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| [Architecture](docs/architecture.md)                        | the folders and packages, the JSON API                                    |
| [Development](docs/development.md)                          | running it locally, every command, the tests                              |
| [Configuration](docs/configuration.md)                      | the server's variables, sign-in (OpenID Connect), mail                    |
| [Customizing for a customer](docs/customizing.md)           | brand and dark mode, languages, icons, pages, features                    |
| [SEO, analytics and compression](docs/seo-and-analytics.md) | metadata, sitemap, 404s, link previews, Google Analytics, gzip and brotli |
| [Security](docs/security.md)                                | sessions, headers and CSP, CSRF, rate limits, supply chain                |
| [Deployment](docs/deployment.md)                            | the Docker image, deploying, rollback, backups, logs                      |
| [New project](docs/new-project.md)                          | from a clone to a GitHub repository with CI and auto-merge                |
| [Automatic deploys](docs/auto-deploy.md)                    | deploying `main` every night, backup first                                |
| [Starter sync](docs/starter-sync.md)                        | keeping a project up to date with the starter                             |
| [Decisions](docs/decisions.md)                              | what was decided, and why                                                 |

## Working with AI agents

`AGENTS.md` is the guide for every agent, with a short `AGENTS.md` per package.
`CLAUDE.md` adds Claude Code's skills, reviewer subagent and hooks.
`yarn verify` is what an agent runs after each step.
