import { useGoldGradient } from "./useGoldGradient";

interface ElephantProps {
  className?: string;
  style?: React.CSSProperties;
  flip?: boolean;
}

export function Elephant({ className, style, flip = false }: ElephantProps) {
  const { goldUrl, softUrl, lineUrl, jewelUrl, glowUrl, defs } = useGoldGradient("elephant");

  return (
    <svg
      viewBox="0 0 480 360"
      className={className}
      role="img"
      aria-label="Decorated ceremonial elephant"
      focusable="false"
      style={{ ...(flip ? { transform: "scaleX(-1)" } : undefined), ...style }}
    >
      {defs}
      <g>
        {/* body */}
        <path
          d="M90,220 C70,170 100,120 170,110 C230,102 300,108 340,140 C365,160 372,190 366,220 C400,222 420,240 418,262 C416,282 396,292 372,290 L120,290 C95,290 78,272 80,250 C82,234 84,224 90,220 Z"
          fill="#5c2277"
          stroke={lineUrl}
          strokeWidth="1.4"
        />
        {/* head + trunk */}
        <path
          d="M96,222 C70,222 46,236 40,262 C34,288 46,312 66,326 C80,336 78,352 60,358"
          fill="none"
          stroke="#5c2277"
          strokeWidth="26"
          strokeLinecap="round"
        />
        <path
          d="M96,222 C70,222 46,236 40,262 C34,288 46,312 66,326 C80,336 78,352 60,358"
          fill="none"
          stroke={lineUrl}
          strokeWidth="1"
          opacity="0.5"
        />
        {/* ear */}
        <path
          d="M120,150 C90,140 66,158 62,190 C58,222 84,238 114,228 C130,222 132,196 128,176 Z"
          fill="#703890"
          stroke={lineUrl}
          strokeWidth="1.2"
        />
        {/* tusk */}
        <path d="M78,248 C64,254 54,266 54,280" fill="none" stroke="#f1e0a8" strokeWidth="5" strokeLinecap="round" />
        {/* legs */}
        {[130, 190, 300, 350].map((x, i) => (
          <rect key={i} x={x} y="270" width="26" height="60" rx="10" fill="#5c2277" stroke={lineUrl} strokeWidth="1" />
        ))}
        {/* howdah / ambari canopy */}
        <g transform="translate(150 60)" filter={glowUrl}>
          <path d="M0,50 L20,0 L120,0 L140,50 Z" fill={goldUrl} stroke="#4a3410" strokeWidth="1.4" />
          <rect x="10" y="48" width="120" height="14" fill={softUrl} stroke="#4a3410" strokeWidth="1" />
          <path d="M20,0 L70,-26 L120,0 Z" fill={softUrl} stroke="#4a3410" strokeWidth="1" />
          <circle cx="70" cy="-26" r="5" fill={jewelUrl} />
        </g>
        {/* headpiece / gold plate */}
        <path d="M60,196 L112,188 L104,220 L64,224 Z" fill={goldUrl} stroke="#4a3410" strokeWidth="1" opacity="0.95" />
        <circle cx="88" cy="203" r="4.5" fill={jewelUrl} />
        {/* garland */}
        <path d="M100,240 Q150,268 200,240 Q250,268 300,240" fill="none" stroke={softUrl} strokeWidth="10" strokeLinecap="round" opacity="0.9" />
        <path d="M100,240 Q150,268 200,240 Q250,268 300,240" fill="none" stroke="#a12c3d" strokeWidth="3" strokeDasharray="1 9" strokeLinecap="round" />
        {/* blanket trim */}
        <path d="M110,220 L360,220 L372,290 L120,290 Z" fill="none" stroke={lineUrl} strokeWidth="1.2" opacity="0.6" />
        {/* tail */}
        <path d="M366,224 C392,232 400,252 392,270" fill="none" stroke="#5c2277" strokeWidth="10" strokeLinecap="round" />
      </g>
    </svg>
  );
}
