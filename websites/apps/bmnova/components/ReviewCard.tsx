"use client";

import { contentMap } from "@/content";
import { APPS, type Review } from "@/content/apps";
import { useLocale } from "@/app/locale-context";

/** A store review in the page's language; translations are labelled as such. */
export function ReviewCard({ review, showApp = true }: { review: Review; showApp?: boolean }) {
  const { locale } = useLocale();
  const { reviews } = contentMap[locale];
  const app = APPS[review.app];
  const translated = review.original !== locale;
  const title = review.title?.[locale];

  return (
    <figure className="flex w-[300px] shrink-0 flex-col gap-3 rounded-[22px] border border-border bg-card p-[22px] transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:-rotate-[0.6deg] hover:border-white/30 sm:w-[320px]">
      <div className="flex items-center justify-between gap-3">
        {showApp ? (
          <span
            className="inline-flex h-[26px] items-center rounded-full px-2.5 text-[11px] font-extrabold text-surface"
            style={{ background: app.color }}
          >
            {app.name}
          </span>
        ) : (
          <span />
        )}
        <span className="text-[13px] tracking-[2px] text-app-offer" aria-label={reviews.stars}>
          ★★★★★
        </span>
      </div>
      <blockquote className="flex flex-col gap-1.5 text-[15px] leading-normal text-primary">
        {title && <p className="font-semibold">{title}</p>}
        <p>“{review.text[locale]}”</p>
      </blockquote>
      <figcaption className="mt-auto text-xs text-dim">
        {review.author} · {reviews.source[review.source]}
        {translated && ` · ${reviews.translated}`}
      </figcaption>
    </figure>
  );
}
