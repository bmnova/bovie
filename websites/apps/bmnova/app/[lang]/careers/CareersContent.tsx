"use client";

import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function CareersContent() {
  const { locale } = useLocale();
  const { careers } = contentMap[locale];
  const { opening } = careers;

  return (
    <main className="min-h-screen px-[clamp(20px,4vw,56px)] pb-20 pt-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="hero-in mb-3 font-display text-[clamp(48px,7vw,88px)] font-extrabold text-primary">
          {careers.title}
        </h1>
        <p className="mb-16 text-lg text-muted">{careers.subtitle}</p>

        <div className="space-y-12">
          <div className="reveal rounded-card border border-border bg-card p-8">
            <div className="mb-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                {opening.type}
              </p>
              <h2 className="text-2xl font-bold text-primary">{opening.title}</h2>
            </div>

            <p className="mb-8 text-sm leading-relaxed text-muted">{opening.description}</p>

            <div className="mb-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/40">
                {opening.responsibilitiesLabel}
              </p>
              <ul className="space-y-2">
                {opening.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted">
                    <span className="mt-0.5 text-accent">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/40">
                {opening.niceLabel}
              </p>
              <ul className="space-y-2">
                {opening.nice.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted">
                    <span className="mt-0.5 text-accent">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="mailto:contact@bmnova.com?subject=Mobile App Growth Expert"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-surface transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(218,255,71,.32)]"
            >
              {opening.apply}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
