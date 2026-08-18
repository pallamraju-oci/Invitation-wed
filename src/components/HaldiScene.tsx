import { useLayoutEffect, useRef } from "react";
import { Sparkles, Utensils, Users, UtensilsCrossed, Home } from "lucide-react";
import { gsap } from "../animations/gsapSetup";
import { fadeIn, slideIn, parallax, fadeOut } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { SceneBackgroundImage } from "./SceneBackgroundImage";
import { weddingData } from "../data/weddingData";
import styles from "./HaldiScene.module.css";

const haldiVibes = [
  { title: "Turmeric Blessings", icon: Sparkles },
  { title: "Lunch", icon: Utensils },
  { title: "Family Traditions", icon: Users },
  { title: "Dinner", icon: UtensilsCrossed },
];

export function HaldiScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      fadeIn(".haldi-eyebrow", el);
      slideIn(".haldi-title", el, "up", 40);
      fadeIn(".haldi-details", el, { delay: 0.15 });
      slideIn(".haldi-vibe-card", el, "up", 50, { delay: 0.2, stagger: 0.15 });
      parallax(".scene__content", el, 3);
      fadeOut(".scene__content", el);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.haldi}`} id="haldi" ref={sectionRef}>
      <SceneBackgroundImage
        name="haldi"
        alt="A turmeric ceremony altar framed in marigold garlands and banana leaves, with brass vessels of haldi paste"
        scrim={false}
      />
      <div className={styles.wash} />
      <ParticleField variant="gold" count={10} />
      <div className="scene__vignette" />

      <div className={`scene__content ${styles.content}`}>
        <p className="eyebrow haldi-eyebrow">Haldi Ceremony</p>
        {/* <h2 className="heading-1 haldi-title">{weddingData.haldi.title}</h2> */}
        <div className={`${styles.venueTag} haldi-details`}>
          {weddingData.haldi.date} · {weddingData.haldi.day}
        </div>
        <div className={`${styles.venuePill} haldi-details`}>
          <Home className={styles.venueIcon} size={16} strokeWidth={1.5} aria-hidden="true" />
          <span>{weddingData.haldi.venueName}</span>
        </div>

        <div className={styles.vibeGrid}>
          {haldiVibes.map(({ title, icon: Icon }) => (
            <div key={title} className={`royal-card ${styles.vibeCard} haldi-vibe-card`}>
              <Icon className={styles.vibeIcon} size={22} strokeWidth={1.5} aria-hidden="true" />
              <p className={styles.vibeTitle}>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
