import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./SceneBackgroundImage.module.css";

interface SceneBackgroundImageProps {
  /** Base filename (no extension/size suffix) under public/images/scenes/, e.g. "cover-royal-temple". */
  name: string;
  alt: string;
  /** True only for the very first, above-the-fold image — skips lazy loading. */
  priority?: boolean;
  className?: string;
  scrim?: boolean;
  kenBurns?: boolean;
}

/**
 * Responsive scene photograph: serves a smaller crop to narrow viewports via
 * srcSet, WebP with a JPEG fallback via <picture>, and an optional dark top/
 * bottom scrim so overlaid text stays legible regardless of the photo's own
 * brightness in that region.
 */
export const SceneBackgroundImage = forwardRef<HTMLDivElement, SceneBackgroundImageProps>(
  ({ name, alt, priority = false, className, scrim = true, kenBurns = true }, ref) => {
    const base = `/images/scenes/${name}`;
    const imgRef = useRef<HTMLImageElement | null>(null);
    // Every scene stays mounted for the whole scroll, so a Ken Burns
    // animation running unconditionally on all ~10 photos at once (each
    // holding its own GPU layer via will-change) is a real, measured source
    // of scroll jank -- only the scene actually near the viewport needs to
    // be mid-drift, so the rest sit paused until they're about to be seen.
    const [isNearViewport, setIsNearViewport] = useState(priority);

    useEffect(() => {
      if (!kenBurns) return;
      const el = imgRef.current;
      if (!el || typeof IntersectionObserver === "undefined") {
        setIsNearViewport(true);
        return;
      }
      const observer = new IntersectionObserver(([entry]) => setIsNearViewport(entry.isIntersecting), {
        rootMargin: "10% 0px",
      });
      observer.observe(el);
      return () => observer.disconnect();
    }, [kenBurns, priority]);

    return (
      <div className={`${styles.wrap} ${className ?? ""}`} ref={ref}>
        <picture>
          <source type="image/webp" srcSet={`${base}-sm.webp 480w, ${base}.webp 960w`} sizes="100vw" />
          <source type="image/jpeg" srcSet={`${base}-sm.jpg 480w, ${base}.jpg 960w`} sizes="100vw" />
          <img
            ref={imgRef}
            className={`${styles.img} ${kenBurns ? styles.kenBurns : ""} ${
              kenBurns && isNearViewport ? styles.kenBurnsActive : ""
            }`}
            src={`${base}.jpg`}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
          />
        </picture>
        {scrim && <div className={styles.scrim} />}
      </div>
    );
  }
);

SceneBackgroundImage.displayName = "SceneBackgroundImage";
