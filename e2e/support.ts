import { randomBytes, randomUUID } from "node:crypto";
import AxeBuilder from "@axe-core/playwright";
import {
  expect,
  test as base,
  type BrowserContext,
  type Page,
} from "@playwright/test";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { createLocalSession, storageState } from "../scripts/local-session";

/**
 * Every test also fails on:
 * - a console error or uncaught exception in the app (not on Keycloak's
 *   pages). Tests that trigger an error on purpose opt out with
 *   `test.use({ allowConsoleErrors: true })`.
 * - an accessibility violation (WCAG 2.2 AA, checked with axe) on the app
 *   page the test ends on.
 */
export const test = base.extend<{
  allowConsoleErrors: boolean;
  stubEmbeds: void;
  failOnConsoleError: void;
  checkAccessibility: void;
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
      page.on("console", (message) => {
        if (message.type() === "error" && fromApp())
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
    async ({ page, baseURL }, use, testInfo) => {
      await use();
      if (testInfo.status !== testInfo.expectedStatus) return;
      if (!page.url().startsWith(baseURL!)) return;
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

/** What the fake Brevo (e2e/brevo-stub.ts) received. */
export interface SentEmail {
  to: { email: string }[];
  sender: { name: string; email: string };
  subject: string;
  htmlContent: string;
  replyTo: { email: string };
}

/** The emails the app sent whose subject contains `subject`. */
export async function sentEmails(subject: string): Promise<SentEmail[]> {
  const response = await fetch(`${process.env.BREVO_STUB_URL}/sent`);
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
