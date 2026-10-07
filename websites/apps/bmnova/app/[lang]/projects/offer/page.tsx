import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { AppPage } from "@/components/apps/AppPage";
import { OfferDemo, OfferHeroVisual } from "@/components/apps/offer";
import { appMetadata } from "@/content/apps";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/lib/i18n";
import { getPostsByProduct } from "@/lib/posts";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return appMetadata(params.lang, "offer");
}

export default function OfferPage({ params }: Props) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd("offer")} />
      <AppPage
        slug="offer"
        heroVisual={<OfferHeroVisual />}
        demo={<OfferDemo />}
        related={<ProjectRelatedReading posts={getPostsByProduct("offer")} locale={params.lang} />}
      />
    </>
  );
}
