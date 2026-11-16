import { beforeEach, describe, expect, it, vi } from "vitest";

const ID = "G-TEST123";

/** The module reads the id when it loads: import it fresh for each test. */
async function load() {
  vi.resetModules();
  return import("./analytics");
}

function googleScripts() {
  return document.head.querySelectorAll('script[src*="googletagmanager.com"]');
}

beforeEach(() => {
  document.head.innerHTML = `<meta name="ga-measurement-id" content="${ID}">`;
  window.localStorage.clear();
  delete window.dataLayer;
});

describe("analytics consent", () => {
  it("loads nothing before the visitor answers", async () => {
    const { startAnalytics, trackPageView } = await load();
    startAnalytics();
    trackPageView("/soins");
    expect(googleScripts()).toHaveLength(0);
    expect(window.dataLayer).toBeUndefined();
  });

  it("starts as soon as the visitor accepts", async () => {
    const { acceptAnalytics, storedConsent } = await load();
    acceptAnalytics();
    expect(storedConsent()).toBe("true");
    expect(googleScripts()).toHaveLength(1);
    expect(window.dataLayer).toHaveLength(2);
  });

  it("starts on a later visit by someone who accepted", async () => {
    window.localStorage.setItem("cookie-consent", "true");
    const { startAnalytics } = await load();
    startAnalytics();
    startAnalytics();
    expect(googleScripts()).toHaveLength(1);
  });

  it("loads nothing after a refusal", async () => {
    const { declineAnalytics, startAnalytics, storedConsent } = await load();
    declineAnalytics();
    startAnalytics();
    expect(storedConsent()).toBe("false");
    expect(googleScripts()).toHaveLength(0);
  });

  it("does nothing without a measurement id", async () => {
    document.head.innerHTML =
      '<meta name="ga-measurement-id" content="%GA_MEASUREMENT_ID%">';
    const { acceptAnalytics, analyticsEnabled } = await load();
    acceptAnalytics();
    expect(analyticsEnabled).toBe(false);
    expect(googleScripts()).toHaveLength(0);
  });
});
