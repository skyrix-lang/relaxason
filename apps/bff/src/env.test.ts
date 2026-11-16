import { describe, expect, it } from "vitest";
import { parseEnv } from "./env";

const development = {
  PUBLIC_URL: "http://localhost:3000",
  DATABASE_URL: "postgres://relaxason:relaxason@localhost:5433/relaxason",
  SESSION_SECRET: "change-me",
  OIDC_ISSUER: "http://localhost:8181/realms/relaxason",
  OIDC_CLIENT_ID: "relaxason-web",
  OIDC_CLIENT_SECRET: "relaxason-web-secret",
};

const production = {
  ...development,
  NODE_ENV: "production",
  PUBLIC_URL: "https://relaxason.example.com",
  SESSION_SECRET: "x".repeat(32),
  BREVO_API_KEY: "xkeysib-test",
  BREVO_SENDER_EMAIL: "site@example.test",
  RECIPIENT_EMAIL: "therapist@example.test",
};

describe("parseEnv", () => {
  it("accepts the development defaults from .env.example", () => {
    expect(parseEnv(development).DATABASE_URL).toBe(development.DATABASE_URL);
  });

  it("lists every missing variable at once", () => {
    expect(() => parseEnv({})).toThrow(
      /PUBLIC_URL[\s\S]*DATABASE_URL[\s\S]*SESSION_SECRET[\s\S]*OIDC_ISSUER/,
    );
  });

  it("rejects a database URL that isn't Postgres", () => {
    expect(() =>
      parseEnv({ ...development, DATABASE_URL: "mysql://localhost/db" }),
    ).toThrow(/DATABASE_URL/);
  });

  it("drops a trailing slash from the public URL", () => {
    const env = parseEnv({
      ...development,
      PUBLIC_URL: "http://localhost:3000/",
    });
    expect(env.PUBLIC_URL).toBe("http://localhost:3000");
  });

  it("accepts a complete production setup", () => {
    expect(() => parseEnv(production)).not.toThrow();
  });

  it("requires a real secret in production", () => {
    expect(() =>
      parseEnv({ ...production, SESSION_SECRET: "change-me" }),
    ).toThrow(/SESSION_SECRET/);
  });

  it("requires the email settings in production", () => {
    expect(() => parseEnv({ ...production, BREVO_API_KEY: undefined })).toThrow(
      /BREVO_API_KEY/,
    );
    expect(() =>
      parseEnv({ ...production, RECIPIENT_EMAIL: "not-an-email" }),
    ).toThrow(/RECIPIENT_EMAIL/);
  });

  it("refuses an analytics id that isn't a GA4 one", () => {
    expect(
      parseEnv({ ...development, GA_MEASUREMENT_ID: "G-ABC123" }),
    ).toMatchObject({ GA_MEASUREMENT_ID: "G-ABC123" });
    expect(
      parseEnv({ ...development, GA_MEASUREMENT_ID: "" }).GA_MEASUREMENT_ID,
    ).toBeUndefined();
    expect(() =>
      parseEnv({ ...development, GA_MEASUREMENT_ID: "G-1;alert(1)" }),
    ).toThrow(/GA_MEASUREMENT_ID/);
  });

  it("requires https in production, except on localhost", () => {
    expect(() =>
      parseEnv({ ...production, PUBLIC_URL: "http://relaxason.example.com" }),
    ).toThrow(/PUBLIC_URL/);
    expect(() =>
      parseEnv({ ...production, PUBLIC_URL: "http://localhost:3100" }),
    ).not.toThrow();
  });
});
