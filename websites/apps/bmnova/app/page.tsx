import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Partnerships } from "@/components/Partnerships";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  title: "BMNova — AI, Mobile & SaaS Development",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <Partnerships />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
