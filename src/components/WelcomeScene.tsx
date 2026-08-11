import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { CurtainReveal, ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { weddingData } from "../data/weddingData";
import styles from "./WelcomeScene.module.css";

export function WelcomeScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none reverse" },
      });

      tl.to("[data-curtain]", { yPercent: -100, duration: reduced ? 0.01 : 1.1, ease: "power3.inOut" })
        .fromTo(
          ".welcome-line",
          { opacity: 0, y: reduced ? 0 : 20, filter: reduced ? "none" : "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.12, duration: 0.5 },
          "-=0.5"
        )
        .fromTo(
          ".welcome-quote",
          { opacity: 0, y: reduced ? 0 : 14 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 },
          "-=0.1"
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
      <ParticleField variant="petal" count={10} />

      <div className={`scene__content ${styles.textBlock}`}>
        <p className="eyebrow">Welcome</p>
        <p className="body-copy">
          <span className={`${styles.line} welcome-line`}>Together with their families,</span>
          <span className={`${styles.line} welcome-line`}>we joyfully invite you to celebrate</span>
          <span className={`${styles.line} welcome-line`}>the wedding of two hearts, two families,</span>
          <span className={`${styles.line} welcome-line`}>and a beautiful journey of a lifetime.</span>
        </p>

        <div className={styles.quotes}>
          {weddingData.quotes.map((quote) => (
            <p key={quote} className={`script-line ${styles.quote} welcome-quote`}>
              &ldquo;{quote}&rdquo;
            </p>
          ))}
        </div>
      </div>

      <CurtainReveal />
      <div className="visually-hidden">{weddingData.welcomeMessage}</div>
    </section>
  );
}
