import {
  expect,
  fillContactForm,
  gotoHydrated,
  sentEmails,
  signedOut,
  test,
  uniqueSubject,
} from "./support";

// Visitors have no account.
test.use(signedOut);

test("shows how to reach the therapist, and the questions people ask", async ({
  page,
}) => {
  await page.goto("/contact");

  await expect(page.getByText("relaxason.pro@gmail.com")).toBeVisible();
  await expect(
    page.getByText("91360 Villemoisson-sur-Orge, France"),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Foire Aux Questions" }),
  ).toBeVisible();
  await expect(
    page.getByText("Faut-il se préparer avant une séance ?"),
  ).toBeVisible();
});

test("sends a message, thanks the visitor, then offers an empty form", async ({
  page,
}) => {
  await gotoHydrated(page, "/contact");
  const subject = await fillContactForm(page);

  await page.getByRole("button", { name: "Envoyer le message" }).click();

  await expect(page.getByText("Message Envoyé !")).toBeVisible();
  const [email] = await sentEmails(subject);
  expect(email).toMatchObject({
    subject: `[Site Web] ${subject}`,
    replyTo: { email: "ada@example.test" },
  });
  expect(email!.htmlContent).toContain("06 12 34 56 78");

  // The thank-you leaves after a few seconds.
  await expect(page.getByText("Message Envoyé !")).toBeHidden({
    timeout: 10_000,
  });
  await expect(page.getByLabel("Nom complet")).toHaveValue("");
  await expect(page.getByLabel("Message")).toHaveValue("");
});

test("says what is missing, and sends nothing", async ({ page }) => {
  await gotoHydrated(page, "/contact");
  let requests = 0;
  await page.route("**/api/contact", (route) => {
    requests++;
    return route.continue();
  });

  await page.getByLabel("Email").fill("pas-un-email");
  await page.getByRole("button", { name: "Envoyer le message" }).click();

  await expect(page.getByText("Veuillez entrer votre nom")).toBeVisible();
  await expect(
    page.getByText("Veuillez entrer une adresse email valide"),
  ).toBeVisible();
  await expect(
    page.getByText("Veuillez sélectionner une raison de contact"),
  ).toBeVisible();
  await expect(page.getByText("Veuillez entrer votre message")).toBeVisible();
  await expect(page.getByLabel("Nom complet")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  expect(requests).toBe(0);
});

test("shows that the message is being sent", async ({ page }) => {
  await gotoHydrated(page, "/contact");
  let release = () => {};
  const held = new Promise<void>((resolve) => (release = resolve));
  await page.route("**/api/contact", async (route) => {
    await held;
    await route.continue();
  });
  await fillContactForm(page);

  await page.getByRole("button", { name: "Envoyer le message" }).click();

  await expect(
    page.getByRole("status", { name: "Envoi en cours" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Envoyer le message" }),
  ).toBeDisabled();
  release();
  await expect(page.getByText("Message Envoyé !")).toBeVisible();
});

test.describe("when sending fails", () => {
  // The browser logs the API's error response as a console error.
  test.use({ allowConsoleErrors: true });

  test("says so, and keeps what was written", async ({ page }) => {
    await gotoHydrated(page, "/contact");
    const subject = await fillContactForm(page, `FAIL ${uniqueSubject()}`);

    await page.getByRole("button", { name: "Envoyer le message" }).click();

    await expect(page.getByRole("alert")).toContainText(
      "Une erreur est survenue lors de l'envoi du message.",
    );
    await expect(page.getByLabel("Sujet")).toHaveValue(subject);
    await expect(page.getByLabel("Nom complet")).toHaveValue("Ada Lovelace");
    await expect(page.getByText("Message Envoyé !")).toBeHidden();
  });

  test("explains a refusal for too many messages", async ({ page }) => {
    await gotoHydrated(page, "/contact");
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 429, json: { error: "Too many messages" } }),
    );
    await fillContactForm(page);

    await page.getByRole("button", { name: "Envoyer le message" }).click();

    await expect(page.getByRole("alert")).toContainText(
      "Vous avez envoyé plusieurs messages récemment.",
    );
  });
});
