"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function Partnerships() {
  const { locale } = useLocale();
  const { partnerships } = contentMap[locale];

  return (
    <section className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent"
          >
            {partnerships.eyebrow}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4"
          >
            {partnerships.items.map((partner) =>
              partner.href ? (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-primary transition-all hover:border-accent/30 hover:text-accent"
                >
                  {partner.name}
                </a>
              ) : (
                <span
                  key={partner.name}
                  className="rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-primary"
                >
                  {partner.name}
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
