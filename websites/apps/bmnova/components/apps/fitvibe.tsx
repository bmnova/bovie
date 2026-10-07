"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/app/locale-context";
import { APPS } from "@/content/apps";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ArrowIcon } from "@/components/icons";
import { Chip, DemoSection } from "@/components/apps/AppPage";

const COLOR = APPS.fitvibe.color;

const VIBES = [
  { id: "classic", tile: "#E9DFCF" },
  { id: "minimalist", tile: "#CFCDE0" },
  { id: "romantic", tile: "#FFB3C1" },
  { id: "streetwear", tile: "#FF7A2F" },
] as const;
type Vibe = (typeof VIBES)[number]["id"];

const copy = {
  en: {
    heading: "Pick your vibe.",
    note: "The four vibes from onboarding. FitVibe uses yours to style every outfit it generates.",
    names: { classic: "Classic", minimalist: "Minimalist", romantic: "Romantic", streetwear: "Streetwear" },
    hints: {
      classic: "tailoring, neutrals and timeless pieces",
      minimalist: "clean lines and a tight colour palette",
      romantic: "soft fabrics, florals and flowing shapes",
      streetwear: "oversized fits, sneakers and bold layers",
    },
    styling: (name: string, hint: string) => `Styling in ${name}: the stylist now favours ${hint}.`,
    ootd: "outfit of the day",
    tryonEyebrow: "Virtual try-on",
    tryonHeading: "See it on you first.",
    before: "Before",
    after: "After",
    beforeLabel: "Before · mirror selfie",
    afterLabel: "After · generated try-on",
    tryonBody: "A mirror selfie plus one item from your wardrobe. FitVibe renders the look so you decide with confidence.",
    cutEyebrow: "Automatic background removal",
    cutHeading: "Photo in, clean cut-out.",
    cutBody: "Flat lay, hanging or worn: every item becomes a catalogue-ready cut-out in your digital wardrobe.",
    dressBefore: "A dress photographed on a bed",
    dressAfter: "The same dress with the background removed",
  },
  tr: {
    heading: "Tarzını seç.",
    note: "Onboarding'deki dört tarz. FitVibe ürettiği her kombini seninkine göre şekillendirir.",
    names: { classic: "Klasik", minimalist: "Minimalist", romantic: "Romantik", streetwear: "Sokak stili" },
    hints: {
      classic: "terzi işi kesimleri, nötr tonları ve zamansız parçaları",
      minimalist: "sade çizgileri ve dar bir renk paletini",
      romantic: "yumuşak kumaşları, çiçek desenlerini ve akışkan formları",
      streetwear: "bol kesimleri, sneaker'ları ve cesur katmanları",
    },
    styling: (name: string, hint: string) => `${name} tarzında: stilist artık ${hint} öne çıkarıyor.`,
    ootd: "günün kombini",
    tryonEyebrow: "Sanal deneme",
    tryonHeading: "Önce üzerinde gör.",
    before: "Önce",
    after: "Sonra",
    beforeLabel: "Önce · ayna selfie'si",
    afterLabel: "Sonra · üretilen deneme",
    tryonBody: "Bir ayna selfie'si ve dolabından tek bir parça. FitVibe görünümü oluşturur, sen de içine sinerek karar verirsin.",
    cutEyebrow: "Otomatik arka plan kaldırma",
    cutHeading: "Fotoğraf girer, temiz kesim çıkar.",
    cutBody: "Serili, askıda ya da üzerinde: her parça dijital gardırobunda katalog kalitesinde bir görsele dönüşür.",
    dressBefore: "Yatağın üzerinde fotoğraflanmış bir elbise",
    dressAfter: "Aynı elbise, arka planı kaldırılmış",
  },
};

export function FitVibeHeroVisual() {
  return (
    <>
      <Image src="/apps/fitvibe/outfit-1.webp" alt="" width={120} height={229} className="absolute left-0 top-8 z-[3] hidden w-[110px] -rotate-[8deg] animate-floaty drop-shadow-[0_16px_30px_rgba(0,0,0,.5)] sm:block" style={{ animationDelay: "-1s" }} />
      <Image src="/apps/fitvibe/outfit-2.webp" alt="" width={120} height={229} className="absolute bottom-10 right-0 z-[3] hidden w-[110px] rotate-[8deg] animate-floaty drop-shadow-[0_16px_30px_rgba(0,0,0,.5)] sm:block" style={{ animationDelay: "-3s" }} />
      <PhoneFrame className="relative z-[2] w-[330px] max-w-full animate-floaty">
        <Image src="/apps/fitvibe/home.webp" alt="FitVibe home screen with outfits and clothes" width={393} height={852} priority className="block h-auto w-full" />
      </PhoneFrame>
    </>
  );
}

