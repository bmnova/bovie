import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { OfferContent } from "./OfferContent";

export const metadata: Metadata = {
  title: "Offer — BMNova",
  description:
    "Connect with people around you by offering drinks, snacks, or other items at local businesses. Break the ice and make real connections.",
};

export default function OfferPage() {
  return (
    <InnerPageLayout>
      <OfferContent />
    </InnerPageLayout>
  );
}
