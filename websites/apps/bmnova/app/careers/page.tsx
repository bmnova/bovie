import Link from "next/link";

export const metadata = {
  title: "Careers — BM Nova",
  description: "Join BM Nova. We're hiring a Mobile App Growth Expert.",
};

const openings = [
  {
    title: "Mobile App Growth Expert",
    type: "Part-time · Remote",
    description:
      "We're looking for someone who lives and breathes mobile app growth. You'll own acquisition, retention, and monetization strategy across our mobile products — running experiments, analyzing data, and finding the levers that move the numbers.",
    responsibilities: [
      "Drive user acquisition via ASO, paid campaigns, and organic channels",
      "Design and run A/B tests to improve onboarding and retention",
      "Analyze product metrics and translate insights into growth experiments",
      "Collaborate closely with the engineering and design team",
      "Build and own our mobile marketing playbook from the ground up",
    ],
    nice: [
      "Experience growing a mobile app past 10K+ MAU",
      "Familiarity with Flutter or mobile development workflows",
      "Background in SaaS or AI-powered products",
    ],
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-28 md:px-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          ← bmnova.com
        </Link>

        <h1 className="mb-2 text-4xl font-bold tracking-tight text-primary">
          Careers
        </h1>
        <p className="mb-16 text-lg text-muted">
          We&apos;re a small team building serious products. If you&apos;re sharp, self-directed,
          and want to work on things that matter — we&apos;d love to hear from you.
        </p>

        <div className="space-y-12">
          {openings.map((role) => (
            <div key={role.title} className="rounded-2xl border border-border bg-white p-8">
              <div className="mb-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                  {role.type}
                </p>
                <h2 className="text-2xl font-bold text-primary">{role.title}</h2>
              </div>

              <p className="mb-8 text-sm leading-relaxed text-muted">{role.description}</p>

              <div className="mb-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/40">
                  What you&apos;ll do
                </p>
                <ul className="space-y-2">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted">
                      <span className="mt-0.5 text-accent">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/40">
                  Nice to have
                </p>
                <ul className="space-y-2">
                  {role.nice.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted">
                      <span className="mt-0.5 text-accent">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="mailto:contact@bmnova.com?subject=Mobile App Growth Expert"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Apply via email
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
