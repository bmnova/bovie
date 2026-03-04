import type { Feature, NavLink } from "@websites/shared/types";

export const nav: NavLink[] = [
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "Mobile", href: "#mobile" },
];

export const hero = {
  badge: "AI Platform",
  heading: "Your data.\nAI-powered insights.",
  sub: "Upload any dataset and let intyx AI transform it into instant charts, smart summaries, and actionable recommendations — designed for creators and analysts.",
  cta: { label: "Try intyx.ai", href: "https://intyx.ai" },
  ctaSecondary: { label: "dynamic package →", href: "https://dynamic.intyx.ai" },
};

export const webApps = {
  heading: "Web Apps",
  items: [
    {
      id: "intyx-ai",
      label: "intyx.ai",
      badge: "Live",
      tagline: "Data meets intelligence.",
      description:
        "Upload CSV, JSON, or connect an API. intyx.ai processes your data with advanced AI models and returns beautifully visualized insights, executive summaries, and smart recommendations — in seconds.",
      highlights: [
        "One-click data upload (CSV, JSON, API)",
        "AI-generated charts & dashboards",
        "Natural language querying",
        "Export-ready reports",
      ],
      href: "https://intyx.ai",
      color: "#A78BFA",
    },
    {
      id: "dynamic-intyx",
      label: "dynamic.intyx.ai",
      badge: "Flutter Package",
      tagline: "AI agents that control your UI.",
      description:
        "A Flutter package that bridges AI agents and your widget tree via the Model Context Protocol (MCP). Let your AI agent render, update, and orchestrate UI components at runtime — no hardcoded logic required.",
      highlights: [
        "MCP protocol integration",
        "Agent-controlled dynamic widgets",
        "Runtime UI orchestration",
        "Pub.dev ready",
      ],
      href: "https://dynamic.intyx.ai",
      color: "#7C3AED",
    },
  ],
};

export const features: Feature[] = [
  {
    icon: "⚡",
    title: "Instant Processing",
    description: "Upload data and get AI insights in under 10 seconds.",
  },
  {
    icon: "🧠",
    title: "Smart Summaries",
    description: "Natural language explanations of your data patterns.",
  },
  {
    icon: "📊",
    title: "Auto Visualizations",
    description: "Charts and dashboards generated automatically.",
  },
  {
    icon: "🔗",
    title: "MCP Protocol",
    description: "First-class AI agent integration for Flutter apps.",
  },
  {
    icon: "🎨",
    title: "Dynamic UI",
    description: "Agents render and update widgets at runtime.",
  },
  {
    icon: "🔒",
    title: "Privacy First",
    description: "Your data never trains our models. Zero retention.",
  },
];

export const mobile = {
  heading: "Mobile Apps",
  sub: "Cross-platform mobile experiences powered by Flutter. Coming soon.",
  placeholder: "We're bringing intyx intelligence to iOS and Android. Stay tuned.",
};
