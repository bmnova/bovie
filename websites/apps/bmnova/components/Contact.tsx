"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { contact } from "@/content";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-28 md:px-12">
      <div className="mx-auto max-w-3xl text-center">
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
            Contact
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-4xl font-bold tracking-tight text-primary md:text-5xl"
          >
            {contact.heading}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mb-10 text-lg text-muted">
            {contact.sub}
          </motion.p>

          <motion.a
            variants={fadeInUp}
            href={`mailto:${contact.email}`}
            className="mb-12 inline-block text-2xl font-bold text-accent underline decoration-accent/30 underline-offset-4 transition-all hover:decoration-accent md:text-3xl"
          >
            {contact.email}
          </motion.a>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {contact.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted transition-all hover:border-accent hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
