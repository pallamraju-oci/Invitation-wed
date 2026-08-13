import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealText } from "../animations/scrollAnimations";
import { Diya, ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { weddingData } from "../data/weddingData";
import styles from "./BlessingsScene.module.css";

export function BlessingsScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      revealText(".blessings-line", el);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.blessings}`} id="blessings" ref={sectionRef}>
      <SceneBackgroundImage
        name="venkateswara-blessings"
        alt="A sacred namam symbol above two ceremonial elephants facing an illuminated temple gopuram"
      />
      <ParticleField variant="ember" count={7} />
      <div className="scene__vignette" />

      <div className="scene__content">
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
