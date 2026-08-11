import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/gsapSetup";
import { fadeIn, slideIn, parallax } from "../animations/scrollAnimations";
import { Garland, Diya, ParticleField } from "./decor";
import { weddingData } from "../data/weddingData";
import styles from "./HaldiScene.module.css";

const haldiVibes = [
  { title: "Turmeric Blessings", icon: "🌼" },
  { title: "Folk Music & Dance", icon: "🎶" },
  { title: "Family Traditions", icon: "🪔" },
  { title: "Golden Beginnings", icon: "✨" },
];

function BananaLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 300" className={className} role="presentation" aria-hidden="true">
      <path
        d="M100,300 C40,260 10,190 30,110 C46,48 90,10 100,0 C110,10 154,48 170,110 C190,190 160,260 100,300 Z"
        fill="#2f6b34"
        opacity="0.85"
      />
      <path d="M100,300 L100,0" stroke="#7fae5f" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

function BrassVessel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 140" className={className} role="img" aria-label="Brass vessel with turmeric">
      <ellipse cx="80" cy="60" rx="60" ry="42" fill="#c98a2c" stroke="#7a531c" strokeWidth="2" />
      <ellipse cx="80" cy="46" rx="46" ry="16" fill="#ffd45c" opacity="0.95" />
      <ellipse cx="80" cy="42" rx="32" ry="9" fill="#ffe38a" />
      <path d="M20,60 C20,100 140,100 140,60" fill="none" stroke="#7a531c" strokeWidth="2" />
      <path d="M14,58 C6,58 6,72 14,72" fill="none" stroke="#7a531c" strokeWidth="4" />
      <path d="M146,58 C154,58 154,72 146,72" fill="none" stroke="#7a531c" strokeWidth="4" />
    </svg>
  );
}

export function HaldiScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      fadeIn(".haldi-eyebrow", el);
      slideIn(".haldi-title", el, "up", 40);
      fadeIn(".haldi-details", el, { delay: 0.15 });
      fadeIn(".haldi-vibe-card", el, { delay: 0.1, stagger: 0.15 });
      parallax(".haldi-leaf-left", el, -8);
      parallax(".haldi-leaf-right", el, -8);
      parallax(".haldi-vessel", el, -4);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.haldi}`} id="haldi" ref={sectionRef}>
      <Garland className={`${styles.garland}`} />
      <ParticleField variant="gold" count={10} />

      <BananaLeaf className={`${styles.leaf} ${styles.leafLeft} haldi-leaf-left`} />
      <BananaLeaf className={`${styles.leaf} ${styles.leafRight} haldi-leaf-right`} />
      <BrassVessel className={`${styles.vessel} haldi-vessel`} />
      <Diya className={`${styles.diya} ${styles.diyaLeft}`} />
      <Diya className={`${styles.diya} ${styles.diyaRight}`} />

      <div className="scene__vignette" />

      <div className="scene__content">
        <p className="eyebrow haldi-eyebrow">Pre-Wedding Ritual</p>
        <h2 className="heading-1 haldi-title">{weddingData.haldi.title}</h2>
        <div className={`${styles.venueTag} haldi-details`}>
          {weddingData.haldi.date} · {weddingData.haldi.day}
        </div>
        <div className={`${styles.venueTag} haldi-details`}>
          {weddingData.haldi.venueName}{" "}
          {weddingData.haldi.venueNote && <span className={styles.venueNote}>{weddingData.haldi.venueNote}</span>}
        </div>

        <div className={styles.vibeGrid}>
          {haldiVibes.map((vibe) => (
            <div key={vibe.title} className={`royal-card ${styles.vibeCard} haldi-vibe-card`}>
              <span className={styles.vibeIcon} aria-hidden="true">
                {vibe.icon}
              </span>
              <p className={styles.vibeTitle}>{vibe.title}</p>
              <p className={styles.vibeDate}>{weddingData.haldi.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
