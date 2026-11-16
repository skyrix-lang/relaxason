import { CalendarDays, Coins, MapPin, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { InstagramIcon, LungsIcon } from "../icons";
import { ImagePlaceholder } from "../image-placeholder";
import { Reveal } from "../reveal";
import { IconTitle } from "../section-title";

const locations = [
  {
    name: "La Ferme du Ravin Bleu",
    address: "7 Rue Turgot, 77520 Montigny-Lencoup",
  },
  {
    name: "Le Pont d'Ostara",
    address: "9 Chem. des Villerons, 77820 Le Châtelet-en-Brie",
  },
  {
    name: "La Vallée Rose",
    address: "1 chemin de la marnière, 28410 Goussainville",
  },
];

function Fact({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-start gap-6">
      <span className="shrink-0 text-brand-700">{icon}</span>
      <div className="text-body">{children}</div>
    </div>
  );
}

export function BodyReconnectionSeminarSection() {
  return (
    <Reveal id="seminaire" className="scroll-mt-[100px]">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <IconTitle icon={<LungsIcon />}>
            Séminaire de Reconnexion au Corps et aux Émotions
          </IconTitle>

          <p className="mb-6 text-lg font-semibold text-brand-700">
            L'importance du travail du corps dans le processus de guérison
          </p>
          <p className="mb-6 text-body">
            Dans un quotidien surmené, où le regard est constamment tourné vers
            l'extérieur, le faire et la productivité, on peut se sentir à la
            fois submergé et déconnecté de Soi… ressentir le besoin viscéral de
            revenir au Corps.
          </p>
          <p className="mb-6 text-body">
            Le Corps, ce véhicule qui porte nos mémoires émotionnelles et par
            lequel notre Âme cherche à déployer sa mission de vie, demande à
            être écouté et entendu afin de retrouver sa Joie et son Élan de vie.
            Le Travail du Corps (ou Bodywork) regroupe l'ensemble des outils qui
            passent par le corps pour effectuer ce travail de Guérison
            Émotionnelle et de Reconnexion à son Âme. Ses trois axes de travail
            sont :
          </p>
          <ul className="mb-6 flex list-inside list-disc flex-col gap-3">
            <li>Le Travail du Souffle (respiration) ou Breathwork</li>
            <li>Le Travail du Son</li>
            <li>La mise en Mouvement</li>
          </ul>
          <p className="mb-6 text-body">
            Les journées s'articulent autour de structures en mouvement, de
            séances de respiration et d'ateliers psycho-corporels. En soirée, le
            travail se poursuit avec différentes propositions musicales : voyage
            sonore, ecstatic dance, tambour chamanique, apéro jazz… Un puissant
            travail de nettoyage et de retour à Soi, que vous apprendrez à
            entretenir de manière autonome.
          </p>

          <div className="mt-14 rounded-md bg-brand-50 p-6">
            <Fact icon={<CalendarDays aria-hidden="true" size={20} />}>
              <p className="font-semibold">Première session</p>
              <p>Du 9 juillet 2026 (18h) au 12 juillet 2026 (18h)</p>
              <p className="text-sm">Lieu : La Ferme du Ravin Bleu</p>
            </Fact>
            <hr className="my-4" />
            <Fact icon={<Coins aria-hidden="true" size={20} />}>
              <p className="font-semibold">Tarif</p>
              <p>600€ tout compris</p>
              <p className="text-sm">Hébergement, repas et séminaire inclus</p>
              <p className="text-sm">
                Au Ravin Bleu : la Grande Grange, hébergement en chambre double
                ou triple, piscine extérieure, jardin, espace spa (sauna et bain
                à remous) et cuisine végétarienne.
              </p>
            </Fact>
            <hr className="my-4" />
            <Fact icon={<TriangleAlert aria-hidden="true" size={20} />}>
              <p className="font-semibold">Bon à savoir</p>
              <p className="text-sm">
                Merci de nous informer en cas de maladie chronique ou
                psychiatrique.
              </p>
            </Fact>
          </div>

          <div className="mt-6 mb-6 rounded-md border bg-surface p-6">
            <Fact icon={<MapPin aria-hidden="true" size={20} />}>
              <p className="mb-3 font-semibold">Lieux des séminaires</p>
              {locations.map((location) => (
                <div key={location.name} className="mb-2">
                  <p className="text-sm font-medium">{location.name}</p>
                  <p className="text-sm">{location.address}</p>
                </div>
              ))}
            </Fact>
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-xl">
            <ImagePlaceholder label="Séminaire Reconnexion" />
          </div>

          <div className="mt-12 rounded-md border bg-surface p-8">
            <h3 className="h4 mb-6 text-brand-700">Vos intervenants</h3>

            <div className="mb-3 flex items-center gap-3">
              <p className="font-semibold text-body">Laura RICCIARDELLI</p>
              <a
                href="https://www.instagram.com/lauraeneveil/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Laura Ricciardelli (@lauraeneveil)"
                className="inline-flex size-6 items-center justify-center text-brand-700"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
            <p className="mb-6 text-sm text-body">
              Thérapeute psycho-corporelle, Laura accompagne depuis cinq ans le
              travail de Guérison Émotionnelle et de Réalisation de Soi.
              Convaincue que c'est par le corps que l'âme s'exprime et nous
              guide, elle est formée en Breathwork (avec toucher d'acupression),
              en Activation de l'Énergie Vitale, en Sonothérapie et en Yoga.
            </p>

            <p className="mb-3 font-semibold text-body">Denis BENSOUSSAN</p>
            <p className="text-sm text-body">
              Ingénieur du son et musicien saxophoniste de jazz, Denis s'est
              naturellement spécialisé en sonothérapie. Il propose des massages
              sonores individuels et des voyages sonores collectifs, et met des
              années de savoir-faire au service du travail de Reconnexion à Soi.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
