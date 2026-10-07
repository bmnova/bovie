"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/app/locale-context";
import { APPS } from "@/content/apps";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Chip, DemoSection } from "@/components/apps/AppPage";

const COLOR = APPS.nextstep.color;

/** The coach roster from the NextStep app (assets/coaches/coaches.json). */
const COACHES = [
  { name: "Focus Sprint Coach", tagline: "Break through procrastination. One sprint at a time." },
  { name: "Project Decomposer", tagline: "Big goals, small steps. No overwhelm." },
  { name: "Clarity Coach", tagline: "Align what you do with what matters." },
  { name: "Quick Wins Coach", tagline: "One small step, one question, one next action." },
  { name: "Decision Maker", tagline: "Weigh it, decide it, own it." },
  { name: "Systems Builder", tagline: "Less deciding. More doing." },
  { name: "Deep Focus Session", tagline: "Strategic depth in 60 minutes." },
  { name: "5-Minute Spark", tagline: "One priority. One micro-action. Done." },
  { name: "The Strategist", tagline: "Eliminate distractions. Own your focus." },
  { name: "Marcus", tagline: "Ancient wisdom for modern challenges." },
  { name: "Founders Ally", tagline: "Zero to one. Then scale." },
  { name: "Lumina", tagline: "Body, mind, habits, in balance." },
];

type CoachId = "focus" | "decomp" | "clarity" | "quick" | "decision" | "systems";
type WorryId = "portfolio" | "ideas" | "offers";

const copy = {
  en: {
    heading: "Pick a coach. Pick a worry. Get one step.",
    note: "The phone updates live.",
    coach: "Coach",
    mind: "What's on your mind",
    question: "One question",
    yourStep: "Your next step",
    done: "Done ✓",
    notNow: "Not now",
    under: (coach: string) => `Under 5 minutes · from ${coach}`,
    coachesEyebrow: "Meet the coaches",
    coachesHeading: "A coach for every kind of stuck.",
    coaches: {
      focus: { name: "Focus Sprint Coach", question: "What would “done for today” look like in 15 minutes?", prefix: "Set a 15-minute timer, then " },
      decomp: { name: "Project Decomposer", question: "What is the smallest piece you could finish before lunch?", prefix: "Split it into three tiny pieces; for the first one, " },
      clarity: { name: "Clarity Coach", question: "Why does this matter to you, in one sentence?", prefix: "Write that one sentence down, then " },
      quick: { name: "Quick Wins Coach", question: "What is the two-minute version of this?", prefix: "Do the two-minute version: " },
      decision: { name: "Decision Maker", question: "Which option would you regret not taking?", prefix: "Decide by tonight. Before that, " },
      systems: { name: "Systems Builder", question: "When, exactly, will this happen every week?", prefix: "Book a recurring 20-minute block, and in the first one " },
    },
    worries: {
      portfolio: { text: "I keep postponing my portfolio. Again.", action: "open the portfolio file and pick one project to show." },
      ideas: { text: "Too many ideas, zero progress.", action: "circle one idea and park the rest for 30 days." },
      offers: { text: "I can't choose between two offers.", action: "write the one thing you'd regret losing with each offer." },
    },
  },
  tr: {
    heading: "Bir koç seç. Bir dert seç. Tek bir adım al.",
    note: "Telefon anında güncellenir.",
    coach: "Koç",
    mind: "Aklındaki",
    question: "Tek soru",
    yourStep: "Sıradaki adımın",
    done: "Tamam ✓",
    notNow: "Şimdi değil",
    under: (coach: string) => `5 dakikadan kısa · ${coach}`,
    coachesEyebrow: "Koçlarla tanış",
    coachesHeading: "Her türlü takılma için bir koç.",
    coaches: {
      focus: { name: "Focus Sprint Coach", question: "15 dakikada “bugünlük bitti” neye benzerdi?", prefix: "15 dakikalık bir sayaç kur, sonra " },
      decomp: { name: "Project Decomposer", question: "Öğleden önce bitirebileceğin en küçük parça hangisi?", prefix: "Üç minik parçaya böl; ilki için " },
      clarity: { name: "Clarity Coach", question: "Bu senin için neden önemli, tek cümleyle?", prefix: "O cümleyi bir yere yaz, sonra " },
      quick: { name: "Quick Wins Coach", question: "Bunun iki dakikalık versiyonu ne?", prefix: "İki dakikalık versiyonu yap: " },
      decision: { name: "Decision Maker", question: "Hangi seçeneği seçmediğin için pişman olurdun?", prefix: "Bu akşama kadar karar ver. Öncesinde " },
      systems: { name: "Systems Builder", question: "Bu her hafta tam olarak ne zaman olacak?", prefix: "Tekrarlayan 20 dakikalık bir blok ayır, ilkinde " },
    },
    worries: {
      portfolio: { text: "Portfolyomu yine erteliyorum.", action: "portfolyo dosyasını aç ve göstereceğin tek bir projeyi seç." },
      ideas: { text: "Çok fikir var, sıfır ilerleme.", action: "tek bir fikri işaretle, gerisini 30 gün park et." },
      offers: { text: "İki iş teklifi arasında seçemiyorum.", action: "her teklif için kaybetmekten pişman olacağın tek şeyi yaz." },
    },
  },
};

