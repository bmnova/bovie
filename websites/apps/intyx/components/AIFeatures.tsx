"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@websites/shared/animations";
import { features } from "@/content";

export function AIFeatures() {
  return (
    <section id="features" className="relative px-6 py-28 md:px-12">
      {/* Section glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent"
          >
            Capabilities
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-4xl font-bold tracking-tight text-primary md:text-5xl"
          >
            Built for intelligence.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mb-16 max-w-xl text-lg text-muted"
          >
            Every feature is designed to make AI feel effortless — for your data and your UI.
          </motion.p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                className="group rounded-2xl border border-border bg-surface-2 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-surface-3"
              >
                <span className="mb-4 block text-2xl">{feature.icon}</span>
                <h3 className="mb-2 text-base font-semibold text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
