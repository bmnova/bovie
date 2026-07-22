"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { ProjectPageShell } from "@/components/ProjectPageShell";

export function BloomishContent() {
  const { locale } = useLocale();
  const { bloomish } = contentMap[locale];

  return (
    <ProjectPageShell
      accent="#F43F5E"
      badge="Mobile · Flutter · AI · Social"
      title="Bloomish"
      description={bloomish.description}
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
              {(["Describe", "Generate", "Send"] as const).map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#F43F5E]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="text-sm font-medium text-primary">{step}</div>
                  </div>
                  {i < 2 && (
                    <span className="text-lg text-muted opacity-40">→</span>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      }
      featuresEyebrow={bloomish.eyebrow}
      featuresHeading={bloomish.heading}
      features={bloomish.features}
      ctaHeading={bloomish.ctaHeading}
      ctaSub={bloomish.ctaSub}
      ctaButton={bloomish.ctaButton}
    />
  );
}
