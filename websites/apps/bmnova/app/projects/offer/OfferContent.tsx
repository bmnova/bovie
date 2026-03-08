"use client";

import Link from "next/link";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function OfferContent() {
  const { locale } = useLocale();
  const { offer } = contentMap[locale];

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-20 md:px-12"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, #F59E0B18, transparent)",
        }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-block rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">
            Mobile · Flutter · Social
          </span>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-primary md:text-6xl">
            Offer
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted">
            {offer.description}
          </p>
        </div>

        {/* Decorative circle */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, #F59E0B10, transparent 70%)",
          }}
        />
      </section>

      {/* Features */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">
            {offer.eyebrow}
          </p>
          <h2 className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {offer.heading}
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {offer.features.map((feature) => (
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
          <h2 className="mb-4 text-2xl font-bold text-primary">{offer.ctaHeading}</h2>
          <p className="mb-8 text-muted">{offer.ctaSub}</p>
          <Link
            href="/#contact"
            className="inline-flex rounded-full bg-[#F59E0B] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#F59E0B]/25 transition-all hover:opacity-90"
          >
            {offer.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
