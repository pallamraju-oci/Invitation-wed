import { useGoldGradient } from "./useGoldGradient";
import styles from "./Diya.module.css";

interface DiyaProps {
  className?: string;
  style?: React.CSSProperties;
  lit?: boolean;
}

export function Diya({ className, style, lit = true }: DiyaProps) {
  const { goldUrl, softUrl, defs } = useGoldGradient("diya");

  return (
    <svg viewBox="0 0 100 110" className={className} style={style} role="img" aria-label="Lit brass oil lamp (diya)" focusable="false">
      {defs}
      <ellipse cx="50" cy="82" rx="38" ry="10" fill={goldUrl} stroke="#4a3410" strokeWidth="1" />
      <path d="M14,80 C10,60 30,58 50,58 C70,58 90,60 86,80 C80,90 20,90 14,80 Z" fill={softUrl} stroke="#4a3410" strokeWidth="1.2" />
      <ellipse cx="50" cy="58" rx="22" ry="7" fill="#4a3410" opacity="0.4" />
      {lit && (
        <g className={styles.flameGroup}>
          <path d="M50,54 C42,42 46,26 50,16 C54,26 58,42 50,54 Z" fill="#ff9d4d" className={styles.flameOuter} />
          <path d="M50,50 C46,42 48,32 50,24 C52,32 54,42 50,50 Z" fill="#ffe1a8" className={styles.flameInner} />
        </g>
      )}
    </svg>
  );
}
