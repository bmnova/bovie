"use client";

import Image from "next/image";
import Link from "next/link";
import { StoreBadges } from "@/components/StoreBadges";
import { contentMap, fill } from "@/content";
import { APPS, appStore } from "@/content/apps";
import { useLocale } from "@/app/locale-context";
import type { FirstPartyProject } from "@/lib/site";

type PostStoreCtaProps = {
  product: FirstPartyProject;
};

export function PostStoreCta({ product }: PostStoreCtaProps) {
  const { locale, href } = useLocale();
  const { blog } = contentMap[locale];
  const app = APPS[product];
  const store = appStore(app);

  return (
    <aside className="mt-12 flex flex-col items-center gap-4 rounded-card border border-border bg-card px-6 py-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[.14em]" style={{ color: app.color }}>
        {blog.fromStudio}
      </p>
      <Image src={app.icon} alt="" width={56} height={56} className="rounded-2xl" />
      <h2 className="font-display text-2xl font-extrabold text-primary">{app.name}</h2>
      <p className="max-w-md text-sm leading-relaxed text-muted">{app.copy[locale].card}</p>
      <Link href={href(`/projects/${product}`)} className="text-sm font-semibold text-accent transition-opacity hover:opacity-80">
        {fill(blog.learnMore, { name: app.name })}
      </Link>
      {store && (
        <StoreBadges
          className="justify-center"
          googlePlayUrl={store.googlePlay}
          appStoreUrl={"appStore" in store ? store.appStore : undefined}
        />
      )}
    </aside>
  );
}
