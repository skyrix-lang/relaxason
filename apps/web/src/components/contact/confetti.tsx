import { useState, type CSSProperties } from "react";

const COLORS = [
  "var(--brand-500)",
  "var(--brand-400)",
  "var(--brand-700)",
  "#f5f0ff",
  "#e9dbff",
];

function particles() {
  return Array.from({ length: 100 }, (_, id) => {
    const size = `${Math.random() * 10 + 5}px`;
    return {
      id,
      style: {
        left: `${Math.random() * 100}%`,
        width: size,
        height: size,
        backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        animationDuration: `${Math.random() * 3 + 2}s`,
        "--translate-x": `${Math.random() > 0.5 ? "" : "-"}${Math.random() * 200}px`,
        "--rotate-deg": `${Math.random() * 360}deg`,
      } as CSSProperties,
    };
  });
}

/** A burst of falling dots, shown for a moment when a message was sent. */
export function Confetti() {
  // Drawn once per burst: a re-render mustn't reshuffle falling particles.
  const [items] = useState(particles);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1000] overflow-hidden motion-reduce:hidden"
    >
      {items.map((particle) => (
        <div key={particle.id} className="confetti" style={particle.style} />
      ))}
    </div>
  );
}
