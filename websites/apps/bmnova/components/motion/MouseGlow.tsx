"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useCanHover, usePrefersReducedMotion } from "./usePrefersReducedMotion";

type MouseGlowProps = {
  color?: string;
  size?: number;
  opacity?: number;
};

/** Soft radial glow that follows the pointer within the parent (must be `relative`). */
export function MouseGlow({
  color = "#6366F1",
  size = 520,
  opacity = 0.14,
}: MouseGlowProps) {
  const reduced = usePrefersReducedMotion();
  const canHover = useCanHover();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const springX = useSpring(x, { stiffness: 140, damping: 30, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 140, damping: 30, mass: 0.35 });
  const hexAlpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${springX}px ${springY}px, ${color}${hexAlpha}, transparent 65%)`;

  useEffect(() => {
    if (reduced || !canHover) return;
    const parent = ref.current?.parentElement;
    if (!parent) return;

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    const onLeave = () => {
      x.set(-9999);
      y.set(-9999);
    };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, canHover, x, y]);

  if (reduced || !canHover) return null;

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0"
      style={{ background }}
      aria-hidden
    />
  );
}
