import { Clock, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";

function Detail({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-6">
      <span className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
        {icon}
      </span>
      <div className="text-body">
        <p className="font-bold">{label}</p>
        {children}
      </div>
    </div>
  );
}

export function ContactInfo() {
  return (
    <div className="bg-wash-reverse flex h-full flex-col rounded-2xl border p-6 shadow-md sm:p-12">
      <h2 className="text-h3 mb-12 text-brand-700">Informations de Contact</h2>

      <div className="flex flex-col gap-8">
        <Detail
          label="Email"
          icon={<Mail aria-hidden="true" size={24} strokeWidth={1.5} />}
        >
          <p>relaxason.pro@gmail.com</p>
        </Detail>
        <Detail
          label="Adresse"
          icon={<MapPin aria-hidden="true" size={24} strokeWidth={1.5} />}
        >
          <p>91360 Villemoisson-sur-Orge, France</p>
        </Detail>
        <Detail
          label="Horaires"
          icon={<Clock aria-hidden="true" size={24} strokeWidth={1.5} />}
        >
          <p>Du lundi au vendredi,</p>
          <p>9h00 - 18h00</p>
        </Detail>
      </div>

      <hr className="mt-[72px] mb-6 border-brand-300" />

      <p className="quote-block mt-auto text-sm text-body">
        Je vous répondrai dans les plus brefs délais, généralement sous 24 à 48
        heures ouvrées. N'hésitez pas à laisser un numéro de téléphone pour être
        rappelé.
      </p>
    </div>
  );
}
