import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { RefundPolicyContent } from "./RefundPolicyContent";

export const metadata: Metadata = {
  title: "Refund Policy — BMNova",
  description:
    "BMNova Refund Policy. How refund requests are handled for web and mobile purchases. İade Politikası.",
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <InnerPageLayout>
      <RefundPolicyContent />
    </InnerPageLayout>
  );
}
