import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import { getPostsByProduct } from "@/lib/posts";
import { HakiContent } from "./HakiContent";

export const metadata: Metadata = {
  title: "Haki — BMNova",
  description:
    "AI manga comics generator. Script your story, define your protagonist, pick a visual style, and generate full comic panels.",
  alternates: {
    canonical: "/projects/haki",
  },
  openGraph: {
    title: "Haki — BMNova",
    description:
      "AI manga comics generator. Script your story and generate full comic panels.",
    url: "/projects/haki",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haki — BMNova",
    description:
      "AI manga comics generator. Script your story and generate full comic panels.",
  },
};

export default function HakiPage() {
  const related = getPostsByProduct("haki");

  return (
    <InnerPageLayout>
      <JsonLd data={softwareApplicationJsonLd("haki")} />
      <HakiContent />
      <ProjectRelatedReading posts={related} accent="#B60076" />
    </InnerPageLayout>
  );
}
