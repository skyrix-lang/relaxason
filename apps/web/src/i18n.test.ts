import { describe, expect, it } from "vitest";
import { LANGUAGES } from "@relaxason/core";
import { i18n, resources } from "./i18n";

describe("the messages", () => {
  it("exist for every language the site offers", () => {
    expect(Object.keys(resources).sort()).toEqual([...LANGUAGES].sort());
  });

  it("answer in French", () => {
    expect(i18n.t("signIn.continue")).toBe("Continuer vers la connexion");
  });
});
