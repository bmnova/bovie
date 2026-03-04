import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/shared/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F8FAFF",
        accent: "#A78BFA",
        "accent-bright": "#7C3AED",
        surface: "#0A0A0F",
        "surface-2": "#111118",
        "surface-3": "#1A1A26",
        muted: "#6B7280",
        border: "#1E1E2E",
        glow: "#7C3AED",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.25), transparent 70%)",
        "card-glow":
          "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(124,58,237,0.12), transparent)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
