import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import {
  AppsGrid,
  CareersCta,
  Core,
  Numbers,
  Reviews,
  ShipLog,
  Studio,
  Ticker,
} from "@/components/home/Sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Ticker />
        <Numbers />
        <AppsGrid />
        <Core />
        <Reviews />
        <ShipLog />
        <Studio />
        <CareersCta />
      </main>
      <Footer />
    </>
  );
}
