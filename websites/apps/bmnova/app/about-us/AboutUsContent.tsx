"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function AboutUsContent() {
  const { locale } = useLocale();
  const { aboutUs, about } = contentMap[locale];

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="px-6 pb-16 pt-8 md:px-12">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeInUp}
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent"
            >
              {aboutUs.eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="mb-16 text-5xl font-bold tracking-tight text-primary md:text-6xl"
            >
              {aboutUs.heading}
            </motion.h1>

            {/* Vision & Mission */}
            <motion.div
              variants={fadeInUp}
              className="mb-20 grid gap-6 md:grid-cols-2"
            >
              <div className="rounded-2xl border border-border bg-white p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                  {aboutUs.vision.label}
                </p>
                <p className="text-base leading-relaxed text-muted">
                  {aboutUs.vision.text}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                  {aboutUs.mission.label}
                </p>
                <p className="text-base leading-relaxed text-muted">
                  {aboutUs.mission.text}
                </p>
              </div>
            </motion.div>

            {/* Team */}
            <motion.div variants={fadeInUp} className="mb-20">
              <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted">
                {aboutUs.teamLabel}
              </p>
              <div className="flex flex-wrap gap-8">
                {about.team.map((member) => (
                  <div key={member.name} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {member.name}
                      </p>
                      <p className="mb-2 text-xs text-muted">{member.role}</p>
                      {member.background && (
                        <div className="mb-2 flex flex-col gap-0.5">
                          {member.background.map((bg) => (
                            <p key={bg.place} className="text-xs text-muted/60">
                              {bg.place} · {bg.years}
                            </p>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-3">
                        {member.twitter && (
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted/60 transition-colors hover:text-accent"
                          >
                            X
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted/60 transition-colors hover:text-accent"
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Strategic Partnerships */}
            <motion.div variants={fadeInUp}>
              <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">
                {aboutUs.partnershipsLabel}
              </p>
              <div className="flex flex-wrap gap-4">
                {contentMap[locale].partnerships.items.map((partner) =>
                  partner.href ? (
                    <a
                      key={partner.name}
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-border bg-white px-6 py-4 text-sm font-semibold text-primary transition-all hover:border-accent/30 hover:text-accent"
                    >
                      {partner.name}
                    </a>
                  ) : (
                    <span
                      key={partner.name}
                      className="rounded-xl border border-border bg-white px-6 py-4 text-sm font-semibold text-primary"
                    >
                      {partner.name}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
