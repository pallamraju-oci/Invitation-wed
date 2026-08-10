import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealText, fadeIn } from "../animations/scrollAnimations";
import { prefersReducedMotion } from "../animations/gsapSetup";
import { Diya, Lotus, ParticleField } from "./decor";
import { weddingData } from "../data/weddingData";
import styles from "./FinalScene.module.css";

const diyaGrid = Array.from({ length: 16 });

export function FinalScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      revealText(".final-message-line", el);
      fadeIn(".final-signature", el, { delay: 0.3 });
      fadeIn(".final-together", el, { delay: 0.45 });

      if (!prefersReducedMotion()) {
        gsap.to(".final-fade", {
          opacity: 1,
          duration: 2.2,
          ease: "power1.in",
          scrollTrigger: { trigger: el, start: "bottom 85%", toggleActions: "play none none reverse" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.final}`} id="final" ref={sectionRef}>
      <div className={styles.diyaField} aria-hidden="true">
        {diyaGrid.map((_, i) => (
          <div key={i} style={{ marginBottom: `${(i % 4) * 8}px` }}>
            <Diya />
          </div>
        ))}
      </div>
      <ParticleField variant="gold" count={16} />
      <div className={styles.lotusRow}>
        <Lotus />
        <Lotus variant="bud" />
        <Lotus />
        <Lotus variant="bud" />
      </div>

      <div className="scene__vignette" />

      <div className="scene__content">
        <p className="body-copy">
          <span className="final-message-line" style={{ display: "block" }}>
            With the blessings of our families,
          </span>
          <span className="final-message-line" style={{ display: "block" }}>
            we request the honour of your
          </span>
          <span className="final-message-line" style={{ display: "block" }}>
            presence to bless the couple
          </span>
          <span className="final-message-line" style={{ display: "block" }}>
            and make the occasion truly memorable.
          </span>
        </p>

        <h2 className="display-names final-signature" style={{ fontSize: "clamp(2rem, 8vw, 3.6rem)" }}>
          {weddingData.groom} <span className="heart" aria-hidden="true">❤</span> {weddingData.bride}
        </h2>
        <p className={`${styles.signature} final-together`}>{weddingData.signature}</p>
      </div>

      <div className={`${styles.finalFade} final-fade`} aria-hidden="true" />
    </section>
  );
}
