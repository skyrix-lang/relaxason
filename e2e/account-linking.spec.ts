import {
  createUserWithoutIdentity,
  expect,
  KEYCLOAK_USERS,
  logInOnKeycloak,
  signedOut,
  test,
  usersWithEmail,
} from "./support";

// apps/bff/src/users.ts: a user created ahead of their first sign-in (by
// `yarn dev:session`, or by email in advance) is linked to their identity, but
// only when the provider has verified the email. Each case uses its own
// Keycloak user, and runs once, in one browser (the nightly runs three): the
// first sign-in is the one that links.
test.describe.configure({ mode: "serial" });
test.use(signedOut);

test("a verified email links to the existing user", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "the first sign-in links; run it once",
  );
  const { email } = KEYCLOAK_USERS.linus;
  await createUserWithoutIdentity(email);

  await page.goto("/auth/login");
  await logInOnKeycloak(page, KEYCLOAK_USERS.linus);
  await expect(page).toHaveURL("/");

  const me = await (await page.request.get("/api/me")).json();
  expect(me.user.email).toBe(email);
  expect(await usersWithEmail(email)).toEqual([{ linked: true }]);
});

test("an unverified email doesn't take over someone's account", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "the first sign-in links; run it once",
  );
  const { email } = KEYCLOAK_USERS.mallory;
  await createUserWithoutIdentity(email);

  await page.goto("/auth/login");
  await logInOnKeycloak(page, KEYCLOAK_USERS.mallory);
  await expect(page).toHaveURL("/");

  // Signed in as a new user, and the unverified address doesn't show as theirs.
  const me = await (await page.request.get("/api/me")).json();
  expect(me.user).toMatchObject({ email: null });
  expect(await usersWithEmail(email)).toEqual([{ linked: false }]);
});
