# Development

Running the app on your machine, the commands, and the tests.

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
| `yarn deploy`                                     | ship the current commit to a server, backup first ("Deploying")           |

## Tests

- **Unit tests** (`yarn test:unit`) live next to the code: the contact schema,
  the email's content, the environment, the server's headers.
- **End-to-end tests** (`yarn test`) build the app and run it with the bundled
  BFF on its own port and database. A fake SMTP server (`e2e/smtp-stub.ts`) receives
  the emails, so the contact form is tested through to the email's content.
  Every test also fails on a browser console error, or on an axe accessibility
  violation (WCAG 2.2 AA) on the page it ends on, colour contrast included. Most tests sign in by writing
  a session row; `e2e/auth.spec.ts` drives the real Keycloak login.

## CI

`.github/workflows/ci.yml` runs `yarn verify` and `yarn test` on every pull
request and on `main`, then builds the image on `main` and on tags. The
workflows run on GitHub's runners (`ubuntu-latest`), unless the repository
variable `RUNNER` names a label of your own self-hosted runners (Settings →
Secrets and variables → Actions → Variables, for example `RUNNER=my-runners`).
Every job then runs there, except the nightly deploy (`deploy.yml`), which
stays on GitHub's runners: it writes its SSH key into the runner's home, which
every job on a self-hosted runner shares.

What such a runner needs, installed once by an admin, since the workflows
use these before any setup step and the runner has no sudo: Node with
Corepack enabled (CI runs `corepack enable` before `setup-node`), the `gh`
CLI (the sync and notify workflows), git, jq, curl, Docker (rootless is fine)
with the compose and buildx plugins, and Chromium's system libraries (the e2e
job installs the browser without them when it's not on GitHub's runners). The
e2e jobs of a repository run one at a time there, as they share that Docker's
Postgres and Keycloak containers. Setting up a project in an organization,
private, on such runners: [new-project.md](new-project.md), "In an
organization, private, on your own runners".
