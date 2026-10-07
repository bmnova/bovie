"use client";

import Link from "next/link";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { MouseGlow } from "@/components/motion";

export function Footer() {
  const { locale } = useLocale();
  const { footer } = contentMap[locale];

  return (
    <footer className="relative overflow-hidden border-t border-border px-6 py-8 md:px-12">
      <MouseGlow color="#6366F1" size={400} opacity={0.08} />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-sm font-bold text-primary">
          bm<span className="text-accent">nova</span>
        </span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/careers" className="text-xs text-muted transition-colors hover:text-accent">
            {footer.careers}
          </Link>
          <Link href="/privacy-policy" className="text-xs text-muted transition-colors hover:text-accent">
            {footer.privacyPolicy}
          </Link>
          <Link href="/terms-of-use" className="text-xs text-muted transition-colors hover:text-accent">
            {footer.termsOfUse}
          </Link>
          <Link href="/refund-policy" className="text-xs text-muted transition-colors hover:text-accent">
            {footer.refundPolicy}
          </Link>
          <Link href="/account-data-deletion" className="text-xs text-muted transition-colors hover:text-accent">
            {footer.accountDataDeletion}
          </Link>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
