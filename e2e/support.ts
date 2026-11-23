import { randomBytes, randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import {
  expect,
  test as base,
  type BrowserContext,
  type ConsoleMessage,
  type Page,
} from "@playwright/test";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { createLocalSession, storageState } from "../scripts/local-session";
import type { SentEmail } from "./smtp-stub";

/**
 * Every test also fails on:
 * - a console error or uncaught exception in the app (not on Keycloak's
 *   pages). Tests that trigger an error on purpose opt out with
 *   `test.use({ allowConsoleErrors: true })`.
 * - an accessibility violation (WCAG 2.2 AA, checked with axe) on the app
 *   page the test ends on, in Chromium and WebKit.
 * With E2E_COVERAGE=1 (`yarn test:coverage`), each test in Chromium also
 * records which of the app's code ran in the browser (scripts/coverage.ts).
 */
export const test = base.extend<{
  allowConsoleErrors: boolean;
  stubEmbeds: void;
  failOnConsoleError: void;
  checkAccessibility: void;
  browserCoverage: void;
}>({
  // The sonotherapy page embeds a YouTube video. The tests don't depend on
  // YouTube: an empty page stands in for the player. The frame is still
  // subject to the app's content security policy.
  stubEmbeds: [
    async ({ context }, use) => {
      await context.route("https://www.youtube.com/**", (route) =>
        route.fulfill({
          contentType: "text/html",
          body: "<!doctype html><title>Video</title>",
        }),
      );
      await use();
    },
    { auto: true },
  ],
  // Sign-ins are rate limited per client address, which the app reads from
  // x-forwarded-for. Each test gets its own, as if from its own machine, so
  // parallel tests don't share a limit.
  // (`provide` is Playwright's `use`, renamed so it isn't taken for React's.)
  extraHTTPHeaders: async ({ extraHTTPHeaders }, provide) => {
    await provide({ ...extraHTTPHeaders, "x-forwarded-for": randomIp() });
  },
  allowConsoleErrors: [false, { option: true }],
  failOnConsoleError: [
    async ({ page, allowConsoleErrors, baseURL }, use) => {
      const errors: string[] = [];
      const fromApp = () => page.url().startsWith(baseURL!);
      // An unknown address answers 404 on purpose (apps/bff/src/app.ts), and
      // the browser reports the page's own status as an error: not the app's.
      const pageNotFound = (message: ConsoleMessage) =>
        message.text().startsWith("Failed to load resource") &&
        message.text().includes("status of 404") &&
        message.location().url === page.url();
      page.on("console", (message) => {
        if (message.type() === "error" && fromApp() && !pageNotFound(message))
          errors.push(message.text());
      });
      page.on("pageerror", (error) => {
        if (fromApp()) errors.push(error.message);
      });

      await use();

      if (!allowConsoleErrors) expect(errors).toEqual([]);
    },
    { auto: true },
  ],
  checkAccessibility: [
    async ({ page, baseURL, browserName }, use, testInfo) => {
      await use();
      if (testInfo.status !== testInfo.expectedStatus) return;
      if (!page.url().startsWith(baseURL!)) return;
      // firefox 159 (playwright 1.65) crashes while axe checks some pages (a
      // form field that had focus, the consent banner). chromium and webkit
      // check the same pages; see docs/decisions.md.
      if (browserName === "firefox") return;
      // a colour or opacity still changing (a link just made active, a toast
      // fading in) fails contrast midway: check once it ends.
      // endless ones (a spinner) never end, so they aren't waited for.
      await page.evaluate(() =>
        Promise.all(
          document
            .getAnimations()
            .filter((a) => a.effect?.getComputedTiming().endTime !== Infinity)
            .map((a) => a.finished.catch(() => {})),
        ),
      );
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        violations.map(
          ({ id, nodes }) => `${id}: ${nodes.map((n) => n.target).join(", ")}`,
        ),
      ).toEqual([]);
    },
    { auto: true },
  ],
  browserCoverage: [
    async ({ page, browserName, baseURL }, use) => {
      // Only Chromium can report coverage.
      if (!process.env.E2E_COVERAGE || browserName !== "chromium") {
        await use();
        return;
      }
      // Only the test's own page: a page it opens itself isn't recorded.
      await page.coverage.startJSCoverage({ resetOnNavigation: false });
      await use();
      const entries = await page.coverage.stopJSCoverage();
      // The app's own bundles, each with its source map from the build, so
      // the report shows source files rather than minified bundles.
      const assets = `${baseURL}/assets/`;
      const ours = await Promise.all(
        entries
          .filter((entry) => entry.url.startsWith(assets))
          .map(async (entry) => {
            const file = `apps/web/dist/assets/${entry.url.slice(assets.length).split("?")[0]}`;
            const map = await readFile(`${file}.map`, "utf8").catch(() => "");
            if (!map) return entry;
            // Sources as absolute paths: the map's are relative to itself.
            const sourceMap = JSON.parse(map) as { sources: string[] };
            sourceMap.sources = sourceMap.sources.map((source) =>
              resolve(dirname(file), source),
            );
            return { ...entry, sourceMap };
          }),
      );
      if (ours.length === 0) return;
      // Loaded only when recording, so a plain `yarn test` doesn't pay for it.
      const { CoverageReport } = await import("monocart-coverage-reports");
      const { E2E_COVERAGE_OPTIONS } =
        await import("../scripts/coverage-options");
      await new CoverageReport(E2E_COVERAGE_OPTIONS).add(ours);
    },
    { auto: true },
  ],
});

