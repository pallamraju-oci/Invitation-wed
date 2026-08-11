import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealText } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
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
        <p className={`${styles.venue} ceremony-line`}>{weddingData.wedding.venue}</p>
      </div>
    </section>
  );
}
