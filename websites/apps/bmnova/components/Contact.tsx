"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function Contact() {
  const { locale } = useLocale();
  const { contact } = contentMap[locale];

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
            {contact.eyebrow}
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

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-border"
      >
        <iframe
          src="https://maps.google.com/maps?q=OSTİM+OSB+MAH.+CEVAT+DÜNDAR+CAD.+NO:1,+Yenimahalle,+Ankara,+Turkey&output=embed&hl=tr"
          width="100%"
          height="320"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="BM Nova Location"
        />
        <div className="px-6 py-4 text-center text-sm text-muted">
          OSTİM OSB MAH. CEVAT DÜNDAR CAD. NO: 1/1 İÇ KAPI NO: 10 — YENİMAHALLE / ANKARA{" "}
          <span className="font-medium text-primary">Turuncu Bina</span>
        </div>
      </motion.div>
    </section>
  );
}
