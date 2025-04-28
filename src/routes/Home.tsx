import React from "react";
import HeroSection from "../components/home/HeroSection";
import IntroSection from "../components/home/IntroSection";
import BenefitsSection from "../components/home/BenefitsSection";
import ServicesSection from "../components/home/ServicesSection";
import TestimonialSection from "../components/home/TestimonialSection";
import CTASection from "../components/home/CTASection";
import useScrollToHash from "../hooks/useScrollToHash.ts";
import useScrollVisibility from "../hooks/useScrollVisibility.ts";

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