const COACH_IDS: CoachId[] = ["focus", "decomp", "clarity", "quick", "decision", "systems"];
const WORRY_IDS: WorryId[] = ["portfolio", "ideas", "offers"];

function Chat({ coach, worry }: { coach: CoachId; worry: WorryId }) {
  const { locale } = useLocale();
  const t = copy[locale];
  const c = t.coaches[coach];
  const w = t.worries[worry];
  return (
    <div className="flex aspect-[9/19] flex-col gap-3 bg-[#0E0C1A] px-[18px] pb-5 pt-6 text-primary">
      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-lg font-extrabold">NextStep</span>
        <span className="truncate rounded-full bg-app-nextstep/20 px-2.5 py-1 text-[11px] font-bold text-app-nextstep">{c.name}</span>
      </div>
      <p className="mt-3 max-w-[86%] self-end rounded-[18px_18px_4px_18px] bg-app-nextstep/25 px-3.5 py-3 text-sm leading-snug">{w.text}</p>
      <div className="flex flex-col gap-2 rounded-[18px] border border-white/10 bg-white/[.06] p-3.5">
        <span className="text-[10px] font-bold uppercase tracking-[.12em] text-app-nextstep">{t.question}</span>
        <span className="text-[13px] leading-snug text-soft">{c.question}</span>
      </div>
      <div className="flex flex-col gap-1.5 rounded-[18px] bg-app-nextstep p-3.5 text-surface">
        <span className="text-[10px] font-extrabold uppercase tracking-[.12em] opacity-75">{t.yourStep}</span>
        <span className="text-sm font-semibold leading-snug">
          {c.prefix}
          {w.action}
        </span>
      </div>
      <div className="mt-auto flex gap-2">
        <span className="inline-flex h-11 flex-1 items-center justify-center rounded-[14px] bg-primary text-[13px] font-extrabold text-surface">{t.done}</span>
        <span className="inline-flex h-11 items-center justify-center rounded-[14px] border border-white/20 px-4 text-[13px] font-semibold">{t.notNow}</span>
      </div>
    </div>
  );
}

export function NextStepHeroVisual() {
  return (
    <PhoneFrame className="relative z-[2] w-[330px] max-w-full animate-floaty" screenClassName="bg-[#0E0C1A]">
      <Chat coach="focus" worry="portfolio" />
    </PhoneFrame>
  );
}

export function NextStepDemo() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [coach, setCoach] = useState<CoachId>("focus");
  const [worry, setWorry] = useState<WorryId>("portfolio");
  const label = "text-[11px] font-semibold uppercase tracking-[.12em] text-dim";
  const c = t.coaches[coach];
  return (
    <DemoSection slug="nextstep" heading={t.heading} note={t.note}>
      <div className="flex flex-wrap items-center gap-10">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <span className={label}>{t.coach}</span>
            <div className="flex flex-wrap gap-2">
              {COACH_IDS.map((id) => (
                <Chip key={id} on={coach === id} color={COLOR} onClick={() => setCoach(id)}>
                  {t.coaches[id].name}
                </Chip>
              ))}
            </div>
            <span className="text-[13px] text-muted">{COACHES.find((x) => x.name === c.name)?.tagline}</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className={label}>{t.mind}</span>
            <div className="flex flex-wrap gap-2">
              {WORRY_IDS.map((id) => (
                <Chip key={id} on={worry === id} color={COLOR} onClick={() => setWorry(id)}>
                  {t.worries[id].text}
                </Chip>
              ))}
            </div>
          </div>
          <p className="flex flex-wrap items-center gap-4 rounded-[20px] border border-border bg-surface px-6 py-5" aria-live="polite">
            <span className="flex-[1_1_300px] text-[17px] font-semibold leading-snug">
              {c.prefix}
              {t.worries[worry].action}
            </span>
            <span className="text-xs text-dim">{t.under(c.name)}</span>
          </p>
        </div>
        <div className="flex min-w-0 flex-[1_1_280px] justify-center">
          <PhoneFrame className="w-[300px] max-w-full" screenClassName="bg-[#0E0C1A]">
            <Chat coach={coach} worry={worry} />
          </PhoneFrame>
        </div>
      </div>
    </DemoSection>
  );
}

export function NextStepCoaches() {
  const { locale } = useLocale();
  const t = copy[locale];
  return (
    <section className="reveal mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)] pb-[72px]">
      <div className="mb-8 flex max-w-[760px] flex-col gap-3">
        <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em] text-app-nextstep">
          <Image src={APPS.nextstep.icon} alt="" width={24} height={24} className="rounded-md bg-white" />
          {t.coachesEyebrow}
        </span>
        <h2 className="font-display text-[clamp(34px,4.4vw,64px)] font-extrabold">{t.coachesHeading}</h2>
      </div>
      <ul className="stagger flex flex-wrap gap-3">
        {COACHES.map((coach) => (
          <li
            key={coach.name}
            className="flex flex-[1_1_260px] flex-col gap-1.5 rounded-[18px] border border-border bg-card p-5 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-white/30"
          >
            <strong className="text-base">{coach.name}</strong>
            <span className="text-[13px] leading-snug text-muted">{coach.tagline}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
