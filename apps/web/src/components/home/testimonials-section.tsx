import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "../reveal";
import { SectionTitle } from "../section-title";

const testimonials = [
  {
    name: "Isabelle",
    quote:
      "Denis m'a transporté par ses sons dans un univers créatif où je me sentais accompagnée au cœur de mes cellules… comme si la résonnance de ses propositions sonores, me permettaient de cheminer en moi même… source d'émerveillement… une expérience qui reste vivante en moi 6 mois plus tard, à l'heure où j'écris ces lignes.",
  },
  {
    name: "Virginie",
    quote:
      "Les massages sonores de Denis sont uniques. Denis est très professionnel, il a une grande écoute et attention. Je me suis sentie tout de suite en confiance et en sécurité. Il a beaucoup d'instruments qui permettent une expérience sonore très variée et puissante. J'en suis ressortie avec un sentiment d'apaisement très agréable et mes tensions s'étaient envolées. Les résultats se sont fait sentir durablement. Une très belle expérience que je recommande.",
  },
  {
    name: "Lucie",
    quote:
      "Les séances de sonothérapie ont transformé ma façon de gérer le stress au quotidien. Après seulement quelques séances, j'ai ressenti un changement profond dans mon bien-être général et ma capacité à rester centrée, même dans les moments difficiles.",
  },
];

const AUTOPLAY_MS = 10_000;

function Carousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  // Moves on by itself, except while the visitor is reading (hover or focus).
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setActive((current) => (current + 1) % count),
      AUTOPLAY_MS,
    );
    return () => clearInterval(timer);
  }, [paused, count]);

  return (
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- pointer and focus only pause the autoplay; the buttons inside do the rest
    <div
      role="group"
      aria-roledescription="carrousel"
      aria-label="Témoignages"
      className="testimonials-wrapper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="testimonial-card">
        <div className="carousel-slider" aria-live="polite">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              data-active={index === active}
              aria-hidden={index !== active}
              className="testimonial-slide flex flex-col gap-8"
            >
              <div className="relative px-2.5">
                <blockquote className="relative z-[1] mx-12 text-center text-lg text-body italic">
                  "{testimonial.quote}"
                </blockquote>
                <span
                  aria-hidden="true"
                  className="absolute -top-[15px] -left-[5px] font-serif text-[4rem] leading-[1.55] text-brand-500 opacity-10"
                >
                  "
                </span>
              </div>
              <figcaption className="text-center font-semibold text-brand-700">
                {testimonial.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-5">
          <button
            type="button"
            aria-label="Témoignage précédent"
            onClick={() => setActive((active - 1 + count) % count)}
            className="carousel-button pointer-events-auto"
          >
            <ChevronLeft aria-hidden="true" size={24} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Témoignage suivant"
            onClick={() => setActive((active + 1) % count)}
            className="carousel-button pointer-events-auto"
          >
            <ChevronRight aria-hidden="true" size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.name}
            type="button"
            aria-label={`Témoignage de ${testimonial.name}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className="flex size-6 cursor-pointer items-center justify-center"
          >
            <span
              className={`size-2.5 rounded-full transition-all duration-300 ${index === active ? "bg-brand-500" : "bg-brand-100"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [ref, visible] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      id="testimonials"
      data-visible={visible}
      className="reveal page-container scroll-mt-[90px] max-sm:px-6"
    >
      <div className="testimonial-container mx-auto max-w-[960px] px-6 py-12">
        <div className="text-center">
          <SectionTitle>Témoignages</SectionTitle>
          <div
            className={`relative mx-auto mb-8 text-center ${visible ? "animate-pulse-soft" : ""}`}
          >
            <Quote
              aria-hidden="true"
              size={40}
              className={`inline text-brand-500 opacity-20 transition-transform duration-[800ms] ease-in-out ${visible ? "rotate-180" : ""}`}
            />
          </div>
        </div>
        <div className={`mt-6 ${visible ? "animate-fade-in-up" : ""}`}>
          <Carousel />
        </div>
      </div>
    </div>
  );
}
