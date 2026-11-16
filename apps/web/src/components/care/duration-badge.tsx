import type { ReactNode } from "react";
import { Badge } from "@relaxason/ui";

/** How long a treatment lasts and who it's for. */
export function DurationBadge({ children }: { children: ReactNode }) {
  return (
    <Badge
      tone="brand"
      className="h-[26px] px-3 text-[13px] font-bold tracking-[0.25px] uppercase"
    >
      {children}
    </Badge>
  );
}
