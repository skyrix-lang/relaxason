import { describe, expect, it } from "vitest";
import { contactEmail, escapeHtml } from "./contact";

const message = {
  name: "Ada Lovelace",
  email: "ada@example.test",
  phone: "",
  reason: "session" as const,
  subject: "",
  message: "Bonjour,\nje souhaite réserver.",
};

describe("contactEmail", () => {
  it("uses the reason as the subject when none was given", () => {
    expect(contactEmail(message).subject).toBe(
      "[Site Web] Prise de rendez-vous",
    );
    expect(contactEmail({ ...message, subject: "Carte cadeau" }).subject).toBe(
      "[Site Web] Carte cadeau",
    );
  });

  it("shows the message with its line breaks, and a missing phone", () => {
    const { html } = contactEmail(message);
    expect(html).toContain("Bonjour,<br/>je souhaite réserver.");
    expect(html).toContain("<strong>Téléphone:</strong> Non renseigné");
    expect(html).not.toContain("Sujet:");
  });

  it("never lets the visitor's text become markup", () => {
    const { html } = contactEmail({
      ...message,
      name: '<img src=x onerror="alert(1)">',
      message: "<script>alert(1)</script>",
    });
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
  });
});

describe("escapeHtml", () => {
  it("escapes the five characters that matter", () => {
    expect(escapeHtml(`<a href="x">Tom & 'Jerry'</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;Tom &amp; &#39;Jerry&#39;&lt;/a&gt;",
    );
  });
});
