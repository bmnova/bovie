import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import { getPostsByProduct } from "@/lib/posts";
import { RoomPaceContent } from "./RoomPaceContent";

export const metadata: Metadata = {
  title: "RoomPace — BMNova",
  description:
    "AI interior design app that plans room makeovers to your budget. Upload a photo, get AI layouts, and build a shoppable wishlist.",
  alternates: {
    canonical: "/projects/roompace",
  },
  openGraph: {
    title: "RoomPace — BMNova",
    description:
      "AI interior design app that plans room makeovers to your budget.",
    url: "/projects/roompace",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoomPace — BMNova",
    description:
      "AI interior design app that plans room makeovers to your budget.",
  },
};

export default function RoomPacePage() {
  const related = getPostsByProduct("roompace");

  return (
    <InnerPageLayout>
      <JsonLd data={softwareApplicationJsonLd("roompace")} />
      <RoomPaceContent />
      <ProjectRelatedReading posts={related} accent="#153328" />
    </InnerPageLayout>
  );
}
