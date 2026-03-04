"use client";

import { motion } from "framer-motion";
import { blurIn, fadeInUp, staggerContainer } from "@websites/shared/animations";
import { hero } from "@/content";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />

      {/* Animated orbs */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-glow/20 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-accent/15 blur-[80px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Grid dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp}>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {hero.badge}
          </span>
        </motion.div>

        <motion.h1
          variants={blurIn}
          className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-primary md:text-7xl lg:text-8xl"
          style={{ whiteSpace: "pre-line" }}
        >
          {hero.heading}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={hero.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-glow/30 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-glow/40"
          >
            {hero.cta.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent/20 px-8 py-3.5 text-sm font-semibold text-accent transition-all hover:bg-accent/10"
          >
            {hero.ctaSecondary.label}
          </a>
        </motion.div>

        {/* Floating UI preview */}
        <motion.div
          variants={fadeInUp}
          className="mx-auto mt-20 max-w-2xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="rounded-2xl border border-border bg-surface-2 p-1 shadow-2xl shadow-glow/10">
            <div className="rounded-xl bg-surface-3 p-6">
              {/* Fake dashboard preview */}
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-muted">intyx.ai — dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {["Total Views", "AI Score", "Growth"].map((label, i) => (
                  <div key={label} className="rounded-lg bg-surface p-3">
                    <p className="text-xs text-muted mb-1">{label}</p>
                    <p className="text-lg font-bold text-primary">
                      {["248K", "94%", "+32%"][i]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="h-24 rounded-lg bg-surface flex items-end gap-1 p-3 overflow-hidden">
                {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-accent/40"
                    style={{ height: `${h}%`, opacity: 0.4 + i * 0.05 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
