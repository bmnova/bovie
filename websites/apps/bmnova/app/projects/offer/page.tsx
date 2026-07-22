import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import { getPostsByProduct } from "@/lib/posts";
import { OfferContent } from "./OfferContent";

export const metadata: Metadata = {
  title: "Offer — BMNova",
  description:
    "Connect with people around you by offering drinks, snacks, or other items at local businesses. Break the ice and make real connections.",
  alternates: {
    canonical: "/projects/offer",
  },
  openGraph: {
    title: "Offer — BMNova",
    description:
      "Connect with people around you by offering drinks, snacks, or other items at local businesses.",
    url: "/projects/offer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Offer — BMNova",
    description:
      "Connect with people around you by offering drinks, snacks, or other items at local businesses.",
  },
};

export default function OfferPage() {
  const related = getPostsByProduct("offer");

  return (
    <InnerPageLayout>
      <JsonLd data={softwareApplicationJsonLd("offer")} />
      <OfferContent />
      <ProjectRelatedReading posts={related} accent="#F59E0B" />
    </InnerPageLayout>
  );
}
