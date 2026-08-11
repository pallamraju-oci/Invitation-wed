import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { createPinnedTimeline } from "../animations/transitions";
import { Elephant, Peacock, TempleBell, ParticleField } from "./decor";
import { SacredFire } from "./SacredFire";
import { weddingData } from "../data/weddingData";
import styles from "./WeddingCeremonyScene.module.css";

export function WeddingCeremonyScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = createPinnedTimeline(sectionRef.current as Element, { endDistance: 2500 });

      tl.fromTo(".ceremony-pillar-left", { opacity: 0, scaleY: 0.7 }, { opacity: 1, scaleY: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(".ceremony-pillar-right", { opacity: 0, scaleY: 0.7 }, { opacity: 1, scaleY: 1, duration: 0.6, ease: "power3.out" }, 0.05);
      tl.to(".ceremony-drape-left", { opacity: 1, duration: 0.5 }, 0.15);
      tl.to(".ceremony-drape-right", { opacity: 1, duration: 0.5 }, 0.2);
      tl.fromTo(".ceremony-bell", { opacity: 0, rotate: -8 }, { opacity: 1, rotate: 0, stagger: 0.1, duration: 0.5 }, 0.3);
      tl.fromTo(".ceremony-side", { opacity: 0 }, { opacity: 0.3, stagger: 0.1, duration: 0.6 }, 0.35);
      tl.fromTo(".ceremony-fire", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, 0.45);
      tl.fromTo(
        ".ceremony-line",
        { opacity: 0, y: 24, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.22, duration: 0.6 },
        0.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.ceremony}`} id="ceremony" ref={sectionRef}>
      <Elephant className={`${styles.side} ${styles.sideLeft} ceremony-side`} />
      <Elephant flip className={`${styles.side} ${styles.sideRight} ceremony-side`} />
      <Peacock className={`${styles.peacockSide} ${styles.sideLeft} ceremony-side`} />
      <Peacock flip className={`${styles.peacockSide} ${styles.sideRight} ceremony-side`} />

      <div className={`${styles.drapeLeft} ceremony-drape-left`} />
      <div className={`${styles.drapeRight} ceremony-drape-right`} />

      <div className={`${styles.pillar} ${styles.pillarLeft} ceremony-pillar-left`}>
        <div className={styles.pillarLine} />
      </div>
      <div className={`${styles.pillar} ${styles.pillarRight} ceremony-pillar-right`}>
        <div className={styles.pillarLine} />
      </div>

      <TempleBell className={`${styles.bell} ${styles.bellLeft} ceremony-bell`} />
      <TempleBell className={`${styles.bell} ${styles.bellRight} ceremony-bell`} />

      <ParticleField variant="ember" count={8} />
      <div className={styles.mandapFloor} />
      <div className={`${styles.fireWrap} ceremony-fire`}>
        <SacredFire />
      </div>

      <div className="scene__vignette" />

      <div className="scene__content" style={{ zIndex: 30 }}>
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
