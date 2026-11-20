import type { ReactNode } from "react";

/**
 * The column of every page except the home page, inside the route's
 * `<section className="page-section sm:[--section-space:6.5rem]">` >
 * `page-container`: the previous site's extra side space below 1200px, and
 * its minimum height.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(70vh-3rem)] px-6 sm:min-h-[calc(70vh-4rem)] lg:px-0">
      {children}
    </div>
  );
}
