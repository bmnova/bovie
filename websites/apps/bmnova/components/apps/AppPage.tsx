"use client";

import Image from "next/image";
import Link from "next/link";
import { contentMap, fill } from "@/content";
import { APP_ORDER, APPS, REVIEWS, appStore, type AppSlug } from "@/content/apps";
import { useLocale } from "@/app/locale-context";
import { ArrowLeftIcon, FeatureIcon } from "@/components/icons";
import { StoreBadges } from "@/components/StoreBadges";
import { ReviewCard } from "@/components/ReviewCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const container = "mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)]";

/** Where the hero stickers float around the phone, in order. */
const STICKER_SPOTS = [
  "left-0 top-16 -rotate-[10deg]",
  "right-0 top-32 rotate-[8deg]",
  "left-[6%] bottom-28 rotate-[6deg]",
  "right-[4%] bottom-16 -rotate-[6deg]",
];

type AppPageProps = {
  slug: AppSlug;
  /** The phone or picture on the right of the hero */
  heroVisual: React.ReactNode;
  /** Extra hero content under the body copy, e.g. supported medications */
  heroExtra?: React.ReactNode;
  /** The playable "Try it" section */
  demo?: React.ReactNode;
  /** A section after the features, e.g. the coach roster */
  extra?: React.ReactNode;
  /** Related blog posts, rendered on the server */
  related?: React.ReactNode;
};

function Eyebrow({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[.14em]" style={{ color }}>
      {children}
    </span>
  );
}

/** The rounded "Try it" panel that holds an app's playable demo. */
export function DemoSection({
  slug,
  heading,
  note,
  children,
}: {
  slug: AppSlug;
  heading: string;
  note?: string;
  children: React.ReactNode;
}) {
  const { locale } = useLocale();
  const { appPage } = contentMap[locale];
  return (
    <section className={`${container} reveal pb-[72px]`}>
      <div className="flex flex-col gap-6 rounded-section border border-border bg-card p-[clamp(24px,4vw,56px)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <Eyebrow color={APPS[slug].color}>{appPage.tryIt}</Eyebrow>
            <h2 className="font-display text-[clamp(30px,3.6vw,52px)] font-extrabold">{heading}</h2>
          </div>
          {note && <span className="max-w-md text-sm text-muted">{note}</span>}
        </div>
        {children}
      </div>
    </section>
  );
}

