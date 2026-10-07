"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { contentMap, fill } from "@/content";
import { APP_ORDER, APPS, type AppSlug } from "@/content/apps";
import { useLocale } from "@/app/locale-context";
import { ArrowIcon } from "@/components/icons";
import { ScaledScreen } from "@/components/PhoneFrame";
import { PaliToday } from "@/components/pali/screens";
import { BouquetArt } from "@/components/apps/BouquetArt";
import { usePrefersReducedMotion } from "@/components/motion";

/** Left to right; the most important app sits in the middle, on top. */
const DECK: AppSlug[] = ["bloomish", "roompace", "fitvibe", "pali", "haki", "nextstep", "offer"];
const POSITIONS = [
  { left: 0, top: 24, width: 22, z: 1 },
  { left: 12.5, top: 13, width: 22, z: 2 },
  { left: 25, top: 5, width: 22, z: 3 },
  { left: 37, top: 0, width: 26, z: 5 },
  { left: 55.5, top: 5, width: 22, z: 3 },
  { left: 67.5, top: 13, width: 22, z: 2 },
  { left: 78, top: 24, width: 22, z: 1 },
];
const CYCLE_MS = 3600;

const cardCopy = {
  en: {
    hakiChapter: "Chapter 1 · Neon Tokyo",
    hakiLine: "The signal came from the tower. Kai didn't look back.",
    hakiCta: "Generate next page",
    nsUser: "I keep postponing my portfolio. Again.",
    nsLabel: "Your next step",
    nsStep: "Open Figma. Pick one project. Set a 25-minute timer. That's it.",
    nsDone: "Done ✓",
    bloomNote: "“For mom's birthday” · generated",
    bloomCta: "Send as a gift",
  },
  tr: {
    hakiChapter: "Bölüm 1 · Neon Tokyo",
    hakiLine: "Sinyal kuleden geldi. Kai arkasına bakmadı.",
    hakiCta: "Sonraki sayfayı üret",
    nsUser: "Portfolyomu yine erteliyorum.",
    nsLabel: "Sıradaki adımın",
    nsStep: "Figma'yı aç. Tek bir proje seç. 25 dakikalık sayaç kur. Bu kadar.",
    nsDone: "Tamam ✓",
    bloomNote: "“Annemin doğum günü için” · üretildi",
    bloomCta: "Hediye olarak gönder",
  },
};

function CardFace({ slug, locale }: { slug: AppSlug; locale: "en" | "tr" }) {
  const t = cardCopy[locale];
  switch (slug) {
    case "pali":
      return (
        <ScaledScreen width={390} height={823} decorative>
          <PaliToday interactive={false} />
        </ScaledScreen>
      );
    case "fitvibe":
      return <Image src="/apps/fitvibe/home.webp" alt="" fill sizes="200px" className="object-cover object-top" />;
    case "roompace":
      return <Image src="/apps/roompace/store-1.webp" alt="" fill sizes="200px" className="object-cover object-[center_20%]" />;
    case "offer":
      return <Image src="/apps/offer/welcome.webp" alt="" fill sizes="200px" className="scale-[1.14] object-cover" />;
    case "haki":
      return (
        <div className="flex h-full flex-col bg-[#0E0A14] text-left text-primary">
          <span className="relative block h-[58%] w-full"><Image src="/apps/haki/panel.webp" alt="" fill sizes="200px" className="object-cover" /></span>
          <div className="flex flex-1 flex-col gap-[1.1cqw] px-[1.8cqw] py-[1.6cqw]">
            <span className="text-[1.05cqw] font-semibold uppercase tracking-[.12em] text-app-haki">{t.hakiChapter}</span>
            <span className="text-[1.5cqw] font-semibold leading-tight">{t.hakiLine}</span>
            <span className="flex gap-[.6cqw]">
              {[1, 1, 0, 0].map((on, i) => (
                <span key={i} className={`h-[.5cqw] flex-1 rounded ${on ? "bg-app-haki" : "bg-white/20"}`} />
              ))}
            </span>
            <span className="mt-auto flex h-[3.4cqw] items-center justify-center rounded-[2cqw] bg-app-haki text-[1.2cqw] font-bold text-surface">
              {t.hakiCta}
            </span>
          </div>
        </div>
      );
    case "nextstep":
      return (
        <div className="flex h-full flex-col gap-[1.2cqw] bg-[#101024] px-[1.6cqw] pb-[1.2cqw] pt-[2.2cqw] text-left text-primary">
          <span className="text-[1.4cqw] font-bold tracking-tight">NextStep</span>
          <span className="max-w-[85%] self-end rounded-[1.6cqw_1.6cqw_.4cqw_1.6cqw] bg-app-nextstep/25 px-[1.2cqw] py-[1cqw] text-[1.15cqw] leading-snug">
            {t.nsUser}
          </span>
          <span className="flex flex-col gap-[.7cqw] rounded-[1.6cqw] border border-white/10 bg-white/5 p-[1.2cqw]">
            <span className="text-[.95cqw] font-semibold uppercase tracking-[.12em] text-app-nextstep">{t.nsLabel}</span>
            <span className="text-[1.25cqw] font-medium leading-snug">{t.nsStep}</span>
          </span>
          <span className="mt-auto flex h-[3.2cqw] items-center justify-center rounded-[2cqw] bg-app-nextstep text-[1.15cqw] font-bold text-surface">
            {t.nsDone}
          </span>
        </div>
      );
    case "bloomish":
      return (
        <div className="flex h-full flex-col gap-[1cqw] bg-[#FFF4F6] px-[1.6cqw] pb-[1.2cqw] pt-[2.2cqw] text-left text-[#2A1018]">
          <span className="text-[1.4cqw] font-bold tracking-tight text-[#C8324F]">Bloomish</span>
          <BouquetArt className="w-full rounded-[2cqw] bg-[#FFE4EA]" />
          <span className="text-[1.05cqw] text-[#8A5563]">{t.bloomNote}</span>
          <span className="mt-auto flex h-[3.2cqw] items-center justify-center rounded-[2cqw] bg-app-bloomish text-[1.15cqw] font-bold text-white">
            {t.bloomCta}
          </span>
        </div>
      );
  }
}

