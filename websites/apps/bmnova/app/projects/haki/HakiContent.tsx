"use client";

import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { StoreBadges } from "@/components/StoreBadges";
import { storeLinks } from "@/config/store-links";
import { ProjectPageShell } from "@/components/ProjectPageShell";

export function HakiContent() {
  const { locale } = useLocale();
  const { haki } = contentMap[locale];
  const badges = (
    <StoreBadges
      googlePlayUrl={storeLinks.haki.googlePlay}
      appStoreUrl={storeLinks.haki.appStore}
    />
  );

  return (
    <ProjectPageShell
      accent="#B60076"
      badge="Manga, Comics, AI Manga Creator"
      title="Haki"
      description={haki.description}
      heroExtras={badges}
      demo={{
        src: "/projects/haki.png",
        alt: haki.demoAlt,
      }}
      featuresEyebrow={haki.eyebrow}
      featuresHeading={haki.heading}
      features={haki.features}
      ctaHeading={haki.ctaHeading}
      ctaSub={haki.ctaSub}
      ctaButton={haki.ctaButton}
      ctaExtras={badges}
    />
  );
}
