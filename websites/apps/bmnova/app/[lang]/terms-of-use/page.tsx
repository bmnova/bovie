import { InnerPageLayout } from "@/components/InnerPageLayout";
import { contentMap } from "@/content";
import { pageMetadata, type Locale } from "@/lib/i18n";
import { TermsOfUseContent } from "./TermsOfUseContent";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return pageMetadata({ locale: params.lang, path: "/terms-of-use", ...contentMap[params.lang].meta.pages.terms });
}

export default function TermsOfUsePage() {
  return (
    <InnerPageLayout>
      <TermsOfUseContent />
    </InnerPageLayout>
  );
}
