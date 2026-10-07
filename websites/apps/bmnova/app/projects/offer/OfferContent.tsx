"use client";

import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { StoreBadges } from "@/components/StoreBadges";
import { storeLinks } from "@/config/store-links";
import { ProjectPageShell } from "@/components/ProjectPageShell";

export function OfferContent() {
  const { locale } = useLocale();
  const { offer } = contentMap[locale];
  const badges = (
    <StoreBadges
      googlePlayUrl={storeLinks.offer.googlePlay}
      appStoreUrl={storeLinks.offer.appStore}
    />
  );

  return (
    <ProjectPageShell
      accent="#F59E0B"
      badge="Social, Social Icebreaker, Social Networking"
      title="Offer"
      description={offer.description}
      heroExtras={badges}
      demo={{
        src: "/projects/offer.avif",
        alt: "Offer app",
        imgClassName: "w-full object-cover object-top",
      }}
      featuresEyebrow={offer.eyebrow}
      featuresHeading={offer.heading}
      features={offer.features}
      ctaHeading={offer.ctaHeading}
      ctaSub={offer.ctaSub}
      ctaButton={offer.ctaButton}
      ctaExtras={badges}
    />
  );
}
