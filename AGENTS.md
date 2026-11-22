# Project guide

The website of **Relaxa'Son** (Denis Bensoussan, sonotherapist), in French:
five public pages and a contact form. Built on the project starter, as
**versioned packages plus a thin app**: a client-only React 19 SPA (Vite,
TanStack Router and Query, shadcn/ui on Base UI, Tailwind v4, React Hook Form,
Zod 4) and a small Hono backend-for-frontend (BFF) that serves the site and the
JSON API, sends the contact form's emails (SMTP), and keeps the sign-in
plumbing (OpenID Connect, sessions, Postgres through Drizzle) for features to
come. One Docker image. `README.md` is the short overview, with the guides in
`docs/` (setup in `docs/development.md`, settings in `docs/configuration.md`).
The contact form is the reference implementation of a feature: copy its
patterns (`packages/core/src/contact-schema.ts`, `apps/bff/src/contact.ts`,
`apps/bff/src/routes/api.ts`, `apps/web/src/components/contact/`).

```
apps/web                 the site: routes, page sections, theme import
apps/bff                 Hono server: /api, contact emails, OIDC, sessions, security headers, serves the SPA
packages/core            Zod schemas and constants shared by web and BFF
packages/db              Drizzle schema, migrations (server only)
packages/api             generated client, hooks and MSW mocks (never edit by hand)
packages/ui              UI kit on theme tokens
packages/theme-relaxason the brand: one CSS-variable file
```

## The site and its owner

- Text is French, addressed to visitors with "vous", written in the
  therapist's first person ("je propose…").
- The pages reproduce the previous site, which the client knows: don't
  restyle, reword or reorder without being asked. Decisions on content and
  design are the client's: ask with a precise question first.
- The treatments page (`/soins`) changes most. One component per treatment in
  `apps/web/src/components/care/`, with its anchor (`massage`, `voyage`,
  `seminaire`, `drainage`, `suedois`, `tarifs`). A new treatment also goes in
  the navbar's menu (`components/navbar.tsx`) and, if priced, in
  `pricing-section.tsx`. On small screens the text comes before the photo.
- The seminar is led by Laura Ricciardelli and Denis Bensoussan. The former
  workshop partner, Michelle Resse, must not be named anywhere.
- The photos for the seminar and the drainage are still to come
  (`components/image-placeholder.tsx`).

Each package has a short `AGENTS.md` with its own rules: read it before
changing that package. `scripts/check-boundaries.ts` enforces which package may
import which.

## How to work

1. **Understand.** Read the code you'll change and the pattern it should follow.
   Check `docs/decisions.md` before changing an approach: reverse a decision only
   when asked, and record it.
2. **Agree on big work first.** A feature bigger than one screen, a schema change
   that touches existing data, or one with open product questions gets a spec in
   `docs/specs/` (template there). Wait for answers to its open questions.
3. **Build in small steps** with the workflow that fits, from
   `.claude/skills/<name>/SKILL.md` (plain Markdown, for any agent): `design`,
   `new-feature`, `new-page`, `e2e-scenario`, `seo-check`, `run-app`. Run `yarn verify` after each step.
4. **See it work.** Tests prove it; also check the running app (`run-app`):
   load the page, read the console and server output.
5. **Done means:** `yarn verify` and `yarn test` pass; new behaviour has tests
   that fail when the code is broken (break it once to check); the docs
   (`docs/<topic>.md`), `.env.example` and `docs/decisions.md` are updated where needed; and the
   change has been reviewed against these rules.
6. **Report** what changed, how it was checked, and anything skipped or failing.

Ask before: adding a dependency, a migration that deletes or rewrites data,
weakening a security check, or reversing a recorded decision. Don't read `.env`:
it holds secrets. Several agents may work at once, each in its own git worktree:
run `yarn install && yarn setup` in a new one, and it gets its own ports and
databases.

## Commands

- `yarn verify`: format check, types, type-aware lint, package boundaries, API
  contract and unit tests, in seconds. Run it after each step. `yarn test` runs
  Playwright with axe (needs Docker; starts Postgres and Keycloak itself, about a
  minute). Both must pass before work is done, and CI runs both.
