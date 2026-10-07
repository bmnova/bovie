"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/app/locale-context";
import { APPS } from "@/content/apps";
import { Chip } from "@/components/apps/AppPage";

const COLOR = APPS.roompace.color;
const STYLES = ["modern", "cozy", "bohemian"] as const;
const BUDGETS = [0, 1, 2] as const;
type Style = (typeof STYLES)[number];
type Budget = (typeof BUDGETS)[number];

const copy = {
  en: {
    style: "Style",
    budget: "Budget",
    styles: { modern: "Modern", cozy: "Cozy", bohemian: "Bohemian" },
    budgets: ["$ · light touch", "$$ · about $200", "$$$ · full refresh"],
    showBefore: "Show before",
    before: "Before · your photo",
    after: (style: string) => `After · ${style}`,
    original: "Original room",
    wishlist: "Wishlist preview",
    items: ["Linen throw · ~$38", "Cushion pair · ~$32"],
    alt: (label: string) => `The room: ${label}`,
  },
  tr: {
    style: "Tarz",
    budget: "Bütçe",
    styles: { modern: "Modern", cozy: "Sıcak", bohemian: "Bohem" },
    budgets: ["$ · hafif dokunuş", "$$ · yaklaşık 200 $", "$$$ · tam yenileme"],
    showBefore: "Öncesini göster",
    before: "Önce · senin fotoğrafın",
    after: (style: string) => `Sonra · ${style}`,
    original: "Orijinal oda",
    wishlist: "Alışveriş listesi önizlemesi",
    items: ["Keten şal · ~38 $", "Yastık çifti · ~32 $"],
    alt: (label: string) => `Oda: ${label}`,
  },
};

/** The hero itself is the demo: style × budget on a real room, with before and after. */
export function RoomPaceHeroVisual() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [style, setStyle] = useState<Style>("modern");
  const [budget, setBudget] = useState<Budget>(1);
  const [before, setBefore] = useState(false);
  const label = before ? t.before : t.after(t.styles[style]);
  const src = (s: Style, b: Budget) => `/apps/roompace/${s}-${b}.webp`;
  const label2 = "w-[60px] text-[11px] font-semibold uppercase tracking-[.12em] text-dim";

  return (
    <div className="relative z-[2] flex w-full max-w-[560px] flex-col gap-3.5 rounded-[28px] border border-white/10 bg-card p-4 shadow-[0_50px_100px_rgba(0,0,0,.6)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-[#EFEBE4]">
        <Image src="/apps/roompace/before.webp" alt={t.alt(t.before)} fill priority sizes="(min-width: 900px) 540px, 100vw" className="object-cover object-[center_60%]" />
        {STYLES.flatMap((s) =>
          BUDGETS.map((b) => {
            const on = !before && s === style && b === budget;
            return (
              <Image
                key={`${s}-${b}`}
                src={src(s, b)}
                alt={on ? t.alt(label) : ""}
                fill
                sizes="(min-width: 900px) 540px, 100vw"
                className="object-cover object-[center_60%] transition-opacity duration-500"
                style={{ opacity: on ? 1 : 0 }}
              />
            );
          })
        )}
        <span className="absolute left-3.5 top-3.5 rounded-xl bg-surface/80 px-3 py-2 text-xs font-bold uppercase tracking-[.08em]">{label}</span>
        <span className="absolute bottom-3.5 right-3.5 rounded-xl bg-app-roompace px-3 py-2 text-[13px] font-extrabold text-surface">
          {before ? t.original : t.budgets[budget]}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={label2}>{t.style}</span>
        {STYLES.map((s) => (
          <Chip key={s} on={!before && style === s} color={COLOR} onClick={() => { setStyle(s); setBefore(false); }} className="min-h-[38px]">
            {t.styles[s]}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={label2}>{t.budget}</span>
        {BUDGETS.map((b) => (
          <Chip key={b} on={!before && budget === b} color={COLOR} onClick={() => { setBudget(b); setBefore(false); }} className="min-h-[38px]">
            {t.budgets[b]}
          </Chip>
        ))}
        <button
          type="button"
          onClick={() => setBefore((v) => !v)}
          aria-pressed={before}
          className="ml-auto inline-flex min-h-[38px] items-center rounded-full border border-dashed border-white/30 px-3.5 text-[13px] font-semibold transition-colors"
          style={before ? { background: "#F3F2FA", color: "#0B0B12" } : undefined}
        >
          {t.showBefore}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-border pt-2.5 text-[13px] text-muted">
        <span className="font-semibold text-primary">{t.wishlist}</span>
        {t.items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
