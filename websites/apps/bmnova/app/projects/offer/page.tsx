import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offer — BM Nova",
  description:
    "Connect with people around you by offering drinks, snacks, or other items at local businesses. Break the ice and make real connections.",
};

const features = [
  {
    icon: "☕",
    title: "Offer something, start a conversation",
    description:
      "Send a virtual offer — a coffee, a snack, anything — to someone nearby at a local business. A simple gesture that breaks the ice instantly.",
  },
  {
    icon: "📍",
    title: "Discover local spots",
    description:
      "Browse businesses around you and see who else is there. Find new cafés, restaurants, and hangout spots through the people already in them.",
  },
  {
    icon: "🤝",
    title: "Meet people with shared interests",
    description:
      "Offer matches you with people who enjoy the same kinds of places. No swiping, no algorithms — just an honest offer and a real moment.",
  },
  {
    icon: "🌍",
    title: "Make your city feel smaller",
    description:
      "Whether you're new to a city or just looking to expand your circle, Offer turns everyday places into spaces for genuine connection.",
  },
];

export default function OfferPage() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Navbar placeholder */}
      <div className="px-6 py-5 md:px-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          ← bmnova.com
        </Link>
      </div>

      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-20 md:px-12"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, #F59E0B18, transparent)",
        }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-block rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">
            Mobile · Flutter · Social
          </span>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-primary md:text-6xl">
            Offer
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted">
            Connect with people around you by offering them drinks, snacks, or
            other items at local businesses. Break the ice, discover new places,
            and make real connections.
          </p>
        </div>

        {/* Decorative circle */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, #F59E0B10, transparent 70%)",
          }}
        />
      </section>

      {/* Features */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">
            How it works
          </p>
          <h2 className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Real people. Real places. Real moments.
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-white p-7"
              >
                <span className="mb-4 block text-3xl">{feature.icon}</span>
                <h3 className="mb-2 text-lg font-bold text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-28 pt-4 text-center md:px-12">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Interested in Offer?
          </h2>
          <p className="mb-8 text-muted">
            We&apos;re actively developing Offer. Reach out if you&apos;d like to know more or
            get early access.
          </p>
          <Link
            href="/#contact"
            className="inline-flex rounded-full bg-[#F59E0B] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#F59E0B]/25 transition-all hover:opacity-90"
          >
            Get in touch →
          </Link>
        </div>
      </section>
    </main>
  );
}
