import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { ProjectRelatedReading } from "@/components/ProjectRelatedReading";
import { softwareApplicationJsonLd } from "@/lib/json-ld";
import { getPostsByProduct } from "@/lib/posts";
import { NextStepContent } from "./NextStepContent";

export const metadata: Metadata = {
  title: "NextStep — BMNova",
  description:
    "A minimalist AI coaching app that turns overthinking into action. One reflection, one question, one clear next step.",
  alternates: {
    canonical: "/projects/nextstep",
  },
  openGraph: {
    title: "NextStep — BMNova",
    description:
      "A minimalist AI coaching app that turns overthinking into action.",
    url: "/projects/nextstep",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextStep — BMNova",
    description:
      "A minimalist AI coaching app that turns overthinking into action.",
  },
};

export default function NextStepPage() {
  const related = getPostsByProduct("nextstep");

  return (
    <InnerPageLayout>
      <JsonLd data={softwareApplicationJsonLd("nextstep")} />
      <NextStepContent />
      <ProjectRelatedReading posts={related} accent="#6366F1" />
    </InnerPageLayout>
  );
}
