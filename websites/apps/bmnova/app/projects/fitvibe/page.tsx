import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import { getPostsByProduct } from "@/lib/posts";
import { FitVibeContent } from "./FitVibeContent";

export const metadata: Metadata = {
  title: "FitVibe — BMNova",
  description:
    "AI-powered digital wardrobe app. Add clothes, get outfit combinations, discover wardrobe gaps, and virtually try on looks.",
  alternates: {
    canonical: "/projects/fitvibe",
  },
  openGraph: {
    title: "FitVibe — BMNova",
    description:
      "AI-powered digital wardrobe app. Add clothes, get outfit combinations, and virtually try on looks.",
    url: "/projects/fitvibe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitVibe — BMNova",
    description:
      "AI-powered digital wardrobe app. Add clothes, get outfit combinations, and virtually try on looks.",
  },
};

export default function FitVibePage() {
  const related = getPostsByProduct("fitvibe");

  return (
    <InnerPageLayout>
      <JsonLd data={softwareApplicationJsonLd("fitvibe")} />
      <FitVibeContent />
      <ProjectRelatedReading posts={related} accent="#F97316" />
    </InnerPageLayout>
  );
}
