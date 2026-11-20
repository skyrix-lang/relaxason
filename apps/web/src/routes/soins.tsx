import { createFileRoute } from "@tanstack/react-router";
import bolsDos from "../assets/bols-dos.jpg";
import { BodyReconnectionSeminarSection } from "../components/care/body-reconnection-seminar-section";
import { CollectiveSoundJourneySection } from "../components/care/collective-sound-journey-section";
import { LymphaticDrainageSection } from "../components/care/lymphatic-drainage-section";
import { PricingSection } from "../components/care/pricing-section";
import { SoundMassageSection } from "../components/care/sound-massage-section";
import { SwedishMassageSection } from "../components/care/swedish-massage-section";
import { PageShell } from "../components/page-shell";
import { SectionTitle } from "../components/section-title";
import { pageFor } from "../overrides";
import { usePageMeta } from "../page-meta";

function TreatmentsPage() {
  usePageMeta({
    fullTitle: "Relaxa'Son - Les soins proposés",
    image: bolsDos,
    type: "article",
  });

  return (
    <section className="page-section sm:[--section-space:6.5rem]">
      <div className="page-container">
        <PageShell>
          <div className="pb-[68px] text-center">
            <SectionTitle as="h1">Soins Proposés</SectionTitle>
            <p className="mx-auto mb-12 max-w-[800px] text-lg text-body">
              Découvrez ma liste complète de soins thérapeutiques conçus pour
              harmoniser votre corps et votre esprit à travers le son et le
              toucher.
            </p>
          </div>

          <div className="flex flex-col gap-[60px]">
            <SoundMassageSection />
            <CollectiveSoundJourneySection />
            <BodyReconnectionSeminarSection />
            <LymphaticDrainageSection />
            <SwedishMassageSection />
            <PricingSection />
          </div>
        </PageShell>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/soins")({
  component: pageFor("/soins", TreatmentsPage),
});
