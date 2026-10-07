"use client";

import Link from "next/link";
import { useLocale } from "@/app/locale-context";

/** The bmnova wordmark; its dot hops on hover. */
export function Wordmark({ className = "text-[26px]" }: { className?: string }) {
  const { href } = useLocale();
  return (
    <Link
      href={href("/")}
      className={`group flex items-center gap-2.5 font-display font-extrabold tracking-[-0.04em] text-primary ${className}`}
    >
      <span className="inline-block h-3 w-3 rounded-full bg-accent shadow-[0_0_18px_#DAFF47] group-hover:animate-hop" />
      <span>
        bm<span className="text-accent">nova</span>
      </span>
    </Link>
  );
}
