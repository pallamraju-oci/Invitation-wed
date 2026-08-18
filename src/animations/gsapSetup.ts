import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers show/hide their address bar as you scroll, firing resize
// events that would otherwise force a full ScrollTrigger recalculation mid-
// gesture -- the classic cause of janky, "jumpy" scroll-linked animation on
// phones even though the same page is silky on desktop.
ScrollTrigger.config({ ignoreMobileResize: true });

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
