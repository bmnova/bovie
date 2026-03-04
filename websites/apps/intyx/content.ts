import type { Feature, NavLink } from "@websites/shared/types";
import productsData from "@/config/products.json";

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
  items: productsData,
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