export function FitVibeDemo() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [vibe, setVibe] = useState<Vibe>("streetwear");
  const [after, setAfter] = useState(true);
  const eyebrow = "text-xs font-semibold uppercase tracking-[.14em] text-app-fitvibe";

  return (
    <>
      <DemoSection slug="fitvibe" heading={t.heading} note={t.note}>
        <div className="flex flex-wrap items-center gap-10">
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {VIBES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVibe(v.id)}
                  aria-pressed={vibe === v.id}
                  className="h-[72px] rounded-2xl border-2 font-display text-[17px] font-extrabold tracking-[-0.02em] text-surface transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                  style={{ background: v.tile, borderColor: vibe === v.id ? "#F3F2FA" : "transparent" }}
                >
                  {t.names[v.id]}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted" aria-live="polite">
              {t.styling(t.names[vibe], t.hints[vibe])}
            </p>
          </div>
          <div className="flex min-w-0 flex-[1_1_300px] justify-center">
            <div className="relative aspect-[3/4] w-full max-w-[360px] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,.5)]">
              {VIBES.map((v) => (
                <Image
                  key={v.id}
                  src={`/apps/fitvibe/vibe-${v.id}.webp`}
                  alt={v.id === vibe ? `${t.names[v.id]} ${t.ootd}` : ""}
                  fill
                  sizes="360px"
                  className="object-cover transition-opacity duration-500"
                  style={{ opacity: v.id === vibe ? 1 : 0 }}
                />
              ))}
              <span className="absolute bottom-4 left-4 rounded-xl bg-surface/80 px-3 py-2 text-xs font-bold uppercase tracking-[.08em]">
                {t.names[vibe]} · {t.ootd}
              </span>
            </div>
          </div>
        </div>
      </DemoSection>

      <section className="reveal mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)] pb-[72px]">
        <div className="stagger flex flex-wrap gap-3.5">
          <div className="flex flex-[1_1_420px] flex-col gap-[18px] rounded-[28px] border border-border bg-card p-[clamp(22px,3vw,36px)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <span className={eyebrow}>{t.tryonEyebrow}</span>
                <h3 className="font-display text-[30px] font-extrabold">{t.tryonHeading}</h3>
              </div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/[.06] p-1">
                <Chip on={!after} color={COLOR} onClick={() => setAfter(false)} className="min-h-9 border-0">
                  {t.before}
                </Chip>
                <Chip on={after} color={COLOR} onClick={() => setAfter(true)} className="min-h-9 border-0">
                  {t.after}
                </Chip>
              </div>
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[22px] border border-white/10">
              <Image src="/apps/fitvibe/tryon-before.webp" alt={t.beforeLabel} fill sizes="(min-width: 900px) 600px, 100vw" className="object-cover" />
              <Image
                src="/apps/fitvibe/tryon-after.webp"
                alt={t.afterLabel}
                fill
                sizes="(min-width: 900px) 600px, 100vw"
                className="object-cover transition-[clip-path] duration-700 ease-out"
                style={{ clipPath: after ? "inset(0 0 0 0)" : "inset(0 0 0 100%)" }}
              />
              <span className="absolute left-4 top-4 rounded-xl bg-surface/80 px-3 py-2 text-xs font-bold uppercase tracking-[.08em]">
                {after ? t.afterLabel : t.beforeLabel}
              </span>
            </div>
            <span className="text-sm text-muted">{t.tryonBody}</span>
          </div>
          <div className="flex flex-[1_1_420px] flex-col gap-[18px] rounded-[28px] border border-border bg-card p-[clamp(22px,3vw,36px)]">
            <div className="flex flex-col gap-1.5">
              <span className={eyebrow}>{t.cutEyebrow}</span>
              <h3 className="font-display text-[30px] font-extrabold">{t.cutHeading}</h3>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="relative aspect-[3/4] flex-1 overflow-hidden rounded-[22px] border border-white/10 bg-[#F3EEE6]">
                <Image src="/apps/fitvibe/extract-before.webp" alt={t.dressBefore} fill sizes="300px" className="object-cover" />
              </div>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-fitvibe text-surface">
                <ArrowIcon className="h-5 w-5" />
              </span>
              <div className="relative aspect-[3/4] flex-1 overflow-hidden rounded-[22px] border border-white/10 bg-white">
                <Image src="/apps/fitvibe/extract-after.webp" alt={t.dressAfter} fill sizes="300px" className="object-contain p-[7%]" />
              </div>
            </div>
            <span className="text-sm text-muted">{t.cutBody}</span>
          </div>
        </div>
      </section>
    </>
  );
}
