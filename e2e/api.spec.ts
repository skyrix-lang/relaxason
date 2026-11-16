import { expect, sentEmails, test, uniqueSubject } from "./support";

const validMessage = {
  name: "Ada Lovelace",
  email: "ada@example.test",
  phone: "06 12 34 56 78",
  reason: "session",
  message: "Bonjour,\nje souhaite réserver une séance.",
};

test.describe("POST /api/contact", () => {
  // The contact form is for visitors: no session.
  test.use({ storageState: { cookies: [], origins: [] } });

  test("sends the message to the therapist, with the visitor to reply to", async ({
    request,
  }) => {
    const subject = uniqueSubject();

    const response = await request.post("/api/contact", {
      data: { ...validMessage, subject },
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ status: "sent" });
    expect(response.headers()["cache-control"]).toContain("no-store");
    const [email, ...others] = await sentEmails(subject);
    expect(others).toEqual([]);
    expect(email).toMatchObject({
      to: [{ email: "therapist@example.test" }],
      sender: { name: "Contact Sonothérapie", email: "site@example.test" },
      subject: `[Site Web] ${subject}`,
      replyTo: { email: "ada@example.test" },
    });
    expect(email!.htmlContent).toContain("Ada Lovelace");
    expect(email!.htmlContent).toContain("Prise de rendez-vous");
    expect(email!.htmlContent).toContain("Bonjour,<br/>je souhaite réserver");
  });

  test("escapes what the visitor wrote", async ({ request }) => {
    const subject = uniqueSubject();

    await request.post("/api/contact", {
      data: { ...validMessage, subject, name: "<b>Ada</b>" },
    });

    const [email] = await sentEmails(subject);
    expect(email!.htmlContent).toContain("&lt;b&gt;Ada&lt;/b&gt;");
    expect(email!.htmlContent).not.toContain("<b>Ada</b>");
  });

  const invalidMessages = {
    "a missing name": { name: "" },
    "an invalid email": { email: "not-an-email" },
    "an unknown reason": { reason: "spam" },
    "an empty message": { message: "  " },
    "a message that is too long": { message: "x".repeat(5001) },
  };
  for (const [name, override] of Object.entries(invalidMessages)) {
    test(`rejects ${name}, and sends nothing`, async ({ request }) => {
      const subject = uniqueSubject();

      const response = await request.post("/api/contact", {
        data: { ...validMessage, subject, ...override },
      });

      expect(response.status()).toBe(400);
      expect((await response.json()).error).toBe("Invalid request");
      expect(await sentEmails(subject)).toEqual([]);
    });
  }

  test("refuses a form posted from another site", async ({ request }) => {
    const response = await request.post("/api/contact", {
      headers: { origin: "https://evil.example" },
      form: validMessage,
    });

    expect(response.status()).toBe(403);
  });

  test("answers 502 when the email service refuses the message", async ({
    request,
  }) => {
    const response = await request.post("/api/contact", {
      data: { ...validMessage, subject: `FAIL ${uniqueSubject()}` },
    });

    expect(response.status()).toBe(502);
  });

  test("accepts at most 5 messages per client in an hour", async ({
    request,
  }) => {
    const subject = uniqueSubject();
    for (let sent = 0; sent < 5; sent++) {
      const response = await request.post("/api/contact", {
        data: { ...validMessage, subject },
      });
      expect(response.status()).toBe(200);
    }

    const refused = await request.post("/api/contact", {
      data: { ...validMessage, subject },
    });

    expect(refused.status()).toBe(429);
    expect(await sentEmails(subject)).toHaveLength(5);
  });
});

test.describe("without a session", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("/api/me says nobody is signed in", async ({ request }) => {
    const response = await request.get("/api/me");

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ user: null });
  });
});

test.describe("GET /api/health", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("answers without a session when the database is up", async ({
    request,
  }) => {
    const response = await request.get("/api/health");

    expect(response.status()).toBe(200);
    expect(response.headers()["cache-control"]).toContain("no-store");
    expect(await response.json()).toEqual({ status: "ok" });
  });
});

test("/api/me holds no token or id", async ({ request }) => {
  const me = await (await request.get("/api/me")).json();

  expect(me).toEqual({
    user: { email: "e2e-shared@example.test", name: null },
  });
});

test("the API document lists every route", async ({ request }) => {
  const document = await (await request.get("/api/openapi.json")).json();

  expect(Object.keys(document.paths).sort()).toEqual([
    "/api/contact",
    "/api/health",
    "/api/me",
  ]);
});
