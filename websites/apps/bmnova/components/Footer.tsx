"use client";

import Link from "next/link";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function Footer() {
  const { locale } = useLocale();
  const { footer } = contentMap[locale];

  return (
    <footer className="border-t border-border px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <span className="font-mono text-sm font-bold text-primary">
          bm<span className="text-accent">nova</span>
        </span>
        <div className="flex items-center gap-6">
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
