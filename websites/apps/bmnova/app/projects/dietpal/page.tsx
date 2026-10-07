import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import { getPostsByProduct } from "@/lib/posts";
import { DietPalContent } from "./DietPalContent";

export const metadata: Metadata = {
  title: "DietPal — BMNova",
  description:
    "AI-powered diet app that personalizes your plan based on your needs and lifestyle. Track food, exercise, and well-being with ease.",
  alternates: {
    canonical: "/projects/dietpal",
  },
  openGraph: {
    title: "DietPal — BMNova",
    description:
      "AI-powered diet app that personalizes your plan based on your needs and lifestyle.",
    url: "/projects/dietpal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DietPal — BMNova",
    description:
      "AI-powered diet app that personalizes your plan based on your needs and lifestyle.",
  },
};

export default function DietPalPage() {
  const related = getPostsByProduct("dietpal");

  return (
    <InnerPageLayout>
      <JsonLd data={softwareApplicationJsonLd("dietpal")} />
      <DietPalContent />
      <ProjectRelatedReading posts={related} accent="#10B981" />
    </InnerPageLayout>
  );
}
