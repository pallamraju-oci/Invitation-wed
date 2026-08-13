import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { fadeIn, slideIn } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { weddingData } from "../data/weddingData";
import styles from "./HaldiScene.module.css";

const haldiVibes = ["Turmeric Blessings", "Folk Music & Dance", "Family Traditions", "Golden Beginnings"];

export function HaldiScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      fadeIn(".haldi-eyebrow", el);
      slideIn(".haldi-title", el, "up", 40);
      fadeIn(".haldi-details", el, { delay: 0.15 });
      fadeIn(".haldi-vibe-card", el, { delay: 0.1, stagger: 0.15 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.haldi}`} id="haldi" ref={sectionRef}>
      <SceneBackgroundImage
        name="haldi"
        alt="A turmeric ceremony altar framed in marigold garlands and banana leaves, with brass vessels of haldi paste"
        scrim={false}
      />
      <div className={styles.wash} />
      <ParticleField variant="gold" count={10} />
      <div className="scene__vignette" />

      <div className={`scene__content ${styles.content}`}>
        <p className="eyebrow haldi-eyebrow">Pre-Wedding Ritual</p>
        <h2 className="heading-1 haldi-title">{weddingData.haldi.title}</h2>
        <div className={`${styles.venueTag} haldi-details`}>
          {weddingData.haldi.date} · {weddingData.haldi.day}
        </div>
        <div className={`${styles.venueTag} haldi-details`}>{weddingData.haldi.venueName}</div>

        <div className={styles.vibeGrid}>
          {haldiVibes.map((title) => (
            <div key={title} className={`royal-card ${styles.vibeCard} haldi-vibe-card`}>
              <p className={styles.vibeTitle}>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
