import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { revealText, parallax } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { weddingData } from "../data/weddingData";
import styles from "./WelcomeScene.module.css";

export function WelcomeScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      revealText(".welcome-line", el);
      parallax(".scene__content", el, 3);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.welcome}`} id="welcome" ref={sectionRef}>
      <SceneBackgroundImage
        name="welcome-palace"
        alt="An open golden temple gateway revealing a diya-lit palace courtyard path flanked by peacocks"
      />
      <ParticleField variant="petal" count={10} />

      <div className={`scene__content ${styles.textBlock}`}>
        <p className="eyebrow">Welcome</p>
        <p className="body-copy">
          <span className={`${styles.line} welcome-line`}>Together with their families,</span>
          <span className={`${styles.line} welcome-line`}>we joyfully invite you to celebrate</span>
          <span className={`${styles.line} welcome-line`}>the wedding of two hearts, two families,</span>
          <span className={`${styles.line} welcome-line`}>and a beautiful journey of a lifetime.</span>
        </p>
      </div>

      <div className="visually-hidden">{weddingData.welcomeMessage}</div>
    </section>
  );
}
