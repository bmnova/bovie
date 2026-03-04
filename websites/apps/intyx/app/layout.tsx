import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "intyx — AI-Powered Data Insights",
  description:
    "Upload your data and let AI transform it into instant insights, charts, and recommendations. Built for content creators and analysts.",
  openGraph: {
    title: "intyx",
    description: "Your data. AI-powered insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
