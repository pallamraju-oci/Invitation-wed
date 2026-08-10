import { useGoldGradient } from "./useGoldGradient";

interface LotusProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "bloom" | "bud";
}

export function Lotus({ className, style, variant = "bloom" }: LotusProps) {
  const { goldUrl, softUrl, defs } = useGoldGradient("lotus");
  const petals = variant === "bloom" ? 8 : 5;
  const radius = variant === "bloom" ? 46 : 30;

  return (
    <svg viewBox="0 0 200 140" className={className} style={style} role="img" aria-label="Lotus flower motif" focusable="false">
      {defs}
      <g transform="translate(100 110)">
        {Array.from({ length: petals }).map((_, i) => {
          const angle = (180 / (petals - 1)) * i - 90;
          return (
            <path
              key={i}
              d={`M0,0 C ${-radius * 0.35},${-radius * 0.9} ${-radius * 0.18},${-radius * 1.5} 0,${-radius * 1.7} C ${radius * 0.18},${-radius * 1.5} ${radius * 0.35},${-radius * 0.9} 0,0 Z`}
              fill={i % 2 === 0 ? goldUrl : softUrl}
              stroke="#4a3410"
              strokeWidth="0.6"
              opacity={0.94}
              transform={`rotate(${angle})`}
            />
          );
        })}
        <circle r={radius * 0.28} fill={softUrl} stroke="#8a641f" strokeWidth="0.8" />
        <circle r={radius * 0.12} fill="#4a3410" opacity="0.5" />
      </g>
    </svg>
  );
}
