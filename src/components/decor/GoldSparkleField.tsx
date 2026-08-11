import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../animations/gsapSetup";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./GoldSparkleField.module.css";

interface Sparkle {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

const SPARKLE_COUNT = 26;

function buildSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 6,
    duration: 3 + Math.random() * 4,
  }));
}

/**
 * A fixed, page-wide layer of continuously twinkling gold sparkles that drifts
 * and fades very slightly as the whole page scrolls, so it reads as one
 * unbroken atmosphere rather than restarting per-section.
 */
export function GoldSparkleField() {
  const sparkles = useMemo(() => buildSparkles(SPARKLE_COUNT), []);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { yPercent: 0, opacity: 0.55 },
        {
          yPercent: -6,
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    });
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  if (reducedMotion) return null;

  return (
    <div className={styles.field} ref={containerRef} aria-hidden="true">
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
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
