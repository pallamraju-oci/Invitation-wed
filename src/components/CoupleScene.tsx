import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { fadeIn, scaleIn, parallax } from "../animations/scrollAnimations";
import { prefersReducedMotion } from "../animations/gsapSetup";
import { Mandala, Peacock, Lotus, ParticleField } from "./decor";
import { weddingData } from "../data/weddingData";
import styles from "./CoupleScene.module.css";

export function CoupleScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      fadeIn(".couple-eyebrow", el);
      scaleIn(".couple-names", el, { duration: 1.4 });
      fadeIn(".couple-divider", el, { delay: 0.2 });

      if (!prefersReducedMotion()) {
        gsap.to(".couple-mandala", {
          rotate: 50,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        });

        // Etch the mandala rings in as if being hand-drawn, staggered inner-then-outer.
        // fromTo (not to) so the "hidden" dashoffset only ever exists once this tween
        // has actually taken over — the SVG's own default is fully-drawn.
        gsap.fromTo(
          '.couple-mandala [data-mandala-ring="inner"]',
          { strokeDashoffset: (_i, target) => Number(target.getAttribute("stroke-dasharray")) },
          {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none reverse" },
          }
        );
        gsap.fromTo(
          '.couple-mandala [data-mandala-ring="outer"]',
          { strokeDashoffset: (_i, target) => Number(target.getAttribute("stroke-dasharray")) },
          {
            strokeDashoffset: 0,
            duration: 2.6,
            delay: 0.3,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none reverse" },
          }
        );
      }

      parallax(".couple-peacock-left", el, -10);
      parallax(".couple-peacock-right", el, -16);
      parallax(".couple-lotus-row", el, -5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.couple}`} id="couple" ref={sectionRef}>
      <Mandala className={`${styles.mandala} couple-mandala`} />
      <ParticleField variant="gold" count={10} />

      <Peacock className={`${styles.peacock} ${styles.peacockLeft} couple-peacock-left`} />
      <Peacock flip className={`${styles.peacock} ${styles.peacockRight} couple-peacock-right`} />

      <div className={`${styles.lotusRow} couple-lotus-row`}>
        <Lotus />
        <Lotus variant="bud" />
        <Lotus />
      </div>

      <div className="scene__vignette" />

      <div className="scene__content">
        <p className="eyebrow couple-eyebrow">The Union</p>
        <h2 className={`display-names gold-shimmer-text ${styles.names} couple-names`}>
          {weddingData.groom.toUpperCase()}
          <br />
          <span className="heart" aria-hidden="true">
            ❤
          </span>
          <br />
          {weddingData.bride.toUpperCase()}
        </h2>
        <div className="scene__divider couple-divider" />
      </div>
    </section>
  );
}
