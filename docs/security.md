# Security

How sign-in, sessions, headers and the supply chain are protected.

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
