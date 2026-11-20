import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleCheck } from "lucide-react";
import { buttonVariants } from "@relaxason/ui";
import outils from "../assets/outils.jpg";
import { PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { SectionTitle } from "../components/section-title";
import { pageFor } from "../overrides";
import { usePageMeta } from "../page-meta";

const ailments = [
  [
    "Stress, Angoisse",
    "Surmenage, Burn-Out",
    "Migraine, Fatigue",
    "Insomnies",
    "Douleurs articulaires ou musculaires",
  ],
  [
    "Troubles respiratoires",
    "Fibromyalgie",
    "Allergies",
    "Acouphènes",
    "Symptômes Parkinsoniens",
  ],
];

function SonotherapyPage() {
  usePageMeta({
    fullTitle: "Relaxa'Son - Découvrez le pouvoir thérapeutique des sons",
    type: "article",
  });

  return (
    <section className="page-section sm:[--section-space:6.5rem]">
      <div className="page-container">
        <PageShell>
          <Reveal id="sonotherapie" className="scroll-mt-[100px]">
            <SectionTitle as="h1" className="text-h2 mb-8">
              La Sonothérapie
            </SectionTitle>
            <div className="mt-8 mb-10 grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="text-body">
                <p className="mb-6 text-lg">
                  La sonothérapie s'adresse à tous ceux qui cherchent à réduire
                  le stress, à améliorer leur concentration ou simplement à se
                  reconnecter à eux-mêmes dans une ambiance de calme et de
                  sérénité.
                </p>
                <p className="mb-6 font-bold">
                  La sonothérapie est une tradition millénaire qui vient du
                  Tibet, utilisant principalement des bols tibétin et des gongs.
                  Au vingtième siècle, de nouveaux outils comme les bols de
                  cristal et les diapasons thérapeutiques sont apparus et sont
                  venus compléter le matériel existant.
                </p>
                <p className="font-bold">
                  La Sonothérapie est une technique de soin énergétique dans
                  laquelle on utilise les sons et les vibrations. Le son se
                  transmettant plus facilement dans l'eau que dans l'air, et
                  notre corps étant composé à plus de 70 % d'eau, il est très
                  réceptif aux vibrations et ondes sonores. Les fréquences
                  vibratoires que produisent les bols et diapasons
                  thérapeutiques agissent sur les cellules de notre organisme et
                  les liquides. Il en résulte en premier lieu une relaxation
                  profonde, il réharmonise et vous reconnecte à votre corps et à
                  votre âme.
                </p>
              </div>
              <div>
                <img
                  src={outils}
                  alt="Outils de sonothérapie"
                  width={552}
                  height={400}
                  className="h-[400px] w-full rounded-xl object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal id="bienfaits" className="scroll-mt-[90px]">
            <div className="bg-soft-panel mb-[60px] rounded-2xl border p-12 shadow-md">
              <h2 className="text-h3 mb-12 text-brand-700">
                Les Bienfaits de la Sonothérapie
              </h2>
              <p className="mb-6 font-bold text-body">
                Dans un deuxième temps, la sonothérapie peut soulager de
                nombreux maux de la vie quotidienne :
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {ailments.map((column) => (
                  <ul key={column[0]} className="flex flex-col gap-6">
                    {column.map((ailment) => (
                      <li
                        key={ailment}
                        className="flex items-center gap-3 font-bold"
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                          <CircleCheck aria-hidden="true" size={16} />
                        </span>
                        {ailment}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
              <hr className="my-8 border-brand-300" />
              <p className="text-center text-sm font-bold text-body italic">
                Ces méthodes douces ne se substituent pas à un avis médical.
                Elles sont complémentaires et vous ne devez en aucun cas arrêter
                un traitement sans l'avis de votre médecin.
              </p>
            </div>

            <div className="sono-section mb-[30px] rounded-2xl px-12">
              <p className="quote-block text-center text-lg text-body">
                En résonnance avec notre corps, ces fréquences sonores apaisent
                le mental, libèrent les tensions et aident à retrouver un
                équilibre intérieur.
              </p>
            </div>
          </Reveal>

          <Reveal id="video" className="scroll-mt-[90px]">
            <div className="mb-[60px] rounded-2xl border bg-surface p-12 shadow-sm">
              <h2 className="text-h2 mb-8 text-center text-brand-700">
                Découvrez la Sonothérapie
              </h2>
              <p className="mb-12 text-center text-lg text-body">
                Reportage Télématin sur Zen & Sounds et la sonothérapie
              </p>
              <div className="aspect-video overflow-hidden rounded-xl">
                <iframe
                  src="https://www.youtube.com/embed/4bksvOoIyCA"
                  title="Télématin zen & sounds, sonothérapie"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="size-full border-0"
                />
              </div>
            </div>
          </Reveal>

          <div className="my-12 text-center">
            <div className="bg-wash rounded-2xl border p-12">
              <h2 className="text-h3 mb-6 text-brand-700">
                Prêt à découvrir les bienfaits de la sonothérapie ?
              </h2>
              <p className="mb-12 text-lg text-body">
                Prenez rendez-vous pour une séance personnalisée et commencez
                votre parcours vers l'harmonie intérieure.
              </p>
              <Link
                to="/contact"
                className={buttonVariants({
                  variant: "cta",
                  className: "h-auto px-6 py-3 leading-[1.55]",
                })}
              >
                Prendre Rendez-vous
              </Link>
            </div>
          </div>
        </PageShell>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/sonotherapie")({
  component: pageFor("/sonotherapie", SonotherapyPage),
});
