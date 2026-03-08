import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { TermsOfUseContent } from "./TermsOfUseContent";

export const metadata: Metadata = {
  title: "Terms of Use — BMNova",
  description:
    "BMNova Terms of Use. Access and use of our websites, apps, AI features, and services. Kullanım Koşulları.",
};

export default function TermsOfUsePage() {
  return (
    <InnerPageLayout>
      <TermsOfUseContent />
    </InnerPageLayout>
  );
}
