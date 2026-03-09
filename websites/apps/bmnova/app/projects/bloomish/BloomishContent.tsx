"use client";

import Link from "next/link";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function BloomishContent() {
  const { locale } = useLocale();
  const { bloomish } = contentMap[locale];

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-20 md:px-12"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, #F43F5E18, transparent)",
        }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-block rounded-full border border-[#F43F5E]/20 bg-[#F43F5E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F43F5E]">
            Mobile · Flutter · AI · Social
          </span>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-primary md:text-6xl">
            Bloomish
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted">
            {bloomish.description}
          </p>
        </div>

        {/* Decorative circle */}
        <div
          className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, #F43F5E10, transparent 70%)",
          }}
        />
      </section>

      {/* How it works flow */}
      <section className="px-6 pb-4 pt-6 md:px-12">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-white px-8 py-6">
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
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#F43F5E]">
            {bloomish.eyebrow}
          </p>
          <h2 className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {bloomish.heading}
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {bloomish.features.map((feature) => (
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

      {/* CTA */}
      <section className="px-6 pb-28 pt-4 text-center md:px-12">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            {bloomish.ctaHeading}
          </h2>
          <p className="mb-8 text-muted">{bloomish.ctaSub}</p>
          <Link
            href="/#contact"
            className="inline-flex rounded-full bg-[#F43F5E] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#F43F5E]/25 transition-all hover:opacity-90"
          >
            {bloomish.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
