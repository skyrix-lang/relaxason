import { useState } from "react";
import { Button } from "@relaxason/ui";
import {
  acceptAnalytics,
  analyticsEnabled,
  declineAnalytics,
  storedConsent,
} from "../analytics";

/** Asks once whether the audience measurement may use cookies. */
export function CookieConsent() {
  // The answer lives in the browser's storage; the app only renders there.
  const [visible, setVisible] = useState(
    () => analyticsEnabled && storedConsent() === null,
  );

  if (!visible) return null;

  return (
    <section
      aria-label="Cookies"
      className="fixed inset-x-5 bottom-5 z-[1000] mx-auto max-w-[500px] rounded-md border bg-surface p-6 shadow-md"
    >
      <p className="mb-6 text-sm text-body">
        Ce site utilise des cookies pour analyser son trafic et améliorer votre
        expérience utilisateur. En acceptant, vous nous aidez à comprendre
        comment les visiteurs utilisent notre site.
      </p>
      <div className="flex justify-end gap-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            declineAnalytics();
            setVisible(false);
          }}
        >
          Refuser
        </Button>
        <Button
          variant="cta"
          size="sm"
          onClick={() => {
            acceptAnalytics();
            setVisible(false);
          }}
        >
          Accepter
        </Button>
      </div>
    </section>
  );
}
