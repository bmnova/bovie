"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function About() {
  const { locale } = useLocale();
  const { about } = contentMap[locale];

  return (
    <section id="about" className="bg-primary px-6 py-28 md:px-12">
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
            {about.eyebrow}
          </motion.p>

          {/* Two-column: text left, stack right */}
          <div className="mb-20 grid gap-12 md:grid-cols-[1fr_auto]">
            <div>
              <motion.h2
                variants={fadeInUp}
                className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl"
              >
                {about.heading}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="max-w-xl text-lg leading-relaxed text-white/60"
              >
                {about.body}
              </motion.p>
            </div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col justify-center gap-6 md:min-w-[200px]"
            >
              {about.stack.map((item) => (
                <div key={item.label}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/30">
                    {item.label}
                  </p>
                  <p className="text-sm text-white/70">{item.items}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Team */}
          <motion.div variants={fadeInUp}>
            <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-white/40">
              {about.teamLabel}
            </p>
            <div className="flex flex-wrap gap-8">
              {about.team.map((member) => (
                <div key={member.name} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{member.name}</p>
                    <p className="mb-2 text-xs text-white/40">{member.role}</p>
                    {member.background && (
                      <div className="mb-2 flex flex-col gap-0.5">
                        {member.background.map((bg) => (
                          <p key={bg.place} className="text-xs text-white/30">
                            {bg.place} · {bg.years}
                          </p>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3">
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                          X
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
