"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCanHover, usePrefersReducedMotion } from "./usePrefersReducedMotion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
};

export function TiltCard({
  children,
  className = "",
  maxTilt = 9,
  glare = true,
}: TiltCardProps) {
  const reduced = usePrefersReducedMotion();
  const canHover = useCanHover();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 220,
    damping: 22,
  });
  const glareX = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), {
    stiffness: 220,
    damping: 22,
  });
  const glareY = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), {
    stiffness: 220,
    damping: 22,
  });
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28), transparent 55%)`;

  if (reduced || !canHover) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
        willChange: active ? "transform" : "auto",
      }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        rawX.set((e.clientX - rect.left) / rect.width - 0.5);
        rawY.set((e.clientY - rect.top) / rect.height - 0.5);
        setActive(true);
      }}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
        setActive(false);
      }}
    >
      {children}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] mix-blend-overlay"
          style={{
            background: glareBg,
            opacity: active ? 1 : 0,
          }}
          aria-hidden
        />
      )}
    </motion.div>
  );
}
