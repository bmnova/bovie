import { InnerPageLayout } from "@/components/InnerPageLayout";
import { contentMap } from "@/content";
import { pageMetadata, type Locale } from "@/lib/i18n";
import { AboutUsContent } from "./AboutUsContent";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return pageMetadata({ locale: params.lang, path: "/about-us", ...contentMap[params.lang].meta.pages.about });
}

export default function AboutUsPage() {
  return (
    <InnerPageLayout>
      <AboutUsContent />
    </InnerPageLayout>
  );
}
