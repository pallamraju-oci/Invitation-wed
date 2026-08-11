import { useGoldGradient } from "./useGoldGradient";

interface MandalaProps {
  className?: string;
  style?: React.CSSProperties;
}

const RING_OUTER_CIRCUMFERENCE = 2 * Math.PI * 280;
const RING_INNER_CIRCUMFERENCE = 2 * Math.PI * 240;

export function Mandala({ className, style }: MandalaProps) {
  const { goldUrl, lineUrl, jewelUrl, glowUrl, defs } = useGoldGradient("mandala");
  const petalCounts = [24, 16, 12];

  return (
    <svg viewBox="0 0 600 600" className={className} style={style} role="presentation" aria-hidden="true" focusable="false">
      {defs}
      <g transform="translate(300 300)">
        {/* strokeDashoffset defaults to 0 (fully drawn) so reduced-motion users, who skip
            the JS draw-in tween entirely, still see complete rings rather than nothing. */}
        <circle
          r="280"
          fill="none"
          stroke={lineUrl}
          strokeWidth="1.4"
          opacity="0.6"
          filter={glowUrl}
          data-mandala-ring="outer"
          strokeDasharray={RING_OUTER_CIRCUMFERENCE}
          strokeDashoffset={0}
        />
        <circle
          r="240"
          fill="none"
          stroke={lineUrl}
          strokeWidth="1.8"
          opacity="0.7"
          filter={glowUrl}
          data-mandala-ring="inner"
          strokeDasharray={RING_INNER_CIRCUMFERENCE}
          strokeDashoffset={0}
        />

        {petalCounts.map((count, ringIndex) => {
          const ringRadius = 180 - ringIndex * 50;
          const petalLength = 34 - ringIndex * 6;
          return (
            <g key={ringIndex}>
              {Array.from({ length: count }).map((_, i) => {
                const angle = (360 / count) * i;
                return (
                  <path
                    key={i}
                    d={`M0,${-ringRadius} q ${petalLength * 0.4},${-petalLength} 0,${-petalLength * 2} q ${-petalLength * 0.4},${petalLength} 0,${petalLength * 2} Z`}
                    fill={goldUrl}
                    opacity={0.85 - ringIndex * 0.15}
                    transform={`rotate(${angle})`}
                  />
                );
              })}
            </g>
          );
        })}

        <circle r="46" fill="none" stroke={lineUrl} strokeWidth="2" />
        <circle r="30" fill={jewelUrl} stroke={lineUrl} strokeWidth="1" opacity="0.95" />
      </g>
    </svg>
  );
}
