import { contactReasonLabels, type ContactMessage } from "@relaxason/core";
import { env } from "./env";
import { mailer } from "./mail";

// The contact form's email, sent to the therapist through the SMTP server
// (src/mail.ts), with the visitor as the reply-to address.

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

/** The subject and bodies (HTML, and plain text for clients that want it) of the email for a contact message. */
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
  const text = [
    "Nouveau message de contact",
    "",
    `Nom: ${message.name}`,
    `Email: ${message.email}`,
    `Téléphone: ${message.phone || "Non renseigné"}`,
    `Raison de contact: ${reason}`,
    ...(message.subject ? [`Sujet: ${message.subject}`] : []),
    "",
    "Message:",
    message.message,
  ].join("\n");
  return { subject: `[Site Web] ${subject}`, html, text };
}

/**
 * Sends the message. Throws when the SMTP server refuses it or doesn't answer.
 * Without SMTP settings (development only: production requires them) the
 * mailer logs it instead.
 */
export async function sendContactEmail(message: ContactMessage): Promise<void> {
  const { RECIPIENT_EMAIL } = env();
  await mailer().send({
    to: RECIPIENT_EMAIL ?? "",
    replyTo: message.email,
    ...contactEmail(message),
  });
}
