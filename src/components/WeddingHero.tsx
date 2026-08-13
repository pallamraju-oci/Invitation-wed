import { useLayoutEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "../animations/gsapSetup";
import { fadeOut, parallax } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { weddingData } from "../data/weddingData";
import styles from "./WeddingHero.module.css";

export function WeddingHero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(".hero-namaste-text", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" })
        .to(".hero-namaste-wrap", { opacity: 0, duration: 0.6, ease: "power1.in" }, "+=0.6")
        .fromTo(".hero-invocation", { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
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
        parallax(".hero-bg", sectionRef.current, 8);
        fadeOut(".hero-content, .hero-scroll-hint", sectionRef.current);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.hero}`} id="cover" ref={sectionRef}>
      <SceneBackgroundImage
        name="cover-royal-temple"
        alt="Two decorated ceremonial elephants flanking a grand golden temple entrance, lit with diyas and lotus flowers"
        priority
        className="hero-bg"
      />
      <ParticleField variant="petal" count={6} />

      <div className={`${styles.namasteWrap} hero-namaste-wrap`} aria-hidden="true">
        <span className={`${styles.namasteText} gold-shimmer-text hero-namaste-text`}>Namaste</span>
      </div>

      <div className="scene__content hero-content">
        <p className="telugu-line hero-invocation">{weddingData.invocation}</p>
        <div className="scene__divider" />
        <h1 className={`display-names ${styles.names}`}>
          <span className="hero-name gold-shimmer-text">{weddingData.groom}</span>
          <span className={`heart hero-name ${styles.heart}`} aria-hidden="true">
            ❤
          </span>
          <span className="hero-name gold-shimmer-text">{weddingData.bride}</span>
        </h1>
        <p className="eyebrow hero-date">Wedding Invitation</p>
        <p className="script-line hero-tagline">{weddingData.tagline}</p>
      </div>

      <div className={`${styles.scrollHint} hero-scroll-hint`}>
        Scroll to explore
        <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" />
      </div>
    </section>
  );
}
