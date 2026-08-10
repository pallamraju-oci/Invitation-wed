import styles from "./SacredFire.module.css";

interface SacredFireProps {
  className?: string;
}

/** The sacred wedding fire (agni) at the mandap, with a soft brass kund base. */
export function SacredFire({ className }: SacredFireProps) {
  return (
    <svg viewBox="0 0 100 110" className={className} role="img" aria-label="Sacred wedding fire">
      <ellipse cx="50" cy="98" rx="42" ry="10" fill="#8a641f" />
      <ellipse cx="50" cy="94" rx="34" ry="7" fill="#cda037" />
      <path className={styles.flame1} d="M50,90 C34,74 40,50 50,28 C60,50 66,74 50,90 Z" fill="#c81e3d" opacity="0.9" />
      <path className={styles.flame2} d="M50,90 C40,76 44,58 50,40 C56,58 60,76 50,90 Z" fill="#ff9d4d" opacity="0.95" />
      <path className={styles.flame3} d="M50,88 C44,78 46,64 50,50 C54,64 56,78 50,88 Z" fill="#ffe1a8" />
    </svg>
  );
}
