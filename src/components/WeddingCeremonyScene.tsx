import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { createPinnedTimeline } from "../animations/transitions";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { weddingData } from "../data/weddingData";
import styles from "./WeddingCeremonyScene.module.css";

export function WeddingCeremonyScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = createPinnedTimeline(sectionRef.current as Element, { endDistance: 2000 });

      tl.fromTo(".ceremony-bg", { opacity: 0.3 }, { opacity: 1, duration: 0.8 }, 0);
      tl.fromTo(
        ".ceremony-line",
        { opacity: 0, y: 24, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.22, duration: 0.6 },
        0.35
      );
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

      <div className="scene__content" style={{ zIndex: 30, marginTop: "clamp(1rem, 6vh, 4rem)" }}>
        <p className="eyebrow ceremony-line">Wedding Ceremony</p>
        <h2 className="display-names gold-shimmer-text ceremony-line" style={{ fontSize: "clamp(2rem, 9vw, 4.4rem)" }}>
          {weddingData.groom} <span className="heart" aria-hidden="true">❤</span> {weddingData.bride}
        </h2>
        <p className="small-caps ceremony-line">{weddingData.weddingDate.toUpperCase()}</p>
        <p className={`${styles.time} ceremony-line`}>{weddingData.weddingTime}</p>
      </div>
    </section>
  );
}
