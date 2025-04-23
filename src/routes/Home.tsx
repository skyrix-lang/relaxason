import React, { useEffect, useState } from "react";
import HeroSection from "../components/home/HeroSection";
import IntroSection from "../components/home/IntroSection";
import BenefitsSection from "../components/home/BenefitsSection";
import ServicesSection from "../components/home/ServicesSection";
import TestimonialSection from "../components/home/TestimonialSection";
import CTASection from "../components/home/CTASection";

interface VisibleSection {
  hero: boolean;
  intro: boolean;
  benefits: boolean;
  services: boolean;
  testimonial: boolean;
  cta: boolean;
}

export interface VisibleSectionProps {
  visible: VisibleSection;
}

const Home = () => {
  // State pour les animations au scroll
  const [visible, setVisible] = useState<VisibleSection>({
    hero: false,
    intro: false,
    benefits: false,
    services: false,
    testimonial: false,
    cta: false,
  });

  // Observer pour les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observer tous les sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <HeroSection visible={visible} />
      <IntroSection visible={visible} />
      <BenefitsSection visible={visible} />
      <ServicesSection visible={visible} />
      <TestimonialSection visible={visible} />
      <CTASection visible={visible} />
    </>
  );
};

export default Home;
