"use client";

import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function BlogHeader() {
  const { locale } = useLocale();
  const { blog } = contentMap[locale];

  return (
    <>
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-primary">
        {blog.title}
      </h1>
      <p className="mb-16 text-lg text-muted">{blog.subtitle}</p>
    </>
  );
}
