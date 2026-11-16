import { HeartPulse } from "lucide-react";
import type { ReactNode } from "react";
import { EmpathizeIcon, MassageIcon, WaveSineIcon } from "../icons";
import { Reveal } from "../reveal";
import { SectionTitle } from "../section-title";

const benefits: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: <MassageIcon size={48} strokeWidth={1.5} />,
    title: "Relaxation profonde",
    text: "Facilite l'accès à des états modifiés de conscience, propices au lâcher prise et qui apaisent le mental.",
  },
  {
    icon: <WaveSineIcon size={48} strokeWidth={1.5} />,
    title: "Réduction du stress",
    text: "Les fréquences sonores favorisent la détente, diminuent l'anxiété et les tensions accumulées.",
  },
  {
    icon: <HeartPulse aria-hidden="true" size={48} strokeWidth={1.5} />,
    title: "Équilibre énergétique",
    text: "Harmonise les centres énergétiques du corps pour une meilleure circulation de l'énergie vitale.",
  },
  {
    icon: <EmpathizeIcon size={48} strokeWidth={1.5} />,
    title: "Bien-être global",
    text: "Renforce le système immunitaire et favorise un sentiment durable de bien-être physique, mental et émotionnel.",
  },
];

export function BenefitsSection() {
  return (
    <Reveal id="benefits" className="bg-benefits -mx-6 scroll-mt-[100px] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 text-center">
          <SectionTitle className="[--rule-left:20%]">
            Les Bienfaits
          </SectionTitle>
          <p className="mx-auto mt-8 mb-12 max-w-[700px] text-lg text-body">
            La sonothérapie offre de nombreux avantages pour votre santé
            physique, mentale et émotionnelle. Découvrez comment cette approche
            peut vous aider.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="service-card p-6 text-center">
              <div className="mb-4 text-brand-500">{benefit.icon}</div>
              <h3 className="h3 mb-6 text-brand-700">{benefit.title}</h3>
              <p className="text-body">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
