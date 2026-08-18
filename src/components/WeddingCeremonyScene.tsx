import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealText, parallax } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { ScratchReveal } from "./ScratchReveal";
import { weddingData } from "../data/weddingData";
import styles from "./WeddingCeremonyScene.module.css";

export function WeddingCeremonyScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ceremony-bg",
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );
      revealText(".ceremony-line", el);
      parallax(".ceremony-line", el, 3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.ceremony}`} id="ceremony" ref={sectionRef}>
      <SceneBackgroundImage
        name="wedding-mandap"
        alt="A magnificent floral wedding mandap with a sacred fire, set before an illuminated palace"
        className="ceremony-bg"
      />
      <ParticleField variant="ember" count={6} />

      <div className={`${styles.dateBlock} ceremony-line`}>
        <p className="eyebrow">Wedding Ceremony</p>
        <ScratchReveal label="Scratch to Reveal" className={`royal-card ${styles.scratchCard}`}>
          <div className={styles.dateTimeGroup}>
            <p className={`meta-datetime ${styles.dateLine}`}>{weddingData.weddingDate.toUpperCase()}</p>
            <p className={`meta-datetime ${styles.dateLine}`}>Sumuhurtham &middot; {weddingData.weddingTime}</p>
          </div>
        </ScratchReveal>
      </div>
    </section>
  );
}
