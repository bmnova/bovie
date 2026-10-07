import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { AppPage } from "@/components/apps/AppPage";
import { NextStepCoaches, NextStepDemo, NextStepHeroVisual } from "@/components/apps/nextstep";
import { APPS, appMetadata } from "@/content/apps";
import { faqPageJsonLd, softwareApplicationJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/lib/i18n";
import { getPostsByProduct } from "@/lib/posts";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return appMetadata(params.lang, "nextstep");
}

export default function NextStepPage({ params }: Props) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd("nextstep", params.lang)} />
      <JsonLd data={faqPageJsonLd(APPS.nextstep.copy[params.lang].faqs ?? [])} />
      <AppPage
        slug="nextstep"
        heroVisual={<NextStepHeroVisual />}
        demo={<NextStepDemo />}
        extra={<NextStepCoaches />}
        related={<ProjectRelatedReading posts={getPostsByProduct("nextstep", params.lang)} locale={params.lang} />}
      />
    </>
  );
}
