"use client";

import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { ProjectPageShell } from "@/components/ProjectPageShell";

export function HakiContent() {
  const { locale } = useLocale();
  const { haki } = contentMap[locale];

  return (
    <ProjectPageShell
      accent="#B60076"
      badge="Manga, Comics, AI Manga Creator"
      title="Haki"
      description={haki.description}
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
    />
  );
}
