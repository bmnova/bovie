import type { Project, TeamMember, NavLink } from "@websites/shared/types";
import projectsData from "@/config/projects.json";

export const nav: NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  tagline: "We ship products.\nNot just prototypes.",
  sub: "We're Bilal and Nova — a two-person studio based in Istanbul. Six products shipped, more in the works. We handle everything ourselves: product, code, design.",
  cta: { label: "See our work", href: "#projects" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
};

export const projects: Project[] = projectsData;

export const about = {
  heading: "Two people, no VC, six products.",
  body: "We founded BM Nova in 2023. Since then we've been building and shipping our own software — AI tools, Flutter apps, SaaS platforms. We do everything ourselves: product decisions, code, design, support.",
  stack: [
    { label: "Mobile", items: "Flutter · Dart · Expo" },
    { label: "Web", items: "Next.js · Tailwind · TypeScript" },
    { label: "Backend", items: "Supabase · FastAPI · OpenAI" },
    { label: "Design", items: "Figma · Framer" },
  ],
  team: [
    { name: "Bilal M.", role: "Co-founder & Engineering", initials: "BM" },
    { name: "Nova A.", role: "Co-founder & Design", initials: "NA" },
  ] satisfies TeamMember[],
};

export const contact = {
  heading: "Got a project in mind?",
  sub: "We have capacity for 1–2 new projects. Reach out and we'll get back within 24 hours.",
  email: "hello@bmnova.com",
  links: [
    { label: "GitHub", href: "https://github.com/bmnova" },
    { label: "Twitter / X", href: "https://x.com/bmnova" },
    { label: "LinkedIn", href: "https://linkedin.com/company/bmnova" },
  ],
};
