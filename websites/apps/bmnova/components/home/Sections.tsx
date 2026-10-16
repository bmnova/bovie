"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { contentMap, fill } from "@/content";
import { APP_ORDER, APPS, REVIEWS, SHIP_LOG, SHOWCASE, appStore, type AppInfo, type AppSlug } from "@/content/apps";
import { useLocale } from "@/app/locale-context";
import { ArrowIcon } from "@/components/icons";
import { FounderSocials } from "@/components/FounderSocials";
import { ReviewCard } from "@/components/ReviewCard";
import { PhoneFrame, ScaledScreen } from "@/components/PhoneFrame";
import { PaliToday } from "@/components/pali/screens";
import { usePrefersReducedMotion } from "@/components/motion";

const container = "mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)]";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-semibold uppercase tracking-[.14em] text-accent">{children}</span>;
}

/** App names scrolling past; pauses on hover. */
export function Ticker() {
  const { locale } = useLocale();
  const items = SHOWCASE.map((slug) => `${APPS[slug].name} · ${APPS[slug].copy[locale].tag}`);
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

/** Renders the target; once the element scrolls into view, counts up to it from zero. */
function useCountUp(target: number, duration = 1100) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(target);

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

/** Radius of the clear hole the pointer makes in the lab glass, in px */
const TORCH = 150;

/** A lab app behind frosted glass; a torch-shaped hole follows the pointer or a dragging finger. */
function LabPeek({ slug }: { slug: AppSlug }) {
  const { locale, href } = useLocale();
  const { apps } = contentMap[locale];
  const app = APPS[slug];
  const copy = app.copy[locale];
  const glass = useRef<HTMLDivElement>(null);
  const aim = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    glass.current?.style.setProperty("--x", `${e.clientX - r.left}px`);
    glass.current?.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  const promise = (
    <span className="max-w-[12ch] font-display text-[clamp(36px,4vw,48px)] font-extrabold">
      {copy.heroBefore} {copy.heroAccent}
    </span>
  );
  const mask = `radial-gradient(circle ${TORCH}px at var(--x) var(--y), transparent 62%, #000)`;

  return (
    <Link
      href={href(`/projects/${slug}`)}
      onPointerDown={aim}
      onPointerMove={aim}
      onPointerLeave={() => glass.current?.style.removeProperty("--x")}
      className="relative flex min-h-[500px] touch-none select-none overflow-hidden rounded-card border border-border bg-card text-primary"
      style={{ backgroundImage: `radial-gradient(80% 90% at 70% 30%, ${app.color}59, transparent)` }}
    >
      {slug === "nextstep" ? (
        <div className="flex flex-1 flex-col justify-center gap-[22px] p-[clamp(24px,4vw,48px)] pb-24">
          <Image src={app.icon} alt="" width={72} height={72} className="rounded-[17px]" />
          {promise}
          <div className="flex max-w-[380px] flex-col gap-2.5 text-[15px] font-semibold">
            {apps.nextStepRows.map((row, i) => (
              <span
                key={row}
                className={`flex h-12 items-center rounded-2xl px-[18px] ${i === 2 ? "font-bold text-surface" : ""}`}
                style={{ background: i === 2 ? app.color : `${app.color}${i ? "52" : "38"}` }}
              >
                {row}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <>
          <Image src="/apps/bloomish/banner.webp" alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3.5 bg-gradient-to-t from-surface/85 to-transparent px-[clamp(24px,4vw,48px)] pb-24 pt-10">
            <Image src={app.icon} alt="" width={64} height={64} className="rounded-[15px]" />
            {promise}
          </div>
        </>
      )}
      <div
        ref={glass}
        aria-hidden="true"
        className="absolute inset-0 bg-card/40 backdrop-blur-[22px] backdrop-saturate-[1.2] [--x:-999px] [--y:-999px]"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />
      <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-center justify-between gap-3">
        <strong className="font-display text-[26px] font-extrabold">{app.name}</strong>
        <StatusPill app={app} />
      </div>
    </Link>
  );
}

/** A retired app: one quiet row under the grid, still linking to its page. */
function ArchivedApp({ slug }: { slug: AppSlug }) {
  const { locale, href } = useLocale();
  const { apps } = contentMap[locale];
  const app = APPS[slug];
  return (
    <Link
      href={href(`/projects/${slug}`)}
      className="group mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-[20px] border border-dashed border-white/15 px-6 py-5 text-primary transition-colors hover:border-white/30"
    >
      <Image src={app.icon} alt="" width={44} height={44} className="rounded-xl opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0" />
      <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-1">
        <span className="flex flex-wrap items-center gap-2.5">
          <strong className="font-display text-xl font-extrabold">{app.name}</strong>
          <SecondaryPill>{apps.status.archived}</SecondaryPill>
        </span>
        <span className="text-sm text-muted">{apps.archiveNote}</span>
      </div>
      <span className="text-sm font-semibold text-muted transition-colors group-hover:text-accent">{apps.open}</span>
    </Link>
  );
}

/** The app screen shown in the story's phone. */
function StoryScreen({ slug }: { slug: AppSlug }) {
  return slug === "pali" ? (
    <ScaledScreen width={390} height={844} decorative>
      <PaliToday interactive={false} />
    </ScaledScreen>
  ) : (
    <div className="relative aspect-[390/844]">
      <Image src={`/apps/${slug}/store-1.webp`} alt="" fill sizes="300px" className="object-cover object-top" />
    </div>
  );
}

/**
 * The live apps as a scroll story: one chapter per app on the left, and on wide screens one sticky
 * phone on the right whose screen slides to the app in view while the section re-tints to its colour.
 */
function AppsStory({ slugs }: { slugs: AppSlug[] }) {
  const { locale } = useLocale();
  const { apps, appPage } = contentMap[locale];
  const reduced = usePrefersReducedMotion();
  const story = useRef<HTMLDivElement>(null);
  const chapters = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [apple, setApple] = useState(false);
  const last = slugs.length - 1;
  // Chapter i fills the view when progress is i / last
  const { scrollYProgress } = useScroll({ target: story, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.round(p * last)));
  // The screen holds while its chapter is in view and slides across in the middle half of the gap
  const y = useTransform(scrollYProgress, (p) => {
    const f = p * last;
    const i = Math.min(Math.floor(f), last - 1);
    const t = Math.min(1, Math.max(0, (f - i - 0.25) / 0.5));
    const eased = reduced ? Math.round(t) : t * t * (3 - 2 * t);
    return `${(-(i + eased) / slugs.length) * 100}%`;
  });

  useEffect(() => setApple(/iPhone|iPad|Macintosh/.test(navigator.userAgent)), []);

  return (
    <div ref={story} className="relative">
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="sticky top-0 h-screen">
          {slugs.map((slug, i) => (
            <div
              key={slug}
              aria-hidden="true"
              className={`absolute inset-0 ${reduced ? "" : "transition-opacity duration-700"}`}
              style={{
                background: `radial-gradient(60% 70% at 78% 50%, ${APPS[slug].color}3D, transparent 70%)`,
                opacity: i === active ? 1 : 0,
              }}
            />
          ))}
          <div className="relative ml-auto flex h-full w-1/2 items-center justify-center gap-12">
            <PhoneFrame className="w-[clamp(240px,32vh,300px)]" screenClassName="bg-black">
              <div className="aspect-[390/844] overflow-hidden">
                <motion.div style={{ y }}>
                  {slugs.map((slug) => (
                    <StoryScreen key={slug} slug={slug} />
                  ))}
                </motion.div>
              </div>
            </PhoneFrame>
            <nav aria-label={apps.storyNav} className="pointer-events-auto flex flex-col gap-1.5">
              {slugs.map((slug, i) => (
                <button
                  key={slug}
                  type="button"
                  aria-current={i === active || undefined}
                  onClick={() => chapters.current[i]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })}
                  className={`flex h-11 items-center gap-3 px-1.5 text-[15px] font-semibold transition-colors hover:text-primary ${i === active ? "text-primary" : "text-dim"}`}
                >
                  <span
                    className="h-[3px] rounded-full transition-[width] duration-300"
                    style={{ width: i === active ? 40 : 16, background: i === active ? APPS[slug].color : "rgb(255 255 255 / .2)" }}
                  />
                  {APPS[slug].name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-20 lg:w-1/2 lg:gap-0">
        {slugs.map((slug, i) => {
          const app = APPS[slug];
          const copy = app.copy[locale];
          const store = appStore(app);
          return (
            <section
              key={slug}
              ref={(el) => {
                chapters.current[i] = el;
              }}
              className={`flex flex-col gap-6 lg:min-h-screen lg:justify-center ${reduced ? "" : "transition-opacity duration-300"} ${i === active ? "" : "lg:opacity-25"}`}
            >
              <div className="flex items-center gap-3.5">
                <Image src={app.icon} alt="" width={56} height={56} className="rounded-[14px]" />
                <span className="flex flex-col gap-0.5">
                  <strong className="text-lg">{app.name}</strong>
                  <span className="text-sm" style={{ color: app.color }}>
                    {copy.tag}
                  </span>
                </span>
              </div>
              <h3 className="max-w-[14ch] font-display text-[clamp(40px,5vw,72px)] font-extrabold">
                {copy.heroBefore} {copy.heroAccent}
              </h3>
              <p className="max-w-[480px] text-[17px] leading-normal text-muted">{copy.card}</p>
              {store && (
                <a
                  href={apple && "appStore" in store ? store.appStore : store.googlePlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-fit items-center rounded-full bg-accent px-[22px] text-[15px] font-bold text-surface transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(218,255,71,.32)]"
                >
                  {fill(appPage.get, { name: app.name })}
                </a>
              )}
              <PhoneFrame className="mt-4 w-[260px] lg:hidden" screenClassName="bg-black">
                <StoryScreen slug={slug} />
              </PhoneFrame>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function AppsGrid() {
  const { locale } = useLocale();
  const { apps } = contentMap[locale];
  const live = APP_ORDER.filter((slug) => APPS[slug].status === "live");
  const lab = APP_ORDER.filter((slug) => APPS[slug].status === "review" || APPS[slug].status === "lab");
  const archived = APP_ORDER.filter((slug) => APPS[slug].status === "archived");
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
      <AppsStory slugs={live} />

      <div className="mb-7 mt-20 flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-3">
          <Eyebrow>{apps.labEyebrow}</Eyebrow>
          <h3 className="font-display text-[clamp(32px,4vw,56px)] font-extrabold">{apps.labHeading}</h3>
        </div>
        <div className="flex max-w-[360px] flex-col gap-2">
          <p className="text-[15px] leading-normal text-muted">{apps.labSub}</p>
          <span className="text-[13px] text-dim">{apps.peekHint}</span>
        </div>
      </div>
      <div className="stagger grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {lab.map((slug) => (
          <LabPeek key={slug} slug={slug} />
        ))}
      </div>

      {archived.map((slug) => (
        <ArchivedApp key={slug} slug={slug} />
      ))}
    </section>
  );
}

/** Where each card lands in the pile: x and y as fractions of the free space, plus a tilt in degrees. */
const PILE: [number, number, number][] = [
  [0.02, 0.1, -4],
  [0.37, 0, 3],
  [0.72, 0.14, -2],
  [0.1, 0.92, 5],
  [0.47, 0.72, -6],
  [0.9, 1, 2],
];

/** Thrown cards spin, but never so far that their text is hard to read. */
const MAX_TILT = 16;

type TossCard = {
  el: HTMLElement;
  home: number;
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  vr: number;
  held: boolean;
  tidying: boolean;
  /** Resting on its pile spot, untouched since the pile was laid out or tidied */
  atHome: boolean;
};

/**
 * Lays the arena's children out as a loose pile of cards that can be grabbed and thrown: they slide,
 * spin and bounce off the arena's edges. Returns the arena ref and a function that tidies the pile.
 */
function useTossPile() {
  const arena = useRef<HTMLDivElement>(null);
  const tidyRef = useRef(() => {});
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const box = arena.current;
    if (!box) return;
    let frame = 0;
    let topZ = box.children.length;
    const cards: TossCard[] = (Array.from(box.children) as HTMLElement[]).map((el, home) => ({
      el,
      home,
      x: 0,
      y: 0,
      r: 0,
      vx: 0,
      vy: 0,
      vr: 0,
      held: false,
      tidying: false,
      atHome: false,
    }));
    let width = box.clientWidth;
    let height = box.clientHeight;
    const maxX = (c: TossCard) => Math.max(0, box.clientWidth - c.el.offsetWidth);
    const maxY = (c: TossCard) => Math.max(0, box.clientHeight - c.el.offsetHeight);
    const spot = (c: TossCard) => {
      const [fx, fy, r] = PILE[c.home % PILE.length];
      // On a phone the arena is about one card wide, so the cards fan out down it in order instead
      const narrow = maxX(c) < 120;
      return { x: fx * maxX(c), y: (narrow ? c.home / (cards.length - 1) : fy) * maxY(c), r };
    };
    const paint = (c: TossCard) => {
      c.el.style.transform = `translate(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px) rotate(${c.r.toFixed(2)}deg)`;
    };
    const keepInside = (c: TossCard) => {
      c.x = Math.min(Math.max(c.x, 0), maxX(c));
      c.y = Math.min(Math.max(c.y, 0), maxY(c));
    };

    const tick = () => {
      let moving = false;
      for (const c of cards) {
        if (c.held) continue;
        if (c.tidying) {
          const to = spot(c);
          c.x += (to.x - c.x) * 0.14;
          c.y += (to.y - c.y) * 0.14;
          c.r += (to.r - c.r) * 0.14;
          if (Math.abs(to.x - c.x) + Math.abs(to.y - c.y) + Math.abs(to.r - c.r) < 0.5) {
            Object.assign(c, to, { tidying: false, atHome: true });
          } else moving = true;
        } else if (Math.abs(c.vx) + Math.abs(c.vy) + Math.abs(c.vr) > 0.05) {
          moving = true;
          c.x += c.vx;
          c.y += c.vy;
          c.r = Math.max(-MAX_TILT, Math.min(MAX_TILT, c.r + c.vr));
          c.vx *= 0.95;
          c.vy *= 0.95;
          c.vr *= 0.93;
          if (c.x < 0 || c.x > maxX(c)) {
            c.vx *= -0.6;
            c.vr *= -1;
          }
          if (c.y < 0 || c.y > maxY(c)) c.vy *= -0.6;
          keepInside(c);
        } else {
          c.vx = c.vy = c.vr = 0;
        }
        paint(c);
      }
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const cleanups = cards.map((c) => {
      let grab = { dx: 0, dy: 0 };
      let last = { x: 0, y: 0, t: 0 };
      let prev = last;
      const at = (e: PointerEvent) => {
        const r = box.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top, t: e.timeStamp };
      };
      const onDown = (e: PointerEvent) => {
        const p = at(e);
        c.el.setPointerCapture(e.pointerId);
        c.held = true;
        c.tidying = false;
        c.atHome = false;
        c.vx = c.vy = c.vr = 0;
        grab = { dx: p.x - c.x, dy: p.y - c.y };
        last = prev = p;
        c.el.style.zIndex = String(++topZ);
      };
      const onMove = (e: PointerEvent) => {
        if (!c.held) return;
        const p = at(e);
        prev = last;
        last = p;
        c.x = p.x - grab.dx;
        c.y = p.y - grab.dy;
        keepInside(c);
        paint(c);
      };
      const onUp = () => {
        if (!c.held) return;
        c.held = false;
        if (reduced) return;
        const frames = Math.max(8, last.t - prev.t) / 16.67;
        c.vx = Math.max(-60, Math.min(60, (last.x - prev.x) / frames));
        c.vy = Math.max(-60, Math.min(60, (last.y - prev.y) / frames));
        c.vr = c.vx * 0.04;
        run();
      };
      c.el.addEventListener("pointerdown", onDown);
      c.el.addEventListener("pointermove", onMove);
      c.el.addEventListener("pointerup", onUp);
      c.el.addEventListener("pointercancel", onUp);
      return () => {
        c.el.removeEventListener("pointerdown", onDown);
        c.el.removeEventListener("pointermove", onMove);
        c.el.removeEventListener("pointerup", onUp);
        c.el.removeEventListener("pointercancel", onUp);
      };
    });

    const place = () => {
      for (const c of cards) {
        Object.assign(c, spot(c), { vx: 0, vy: 0, vr: 0, tidying: false, atHome: true });
        paint(c);
      }
    };
    tidyRef.current = () => {
      if (reduced) return place();
      for (const c of cards) {
        c.vx = c.vy = c.vr = 0;
        c.tidying = true;
      }
      run();
    };
    // When the arena changes size, resting cards move to their spots for the new size and thrown
    // cards keep the same share of the free space they had
    const resize = new ResizeObserver(() => {
      for (const c of cards) {
        if (c.atHome) Object.assign(c, spot(c));
        else {
          const freeX = width - c.el.offsetWidth;
          const freeY = height - c.el.offsetHeight;
          if (freeX > 0) c.x = (c.x / freeX) * maxX(c);
          if (freeY > 0) c.y = (c.y / freeY) * maxY(c);
          keepInside(c);
        }
        paint(c);
      }
      width = box.clientWidth;
      height = box.clientHeight;
    });
    place();
    box.dataset.ready = "";
    resize.observe(box);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [reduced]);

  return { arena, tidy: () => tidyRef.current() };
}

export function Reviews() {
  const { locale } = useLocale();
  const { reviews } = contentMap[locale];
  const { arena, tidy } = useTossPile();
  return (
    <section id="reviews" className="reveal overflow-hidden pb-[72px] pt-6">
      <div className={`${container} flex flex-wrap items-end justify-between gap-4 pb-7`}>
        <div className="flex flex-col gap-3">
          <Eyebrow>{reviews.eyebrow}</Eyebrow>
          <h2 className="font-display text-[clamp(36px,4.4vw,64px)] font-extrabold">{reviews.heading}</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-dim">{reviews.note}</span>
          <button
            type="button"
            onClick={tidy}
            className="h-11 rounded-full border border-white/20 px-5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
          >
            {reviews.tidy}
          </button>
        </div>
      </div>
      <div className={container}>
        <div
          ref={arena}
          className="relative h-[640px] sm:h-[520px] [&>*]:absolute [&>*]:left-0 [&>*]:top-0 [&>*]:cursor-grab [&>*]:select-none [&>*]:opacity-0 [&>*]:[touch-action:pan-y] active:[&>*]:cursor-grabbing [&[data-ready]>*]:opacity-100"
        >
          {REVIEWS.map((review, i) => (
            <div key={i}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Electrons on three tilted orbits; phase is where on its orbit each app starts. */
const ORBITS: { rotate: number; duration: number; reverse?: boolean; electrons: { app: AppSlug; phase: number }[] }[] = [
  { rotate: -22, duration: 9, electrons: [{ app: "pali", phase: 0 }, { app: "haki", phase: 0.33 }, { app: "offer", phase: 0.66 }] },
  { rotate: 38, duration: 12, electrons: [{ app: "fitvibe", phase: 0.12 }, { app: "nextstep", phase: 0.62 }] },
  { rotate: 98, duration: 15, reverse: true, electrons: [{ app: "roompace", phase: 0.27 }, { app: "bloomish", phase: 0.77 }] },
];

/** The core as an atom: tapping pauses it, tapping an electron names the app and links to its page. */
export function Core() {
  const { locale, href } = useLocale();
  const { core, apps } = contentMap[locale];
  const [frozen, setFrozen] = useState(false);
  const [selected, setSelected] = useState<AppSlug | null>(null);
  const picked = selected ? APPS[selected] : null;
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
        <div className="flex min-w-0 flex-[1_1_360px] flex-col items-center gap-4">
          <div
            className={`atom relative aspect-square w-full max-w-[440px] ${frozen || picked ? "atom-paused" : ""}`}
            style={{ "--glow": picked?.color ?? "#DAFF47" } as React.CSSProperties}
            onClick={() => {
              setFrozen(selected ? false : !frozen);
              setSelected(null);
            }}
          >
            <div className="absolute inset-0 animate-atom-sway">
              {[0, -2.25].map((delay) => (
                <div key={delay} className="pointer-events-none absolute inset-[36%] animate-ripple rounded-full border border-accent/50" style={{ animationDelay: `${delay}s` }} />
              ))}
              {ORBITS.map((orbit) => (
                <div key={orbit.rotate} className="pointer-events-none absolute inset-0" style={{ rotate: `${orbit.rotate}deg` }}>
                  <div className="pointer-events-none absolute inset-x-0 inset-y-[31%] animate-spin-60 rounded-full border border-dashed border-white/20" />
                  {orbit.electrons.map(({ app, phase }) => (
                    <button
                      key={app}
                      type="button"
                      aria-label={APPS[app].name}
                      aria-pressed={selected === app}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(selected === app ? null : app);
                      }}
                      className="pointer-events-auto absolute left-0 top-0 h-7 w-7 animate-orbit before:absolute before:right-1/2 before:top-1/2 before:h-[3px] before:w-[54px] before:-translate-y-1/2 before:rounded-full before:bg-[linear-gradient(to_left,var(--c),transparent)] before:opacity-70 before:content-[''] after:absolute after:inset-[7px] after:rounded-full after:bg-[color:var(--c)] after:shadow-[0_0_18px_var(--c)] after:content-['']"
                      style={
                        {
                          "--c": APPS[app].color,
                          "--d": `${orbit.duration}s`,
                          offsetPath: "ellipse(50% 19% at 50% 50%)",
                          offsetRotate: "auto",
                          offsetDistance: `${phase * 100}%`,
                          animationDelay: `${-phase * orbit.duration}s`,
                          animationDirection: orbit.reverse ? "reverse" : undefined,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              ))}
              <div className="pointer-events-none absolute inset-[26%] animate-glow rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--glow)_26%,transparent),transparent_70%)]" />
              <div className="pointer-events-none absolute inset-[36%] flex animate-breathe items-center justify-center rounded-full border border-white/20 bg-surface text-center">
                <div className="absolute inset-[7%] animate-spin-7 rounded-full border-2 border-dotted border-accent/55" />
                <span className="font-display text-base font-extrabold leading-tight">
                  BMNova
                  <br />
                  <span className="text-accent">{core.center}</span>
                </span>
              </div>
            </div>
            {picked && (
              <div className="absolute inset-x-2 bottom-0 flex items-center gap-3 rounded-2xl border border-border bg-surface/90 p-3.5 backdrop-blur" onClick={(e) => e.stopPropagation()}>
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: picked.color }} />
                <div className="min-w-0 flex-1">
                  <strong className="block text-[15px]">{picked.name}</strong>
                  <span className="block truncate text-[13px] text-muted">{picked.copy[locale].tag}</span>
                </div>
                <Link href={href(`/projects/${picked.slug}`)} className="shrink-0 text-[13px] font-semibold text-accent">
                  {apps.open}
                </Link>
              </div>
            )}
          </div>
          <span className="text-[13px] text-dim">{core.hint}</span>
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
              <div className="flex items-center gap-3">
                {member.photo ? (
                  <span className="relative inline-flex h-16 w-16 shrink-0 overflow-hidden rounded-[20px] transition-[rotate,scale] duration-500 group-hover:[rotate:-6deg] group-hover:[scale:1.08]">
                    <Image
                      src={member.photo}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover object-[center_18%]"
                    />
                  </span>
                ) : (
                  <span
                    className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] font-display text-[22px] font-extrabold text-surface transition-[rotate,scale] duration-500 group-hover:[rotate:-6deg] group-hover:[scale:1.08]"
                    style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  >
                    {member.initials}
                  </span>
                )}
                <FounderSocials twitter={member.twitter} linkedin={member.linkedin} />
              </div>
              <div className="flex flex-col gap-1">
                <strong className="text-lg font-bold">{member.name}</strong>
                <span className="text-[13px] text-muted">{studio.founder}</span>
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
