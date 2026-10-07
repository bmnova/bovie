import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { AppPage } from "@/components/apps/AppPage";
import { PaliDemo, PaliHeroVisual, PaliInside, PaliWorksWith } from "@/components/apps/pali";
import { appMetadata } from "@/content/apps";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/lib/i18n";
import { getPostsByProduct } from "@/lib/posts";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return appMetadata(params.lang, "pali");
}

export default function PaliPage({ params }: Props) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd("pali")} />
      <AppPage
        slug="pali"
        heroVisual={<PaliHeroVisual />}
        heroExtra={<PaliWorksWith />}
        demo={<PaliDemo />}
        extra={<PaliInside />}
        related={<ProjectRelatedReading posts={getPostsByProduct("pali")} locale={params.lang} />}
      />
    </>
  );
}
