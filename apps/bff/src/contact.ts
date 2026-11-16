import { contactReasonLabels, type ContactMessage } from "@relaxason/core";
import { env } from "./env";
import { log } from "./log";

// The contact form's email, sent to the therapist through Brevo's transactional
// API. Plain fetch: one request needs no SDK.

const escapes: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** The visitor's text lands in HTML: it's text, never markup. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => escapes[character]!);
}

/** The subject and body of the email for a contact message. */
export function contactEmail(message: ContactMessage) {
  const reason = contactReasonLabels[message.reason];
  const subject = message.subject || reason;
  const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #008577;">Nouveau message de contact</h2>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          <p><strong>Nom:</strong> ${escapeHtml(message.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(message.email)}</p>
          <p><strong>Téléphone:</strong> ${escapeHtml(message.phone || "Non renseigné")}</p>
          <p><strong>Raison de contact:</strong> ${escapeHtml(reason)}</p>
          ${message.subject ? `<p><strong>Sujet:</strong> ${escapeHtml(message.subject)}</p>` : ""}
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <h3>Message:</h3>
          <p>${escapeHtml(message.message).replace(/\n/g, "<br/>")}</p>
        </div>
      </div>
    `;
  return { subject: `[Site Web] ${subject}`, html };
}

/**
 * Sends the message. Throws when Brevo refuses it or doesn't answer. Without
 * Brevo settings (development only: production requires them) nothing is sent.
 */
export async function sendContactEmail(message: ContactMessage): Promise<void> {
  const { BREVO_API_KEY, BREVO_API_URL, BREVO_SENDER_EMAIL, RECIPIENT_EMAIL } =
    env();
  const { subject, html } = contactEmail(message);
  if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL || !RECIPIENT_EMAIL) {
    log.warn("Contact message not sent: Brevo isn't configured", { subject });
    return;
  }

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      to: [{ email: RECIPIENT_EMAIL }],
      sender: { name: "Contact Sonothérapie", email: BREVO_SENDER_EMAIL },
      subject,
      htmlContent: html,
      replyTo: { email: message.email },
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(`Brevo answered ${response.status}`);
  }
}
