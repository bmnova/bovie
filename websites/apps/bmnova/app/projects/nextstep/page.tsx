import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { NextStepContent } from "./NextStepContent";

export const metadata: Metadata = {
  title: "NextStep — BMNova",
  description:
    "A minimalist AI coaching app that turns overthinking into action. One reflection, one question, one clear next step.",
};

export default function NextStepPage() {
  return (
    <InnerPageLayout>
      <NextStepContent />
    </InnerPageLayout>
  );
}
