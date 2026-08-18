import { useEffect, useState } from "react";
import styles from "./CountdownTimer.module.css";

interface CountdownTimerProps {
  target: Date;
  className?: string;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  arrived: boolean;
}

function computeRemaining(target: Date): Remaining {
  const diffMs = target.getTime() - Date.now();
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, arrived: true };
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    arrived: false,
  };
}

/** Live "time until the sumuhurtham" ticker, updating once a second. */
export function CountdownTimer({ target, className }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(() => computeRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setRemaining(computeRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (remaining.arrived) {
    return <p className={`${styles.arrived} ${className ?? ""}`}>The auspicious moment has arrived</p>;
  }

  const units: Array<[string, number]> = [
    ["Days", remaining.days],
    ["Hrs", remaining.hours],
    ["Min", remaining.minutes],
    ["Sec", remaining.seconds],
  ];

  return (
    <div className={`${styles.countdown} ${className ?? ""}`}>
      {units.map(([label, value], i) => (
        <div className={styles.unitGroup} key={label}>
          {i > 0 && <span className={styles.separator}>:</span>}
          <div className={styles.unit}>
            <span className={styles.value}>{String(value).padStart(2, "0")}</span>
            <span className={styles.label}>{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