export function Hero() {
  const { locale, href } = useLocale();
  const { hero } = contentMap[locale];
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<AppSlug>("pali");
  const [manual, setManual] = useState(false);
  const app = APPS[active];

  useEffect(() => {
    if (manual || reduced) return;
    const timer = setInterval(() => {
      setActive((cur) => APP_ORDER[(APP_ORDER.indexOf(cur) + 1) % APP_ORDER.length]);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [manual, reduced]);

  const pick = (slug: AppSlug) => {
    setActive(slug);
    setManual(true);
  };

  return (
    <section id="top" className="relative mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)] pb-10 pt-[120px] md:pt-[130px]">
      <div
        className="pointer-events-none absolute -right-[14%] -top-[20%] z-0 aspect-square w-[62vw] max-w-[940px] animate-glow rounded-full blur-[120px] transition-colors duration-1000"
        style={{ background: app.color }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_80%)]" />

      <div className="relative z-[2] flex flex-wrap items-center gap-12">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-7">
          <div className="hero-in inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/[.04] py-2 pl-2.5 pr-3.5 text-[13px] font-medium text-soft">
            <span className="h-2 w-2 animate-blink rounded-full bg-accent" />
            {hero.badge}
          </div>
          <h1 className="hero-in hero-in-2 max-w-[12ch] font-display text-[clamp(52px,8.4vw,128px)] font-extrabold">
            {hero.titleLine1}
            <br />
            {hero.titleBig}{" "}
            <span className="transition-colors duration-700" style={{ color: app.color }}>
              {hero.titleAccent}
            </span>
          </h1>
          <p className="hero-in hero-in-3 max-w-[540px] text-[clamp(17px,1.4vw,20px)] leading-normal text-muted">{hero.sub}</p>
          <div className="hero-in hero-in-4 flex flex-wrap items-center gap-3">
            <Link
              href={href("/#apps")}
              className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-accent px-6 text-[15px] font-bold text-surface transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(218,255,71,.32)]"
            >
              {hero.ctaApps}
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <Link
              href={href("/careers")}
              className="inline-flex h-[52px] items-center rounded-full border border-white/20 px-[22px] text-[15px] font-semibold text-primary transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/55"
            >
              {hero.ctaHiring}
            </Link>
          </div>
          <p className="hero-in hero-in-5 flex flex-wrap items-center gap-2.5 text-sm text-muted" aria-live="polite">
            <span className="h-[9px] w-[9px] animate-blink rounded-full transition-colors duration-500" style={{ background: app.color }} />
            <span>{hero.nowShowing}</span>
            <Link href={href(`/projects/${active}`)} className="font-semibold text-primary underline-offset-4 hover:underline">
              {app.name}
            </Link>
            <span className="text-dim">·</span>
            <span>{app.copy[locale].tag}</span>
          </p>
        </div>

        <div className="min-w-0 flex-[1_1_520px]">
          <div className="relative mx-auto aspect-[1.3] w-full max-w-[700px] [container-type:inline-size]">
            {DECK.map((slug, i) => {
              const pos = POSITIONS[i];
              const on = slug === active;
              const deckApp = APPS[slug];
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => pick(slug)}
                  aria-label={fill(hero.showApp, { name: deckApp.name })}
                  aria-pressed={on}
                  className="absolute aspect-[9/19] animate-floaty cursor-pointer overflow-hidden border border-white/15 bg-card p-0 transition-[scale,box-shadow] duration-300 hover:!z-20 hover:[scale:1.06]"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                    width: `${pos.width}%`,
                    zIndex: pos.z,
                    borderRadius: pos.width > 22 ? "3.6cqw" : "3.2cqw",
                    rotate: `${(i - 3) * 6}deg`,
                    animationDelay: `${-0.85 * i}s`,
                    boxShadow: on ? `0 0 0 3px ${deckApp.color}, 0 40px 80px rgba(0,0,0,.55)` : "0 40px 80px rgba(0,0,0,.55)",
                  }}
                >
                  <CardFace slug={slug} locale={locale} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-[2] mt-12 flex flex-wrap items-center gap-2">
        <span className="mr-2 text-xs font-semibold uppercase tracking-[.14em] text-dim">{hero.pickApp}</span>
        {APP_ORDER.map((slug) => {
          const chip = APPS[slug];
          const on = slug === active;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => pick(slug)}
              aria-pressed={on}
              className="inline-flex h-[38px] items-center gap-2 rounded-full border border-white/15 pl-2.5 pr-3.5 text-[13px] font-semibold transition-[transform,background,color,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/40"
              style={on ? { background: chip.color, color: "#0B0B12" } : { background: "rgba(255,255,255,.06)", color: "#F3F2FA" }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: on ? "#0B0B12" : chip.color }} />
              {chip.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
