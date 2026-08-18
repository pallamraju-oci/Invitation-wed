import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { scaleIn, fadeIn, parallax, fadeOut } from "../animations/scrollAnimations";
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
      parallax(".scene__content", el, 3);
      fadeOut(".scene__content", el);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.saveDate}`} id="save-the-date" ref={sectionRef}>
      <SceneBackgroundImage
        name="save-date"
        alt="An ornate empty gold picture frame with hanging bells and pink lotus flowers"
        className="std-bg"
      />

      <div className={`scene__content ${styles.content}`}>
        <p className="eyebrow std-eyebrow">Save the Date</p>

        <div className={`${styles.dateBlock} std-card`}>
          <span className={styles.day}>{day}</span>
          <span className={styles.month}>{month.toUpperCase()}</span>
          <span className={styles.year}>{year}</span>
        </div>
        <span className={styles.weekday}>{weddingData.weddingTime}</span>
        <p className={styles.time}>{weddingData.weddingDay}</p>
      </div>
    </section>
  );
}
