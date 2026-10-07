import { InnerPageLayout } from "@/components/InnerPageLayout";
import { contentMap } from "@/content";
import { pageMetadata, type Locale } from "@/lib/i18n";
import { RefundPolicyContent } from "./RefundPolicyContent";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return pageMetadata({ locale: params.lang, path: "/refund-policy", ...contentMap[params.lang].meta.pages.refund });
}

export default function RefundPolicyPage() {
  return (
    <InnerPageLayout>
      <RefundPolicyContent />
    </InnerPageLayout>
  );
}
