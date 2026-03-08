"use client";

import Link from "next/link";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function DietPalContent() {
  const { locale } = useLocale();
  const { dietpal } = contentMap[locale];

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-20 md:px-12"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, #10B98118, transparent)",
        }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-block rounded-full border border-[#10B981]/20 bg-[#10B981]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#10B981]">
            Mobile · Flutter · AI
          </span>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-primary md:text-6xl">
            DietPal
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted">
            {dietpal.description}
          </p>
        </div>

        {/* Decorative circle */}
        <div
          className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, #10B98110, transparent 70%)",
          }}
        />
      </section>

      {/* App demo */}
      <section className="px-6 pt-4 md:px-12">
        <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-border shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/dietmate.gif"
            alt={dietpal.demoAlt}
            className="w-full"
            loading="lazy"
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#10B981]">
            {dietpal.eyebrow}
          </p>
          <h2 className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {dietpal.heading}
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {dietpal.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-white p-7"
              >
                <span className="mb-4 block text-3xl">{feature.icon}</span>
                <h3 className="mb-2 text-lg font-bold text-primary">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-28 pt-4 text-center md:px-12">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-2xl font-bold text-primary">{dietpal.ctaHeading}</h2>
          <p className="mb-8 text-muted">{dietpal.ctaSub}</p>
          <Link
            href="/#contact"
            className="inline-flex rounded-full bg-[#10B981] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#10B981]/25 transition-all hover:opacity-90"
          >
            {dietpal.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
