"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { contentMap, fill } from "@/content";
import { APP_ORDER, APPS, REVIEWS, SHIP_LOG, type AppInfo, type AppSlug } from "@/content/apps";
import { useLocale } from "@/app/locale-context";
import { ArrowIcon } from "@/components/icons";
import { ReviewCard } from "@/components/ReviewCard";
import { ScaledScreen } from "@/components/PhoneFrame";
import { PaliToday } from "@/components/pali/screens";
import { BouquetArt } from "@/components/apps/BouquetArt";
import { usePrefersReducedMotion } from "@/components/motion";

const container = "mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)]";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-semibold uppercase tracking-[.14em] text-accent">{children}</span>;
}

/** App names scrolling past; pauses on hover. */
export function Ticker() {
  const { locale } = useLocale();
  const items = APP_ORDER.map((slug) => `${APPS[slug].name} · ${APPS[slug].copy[locale].tag}`);
  return (
    <div className="marquee mt-14 overflow-hidden border-y border-border bg-white/[.02] py-[18px]" aria-hidden="true">
      <div className="marquee-track flex w-max animate-marquee gap-14 whitespace-nowrap font-display text-[22px] font-bold tracking-[-0.02em] text-accent">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex gap-14">
            <span className="transition-colors hover:text-primary">{item}</span>
            <span className="text-dim">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Counts from zero to the target once the element scrolls into view. */
function useCountUp(target: number, duration = 1100) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setValue(Math.round((1 - Math.pow(1 - p, 4)) * target));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration, reduced]);

  return { ref, value };
}

function NumberTile({ value, suffix = "", label, sub }: { value: number | string; suffix?: string; label: string; sub: string }) {
  const numeric = typeof value === "number";
  const { ref, value: counted } = useCountUp(numeric ? value : 0);
  return (
    <div
      ref={ref}
      className="group flex min-w-0 flex-col gap-1.5 rounded-[20px] border border-border bg-card px-5 py-6 sm:px-6 sm:py-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/30"
    >
      <div className="font-display text-[clamp(32px,4vw,52px)] font-extrabold tabular-nums text-primary transition-colors group-hover:text-accent">
        {numeric ? counted : value}
        {suffix}
      </div>
      <div className="text-[15px] font-semibold">{label}</div>
      <div className="text-[13px] text-dim">{sub}</div>
    </div>
  );
}

export function Numbers() {
  const { locale } = useLocale();
  const { numbers } = contentMap[locale];
  return (
    <section className={`${container} reveal pb-6 pt-[72px]`}>
      <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-[clamp(28px,3vw,40px)] font-extrabold">{numbers.heading}</h2>
        <span className="text-[13px] text-dim">{numbers.note}</span>
      </div>
      <div className="stagger grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <NumberTile value={APP_ORDER.length} label={numbers.apps.label} sub={numbers.apps.sub} />
        <NumberTile value={2000} suffix="+" label={numbers.downloads.label} sub={numbers.downloads.sub} />
        <NumberTile value={50} suffix="+" label={numbers.ratings.label} sub={fill(numbers.ratings.sub, { n: 20 })} />
        <NumberTile value={100} suffix="%" label={numbers.inhouse.label} sub={numbers.inhouse.sub} />
        <NumberTile value="'25" label={numbers.founded.label} sub={numbers.founded.sub} />
      </div>
    </section>
  );
}

function StatusPill({ app }: { app: AppInfo }) {
  const { locale } = useLocale();
  const { apps } = contentMap[locale];
  return (
    <span
      className="inline-flex h-[30px] items-center gap-1.5 rounded-full px-3 text-xs font-bold"
      style={{ background: `${app.color}24`, color: app.color }}
    >
      {app.status === "live" && <span className="h-1.5 w-1.5 rounded-full" style={{ background: app.color }} />}
      {apps.status[app.status]}
    </span>
  );
}

function SecondaryPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-[30px] items-center rounded-full border border-white/15 px-3 text-xs font-semibold text-soft">
      {children}
    </span>
  );
}

const nsCopy = {
  en: { label: "Your next step", step: "Send the email. One line. Before lunch.", done: "Done ✓" },
  tr: { label: "Sıradaki adımın", step: "E-postayı gönder. Tek satır. Öğleden önce.", done: "Tamam ✓" },
};

