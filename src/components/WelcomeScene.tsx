import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { createPinnedTimeline } from "../animations/transitions";
import { TempleDoors, ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { weddingData } from "../data/weddingData";
import styles from "./WelcomeScene.module.css";

export function WelcomeScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = createPinnedTimeline(sectionRef.current as Element, { endDistance: 2400 });

      tl.to('[data-door="left"]', { xPercent: -100, ease: "power3.inOut", duration: 1 }, 0);
      tl.to('[data-door="right"]', { xPercent: 100, ease: "power3.inOut", duration: 1 }, 0.04);
      tl.to(".welcome-petals", { opacity: 1, duration: 0.4 }, 0.3);
      tl.fromTo(
        ".welcome-line",
        { opacity: 0, y: 26, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.35, duration: 0.7 },
        0.55
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.welcome}`} id="welcome" ref={sectionRef}>
      <SceneBackgroundImage
        name="welcome-palace"
        alt="An open golden temple gateway revealing a diya-lit palace courtyard path flanked by peacocks"
      />
      <div className="welcome-petals" style={{ opacity: 0, position: "absolute", inset: 0, zIndex: 3 }}>
        <ParticleField variant="petal" count={10} />
      </div>

      <div className={`scene__content ${styles.textBlock}`}>
        <p className="eyebrow">Welcome</p>
        <p className="body-copy">
          <span className={`${styles.line} welcome-line`}>Together with their families,</span>
          <span className={`${styles.line} welcome-line`}>we joyfully invite you to celebrate</span>
          <span className={`${styles.line} welcome-line`}>the wedding of two hearts, two families,</span>
          <span className={`${styles.line} welcome-line`}>and a beautiful journey of a lifetime.</span>
        </p>
      </div>

      <TempleDoors />
      <div className="visually-hidden">{weddingData.welcomeMessage}</div>
    </section>
  );
}
