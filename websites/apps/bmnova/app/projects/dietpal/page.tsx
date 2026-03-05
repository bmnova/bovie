import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DietPal — BM Nova",
  description:
    "AI-powered diet app that personalizes your plan based on your needs and lifestyle. Track food, exercise, and well-being with ease.",
};

const features = [
  {
    icon: "🧠",
    title: "Personalized by AI",
    description:
      "DietPal learns your dietary needs, goals, and lifestyle to build a plan that actually fits you — not a generic template.",
  },
  {
    icon: "🥗",
    title: "Track food & exercise",
    description:
      "Log meals and workouts with ease. DietPal gives you a clear picture of your daily intake and activity without overwhelming you with numbers.",
  },
  {
    icon: "📊",
    title: "Insights that matter",
    description:
      "Get clear, actionable feedback based on your data. DietPal surfaces the patterns that matter so you can make better choices every day.",
  },
  {
    icon: "💚",
    title: "Holistic well-being",
    description:
      "Diet is just one piece. DietPal also tracks your sleep, stress, and energy — giving you a complete picture of your health journey.",
  },
];

export default function DietPalPage() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Back link */}
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
            "radial-gradient(ellipse 80% 60% at 50% -10%, #10B98118, transparent)",
        }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-block rounded-full border border-[#10B981]/20 bg-[#10B981]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#10B981]">
            Mobile · Flutter · AI
          </span>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-primary md:text-6xl">
            DietPal
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted">
            AI-powered diet app that personalizes your plan based on your needs
            and lifestyle. Track food, exercise, and well-being — then get
            actionable insights to hit your goals.
          </p>
        </div>

        {/* Decorative circle */}
        <div
          className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, #10B98110, transparent 70%)",
          }}
        />
      </section>

      {/* Features */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#10B981]">
            What DietPal does
          </p>
          <h2 className="mb-14 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            A holistic approach to reaching your health goals.
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
            Want to try DietPal?
          </h2>
          <p className="mb-8 text-muted">
            DietPal is currently in development. Get in touch if you&apos;d like early
            access or have questions.
          </p>
          <Link
            href="/#contact"
            className="inline-flex rounded-full bg-[#10B981] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#10B981]/25 transition-all hover:opacity-90"
          >
            Get in touch →
          </Link>
        </div>
      </section>
    </main>
  );
}
