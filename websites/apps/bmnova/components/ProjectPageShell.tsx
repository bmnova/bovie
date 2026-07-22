"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  staggerContainerFast,
} from "@websites/shared/animations";
import {
  MagneticCTA,
  MouseGlow,
  SplitWords,
  TiltCard,
  usePrefersReducedMotion,
} from "@/components/motion";

export type ProjectFeature = {
  icon: string;
  title: string;
  description: string;
};

type ProjectPageShellProps = {
  accent: string;
  badge: string;
  title: string;
  description: string;
  heroExtras?: ReactNode;
  demo?: {
    src: string;
    alt: string;
    maxWidth?: "sm" | "5xl";
    imgClassName?: string;
  };
  afterDemo?: ReactNode;
  featuresEyebrow: string;
  featuresHeading: string;
  features: ProjectFeature[];
  afterFeatures?: ReactNode;
  ctaHeading: string;
  ctaSub: string;
  ctaButton: string;
  ctaExtras?: ReactNode;
};

export function ProjectPageShell({
  accent,
  badge,
  title,
  description,
  heroExtras,
  demo,
  afterDemo,
  featuresEyebrow,
  featuresHeading,
  features,
  afterFeatures,
  ctaHeading,
  ctaSub,
  ctaButton,
  ctaExtras,
}: ProjectPageShellProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-20 md:px-12"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${accent}18, transparent)`,
        }}
      >
        <MouseGlow color={accent} size={520} opacity={0.16} />

        <motion.div
          className="relative z-10 mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-5 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              borderColor: `${accent}33`,
              background: `${accent}1A`,
              color: accent,
            }}
          >
            {badge}
          </motion.span>

          <SplitWords
            text={title}
            className="mb-6 text-5xl font-bold tracking-tight text-primary md:text-6xl"
          />

          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-xl leading-relaxed text-muted"
          >
            {description}
          </motion.p>

          {heroExtras && (
            <motion.div variants={fadeInUp} className="mt-10">
              {heroExtras}
            </motion.div>
          )}
        </motion.div>

        <div
          className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${accent}10, transparent 70%)`,
          }}
        />
      </section>

      {/* Demo */}
      {demo && (
        <section className="px-6 pt-4 md:px-12">
          <motion.div
            className={`mx-auto ${demo.maxWidth === "5xl" ? "max-w-5xl" : "max-w-sm"}`}
            initial={reduced ? false : { opacity: 0, y: 36, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard
              maxTilt={8}
              className="overflow-hidden rounded-2xl border border-border shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={demo.src}
                alt={demo.alt}
                className={demo.imgClassName ?? "w-full"}
                loading="lazy"
              />
            </TiltCard>
          </motion.div>
        </section>
      )}

      {afterDemo}

      {/* Features */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeInUp}
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: accent }}
            >
              {featuresEyebrow}
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl"
            >
              {featuresHeading}
            </motion.h2>

            <motion.div
              variants={staggerContainerFast}
              className="grid gap-8 md:grid-cols-2"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
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
                  className="rounded-2xl border border-border bg-white p-7 transition-colors"
                >
                  <span className="mb-4 block text-3xl">{feature.icon}</span>
                  <h3 className="mb-2 text-lg font-bold text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {afterFeatures}

      {/* CTA */}
      <section className="px-6 pb-28 pt-4 text-center md:px-12">
        <motion.div
          className="mx-auto max-w-xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-2xl font-bold text-primary"
          >
            {ctaHeading}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mb-8 text-muted">
            {ctaSub}
          </motion.p>
          {ctaExtras && (
            <motion.div variants={fadeInUp} className="mb-8">
              {ctaExtras}
            </motion.div>
          )}
          <motion.div variants={fadeInUp}>
            <MagneticCTA>
              <Link
                href="/#contact"
                className="inline-flex rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90"
                style={{
                  background: accent,
                  boxShadow: `0 10px 30px ${accent}40`,
                }}
              >
                {ctaButton}
              </Link>
            </MagneticCTA>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
