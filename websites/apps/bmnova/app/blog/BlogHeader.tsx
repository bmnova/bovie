"use client";

import Link from "next/link";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function BlogHeader() {
  const { locale } = useLocale();
  const { blog } = contentMap[locale];

  return (
    <>
      <Link
        href="/"
        className="mb-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        {blog.back}
      </Link>
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-primary">
        {blog.title}
      </h1>
      <p className="mb-16 text-lg text-muted">{blog.subtitle}</p>
    </>
  );
}
