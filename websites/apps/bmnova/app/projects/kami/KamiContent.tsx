"use client";

import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { ProjectPageShell } from "@/components/ProjectPageShell";

export function KamiContent() {
  const { locale } = useLocale();
  const { kami } = contentMap[locale];

  return (
    <ProjectPageShell
      accent="#B60076"
      badge="Mobile · Flutter · AI · Manga"
      title="Kami AI"
      description={kami.description}
      demo={{
        src: "/projects/kami.png",
        alt: kami.demoAlt,
      }}
      featuresEyebrow={kami.eyebrow}
      featuresHeading={kami.heading}
      features={kami.features}
      ctaHeading={kami.ctaHeading}
      ctaSub={kami.ctaSub}
      ctaButton={kami.ctaButton}
    />
  );
}
