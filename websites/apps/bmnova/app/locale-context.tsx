"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LOCALE, localePath, type Locale } from "@/lib/i18n";

export type { Locale };

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/** The locale comes from the URL (/ or /tr), so every page renders in one language on the server. */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    /** Prefixes an internal path with the current locale; hashes and external links pass through. */
    href: (path: string) => localePath(locale, path),
  };
}
