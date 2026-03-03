"use client";

import { motion } from "framer-motion";
import { scaleIn } from "../animations/variants";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function Card({ children, className = "", href }: CardProps) {
  const inner = (
    <motion.div
      variants={scaleIn}
      className={`rounded-2xl border border-current/10 bg-surface/50 p-6 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl ${className}`}
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return inner;
}
