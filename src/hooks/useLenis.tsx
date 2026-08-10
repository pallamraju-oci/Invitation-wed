import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, ensureGsapRegistered } from "../animations/gsapSetup";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const LenisContext = createContext<Lenis | null>(null);

/**
 * Boots Lenis smooth-scroll and syncs it to the GSAP ticker/ScrollTrigger so
 * scroll-driven timelines read the smoothed scroll position rather than the
 * raw (jumpy) native scroll events. Skipped entirely under reduced-motion,
 * where native scrolling is left untouched. Exposes the instance via context
 * so UI (e.g. the progress dots) can request a smooth `scrollTo`.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [instance, setInstance] = useState<Lenis | null>(null);
  const instanceRef = useRef<Lenis | null>(null);

  useEffect(() => {
    ensureGsapRegistered();
    if (reducedMotion) {
      setInstance(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    instanceRef.current = lenis;
    setInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      instanceRef.current = null;
      setInstance(null);
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>;
}

export function useLenisInstance(): Lenis | null {
  return useContext(LenisContext);
}
