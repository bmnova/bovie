"use client";

import { motion } from "framer-motion";
import { blurIn, fadeInUp, staggerContainer, staggerContainerFast } from "@websites/shared/animations";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function Services() {
  const { locale } = useLocale();
  const { services } = contentMap[locale];

  return (
    <section id="services" className="px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          key={locale}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent"
          >
            {services.eyebrow}
          </motion.p>
          <motion.h2
            variants={blurIn}
            className="mb-16 text-4xl font-bold tracking-tight text-primary md:text-5xl"
          >
            {services.heading}
          </motion.h2>

          <motion.div
            variants={staggerContainerFast}
            className="grid gap-6 md:grid-cols-3"
          >
            {services.items.map((service) => (
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
