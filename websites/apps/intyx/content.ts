import type { Feature, NavLink } from "@websites/shared/types";

export const nav: NavLink[] = [
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
];

export const hero = {
  badge: "AI Platform",
  heading: "Your data.\nAI-powered insights.",
  sub: "Upload any dataset and let intyx AI transform it into instant charts, smart summaries, and actionable recommendations — designed for creators and analysts.",
  cta: { label: "Try intyx.ai", href: "https://intyx.ai" },
  ctaSecondary: { label: "dynamic package →", href: "https://dynamic.intyx.ai" },
};

export const products = {
  heading: "Products",
  items: [
    {
      id: "intyx-ai",
      category: "Web",
      label: "intyx.ai",
      status: "Live",
      tagline: "Data meets intelligence.",
      description:
        "Upload CSV, JSON, or connect an API. Get AI-generated charts, executive summaries, and smart recommendations in seconds.",
      href: "https://intyx.ai",
      color: "#A78BFA",
    },
    {
      id: "dynamic-intyx-web",
      category: "Web",
      label: "dynamic.intyx.ai",
      status: "Live",
      tagline: "AI agents that control your UI.",
      description:
        "Documentation and playground for the dynamic_intyx Flutter package. MCP protocol bridge between AI agents and your widget tree.",
      href: "https://dynamic.intyx.ai",
      color: "#7C3AED",
    },
    {
      id: "dynamic-intyx-pkg",
      category: "Flutter Package",
      label: "dynamic_intyx",
      status: "Coming Soon",
      tagline: "Agent-controlled widgets at runtime.",
      description:
        "Let AI agents render and orchestrate your Flutter widget tree via the MCP protocol — no hardcoded logic required.",
      href: "https://dynamic.intyx.ai",
      color: "#A78BFA",
    },
    {
      id: "intyx-sdk",
      category: "Flutter Package",
      label: "intyx_sdk",
      status: "Coming Soon",
      tagline: "intyx AI in your Flutter app.",
      description:
        "First-class Flutter SDK for the intyx platform. Upload data, fetch AI insights, and render beautiful charts from mobile.",
      href: null,
      color: "#7C3AED",
    },
    {
      id: "intyx-ios",
      category: "Mobile",
      label: "intyx for iOS",
      status: "Coming Soon",
      tagline: "AI insights on the go.",
      description:
        "Native iOS experience for the intyx platform. Full AI data analysis and visualization in your pocket.",
      href: null,
      color: "#6D28D9",
    },
    {
      id: "intyx-android",
      category: "Mobile",
      label: "intyx for Android",
      status: "Coming Soon",
      tagline: "AI insights on the go.",
      description:
        "Native Android experience for the intyx platform. Full AI data analysis and visualization in your pocket.",
      href: null,
      color: "#5B21B6",
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
