import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { AppPage } from "@/components/apps/AppPage";
import { HakiDemo, HakiHeroVisual } from "@/components/apps/haki";
import { appMetadata } from "@/content/apps";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/lib/i18n";
import { getPostsByProduct } from "@/lib/posts";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return appMetadata(params.lang, "haki");
}

export default function HakiPage({ params }: Props) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd("haki")} />
      <AppPage
        slug="haki"
        heroVisual={<HakiHeroVisual />}
        demo={<HakiDemo />}
        related={<ProjectRelatedReading posts={getPostsByProduct("haki")} locale={params.lang} />}
      />
    </>
  );
}
