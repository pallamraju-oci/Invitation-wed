import { useLayoutEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "../animations/gsapSetup";
import { fadeOut, parallax } from "../animations/scrollAnimations";
import { Elephant, TempleArch, ParticleField, Garland } from "./decor";
import { weddingData } from "../data/weddingData";
import styles from "./WeddingHero.module.css";

export function WeddingHero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(".hero-invocation", { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
        .fromTo(
          ".hero-name",
          { opacity: 0, y: 34, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, stagger: 0.18, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(".hero-date", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
        .fromTo(".hero-tagline", { opacity: 0 }, { opacity: 1, duration: 1.1 }, "-=0.4")
        .fromTo(".hero-scroll-hint", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.3");

      if (sectionRef.current) {
        parallax(".hero-elephant-left", sectionRef.current, -8);
        parallax(".hero-elephant-right", sectionRef.current, -12);
        fadeOut(".hero-content, .hero-scroll-hint", sectionRef.current);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.hero}`} id="cover" ref={sectionRef}>
      <TempleArch className={styles.archLeft} />
      <TempleArch className={styles.archRight} />
      <Garland className={styles.garland} />
      <ParticleField variant="petal" count={9} />

      <Elephant className={`${styles.elephant} ${styles.elephantLeft} hero-elephant-left`} />
      <Elephant flip className={`${styles.elephant} ${styles.elephantRight} hero-elephant-right`} />

      <div className="scene__vignette" />

      <div className="scene__content hero-content">
        <p className="telugu-line hero-invocation">{weddingData.invocation}</p>
        <div className="scene__divider" />
        <h1 className="display-names">
          <span className="hero-name">{weddingData.groom}</span>{" "}
          <span className="heart hero-name" aria-hidden="true">
            ❤
          </span>{" "}
          <span className="hero-name">{weddingData.bride}</span>
        </h1>
        <p className="small-caps hero-date">{weddingData.weddingDate.toUpperCase()}</p>
        <p className="script-line hero-tagline">{weddingData.tagline}</p>
      </div>

      <div className={`${styles.scrollHint} hero-scroll-hint`}>
        Scroll to explore
        <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" />
      </div>
    </section>
  );
}
