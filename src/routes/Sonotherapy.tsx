import { FC } from "react";
import global from "../styles/Global.module.css";
import useScrollVisibility from "../hooks/useScrollVisibility";
import useScrollToHash from "../hooks/useScrollToHash";
import SonotherapyIntro from "../components/sonotherapy/SonotherapyIntro.tsx";
import BenefitsSection from "../components/sonotherapy/BenefitsSection";
import VideoSection from "../components/sonotherapy/VideoSection";
import CallToAction from "../components/sonotherapy/CallToAction";
import SEOMetadata from "../components/google/SEOMetaData.tsx";
import outils from "../assets/outils.jpg";

const Sonotherapy: FC = () => {
  // Hook to handle hash-based navigation
  useScrollToHash();

  // Hook to handle visibility of sections when scrolling
  const visibleSections = useScrollVisibility([
    "video",
    "sonotherapie",
    "bienfaits",
  ]);

  return (
    <>
      <SEOMetadata
        title="Relaxa'Son - Découvrez les bienfaits du son pour votre bien-être"
        description="Explorez la puissance thérapeutique des sons et vibrations. Mes sessions de sonothérapie vous aident à réduire le stress, améliorer le sommeil et retrouver l'équilibre intérieur."
        image={outils}
        url="https://relaxason.com/sonotherapie"
        type="article"
      />
      <div className={global.aboutWrapper}>
        <SonotherapyIntro isVisible={visibleSections.sonotherapie} />
        <BenefitsSection isVisible={visibleSections.bienfaits} />
        <VideoSection isVisible={visibleSections.video} />
        <CallToAction />
      </div>
    </>
  );
};

export default Sonotherapy;
