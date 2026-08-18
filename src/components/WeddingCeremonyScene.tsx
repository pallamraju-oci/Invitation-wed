import { useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { revealText, fadeIn, fadeOut, parallax } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { ScratchReveal } from "./ScratchReveal";
import { CountdownTimer } from "./CountdownTimer";
import { weddingData } from "../data/weddingData";
import styles from "./WeddingCeremonyScene.module.css";

const sumuhurtham = new Date(weddingData.weddingDateTimeISO);

export function WeddingCeremonyScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const countdownRef = useRef<HTMLDivElement | null>(null);
  const [timeRevealed, setTimeRevealed] = useState(false);

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
      fadeIn(".ceremony-header-text", el);
      fadeOut(".ceremony-header", el);
      revealText(".ceremony-line", el);
      parallax(".ceremony-line", el, 3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const el = countdownRef.current;
    if (!timeRevealed || !el) return;
    const reduced = prefersReducedMotion();

    const tl = gsap.timeline();
    tl.fromTo(
      el,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: reduced ? 0.01 : 0.5, ease: "power2.out" }
    );

    // Only once it's settled at its natural (in-flow, bottom-of-frame) spot do we
    // measure it and switch to fixed positioning -- this lets the move-to-center
    // tween animate from its real on-screen position rather than a stale rect.
    // x/y/xPercent/yPercent are explicitly zeroed here: the entrance tween above
    // preserves the CSS class's `translateX(-50%)` inside GSAP's own transform,
    // and leaving that in place would double up with a fresh xPercent/yPercent
    // centering shift added below. Pixel math (not %) sidesteps any ambiguity
    // over what containing block "50%" would resolve against, too.
    tl.add(() => {
      const rect = el.getBoundingClientRect();
      gsap.set(el, {
        position: "fixed",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        margin: 0,
        zIndex: 60,
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
      });
    });

    tl.to(
      el,
      {
        top: () => window.innerHeight / 2 - el.offsetHeight / 2,
        left: () => window.innerWidth / 2 - el.offsetWidth / 2,
        duration: reduced ? 0.01 : 1,
        ease: "power3.inOut",
      },
      reduced ? "+=0" : "+=0.2"
    );

    return () => {
      tl.kill();
    };
  }, [timeRevealed]);

  return (
    <section className={`scene ${styles.ceremony}`} id="ceremony" ref={sectionRef}>
      <SceneBackgroundImage
        name="wedding-mandap"
        alt="A magnificent floral wedding mandap with a sacred fire, set before an illuminated palace"
        className="ceremony-bg"
      />
      <ParticleField variant="ember" count={6} />

      <div className={`${styles.topHeader} ceremony-header`}>
        <p className="eyebrow ceremony-header-text">Wedding Ceremony</p>
      </div>

      <div className={`${styles.dateBlock} ceremony-line`}>
        <ScratchReveal
          label="Scratch to Reveal"
          className={`royal-card ${styles.scratchCard}`}
          onRevealed={() => setTimeRevealed(true)}
        >
          <p className={`meta-datetime ${styles.dateLine}`}>Sumuhurtham &middot; {weddingData.weddingTime}</p>
        </ScratchReveal>
      </div>

      {timeRevealed && (
        <div className={`royal-card ${styles.countdownWrap}`} ref={countdownRef}>
          <p className={styles.countdownLabel}>Counting down to the Sumuhurtham</p>
          <CountdownTimer target={sumuhurtham} />
        </div>
      )}
    </section>
  );
}
