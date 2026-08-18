import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealText, fadeIn, fadeOut, parallax } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { ScratchReveal } from "./ScratchReveal";
import { CountdownTimer } from "./CountdownTimer";
import { weddingData } from "../data/weddingData";
import styles from "./WeddingCeremonyScene.module.css";

const sumuhurtham = new Date(weddingData.weddingDateTimeISO);

export function WeddingCeremonyScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [timeRevealed, setTimeRevealed] = useState(false);

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
      fadeIn(".ceremony-header-text", el);
      fadeOut(".ceremony-header", el);
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

      <div className={`${styles.topHeader} ceremony-header`}>
        <p className="eyebrow ceremony-header-text">Wedding Ceremony</p>
      </div>

      <div className={`${styles.dateBlock} ceremony-line`}>
        <ScratchReveal
          label="Scratch to Reveal"
          className={`royal-card ${styles.scratchCard}`}
          onRevealed={() => setTimeRevealed(true)}
        >
          <p className={`meta-datetime ${styles.dateLine}`}>Sumuhurtham &middot; {weddingData.weddingTime}</p>
        </ScratchReveal>

        {timeRevealed && (
          <div className={styles.countdownWrap}>
            <p className={styles.countdownLabel}>Counting down to the Sumuhurtham</p>
            <CountdownTimer target={sumuhurtham} />
          </div>
        )}
      </div>
    </section>
  );
}
