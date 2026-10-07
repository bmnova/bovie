import { InnerPageLayout } from "@/components/InnerPageLayout";
import { contentMap } from "@/content";
import { pageMetadata, type Locale } from "@/lib/i18n";
import { PrivacyPolicyContent } from "./PrivacyPolicyContent";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return pageMetadata({ locale: params.lang, path: "/privacy-policy", ...contentMap[params.lang].meta.pages.privacy });
}

export default function PrivacyPolicyPage() {
  return (
    <InnerPageLayout>
      <PrivacyPolicyContent />
    </InnerPageLayout>
  );
}
