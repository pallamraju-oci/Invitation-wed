import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { scaleIn, fadeIn, parallax } from "../animations/scrollAnimations";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { weddingData } from "../data/weddingData";
import styles from "./SaveTheDateScene.module.css";

export function SaveTheDateScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [day, month, year] = weddingData.weddingDate.split(" ");

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      fadeIn(".std-eyebrow", el);
      scaleIn(".std-card", el, { duration: 1.3 });
      parallax(".std-bg", el, 5);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.saveDate}`} id="save-the-date" ref={sectionRef}>
      <SceneBackgroundImage
        name="save-date"
        alt="An ornate empty gold picture frame with hanging bells and pink lotus flowers"
        className="std-bg"
        scrim={false}
      />

      <div className="scene__content">
        <p className="heading-2 std-eyebrow">Save the Date</p>

        <div className={`${styles.card} std-card`}>
          <span className={styles.day}>{day}</span>
          <span className={styles.month}>{month.toUpperCase()}</span>
          <span className={styles.year}>{year}</span>
          <span className={styles.weekday}>{weddingData.weddingDay}</span>
        </div>
      </div>
    </section>
  );
}
