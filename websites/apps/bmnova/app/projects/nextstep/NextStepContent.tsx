"use client";

import Link from "next/link";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function NextStepContent() {
  const { locale } = useLocale();
  const { nextstep } = contentMap[locale];

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-20 md:px-12"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, #6366F118, transparent)",
        }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-block rounded-full border border-[#6366F1]/20 bg-[#6366F1]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#6366F1]">
            Mobile · Flutter · AI
          </span>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-primary md:text-6xl">
            NextStep
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted">
            {nextstep.description}
          </p>
        </div>

        {/* Decorative circle */}
        <div
          className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, #6366F110, transparent 70%)",
          }}
        />
      </section>

      {/* Hero banner */}
      <section className="px-6 pt-4 md:px-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/nextstep-hero.jpg"
            alt="NextStep — from confusion to clarity"
            className="w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Core loop visualization */}
      <section className="px-6 pb-4 pt-6 md:px-12">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-white px-8 py-6">
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
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6366F1]">
            {nextstep.eyebrow}
          </p>
          <h2 className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {nextstep.heading}
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {nextstep.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-white p-7"
              >
                <span className="mb-4 block text-3xl">{feature.icon}</span>
                <h3 className="mb-2 text-lg font-bold text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6366F1]">
            {nextstep.coachesEyebrow}
          </p>
          <h2 className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {nextstep.coachesHeading}
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {nextstep.coaches.map((coach) => (
              <div
                key={coach.name}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Pro */}
      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6366F1]">
            {nextstep.tiersEyebrow}
          </p>
          <h2 className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {nextstep.tiersHeading}
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Free */}
            <div className="rounded-2xl border border-border bg-white p-8">
              <p className="mb-6 text-lg font-bold text-primary">
                {nextstep.freeTier.name}
              </p>
              <ul className="space-y-3">
                {nextstep.freeTier.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 text-[#6366F1]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div
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
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 text-[#6366F1]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-28 pt-4 text-center md:px-12">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            {nextstep.ctaHeading}
          </h2>
          <p className="mb-8 text-muted">{nextstep.ctaSub}</p>
          <Link
            href="/#contact"
            className="inline-flex rounded-full bg-[#6366F1] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6366F1]/25 transition-all hover:opacity-90"
          >
            {nextstep.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
