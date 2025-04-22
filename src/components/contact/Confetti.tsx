import { FC, useEffect, useState } from "react";
import styles from "../../styles/Contact.module.css";

const Confetti: FC = () => {
  const [particles, setParticles] = useState<
    Array<{
      left: string;
      size: string;
      color: string;
      animationDuration: string;
      translateX: string;
      rotateDeg: string;
    }>
  >([]);

  useEffect(() => {
    // Generate confetti particles
    const colors = ["#3DCFBC", "#5FD8C8", "#1A9E8E", "#F5F0FF", "#E9DBFF"];
    const newParticles = Array.from({ length: 100 }).map(() => {
      const left = `${Math.random() * 100}%`;
      const size = `${Math.random() * 10 + 5}px`;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const animationDuration = `${Math.random() * 3 + 2}s`;
      const translateX = `${Math.random() > 0.5 ? "+" : "-"}${Math.random() * 200}px`;
      const rotateDeg = `${Math.random() * 360}deg`;

      return {
        left,
        size,
        color,
        animationDuration,
        translateX,
        rotateDeg,
      };
    });

    setParticles(newParticles);
  }, []);

  return (
    <div className={styles.confettiContainer}>
      {particles.map((particle, i) => (
        <div
          key={i}
          className={styles.confetti}
          style={
            {
              left: particle.left,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              animation: `fall ${particle.animationDuration} linear`,
              "--translate-x": particle.translateX,
              "--rotate-deg": particle.rotateDeg,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default Confetti;
