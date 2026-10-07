import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { AppPage } from "@/components/apps/AppPage";
import { RoomPaceHeroVisual } from "@/components/apps/roompace";
import { APPS, appMetadata } from "@/content/apps";
import { faqPageJsonLd, softwareApplicationJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/lib/i18n";
import { getPostsByProduct } from "@/lib/posts";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return appMetadata(params.lang, "roompace");
}

export default function RoomPacePage({ params }: Props) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd("roompace")} />
      <JsonLd data={faqPageJsonLd(APPS.roompace.copy[params.lang].faqs ?? [])} />
      <AppPage
        slug="roompace"
        heroVisual={<RoomPaceHeroVisual />}
        related={<ProjectRelatedReading posts={getPostsByProduct("roompace", params.lang)} locale={params.lang} />}
      />
    </>
  );
}
