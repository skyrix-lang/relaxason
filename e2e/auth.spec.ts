import {
  expect,
  KEYCLOAK_USERS,
  logInOnKeycloak,
  signedOut,
  test,
} from "./support";

// The public site needs no account: nothing links to /sign-in. The sign-in
// flow is kept for the screens that will, and these tests keep it working.

test.describe("signed out", () => {
  test.use(signedOut);

  test("the sign-in page goes through Keycloak, then comes back", async ({
    page,
  }) => {
    await page.goto("/sign-in?returnTo=%2Fsoins");
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

    await page.getByRole("link", { name: "Continue to sign in" }).click();
    await logInOnKeycloak(page, KEYCLOAK_USERS.ada);

    await expect(page).toHaveURL("/soins");
    const me = await (await page.request.get("/api/me")).json();
    expect(me.user.email).toBe(KEYCLOAK_USERS.ada.email);
  });

  test("ignores a return address on another site", async ({ page }) => {
    await page.goto("/sign-in?returnTo=https%3A%2F%2Fevil.example");
    await page.getByRole("link", { name: "Continue to sign in" }).click();
    await logInOnKeycloak(page, KEYCLOAK_USERS.grace);

    await expect(page).toHaveURL("/");
  });

  test("a wrong password stays on Keycloak", async ({ page }) => {
    await page.goto("/auth/login");
    await logInOnKeycloak(page, { username: "ada", password: "wrong" });

    await expect(page.getByText("Invalid username or password.")).toBeVisible();
  });

  test("a callback without a sign-in in progress is refused", async ({
    page,
  }) => {
    await page.goto("/auth/callback?code=forged&state=forged");

    await expect(page).toHaveURL("/sign-in?error=Expired");
    await expect(page.getByRole("alert")).toContainText("took too long");
  });

  test("the session cookie is HttpOnly and SameSite", async ({
    page,
    context,
  }) => {
    await page.goto("/auth/login");
    await logInOnKeycloak(page, KEYCLOAK_USERS.ada);
    await expect(page).toHaveURL("/");

    const session = (await context.cookies()).find((c) => c.name === "session");
    expect(session).toMatchObject({ httpOnly: true, sameSite: "Lax" });
    expect(await page.evaluate(() => document.cookie)).not.toContain(
      "session=",
    );
  });
});

// Signs in as its own user: signing out would otherwise end the session the
// other tests share.
test.describe("own session", () => {
  test.use(signedOut);

  test("signing out ends the session, and Keycloak's too", async ({ page }) => {
    await page.goto("/auth/login");
    await logInOnKeycloak(page, KEYCLOAK_USERS.grace);
    await expect(page).toHaveURL("/");

    // Signing out is a form post; no screen offers it yet.
    await page.evaluate(() => {
      const form = document.createElement("form");
      form.method = "post";
      form.action = "/auth/logout";
      document.body.append(form);
      form.submit();
    });

    await expect(page).toHaveURL("/");
    const me = await (await page.request.get("/api/me")).json();
    expect(me).toEqual({ user: null });
    // Keycloak asks for the password again: its own session ended as well.
    await page.goto("/auth/login");
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  });
});

test.describe("sign-in limits", () => {
  test.use(signedOut);

  test("starts at most 30 sign-ins per client in 15 minutes", async ({
    request,
  }) => {
    for (let started = 0; started < 30; started++) {
      const response = await request.get("/auth/login", { maxRedirects: 0 });
      expect(response.headers().location).toContain("/realms/relaxason/");
    }

    const refused = await request.get("/auth/login", { maxRedirects: 0 });

    expect(refused.headers().location).toBe("/sign-in?error=RateLimited");
  });
});
