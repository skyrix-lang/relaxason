import type { ReactNode } from "react";

/** The frame of every page except the home page: a centred, padded column
 * (page-section gives the vertical space, 72px by the theme's --section-space). */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-section relative w-full">
      <div className="relative z-[1] mx-auto flex min-h-[70vh] w-full max-w-[1320px] flex-col">
        <div className="mx-auto w-full max-w-[1200px] bg-background px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
