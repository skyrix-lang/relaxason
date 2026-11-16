import type { ReactNode, SVGProps } from "react";

// Icons lucide-react doesn't have. Paths from Tabler Icons (MIT licence,
// https://tabler.io/icons), drawn on the same 24px grid with a round stroke.

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function icon(paths: string[], name: string) {
  function Icon({
    size = 24,
    strokeWidth = 2,
    ...props
  }: IconProps): ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  }
  Icon.displayName = name;
  return Icon;
}

export const LungsIcon = icon(
  [
    "M6.081 20c1.612 0 2.919 -1.335 2.919 -2.98v-9.763c0 -.694 -.552 -1.257 -1.232 -1.257c-.205 0 -.405 .052 -.584 .15l-.13 .083c-1.46 1.059 -2.432 2.647 -3.404 5.824c-.42 1.37 -.636 2.962 -.648 4.775c-.012 1.675 1.261 3.054 2.877 3.161l.203 .007",
    "M17.92 20c-1.613 0 -2.92 -1.335 -2.92 -2.98v-9.763c0 -.694 .552 -1.257 1.233 -1.257c.204 0 .405 .052 .584 .15l.13 .083c1.46 1.059 2.432 2.647 3.405 5.824c.42 1.37 .636 2.962 .648 4.775c.012 1.675 -1.261 3.054 -2.878 3.161l-.202 .007",
    "M9 12a3 3 0 0 0 3 -3a3 3 0 0 0 3 3",
    "M12 4v5",
  ],
  "LungsIcon",
);

export const InstagramIcon = icon(
  [
    "M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8",
    "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0",
    "M16.5 7.5v.01",
  ],
  "InstagramIcon",
);

export const MassageIcon = icon(
  [
    "M3 17a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M8 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M4 22l4 -2v-3h12",
    "M11 20h9",
    "M8 14l3 -2l1 -4c3 1 3 4 3 6",
  ],
  "MassageIcon",
);

export const YogaIcon = icon(
  [
    "M11 4a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M4 20h4l1.5 -3",
    "M17 20l-1 -5h-5l1 -7",
    "M4 10l4 -1l4 -1l4 1.5l4 1.5",
  ],
  "YogaIcon",
);

export const EmpathizeIcon = icon(
  [
    "M9.5 5.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
    "M12 21.368l5.095 -5.096a3.088 3.088 0 1 0 -4.367 -4.367l-.728 .727l-.728 -.727a3.088 3.088 0 1 0 -4.367 4.367l5.095 5.096",
  ],
  "EmpathizeIcon",
);

export const CrystalBallIcon = icon(
  [
    "M6.73 17.018a8 8 0 1 1 10.54 0",
    "M5 19a2 2 0 0 0 2 2h10a2 2 0 1 0 0 -4h-10a2 2 0 0 0 -2 2",
    "M11 7a3 3 0 0 0 -3 3",
  ],
  "CrystalBallIcon",
);

export const ProngIcon = icon(
  [
    "M10.2 10.2l6.3 6.3",
    "M19.347 16.575l1.08 1.079a1.96 1.96 0 0 1 -2.773 2.772l-1.08 -1.079a1.96 1.96 0 0 1 2.773 -2.772",
    "M3 7l3.05 3.15a2.9 2.9 0 0 0 4.1 -4.1l-3.15 -3.05",
  ],
  "ProngIcon",
);

export const GongIcon = icon(
  ["M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M6 12a6 6 0 0 0 6 6"],
  "GongIcon",
);

export const WaveSineIcon = icon(
  [
    "M21 12h-2c-.894 0 -1.662 -.857 -1.761 -2c-.296 -3.45 -.749 -6 -2.749 -6s-2.5 3.582 -2.5 8s-.5 8 -2.5 8s-2.452 -2.547 -2.749 -6c-.1 -1.147 -.867 -2 -1.763 -2h-2",
  ],
  "WaveSineIcon",
);
