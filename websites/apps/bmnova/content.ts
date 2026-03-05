import type { Project, TeamMember, NavLink } from "@websites/shared/types";
import projectsData from "@/config/projects.json";

export const nav: NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  tagline: "We ship products.\nNot just prototypes.",
  sub: "We are a software, technology, and innovation company based in Ankara. We develop mobile/web projects and AI-powered solutions.",
  cta: { label: "See our work", href: "#projects" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
};

export const projects: Project[] = projectsData;

export const about = {
  heading: "A lean team. Serious products.",
  body: "We are a software, technology, and innovation company. We develop mobile/web projects and AI-powered solutions. Founded in 2025 and based at Ostim Teknokent in Ankara, our vision is to become a driving force in digital transformation — a globally recognized, innovation-led company shaping the future of intelligent digital systems.",
  stack: [
    { label: "Mobile", items: "Flutter · Dart" },
    { label: "Web", items: "Next.js · Tailwind · TypeScript" },
    { label: "Backend", items: "Supabase · FastAPI · OpenAI" },
    { label: "Design", items: "Figma · Framer" },
  ],
  team: [
    { name: "Ali Mertcan Karaman", role: "Co-Founder", initials: "AK" },
    { name: "Büşra Mercan", role: "Co-Founder", initials: "BM" },
    { name: "Özgür", role: "Backend Developer", initials: "Ö" },
  ] satisfies TeamMember[],
};

export const services = [
  {
    icon: "🤖",
    title: "AI Powered Projects",
    description: "We build AI-driven features and products — from intelligent recommendations to data analysis tools powered by the latest LLM technology.",
  },
  {
    icon: "📱",
    title: "Application Development",
    description: "We develop mobile, desktop, and web applications using Flutter, Next.js, and modern backend stacks.",
  },
  {
    icon: "☁️",
    title: "SaaS",
    description: "We design and build scalable SaaS products — from architecture to launch — helping ideas become investable digital businesses.",
  },
];

export const contact = {
  heading: "Got a project in mind?",
  sub: "We have capacity for 1–2 new projects. Reach out and we'll get back within 24 hours.",
  email: "contact@bmnova.com",
  links: [
    { label: "GitHub", href: "https://github.com/bmnova" },
    { label: "Twitter / X", href: "https://x.com/bmnova" },
    { label: "LinkedIn", href: "https://linkedin.com/company/bmnova" },
  ],
};