- `yarn format` fixes formatting. Lint is oxlint and formatting is oxfmt
  (oxc.rs), not ESLint or Prettier. Suppress a rule with
  `// oxlint-disable-next-line <rule> -- <reason>`.
- `yarn test e2e/<file>.spec.ts` runs one file, `yarn test:unit` the Vitest
  suites, `yarn test:watch` watches them.
- `yarn api:generate` after changing an API route. `yarn setup`, `yarn dev`,
  `yarn db:generate`, `yarn db:migrate`, `yarn dev:session` (sign in locally).
- `yarn sync-from-starter` (in a project made from the starter) merges in
  the starter's changes since `.starter.json`; Renovate updates versions. Run
  it only when asked, and see `docs/starter-sync.md`.
- A new project from the starter (repository, secrets, auto-merge, Renovate):
  follow `docs/new-project.md`, stopping at each step marked **You**.
  `scripts/check-github.sh <owner/repo>` checks a project's setup.
- Every night the `Nightly` workflow runs CI in full on `main` (coverage,
  every browser, no retries, a dependency audit), then deploys that commit
  if it all passed, with a database backup first; a red night opens a
  `nightly` issue and backs up only. To turn the deploy on: follow
  `docs/auto-deploy.md`, stopping at each step marked **You**. Never write a
  server's address, user or port into a committed file: they go in variables.
- Change dependencies with `yarn workspace <name> add|remove`, never by editing
  `package.json`, so `yarn.lock` stays in sync. Install scripts are disabled and
  versions younger than 7 days are refused (`.yarnrc.yml`).

## Frontend (`apps/web`, `packages/ui`, future `packages/feature-*`)

- Everything renders in the browser; there is no server rendering. Routes are
  TanStack Router file routes; links and search params are type-checked.
- Read and write server data only through the generated hooks in
  `@relaxason/api`. Pass `throwOnError: throwUnexpected(...)` so unexpected errors
  reach the route's error page; invalidate query keys after a mutation.
- URL state (filters, tabs) lives in validated search params. Client-only state
  goes in Zustand; what must survive a reload uses its `persist` middleware
  with a `version` and Zod-checked values. Never keep personal data or secrets in `localStorage`.
- The pages' French copy is written in the components (the client's content).
  The starter's own screens (sign-in) read `apps/web/src/locales/fr.json`
  (react-i18next: `useTranslation()`, `t("key")`, type-checked keys). The site
  has one language (`LANGUAGES` in `packages/core/src/site.ts`) and no dark
  mode; see `docs/decisions.md`.
- Feedback on something that just happened ("Booking saved") is a `toast()`
  from `@relaxason/ui`; errors the visitor must act on stay in the page.
- Forms: React Hook Form + `zodResolver` with the schema from `@relaxason/core`,
  and the `Field` components from `@relaxason/ui`.
- Style with theme tokens only: the kit's (`bg-primary`…) and the site's
  (`text-brand-700`, `bg-surface`, `text-body`, in `apps/web/src/styles.css`);
  sizes and spacing too ("Typography and layout" below). Breakpoints are the
  previous site's: `xs` 576, `sm` 768, `md` 992, `lg` 1200, `xl` 1408. A link
  styled as a button uses `buttonVariants()`: never put a `<button>` inside a
  link.
- Accessibility is a requirement (WCAG 2.2 AA, European Accessibility Act):
  labelled controls, one `h1`, no skipped heading levels, visible focus. Every
  e2e test runs axe on the page it ends on, colour contrast included: teal
  text and anything under white text use `brand-700` or darker; the lighter
  teals are for decoration only.

## Typography and layout

Type and layout come from the theme like colours do (tokens listed in
`packages/theme-relaxason/AGENTS.md`, utilities in `packages/ui/src/styles.css`),
so a new page looks like the others without choosing its own sizes. What this
brand does with them (its sections, type, imagery, do's and don'ts) is in
`docs/design.md`: read it before building or changing a page. A new look, or
a page to design first, goes through the `design` skill.

- Headings use `text-display`, `text-h1`, `text-h2` or `text-h3`, never a raw
  size: `yarn verify` fails on `text-2xl` or larger on an h1 to h3
  (`scripts/heading-sizes.test.ts`).
  Pick by size, not by tag: the level follows the outline (one `h1`, no skipped
  levels), so an app screen's `h1` is usually `text-h2` and a card's `h2`
  `text-h3`. The paragraph under a title is `text-lead`.
