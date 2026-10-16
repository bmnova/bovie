"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contentMap } from "@/content";
import { APP_ORDER, APPS } from "@/content/apps";
import { useLocale } from "@/app/locale-context";
import { switchLocalePath, type Locale } from "@/lib/i18n";
import { Wordmark } from "@/components/Wordmark";
import { usePrefersReducedMotion } from "@/components/motion";

const CONTACT_EMAIL = "contact@bmnova.com";

/** Resting and lit colours of the big wordmark's letters (lit is the accent). */
const LETTER_REST = [43, 42, 60];
const LETTER_LIT = [218, 255, 71];

/**
 * The wordmark set huge across the footer. The letter nearest the pointer swells, widens and turns
 * lime through Bricolage's weight and width axes; with no pointer a slow wave runs through it.
 */
function LivingWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const letters = Array.from(el.children) as HTMLElement[];
    let pointer: number | null = null;
    let visible = false;
    let frame = 0;

    // The run of letters from the first one's left edge to the last one's right edge
    const span = () => {
      const left = letters[0].getBoundingClientRect().left;
      return { left, width: letters[letters.length - 1].getBoundingClientRect().right - left };
    };
    // Lights the letters around a horizontal position given as a fraction of the letters' span.
    const light = (at: number) => {
      const box = span();
      for (const letter of letters) {
        const r = letter.getBoundingClientRect();
        const centre = (r.left + r.width / 2 - box.left) / box.width;
        const k = Math.max(0, 1 - Math.abs(at - centre) / 0.3) ** 1.5;
        letter.style.fontVariationSettings = `"opsz" 96, "wght" ${Math.round(300 + 500 * k)}, "wdth" ${(85 + 15 * k).toFixed(1)}`;
        letter.style.color = `rgb(${LETTER_REST.map((v, i) => Math.round(v + (LETTER_LIT[i] - v) * k)).join(" ")})`;
      }
    };
    const start = performance.now();
    const tick = (now: number) => {
      light(pointer ?? 0.5 + 0.55 * Math.sin(((now - start) / 1000) * 0.8));
      frame = visible && !reduced ? requestAnimationFrame(tick) : 0;
    };
    const run = () => {
      if (!frame && visible && !reduced) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      run();
    });
    observer.observe(el);
    const onMove = (e: PointerEvent) => {
      const box = span();
      pointer = (e.clientX - box.left) / box.width;
      if (reduced) light(pointer);
    };
    const onLeave = () => {
      pointer = null;
      if (reduced) light(0.5);
    };
    light(0.5);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="mx-auto flex max-w-[1440px] select-none justify-center overflow-hidden px-[clamp(20px,4vw,56px)] pt-6 font-display text-[clamp(104px,30vw,420px)] leading-[0.8] tracking-[-0.02em] [&>span]:transition-[font-variation-settings,color] [&>span]:duration-300 motion-reduce:[&>span]:transition-none"
    >
      {"bmnova".split("").map((ch, i) => (
        <span key={i} className="text-[#2B2A3C]">
          {ch}
        </span>
      ))}
    </div>
  );
}

/** Carries id="contact": the stores list bmnova.com/#contact as the support URL. */
export function Footer({ localeHrefs }: { localeHrefs?: Record<Locale, string> }) {
  const { locale, href } = useLocale();
  const pathname = usePathname();
  const { footer } = contentMap[locale];

  const columns = [
    {
      title: footer.apps,
      links: APP_ORDER.map((slug) => ({ label: APPS[slug].name, href: href(`/projects/${slug}`) })),
    },
    {
      title: footer.studio,
      links: [
        { label: footer.about, href: href("/about-us") },
        { label: footer.shipLog, href: href("/#shiplog") },
        { label: footer.blog, href: href("/blog") },
        { label: footer.careers, href: href("/careers") },
      ],
    },
    {
      title: footer.legal,
      links: [
        { label: footer.privacyPolicy, href: href("/privacy-policy") },
        { label: footer.termsOfUse, href: href("/terms-of-use") },
        { label: footer.refundPolicy, href: href("/refund-policy") },
        { label: footer.accountDataDeletion, href: href("/account-data-deletion") },
        { label: footer.paliFaq, href: href("/pali/faq") },
      ],
    },
  ];

  return (
    <footer id="contact" className="border-t border-border bg-deep">
      <div className="mx-auto flex max-w-[1440px] flex-wrap gap-10 px-[clamp(20px,4vw,56px)] pb-8 pt-14">
        <div className="flex min-w-[260px] flex-[2_1_280px] flex-col gap-4">
          <Wordmark className="text-[30px]" />
          <p className="max-w-xs text-sm leading-relaxed text-muted">{footer.tagline}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-soft transition-colors hover:text-accent">
            {CONTACT_EMAIL}
          </a>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="flex flex-[1_1_150px] flex-col gap-2.5 text-sm text-muted">
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-primary">{col.title}</p>
            {col.links.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <LivingWordmark />
      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-3 px-[clamp(20px,4vw,56px)] pb-8 pt-6 text-[13px] text-dim">
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} {footer.copyright}
        </span>
        <span className="flex gap-3">
          <Link
            href={localeHrefs?.en ?? switchLocalePath(pathname, "en")}
            hrefLang="en"
            className={locale === "en" ? "text-primary" : "transition-colors hover:text-accent"}
          >
            EN
          </Link>
          <Link
            href={localeHrefs?.tr ?? switchLocalePath(pathname, "tr")}
            hrefLang="tr"
            className={locale === "tr" ? "text-primary" : "transition-colors hover:text-accent"}
          >
            TR
          </Link>
        </span>
      </div>
    </footer>
  );
}
