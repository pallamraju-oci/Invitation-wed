import { useId, type ReactElement } from "react";

export interface GoldGradient {
  goldUrl: string;
  softUrl: string;
  lineUrl: string;
  defs: ReactElement;
}

/**
 * Every inline decorative SVG needs its own <defs> with unique gradient ids
 * (SVGs sharing a DOM share the #id namespace). This hook mints ids scoped
 * to the component instance via useId so the same shape can render many
 * times on one page without gradient collisions.
 */
export function useGoldGradient(prefix: string): GoldGradient {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const goldId = `${prefix}-g-${rawId}`;
  const softId = `${prefix}-s-${rawId}`;
  const lineId = `${prefix}-l-${rawId}`;

  const defs = (
    <defs>
      <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#faf1d6" />
        <stop offset="42%" stopColor="#dcb95a" />
        <stop offset="72%" stopColor="#8a641f" />
        <stop offset="100%" stopColor="#e6cd7d" />
      </linearGradient>
      <linearGradient id={softId} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f1e0a8" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#8a641f" stopOpacity="0.35" />
      </linearGradient>
      <linearGradient id={lineId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#e6cd7d" />
        <stop offset="50%" stopColor="#cda037" />
        <stop offset="100%" stopColor="#e6cd7d" />
      </linearGradient>
    </defs>
  );

  return { goldUrl: `url(#${goldId})`, softUrl: `url(#${softId})`, lineUrl: `url(#${lineId})`, defs };
}
