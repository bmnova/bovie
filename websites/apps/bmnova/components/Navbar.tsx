"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { switchLocalePath } from "@/lib/i18n";
import { Wordmark } from "@/components/Wordmark";
import { ArrowIcon } from "@/components/icons";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { locale, href } = useLocale();
  const { nav } = contentMap[locale];
  const other = locale === "en" ? "tr" : "en";

  const links = [
    { label: nav.apps, href: href("/#apps") },
    { label: nav.studio, href: href("/#studio") },
    { label: nav.shipLog, href: href("/#shiplog") },
    { label: nav.careers, href: href("/careers") },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-[clamp(20px,4vw,56px)] py-4">
          <Wordmark />

          <nav className="hidden items-center gap-8 text-[15px] font-medium text-muted md:flex">
            {links.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href={switchLocalePath(pathname, other)}
              hrefLang={other}
              aria-label={nav.switchTo}
              className="inline-flex h-10 items-center rounded-full border border-white/20 px-3.5 text-[13px] font-semibold text-muted transition-colors hover:border-white/50 hover:text-primary"
            >
              {nav.switchLabel}
            </Link>
            <Link
              href={href("/#apps")}
              className="hidden h-10 items-center gap-2 rounded-full bg-accent px-[18px] text-sm font-bold text-surface transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(218,255,71,.32)] sm:inline-flex"
            >
              {nav.getApps}
              <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={nav.menu}
              aria-expanded={open}
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
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-[73px] z-40 border-b border-border bg-surface px-5 py-4 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-white/5 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={href("/#apps")}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-sm font-bold text-surface"
              >
                {nav.getApps}
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
