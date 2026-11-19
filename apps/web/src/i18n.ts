import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LANGUAGES } from "@relaxason/core";
import fr from "./locales/fr.json";

// The starter's screens (sign-in) read their texts from a messages file;
// the site's own pages are French copy written in the components. Components
// call `useTranslation()` and `t("key")`; keys are type-checked against the
// French file. This site has one language: to add another, add it to
// `LANGUAGES` and a file per language here (see docs/decisions.md).

export const resources = { fr: { app: fr } };

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "app";
    resources: { app: typeof fr };
  }
}

/**
 * Call once at startup, before the first render. A function, not code that
 * runs on import: the app's package.json declares its modules free of side
 * effects, so the build would drop a bare `import "./i18n"`.
 */
export function startI18n() {
  if (i18n.isInitialized) return;
  void i18n.use(initReactI18next).init({
    resources,
    lng: LANGUAGES[0],
    fallbackLng: LANGUAGES[0],
    supportedLngs: LANGUAGES,
    defaultNS: "app",
    ns: ["app"],
    // React escapes what it renders.
    interpolation: { escapeValue: false },
    // The messages are bundled: ready before the first render.
    initAsync: false,
  });
}

export { i18n };
