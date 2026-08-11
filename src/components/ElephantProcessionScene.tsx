import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealText, parallax } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import styles from "./ElephantProcessionScene.module.css";

export function ElephantProcessionScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      revealText(".procession-line", el);
      parallax(".procession-bg", el, 8);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.procession}`} id="procession" ref={sectionRef}>
      <SceneBackgroundImage
        name="elephant-procession"
        alt="A grand ceremonial elephant with musicians processing toward an illuminated palace at dusk"
        className="procession-bg"
      />
      <ParticleField variant="petal" count={6} />

      <div className="scene__content" style={{ marginTop: "auto", paddingBottom: "10%" }}>
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
