import { useGoldGradient } from "./useGoldGradient";

interface FiligreeProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Small ornamental corner flourish used to frame text blocks. */
export function Filigree({ className, style }: FiligreeProps) {
  const { goldUrl, defs } = useGoldGradient("filigree");
  return (
    <svg viewBox="0 0 120 60" className={className} style={style} role="presentation" aria-hidden="true" focusable="false">
      {defs}
      <path
        d="M4,30 C 30,30 30,6 56,6 C 44,6 44,30 60,30 C 44,30 44,54 56,54 C 30,54 30,30 4,30 Z"
        fill="none"
        stroke={goldUrl}
        strokeWidth="1.6"
      />
      <circle cx="60" cy="30" r="3.2" fill={goldUrl} />
      <path d="M64,30 C 90,30 90,6 116,6" fill="none" stroke={goldUrl} strokeWidth="1.6" opacity="0.8" />
      <path d="M64,30 C 90,30 90,54 116,54" fill="none" stroke={goldUrl} strokeWidth="1.6" opacity="0.8" />
    </svg>
  );
}
