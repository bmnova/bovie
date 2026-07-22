"use client";

import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { StoreBadges } from "@/components/StoreBadges";
import { storeLinks } from "@/config/store-links";
import { ProjectPageShell } from "@/components/ProjectPageShell";

export function FitVibeContent() {
  const { locale } = useLocale();
  const { fitvibe } = contentMap[locale];
  const badges = (
    <StoreBadges
      googlePlayUrl={storeLinks.fitvibe.googlePlay}
      appStoreUrl={storeLinks.fitvibe.appStore}
    />
  );

  return (
    <ProjectPageShell
      accent="#F97316"
      badge="Mobile · Flutter · AI · Fashion"
      title="FitVibe"
      description={fitvibe.description}
      heroExtras={badges}
      demo={{
        src: "/projects/fitvibe.png",
        alt: fitvibe.demoAlt,
      }}
      featuresEyebrow={fitvibe.eyebrow}
      featuresHeading={fitvibe.heading}
      features={fitvibe.features}
      ctaHeading={fitvibe.ctaHeading}
      ctaSub={fitvibe.ctaSub}
      ctaButton={fitvibe.ctaButton}
      ctaExtras={badges}
    />
  );
}
