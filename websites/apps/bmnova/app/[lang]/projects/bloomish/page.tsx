import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { AppPage } from "@/components/apps/AppPage";
import { BloomishDemo, BloomishHeroVisual } from "@/components/apps/bloomish";
import { APPS, appMetadata } from "@/content/apps";
import { faqPageJsonLd, softwareApplicationJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/lib/i18n";
import { getPostsByProduct } from "@/lib/posts";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return appMetadata(params.lang, "bloomish");
}

export default function BloomishPage({ params }: Props) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd("bloomish", params.lang)} />
      <JsonLd data={faqPageJsonLd(APPS.bloomish.copy[params.lang].faqs ?? [])} />
      <AppPage
        slug="bloomish"
        heroVisual={<BloomishHeroVisual />}
        demo={<BloomishDemo />}
        related={<ProjectRelatedReading posts={getPostsByProduct("bloomish", params.lang)} locale={params.lang} />}
      />
    </>
  );
}
