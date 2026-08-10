import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealText } from "../animations/scrollAnimations";
import { prefersReducedMotion } from "../animations/gsapSetup";
import { ParticleField } from "./decor";
import { weddingData } from "../data/weddingData";
import styles from "./JourneyScene.module.css";

interface Pillar {
  left: string;
  height: string;
}

const leftPillars: Pillar[] = Array.from({ length: 6 }).map((_, i) => {
  const t = i / 5;
  return { left: `${8 + t * 34}%`, height: `${18 + t * 46}%` };
});

const rightPillars: Pillar[] = Array.from({ length: 6 }).map((_, i) => {
  const t = i / 5;
  return { left: `${92 - t * 34}%`, height: `${18 + t * 46}%` };
});

const pillars: Pillar[] = [...leftPillars, ...rightPillars];

function CoupleSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} role="img" aria-label="Silhouette of the couple walking together toward the palace">
      <path d="M40,160 L38,110 C38,90 46,80 50,66 C46,58 46,44 52,36 C56,30 64,30 68,36 C74,44 74,58 70,66 C74,80 82,90 82,110 L80,160 Z" fill="#0d0510" opacity="0.88" />
      <circle cx="60" cy="24" r="14" fill="#0d0510" opacity="0.88" />
      <path d="M20,160 L19,118 C19,102 25,94 28,84 C25,78 25,68 29,62 C32,58 38,58 41,62 C45,68 45,78 42,84 C45,94 51,102 51,118 L50,160 Z" fill="#0d0510" opacity="0.72" />
      <circle cx="35" cy="52" r="10" fill="#0d0510" opacity="0.72" />
    </svg>
  );
}

export function JourneyScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      revealText(".journey-line", el);
      revealText(".journey-closing", el, { delay: 0.3 });

      if (!prefersReducedMotion()) {
        gsap.fromTo(
          ".journey-silhouette",
          { y: 60, scale: 0.65, opacity: 0.5, xPercent: -50 },
          {
            y: -40,
            scale: 1,
            opacity: 1,
            xPercent: -50,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
        gsap.to(".journey-glow", {
          opacity: 1,
          scale: 1.2,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.journey}`} id="journey" ref={sectionRef}>
      <div className={`${styles.vanishGlow} journey-glow`} />
      <div className={styles.walkway} />
      <div className={styles.pillars}>
        {pillars.map((p, i) => (
          <div key={i} className={styles.pillar} style={{ left: p.left, height: p.height }} />
        ))}
      </div>
      <ParticleField variant="gold" count={8} />

      <CoupleSilhouette className={`${styles.silhouette} journey-silhouette`} />

      <div className="scene__vignette" />

      <div className="scene__content">
        <p className="eyebrow">Our Journey</p>
        <p className="body-copy">
          {weddingData.journey.lines.map((line, i) => (
            <span key={i} className="journey-line" style={{ display: "block" }}>
              {line}
            </span>
          ))}
        </p>
        <p className={`body-copy journey-closing ${styles.closing}`}>{weddingData.journey.closing}</p>
      </div>
    </section>
  );
}
