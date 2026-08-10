import { useMemo } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./ParticleField.module.css";

interface ParticleFieldProps {
  className?: string;
  count?: number;
  variant?: "petal" | "gold" | "ember";
}

interface Particle {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
}

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }).map(() => ({
    left: Math.random() * 100,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 8,
    duration: 9 + Math.random() * 8,
    drift: (Math.random() - 0.5) * 120,
    rotate: Math.random() * 360,
  }));
}

/** Ambient floating petals / gold dust / embers — pure CSS animation, disabled under reduced-motion. */
export function ParticleField({ className, count = 14, variant = "petal" }: ParticleFieldProps) {
  const particles = useMemo(() => buildParticles(count), [count]);
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className={`${styles.field} ${className ?? ""}`} aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className={`${styles.particle} ${styles[variant]}`}
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
              "--rotate": `${p.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
