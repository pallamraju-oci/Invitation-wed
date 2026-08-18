import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./gsapSetup";

type Target = gsap.TweenTarget;

const DEFAULT_START = "top 80%";

/** Fade an element in as it enters the viewport, with a gentle rise + blur softening. */
export function fadeIn(target: Target, trigger: Element, vars: gsap.TweenVars = {}): gsap.core.Tween {
  const reduced = prefersReducedMotion();
  return gsap.fromTo(
    target,
    { opacity: 0, y: reduced ? 0 : 40, filter: reduced ? "none" : "blur(6px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger,
        start: DEFAULT_START,
        toggleActions: "play none none reverse",
      },
      ...vars,
    }
  );
}

/** Fade an element out as it leaves the viewport upward. */
export function fadeOut(target: Target, trigger: Element, vars: gsap.TweenVars = {}): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { opacity: 1, y: 0 },
    {
      opacity: 0,
      y: -30,
      ease: "power1.in",
      scrollTrigger: {
        trigger,
        start: "bottom 40%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
      ...vars,
    }
  );
}

/**
 * Depth-layer parallax: moves an element vertically relative to scroll while
 * its section is in view. `speed` is a yPercent offset applied by the time
 * the section has fully scrolled past (e.g. -10 drifts the layer up by 10%
 * of its own height) — small values (single digits to low tens) read as
 * gentle depth; large values will visibly fly the element off its spot.
 */
export function parallax(
  target: Target,
  trigger: Element,
  speed = 10,
  opts: gsap.TweenVars = {}
): gsap.core.Tween {
  if (prefersReducedMotion()) return gsap.to(target, { duration: 0 });
  return gsap.fromTo(
    target,
    { yPercent: 0 },
    {
      yPercent: speed,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
      ...opts,
    }
  );
}

/** Scale an element up gently into place. */
export function scaleIn(target: Target, trigger: Element, vars: gsap.TweenVars = {}): gsap.core.Tween {
  const reduced = prefersReducedMotion();
  return gsap.fromTo(
    target,
    { opacity: 0, scale: reduced ? 1 : 0.82 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start: DEFAULT_START,
        toggleActions: "play none none reverse",
      },
      ...vars,
    }
  );
}

type SlideDirection = "left" | "right" | "up" | "down";

/** Slide an element in from a direction while fading in. */
export function slideIn(
  target: Target,
  trigger: Element,
  direction: SlideDirection = "up",
  distance = 90,
  vars: gsap.TweenVars = {}
): gsap.core.Tween {
  const reduced = prefersReducedMotion();
  const from: gsap.TweenVars = { opacity: 0 };
  if (!reduced) {
    if (direction === "left") from.x = -distance;
    if (direction === "right") from.x = distance;
    if (direction === "up") from.y = distance;
    if (direction === "down") from.y = -distance;
  }
  return gsap.fromTo(target, from, {
    opacity: 1,
    x: 0,
    y: 0,
    duration: 1.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger,
      start: DEFAULT_START,
      toggleActions: "play none none reverse",
    },
    ...vars,
  });
}

/**
 * Progressive line-by-line reveal for prose — lines stagger in top-to-bottom
 * (DOM order), each floating up from below as it fades in, so a multi-line
 * passage reads as a cascade rising into place down the block.
 */
export function revealText(target: Target, trigger: Element, vars: gsap.TweenVars = {}): gsap.core.Tween {
  const reduced = prefersReducedMotion();
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: reduced ? 0 : 32,
      filter: reduced ? "none" : "blur(4px)",
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.85,
      stagger: 0.18,
      ease: "power2.out",
      scrollTrigger: {
        trigger,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      ...vars,
    }
  );
}

/** Reveals an image/panel using a clip-path wipe rather than a plain fade. */
export function imageReveal(target: Target, trigger: Element, vars: gsap.TweenVars = {}): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.6 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration: 1.4,
      ease: "power4.out",
      scrollTrigger: {
        trigger,
        start: DEFAULT_START,
        toggleActions: "play none none reverse",
      },
      ...vars,
    }
  );
}

/** Sets up slow, continuous drifting motion for ambient particles (petals / gold dust / embers). */
export function floatingParticles(targets: Target, opts: { distance?: number; duration?: number } = {}): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;
  const { distance = 40, duration = 6 } = opts;
  return gsap.to(targets, {
    y: `-=${distance}`,
    x: `+=${distance / 3}`,
    opacity: 0,
    duration,
    ease: "none",
    stagger: {
      each: duration / 8,
      repeat: -1,
    },
  });
}

export { gsap, ScrollTrigger };
