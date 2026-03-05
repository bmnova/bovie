"use client";

import { motion } from "framer-motion";
import { blurIn, fadeInUp, staggerContainer, staggerContainerFast } from "@websites/shared/animations";
import { services } from "@/content";

export function Services() {
  return (
    <section id="services" className="px-6 py-28 md:px-12">
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
            What We Do
          </motion.p>
          <motion.h2
            variants={blurIn}
            className="mb-16 text-4xl font-bold tracking-tight text-primary md:text-5xl"
          >
            Our Services
          </motion.h2>

          <motion.div
            variants={staggerContainerFast}
            className="grid gap-6 md:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="rounded-2xl border border-border bg-surface p-8"
              >
                <span className="mb-5 block text-4xl">{service.icon}</span>
                <h3 className="mb-3 text-lg font-bold text-primary">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
