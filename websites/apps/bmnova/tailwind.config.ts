import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.ts",
    "../../packages/shared/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        /** Text on the ink ground */
        primary: "#F3F2FA",
        /** The one brand accent: CTAs, live dots, the wordmark */
        accent: "#DAFF47",
        /** Page ground */
        surface: "#0B0B12",
        /** Raised cards and panels */
        card: "#15151F",
        /** Footer and deepest panels */
        deep: "#08080E",
        muted: "#A4A2B8",
        dim: "#6E6C84",
        soft: "#CFCDE0",
        border: "rgb(255 255 255 / 0.1)",
        app: {
          pali: "#5B8CFF",
          fitvibe: "#FF7A2F",
          haki: "#FF3EA5",
          roompace: "#5BC48B",
          nextstep: "#A855F7",
          bloomish: "#FF6B8B",
          offer: "#FFB224",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "24px",
        section: "32px",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { translate: "0 0" },
          "50%": { translate: "0 -12px" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { scale: "1", opacity: "0.42" },
          "50%": { scale: "1.1", opacity: "0.6" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        drift: {
          "0%, 100%": { translate: "0 0", rotate: "0deg" },
          "50%": { translate: "-18px 14px", rotate: "12deg" },
        },
        hop: {
          "0%, 100%": { translate: "0 0" },
          "50%": { translate: "0 -6px" },
        },
        sway: {
          "0%, 100%": { translate: "0 0" },
          "50%": { translate: "0 -4%" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee 48s linear infinite",
        glow: "pulseGlow 6s ease-in-out infinite",
        blink: "blink 1.6s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
        hop: "hop .5s cubic-bezier(.2,.8,.2,1)",
        sway: "sway 5s ease-in-out infinite",
        "spin-18": "spin 18s linear infinite",
        "spin-28": "spin 28s linear infinite reverse",
        "spin-40": "spin 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
