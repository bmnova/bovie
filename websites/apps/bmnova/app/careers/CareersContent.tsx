"use client";

import Link from "next/link";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function CareersContent() {
  const { locale } = useLocale();
  const { careers } = contentMap[locale];
  const { opening } = careers;

  return (
    <main className="min-h-screen bg-surface px-6 py-28 md:px-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          {careers.back}
        </Link>

        <h1 className="mb-2 text-4xl font-bold tracking-tight text-primary">
          {careers.title}
        </h1>
        <p className="mb-16 text-lg text-muted">{careers.subtitle}</p>

        <div className="space-y-12">
          <div className="rounded-2xl border border-border bg-white p-8">
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
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {opening.apply}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
