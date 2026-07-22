"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCanHover, usePrefersReducedMotion } from "./usePrefersReducedMotion";

type MagneticCTAProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
  as?: "div" | "span";
};

export function MagneticCTA({
  children,
  className = "",
  strength = 0.35,
  style,
  as = "div",
}: MagneticCTAProps) {
  const reduced = usePrefersReducedMotion();
  const canHover = useCanHover();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const Comp = as === "span" ? motion.span : motion.div;

  if (reduced || !canHover) {
    return as === "span" ? (
      <span className={className} style={style}>
        {children}
      </span>
    ) : (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <Comp
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x: springX, y: springY, ...style }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * strength);
        y.set(dy * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </Comp>
  );
}
