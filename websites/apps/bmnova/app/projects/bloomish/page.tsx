import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import { getPostsByProduct } from "@/lib/posts";
import { BloomishContent } from "./BloomishContent";

export const metadata: Metadata = {
  title: "Bloomish — BMNova",
  description:
    "Generate stunning AI bouquets and send them as gifts. Share moments of joy with anyone, anywhere — beautifully wrapped and personally meaningful.",
  alternates: {
    canonical: "/projects/bloomish",
  },
  openGraph: {
    title: "Bloomish — BMNova",
    description:
      "Generate stunning AI bouquets and send them as gifts.",
    url: "/projects/bloomish",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloomish — BMNova",
    description:
      "Generate stunning AI bouquets and send them as gifts.",
  },
};

export default function BloomishPage() {
  const related = getPostsByProduct("bloomish");

  return (
    <InnerPageLayout>
      <JsonLd data={softwareApplicationJsonLd("bloomish")} />
      <BloomishContent />
      <ProjectRelatedReading posts={related} accent="#F43F5E" />
    </InnerPageLayout>
  );
}
