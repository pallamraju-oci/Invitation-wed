import { useGoldGradient } from "./useGoldGradient";
import styles from "./TempleDoors.module.css";

interface TempleDoorsProps {
  className?: string;
  style?: React.CSSProperties;
}

function DoorPanel({ side }: { side: "left" | "right" }) {
  const { goldUrl, softUrl, lineUrl, defs } = useGoldGradient(`door-${side}`);
  return (
    <svg viewBox="0 0 200 700" preserveAspectRatio="none" className={styles.doorSvg}>
      {defs}
      <rect x="0" y="0" width="200" height="700" fill="#3b154d" />
      <rect x="0" y="0" width="200" height="700" fill="url(#wood)" opacity="0" />
      <rect x="10" y="10" width="180" height="680" fill="none" stroke={goldUrl} strokeWidth="5" />
      <rect x="24" y="24" width="152" height="652" fill="none" stroke={lineUrl} strokeWidth="1.5" opacity="0.7" />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect
          key={i}
          x="40"
          y={50 + i * 128}
          width="120"
          height="104"
          rx="6"
          fill="none"
          stroke={goldUrl}
          strokeWidth="2.4"
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={`c-${i}`} cx="100" cy={102 + i * 128} r="16" fill={softUrl} stroke={lineUrl} strokeWidth="1" opacity="0.85" />
      ))}
      <rect
        x={side === "left" ? 176 : 4}
        y="300"
        width="20"
        height="100"
        rx="4"
        fill={goldUrl}
        stroke="#4a3410"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/** Two independently-animatable door panels; parent scene tweens [data-door] targets apart. */
export function TempleDoors({ className, style }: TempleDoorsProps) {
  return (
    <div className={`${styles.doors} ${className ?? ""}`} style={style}>
      <div className={styles.doorLeft} data-door="left">
        <DoorPanel side="left" />
      </div>
      <div className={styles.doorRight} data-door="right">
        <DoorPanel side="right" />
      </div>
    </div>
  );
}
