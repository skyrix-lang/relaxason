import { z } from "zod";

// The contact form: validated by the BFF, and reused by the form in the browser
// so both agree on what a valid message is.

export const CONTACT_REASONS = [
  "information",
  "session",
  "workshop",
  "other",
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number];

/** What the visitor picks in the form. */
export const contactReasonOptions: Record<ContactReason, string> = {
  information: "Demande d'information",
  session: "Réserver une séance",
  workshop: "Séminaire / Atelier",
  other: "Autre",
};

/** What the email to the therapist says. */
export const contactReasonLabels: Record<ContactReason, string> = {
  information: "Demande d'information",
  session: "Prise de rendez-vous",
  workshop: "Information sur les ateliers",
  other: "Autre sujet",
};

export const contactMessageSchema = z
  .object({
    name: z.string().trim().min(1, "Veuillez entrer votre nom").max(200),
    email: z.email("Veuillez entrer une adresse email valide").max(320),
    phone: z.string().trim().max(50).default(""),
    reason: z.enum(CONTACT_REASONS, {
      error: "Veuillez sélectionner une raison de contact",
    }),
    subject: z.string().trim().max(200).default(""),
    message: z
      .string()
      .trim()
      .min(1, "Veuillez entrer votre message")
      .max(5000, "Votre message est trop long (5000 caractères maximum)"),
  })
  .meta({ id: "ContactMessage" });

export type ContactMessage = z.output<typeof contactMessageSchema>;
