import gsap from "gsap";
import { prefersReducedMotion } from "./gsapSetup";

export interface PinnedTimelineOptions {
  endDistance?: number;
  scrub?: number | boolean;
  anticipatePin?: number;
}

/**
 * Creates a pinned ScrollTrigger timeline scaffold used by the cinematic "hero" scenes
 * (temple doors, couple reveal, mandap). Callers add tweens to the returned timeline.
 * On reduced-motion, pinning is skipped entirely and a static (instantly-complete)
 * timeline is returned so content stays visible without scroll-jacking.
 */
export function createPinnedTimeline(
  trigger: Element,
  { endDistance = 1800, scrub = 1, anticipatePin = 0.4 }: PinnedTimelineOptions = {}
): gsap.core.Timeline {
  if (prefersReducedMotion()) {
    return gsap.timeline();
  }
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top top",
      end: `+=${endDistance}`,
      scrub,
      pin: true,
      anticipatePin,
    },
  });
}

/** Crossfades from one scene's background into the next while both are near the viewport edge. */
export function crossfadeScenes(outgoing: Element, incoming: Element, trigger: Element): gsap.core.Timeline {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "bottom bottom",
      end: "bottom top",
      scrub: 0.8,
    },
  });
  tl.to(outgoing, { opacity: 0.15, scale: 1.05, ease: "none" }, 0);
  tl.fromTo(incoming, { opacity: 0.2 }, { opacity: 1, ease: "none" }, 0);
  return tl;
}