/** The visual at the top of each app card; it lifts on hover. */
function CardVisual({ slug }: { slug: AppSlug }) {
  const { locale } = useLocale();
  const app = APPS[slug];
  const glow = `radial-gradient(circle at 50% 120%, ${app.color}80, ${app.color}00 60%)`;
  const shot = "transition-[translate] duration-500 ease-out group-hover:[translate:0_-18px]";

  switch (slug) {
    case "pali":
      return (
        <div className="relative min-h-[300px] flex-[1_1_240px] overflow-hidden" style={{ background: glow }}>
          <div className={`absolute left-1/2 top-10 w-[230px] -translate-x-1/2 overflow-hidden rounded-[30px] border-[6px] border-[#1C1C28] shadow-[0_30px_60px_rgba(0,0,0,.5)] ${shot}`}>
            <ScaledScreen width={390} height={844} decorative>
              <PaliToday interactive={false} />
            </ScaledScreen>
          </div>
        </div>
      );
    case "haki":
      return (
        <div className="relative h-[220px] overflow-hidden">
          <Image src="/apps/haki/panel.webp" alt="" fill sizes="(min-width: 768px) 400px, 100vw" className={`object-cover ${shot}`} />
        </div>
      );
    case "nextstep": {
      const t = nsCopy[locale];
      return (
        <div className="flex h-[220px] items-center justify-center" style={{ background: glow }}>
          <div className={`flex w-[220px] flex-col gap-2 rounded-[18px] border border-white/10 bg-[#101024] p-4 shadow-[0_30px_60px_rgba(0,0,0,.5)] ${shot}`}>
            <span className="text-[10px] font-semibold uppercase tracking-[.12em] text-app-nextstep">{t.label}</span>
            <span className="text-sm font-medium leading-snug">{t.step}</span>
            <span className="inline-flex h-[30px] items-center justify-center rounded-full bg-app-nextstep text-xs font-bold text-surface">{t.done}</span>
          </div>
        </div>
      );
    }
    case "bloomish":
      return (
        <div className="flex h-[220px] items-center justify-center" style={{ background: glow }}>
          <BouquetArt className={`w-[150px] rounded-full bg-[#FFE4EA] shadow-[0_30px_60px_rgba(0,0,0,.5)] ${shot}`} />
        </div>
      );
    default: {
      const src = { fitvibe: "/apps/fitvibe/home.webp", roompace: "/apps/roompace/store-1.webp", offer: "/apps/offer/welcome.webp" }[slug];
      return (
        <div className="relative h-[220px] overflow-hidden" style={{ background: glow }}>
          <div className={`absolute left-1/2 top-7 aspect-[9/19] w-[200px] -translate-x-1/2 overflow-hidden rounded-[26px] border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,.5)] ${shot}`}>
            <Image src={src} alt="" fill sizes="200px" className="object-cover object-top" />
          </div>
        </div>
      );
    }
  }
}

function AppCard({ slug }: { slug: AppSlug }) {
  const { locale, href } = useLocale();
  const { apps } = contentMap[locale];
  const app = APPS[slug];
  const copy = app.copy[locale];
  const featured = slug === "pali";
  const pills = (
    <div className="mt-auto flex flex-wrap items-center gap-2">
      <StatusPill app={app} />
      <SecondaryPill>
        {app.status === "live" ? (app.platforms === "both" ? apps.both : apps.android) : apps.notify}
      </SecondaryPill>
    </div>
  );
  const body = (
    <>
      <span className="text-xs font-semibold uppercase tracking-[.12em]" style={{ color: app.color }}>
        {copy.category}
      </span>
      <h3 className={`font-display font-extrabold ${featured ? "text-[44px]" : "text-[34px]"}`}>{app.name}</h3>
      <p className={`leading-normal text-muted ${featured ? "max-w-[380px] text-[15px]" : "text-sm"}`}>{copy.card}</p>
      {pills}
    </>
  );

  return (
    <Link
      href={href(`/projects/${slug}`)}
      className={`sheen group relative flex min-h-[420px] overflow-hidden rounded-card border bg-card text-primary transition-[transform,border-color] duration-300 hover:-translate-y-2 hover:-rotate-[0.4deg] hover:border-white/30 ${
        featured ? "flex-[2_1_560px] flex-wrap" : "flex-[1_1_300px] flex-col"
      } ${app.status === "live" ? "border-border" : "border-dashed"}`}
      style={app.status === "live" ? undefined : { borderColor: `${app.color}80` }}
    >
      {featured ? (
        <>
          <div className="flex flex-[1_1_260px] flex-col gap-3.5 p-8">
            <div className="flex items-center gap-2.5">
              <Image src={app.icon} alt="" width={44} height={44} className="rounded-xl" />
            </div>
            {body}
          </div>
          <CardVisual slug={slug} />
        </>
      ) : (
        <>
          <CardVisual slug={slug} />
          <div className="flex flex-1 flex-col gap-2.5 p-6">{body}</div>
        </>
      )}
    </Link>
  );
}