/** A selectable pill used across the demos. */
export function Chip({
  on,
  color,
  onClick,
  children,
  className = "",
}: {
  on: boolean;
  color: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-3.5 text-[13px] font-semibold transition-[transform,background,color,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/40 ${className}`}
      style={on ? { background: color, color: "#0B0B12" } : { background: "rgba(255,255,255,.06)", color: "#F3F2FA" }}
    >
      {children}
    </button>
  );
}

export function AppPage({ slug, heroVisual, heroExtra, demo, extra, related }: AppPageProps) {
  const { locale, href } = useLocale();
  const { appPage } = contentMap[locale];
  const app = APPS[slug];
  const copy = app.copy[locale];
  const store = appStore(app);
  const reviews = REVIEWS.filter((r) => r.app === slug);
  const waitlist = `mailto:contact@bmnova.com?subject=${encodeURIComponent(`${app.name} ${app.status === "lab" ? "early access" : "launch"}`)}`;
  const statusLine =
    app.status === "live"
      ? app.platforms === "both"
        ? appPage.liveBoth
        : appPage.liveAndroid
      : app.status === "archived"
        ? appPage.archived
        : app.status === "review"
          ? appPage.inReview
          : appPage.inLab;

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero */}
        <section className={`${container} relative pb-[72px] pt-[110px]`}>
          <div
            className="pointer-events-none absolute left-[44%] -top-[30%] z-0 aspect-square w-[60vw] max-w-[900px] animate-glow rounded-full blur-[130px]"
            style={{ background: app.color }}
          />
          <Link href={href("/#apps")} className="relative z-[2] mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent">
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            {appPage.allApps}
          </Link>
          <div className="relative z-[2] flex flex-wrap items-center gap-14">
            <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[26px]">
              <div className="hero-in flex items-center gap-4">
                <Image
                  src={app.icon}
                  alt={`${app.name} app icon`}
                  width={84}
                  height={84}
                  priority
                  className="rounded-[22px] shadow-[0_20px_40px_rgba(0,0,0,.5),0_0_0_1px_rgba(255,255,255,.15)]"
                />
                <div className="flex flex-col gap-1.5">
                  <span className="font-display text-[30px] font-extrabold">{app.name}</span>
                  <Eyebrow color={app.color}>{copy.category}</Eyebrow>
                </div>
              </div>
              <h1 className="hero-in hero-in-2 max-w-[13ch] font-display text-[clamp(44px,6.2vw,92px)] font-extrabold">
                {copy.heroBefore} <span style={{ color: app.color }}>{copy.heroAccent}</span>
              </h1>
              <p className="hero-in hero-in-3 max-w-[560px] text-[clamp(16px,1.3vw,19px)] leading-normal text-muted">{copy.heroBody}</p>
              {heroExtra && <div className="hero-in hero-in-3">{heroExtra}</div>}
              <div className="hero-in hero-in-4">
                {store ? (
                  <StoreBadges googlePlayUrl={store.googlePlay} appStoreUrl={"appStore" in store ? store.appStore : undefined} />
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={waitlist}
                      className="inline-flex h-14 items-center rounded-2xl px-6 text-[15px] font-bold text-surface transition-transform duration-300 hover:-translate-y-0.5"
                      style={{ background: app.color }}
                    >
                      {app.status === "lab" ? appPage.earlyAccess : appPage.notify}
                    </a>
                    <span className="inline-flex h-14 items-center rounded-2xl border border-dashed border-white/25 px-5 text-sm font-semibold text-muted">
                      {statusLine}
                    </span>
                  </div>
                )}
              </div>
              <div className="hero-in hero-in-5 flex flex-wrap gap-[18px] text-[13px] text-muted">
                {store && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: app.color }} />
                    {statusLine}
                  </span>
                )}
                {copy.facts.map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
                <span>{appPage.madeIn}</span>
              </div>
            </div>

            <div className="flex min-w-0 flex-[1_1_420px] justify-center">
              <div className="relative flex w-full max-w-[540px] justify-center py-8">
                {copy.stickers.map((sticker, i) => (
                  <span
                    key={sticker}
                    className={`absolute z-[3] hidden animate-floaty rounded-full px-4 py-2.5 text-[13px] font-extrabold shadow-[0_16px_30px_rgba(0,0,0,.4)] sm:block ${STICKER_SPOTS[i % STICKER_SPOTS.length]}`}
                    style={{
                      animationDelay: `${-1.4 * i}s`,
                      background: i === 1 ? app.color : "#F3F2FA",
                      color: "#0B0B12",
                    }}
                  >
                    {sticker}
                  </span>
                ))}
                {heroVisual}
              </div>
            </div>
          </div>
        </section>

        {demo}

        {/* How it works */}
        <section className={`${container} reveal pb-[72px]`}>
          <div className="mb-8 flex flex-col gap-3">
            <Eyebrow color={app.color}>{appPage.howItWorks}</Eyebrow>
            <h2 className="font-display text-[clamp(34px,4vw,60px)] font-extrabold">{copy.stepsTitle}</h2>
          </div>
          <ol className="stagger flex flex-wrap gap-3.5">
            {copy.steps.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-[1_1_220px] flex-col gap-3.5 rounded-[22px] border border-border bg-card p-[26px] transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-white/30"
              >
                <span className="font-display text-[44px] font-extrabold" style={{ color: app.color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <strong className="text-lg font-bold">{step.title}</strong>
                <span className="text-sm leading-normal text-muted">{step.body}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section className={`${container} reveal pb-[72px]`}>
          <div className="mb-8 flex max-w-[760px] flex-col gap-3">
            <Eyebrow color={app.color}>{fill(appPage.whatItDoes, { name: app.name })}</Eyebrow>
            <h2 className="font-display text-[clamp(34px,4.4vw,64px)] font-extrabold">{copy.featuresTitle}</h2>
          </div>
          <div className="stagger flex flex-wrap gap-3.5">
            {copy.features.map((feature) => (
              <div
                key={feature.title}
                className={`sheen flex min-h-[220px] flex-col gap-3.5 rounded-card border border-border bg-card p-8 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-white/30 ${
                  feature.wide ? "flex-[2_1_420px]" : "flex-[1_1_300px]"
                }`}
              >
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-[14px]"
                  style={{ background: `${app.color}29`, color: app.color }}
                >
                  <FeatureIcon name={feature.icon} className="h-[22px] w-[22px]" />
                </span>
                <strong className="flex items-center gap-2 text-[22px] font-bold tracking-[-0.01em]">
                  {feature.title}
                  {feature.plus && (
                    <span className="rounded-full px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-[.1em] text-surface" style={{ background: app.color }}>
                      {appPage.plus}
                    </span>
                  )}
                </strong>
                <span className="max-w-[520px] text-[15px] leading-relaxed text-muted">{feature.body}</span>
              </div>
            ))}
          </div>
        </section>

        {extra}

        {app.screenshots.length > 0 && (
          <section className={`${container} reveal pb-[72px]`}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(28px,3vw,40px)] font-extrabold">{appPage.storeListing}</h2>
              <span className="text-[13px] text-dim">{appPage.storeNote}</span>
            </div>
            <div className="strip flex snap-x gap-4 overflow-x-auto pb-2">
              {app.screenshots.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${app.name} screenshot ${i + 1}`}
                  width={415}
                  height={900}
                  sizes="260px"
                  className="w-[260px] max-w-[64vw] shrink-0 snap-start rounded-3xl border border-white/10 transition-transform duration-300 hover:-translate-y-1.5"
                />
              ))}
            </div>
          </section>
        )}

        {reviews.length > 0 && (
          <section className={`${container} reveal pb-[72px]`}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(28px,3vw,40px)] font-extrabold">{fill(appPage.reviewsHeading, { name: app.name })}</h2>
              <span className="text-[13px] text-dim">{appPage.reviewsNote}</span>
            </div>
            <div className="strip flex snap-x gap-4 overflow-x-auto pb-2">
              {reviews.map((review, i) => (
                <div key={i} className="snap-start">
                  <ReviewCard review={review} showApp={false} />
                </div>
              ))}
            </div>
          </section>
        )}

        {copy.faqs && (
          <section className={`${container} reveal pb-[72px]`}>
            <h2 className="mb-6 font-display text-[clamp(28px,3vw,40px)] font-extrabold">{fill(appPage.faqHeading, { name: app.name })}</h2>
            <div className="flex max-w-[860px] flex-col gap-3">
              {copy.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-[20px] border border-border bg-card px-6 py-5">
                  <summary className="cursor-pointer list-none text-[17px] font-semibold text-primary">{faq.question}</summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {related}

        {/* More from BMNova */}
        <section className={`${container} reveal pb-[72px]`}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(28px,3vw,40px)] font-extrabold">{appPage.moreFrom}</h2>
            <Link href={href("/#apps")} className="text-sm font-semibold text-muted transition-colors hover:text-accent">
              {appPage.allSeven}
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {APP_ORDER.filter((s) => s !== slug).map((s) => {
              const other = APPS[s];
              return (
                <Link
                  key={s}
                  href={href(`/projects/${s}`)}
                  className="flex flex-[1_1_170px] items-center gap-3 rounded-[18px] border border-border bg-card p-[18px] text-primary transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-white/30"
                >
                  <Image src={other.icon} alt="" width={40} height={40} className="rounded-xl" />
                  <span className="flex flex-col gap-0.5">
                    <strong className="text-[15px]">{other.name}</strong>
                    <span className="text-xs text-muted">{other.copy[locale].tag}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section id="get" className={`${container} reveal pb-[72px]`}>
          <div
            className="relative flex flex-col items-center gap-[22px] overflow-hidden rounded-section p-[clamp(36px,5vw,80px)] text-center text-surface"
            style={{ background: app.color }}
          >
            <div className="pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] animate-drift rounded-full border-[70px] border-surface/[.08]" />
            <h2 className="relative max-w-[14ch] font-display text-[clamp(40px,5.6vw,88px)] font-extrabold">{copy.ctaTitle}</h2>
            <p className="relative max-w-[520px] text-base leading-normal opacity-85">{copy.ctaBody}</p>
            <div className="relative">
              {store ? (
                <StoreBadges tone="dark" googlePlayUrl={store.googlePlay} appStoreUrl={"appStore" in store ? store.appStore : undefined} />
              ) : (
                <a
                  href={waitlist}
                  className="inline-flex h-14 items-center rounded-2xl bg-surface px-6 text-base font-bold text-primary transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {app.status === "lab" ? appPage.earlyAccess : appPage.notify}
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
