import { useGoldGradient } from "./useGoldGradient";

interface PeacockProps {
  className?: string;
  style?: React.CSSProperties;
  flip?: boolean;
}

export function Peacock({ className, style, flip = false }: PeacockProps) {
  const { goldUrl, softUrl, lineUrl, defs } = useGoldGradient("peacock");
  const feathers = 9;

  return (
    <svg
      viewBox="0 0 360 420"
      className={className}
      role="img"
      aria-label="Decorative peacock with fanned feathers"
      focusable="false"
      style={{ ...(flip ? { transform: "scaleX(-1)" } : undefined), ...style }}
    >
      {defs}
      <g transform="translate(180 300)">
        {/* fanned tail */}
        {Array.from({ length: feathers }).map((_, i) => {
          const angle = -80 + (160 / (feathers - 1)) * i;
          const len = 190 - Math.abs(i - (feathers - 1) / 2) * 8;
          return (
            <g key={i} transform={`rotate(${angle})`}>
              <path
                d={`M0,0 C -14,-${len * 0.55} -10,-${len * 0.9} 0,-${len} C 10,-${len * 0.9} 14,-${len * 0.55} 0,0 Z`}
                fill={i % 2 === 0 ? softUrl : goldUrl}
                stroke="#4a3410"
                strokeWidth="0.5"
                opacity="0.88"
              />
              <ellipse cx="0" cy={-len + 6} rx="9" ry="12" fill="#3b154d" stroke={lineUrl} strokeWidth="1.4" />
              <ellipse cx="0" cy={-len + 6} rx="4" ry="5.5" fill={goldUrl} />
            </g>
          );
        })}

        {/* body */}
        <ellipse cx="0" cy="-30" rx="26" ry="38" fill="#3b154d" stroke={lineUrl} strokeWidth="1.2" />
        {/* neck + head */}
        <path d="M-6,-58 C -16,-90 -6,-118 14,-128" fill="none" stroke="#3b154d" strokeWidth="16" strokeLinecap="round" />
        <path d="M-6,-58 C -16,-90 -6,-118 14,-128" fill="none" stroke={lineUrl} strokeWidth="1" opacity="0.6" />
        <circle cx="16" cy="-130" r="10" fill="#3b154d" stroke={lineUrl} strokeWidth="1" />
        <path d="M24,-138 L34,-146 M26,-134 L38,-138 M25,-129 L37,-129" stroke={goldUrl} strokeWidth="2" strokeLinecap="round" />
        <circle cx="19" cy="-132" r="1.6" fill="#faf1d6" />
        {/* crest */}
        <path d="M12,-140 l3,-10 M17,-141 l1,-11 M22,-139 l4,-9" stroke={goldUrl} strokeWidth="1.6" strokeLinecap="round" />
        {/* legs */}
        <path d="M-8,4 L-10,26 M6,4 L8,26" stroke="#4a3410" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}
