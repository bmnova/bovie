"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { mobile } from "@/content";

export function MobileApps() {
  return (
    <section id="mobile" className="relative px-6 py-28 md:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent"
          >
            {mobile.heading}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-4xl font-bold tracking-tight text-primary md:text-5xl"
          >
            {mobile.sub}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mb-12 max-w-lg text-lg text-muted"
          >
            {mobile.placeholder}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4"
          >
            {["iOS", "Android", "Flutter"].map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-semibold text-muted"
              >
                {platform}
              </span>
            ))}
          </motion.div>

          {/* Placeholder phone mockup */}
          <motion.div
            variants={fadeInUp}
            className="mt-16"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative mx-auto h-96 w-48 rounded-[2.5rem] border-2 border-border bg-surface-2 p-2 shadow-2xl shadow-glow/10">
              <div className="absolute inset-x-0 top-3 mx-auto h-1 w-16 rounded-full bg-border" />
              <div className="h-full w-full rounded-[2rem] bg-surface-3 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-3 text-3xl">📱</div>
                  <p className="text-xs text-muted">Coming soon</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
