import { createRoute, OpenAPIHono, type Hook } from "@hono/zod-openapi";
import type { Env } from "hono";
import { z } from "zod";
import { contactMessageSchema } from "@relaxason/core";
import { clientIp } from "../client-ip";
import { sendContactEmail } from "../contact";
import { isDatabaseReachable } from "../health";
import { log } from "../log";
import { hit, type RateLimit } from "../rate-limit";
import { getSessionUser, type SessionUser } from "../session";

// The JSON API. Every route is declared with its schemas, which validate the
// request and make up the OpenAPI document (/api/openapi.json) that
// packages/api generates the web client from. The site is public, so its routes
// are too; routes for signed-in users go on `userApi`, and pass user.id to the
// data layer, which filters by it.

export type ApiEnv = { Variables: { user: SessionUser } };

const errorSchema = z
  .object({ error: z.string(), issues: z.array(z.unknown()).optional() })
  .meta({ id: "ApiErrorBody" });

const errorResponse = (description: string) => ({
  description,
  content: { "application/json": { schema: errorSchema } },
});

const json = <T extends z.ZodType>(schema: T, description: string) => ({
  description,
  content: { "application/json": { schema } },
});

const meSchema = z
  .object({
    user: z
      .object({ email: z.string().nullable(), name: z.string().nullable() })
      .nullable(),
  })
  .meta({ id: "Me" });

// Each message is an email through a paid service, so one client can't flood it.
const CONTACT_MESSAGES_PER_CLIENT: RateLimit = {
  limit: 5,
  windowSeconds: 60 * 60,
};

const sendContactMessageRoute = createRoute({
  method: "post",
  path: "/contact",
  operationId: "sendContactMessage",
  request: {
    body: {
      required: true,
      content: { "application/json": { schema: contactMessageSchema } },
    },
  },
  responses: {
    200: json(z.object({ status: z.literal("sent") }), "The message was sent"),
    400: errorResponse("Invalid request"),
    429: errorResponse("Too many messages from this client"),
    502: errorResponse("The email service refused the message"),
  },
});

const meRoute = createRoute({
  method: "get",
  path: "/me",
  operationId: "getMe",
  responses: {
    // 200 with null rather than 401: the header asks on every page, and a 401
    // would be logged as an error by the browser.
    200: json(meSchema, "The signed-in user, or null"),
  },
});

const healthRoute = createRoute({
  method: "get",
  path: "/health",
  operationId: "getHealth",
  responses: {
    200: json(z.object({ status: z.literal("ok") }), "The database answers"),
    503: json(z.object({ status: z.literal("unavailable") }), "It doesn't"),
  },
});

// A request that fails its schema gets this API's error shape.
const invalidRequest =
  <E extends Env>(): Hook<unknown, E, string, unknown> =>
  (result, c) => {
    if (!result.success) {
      return c.json(
        { error: "Invalid request", issues: result.error.issues },
        400,
      );
    }
  };

const publicApi = new OpenAPIHono({ defaultHook: invalidRequest() })
  // Public on purpose, for load balancers and uptime checks: it says only
  // whether the app can reach its database. 503 tells them to stop sending traffic.
  .openapi(healthRoute, async (c) => {
    c.header("Cache-Control", "no-store");
    return (await isDatabaseReachable())
      ? c.json({ status: "ok" as const }, 200)
      : c.json({ status: "unavailable" as const }, 503);
  })
  .openapi(meRoute, async (c) => {
    c.header("Cache-Control", "no-store");
    const user = await getSessionUser(c);
    return c.json(
      { user: user ? { email: user.email, name: user.name } : null },
      200,
    );
  })
  // Public on purpose: the contact form is for visitors, who have no account.
  // Limited per client address, since each message is an email.
  .openapi(sendContactMessageRoute, async (c) => {
    c.header("Cache-Control", "no-store");
    const message = c.req.valid("json");
    const ip = clientIp(c.req.raw.headers) ?? "unknown";
    if (!(await hit(`contact:client:${ip}`, CONTACT_MESSAGES_PER_CLIENT))) {
      return c.json({ error: "Too many messages" }, 429);
    }
    try {
      await sendContactEmail(message);
    } catch (error) {
      log.error("Contact message: sending failed", { error });
      return c.json({ error: "The message couldn't be sent" }, 502);
    }
    return c.json({ status: "sent" as const }, 200);
  });

// Routes for signed-in users. None yet: add them here with `.openapi(...)`.
const userApi = new OpenAPIHono<ApiEnv>({
  defaultHook: invalidRequest<ApiEnv>(),
});

// Each route checks the session: every one of them is a public endpoint.
userApi.use(async (c, next) => {
  const user = await getSessionUser(c);
  if (!user) return c.json({ error: "Unauthorized" }, 401);
  c.set("user", user);
  c.header("Cache-Control", "no-store");
  await next();
});

export const api = new OpenAPIHono();
api.route("/", publicApi);
api.route("/", userApi);

/** The OpenAPI document for this API, with paths under /api. */
export function openApiDocument() {
  const document = new OpenAPIHono();
  document.route("/api", api);
  return document.getOpenAPI31Document({
    openapi: "3.1.0",
    info: { title: "Relaxason API", version: "1.0.0" },
  });
}
