import React from "react";
import HeroSection from "../components/home/HeroSection";
import IntroSection from "../components/home/IntroSection";
import BenefitsSection from "../components/home/BenefitsSection";
import ServicesSection from "../components/home/ServicesSection";
import TestimonialSection from "../components/home/TestimonialSection";
import CTASection from "../components/home/CTASection";
import useScrollToHash from "../hooks/useScrollToHash.ts";
import useScrollVisibility from "../hooks/useScrollVisibility.ts";
import outils from "../assets/outils.jpg";
import SEOMetadata from "../components/google/SEOMetaData.tsx";

const Home = () => {
  // Hook to handle hash-based navigation
  useScrollToHash();

  // Hook to handle visibility of sections when scrolling
  const visibleSections = useScrollVisibility([
    "hero",
    "intro",
    "benefits",
    "services",
    "testimonials",
    "cta",
  ]);

  return (
    <>
      <SEOMetadata
        title="Sonothérapie - Découvrez les bienfaits du son pour votre bien-être"
        description="Explorez la puissance thérapeutique des sons et vibrations. Mes sessions de sonothérapie vous aident à réduire le stress, améliorer le sommeil et retrouver l'équilibre intérieur."
        image={outils}
        url="https://relaxason.com"
        type="article"
      />
      <HeroSection isVisible={visibleSections.hero} />
      <IntroSection isVisible={visibleSections.intro} />
      <BenefitsSection isVisible={visibleSections.benefits} />
      <ServicesSection isVisible={visibleSections.services} />
      <TestimonialSection isVisible={visibleSections.testimonials} />
      <CTASection isVisible={visibleSections.cta} />
    </>
  );
};

export default Home;
