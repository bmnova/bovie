"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contentMap } from "@/content";
import { APP_ORDER, APPS } from "@/content/apps";
import { useLocale } from "@/app/locale-context";
import { switchLocalePath, type Locale } from "@/lib/i18n";
import { Wordmark } from "@/components/Wordmark";

const CONTACT_EMAIL = "contact@bmnova.com";

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
      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-3 px-[clamp(20px,4vw,56px)] pb-8 text-[13px] text-dim">
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
