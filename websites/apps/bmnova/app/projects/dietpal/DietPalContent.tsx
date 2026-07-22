"use client";

import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { StoreBadges } from "@/components/StoreBadges";
import { storeLinks } from "@/config/store-links";
import { ProjectPageShell } from "@/components/ProjectPageShell";

export function DietPalContent() {
  const { locale } = useLocale();
  const { dietpal } = contentMap[locale];
  const badges = (
    <StoreBadges
      googlePlayUrl={storeLinks.dietpal.googlePlay}
      appStoreUrl={storeLinks.dietpal.appStore}
    />
  );

  return (
    <ProjectPageShell
      accent="#10B981"
      badge="Mobile · Flutter · AI"
      title="DietPal"
      description={dietpal.description}
      heroExtras={badges}
      demo={{
        src: "/projects/dietmate.gif",
        alt: dietpal.demoAlt,
      }}
      featuresEyebrow={dietpal.eyebrow}
      featuresHeading={dietpal.heading}
      features={dietpal.features}
      ctaHeading={dietpal.ctaHeading}
      ctaSub={dietpal.ctaSub}
      ctaButton={dietpal.ctaButton}
      ctaExtras={badges}
    />
  );
}
