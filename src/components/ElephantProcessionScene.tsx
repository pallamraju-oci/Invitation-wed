import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealText } from "../animations/scrollAnimations";
import { createHorizontalDrift } from "../animations/parallax";
import { Elephant, TempleArch, Diya, ParticleField } from "./decor";
import styles from "./ElephantProcessionScene.module.css";

function Musician({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} role="img" aria-label="Traditional musician in the procession">
      <circle cx="30" cy="16" r="10" fill="#0d0510" opacity="0.85" />
      <path d="M18,110 L16,50 C16,38 22,32 30,32 C38,32 44,38 44,50 L42,110 Z" fill="#0d0510" opacity="0.85" />
      <ellipse cx="30" cy="70" rx="16" ry="10" fill="#8a641f" opacity="0.9" />
      <path d="M16,60 L44,60" stroke="#e6cd7d" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

export function ElephantProcessionScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      revealText(".procession-line", el);
      const elephantEl = el.querySelector(".procession-elephant");
      if (elephantEl) createHorizontalDrift(elephantEl, el, 90);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.procession}`} id="procession" ref={sectionRef}>
      <div className={styles.templeRow}>
        <TempleArch className={styles.archTile} />
        <TempleArch className={styles.archTile} style={{ transform: "scaleX(-1)" }} />
        <TempleArch className={styles.archTile} />
        <TempleArch className={styles.archTile} style={{ transform: "scaleX(-1)" }} />
      </div>

      <ParticleField variant="petal" count={10} />
      <div className={styles.groundline} />

      <Musician className={`${styles.musician} ${styles.musicianA}`} />
      <Musician className={`${styles.musician} ${styles.musicianB}`} />
      <Musician className={`${styles.musician} ${styles.musicianC}`} />
      <Musician className={`${styles.musician} ${styles.musicianD}`} />

      <Diya className={styles.diya} style={{ left: "30%" }} />
      <Diya className={styles.diya} style={{ right: "30%" }} />

      <div className={`${styles.elephantWrap} procession-elephant`}>
        <Elephant />
      </div>

      <div className="scene__vignette" />

      <div className="scene__content" style={{ marginTop: "auto", paddingBottom: "18%" }}>
        <p className="eyebrow">Procession</p>
        <p className="body-copy">
          <span className="procession-line" style={{ display: "block" }}>
            A celebration of
          </span>
          <span className="procession-line" style={{ display: "block" }}>
            tradition, culture and
          </span>
          <span className="procession-line" style={{ display: "block" }}>
            timeless blessings.
          </span>
        </p>
      </div>
    </section>
  );
}
