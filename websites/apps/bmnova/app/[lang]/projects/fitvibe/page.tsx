import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { AppPage } from "@/components/apps/AppPage";
import { FitVibeDemo, FitVibeHeroVisual } from "@/components/apps/fitvibe";
import { appMetadata } from "@/content/apps";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/lib/i18n";
import { getPostsByProduct } from "@/lib/posts";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return appMetadata(params.lang, "fitvibe");
}

export default function FitVibePage({ params }: Props) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd("fitvibe")} />
      <AppPage
        slug="fitvibe"
        heroVisual={<FitVibeHeroVisual />}
        demo={<FitVibeDemo />}
        related={<ProjectRelatedReading posts={getPostsByProduct("fitvibe")} locale={params.lang} />}
      />
    </>
  );
}
