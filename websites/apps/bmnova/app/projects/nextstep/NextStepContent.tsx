"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  staggerContainerFast,
} from "@websites/shared/animations";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { ProjectPageShell } from "@/components/ProjectPageShell";
import { usePrefersReducedMotion } from "@/components/motion";

export function NextStepContent() {
  const { locale } = useLocale();
  const { nextstep } = contentMap[locale];
  const reduced = usePrefersReducedMotion();
  const accent = "#6366F1";

  return (
    <ProjectPageShell
      accent={accent}
      badge="Mobile · Flutter · AI"
      title="NextStep"
      description={nextstep.description}
      demo={{
        src: "/projects/nextstep-hero.jpg",
        alt: "NextStep — from confusion to clarity",
        maxWidth: "5xl",
        imgClassName: "w-full object-cover",
      }}
      afterDemo={
        <section className="px-6 pb-4 pt-6 md:px-12">
          <motion.div
            className="mx-auto max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-white px-8 py-6"
            >
              {(["Reflection", "One Question", "Next Step"] as const).map(
                (step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#6366F1]">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {step}
                      </div>
                    </div>
                    {i < 2 && (
                      <span className="text-lg text-muted opacity-40">→</span>
                    )}
                  </div>
                ),
              )}
            </motion.div>
          </motion.div>
        </section>
      }
      featuresEyebrow={nextstep.eyebrow}
      featuresHeading={nextstep.heading}
      features={nextstep.features}
      afterFeatures={
        <>
          <section className="px-6 pb-20 md:px-12">
            <div className="mx-auto max-w-5xl">
              <motion.div
                key={locale}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <motion.p
                  variants={fadeInUp}
                  className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6366F1]"
                >
                  {nextstep.coachesEyebrow}
                </motion.p>
                <motion.h2
                  variants={fadeInUp}
                  className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl"
                >
                  {nextstep.coachesHeading}
                </motion.h2>

                <motion.div
                  variants={staggerContainerFast}
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                  {nextstep.coaches.map((coach) => (
                    <motion.div
                      key={coach.name}
                      variants={fadeInUp}
                      whileHover={
                        reduced
                          ? undefined
                          : {
                              y: -4,
                              borderColor: `${accent}55`,
                              boxShadow: `0 12px 40px ${accent}18`,
                            }
                      }
                      className="flex flex-col justify-between rounded-2xl border border-border bg-white p-6"
                    >
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="font-bold text-primary">{coach.name}</h3>
                          {coach.pro && (
                            <span className="rounded-full bg-[#6366F1]/10 px-2.5 py-0.5 text-xs font-semibold text-[#6366F1]">
                              {nextstep.proLabel}
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed text-muted">
                          {coach.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="px-6 pb-20 md:px-12">
            <div className="mx-auto max-w-5xl">
              <motion.div
                key={`${locale}-tiers`}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <motion.p
                  variants={fadeInUp}
                  className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6366F1]"
                >
                  {nextstep.tiersEyebrow}
                </motion.p>
                <motion.h2
                  variants={fadeInUp}
                  className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl"
                >
                  {nextstep.tiersHeading}
                </motion.h2>

                <motion.div
                  variants={staggerContainerFast}
                  className="grid gap-6 md:grid-cols-2"
                >
                  <motion.div
                    variants={fadeInUp}
                    className="rounded-2xl border border-border bg-white p-8"
                  >
                    <p className="mb-6 text-lg font-bold text-primary">
                      {nextstep.freeTier.name}
                    </p>
                    <ul className="space-y-3">
                      {nextstep.freeTier.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-muted"
                        >
                          <span className="mt-0.5 text-[#6366F1]">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="rounded-2xl border border-[#6366F1]/20 p-8"
                    style={{
                      background:
                        "radial-gradient(ellipse 120% 80% at 50% -20%, #6366F110, transparent)",
                    }}
                  >
                    <p className="mb-6 text-lg font-bold text-primary">
                      {nextstep.proTier.name}
                    </p>
                    <ul className="space-y-3">
                      {nextstep.proTier.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-muted"
                        >
                          <span className="mt-0.5 text-[#6366F1]">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </>
      }
      ctaHeading={nextstep.ctaHeading}
      ctaSub={nextstep.ctaSub}
      ctaButton={nextstep.ctaButton}
    />
  );
}
