"use client";

import { motion } from "framer-motion";
import { nav } from "@/content";

export function Navbar() {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
      style={{
        background:
          "linear-gradient(to bottom, rgba(10,10,15,0.9), transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="font-mono text-lg font-bold tracking-tight text-primary">
        int<span className="text-accent">yx</span>
      </span>

      <nav className="hidden items-center gap-8 md:flex">
        {nav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="https://intyx.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
      >
        Try free
      </a>
    </motion.header>
  );
}
