// Google Analytics (GA4), when the server is configured with a measurement id
// (GA_MEASUREMENT_ID): the BFF writes it into index.html. Nothing is loaded
// from Google and no cookie is set until the visitor accepts in the banner
// (components/cookie-consent.tsx), as the CNIL requires. The script comes from
// Google's origin, which the BFF's content security policy then allows.

const CONSENT_KEY = "cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    [disable: `ga-disable-${string}`]: boolean | undefined;
  }
}

function configuredId(): string | undefined {
  const id = document.querySelector<HTMLMetaElement>(
    'meta[name="ga-measurement-id"]',
  )?.content;
  return id && /^G-[A-Z0-9]+$/.test(id) ? id : undefined;
}

const measurementId = configuredId();

/** True when this deployment measures its audience. */
export const analyticsEnabled = measurementId !== undefined;

/** "true", "false", or null when the visitor hasn't answered yet. */
export function storedConsent(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function gtag(..._args: unknown[]) {
  // Google's library reads the `arguments` object itself, not an array.
  // oxlint-disable-next-line prefer-rest-params -- required by gtag.js
  window.dataLayer?.push(arguments);
}

let started = false;

/** Loads the library once, and only for a visitor who has accepted. */
export function startAnalytics() {
  if (!measurementId || started) return;
  if (storedConsent() !== "true") return;
  window[`ga-disable-${measurementId}`] = false;
  started = true;
  window.dataLayer = window.dataLayer ?? [];
  gtag("js", new Date());
  gtag("config", measurementId);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);
}

/** A page view, sent on each client-side navigation. */
export function trackPageView(path: string) {
  if (!measurementId || !started) return;
  gtag("config", measurementId, { page_path: path });
}

/** Remembers the agreement and starts measuring, from this page on. */
export function acceptAnalytics() {
  try {
    window.localStorage.setItem(CONSENT_KEY, "true");
  } catch {
    // Storage is blocked: the answer can't be kept, so nothing is measured.
    return;
  }
  startAnalytics();
}

/** Remembers the refusal, stops measuring and removes Google's cookies. */
export function declineAnalytics() {
  try {
    window.localStorage.setItem(CONSENT_KEY, "false");
  } catch {
    // Storage is blocked: the banner comes back on the next visit.
  }
  if (!measurementId) return;
  window[`ga-disable-${measurementId}`] = true;
  for (const name of ["_ga", `_ga_${measurementId.slice(2)}`, "_gid", "_gat"]) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
