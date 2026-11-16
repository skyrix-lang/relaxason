import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@relaxason/ui";
import { Reveal } from "../reveal";
import { SectionTitle } from "../section-title";

const services = [
  {
    title: "Massage Sonore Individuel",
    text: "Une approche personnalisée qui répond à vos besoins spécifiques. Ces séances vous permettent de profiter pleinement des bienfaits de la sonothérapie dans un cadre intime et adapté.",
    audience: "Pour 1 personne",
    hash: "massage",
  },
  {
    title: "Voyage Sonore Collectif",
    text: "Une expérience immersive en groupe où les gongs et les bols de cristal se propagent dans tout l'espace, créant une harmonisation collective et une profonde relaxation individuelle.",
    audience: "De 5 à 10 personnes",
    hash: "voyage",
  },
] as const;

export function ServicesSection() {
  return (
    <Reveal id="services" className="scroll-mt-[100px] py-24">
      <SectionTitle>Ce que je propose</SectionTitle>

      <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.title} className="service-card relative p-12">
            <div className="absolute inset-x-0 top-0 h-2.5 bg-brand-500/50" />
            <h3 className="h3 mt-12 mb-6 text-brand-700">{service.title}</h3>
            <p className="text-body">{service.text}</p>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
              <p className="font-semibold text-brand-800">{service.audience}</p>
              <Link
                to="/soins"
                hash={service.hash}
                aria-label={`Voir les détails : ${service.title}`}
                className={buttonVariants({ variant: "soft", size: "sm" })}
              >
                Voir les détails
                <ChevronRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/soins"
          className={buttonVariants({ variant: "cta", size: "lg" })}
        >
          Tous mes soins
          <ChevronRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </Reveal>
  );
}
