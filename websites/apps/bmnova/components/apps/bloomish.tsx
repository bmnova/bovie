"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/app/locale-context";
import { APPS } from "@/content/apps";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BouquetArt } from "@/components/apps/BouquetArt";
import { Chip, DemoSection } from "@/components/apps/AppPage";

const COLOR = APPS.bloomish.color;
const MAX_FLOWERS = 3;

/** A few of the flower types in the Bloomish catalogue (assets/flowers/config.json). */
const FLOWERS = {
  rose: "#FF6B8B",
  tulip: "#FF9F7A",
  peony: "#FFB3C1",
  lavender: "#B9A6FF",
  sunflower: "#FFD166",
  daisy: "#FFF3C4",
  lily: "#FFE6F0",
  orchid: "#D98CFF",
} as const;
type Flower = keyof typeof FLOWERS;
type Occasion = "birthday" | "thanks" | "because" | "getwell";

const copy = {
  en: {
    heading: "Build a bouquet. Watch it bloom.",
    note: "In the app, the AI paints the real thing from these choices or from a sentence you type.",
    occasion: "Occasion",
    flowersLabel: `Flowers · pick up to ${MAX_FLOWERS}`,
    occasions: { birthday: "Birthday", thanks: "Thank you", because: "Just because", getwell: "Get well" },
    flowers: { rose: "Rose", tulip: "Tulip", peony: "Peony", lavender: "Lavender", sunflower: "Sunflower", daisy: "Daisy", lily: "Lily", orchid: "Orchid" },
    title: (occasion: string, list: string) => `A ${occasion.toLowerCase()} bouquet of ${list.toLowerCase()}.`,
    and: "and",
    preview: "preview",
    send: "Send as a gift",
    save: "Save",
  },
  tr: {
    heading: "Bir buket kur. Açışını izle.",
    note: "Uygulamada yapay zekâ, bu seçimlerden ya da yazdığın bir cümleden gerçeğini çizer.",
    occasion: "Vesile",
    flowersLabel: `Çiçekler · en fazla ${MAX_FLOWERS}`,
    occasions: { birthday: "Doğum günü", thanks: "Teşekkür", because: "Öylesine", getwell: "Geçmiş olsun" },
    flowers: { rose: "Gül", tulip: "Lale", peony: "Şakayık", lavender: "Lavanta", sunflower: "Ayçiçeği", daisy: "Papatya", lily: "Zambak", orchid: "Orkide" },
    title: (occasion: string, list: string) => `${list} buketi · ${occasion}.`,
    and: "ve",
    preview: "önizleme",
    send: "Hediye olarak gönder",
    save: "Kaydet",
  },
};

function useBouquet() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [occasion, setOccasion] = useState<Occasion>("birthday");
  const [picked, setPicked] = useState<Flower[]>(["rose", "peony", "lavender"]);

  const toggle = (flower: Flower) =>
    setPicked((cur) => {
      if (cur.includes(flower)) return cur.length > 1 ? cur.filter((f) => f !== flower) : cur;
      return [...cur, flower].slice(-MAX_FLOWERS);
    });

  const names = picked.map((f) => t.flowers[f]);
  const list = names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} ${t.and} ${names[names.length - 1]}`;
  return {
    t,
    occasion,
    setOccasion,
    picked,
    toggle,
    colors: picked.map((f) => FLOWERS[f]),
    title: t.title(t.occasions[occasion], list),
  };
}

function BloomishScreen({ colors, title, occasion }: { colors: string[]; title: string; occasion: string }) {
  const { locale } = useLocale();
  const t = copy[locale];
  return (
    <div className="relative flex aspect-[9/19] flex-col gap-3 bg-[#FFF6F8] px-[18px] pb-[18px] pt-6 text-[#2A1018]">
      <Image src="/apps/bloomish/splash.webp" alt="" fill sizes="330px" className="object-cover opacity-55" />
      <div className="relative flex items-center justify-between">
        <span className="font-display text-lg font-extrabold text-[#C8324F]">Bloomish</span>
        <span className="rounded-full bg-[#C8324F]/10 px-2.5 py-1 text-[11px] font-bold text-[#C8324F]">{occasion}</span>
      </div>
      <BouquetArt colors={colors} className="relative w-full rounded-3xl border border-[#C8324F]/10 bg-white/70" />
      <span className="relative text-[13px] leading-snug text-[#8A5563]">{title}</span>
      <div className="relative mt-auto flex gap-2">
        <span className="inline-flex h-11 flex-1 items-center justify-center rounded-[14px] bg-app-bloomish text-[13px] font-extrabold text-white">{t.send}</span>
        <span className="inline-flex h-11 items-center justify-center rounded-[14px] border border-[#C8324F]/25 px-3.5 text-[13px] font-bold text-[#C8324F]">{t.save}</span>
      </div>
    </div>
  );
}

export function BloomishHeroVisual() {
  const { t, colors, title, occasion } = useBouquet();
  return (
    <PhoneFrame className="relative z-[2] w-[330px] max-w-full animate-floaty" screenClassName="bg-[#FFF6F8]">
      <BloomishScreen colors={colors} title={title} occasion={t.occasions[occasion]} />
    </PhoneFrame>
  );
}

export function BloomishDemo() {
  const { t, occasion, setOccasion, picked, toggle, colors, title } = useBouquet();
  const label = "text-[11px] font-semibold uppercase tracking-[.12em] text-dim";
  return (
    <DemoSection slug="bloomish" heading={t.heading} note={t.note}>
      <div className="flex flex-wrap items-center gap-10">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className={label}>{t.occasion}</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(t.occasions) as Occasion[]).map((id) => (
                <Chip key={id} on={occasion === id} color={COLOR} onClick={() => setOccasion(id)}>
                  {t.occasions[id]}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className={label}>{t.flowersLabel}</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(FLOWERS) as Flower[]).map((id) => (
                <Chip key={id} on={picked.includes(id)} color={COLOR} onClick={() => toggle(id)} className="pl-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: FLOWERS[id] }} />
                  {t.flowers[id]}
                </Chip>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted" aria-live="polite">
            {title}
          </p>
        </div>
        <div className="flex min-w-0 flex-[1_1_280px] justify-center">
          <div className="relative aspect-square w-full max-w-[340px] overflow-hidden rounded-section border border-white/10 bg-[#FFF6F8] shadow-[0_40px_80px_rgba(0,0,0,.5)]">
            <BouquetArt colors={colors} className="h-full w-full" />
            <span className="absolute bottom-4 left-4 rounded-xl bg-surface/80 px-3 py-2 text-xs font-bold uppercase tracking-[.08em] text-primary">
              {t.occasions[occasion]} · {t.preview}
            </span>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}
