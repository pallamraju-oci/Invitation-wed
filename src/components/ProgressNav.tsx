import { useActiveSection } from "../hooks/useActiveSection";
import { useLenisInstance } from "../hooks/useLenis";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./ProgressNav.module.css";

interface SceneStop {
  id: string;
  label: string;
}

const scenes: SceneStop[] = [
  { id: "cover", label: "Cover" },
  { id: "welcome", label: "Welcome" },
  { id: "couple", label: "Charan & Jyothi" },
  { id: "journey", label: "Our Journey" },
  { id: "haldi", label: "Haldi Ceremony" },
  { id: "procession", label: "Elephant Procession" },
  { id: "ceremony", label: "Wedding Ceremony" },
  { id: "venue", label: "Venue" },
  { id: "blessings", label: "Blessings" },
  { id: "save-the-date", label: "Save the Date" },
  { id: "thank-you", label: "Thank You" },
  { id: "final", label: "Together Forever" },
];

/** A subtle vertical progress indicator — not a navbar. Gold dots, current scene glows. */
export function ProgressNav() {
  const activeId = useActiveSection(scenes.map((s) => s.id));
  const lenis = useLenisInstance();
  const reducedMotion = usePrefersReducedMotion();

  const goTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <nav className={styles.nav} aria-label="Wedding story progress">
      {scenes.map((scene) => (
        <button
          key={scene.id}
          type="button"
          className={`${styles.dot} ${activeId === scene.id ? styles.dotActive : ""}`}
          aria-label={`Go to ${scene.label}`}
          aria-current={activeId === scene.id ? "true" : undefined}
          onClick={() => goTo(scene.id)}
        />
      ))}
    </nav>
  );
}
