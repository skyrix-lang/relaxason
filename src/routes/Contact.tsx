import { FunctionComponent, useEffect, useState } from "react";
import { Box, Grid, Text, Title } from "@mantine/core";
import global from "../styles/Global.module.css";

// Import components
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import FaqSection from "../components/contact/FaqSection";
import Confetti from "../components/contact/Confetti";
import useScrollToHash from "../hooks/useScrollToHash.ts";
import useScrollVisibility from "../hooks/useScrollVisibility.ts";

const Contact: FunctionComponent = () => {
  // Hook to handle hash-based navigation
  useScrollToHash();

  // Hook to handle visibility of sections when scrolling
  const visibleSections = useScrollVisibility(["contact", "faq"]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Reset error message when form is submitted
  useEffect(() => {
    if (submitted) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError("");

    try {
      // Add the readable subject text
      const formData = {
        ...values,
      };

      // Send the form data to your Netlify Function
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue");
      }

      console.log("Form submitted successfully!", result);
      setSubmitted(true);

      // Optional: Reset form after a delay
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to submit form:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'envoi du message. Merci de réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className={
        visibleSections.contact
          ? `${global.fadeInSection} ${global.visible} ${global.aboutWrapper}`
          : global.fadeInSection
      }
    >
      {/* Confetti effect when message is sent successfully */}
      {showConfetti && <Confetti />}

      {/* Page Title */}
      <Title order={1} mb="xl" className={global.sectionTitle}>
        <Box component="span" className={global.titleUnderline} />
        Contactez-moi
      </Title>

      <Text size="lg" mb="xl" ta="center" className={global.mb4}>
        Pour toute question sur la sonothérapie ou pour prendre rendez-vous,
        n'hésitez pas à me contacter via le formulaire ci-dessous.
      </Text>

      <Grid gutter={{ base: 20, md: 50 }} align="stretch">
        <Grid.Col span={{ base: 12, md: 5 }}>
          <ContactInfo />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <ContactForm
            loading={loading}
            submitted={submitted}
            error={error}
            onSubmit={handleSubmit}
          />
        </Grid.Col>
      </Grid>

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
};

export default Contact;
