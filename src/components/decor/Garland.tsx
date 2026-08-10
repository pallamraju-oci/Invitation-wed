interface GarlandProps {
  className?: string;
  style?: React.CSSProperties;
}

/** A draped jasmine + marigold garland strand, used as a decorative top border. */
export function Garland({ className, style }: GarlandProps) {
  const bunches = 7;
  return (
    <svg viewBox="0 0 700 90" preserveAspectRatio="none" className={className} style={style} role="presentation" aria-hidden="true" focusable="false">
      <path
        d="M0,6 Q87.5,70 175,20 Q262.5,70 350,20 Q437.5,70 525,20 Q612.5,70 700,6"
        fill="none"
        stroke="#3b8a4a"
        strokeWidth="3"
        opacity="0.6"
      />
      {Array.from({ length: bunches }).map((_, i) => {
        const x = (700 / (bunches - 1)) * i;
        const y = i % 2 === 0 ? 22 : 58;
        const marigold = i % 2 === 0;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            {marigold ? (
              <>
                <circle r="11" fill="#e8901f" opacity="0.95" />
                <circle r="6" fill="#ffb84d" />
              </>
            ) : (
              <g>
                {Array.from({ length: 5 }).map((__, j) => (
                  <circle
                    key={j}
                    cx={Math.cos((j / 5) * Math.PI * 2) * 6}
                    cy={Math.sin((j / 5) * Math.PI * 2) * 6}
                    r="4.5"
                    fill="#fbf5e6"
                  />
                ))}
                <circle r="3" fill="#e6cd7d" />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
