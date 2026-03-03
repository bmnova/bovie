import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/shared/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        accent: "#6366F1",
        surface: "#F8FAFC",
        muted: "#64748B",
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.15), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
