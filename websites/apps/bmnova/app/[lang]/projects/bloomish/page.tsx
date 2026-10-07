import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { AppPage } from "@/components/apps/AppPage";
import { BloomishDemo, BloomishHeroVisual } from "@/components/apps/bloomish";
import { appMetadata } from "@/content/apps";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/lib/i18n";
import { getPostsByProduct } from "@/lib/posts";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return appMetadata(params.lang, "bloomish");
}

export default function BloomishPage({ params }: Props) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd("bloomish")} />
      <AppPage
        slug="bloomish"
        heroVisual={<BloomishHeroVisual />}
        demo={<BloomishDemo />}
        related={<ProjectRelatedReading posts={getPostsByProduct("bloomish")} locale={params.lang} />}
      />
    </>
  );
}
