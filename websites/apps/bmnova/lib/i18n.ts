import type { Metadata } from "next";

export const LOCALES = ["en", "tr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** English lives at the root, Turkish under /tr. Hash and external links pass through. */
export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return path;
  if (locale === DEFAULT_LOCALE) return path;
  const [pathname, hash] = path.split("#");
  const prefixed = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return hash === undefined ? prefixed : `${prefixed}#${hash}`;
}

/** The same page in the other locale, for the language switch. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const bare = pathname.replace(/^\/(en|tr)(?=\/|$)/, "") || "/";
  return localePath(target, bare);
}

export const LOCALE_PARAMS = LOCALES.map((lang) => ({ lang }));

type PageMetaInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
};

/** Canonical, hreflang alternates, Open Graph and Twitter for one localized page. */
export function pageMetadata({ locale, path, title, description }: PageMetaInput): Metadata {
  const url = localePath(locale, path);
  const image = `/${locale}/opengraph-image`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: localePath("en", path),
        tr: localePath("tr", path),
        "x-default": localePath("en", path),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "BMNova",
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image,
    },
  };
}
