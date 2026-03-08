"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function InnerPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar showHireUs={false} />
      <div className="pt-[4.5rem]">{children}</div>
      <Footer />
    </>
  );
}
