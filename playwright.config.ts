import { resolve } from "node:path";
import { defineConfig, devices } from "@playwright/test";
import { SIGNED_IN_STATE } from "./e2e/auth-state";
import { databaseNames, e2ePort } from "./scripts/checkout";
import { BFF_DIR } from "./scripts/coverage-options";

// Each checkout, such as an agent's git worktree, gets its own port and test
// database, so test runs in different checkouts can happen at once.
const PORT = Number(process.env.E2E_PORT ?? e2ePort());
const BASE_URL = `http://localhost:${PORT}`;
// A fake SMTP server (e2e/smtp-stub.ts) receives the contact form's emails,
// and lists them over HTTP for the tests.
const SMTP_STUB_PORT = PORT + 3000;
const SMTP_STUB_HTTP_PORT = PORT + 4000;
const SMTP_STUB_URL = `http://127.0.0.1:${SMTP_STUB_HTTP_PORT}`;

// Its own database, recreated on every run by e2e/reset-database.ts. Set on
// process.env so the server, and the test workers, use it instead of .env.
process.env.DATABASE_URL =
  process.env.E2E_DATABASE_URL ??
  `postgres://relaxason:relaxason@localhost:5433/${databaseNames().e2e}`;

// The server under test: the production build of the SPA, served by the
// bundled BFF, signing in through the local Keycloak (`yarn keycloak:up`).
Object.assign(process.env, {
  NODE_ENV: "production",
  PUBLIC_URL: BASE_URL,
  PORT: String(PORT),
  HOST: "127.0.0.1",
  STATIC_DIR: "apps/web/dist",
  // Production requires at least 32 characters (apps/bff/src/env.ts).
  SESSION_SECRET: "e2e-secret-not-for-production-0123456789",
  OIDC_ISSUER:
    process.env.E2E_OIDC_ISSUER ?? "http://localhost:8181/realms/relaxason",
  OIDC_CLIENT_ID: "relaxason-web",
  OIDC_CLIENT_SECRET: "relaxason-web-dev-secret",
  // Mail goes to the fake SMTP server, never a real one, even with SMTP
  // settings in .env. Its test-only certificate is trusted for STARTTLS.
  SMTP_HOST: "localhost",
  SMTP_PORT: String(SMTP_STUB_PORT),
  SMTP_USER: "e2e",
  SMTP_PASSWORD: "e2e-password",
  MAIL_FROM: "Contact Sonothérapie <site@example.test>",
  RECIPIENT_EMAIL: "therapist@example.test",
  // Absolute: the build steps run from the workspaces' own directories.
  NODE_EXTRA_CA_CERTS: resolve("e2e/smtp-stub/cert.pem"),
  SMTP_STUB_PORT: String(SMTP_STUB_PORT),
  SMTP_STUB_HTTP_PORT: String(SMTP_STUB_HTTP_PORT),
  SMTP_STUB_URL,
});

// The nightly (.github/workflows/nightly.yml) runs with E2E_RETRIES=0, so a
// flaky test fails instead of passing on a retry, and E2E_BROWSERS=all,
// which adds Firefox and WebKit. Pull requests keep Chromium and two retries.
const retries = Number(process.env.E2E_RETRIES || (process.env.CI ? 2 : 0));
const browsers = process.env.E2E_BROWSERS === "all";
const screens = {
  testIgnore: ["api.spec.ts", "auth.setup.ts"],
  dependencies: ["setup"],
};

// Set on the server's command only: on process.env, every Node process of
// the run (Playwright, its workers, the build) would write coverage too.
const coverEnv = process.env.E2E_COVERAGE ? `NODE_V8_COVERAGE=${BFF_DIR} ` : "";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    // Blocks that fade in on scroll are shown at once, so axe checks them all.
    reducedMotion: "reduce",
  },
  projects: [
    {
      name: "setup",
      testMatch: "auth.setup.ts",
    },
    {
      name: "api",
      testMatch: "api.spec.ts",
      dependencies: ["setup"],
      use: { storageState: SIGNED_IN_STATE },
    },
    {
      name: "desktop",
      ...screens,
      use: { ...devices["Desktop Chrome"], storageState: SIGNED_IN_STATE },
    },
    {
      name: "mobile",
      ...screens,
      use: { ...devices["Pixel 7"], storageState: SIGNED_IN_STATE },
    },
    ...(browsers
      ? [
          {
            name: "firefox",
            ...screens,
            use: {
              ...devices["Desktop Firefox"],
              storageState: SIGNED_IN_STATE,
            },
          },
          {
            name: "webkit",
            ...screens,
            use: { ...devices["iPhone 15"], storageState: SIGNED_IN_STATE },
          },
        ]
      : []),
  ],
  // Tests run against the production build, on their own port, so a running
  // `yarn dev` is left alone.
  webServer: [
    {
      command: "yarn tsx e2e/smtp-stub.ts",
      url: `${SMTP_STUB_URL}/sent`,
      reuseExistingServer: false,
    },
    {
      // `yarn test:coverage`: the server, and only it, writes which of its
      // code ran when it stops (scripts/coverage.ts merges it).
      command: `yarn db:up && yarn keycloak:up && yarn tsx e2e/reset-database.ts && yarn build && ${coverEnv}yarn start`,
      url: `${BASE_URL}/api/health`,
      timeout: 240_000,
      reuseExistingServer: false,
      // Stopped like Docker stops it, so it exits by itself (and writes its
      // coverage under E2E_COVERAGE) instead of being killed.
      gracefulShutdown: { signal: "SIGTERM", timeout: 10_000 },
    },
  ],
});
