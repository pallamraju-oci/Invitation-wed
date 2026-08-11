/** A fixed, whole-page cinematic grain texture — gives the flat gradients a filmic quality. */
export function FilmGrain() {
  return (
    <svg className="film-grain" aria-hidden="true" focusable="false">
      <filter id="film-grain-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#film-grain-noise)" />
    </svg>
  );
}
