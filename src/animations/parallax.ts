import gsap from "gsap";
import { prefersReducedMotion } from "./gsapSetup";

export interface ParallaxLayers {
  background?: Element | null;
  midground?: Element | null;
  foreground?: Element | null;
}

export interface ParallaxSpeeds {
  background?: number;
  midground?: number;
  foreground?: number;
}

const DEFAULT_SPEEDS: Required<ParallaxSpeeds> = {
  background: -8,
  midground: -18,
  foreground: -32,
};

/**
 * Wires a classic three-layer depth parallax (background slow, midground medium,
 * foreground fast) for a single scene, scrubbed to that scene's own scroll pass.
 */
export function createSceneParallax(
  trigger: Element,
  layers: ParallaxLayers,
  speeds: ParallaxSpeeds = {}
): gsap.core.Tween[] {
  if (prefersReducedMotion()) return [];
  const merged = { ...DEFAULT_SPEEDS, ...speeds };
  const tweens: gsap.core.Tween[] = [];

  (Object.keys(layers) as Array<keyof ParallaxLayers>).forEach((key) => {
    const el = layers[key];
    if (!el) return;
    tweens.push(
      gsap.to(el, {
        yPercent: merged[key],
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      })
    );
  });

  return tweens;
}

/** Horizontal drift for a single element (e.g. a procession elephant, peacock feathers). */
export function createHorizontalDrift(
  target: Element,
  trigger: Element,
  distancePx: number,
  opts: gsap.TweenVars = {}
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;
  return gsap.fromTo(
    target,
    { x: -distancePx / 2 },
    {
      x: distancePx / 2,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
      ...opts,
    }
  );
}
