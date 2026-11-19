import { expect, gotoHydrated, test } from "./support";

test.describe("home page", () => {
  test("shows the hero, the sections and the title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(
      "Relaxa'Son - Découvrez le pouvoir thérapeutique des sons",
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Découvrez le pouvoir thérapeutique des sons",
      }),
    ).toBeVisible();
    for (const name of [
      "La Sonothérapie",
      "Les Bienfaits",
      "Ce que je propose",
      "Témoignages",
      "Prêt à commencer votre voyage sonore ?",
    ]) {
      await expect(page.getByRole("heading", { name })).toBeAttached();
    }
  });

  test("loads the logo", async ({ page }) => {
    await page.goto("/");

    const logo = page.getByRole("banner").locator("img");
    await expect(logo).toBeVisible();
    await expect
      .poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
  });

  test("leads to the treatments and to the contact form", async ({ page }) => {
    await gotoHydrated(page, "/");

    await page.getByRole("link", { name: "Découvrir mes soins" }).click();
    await expect(page).toHaveURL("/soins");
    await expect(
      page.getByRole("heading", { level: 1, name: "Soins Proposés" }),
    ).toBeVisible();

    await page.goBack();
    await page
      .locator("#hero")
      .getByRole("link", { name: "Prendre rendez-vous" })
      .click();
    await expect(page).toHaveURL("/contact");
  });

  test("a service card opens its section of the treatments page", async ({
    page,
  }) => {
    await gotoHydrated(page, "/");

    await page
      .getByRole("link", {
        name: "Voir les détails : Voyage Sonore Collectif",
      })
      .click();

    await expect(page).toHaveURL("/soins#voyage");
    await expect(
      page.getByRole("heading", { name: "Voyage Sonore Collectif" }),
    ).toBeInViewport();
  });

  test("the testimonials can be browsed", async ({ page }) => {
    await gotoHydrated(page, "/");
    const carousel = page.getByRole("group", { name: "Témoignages" });
    await expect(carousel.getByText("Isabelle")).toBeVisible();

    await carousel.getByRole("button", { name: "Témoignage suivant" }).click();
    await expect(carousel.getByText("Virginie")).toBeVisible();

    await carousel.getByRole("button", { name: "Témoignage de Lucie" }).click();
    await expect(carousel.getByText("Lucie", { exact: true })).toBeVisible();

    await carousel
      .getByRole("button", { name: "Témoignage précédent" })
      .click();
    await expect(carousel.getByText("Virginie")).toBeVisible();
  });
});

const pages = [
  { path: "/mon-parcours", link: "Mon parcours", heading: "Mon Parcours" },
  {
    path: "/sonotherapie",
    link: "La sonothérapie, c'est quoi ?",
    heading: "La Sonothérapie",
  },
  { path: "/contact", link: "Me contacter", heading: "Contactez-moi" },
];

test.describe("header", () => {
  test("desktop navigation", async ({ page, isMobile }) => {
    test.skip(isMobile, "the desktop navigation is hidden on mobile");
    await gotoHydrated(page, "/");
    const header = page.getByRole("banner");
    await expect(
      header.getByRole("button", { name: "Ouvrir le menu" }),
    ).toBeHidden();

    for (const { path, link, heading } of pages) {
      await header.getByRole("link", { name: link }).click();
      await expect(page).toHaveURL(path);
      await expect(
        page.getByRole("heading", { level: 1, name: heading }),
      ).toBeVisible();
      await expect(header.getByRole("link", { name: link })).toHaveAttribute(
        "data-active",
        "true",
      );
    }
  });

  test("the treatments menu opens a section", async ({ page, isMobile }) => {
    test.skip(isMobile, "the desktop navigation is hidden on mobile");
    await gotoHydrated(page, "/");
    const header = page.getByRole("banner");
    const menu = header.getByRole("button", { name: "Soins proposés" });
    await expect(header.getByRole("link", { name: "Tarifs" })).toBeHidden();

    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await header.getByRole("link", { name: "Tarifs" }).click();

    await expect(page).toHaveURL("/soins#tarifs");
    await expect(
      page.getByRole("heading", { name: "Tarifs", exact: true }),
    ).toBeInViewport();
    await expect(header.getByRole("link", { name: "Tarifs" })).toBeHidden();
  });

  test("the partners menu links to the partner's site", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "the desktop navigation is hidden on mobile");
    await gotoHydrated(page, "/");
    const header = page.getByRole("banner");

    await header.getByRole("button", { name: "Liens et partenariats" }).click();

    const partner = header.getByRole("link", { name: "Le Pont d'Ostara" });
    await expect(partner).toHaveAttribute("href", "https://pontdostara.fr/");
    await expect(partner).toHaveAttribute("target", "_blank");
    await expect(partner).toHaveAttribute("rel", /noopener/);
  });

  test("mobile menu", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the mobile menu is hidden on desktop");
    await gotoHydrated(page, "/");
    const header = page.getByRole("banner");
    await expect(
      header.getByRole("link", { name: "Me contacter" }),
    ).toBeHidden();

    await header.getByRole("button", { name: "Ouvrir le menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "→ Massage suédois" }).click();

    await expect(page).toHaveURL("/soins#suedois");
    await expect(menu).toBeHidden();

    await header.getByRole("button", { name: "Ouvrir le menu" }).click();
    await menu.getByRole("button", { name: "Fermer le menu" }).click();
    await expect(menu).toBeHidden();
  });
});

test.describe("the treatments page", () => {
  test("lists every treatment and the prices", async ({ page }) => {
    await page.goto("/soins");

    for (const name of [
      "Massage Sonore Individuel",
      "Voyage Sonore Collectif",
      "Séminaire de Reconnexion au Corps et aux Émotions",
      "Drainage Manuel de Bien-Être",
      "Massage Suédois",
      "Tarifs",
    ]) {
      await expect(
        page.getByRole("heading", { level: 2, name, exact: true }),
      ).toBeAttached();
    }
    const prices = page.locator("#tarifs");
    await expect(prices.getByText("70 min - 70€")).toBeAttached();
    await expect(
      prices.getByText("Séminaire 4 jours – tout compris - 600€"),
    ).toBeAttached();
  });
});

test.describe("the sonotherapy page", () => {
  test("embeds the television report", async ({ page }) => {
    await page.goto("/sonotherapie");

    // The content security policy allows this frame: a refusal would be a
    // console error, which fails the test.
    const video = page.locator('iframe[title*="Télématin"]');
    await video.scrollIntoViewIfNeeded();
    await expect(video).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/4bksvOoIyCA",
    );
  });
});

test.describe("unknown pages", () => {
  test("show the not-found page, which isn't indexed", async ({ page }) => {
    // The server answers 404 (seo.spec.ts) and the page also asks search
    // engines not to index it.
    await page.goto("/does-not-exist");

    await expect(page).toHaveTitle("Page non trouvée | Relaxa'Son");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex",
    );

    await page
      .getByRole("link", { name: "Retour sur la page d'accueil" })
      .click();

    await expect(page).toHaveURL("/");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });

  test("an unknown API path is a JSON 404, not the app", async ({
    request,
  }) => {
    const response = await request.get("/api/does-not-exist");

    expect(response.status()).toBe(404);
    expect(response.headers()["content-type"]).toContain("application/json");
  });
});
