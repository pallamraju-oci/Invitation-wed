import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { fadeIn, scaleIn, parallax } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { weddingData } from "../data/weddingData";
import styles from "./CoupleScene.module.css";

export function CoupleScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      scaleIn(".couple-names", el, { duration: 1.4 });
      fadeIn(".couple-divider", el, { delay: 0.2 });
      parallax(".couple-bg", el, 6);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.couple}`} id="couple" ref={sectionRef}>
      <SceneBackgroundImage
        name="couple-peacock"
        alt="An ornate gold mandala frame with two peacocks and pink lotus flowers"
        className="couple-bg"
      />
      <ParticleField variant="gold" count={8} />
      <div className="scene__vignette" />

      <div className={`scene__content ${styles.content}`}>
        <h2 className={`display-names gold-shimmer-text ${styles.names} couple-names`}>
          {weddingData.groom.toUpperCase()}
          <br />
          <span className="heart" aria-hidden="true">
            ❤
          </span>
          <br />
          {weddingData.bride.toUpperCase()}
        </h2>
        <div className="scene__divider couple-divider" />
      </div>
    </section>
  );
}
