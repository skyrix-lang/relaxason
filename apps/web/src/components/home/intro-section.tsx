import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@relaxason/ui";
import outils from "../../assets/outils.jpg";
import { Reveal } from "../reveal";
import { SectionTitle } from "../section-title";

export function IntroSection() {
  return (
    <Reveal id="intro" className="page-section scroll-mt-[100px]">
      <div className="page-container grid grid-cols-1 items-center gap-[60px] max-sm:px-6 md:grid-cols-2">
        <div className="hidden sm:block max-md:order-2">
          <img
            src={outils}
            alt="Instruments de sonothérapie"
            width={650}
            height={650}
            loading="lazy"
            className="h-[650px] w-full rounded-full border-8 border-brand-50 object-cover shadow-[0_15px_30px_rgb(0_105_92/0.1)]"
          />
        </div>
        <div>
          <SectionTitle>La Sonothérapie</SectionTitle>
          <p className="mt-8 mb-12 text-lg leading-[1.7] text-body">
            La Sonothérapie est une technique de soin énergétique dans laquelle
            on utilise les sons et les vibrations. Le son se transmettant plus
            facilement dans l'eau que dans l'air, et notre corps étant composé à
            plus de 70 % d'eau, il est très réceptif aux vibrations et ondes
            sonores.
          </p>
          <p className="mb-12 text-lg leading-[1.7] text-body">
            Grâce à divers instruments comme les bols de cristal, les gongs, les
            bols et diapasons thérapeutiques, la sonothérapie invite à un
            profond état de relaxation et stimule les capacités naturelles
            d'auto-guérison. En résonnance avec notre corps, ces fréquences
            sonores apaisent le mental, libèrent les tensions et aident à
            retrouver un équilibre intérieur. La sonothérapie s'adresse à tous
            ceux qui cherchent à réduire le stress, à améliorer leur
            concentration ou simplement à se reconnecter à eux-mêmes dans une
            ambiance de calme et de sérénité.
          </p>
          <Link
            to="/sonotherapie"
            className={buttonVariants({ variant: "soft", size: "md" })}
          >
            En savoir plus
            <ChevronRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