- This site's intros are `text-lg text-body` rather than `text-lead`, and a
  section title is `<SectionTitle>` (`text-h2` with the teal rule): see
  `docs/design.md`.
- At most one `text-display` per page, and only on a public page (its hero).
- A page is `page-section` > `page-container`: the section gives the vertical
  space (and can carry a full-width background), the container the width and
  side padding. The root layout adds neither, and `yarn verify` fails on a
  route or `*-page.tsx` without `page-section` (`scripts/page-layout.test.ts`).
  Sections in a row: `pt-0` on the next one, so the space isn't doubled.
- Long text (an article, an intro paragraph) is `prose-width`.

## Rendering and SEO

- Every page is **public** (should rank) or **app** (a working screen). See the
  `new-page` skill. Crawlers first read `apps/web/index.html`, whose metadata
  describes the home page; public pages are listed in `PUBLIC_PATHS`.
- App pages set `usePageMeta({ title, noindex: true })` and call `requireUser`
  in `beforeLoad`.

## BFF and data (`apps/bff`, `packages/db`)

- Every API route is declared with `createRoute` and Zod schemas, so it is
  validated and appears in `/api/openapi.json`. Bad input is 400, someone else's
  or a missing record is 404. Run `yarn api:generate` after a change.
- Routes on `userApi` check the session (401). A route outside it is public: say
  why in a comment, as the contact route does. Per-user data: pass
  `c.var.user.id` to every data function, which filters by it.
- Log with `log` from `apps/bff/src/log.ts`, never `console`: one line per
  event, with the request's id added for you. Never log a secret, a token, a
  cookie or a query string.
- Send mail with `mailer().send()` from `apps/bff/src/mail.ts`, never by
  creating a Nodemailer transport. Without `SMTP_HOST` mail is only logged, and
  the e2e tests send to a fake SMTP server (`e2e/smtp-stub.ts`): never point
  a test at a real one.
- Limit anything that sends email or costs money with `hit()` from
  `apps/bff/src/rate-limit.ts`.
- The contact form's email (`apps/bff/src/contact.ts`) goes through the
  mailer, over SMTP (Scaleway). Escape visitor text with `escapeHtml`.
- Migrations are like Flyway: edit `packages/db/src/schema.ts`, run
  `yarn db:generate`, review the SQL, commit it. Never edit an applied
  migration. The app never migrates on startup.
- New server variables go in `apps/bff/src/env.ts` (read with `env()`), in
  `.env.example`, and in `docs/configuration.md` if they need explaining. There are no
  build-time variables: the image is configured when it starts.

## Security

Sign-in is OpenID Connect, authorization code + PKCE, with the BFF as a
confidential client: tokens and the client secret never reach the browser,
which holds only an HttpOnly session cookie (`apps/bff/src/session.ts`). The
CSRF check refuses cross-site form posts; JSON from other origins fails CORS.
Third-party scripts, images, frames or APIs need their origins added to the
CSP in `apps/bff/src/app.ts` (today: YouTube's frame, and Google Analytics when
configured); never add `'unsafe-inline'` for scripts.

## Tests

- Pure logic and schemas: Vitest, next to the file (`*.test.ts`).
- Components: Vitest + Testing Library in jsdom, with MSW handlers from
  `@relaxason/api/mocks`; unhandled requests fail the test.
- New behaviour gets a Playwright test in `e2e/`. Import `test` and `expect`
  from `e2e/support.ts`, so console errors and axe violations fail the test.
- Tests run in parallel on one database. Tests that send a contact message use
  a unique subject (`uniqueSubject`) and read what the fake SMTP server
  received with `sentEmails`. Sign in as a new user with `signInAsNewUser`;
  `auth.spec.ts` covers the real Keycloak flow.
- Prefer role-based locators, with `data-testid` for repeated cards.
- Never add test-only routes or code to the app. Trigger failures from the test,
  with `page.route` or direct database access.
- A green run isn't enough for new tests: break the code once and see them fail.
