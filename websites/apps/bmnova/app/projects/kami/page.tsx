import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { KamiContent } from "./KamiContent";

export const metadata: Metadata = {
  title: "Kami AI — BMNova",
  description:
    "AI manga comics generator. Script your story, define your protagonist, pick a visual style, and generate full comic panels.",
};

export default function KamiPage() {
  return (
    <InnerPageLayout>
      <KamiContent />
    </InnerPageLayout>
  );
}
