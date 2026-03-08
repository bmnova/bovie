import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { PrivacyPolicyContent } from "./PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy — BMNova",
  description:
    "BMNova Privacy Policy. How we collect, use, store, share, and protect personal data. Gizlilik Politikası.",
};

export default function PrivacyPolicyPage() {
  return (
    <InnerPageLayout>
      <PrivacyPolicyContent />
    </InnerPageLayout>
  );
}
