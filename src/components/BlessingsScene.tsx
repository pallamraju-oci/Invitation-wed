import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealText, scaleIn, parallax } from "../animations/scrollAnimations";
import { Elephant, VenkateswaraNamam, Diya, ParticleField } from "./decor";
import { weddingData } from "../data/weddingData";
import styles from "./BlessingsScene.module.css";

export function BlessingsScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      scaleIn(".blessings-namam", el, { duration: 1.2 });
      revealText(".blessings-line", el, { delay: 0.2 });
      parallax(".blessings-elephant-left", el, -6);
      parallax(".blessings-elephant-right", el, -6);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.blessings}`} id="blessings" ref={sectionRef}>
      <Elephant className={`${styles.elephant} ${styles.elephantLeft} blessings-elephant-left`} />
      <Elephant flip className={`${styles.elephant} ${styles.elephantRight} blessings-elephant-right`} />
      <ParticleField variant="ember" count={7} />
      <div className="scene__vignette" />

      <div className="scene__content">
        <VenkateswaraNamam className={`${styles.namam} blessings-namam`} />
        <p className="body-copy">
          <span className="blessings-line" style={{ display: "block" }}>
            With the divine blessings of
          </span>
          <span className="blessings-line" style={{ display: "block" }}>
            Almighty and our elders&hellip;
          </span>
        </p>
        <p className="body-copy">
          <span className="blessings-line" style={{ display: "block" }}>
            We seek your love,
          </span>
          <span className="blessings-line" style={{ display: "block" }}>
            blessings and good wishes
          </span>
          <span className="blessings-line" style={{ display: "block" }}>
            as we begin our new journey together.
          </span>
        </p>
        <div className={styles.diyaRow}>
          <Diya />
          <Diya />
          <Diya />
        </div>
        <div className="visually-hidden">{weddingData.blessing}</div>
      </div>
    </section>
  );
}
