import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { contentMap } from "@/content";
import { faqPageJsonLd } from "@/lib/json-ld";
import { pageMetadata, type Locale } from "@/lib/i18n";
import { AboutUsContent } from "./AboutUsContent";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return pageMetadata({ locale: params.lang, path: "/about-us", ...contentMap[params.lang].meta.pages.about });
}

export default function AboutUsPage({ params }: Props) {
  return (
    <InnerPageLayout>
      <JsonLd data={faqPageJsonLd(contentMap[params.lang].company.faqs)} />
      <AboutUsContent />
    </InnerPageLayout>
  );
}
