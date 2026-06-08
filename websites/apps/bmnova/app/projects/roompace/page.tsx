import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { RoomPaceContent } from "./RoomPaceContent";

export const metadata: Metadata = {
  title: "RoomPace — BMNova",
  description:
    "AI interior design app that plans room makeovers to your budget. Upload a photo, get AI layouts, and build a shoppable wishlist.",
};

export default function RoomPacePage() {
  return (
    <InnerPageLayout>
      <RoomPaceContent />
    </InnerPageLayout>
  );
}
