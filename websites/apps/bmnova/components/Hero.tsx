"use client";

import { motion } from "framer-motion";
import { blurIn, fadeInUp, staggerContainer } from "@websites/shared/animations";
import { Squiggle } from "@websites/shared/assets";
import { hero } from "@/content";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-gradient px-6">
      {/* Organic animated blob 1 */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px]"
        style={{
          background: "radial-gradient(ellipse at center, #6366F118, transparent 70%)",
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          filter: "blur(70px)",
        }}
        animate={{
          borderRadius: [
            "60% 40% 70% 30% / 50% 60% 40% 50%",
            "40% 60% 30% 70% / 60% 40% 60% 40%",
            "55% 45% 65% 35% / 45% 55% 45% 55%",
            "60% 40% 70% 30% / 50% 60% 40% 50%",
          ],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Organic animated blob 2 */}
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px]"
        style={{
          background: "radial-gradient(ellipse at center, #818CF812, transparent 70%)",
          borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
          filter: "blur(55px)",
        }}
        animate={{
          borderRadius: [
            "40% 60% 30% 70% / 60% 40% 60% 40%",
            "60% 40% 70% 30% / 50% 60% 40% 50%",
            "35% 65% 55% 45% / 50% 35% 65% 50%",
            "40% 60% 30% 70% / 60% 40% 60% 40%",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #0f172a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-6 text-sm font-medium text-muted"
        >
          Istanbul, Turkey &mdash; indie studio
        </motion.p>

        <motion.h1
          variants={blurIn}
          className="mb-4 text-5xl font-bold leading-[1.1] tracking-tight text-primary md:text-7xl"
          style={{ whiteSpace: "pre-line" }}
        >
          {hero.tagline}
        </motion.h1>

        {/* Hand-drawn accent underline */}
        <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
          <Squiggle className="w-48 opacity-40" color="#6366F1" />
        </motion.div>

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

        {/* Stats strip */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 flex items-center justify-center divide-x divide-muted/20 text-xs"
        >
          <span className="flex items-center gap-1.5 px-5">
            <span className="font-bold text-primary">6</span>
            <span className="text-muted">products shipped</span>
          </span>
          <span className="px-5 font-medium text-muted">Flutter · Next.js · AI</span>
          <span className="flex items-center gap-1.5 px-5">
            <span className="font-bold text-primary">2</span>
            <span className="text-muted">founders</span>
          </span>
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
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted/30 pt-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-2 w-0.5 rounded-full bg-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
