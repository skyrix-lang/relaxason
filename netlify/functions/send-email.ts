// netlify/functions/send-email.ts
import { Handler } from "@netlify/functions";
import { BrevoClient } from "@getbrevo/brevo";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  reason: string;
}

const handler: Handler = async (event) => {
  // N'autoriser que les requêtes POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // Analyser le corps de la requête
    const data: ContactFormData = JSON.parse(event.body || "{}");

    // Validation de base
    if (!data.name || !data.email || !data.message || !data.reason) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Champs obligatoires manquants" }),
      };
    }

    // Obtenir le texte du sujet ou utiliser la raison de contact
    const emailSubject =
      data.subject ||
      getReasonLabel(data.reason) ||
      "Nouveau message de contact";

    // Configurer l'API Brevo
    const brevo = new BrevoClient({
      apiKey: process.env.BREVO_API_KEY as string,
    });

    // Envoyer l'email
    await brevo.transactionalEmails.sendTransacEmail({
      to: [{ email: process.env.RECIPIENT_EMAIL as string }],
      sender: {
        name: "Contact Sonothérapie",
        email: process.env.BREVO_SENDER_EMAIL as string,
      },
      subject: `[Site Web] ${emailSubject}`,
      htmlContent: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #008577;">Nouveau message de contact</h2>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          <p><strong>Nom:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Téléphone:</strong> ${data.phone || "Non renseigné"}</p>
          <p><strong>Raison de contact:</strong> ${getReasonLabel(data.reason)}</p>
          ${data.subject ? `<p><strong>Sujet:</strong> ${data.subject}</p>` : ""}
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <h3>Message:</h3>
          <p>${data.message.replace(/\n/g, "<br/>")}</p>
        </div>
      </div>
    `,
      replyTo: { email: data.email },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email envoyé avec succès" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Échec de l'envoi de l'email" }),
    };
  }
};

// Fonction auxiliaire pour associer les raisons de contact à des libellés
function getReasonLabel(reason: string): string {
  if (!reason) return "Demande de contact";

  const reasonMap: Record<string, string> = {
    information: "Demande d'information",
    session: "Prise de rendez-vous",
    workshop: "Information sur les ateliers",
    other: "Autre sujet",
  };

  return reasonMap[reason] || reason;
}

export { handler };
