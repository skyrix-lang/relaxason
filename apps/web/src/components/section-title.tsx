import type { ReactNode } from "react";
import { cn } from "@relaxason/ui";

/** A section's heading, with the gradient rule under it. */
export function SectionTitle({
  as: Heading = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Heading
      className={cn(
        Heading === "h1" ? "text-h1" : "text-h2",
        "section-title",
        className,
      )}
    >
      {children}
    </Heading>
  );
}

/** A section's heading with its icon, centred above the text. */
export function IconTitle({
  icon,
  className,
  children,
}: {
  icon: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-6 text-brand-500">
      {icon}
      <SectionTitle className={className}>{children}</SectionTitle>
    </div>
  );
}
