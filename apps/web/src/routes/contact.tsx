import { createFileRoute } from "@tanstack/react-router";
import portrait from "../assets/portrait.jpg";
import { ContactForm } from "../components/contact/contact-form";
import { ContactInfo } from "../components/contact/contact-info";
import { FaqSection } from "../components/contact/faq-section";
import { PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { SectionTitle } from "../components/section-title";
import { pageFor } from "../overrides";
import { usePageMeta } from "../page-meta";

function ContactPage() {
  usePageMeta({
    fullTitle: "Relaxa'Son - Contactez-moi pour prendre rendez-vous",
    image: portrait,
    type: "article",
  });

  return (
    <PageShell>
      <Reveal id="contact">
        <SectionTitle as="h1" className="mb-12">
          Contactez-moi
        </SectionTitle>
        <p className="mb-12 text-center text-lg text-body">
          Pour toute question sur la sonothérapie ou pour prendre rendez-vous,
          n'hésitez pas à me contacter via le formulaire ci-dessous.
        </p>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-12 md:gap-[50px]">
          <div className="md:col-span-5">
            <ContactInfo />
          </div>
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>

        <FaqSection />
      </Reveal>
    </PageShell>
  );
}

export const Route = createFileRoute("/contact")({
  component: pageFor("/contact", ContactPage),
});
