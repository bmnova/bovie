import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import { getPostsByProduct } from "@/lib/posts";
import { KamiContent } from "./KamiContent";

export const metadata: Metadata = {
  title: "Kami AI — BMNova",
  description:
    "AI manga comics generator. Script your story, define your protagonist, pick a visual style, and generate full comic panels.",
  alternates: {
    canonical: "/projects/kami",
  },
  openGraph: {
    title: "Kami AI — BMNova",
    description:
      "AI manga comics generator. Script your story and generate full comic panels.",
    url: "/projects/kami",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kami AI — BMNova",
    description:
      "AI manga comics generator. Script your story and generate full comic panels.",
  },
};

export default function KamiPage() {
  const related = getPostsByProduct("kami");

  return (
    <InnerPageLayout>
      <JsonLd data={softwareApplicationJsonLd("kami")} />
      <KamiContent />
      <ProjectRelatedReading posts={related} accent="#B60076" />
    </InnerPageLayout>
  );
}
