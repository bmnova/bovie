"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type SplitWordsProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  style?: CSSProperties;
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.08 },
  },
};

const word = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function SplitWords({
  text,
  className = "",
  as = "h1",
  style,
}: SplitWordsProps) {
  const reduced = usePrefersReducedMotion();
  const lines = text.split("\n");
  const Comp = motion[as];

  if (reduced) {
    const Static = as;
    return (
      <Static className={className} style={{ whiteSpace: "pre-line", ...style }}>
        {text}
      </Static>
    );
  }

  return (
    <Comp
      className={className}
      style={{ whiteSpace: "pre-line", ...style }}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {lines.map((line, lineIdx) => (
        <span key={`line-${lineIdx}`} className="block" aria-hidden>
          {line.split(/(\s+)/).map((w, i) =>
            /^\s+$/.test(w) || w === "" ? (
              <span key={`s-${lineIdx}-${i}`}>{w || " "}</span>
            ) : (
              <motion.span
                key={`${w}-${lineIdx}-${i}`}
                className="inline-block"
                variants={word}
              >
                {w}
              </motion.span>
            ),
          )}
        </span>
      ))}
    </Comp>
  );
}
