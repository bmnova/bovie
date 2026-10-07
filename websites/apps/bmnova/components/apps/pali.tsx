"use client";

import { useState } from "react";
import { useLocale } from "@/app/locale-context";
import { APPS } from "@/content/apps";
import { PhoneFrame, ScaledScreen } from "@/components/PhoneFrame";
import { PaliMascot, type PaliMood } from "@/components/pali/PaliMascot";
import { PaliFeel, PaliShots, PaliToday } from "@/components/pali/screens";
import { Chip, DemoSection } from "@/components/apps/AppPage";

const COLOR = APPS.pali.color;
const MEDICATIONS = ["Ozempic", "Wegovy", "Mounjaro", "Zepbound", "Rybelsus"];

const copy = {
  en: {
    worksWith: "Works with",
    compounded: "Compounded",
    demoHeading: "Log your shot week. Pali reacts.",
    demoNote: "The same three things the app asks every day. Pali's lines are the real ones from the app.",
    shotDay: "1 · Shot day",
    logShot: "Log today's shot",
    shotLogged: "Shot logged ✓",
    sites: { thighL: "Left thigh", thighR: "Right thigh", bellyL: "Belly, left", bellyR: "Belly, right" },
    feel: "2 · How you feel · tap to cycle none → mild → moderate → severe",
    symptoms: { nausea: "Nausea", fatigue: "Fatigue", heartburn: "Heartburn", noise: "Food noise" },
    levels: ["None", "Mild", "Moderate", "Severe"],
    floor: "3 · Protein & water · a floor, never a cap",
    addProtein: "+ 20 g protein",
    addWater: "+ 1 glass of water",
    reset: "Reset day",
    protein: "Protein",
    water: "Water",
    lines: {
      none: "A quiet day. Good to hear, I've noted it.",
      mild: "A little off today. I'll keep track so you can see how your week goes.",
      rough: "Sounds like a tough day. Go easy on yourself, I've got it noted.",
      severe: "That sounds hard. If it keeps up or worries you, your doctor can help.",
      shot: (site: string) => `Shot logged on your ${site.toLowerCase()}. That spot gets two weeks off now.`,
      done: "Protein and water both done. That's a GLP-1 week carried well.",
    },
    nextShot: (logged: boolean) => (logged ? "Next shot in 7 days" : "Next shot Thursday, in 2 days"),
    rotates: "rotates every two weeks",
    insideEyebrow: "Inside the app",
    insideHeading: "Three screens you will live in.",
    insideNote: "Live prototype screens · tap around",
    screens: [
      { title: "Today", body: "Your shot cycle is the hero. Tap a day to see how Pali's mood and advice shift." },
      { title: "Shots", body: "Countdown, next site, rotation and history. Try the day states at the top." },
      { title: "How you feel", body: "Four-step scales and food noise. Pali's face follows the total." },
    ],
    trustTitle: "Pali tracks. It doesn't advise.",
    trustBody: "Dose changes are always your doctor's call. When a day sounds hard, Pali points you to them, never to a number. You can update or delete your data at any time.",
  },
  tr: {
    worksWith: "Uyumlu",
    compounded: "Hazırlanmış (compounded)",
    demoHeading: "İğne haftanı kaydet. Pali tepki versin.",
    demoNote: "Uygulamanın her gün sorduğu üç şey. Pali'nin cümleleri uygulamadakilerin aynısı.",
    shotDay: "1 · İğne günü",
    logShot: "Bugünkü iğneyi kaydet",
    shotLogged: "İğne kaydedildi ✓",
    sites: { thighL: "Sol uyluk", thighR: "Sağ uyluk", bellyL: "Karın, sol", bellyR: "Karın, sağ" },
    feel: "2 · Nasıl hissediyorsun · dokundukça yok → hafif → orta → şiddetli",
    symptoms: { nausea: "Mide bulantısı", fatigue: "Yorgunluk", heartburn: "Mide ekşimesi", noise: "Yemek gürültüsü" },
    levels: ["Yok", "Hafif", "Orta", "Şiddetli"],
    floor: "3 · Protein ve su · taban, asla tavan değil",
    addProtein: "+ 20 g protein",
    addWater: "+ 1 bardak su",
    reset: "Günü sıfırla",
    protein: "Protein",
    water: "Su",
    lines: {
      none: "Sakin bir gün. Duyduğuma sevindim, not aldım.",
      mild: "Bugün biraz iyi hissetmiyorsun. Haftanın nasıl geçtiğini görebilmen için takipte kalacağım.",
      rough: "Zor bir gün gibi görünüyor. Kendine karşı nazik ol, not aldım.",
      severe: "Bu zor görünüyor. Devam ederse ya da seni endişelendirirse doktorun yardımcı olabilir.",
      shot: (site: string) => `İğne kaydedildi: ${site.toLowerCase()}. Bu bölge şimdi iki hafta dinlenecek.`,
      done: "Protein de su da tamam. GLP-1 haftası böyle taşınır.",
    },
    nextShot: (logged: boolean) => (logged ? "Sonraki iğne 7 gün sonra" : "Sonraki iğne perşembe, 2 gün sonra"),
    rotates: "iki haftada bir dönüşümlü",
    insideEyebrow: "Uygulamanın içi",
    insideHeading: "İçinde yaşayacağın üç ekran.",
    insideNote: "Canlı prototip ekranları · dokunup dene",
    screens: [
      { title: "Bugün", body: "İğne döngün ön planda. Bir güne dokun, Pali'nin ruh hâli ve tavsiyesi değişsin." },
      { title: "İğneler", body: "Geri sayım, sıradaki bölge, rotasyon ve geçmiş. Üstteki gün durumlarını dene." },
      { title: "Nasıl hissediyorsun", body: "Dört basamaklı ölçekler ve yemek gürültüsü. Pali'nin yüzü toplamı izler." },
    ],
    trustTitle: "Pali takip eder. Tavsiye vermez.",
    trustBody: "Doz kararı her zaman doktorunundur. Zor geçen bir günde Pali seni bir rakama değil, doktoruna yönlendirir. Verilerini istediğin zaman güncelleyebilir ya da silebilirsin.",
  },
};

