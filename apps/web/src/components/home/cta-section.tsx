import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@relaxason/ui";
import { Reveal } from "../reveal";

export function CtaSection() {
  return (
    <Reveal id="cta" className="page-section relative overflow-hidden pt-16">
      <div className="page-container max-sm:px-6">
        <div className="bg-cta relative overflow-hidden rounded-2xl p-12 shadow-[0_20px_40px_rgb(0_105_92/0.2)]">
          <div className="relative z-[1] grid grid-cols-1 items-center gap-10 md:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-h2 mb-6 text-white">
                Prêt à commencer votre voyage sonore ?
              </h2>
              <p className="mb-6 text-lg text-white">
                Prenez rendez-vous dès aujourd'hui pour découvrir les bienfaits
                de la sonothérapie et entamer votre chemin vers le bien-être.
              </p>
            </div>
            <div className="text-center">
              <Link
                to="/contact"
                className={buttonVariants({ variant: "inverse", size: "xl" })}
              >
                Prendre rendez-vous
                <ChevronRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
          <div className="absolute -right-[30px] -bottom-[30px] size-[180px] rounded-full bg-white/10" />
          <div className="absolute right-10 bottom-5 size-[100px] rounded-full bg-white/15" />
        </div>
      </div>
    </Reveal>
  );
}
