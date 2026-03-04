import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WebApps } from "@/components/WebApps";
import { AIFeatures } from "@/components/AIFeatures";
import { FlutterPackages } from "@/components/FlutterPackages";
import { MobileApps } from "@/components/MobileApps";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WebApps />
      <AIFeatures />
      <FlutterPackages />
      <MobileApps />
      <Footer />
    </main>
  );
}
