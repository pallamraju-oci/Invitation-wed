import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { scaleIn, fadeIn } from "../animations/scrollAnimations";
import { Filigree, Lotus, Diya } from "./decor";
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.saveDate}`} id="save-the-date" ref={sectionRef}>
      <div className="scene__content">
        <p className="heading-2 std-eyebrow">Save the Date</p>

        <div className={`${styles.card} std-card`}>
          <Filigree className={`${styles.corner} ${styles.cornerTL}`} />
          <Filigree className={`${styles.corner} ${styles.cornerTR}`} />
          <Filigree className={`${styles.corner} ${styles.cornerBL}`} />
          <Filigree className={`${styles.corner} ${styles.cornerBR}`} />

          <span className={styles.day}>{day}</span>
          <span className={styles.month}>{month.toUpperCase()}</span>
          <span className={styles.year}>{year}</span>
          <span className={styles.weekday}>{weddingData.weddingDay}</span>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
          <Diya style={{ width: "34px" }} />
          <Lotus variant="bud" style={{ width: "44px" }} />
          <Diya style={{ width: "34px" }} />
        </div>
      </div>

      <div className={styles.flowerRow}>
        <Lotus />
        <Lotus variant="bud" />
        <Lotus />
      </div>
    </section>
  );
}
