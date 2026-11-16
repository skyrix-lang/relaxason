import { Brain, Disc, Users } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@relaxason/ui";
import {
  CrystalBallIcon,
  GongIcon,
  ProngIcon,
  WaveSineIcon,
  YogaIcon,
} from "../icons";
import { Reveal } from "../reveal";
import { IconTitle } from "../section-title";
import { DurationBadge } from "./duration-badge";

type Item = { icon: ReactNode; title: string; description: string };

const instruments: Item[] = [
  {
    icon: <Disc aria-hidden="true" size={32} />,
    title: "Tambour",
    description:
      "Porteur de rythmes ancestraux qui ancrent et reconnectent à la Terre, associé à ma voix, pour accompagner et amplifier l'expérience.",
  },
  {
    icon: <GongIcon size={32} />,
    title: "Gongs",
    description:
      "Leurs résonances profondes favorisent un lâcher prise immédiat.",
  },
  {
    icon: <CrystalBallIcon size={32} />,
    title: "Bols de cristal",
    description:
      "Leurs harmoniques cristallines ouvrent et équilibrent les centres énergétiques.",
  },
  {
    icon: <ProngIcon size={32} />,
    title: "Shimes et percussions",
    description: "Affinent l'écoute intérieure et éveillent la sensibilité.",
  },
];

const benefits: Item[] = [
  {
    icon: <YogaIcon size={32} />,
    title: "Plan Physique",
    description:
      "Libération des tensions corporelles, amélioration de la qualité du sommeil et détente musculaire profonde.",
  },
  {
    icon: <Users aria-hidden="true" size={32} />,
    title: "Plan Émotionnel et Mental",
    description:
      "Apaisement, réduction du stress et de l'anxiété, harmonisation des émotions et clarté mentale.",
  },
  {
    icon: <Brain aria-hidden="true" size={32} />,
    title: "Plan Spirituel",
    description:
      "Expansion de la conscience, connexion intérieure profonde et sentiment d'unité amplifiés par l'énergie collective.",
  },
];

function ItemCard({ item, roomy }: { item: Item; roomy?: boolean }) {
  return (
    <div className={cn("service-card gap-6", roomy ? "p-12" : "p-6")}>
      <div className="flex h-10 items-center text-brand-500">{item.icon}</div>
      <h4 className="h4 text-brand-700">{item.title}</h4>
      <p className={cn("text-body", !roomy && "text-sm")}>{item.description}</p>
    </div>
  );
}

export function CollectiveSoundJourneySection() {
  return (
    <Reveal id="voyage" className="sono-section scroll-mt-[100px]">
      <div className="mx-auto max-w-[1140px] px-6">
        <IconTitle icon={<WaveSineIcon />} className="text-center">
          Voyage Sonore Collectif
        </IconTitle>

        <p className="mx-auto mb-12 max-w-[800px] text-center text-lg text-body">
          Plongez dans un voyage sonore profond, où vibrations et fréquences
          enveloppantes vous guident vers un état de relaxation profonde et de
          recentrage intérieur.
        </p>

        <p className="quote-block mb-12 text-body shadow-sm">
          Confortablement allongé(e), enveloppé(e) dans un plaid, avec un
          coussin pour plus de détente, vous n'avez rien à faire si ce n'est
          écouter et vous laisser porter.
        </p>

        <h3 className="h3 mb-8 text-center text-brand-700">
          Les Instruments du Voyage
        </h3>
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {instruments.map((item) => (
            <ItemCard key={item.title} item={item} />
          ))}
        </div>

        <h3 className="h3 mb-8 text-center text-brand-700">
          Bienfaits du Voyage Sonore
        </h3>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {benefits.map((item) => (
            <ItemCard key={item.title} item={item} roomy />
          ))}
        </div>

        <p className="mt-12 mb-6 text-center text-lg font-medium text-brand-700">
          Chaque session est unique, guidée par l'intention du moment et les
          besoins du groupe.
        </p>
        <p className="mx-auto mb-12 max-w-[800px] text-center text-body italic">
          Laissez-vous porter par les vibrations et offrez-vous un instant hors
          du temps, une immersion sonore où le son devient un véritable soin.
        </p>

        <div className="text-center">
          <DurationBadge>60-90 minutes | Session en groupe</DurationBadge>
        </div>
      </div>
    </Reveal>
  );
}
