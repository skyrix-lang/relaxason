import { createFileRoute } from "@tanstack/react-router";
import { BenefitsSection } from "../components/home/benefits-section";
import { CtaSection } from "../components/home/cta-section";
import { HeroSection } from "../components/home/hero-section";
import { IntroSection } from "../components/home/intro-section";
import { ServicesSection } from "../components/home/services-section";
import { TestimonialsSection } from "../components/home/testimonials-section";
import { pageFor } from "../overrides";
import { usePageMeta } from "../page-meta";

// A public page: index.html carries its title, description, canonical URL and
// structured data, so crawlers have them before JavaScript runs.
function HomePage() {
  usePageMeta({
    fullTitle: "Relaxa'Son - Découvrez le pouvoir thérapeutique des sons",
    type: "article",
  });
  return (
    <>
      <HeroSection />
      <IntroSection />
      <BenefitsSection />
      <ServicesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}

export const Route = createFileRoute("/")({
  component: pageFor("/", HomePage),
});
