# Configuration

The server's settings, sign-in and mail.

## Settings

The BFF reads its settings from the environment when it starts
(`apps/bff/src/env.ts`). A missing or invalid value stops it with a list of
every problem. Nothing is baked in at build time, so one image serves any
customer and any domain.

| Variable                                               | Meaning                                                                                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `PUBLIC_URL`                                           | the address people use (`https://relaxason.com`); used for the OIDC callback, the CSRF check, the canonical URL and the sitemap |
| `DATABASE_URL`                                         | Postgres                                                                                                                        |
| `SESSION_SECRET`                                       | signs the short-lived sign-in cookie (32+ random characters in production)                                                      |
| `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`  | the identity provider and its confidential client                                                                               |
| `PORT`, `HOST`                                         | where the BFF listens (3000 and 0.0.0.0 in the image)                                                                           |
| `LOG_LEVEL`                                            | `debug`, `info` (default), `warn`, `error` or `silent`                                                                          |
| `STATIC_DIR`                                           | the built SPA (set in the image)                                                                                                |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` | the SMTP server mail goes through; unset, mail is only logged (see [Mail](#mail))                                               |
| `MAIL_FROM`                                            | the sender, on a domain the SMTP server may send for                                                                            |
| `RECIPIENT_EMAIL`                                      | who receives the contact form's messages; required in production                                                                |
| `GA_MEASUREMENT_ID`                                    | Google Analytics 4's id (`G-…`); unset, no analytics (see [Analytics](seo-and-analytics.md#analytics))                          |

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

## Authentication

No page of the site needs an account today. The starter's sign-in is kept for
what comes next (online booking, a client area), and the BFF needs an identity
provider configured to start. Any OpenID Connect provider works: Keycloak, Entra ID, Auth0, Google and
others. Create a **confidential** client with:

- the authorization code flow and PKCE (S256);
- the redirect URI `${PUBLIC_URL}/auth/callback`;
- the post-logout redirect URI `${PUBLIC_URL}/`;
- the scopes `openid email profile`.

The browser never sees a token or the client secret. After the callback, the
BFF stores a session row and sets an HttpOnly cookie, so deleting the row
signs that session out. Signing out also ends the provider's session. Users
are identified by issuer and subject. A user created ahead of their first
sign-in, by email and with no identity yet (as `yarn dev:session` does), is
linked to it when the provider has verified that email.

Who may sign in is decided by the provider: every account it accepts gets in.
To add a screen for signed-in users, follow the `new-page` skill: the route
calls `requireUser` in `beforeLoad`, and its API routes go on `userApi` in
`apps/bff/src/routes/api.ts`. Use the customer's own provider, or restrict a
shared one to their users, groups or domain. Never point `OIDC_ISSUER` at a public provider without such a
restriction.

## Mail

`mailer().send({ to, subject, text, html? })` (`apps/bff/src/mail.ts`) sends
through any SMTP server with Nodemailer, such as Scaleway Transactional Email:

```bash
SMTP_HOST=smtp.tem.scaleway.com
SMTP_PORT=465                       # TLS: 465, 2465. STARTTLS: 587, 2587, 25
SMTP_USER=<project id>
SMTP_PASSWORD=<API secret key>
MAIL_FROM="Contact Sonothérapie <contact@relaxason.com>"   # on a domain verified in TEM
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
