import { useGoldGradient } from "./useGoldGradient";

interface TempleArchProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Ornate carved temple arch used as a framing overlay for hero/ceremony scenes. */
export function TempleArch({ className, style }: TempleArchProps) {
  const { goldUrl, lineUrl, defs } = useGoldGradient("arch");

  return (
    <svg
      viewBox="0 0 400 700"
      preserveAspectRatio="none"
      className={className}
      style={style}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {defs}
      {/* left pillar */}
      <g>
        <rect x="0" y="0" width="34" height="700" fill="none" />
        <path d="M4,0 L4,700 M18,0 L18,700 M30,0 L30,700" stroke={lineUrl} strokeWidth="1" opacity="0.5" />
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx="17" cy={30 + i * 58} r="6" fill="none" stroke={goldUrl} strokeWidth="1.4" opacity="0.75" />
        ))}
      </g>
      {/* right pillar (mirrored) */}
      <g transform="translate(400 0) scale(-1 1)">
        <path d="M4,0 L4,700 M18,0 L18,700 M30,0 L30,700" stroke={lineUrl} strokeWidth="1" opacity="0.5" />
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx="17" cy={30 + i * 58} r="6" fill="none" stroke={goldUrl} strokeWidth="1.4" opacity="0.75" />
        ))}
      </g>
      {/* arch crown */}
      <path
        d="M0,90 C 40,10 360,10 400,90"
        fill="none"
        stroke={goldUrl}
        strokeWidth="6"
      />
      <path
        d="M0,110 C 45,34 355,34 400,110"
        fill="none"
        stroke={lineUrl}
        strokeWidth="1.6"
        opacity="0.7"
      />
      {/* crown finial */}
      <path d="M200,10 L200,44 M188,20 L212,20" stroke={goldUrl} strokeWidth="4" strokeLinecap="round" />
      <circle cx="200" cy="10" r="7" fill={goldUrl} />
    </svg>
  );
}
