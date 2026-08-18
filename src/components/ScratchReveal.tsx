import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./ScratchReveal.module.css";

interface ScratchRevealProps {
  children: ReactNode;
  label?: string;
  className?: string;
  /** Fraction (0-1) of the foil that must be cleared before it's fully removed. */
  revealThreshold?: number;
}

const SCRATCH_RADIUS = 24;

/**
 * Wraps content in a gold-foil canvas overlay the visitor scratches away
 * (drag/swipe) to reveal what's underneath, like a scratch lottery ticket.
 * Falls back to instantly-revealed content under reduced-motion, since the
 * gesture itself is the point and there's no accessible equivalent for it.
 */
export function ScratchReveal({ children, label = "Scratch to Reveal", className, revealThreshold = 0.55 }: ScratchRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f1e0a8");
    gradient.addColorStop(0.5, "#cda037");
    gradient.addColorStop(1, "#8a641f");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(21, 7, 25, 0.8)";
    ctx.font = "600 0.72rem 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const glyphSpacedLabel = label.toUpperCase().split("").join(" ");
    ctx.fillText(glyphSpacedLabel, width / 2, height / 2);

    const pointFromEvent = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const scratchAt = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      if (lastPointRef.current) {
        ctx.lineCap = "round";
        ctx.lineWidth = SCRATCH_RADIUS * 2;
        ctx.beginPath();
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(x, y, SCRATCH_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      lastPointRef.current = { x, y };
    };

    const clearedFraction = () => {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const sampleStride = 4 * 6;
      let sampled = 0;
      let cleared = 0;
      for (let i = 3; i < data.length; i += sampleStride) {
        sampled++;
        if (data[i] < 10) cleared++;
      }
      return sampled ? cleared / sampled : 0;
    };

    const handlePointerDown = (e: PointerEvent) => {
      drawingRef.current = true;
      canvas.setPointerCapture(e.pointerId);
      const { x, y } = pointFromEvent(e);
      scratchAt(x, y);
      e.preventDefault();
    };
    const handlePointerMove = (e: PointerEvent) => {
      if (!drawingRef.current) return;
      const { x, y } = pointFromEvent(e);
      scratchAt(x, y);
      e.preventDefault();
    };
    const handlePointerUp = () => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      lastPointRef.current = null;
      if (clearedFraction() >= revealThreshold) {
        setRevealed(true);
      }
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [reducedMotion, label, revealThreshold]);

  return (
    <div ref={containerRef} className={`${styles.wrap} ${className ?? ""}`}>
      <div className={styles.content}>{children}</div>
      {!revealed && <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />}
    </div>
  );
}
