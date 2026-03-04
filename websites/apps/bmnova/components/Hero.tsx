"use client";

import { motion } from "framer-motion";
import { blurIn, fadeInUp, staggerContainer } from "@websites/shared/animations";
import { hero } from "@/content";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-gradient px-6">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp}>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            AI · Mobile · SaaS
          </span>
        </motion.div>

        <motion.h1
          variants={blurIn}
          className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-primary md:text-7xl"
          style={{ whiteSpace: "pre-line" }}
        >
          {hero.tagline}
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
            className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-accent/30"
          >
            {hero.cta.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="rounded-full border border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:border-accent hover:text-accent"
          >
            {hero.ctaSecondary.label}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="h-10 w-6 rounded-full border-2 border-muted/30 flex items-start justify-center pt-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-2 w-0.5 rounded-full bg-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
