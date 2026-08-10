import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { createPinnedTimeline } from "../animations/transitions";
import { TempleDoors, Diya, Peacock, ParticleField } from "./decor";
import { weddingData } from "../data/weddingData";
import styles from "./WelcomeScene.module.css";

const diyaPositions = [
  { left: "18%", bottom: "8%" },
  { left: "30%", bottom: "18%" },
  { left: "68%", bottom: "20%" },
  { left: "80%", bottom: "9%" },
  { left: "50%", bottom: "30%" },
];

export function WelcomeScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = createPinnedTimeline(sectionRef.current as Element, { endDistance: 1700 });

      tl.to('[data-door="left"]', { xPercent: -100, ease: "power2.inOut", duration: 1 }, 0);
      tl.to('[data-door="right"]', { xPercent: 100, ease: "power2.inOut", duration: 1 }, 0);
      tl.to(".welcome-glow", { opacity: 1, duration: 0.6 }, 0.05);
      tl.fromTo(".welcome-diya", { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, 0.3);
      tl.to(".welcome-petals", { opacity: 1, duration: 0.4 }, 0.35);
      tl.fromTo(".welcome-peacock", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.6 }, 0.4);
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
      <div className={styles.courtyard}>
        <div className={styles.pathway} />
        <div className={`${styles.glow} welcome-glow`} />
        {diyaPositions.map((pos, i) => (
          <Diya key={i} className={`${styles.diya} welcome-diya`} style={pos} />
        ))}
        <Peacock flip className={`${styles.peacock} welcome-peacock`} />
        <div className="welcome-petals" style={{ opacity: 0, position: "absolute", inset: 0 }}>
          <ParticleField variant="petal" count={12} />
        </div>
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
