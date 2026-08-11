import { useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import styles from "./MusicToggle.module.css";

/**
 * Optional background music control. Never autoplays — playback only starts
 * from an explicit tap, satisfying browser autoplay policies. Drop the actual
 * track at public/audio/venkateswara-namam.mp3; if it's missing, playback
 * fails silently and the button simply stays paused.
 */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/venkateswara-namam.mp3" loop preload="none" />
      <button
        type="button"
        className={`${styles.button} ${playing ? styles.playing : ""}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause Venkateswara Namam" : "Play Venkateswara Namam"}
      >
        {playing ? <Music size={18} strokeWidth={1.6} /> : <VolumeX size={18} strokeWidth={1.6} />}
      </button>
    </>
  );
}
