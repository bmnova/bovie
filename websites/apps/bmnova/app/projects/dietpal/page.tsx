import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { DietPalContent } from "./DietPalContent";

export const metadata: Metadata = {
  title: "DietPal — BMNova",
  description:
    "AI-powered diet app that personalizes your plan based on your needs and lifestyle. Track food, exercise, and well-being with ease.",
};

export default function DietPalPage() {
  return (
    <InnerPageLayout>
      <DietPalContent />
    </InnerPageLayout>
  );
}