export function PaliHeroVisual() {
  return (
    <>
      <div className="absolute bottom-24 left-0 z-[3] hidden animate-floaty drop-shadow-[0_16px_30px_rgba(0,0,0,.5)] sm:block" style={{ animationDelay: "-2.5s" }}>
        <PaliMascot mood="proud" size={110} />
      </div>
      <PhoneFrame className="relative z-[2] w-[330px] max-w-full animate-floaty" screenClassName="bg-[#F7F8FC]">
        <ScaledScreen width={390} height={823}>
          <PaliToday />
        </ScaledScreen>
      </PhoneFrame>
    </>
  );
}

export function PaliWorksWith() {
  const { locale } = useLocale();
  const t = copy[locale];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs text-dim">{t.worksWith}</span>
      {[...MEDICATIONS, t.compounded].map((med) => (
        <span key={med} className="inline-flex h-[30px] items-center rounded-full border border-white/15 px-3 text-xs font-semibold text-soft">
          {med}
        </span>
      ))}
    </div>
  );
}

type Site = keyof (typeof copy)["en"]["sites"];
type Symptom = keyof (typeof copy)["en"]["symptoms"];
const SYMPTOM_KEYS: Symptom[] = ["nausea", "fatigue", "heartburn", "noise"];

export function PaliDemo() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [shot, setShot] = useState(false);
  const [site, setSite] = useState<Site>("thighL");
  const [levels, setLevels] = useState<Record<Symptom, number>>({ nausea: 0, fatigue: 0, heartburn: 0, noise: 0 });
  const [protein, setProtein] = useState(40);
  const [water, setWater] = useState(3);

  const max = Math.max(...Object.values(levels));
  let mood: PaliMood = shot ? "proud" : "happy";
  let line = shot ? t.lines.shot(t.sites[site]) : t.lines.none;
  if (max === 1) [mood, line] = ["neutral", t.lines.mild];
  else if (max === 2) [mood, line] = ["worried", t.lines.rough];
  else if (max === 3) [mood, line] = ["sad", t.lines.severe];
  if (max <= 1 && protein >= 90 && water >= 8) [mood, line] = ["cheer", t.lines.done];

  const label = "text-[11px] font-semibold uppercase tracking-[.12em] text-dim";
  return (
    <DemoSection slug="pali" heading={t.demoHeading} note={t.demoNote}>
      <div className="flex flex-wrap items-center gap-10">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className={label}>{t.shotDay}</span>
            <div className="flex flex-wrap gap-2">
              <Chip on={shot} color={COLOR} onClick={() => setShot((v) => !v)}>
                {shot ? t.shotLogged : t.logShot}
              </Chip>
              {(Object.keys(t.sites) as Site[]).map((key) => (
                <Chip key={key} on={site === key} color={COLOR} onClick={() => setSite(key)}>
                  {t.sites[key]}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className={label}>{t.feel}</span>
            <div className="flex flex-wrap gap-2">
              {SYMPTOM_KEYS.map((key) => (
                <Chip key={key} on={levels[key] > 0} color={COLOR} onClick={() => setLevels((l) => ({ ...l, [key]: (l[key] + 1) % 4 }))}>
                  {t.symptoms[key]} · {t.levels[levels[key]]}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className={label}>{t.floor}</span>
            <div className="flex flex-wrap gap-2">
              <Chip on={false} color={COLOR} onClick={() => setProtein((p) => (p >= 120 ? 0 : p + 20))}>
                {t.addProtein}
              </Chip>
              <Chip on={false} color={COLOR} onClick={() => setWater((w) => (w >= 8 ? 0 : w + 1))}>
                {t.addWater}
              </Chip>
              <button
                type="button"
                onClick={() => {
                  setShot(false);
                  setLevels({ nausea: 0, fatigue: 0, heartburn: 0, noise: 0 });
                  setProtein(0);
                  setWater(0);
                }}
                className="inline-flex min-h-10 items-center rounded-full border border-dashed border-white/30 px-4 text-[13px] font-semibold text-muted transition-colors hover:text-primary"
              >
                {t.reset}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <Meter label={t.protein} value={`${protein} / 90 g`} pct={Math.min(100, (protein / 90) * 100)} color={COLOR} />
            <Meter label={t.water} value={`${(water * 0.25).toFixed(2)} / 2 L`} pct={(water / 8) * 100} color="#7DD3FC" />
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_320px] flex-col items-center gap-4 rounded-card border border-border bg-surface p-6" aria-live="polite">
          <PaliMascot mood={mood} size={220} />
          <p className="max-w-[340px] rounded-[18px_18px_18px_4px] bg-app-pali/15 px-[18px] py-3 text-center text-[15px] font-medium leading-snug">{line}</p>
          <span className="text-center text-xs text-dim">
            {t.nextShot(shot)} · {t.sites[site]} {t.rotates}
          </span>
        </div>
      </div>
    </DemoSection>
  );
}

function Meter({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-[13px] text-muted">
        <span>{label}</span>
        <strong className="text-primary">{value}</strong>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/[.08]">
        <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

const SCREENS = [
  { Screen: PaliToday, bg: "#F7F8FC" },
  { Screen: PaliShots, bg: "#F7F8FC" },
  { Screen: PaliFeel, bg: "#F3F2FB" },
];

export function PaliInside() {
  const { locale } = useLocale();
  const t = copy[locale];
  return (
    <>
      <section className="reveal mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)] pb-[72px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-[.14em] text-app-pali">{t.insideEyebrow}</span>
            <h2 className="font-display text-[clamp(30px,3.6vw,52px)] font-extrabold">{t.insideHeading}</h2>
          </div>
          <span className="text-[13px] text-dim">{t.insideNote}</span>
        </div>
        <div className="stagger flex flex-wrap justify-center gap-7">
          {SCREENS.map(({ Screen, bg }, i) => (
            <div key={i} className="flex flex-[0_1_274px] flex-col items-center gap-3">
              <div className="w-[274px] max-w-full overflow-hidden rounded-[40px] border-8 border-[#1C1C28] shadow-[0_30px_60px_rgba(0,0,0,.5)]" style={{ background: bg }}>
                <ScaledScreen width={390} height={820}>
                  <Screen />
                </ScaledScreen>
              </div>
              <strong className="text-[15px]">{t.screens[i].title}</strong>
              <span className="max-w-[260px] text-center text-[13px] text-muted">{t.screens[i].body}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="reveal mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)] pb-[72px]">
        <div className="flex flex-wrap items-center gap-5 rounded-card border border-dashed border-white/20 px-7 py-6">
          <PaliMascot mood="neutral" size={56} float={false} />
          <div className="flex flex-[1_1_320px] flex-col gap-1">
            <strong className="text-base">{t.trustTitle}</strong>
            <span className="text-sm leading-normal text-muted">{t.trustBody}</span>
          </div>
        </div>
      </section>
    </>
  );
}
