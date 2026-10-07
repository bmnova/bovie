import { InnerPageLayout } from "@/components/InnerPageLayout";
import { contentMap } from "@/content";
import { pageMetadata, type Locale } from "@/lib/i18n";
import { CareersContent } from "./CareersContent";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return pageMetadata({ locale: params.lang, path: "/careers", ...contentMap[params.lang].meta.pages.careers });
}

export default function CareersPage() {
  return (
    <InnerPageLayout>
      <CareersContent />
    </InnerPageLayout>
  );
}
