import { useMemo } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./GoldSparkleField.module.css";

interface Sparkle {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  dx: number;
  dy: number;
}

const SPARKLE_COUNT = 46;

function buildSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 6,
    duration: 3 + Math.random() * 4,
    dx: (Math.random() - 0.5) * 36,
    dy: (Math.random() - 0.5) * 36,
  }));
}

/**
 * A fixed, page-wide layer of gold sparkles that continuously twinkle and
 * drift in place on their own CSS timers -- deliberately not tied to scroll
 * position or any GSAP ScrollTrigger, so the atmosphere stays alive even
 * while the visitor sits still reading a page.
 */
export function GoldSparkleField() {
  const sparkles = useMemo(() => buildSparkles(SPARKLE_COUNT), []);
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className={styles.field} aria-hidden="true">
      {sparkles.map((s, i) => (
        <span
          key={i}
          className={styles.sparkle}
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              "--dx": `${s.dx}px`,
              "--dy": `${s.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
