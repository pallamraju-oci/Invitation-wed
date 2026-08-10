interface NamamProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A simplified, tasteful rendering of the traditional Vaishnavite namam (tilak)
 * motif — two curved marks meeting at the base with a central line — used purely
 * as a devotional decorative symbol, not as ritual text.
 */
export function VenkateswaraNamam({ className, style }: NamamProps) {
  return (
    <svg viewBox="0 0 160 200" className={className} style={style} role="img" aria-label="Traditional Vaishnavite namam motif" focusable="false">
      <path
        d="M30,10 C10,70 10,130 50,180 C56,160 58,140 58,120 L58,10 Z"
        fill="#f4e9cf"
        opacity="0.92"
      />
      <path
        d="M130,10 C150,70 150,130 110,180 C104,160 102,140 102,120 L102,10 Z"
        fill="#f4e9cf"
        opacity="0.92"
      />
      <rect x="74" y="20" width="12" height="150" fill="#c81e3d" opacity="0.92" />
      <circle cx="80" cy="14" r="8" fill="#c81e3d" opacity="0.92" />
    </svg>
  );
}
