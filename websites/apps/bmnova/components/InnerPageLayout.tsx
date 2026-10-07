import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function InnerPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-[73px]">{children}</div>
      <Footer />
    </>
  );
}
