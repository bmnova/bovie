import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { AboutUsContent } from "./AboutUsContent";

export const metadata: Metadata = {
  title: "About Us — BMNova",
  description:
    "Learn about BMNova — our vision, mission, team, and strategic partnerships. A lean technology company shaping the future of AI-powered digital systems.",
};

export default function AboutUsPage() {
  return (
    <InnerPageLayout>
      <AboutUsContent />
    </InnerPageLayout>
  );
}
