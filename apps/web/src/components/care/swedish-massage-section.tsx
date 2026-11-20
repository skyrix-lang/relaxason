import massage from "../../assets/massage.jpg";
import { MassageIcon } from "../icons";
import { Reveal } from "../reveal";
import { IconTitle } from "../section-title";
import { DurationBadge } from "./duration-badge";

export function SwedishMassageSection() {
  return (
    <Reveal id="suedois" className="sono-section scroll-mt-[100px]">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <img
              src={massage}
              alt="Massage Suédois"
              width={1400}
              height={2100}
              loading="lazy"
              className="h-auto w-full rounded-xl object-cover"
            />
          </div>
          <div>
            <IconTitle icon={<MassageIcon />} className="text-center">
              Massage Suédois
            </IconTitle>
            <p className="mb-6 text-body">
              Le massage suédois est un massage musculaire qui peut s'effectuer
              à la fois de façon globale ou plus spécifique. En variant le
              rythme et la pression, il pourrait être soit plus relaxant ou plus
              tonifiant.
            </p>
            <p className="mb-12 text-body">
              Les glissés, les prétrissages et les drainages entre autres,
              éxécutés en respectant une logiquer de massage, permettent la
              détente musculaire : assouplissement des tissus musculaires,
              relâchement des tensions et raideurs localisées, stimule la
              circulation et favorise une meilleure oxygénation des muscles.
            </p>
            <div className="mb-12 rounded-md border bg-surface p-8 shadow-sm">
              <h3 className="text-h3 mb-6 text-brand-700">L'Expérience</h3>
              <p className="text-body">
                Chaque séance commence par une consultation pour déterminer vos
                besoins spécifiques. Dans une ambiance apaisante enrichie
                d'huiles essentielles, le massage est personnalisé pour cibler
                vos zones de tension.
              </p>
              <p className="mt-6 text-body">
                Une attention particulière est portée à votre confort tout au
                long de la séance, créant une expérience de détente profonde et
                régénératrice.
              </p>
            </div>
            <div className="mt-8">
              <DurationBadge>60 minutes | Session individuelle</DurationBadge>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
