import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "BM Nova — AI, Mobile & SaaS Development",
  description:
    "BM Nova builds user-friendly AI apps, mobile products, and SaaS tools. Clean code, thoughtful design.",
  openGraph: {
    title: "BM Nova",
    description: "Building user-friendly AI apps, mobile & SaaS products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual'" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
