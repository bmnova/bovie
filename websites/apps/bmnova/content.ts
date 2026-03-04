import type { Project, TeamMember, NavLink } from "@websites/shared/types";
import projectsData from "@/config/projects.json";

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

export const projects: Project[] = projectsData;

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
