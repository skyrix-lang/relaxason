import { FC } from "react";
import { Box, Space, Text, Title } from "@mantine/core";
import global from "../styles/Global.module.css";
import useScrollToHash from "../hooks/useScrollToHash";
import useScrollVisibility from "../hooks/useScrollVisibility";
import SoundMassageSection from "../components/care/SoundMassageSection.tsx";
import CollectiveSoundJourneySection from "../components/care/CollectiveSoundJourneySection.tsx";
import ConsciousnessExpansionWorkshopSection from "../components/care/ConsciousnessExpansionWorkshopSection.tsx";
import LymphaticDrainageSection from "../components/care/LymphaticDrainageSection.tsx";
import SwedishMassageSection from "../components/care/SwedishMassageSection.tsx";
import PricingSection from "../components/care/PricingSection.tsx";
import massage from "../assets/bols-dos.jpg";
import SEOMetadata from "../components/google/SEOMetaData.tsx";

const Treatments: FC = () => {
  // Hook to handle hash-based navigation
  useScrollToHash();

  // Hook to handle visibility of sections when scrolling
  const visibleSections = useScrollVisibility([
    "massage",
    "voyage",
    "atelier",
    "drainage",
    "suedois",
    "tarifs",
  ]);

  return (
    <>
      <SEOMetadata
        title="Relaxa'Son - Les soins proposés"
        description="Explorez la puissance thérapeutique des sons et vibrations. Nos sessions de sonothérapie vous aident à réduire le stress, améliorer le sommeil et retrouver l'équilibre intérieur."
        image={massage}
        url="https://relaxason.com/soins"
        type="article"
      />
      <div className={global.aboutWrapper}>
        {/* Header */}
        <div className={global.textCenter}>
          <Title order={1} className={global.sectionTitle} mb="md">
            <Box component="span" className={global.titleUnderline} />
            Soins Proposés
          </Title>
          <Text size="lg" mb="xl" maw={800} mx="auto">
            Découvrez ma liste complète de soins thérapeutiques conçus pour
            harmoniser votre corps et votre esprit à travers le son et le
            toucher.
          </Text>
        </div>

        <Space h="xl" />

        {/* Service Sections */}
        <SoundMassageSection isVisible={visibleSections.massage} />
        <Space h={60} />

        <CollectiveSoundJourneySection isVisible={visibleSections.voyage} />
        <Space h={60} />

        <ConsciousnessExpansionWorkshopSection
          isVisible={visibleSections.atelier}
        />
        <Space h={60} />

        <LymphaticDrainageSection isVisible={visibleSections.drainage} />
        <Space h={60} />

        <SwedishMassageSection isVisible={visibleSections.suedois} />
        <Space h={60} />

        <PricingSection isVisible={visibleSections.tarifs} />
      </div>
    </>
  );
};

export default Treatments;
