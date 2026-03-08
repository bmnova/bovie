"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { contentMap } from "@/content";
import { useLocale, type Locale } from "@/app/locale-context";

type NavbarProps = {
  /** When false, hides the "Hire us" CTA (e.g. on inner pages). Default true. */
  showHireUs?: boolean;
};

export function Navbar({ showHireUs = true }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const { nav, navbar } = contentMap[locale];
  const isHome = pathname === "/";

  /** On inner pages, hash links must go to home first (e.g. /#contact). */
  function navHref(href: string) {
    if (isHome) return href;
    return href.startsWith("#") ? `/${href}` : href;
  }

  function toggleLocale() {
    setLocale(locale === "en" ? "tr" : "en");
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border/60 px-6 py-4 backdrop-blur-md md:px-12"
        style={{ backgroundColor: "rgba(248,250,252,0.85)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a href="/" className="font-mono text-lg font-bold tracking-tight text-primary">
          bm<span className="text-accent">nova</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((link) => (
            <a
              key={link.href}
              href={navHref(link.href)}
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Locale toggle */}
          <button
            onClick={toggleLocale}
            className="text-xs font-semibold text-muted transition-colors hover:text-accent"
            aria-label="Switch language"
          >
            {locale === "en" ? "TR" : "EN"}
          </button>

          {showHireUs && (
            <a
              href={navHref("#contact")}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              {navbar.hireUs}
            </a>
          )}

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-0.5 w-5 rounded-full bg-primary"
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block h-0.5 w-5 rounded-full bg-primary"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-5 rounded-full bg-primary"
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-[65px] z-40 border-b border-border bg-surface px-6 py-4 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-1">
              {nav.map((link) => (
                <a
                  key={link.href}
                  href={navHref(link.href)}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-accent/5 hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Re-export Locale type for convenience
export type { Locale };
