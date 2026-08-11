import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { fadeIn, revealText } from "../animations/scrollAnimations";
import { Lotus, ParticleField } from "./decor";
import { weddingData } from "../data/weddingData";
import styles from "./ThankYouScene.module.css";

export function ThankYouScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      fadeIn(".ty-eyebrow", el);
      revealText(".ty-message", el, { delay: 0.15 });
      fadeIn(".ty-signature", el, { delay: 0.4 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.thankYou}`} id="thank-you" ref={sectionRef}>
      <ParticleField variant="gold" count={14} />
      <div className={styles.water} />
      <div className={styles.waterLotusRow}>
        <Lotus variant="bud" />
        <Lotus />
        <Lotus variant="bud" />
      </div>
      <div className="scene__vignette" />

      <div className="scene__content">
        <p className="heading-2 ty-eyebrow">Thank You</p>
        <div className={`royal-card ${styles.card}`}>
          <p className="body-copy ty-message">{weddingData.thankYouMessage}</p>
          <p className={`${styles.signature} ty-signature`}>
            With Love, {weddingData.groom} &amp; {weddingData.bride}
          </p>
        </div>
      </div>
    </section>
  );
}
