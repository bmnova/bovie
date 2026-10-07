import { InnerPageLayout } from "@/components/InnerPageLayout";
import { contentMap } from "@/content";
import { pageMetadata, type Locale } from "@/lib/i18n";
import { AccountDataDeletionContent } from "./AccountDataDeletionContent";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return pageMetadata({ locale: params.lang, path: "/account-data-deletion", ...contentMap[params.lang].meta.pages.deletion });
}

export default function AccountDataDeletionPage() {
  return (
    <InnerPageLayout>
      <AccountDataDeletionContent />
    </InnerPageLayout>
  );
}
