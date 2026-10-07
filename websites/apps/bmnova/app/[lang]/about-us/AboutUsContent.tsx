"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { FounderSocials } from "@/components/FounderSocials";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function AboutUsContent() {
  const { locale } = useLocale();
  const { aboutUs, company, team } = contentMap[locale];

  return (
    <main className="min-h-screen">
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
              className="mb-8 font-display text-[clamp(48px,7vw,88px)] font-extrabold text-primary"
            >
              {aboutUs.heading}
            </motion.h1>

            <motion.p variants={fadeInUp} className="mb-16 max-w-3xl text-lg leading-relaxed text-muted">
              {company.lead}
            </motion.p>

            {/* Vision & Mission */}
            <motion.div
              variants={fadeInUp}
              className="mb-20 grid gap-6 md:grid-cols-2"
            >
              <div className="rounded-card border border-border bg-card p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                  {aboutUs.vision.label}
                </p>
                <p className="text-base leading-relaxed text-muted">
                  {aboutUs.vision.text}
                </p>
              </div>
              <div className="rounded-card border border-border bg-card p-8">
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
                {team.map((member) => (
                  <div key={member.name} className="flex items-start gap-4">
                    {member.photo ? (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={member.photo}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover object-[center_18%]"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                        {member.initials}
                      </div>
                    )}
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
                      <FounderSocials twitter={member.twitter} linkedin={member.linkedin} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
