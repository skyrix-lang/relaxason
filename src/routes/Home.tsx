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
        title="Relaxa'Son - Découvrez le pouvoir thérapeutique des sons"
        description="Une approche holistique qui utilise les vibrations et les fréquences sonores pour apaiser le mental, favoriser l'équilibre intérieur, la relaxation et le bien-être."
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
