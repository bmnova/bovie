import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { FitVibeContent } from "./FitVibeContent";

export const metadata: Metadata = {
  title: "FitVibe — BMNova",
  description:
    "AI-powered digital wardrobe app. Add clothes, get outfit combinations, discover wardrobe gaps, and virtually try on looks.",
};

export default function FitVibePage() {
  return (
    <InnerPageLayout>
      <FitVibeContent />
    </InnerPageLayout>
  );
}
