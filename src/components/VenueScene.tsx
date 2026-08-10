import { useLayoutEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { gsap } from "../animations/gsapSetup";
import { fadeIn, slideIn } from "../animations/scrollAnimations";
import { ParticleField } from "./decor";
import { weddingData } from "../data/weddingData";
import styles from "./VenueScene.module.css";

export function VenueScene() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      fadeIn(".venue-eyebrow", el);
      slideIn(".venue-name", el, "up", 30);
      fadeIn(".venue-address", el, { delay: 0.15 });
      fadeIn(".venue-coords", el, { delay: 0.25 });
      slideIn(".venue-qr", el, "up", 40, { delay: 0.1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`scene ${styles.venue}`} id="venue" ref={sectionRef}>
      <div className={styles.skyline} aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={styles.dome} style={{ height: `${40 + (i % 3) * 20}%` }} />
        ))}
      </div>
      <ParticleField variant="gold" count={8} />
      <div className="scene__vignette" />

      <div className="scene__content">
        <p className="eyebrow venue-eyebrow">Venue</p>
        <h2 className="heading-1 venue-name">{weddingData.wedding.venue}</h2>
        <p className={`body-copy venue-address ${styles.address}`}>{weddingData.wedding.address}</p>
        <p className="small-caps venue-address">
          {weddingData.wedding.date} · {weddingData.wedding.time}
        </p>
        <p className={`${styles.coords} venue-coords`}>
          {weddingData.wedding.latitude.toFixed(4)}° N, {weddingData.wedding.longitude.toFixed(4)}° E
        </p>

        <div className={`${styles.qrCard} venue-qr`}>
          <span className={styles.qrLabel}>Scan to Locate the Venue</span>
          <QRCodeSVG
            value={weddingData.wedding.mapsUrl}
            size={148}
            bgColor="#fbf5e6"
            fgColor="#200a29"
            level="M"
            marginSize={2}
            title="QR code to wedding venue location"
            role="img"
            aria-label="QR code to wedding venue location"
          />
        </div>
      </div>
    </section>
  );
}
