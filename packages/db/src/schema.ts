import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

// Fixed-window counters for apps/bff/src/rate-limit.ts, such as sign-in emails per
// address. A row is reused when its window has passed, and deleted later.
export const rateLimits = pgTable(
  "rate_limits",
  {
    key: text().primaryKey(),
    count: integer().notNull(),
    resetAt: timestamp("reset_at", { withTimezone: true }).notNull(),
  },
  (rateLimit) => [index("rate_limits_reset_at_idx").on(rateLimit.resetAt)],
);

// People who have signed in. A user is identified by their identity provider
// (`oidc_issuer`) and its id for them (`oidc_subject`), never by email, which
// the provider may let them change. The name is refreshed at each sign-in; the
// email is set once, when verified (apps/bff/src/users.ts).
export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: text(),
    email: text().unique(),
    oidcIssuer: text("oidc_issuer"),
    oidcSubject: text("oidc_subject"),
  },
  (user) => [
    uniqueIndex("users_oidc_issuer_subject_idx").on(
      user.oidcIssuer,
      user.oidcSubject,
    ),
  ],
);

// Server-side sessions (apps/bff/src/session.ts). The browser holds a random
// token in an HttpOnly cookie; only its SHA-256 hash is stored, so a copy of
// this table can't be used to sign in. Deleting a row signs that session out.
export const userSessions = pgTable(
  "user_sessions",
  {
    tokenHash: text("token_hash").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    // Sent back to the provider on sign-out, so it ends its own session too.
    idToken: text("id_token"),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (session) => [index("user_sessions_user_id_idx").on(session.userId)],
);
