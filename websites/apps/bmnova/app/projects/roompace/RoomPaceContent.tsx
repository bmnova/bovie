"use client";

import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { StoreBadges } from "@/components/StoreBadges";
import { storeLinks } from "@/config/store-links";
import { ProjectPageShell } from "@/components/ProjectPageShell";

export function RoomPaceContent() {
  const { locale } = useLocale();
  const { roompace } = contentMap[locale];
  const badges = (
    <StoreBadges
      googlePlayUrl={storeLinks.roompace.googlePlay}
      appStoreUrl={storeLinks.roompace.appStore}
    />
  );

  return (
    <ProjectPageShell
      accent="#153328"
      badge="Mobile · Flutter · AI · Interior Design"
      title="RoomPace"
      description={roompace.description}
      heroExtras={badges}
      demo={{
        src: "/projects/roompace.png",
        alt: roompace.demoAlt,
      }}
      featuresEyebrow={roompace.eyebrow}
      featuresHeading={roompace.heading}
      features={roompace.features}
      ctaHeading={roompace.ctaHeading}
      ctaSub={roompace.ctaSub}
      ctaButton={roompace.ctaButton}
      ctaExtras={badges}
    />
  );
}