export { expect };

/** An address in 198.18.0.0/15, a range reserved for testing. */
function randomIp() {
  const [a = 0, b = 0, c = 0] = randomBytes(3);
  return `198.${18 + (a % 2)}.${b}.${c}`;
}

async function withDatabase<T>(run: (db: Client) => Promise<T>) {
  const db = new Client({ connectionString: process.env.DATABASE_URL });
  await db.connect();
  try {
    return await run(db);
  } finally {
    await db.end();
  }
}

/** Ends a user's sessions directly in the database, as if they had expired. */
export async function deleteSessionsFromDatabase(email: string) {
  await withDatabase((db) =>
    db.query(
      "DELETE FROM user_sessions WHERE user_id IN (SELECT id FROM users WHERE email = $1)",
      [email],
    ),
  );
}

/** A storage state signed in as `email`, written straight to the database. */
export async function createSessionFor(email: string, baseURL: string) {
  const db = drizzle(process.env.DATABASE_URL!);
  try {
    const { token, expiresAt } = await createLocalSession(db, email);
    return storageState(new URL(baseURL), token, expiresAt);
  } finally {
    await db.$client.end();
  }
}

/** Signs this browser context in as a new user of its own. Returns the email. */
export async function signInAsNewUser(
  context: BrowserContext,
  baseURL: string,
) {
  const email = uniqueEmail();
  const state = await createSessionFor(email, baseURL);
  await context.addCookies(state.cookies);
  return email;
}

/** Fills in the contact form, which must be open. Returns the subject used. */
export async function fillContactForm(page: Page, subject = uniqueSubject()) {
  await page.getByLabel("Nom complet").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.test");
  await page.getByLabel("Téléphone").fill("06 12 34 56 78");
  await page.getByLabel("Raison du contact").selectOption("session");
  await page.getByLabel("Sujet").fill(subject);
  await page.getByLabel("Message").fill("Bonjour,\nje souhaite réserver.");
  return subject;
}

/**
 * Opens a page and waits until the app has rendered it, for tests that depend
 * on client behaviour. Everything is rendered by JavaScript, so the header
 * showing means React is running.
 */
export async function gotoHydrated(page: Page, url: string) {
  await page.goto(url);
  await expect(page.getByRole("banner")).toBeVisible();
}

export function uniqueEmail(domain = "example.test") {
  return `e2e-${randomUUID()}@${domain}`;
}

/** For tests that start signed out, or sign in as their own user. */
export const signedOut = { storageState: { cookies: [], origins: [] } };

/** The users in docker/keycloak/realm.json. */
export const KEYCLOAK_USERS = {
  ada: { username: "ada", password: "ada", email: "ada@example.test" },
  grace: { username: "grace", password: "grace", email: "grace@example.test" },
  // Only for e2e/account-linking.spec.ts, which needs users nobody else signs in as.
  linus: { username: "linus", password: "linus", email: "linus@example.test" },
  // Claims victim@example.test without having verified it.
  mallory: {
    username: "mallory",
    password: "mallory",
    email: "victim@example.test",
  },
} as const;

/** A user created ahead of their first sign-in: an email, no identity. */
export async function createUserWithoutIdentity(email: string) {
  await withDatabase((db) =>
    db.query("INSERT INTO users (email) VALUES ($1)", [email]),
  );
}

/** The users with this email, and whether a provider identity is linked. */
export async function usersWithEmail(email: string) {
  return withDatabase(async (db) => {
    const { rows } = await db.query<{ linked: boolean }>(
      "SELECT oidc_subject IS NOT NULL AS linked FROM users WHERE email = $1",
      [email],
    );
    return rows;
  });
}

/** The emails the app sent (to e2e/smtp-stub.ts) whose subject contains `subject`. */
export async function sentEmails(subject: string): Promise<SentEmail[]> {
  const response = await fetch(`${process.env.SMTP_STUB_URL}/sent`);
  const emails = (await response.json()) as SentEmail[];
  return emails.filter((email) => email.subject.includes(subject));
}

/** A subject no other test uses, to find this test's email. */
export function uniqueSubject() {
  return `E2E ${randomUUID()}`;
}

/** Fills in Keycloak's login form, which must be open. */
export async function logInOnKeycloak(
  page: Page,
  user: { username: string; password: string },
) {
  await page.getByLabel("Username or email").fill(user.username);
  await page.getByLabel("Password", { exact: true }).fill(user.password);
  await page.getByRole("button", { name: "Sign In" }).click();
}
