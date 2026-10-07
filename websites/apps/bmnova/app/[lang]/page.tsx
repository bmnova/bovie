import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/home/Hero";
import {
  AppsGrid,
  CareersCta,
  CompanyFaq,
  Core,
  Numbers,
  Reviews,
  ShipLog,
  Studio,
  Ticker,
} from "@/components/home/Sections";
import { contentMap } from "@/content";
import { faqPageJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/lib/i18n";

export default function Home({ params }: { params: { lang: Locale } }) {
  return (
    <>
      <JsonLd data={faqPageJsonLd(contentMap[params.lang].company.faqs)} />
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Ticker />
        <Numbers />
        <AppsGrid />
        <Reviews />
        <Core />
        <ShipLog />
        <Studio />
        <CompanyFaq />
        <CareersCta />
      </main>
      <Footer />
    </>
  );
}
