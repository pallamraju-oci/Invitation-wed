import styles from "./CurtainReveal.module.css";

interface CurtainRevealProps {
  className?: string;
}

/** A velvet stage curtain that rises straight up to reveal the scene, targeted via [data-curtain]. */
export function CurtainReveal({ className }: CurtainRevealProps) {
  return (
    <div className={`${styles.curtain} ${className ?? ""}`} data-curtain="true">
      <div className={styles.rod} />
      <div className={styles.fringe} />
    </div>
  );
}
