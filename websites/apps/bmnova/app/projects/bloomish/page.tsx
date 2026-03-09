import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BloomishContent } from "./BloomishContent";

export const metadata: Metadata = {
  title: "Bloomish — BMNova",
  description:
    "Generate stunning AI bouquets and send them as gifts. Share moments of joy with anyone, anywhere — beautifully wrapped and personally meaningful.",
};

export default function BloomishPage() {
  return (
    <InnerPageLayout>
      <BloomishContent />
    </InnerPageLayout>
  );
}
