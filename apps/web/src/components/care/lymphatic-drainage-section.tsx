import { Droplet } from "lucide-react";
import { ImagePlaceholder } from "../image-placeholder";
import { Reveal } from "../reveal";
import { IconTitle } from "../section-title";
import { DurationBadge } from "./duration-badge";

export function LymphaticDrainageSection() {
  return (
    <Reveal id="drainage" className="scroll-mt-[100px]">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-xl">
            <ImagePlaceholder label="Drainage" />
          </div>
        </div>
        <div>
          <IconTitle icon={<Droplet aria-hidden="true" size={24} />}>
            Drainage Manuel de Bien-Être
          </IconTitle>
          <p className="mb-6 text-body">
            Le drainage manuel de bien-être est un ensemble de techniques
            manuelles ayant pour but de stimuler et maintenir les fonctions
            essentielles du système circulatoire lymphatique (superficiel,
            intermédiaire et profond). Cette pratique favorise la détoxification
            générale de l'organisme tout en contribuant au renforcement du
            système immunitaire.
          </p>
          <ul className="list-outside list-disc pl-14">
            <li>Favorise l'élimination des déchets</li>
            <li>Favorise l'équilibre hydrique de l'organisme</li>
            <li>Draine les liquides interstitiels</li>
            <li>
              Accompagne la relance circulatoire favorisant les échanges entre
              le système lymphatique et le système sanguin
            </li>
          </ul>
          <div className="pt-6">
            <DurationBadge>60 minutes | Session individuelle</DurationBadge>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
