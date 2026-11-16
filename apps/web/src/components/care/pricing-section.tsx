import { Link } from "@tanstack/react-router";
import { Coins, Dot, Gift, Star, User, Users } from "lucide-react";
import type { ReactNode } from "react";
import { buttonVariants, cn } from "@relaxason/ui";
import { Reveal } from "../reveal";
import { IconTitle } from "../section-title";

interface PriceItem {
  service: string;
  duration?: string;
  price?: string;
  note?: string;
  options?: { label: string; price: string }[];
  icon?: ReactNode;
}

interface PriceCard {
  icon: ReactNode;
  title: string;
  highlight?: boolean;
  items: PriceItem[];
  buttonText: string;
}

const cards: PriceCard[] = [
  {
    icon: <User aria-hidden="true" size={24} />,
    title: "Séances Individuelles",
    items: [
      { service: "Massage Sonore", duration: "70 min", price: "70€" },
      {
        service: "Drainage Manuel de Bien-Être",
        duration: "60 min",
        price: "60€",
      },
      { service: "Massage Suédois", duration: "60 min", price: "60€" },
    ],
    buttonText: "Prendre Rendez-vous",
  },
  {
    icon: <Users aria-hidden="true" size={24} />,
    title: "Sessions Collectives",
    highlight: true,
    items: [
      {
        service: "Voyage Sonore Collectif",
        options: [
          { label: "Par personne", price: "25€" },
          { label: "Forfait couple", price: "40€" },
        ],
      },
      {
        service: "Séminaire de Reconnexion",
        options: [{ label: "Séminaire 4 jours – tout compris", price: "600€" }],
      },
    ],
    buttonText: "Prendre Rendez-vous",
  },
  {
    icon: <Star aria-hidden="true" size={24} />,
    title: "Forfaits & Carte",
    items: [
      {
        service: "Forfait 3 Massages Sonores",
        price: "180€",
        note: "Valable 6 mois",
      },
      {
        service: "Forfait 3 Massages ou Drainages",
        price: "150€",
        note: "Valable 6 mois",
      },
      {
        service: "Carte Cadeau",
        price: "Personnalisable",
        icon: <Gift aria-hidden="true" size={18} />,
      },
    ],
    buttonText: "Demander un Forfait",
  },
];

function PriceLine({ item }: { item: PriceItem }) {
  return (
    <li>
      <div className="mb-1 flex items-center gap-6">
        <span className="shrink-0 text-brand-500 [&:has(.lucide-gift)]:text-foreground">
          {item.icon ?? <Dot aria-hidden="true" size={18} strokeWidth={10} />}
        </span>
        <p className="font-medium text-body">{item.service}</p>
      </div>
      <div className="ml-[26px] flex flex-col gap-[5px] text-sm text-body">
        {item.duration && item.price && (
          <p>
            {item.duration} -{" "}
            <span className="font-semibold">{item.price}</span>
          </p>
        )}
        {item.price && !item.duration && !item.options && (
          <p className="font-semibold">{item.price}</p>
        )}
        {item.options?.map((option) => (
          <p key={option.label}>
            {option.label} -{" "}
            <span className="font-semibold">{option.price}</span>
          </p>
        ))}
      </div>
      {item.note && (
        <p className="ml-[26px] text-sm text-muted-foreground italic">
          {item.note}
        </p>
      )}
      <hr className="my-4 border-dotted" />
    </li>
  );
}

export function PricingSection() {
  return (
    <Reveal id="tarifs" className="scroll-mt-[100px]">
      <div className="mx-auto max-w-[1140px] px-6 py-12">
        <IconTitle
          icon={<Coins aria-hidden="true" size={24} />}
          className="text-center"
        >
          Tarifs
        </IconTitle>

        <p className="mx-auto mb-12 max-w-[700px] text-center text-lg text-body">
          Des tarifs adaptés à tous les besoins pour vous permettre d'accéder à
          un bien-être durable et personnalisé.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className={cn(
                "service-card border",
                card.highlight && "border-2 border-brand-500",
              )}
            >
              <div
                className={cn(
                  "border-b p-6",
                  card.highlight ? "bg-brand-50" : "bg-surface",
                )}
              >
                <div className="mb-3 flex justify-center">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-md",
                      card.highlight
                        ? "bg-brand-600 text-white"
                        : "bg-brand-100/10 text-brand-500",
                    )}
                  >
                    {card.icon}
                  </span>
                </div>
                <h3 className="h3 text-center text-[1.5rem] text-brand-700">
                  {card.title}
                </h3>
              </div>

              <div className="flex flex-1 flex-col p-8 pt-6">
                <ul className="flex flex-col gap-6">
                  {card.items.map((item) => (
                    <PriceLine key={item.service} item={item} />
                  ))}
                </ul>
                <Link
                  to="/contact"
                  aria-label={`${card.buttonText} : ${card.title}`}
                  className={buttonVariants({
                    variant: "cta",
                    className: "mt-12 w-full",
                  })}
                >
                  {card.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[50px] flex flex-col items-center gap-8 rounded-2xl border-l-4 border-brand-500 bg-surface p-12 shadow-sm">
          <p className="text-center text-lg font-semibold text-body">
            Besoin d'informations supplémentaires?
          </p>
          <p className="mx-auto max-w-[700px] text-center text-body">
            N'hésitez pas à me contacter pour toute question concernant les
            soins ou pour une consultation personnalisée adaptée à vos besoins
            spécifiques.
          </p>
          <Link to="/contact" className={buttonVariants({ variant: "cta" })}>
            Me Contacter
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
