import type { Metadata } from "next";
import { AboutUsContent } from "./AboutUsContent";

export const metadata: Metadata = {
  title: "About Us — BM Nova",
  description:
    "Learn about BM Nova — our vision, mission, team, and strategic partnerships. A lean technology company shaping the future of AI-powered digital systems.",
};

export default function AboutUsPage() {
  return <AboutUsContent />;
}
