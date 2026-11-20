import { createFileRoute } from "@tanstack/react-router";
import { Award, GraduationCap } from "lucide-react";
import type { ReactNode } from "react";
import portrait from "../assets/portrait.jpg";
import { PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { SectionTitle } from "../components/section-title";
import { pageFor } from "../overrides";
import { usePageMeta } from "../page-meta";

function Training({
  icon,
  href,
  children,
}: {
  icon: ReactNode;
  href: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-[22px] items-center justify-center rounded-full bg-brand-500/10 text-brand-500">
        {icon}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-700 hover:underline"
      >
        {children}
      </a>
    </div>
  );
}

function AboutPage() {
  usePageMeta({
    fullTitle: "Relaxa'Son - Mon portrait de sonothérapeute",
    image: portrait,
    type: "article",
  });

  return (
    <section className="page-section sm:[--section-space:6.5rem]">
      <div className="page-container">
        <PageShell>
          <Reveal id="bio" className="scroll-mt-[90px]">
            <div className="mb-[60px] grid grid-cols-1 items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-5">
                <img
                  src={portrait}
                  alt="Portrait du sonothérapeute"
                  width={452}
                  height={450}
                  className="h-[450px] w-full rounded-md object-cover"
                />
              </div>

              <div className="md:col-span-7">
                <SectionTitle as="h1" className="text-h2">
                  Mon Parcours
                </SectionTitle>
                <p className="mt-8 text-lg text-body">
                  Sonothérapeute passionné, je puise dans un parcours riche et
                  complémentaire pour vous offrir un espace de bien-être unique.
                </p>
                <p className="mt-6 text-body">
                  Après une riche expérience en tant qu'ingénieur du son dans
                  l'audiovisuel, associé à un parcours de musicien saxophoniste
                  amateur, j'ai découvert la puissance des soins énergétiques
                  par un ancien art chinois, le Jin-Chin-Jyutsu. Mon parcours
                  m'a amené à me former au massage sonore en 2023 (Zen &
                  Sounds), un domaine où l'harmonie des sons rencontre l'art du
                  soin. Aujourd'hui, je propose des voyages sonores collectifs
                  et des massages sonores individuels, et je participe au
                  Séminaire de Reconnexion au Corps et aux Émotions aux côtés de
                  Laura Ricciardelli, thérapeute psycho-corporelle.
                </p>

                <h2 className="mt-6 mb-2 text-sm font-medium text-brand-700">
                  Mes Formations
                </h2>
                <div className="flex flex-wrap gap-8 rounded-r-md border-l-[3px] border-brand-500 bg-brand-50/50 py-2 pr-2 pl-4">
                  <Training
                    href="https://www.zen-and-sounds.com"
                    icon={<Award aria-hidden="true" size={14} />}
                  >
                    Zen & Sounds
                  </Training>
                  <Training
                    href="https://ecole-spa-international.com/"
                    icon={<GraduationCap aria-hidden="true" size={14} />}
                  >
                    École Internationale du Spa
                  </Training>
                </div>
              </div>
            </div>
          </Reveal>
        </PageShell>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/mon-parcours")({
  component: pageFor("/mon-parcours", AboutPage),
});
