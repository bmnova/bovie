import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Locale } from "@/lib/i18n";

type InnerPageLayoutProps = {
  children: React.ReactNode;
  /** Language-switch targets when the page's other-language URL differs, e.g. translated post slugs */
  localeHrefs?: Record<Locale, string>;
};

export function InnerPageLayout({ children, localeHrefs }: InnerPageLayoutProps) {
  return (
    <>
      <Navbar localeHrefs={localeHrefs} />
      <div className="pt-[73px]">{children}</div>
      <Footer localeHrefs={localeHrefs} />
    </>
  );
}
