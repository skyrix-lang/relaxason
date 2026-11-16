import { TriangleAlert } from "lucide-react";
import bolsDos from "../../assets/bols-dos.jpg";
import { MassageIcon } from "../icons";
import { Reveal } from "../reveal";
import { IconTitle } from "../section-title";
import { DurationBadge } from "./duration-badge";

const benefits = [
  [
    "Rééquilibre le système nerveux",
    "Diminue le stress et l'anxiété",
    "Améliore la qualité du sommeil",
  ],
  [
    "Libère les tensions musculaires",
    "Stimule la circulation énergétique",
    "Favorise un sentiment d'harmonie intérieure",
  ],
];

export function SoundMassageSection() {
  return (
    <Reveal id="massage" className="scroll-mt-[100px]">
      <div className="rounded-2xl border bg-surface p-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <img
              src={bolsDos}
              alt="Massage sonore : des bols posés sur le dos"
              width={1400}
              height={933}
              className="h-auto w-full rounded-xl object-cover"
            />
          </div>
          <div>
            <IconTitle icon={<MassageIcon />}>
              Massage Sonore Individuel
            </IconTitle>
            <p className="mb-6 text-lg font-medium text-brand-700">
              Une expérience inoubliable de bien-être profond
            </p>
            <p className="mb-6 text-body">
              Allongé(e) confortablement sur une table de massage, habillé(e),
              découvrez le pouvoir apaisant du massage sonore individuel. Une
              méthode douce et immersive qui utilise les vibrations des bols et
              des diapasons thérapeutiques posés sur vous pour rééquilibrer le
              corps et l'esprit.
            </p>
            <p className="mb-6 text-body">
              Lors de cette séance personnalisée, chaque son résonne dans votre
              corps, libérant les tensions, favorisant la relaxation et
              stimulant la circulation de l'énergie.
            </p>
            <div className="pt-6">
              <DurationBadge>70 minutes | Session individuelle</DurationBadge>
            </div>
          </div>
        </div>

        <h3 className="h3 mt-[59px] mb-6 text-brand-700">
          Bienfaits du Massage Sonore
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {benefits.map((column) => (
            <ul key={column[0]} className="flex flex-col gap-4">
              {column.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <span aria-hidden="true" className="text-brand-500">
                    •
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          ))}
        </div>

        <p className="my-12 text-center font-medium text-body italic">
          Offrez-vous un moment unique de recentrage et d'harmonie intérieure,
          pour un bien-être durable et une paix retrouvée.
        </p>

        <div role="note" className="flex rounded-md bg-accent/10 p-6">
          <TriangleAlert
            aria-hidden="true"
            size={20}
            className="mt-px mr-6 shrink-0 text-accent"
          />
          <div className="text-sm leading-[1.55]">
            <h3 className="mb-3 font-bold text-accent">
              Précautions importantes
            </h3>
            <p className="text-base text-body">
              La sonothérapie est à éviter pour les personnes :
            </p>
            <ul className="mt-3 list-inside list-disc leading-[1.45]">
              <li>Femme enceintes de moins de 4 mois ou de plus de 8 mois</li>
              <li>Portant un pacemaker ou stent</li>
              <li>Épileptiques</li>
              <li>Souffrant d'asthme grave</li>
              <li>Souffrant d'un cancer (sauf rémission)</li>
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
