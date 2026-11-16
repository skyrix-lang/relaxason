import { Link } from "@tanstack/react-router";
import { ArrowDown, ChevronRight } from "lucide-react";
import { buttonVariants } from "@relaxason/ui";
import logo from "../../assets/logo-relaxason-text.webp";
import { useInView } from "../reveal";

export function HeroSection() {
  const [ref, visible] = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="hero"
      className="bg-hero relative -mx-6 -mt-[70px] flex min-h-[calc(100vh-70px)] items-center overflow-hidden pt-[70px]"
    >
      <div className="relative z-[2] w-full">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-3 py-6 sm:gap-[30px] sm:px-6 md:grid-cols-2 md:gap-10 lg:px-8 lg:py-[58px]">
          <div data-visible={visible} className="reveal mt-3 lg:mt-[68px]">
            {/* The logo sits above the text on small screens. */}
            <div
              className={`mb-8 text-center transition-transform duration-[600ms] ease-out md:hidden ${visible ? "scale-100" : "scale-90"}`}
            >
              <img
                src={logo}
                alt=""
                width={120}
                height={120}
                className="mx-auto h-[120px] w-auto max-w-[200px] rounded-xl drop-shadow-[0_4px_8px_rgb(0_105_92/0.2)]"
              />
            </div>

            <p className="mt-6 mb-4 text-lg font-medium text-brand-700">
              Bienvenue chez Relaxa'Son
            </p>
            <h1 className="mb-6 text-[2.5rem] leading-[1.2] font-bold">
              Découvrez le pouvoir <br />
              <span className="text-brand-700">thérapeutique des sons</span>
            </h1>
            <p className="mb-12 max-w-[500px] text-lg text-body">
              Une approche holistique qui utilise les vibrations et les
              fréquences sonores pour apaiser le mental, favoriser l'équilibre
              intérieur, la relaxation et le bien-être.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/soins"
                className={buttonVariants({ variant: "cta", size: "lg" })}
              >
                Découvrir mes soins
                <ChevronRight aria-hidden="true" size={18} />
              </Link>
              <Link
                to="/contact"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>

          <div
            data-visible={visible}
            className="reveal hidden delay-300 md:block"
          >
            <img
              src={logo}
              alt="Logo Relaxa'Son"
              width={868}
              height={868}
              className="h-auto w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>

      <div className="hero-wave" />

      <a
        href="#intro"
        aria-label="Aller à la suite"
        className="absolute bottom-[60px] left-1/2 z-[3] hidden size-[60px] -translate-x-1/2 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-700/10 sm:flex"
      >
        <ArrowDown aria-hidden="true" size={28} />
      </a>
    </section>
  );
}
