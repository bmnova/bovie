import { InnerPageLayout } from "@/components/InnerPageLayout";
import { CareersContent } from "./CareersContent";

export const metadata = {
  title: "Careers — BMNova",
  description: "Join BMNova. We're hiring a Mobile App Growth Expert.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return (
    <InnerPageLayout>
      <CareersContent />
    </InnerPageLayout>
  );
}
