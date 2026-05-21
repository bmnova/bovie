"use client";

import Link from "next/link";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { StoreBadges } from "@/components/StoreBadges";
import { storeLinks } from "@/config/store-links";

export function FitVibeContent() {
  const { locale } = useLocale();
  const { fitvibe } = contentMap[locale];

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-20 md:px-12"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, #F9731618, transparent)",
        }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-block rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F97316]">
            Mobile · Flutter · AI · Fashion
          </span>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-primary md:text-6xl">
            FitVibe
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted">
            {fitvibe.description}
          </p>
          <StoreBadges
            className="mt-10"
            googlePlayUrl={storeLinks.fitvibe.googlePlay}
            appStoreUrl={storeLinks.fitvibe.appStore}
          />
        </div>

        <div
          className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, #F9731610, transparent 70%)",
          }}
        />
      </section>

      {/* App demo */}
      <section className="px-6 pt-4 md:px-12">
        <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-border shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/fitvibe.png"
            alt={fitvibe.demoAlt}
            className="w-full"
            loading="lazy"
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#F97316]">
            {fitvibe.eyebrow}
          </p>
          <h2 className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {fitvibe.heading}
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {fitvibe.features.map((feature) => (
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
            {fitvibe.ctaHeading}
          </h2>
          <p className="mb-8 text-muted">{fitvibe.ctaSub}</p>
          <StoreBadges
            className="mb-8"
            googlePlayUrl={storeLinks.fitvibe.googlePlay}
            appStoreUrl={storeLinks.fitvibe.appStore}
          />
          <Link
            href="/#contact"
            className="inline-flex rounded-full bg-[#F97316] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#F97316]/25 transition-all hover:opacity-90"
          >
            {fitvibe.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
