import { useGoldGradient } from "./useGoldGradient";

interface TempleBellProps {
  className?: string;
  style?: React.CSSProperties;
}

export function TempleBell({ className, style }: TempleBellProps) {
  const { goldUrl, lineUrl, defs } = useGoldGradient("bell");
  return (
    <svg viewBox="0 0 80 140" className={className} style={style} role="img" aria-label="Temple bell" focusable="false">
      {defs}
      <path d="M40,4 L40,20" stroke={goldUrl} strokeWidth="3" />
      <circle cx="40" cy="4" r="4" fill={goldUrl} />
      <path
        d="M20,26 C20,20 60,20 60,26 C64,60 64,80 40,92 C16,80 16,60 20,26 Z"
        fill={goldUrl}
        stroke={lineUrl}
        strokeWidth="1.4"
      />
      <ellipse cx="40" cy="26" rx="20" ry="6" fill="none" stroke={lineUrl} strokeWidth="1" opacity="0.7" />
      <path d="M40,92 L40,102" stroke="#8a641f" strokeWidth="2.4" />
      <circle cx="40" cy="108" r="6" fill={goldUrl} stroke="#4a3410" strokeWidth="1" />
    </svg>
  );
}
