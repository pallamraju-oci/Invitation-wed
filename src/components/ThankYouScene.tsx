import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { fadeIn, revealText, parallax } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
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
      parallax(".scene__content", el, 3);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.thankYou}`} id="thank-you" ref={sectionRef}>
      <SceneBackgroundImage
        name="thank-you-palace"
        alt="An ornate empty gold temple arch framed in marigold garlands, bells and lotus flowers"
      />
      <ParticleField variant="gold" count={14} />

      <div className={`scene__content ${styles.content}`}>
        <p className="eyebrow ty-eyebrow">Thank You</p>
        <p className={`${styles.message} ty-message`}>
          <span style={{ display: "block" }}>Your presence will make</span>
          <span style={{ display: "block" }}>our celebration even more</span>
          <span style={{ display: "block" }}>special and memorable.</span>
        </p>
        <p className={`${styles.signature} ty-signature`}>
          With Love, {weddingData.groom} &amp; {weddingData.bride}
        </p>
      </div>
      <div className="visually-hidden">{weddingData.thankYouMessage}</div>
    </section>
  );
}
