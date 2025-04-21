import { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

// Type definitions
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  reason?: string;
  subject?: string;
  message: string;
}

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // Parse the request body
    const data: ContactFormData = JSON.parse(event.body || "{}");

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Get subject text or default
    const emailSubject =
      data.reason ||
      getSubjectLabel(data.subject) ||
      "Nouveau message de contact";

    // Send email
    await transporter.sendMail({
      from: `"Contact Sonothérapie" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: data.email,
      subject: `[Site Web] ${emailSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #1A9E8E;">Nouveau message de contact</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p><strong>Nom:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Téléphone:</strong> ${data.phone || "Non renseigné"}</p>
            <p><strong>Sujet:</strong> ${emailSubject}</p>
          </div>
          <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3>Message:</h3>
            <p>${data.message.replace(/\n/g, "<br/>")}</p>
          </div>
        </div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};

// Helper function to map subject codes to labels
function getSubjectLabel(subject?: string): string {
  if (!subject) return "Demande de contact";

  const subjectMap: Record<string, string> = {
    info: "Demande d'information",
    rdv: "Prise de rendez-vous",
    pricing: "Demande de tarifs",
    other: "Autre sujet",
  };

  return subjectMap[subject] || subject;
}

export { handler };
