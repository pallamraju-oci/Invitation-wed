import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealText, parallax } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { weddingData } from "../data/weddingData";
import styles from "./JourneyScene.module.css";

export function JourneyScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      revealText(".journey-line", el);
      revealText(".journey-closing", el, { delay: 0.3 });
      parallax(".journey-bg", el, 7);
      parallax(".scene__content", el, 3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.journey}`} id="journey" ref={sectionRef}>
      <SceneBackgroundImage
        name="journey-palace"
        alt="The bride and groom walking hand in hand down a diya-lit palace pathway at dusk"
        className="journey-bg"
      />
      <ParticleField variant="gold" count={7} />

      <div className={`scene__content ${styles.content}`}>
        <p className="eyebrow">Our Journey</p>
        <p className="body-copy">
          {weddingData.journey.lines.map((line, i) => (
            <span key={i} className="journey-line" style={{ display: "block" }}>
              {line}
            </span>
          ))}
        </p>
        <p className={`body-copy journey-closing ${styles.closing}`}>{weddingData.journey.closing}</p>
      </div>
    </section>
  );
}
