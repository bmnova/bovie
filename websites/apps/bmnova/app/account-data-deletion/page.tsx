import type { Metadata } from "next";
import { AccountDataDeletionContent } from "./AccountDataDeletionContent";

export const metadata: Metadata = {
  title: "Account & Data Deletion — BMNova",
  description:
    "BMNova Account and Data Deletion. How to delete your account and personal data. Hesap ve Veri Silme.",
};

export default function AccountDataDeletionPage() {
  return <AccountDataDeletionContent />;
}
