"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/app/locale-context";
import { PhoneFrame } from "@/components/PhoneFrame";
import { DemoSection } from "@/components/apps/AppPage";

const STYLES = [
  { id: "shonen", name: "Shonen", color: "#FFB224" },
  { id: "seinen", name: "Seinen", color: "#A4A2B8" },
  { id: "shojo", name: "Shojo", color: "#FF9EC4" },
  { id: "cyberpunk", name: "Cyberpunk", color: "#FF3EA5" },
  { id: "noir", name: "Noir", color: "#CFCDE0" },
  { id: "isekai", name: "Isekai", color: "#A855F7" },
] as const;
type Style = (typeof STYLES)[number];

const copy = {
  en: {
    heading: "Pick your visual DNA.",
    note: "The page on the right re-inks itself in the style you pick.",
    page: "page 1",
    chapter: "Chapter 1 · Neon Tokyo",
    line: "“The signal came from the tower. Kai didn't look back.”",
    genres: ["Action", "Fantasy", "Romance"],
    cta: "Generate next page",
    alt: "A generated manga panel: a figure walking toward a neon tower",
  },
  tr: {
    heading: "Görsel DNA'nı seç.",
    note: "Sağdaki sayfa seçtiğin tarzda yeniden mürekkeplenir.",
    page: "sayfa 1",
    chapter: "Bölüm 1 · Neon Tokyo",
    line: "“Sinyal kuleden geldi. Kai arkasına bakmadı.”",
    genres: ["Aksiyon", "Fantastik", "Romantik"],
    cta: "Sonraki sayfayı üret",
    alt: "Üretilmiş bir manga paneli: neon bir kuleye doğru yürüyen biri",
  },
};

function HakiScreen({ style }: { style: Style }) {
  const { locale } = useLocale();
  const t = copy[locale];
  return (
    <div className="flex aspect-[9/19] flex-col bg-[#0E0A14] text-primary">
      <div className="flex items-center justify-between px-5 pb-2.5 pt-6">
        <span className="font-display text-xl font-extrabold">Haki</span>
        <span className="rounded-full bg-app-haki px-2.5 py-1 text-[11px] font-extrabold text-surface">PRO</span>
      </div>
      <div className="relative mx-3.5 aspect-square overflow-hidden rounded-[18px] border border-white/10">
        <Image src="/apps/haki/panel.webp" alt={t.alt} fill sizes="300px" className="object-cover" />
        <div className="pointer-events-none absolute inset-0 opacity-55 mix-blend-color transition-colors duration-700" style={{ background: style.color }} />
        <span className="absolute bottom-3 left-3 rounded-[10px] bg-surface/80 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[.08em]">
          {style.name} · {t.page}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-[18px] pt-3.5">
        <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-app-haki">{t.chapter}</span>
        <span className="text-sm font-medium leading-snug">{t.line}</span>
      </div>
      <div className="mt-auto flex flex-col gap-2.5 px-[18px] pb-[22px] pt-3.5">
        <div className="flex gap-1.5 overflow-hidden">
          {t.genres.map((g) => (
            <span key={g} className="inline-flex h-7 items-center whitespace-nowrap rounded-full bg-white/[.08] px-2.5 text-[11px] font-semibold">
              {g}
            </span>
          ))}
        </div>
        <span className="inline-flex h-11 items-center justify-center rounded-[14px] bg-app-haki text-sm font-extrabold text-surface">{t.cta}</span>
      </div>
    </div>
  );
}

export function HakiHeroVisual() {
  return (
    <PhoneFrame className="relative z-[2] w-[330px] max-w-full animate-floaty" screenClassName="bg-[#0E0A14]">
      <Image src="/apps/haki/store-3.webp" alt="Haki: choose your style and write your story" width={415} height={900} priority className="block h-auto w-full" />
    </PhoneFrame>
  );
}

export function HakiDemo() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [style, setStyle] = useState<Style>(STYLES[3]);
  return (
    <DemoSection slug="haki" heading={t.heading} note={t.note}>
      <div className="flex flex-wrap items-center gap-10">
        <div className="grid min-w-0 flex-[1_1_420px] grid-cols-2 gap-3 sm:grid-cols-3">
          {STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStyle(s)}
              aria-pressed={style.id === s.id}
              className="flex h-[120px] items-end rounded-[18px] border-2 p-4 font-display text-xl font-extrabold tracking-[-0.02em] text-surface transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              style={{ background: s.color, borderColor: style.id === s.id ? "#F3F2FA" : "transparent" }}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="flex min-w-0 flex-[1_1_280px] justify-center">
          <div className="w-[300px] max-w-full overflow-hidden rounded-[46px] border-[10px] border-[#1C1C28] shadow-[0_40px_80px_rgba(0,0,0,.5)]">
            <HakiScreen style={style} />
          </div>
        </div>
      </div>
    </DemoSection>
  );
}
