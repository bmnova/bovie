import type { FeatureIcon as FeatureIconName } from "@/content/apps";

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2.4} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.852L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z"
      />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2.4} aria-hidden="true">
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

export function AppleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.4 12.8c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.9 1.2 9.2.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.6-1-2.6-3.7zM14.1 5.9c.6-.8 1.1-1.8 1-2.9-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.7-1.3z"
      />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M4 3.5v17c0 .6.6 1 1.1.7L13.5 12z" />
      <path fill="currentColor" opacity=".75" d="M13.5 12l3.2-2.9 3.3 1.9c.9.5.9 1.5 0 2l-3.3 1.9z" />
      <path fill="currentColor" opacity=".5" d="M13.5 12l3.2 2.9-10.3 5.9z" />
      <path fill="currentColor" opacity=".9" d="M13.5 12L6.4 3.2l10.3 5.9z" />
    </svg>
  );
}

const FEATURE_PATHS: Record<FeatureIconName, string[]> = {
  pen: ["M12 20h9", "M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z"],
  user: ["M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z", "M4 21a8 8 0 0 1 16 0"],
  sparkle: ["M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z", "M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"],
  grid: ["M3 3h8v8H3z", "M13 3h8v8h-8z", "M3 13h8v8H3z", "M13 13h8v8h-8z"],
  book: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
  camera: ["M3 9a3 3 0 0 1 3-3h1.5L9 3.5h6L16.5 6H18a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z", "M12 9.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z"],
  chart: ["M4 19h16", "M6 16V9", "M11 16V5", "M16 16v-7"],
  heart: ["M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"],
  bulb: ["M12 3a7 7 0 0 1 7 7c0 3-2 5-3 6v3H8v-3c-1-1-3-3-3-6a7 7 0 0 1 7-7z", "M9 21h6"],
  closet: ["M4 3h16v18H4z", "M12 3v18", "M4 12h16"],
  hanger: ["M8 3h8l4 4-3 3-1-1v12H8V9l-1 1-3-3z"],
  cart: ["M3 5h2l2 11h11l2-8H7", "M9 20a1.5 1.5 0 1 1 0-.01", "M17 20a1.5 1.5 0 1 1 0-.01"],
  pin: ["M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z", "M12 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"],
  users: ["M9 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z", "M2 20a7 7 0 0 1 14 0", "M17 6.5a2.5 2.5 0 1 1 0 5", "M15 15a5 5 0 0 1 7 5"],
  home: ["M3 21V8l9-5 9 5v13", "M9 21v-6h6v6"],
  cup: ["M17 8h1a4 4 0 0 1 0 8h-1", "M3 8h14v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z", "M6 2v2M10 2v2M14 2v2"],
  syringe: ["M4 20l4-4", "M6 14l4 4 9-9a2.8 2.8 0 0 0-4-4z", "M13 7l4 4"],
  smile: ["M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z", "M8 14s1.5 2 4 2 4-2 4-2", "M9 9h.01M15 9h.01"],
  doc: ["M6 3h9l4 4v14H6z", "M14 3v5h5", "M9 13h7M9 17h5"],
  shield: ["M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z", "M9 12l2 2 4-4"],
  gift: ["M3 8h18v13H3z", "M3 12h18M12 8v13", "M12 8c-2-3-6-3-6-1s4 1 6 1zm0 0c2-3 6-3 6-1s-4 1-6 1z"],
  sun: ["M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z", "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"],
  screen: ["M5 3h14v18H5z", "M9 8h6M9 12h4"],
  steps: ["M4 18h5v-6h5V6h6", "M16 3l4 3-4 3"],
  wallet: ["M3 6h18v12H3z", "M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"],
  box: ["M3 7l9-4 9 4v10l-9 4-9-4z", "M3 7l9 4 9-4M12 11v10"],
};

export function FeatureIcon({ name, className }: IconProps & { name: FeatureIconName }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      {FEATURE_PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