export function AppsGrid() {
  const { locale } = useLocale();
  const { apps } = contentMap[locale];
  return (
    <section id="apps" className={`${container} reveal scroll-mt-20 pb-10 pt-[72px]`}>
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div className="flex max-w-[720px] flex-col gap-3">
          <Eyebrow>{apps.eyebrow}</Eyebrow>
          <h2 className="font-display text-[clamp(38px,5vw,72px)] font-extrabold">
            {apps.headingStart} <em className="font-semibold italic">{apps.headingEm}</em>
          </h2>
        </div>
        <p className="max-w-[360px] text-[15px] leading-normal text-muted">{apps.sub}</p>
      </div>
      <div className="stagger flex flex-wrap gap-3.5">
        {APP_ORDER.map((slug) => (
          <AppCard key={slug} slug={slug} />
        ))}
      </div>
    </section>
  );
}

export function Reviews() {
  const { locale } = useLocale();
  const { reviews } = contentMap[locale];
  return (
    <section id="reviews" className="reveal overflow-hidden pb-[72px] pt-6">
      <div className={`${container} flex flex-wrap items-end justify-between gap-4 pb-7`}>
        <div className="flex flex-col gap-3">
          <Eyebrow>{reviews.eyebrow}</Eyebrow>
          <h2 className="font-display text-[clamp(36px,4.4vw,64px)] font-extrabold">{reviews.heading}</h2>
        </div>
        <span className="text-[13px] text-dim">{reviews.note}</span>
      </div>
      <div className="marquee overflow-hidden">
        <div className="marquee-track flex w-max animate-marquee-slow gap-4 py-1.5">
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div key={i} aria-hidden={i >= REVIEWS.length || undefined}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ORBITS: { inset: string; spin: string; dots: { app: AppSlug; at: "top" | "bottom" | "left" | "right" }[] }[] = [
  { inset: "0%", spin: "animate-spin-18", dots: [{ app: "pali", at: "top" }, { app: "haki", at: "bottom" }, { app: "offer", at: "left" }] },
  { inset: "17%", spin: "animate-spin-28", dots: [{ app: "fitvibe", at: "top" }, { app: "nextstep", at: "right" }] },
  { inset: "32%", spin: "animate-spin-40", dots: [{ app: "roompace", at: "top" }, { app: "bloomish", at: "bottom" }] },
];
const DOT_POS = {
  top: "left-1/2 -top-[7px] -ml-[7px]",
  bottom: "left-1/2 -bottom-[7px] -ml-[7px]",
  left: "top-1/2 -left-[7px] -mt-[7px]",
  right: "top-1/2 -right-[7px] -mt-[7px]",
};

export function Core() {
  const { locale } = useLocale();
  const { core } = contentMap[locale];
  return (
    <section className={`${container} reveal py-[72px]`}>
      <div className="relative flex flex-wrap items-center gap-10 overflow-hidden rounded-section border border-border bg-card p-[clamp(28px,4vw,64px)]">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-[18px]">
          <Eyebrow>{core.eyebrow}</Eyebrow>
          <h2 className="font-display text-[clamp(36px,4.4vw,64px)] font-extrabold">{core.heading}</h2>
          <p className="max-w-[480px] text-base leading-relaxed text-muted">{core.body}</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {core.chips.map((chip) => (
              <span key={chip} className="inline-flex h-[34px] items-center rounded-full border border-white/15 px-3.5 text-[13px] font-semibold">
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_360px] justify-center" aria-hidden="true">
          <div className="relative aspect-square w-full max-w-[440px]">
            {ORBITS.map((orbit) => (
              <div key={orbit.inset} className={`absolute rounded-full border border-dashed border-white/20 ${orbit.spin}`} style={{ inset: orbit.inset }}>
                {orbit.dots.map((dot) => (
                  <span
                    key={dot.app}
                    className={`absolute h-3.5 w-3.5 rounded-full ${DOT_POS[dot.at]}`}
                    style={{ background: APPS[dot.app].color, boxShadow: `0 0 16px ${APPS[dot.app].color}` }}
                  />
                ))}
              </div>
            ))}
            <div className="absolute inset-[40%] flex items-center justify-center rounded-full border border-white/20 bg-surface text-center shadow-[0_0_60px_rgba(218,255,71,.18)]">
              <span className="font-display text-base font-extrabold leading-tight">
                BMNova
                <br />
                <span className="text-accent">{core.center}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ShipLog() {
  const { locale } = useLocale();
  const { shipLog } = contentMap[locale];
  const format = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  return (
    <section id="shiplog" className={`${container} reveal scroll-mt-20 pb-[72px] pt-10`}>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-3">
          <Eyebrow>{shipLog.eyebrow}</Eyebrow>
          <h2 className="font-display text-[clamp(36px,4.4vw,64px)] font-extrabold">{shipLog.heading}</h2>
        </div>
        <span className="text-[13px] text-dim">{shipLog.note}</span>
      </div>
      <ol className="stagger flex flex-col border-t border-border">
        {SHIP_LOG.map((entry) => {
          const app = APPS[entry.app];
          return (
            <li key={`${entry.date}-${entry.app}`} className="flex flex-wrap items-center gap-4 border-b border-border py-5">
              <time dateTime={entry.date} className="w-[110px] text-[13px] tabular-nums text-dim">
                {format.format(new Date(entry.date))}
              </time>
              <span
                className="inline-flex h-7 items-center rounded-full px-3 text-xs font-bold"
                style={{ background: `${app.color}24`, color: app.color }}
              >
                {app.name}
              </span>
              <span className="flex-[1_1_300px] text-[15px]">{entry.text[locale]}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

const AVATAR_COLORS = ["#5B8CFF", "#FF3EA5"];

export function Studio() {
  const { locale, href } = useLocale();
  const { studio, team } = contentMap[locale];
  return (
    <section id="studio" className={`${container} reveal scroll-mt-20 pb-[72px] pt-10`}>
      <div className="flex flex-wrap items-start gap-12">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-[18px]">
          <Eyebrow>{studio.eyebrow}</Eyebrow>
          <h2 className="font-display text-[clamp(36px,4.4vw,64px)] font-extrabold">
            {studio.heading1}
            <br />
            {studio.heading2}
          </h2>
          <p className="max-w-[480px] text-base leading-relaxed text-muted">{studio.body}</p>
          <ol className="mt-2 flex flex-col gap-2.5">
            {studio.values.map((value, i) => (
              <li key={value} className="flex items-center gap-3 text-[15px]">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-[13px] font-extrabold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {value}
              </li>
            ))}
          </ol>
        </div>
        <div className="stagger flex min-w-0 flex-[1_1_420px] flex-wrap gap-3.5">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="group flex flex-[1_1_200px] flex-col gap-4 rounded-card border border-border bg-card p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-white/30"
            >
              <span
                className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] font-display text-[22px] font-extrabold text-surface transition-[rotate,scale] duration-500 group-hover:[rotate:-6deg] group-hover:[scale:1.08]"
                style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
              >
                {member.initials}
              </span>
              <div className="flex flex-col gap-1">
                <strong className="text-lg font-bold">{member.name}</strong>
                <span className="text-[13px] text-muted">{studio.cofounder}</span>
              </div>
              {member.background && (
                <span className="text-[13px] text-dim">{member.background.map((b) => b.place).join(" · ")}</span>
              )}
            </div>
          ))}
          <div className="flex flex-[1_1_100%] flex-wrap items-center gap-3.5 rounded-card border border-dashed border-white/20 px-7 py-[22px] text-sm text-muted">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/[.06] text-[22px] font-light text-accent">+</span>
            <span className="flex-[1_1_200px]">
              {studio.yourCard}{" "}
              <Link href={href("/careers")} className="text-accent hover:underline">
                {studio.seeRoles}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CareersCta() {
  const { locale, href } = useLocale();
  const { careersCta, careers } = contentMap[locale];
  return (
    <section className={`${container} reveal pb-[72px]`}>
      <div className="relative flex flex-wrap items-center gap-8 overflow-hidden rounded-section bg-accent p-[clamp(32px,5vw,72px)] text-surface">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 animate-drift rounded-full border-[60px] border-surface/[.08]" />
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3.5">
          <span className="text-xs font-bold uppercase tracking-[.14em] opacity-70">{careersCta.eyebrow}</span>
          <h2 className="font-display text-[clamp(38px,5vw,76px)] font-extrabold">{careersCta.heading}</h2>
          <p className="max-w-[520px] text-base leading-normal opacity-85">{careersCta.body}</p>
        </div>
        <Link
          href={href("/careers")}
          className="relative flex flex-[1_1_320px] flex-col gap-2.5 rounded-[20px] bg-surface p-6 text-primary transition-transform duration-300 hover:-translate-y-1.5"
        >
          <span className="text-xs font-semibold uppercase tracking-[.12em] text-muted">{careersCta.openRole}</span>
          <strong className="text-[22px] font-bold tracking-[-0.01em]">{careers.opening.title}</strong>
          <span className="text-sm text-muted">
            {careers.opening.type} · {careers.opening.summary}
          </span>
          <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-accent">
            {careersCta.readRole}
            <ArrowIcon className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
