import type { Project, TeamMember, NavLink } from "@websites/shared/types";

export const nav: NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  tagline: "Building user-friendly AI apps,\nmobile & SaaS products.",
  sub: "We turn complex ideas into clean, delightful software — from AI-powered platforms to cross-platform mobile apps.",
  cta: { label: "See our work", href: "#projects" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
};

export const projects: Project[] = [
  {
    title: "intyx.ai",
    description:
      "Upload your data and let AI do the heavy lifting. Instant insights, beautiful charts, and smart recommendations — built for content creators and analysts.",
    tags: ["AI", "SaaS", "Web App"],
    href: "https://intyx.ai",
  },
  {
    title: "dynamic.intyx.ai",
    description:
      "A Flutter package that lets AI agents control your UI at runtime. Powered by MCP protocol — ship dynamic, agent-driven widget experiences.",
    tags: ["Flutter", "AI", "Open Source"],
    href: "https://dynamic.intyx.ai",
  },
  {
    title: "Bovie",
    description:
      "A modern movie discovery app built with Flutter. Personalized recommendations, genre browsing, and a beautiful adaptive UI.",
    tags: ["Flutter", "Mobile", "TMDB"],
  },
  {
    title: "More Coming Soon",
    description:
      "We're constantly building. New products and tools are in the pipeline — stay tuned.",
    tags: ["In Progress"],
  },
];

export const about = {
  heading: "We build software people love.",
  body: "BM Nova is a small, focused team obsessed with user experience and AI. We combine deep technical expertise with a designer's eye to ship products that feel as good as they work.",
  values: [
    {
      icon: "✦",
      title: "User-First",
      description: "Every decision starts with the end user in mind.",
    },
    {
      icon: "⬡",
      title: "AI-Native",
      description: "We embed intelligence where it adds real value.",
    },
    {
      icon: "◈",
      title: "Craftsmanship",
      description: "Clean code, thoughtful design, zero shortcuts.",
    },
  ],
  team: [
    { name: "Bilal M.", role: "Co-founder & Engineering", initials: "BM" },
    { name: "Nova A.", role: "Co-founder & Design", initials: "NA" },
  ] satisfies TeamMember[],
};

export const contact = {
  heading: "Let's build something together.",
  sub: "Have an idea? We'd love to hear it.",
  email: "hello@bmnova.com",
  links: [
    { label: "GitHub", href: "https://github.com/bmnova" },
    { label: "Twitter / X", href: "https://x.com/bmnova" },
    { label: "LinkedIn", href: "https://linkedin.com/company/bmnova" },
  ],
};
