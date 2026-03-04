"use client";

interface ThumbnailProps {
  color?: string;
  label: string;
  className?: string;
}

export function Thumbnail({
  color = "#6366F1",
  label,
  className = "",
}: ThumbnailProps) {
  const initials =
    label
      .split(/[\s._/-]/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || label.slice(0, 2).toUpperCase();

  // Stable pattern id derived from label (no spaces/special chars)
  const patternId = `stripes-${label.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${color}22 0%, ${color}06 100%)` }}
    >
      {/* Diagonal stripe texture */}
      <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.07 }} aria-hidden="true">
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width="16"
            height="16"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="16" stroke={color} strokeWidth="5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Center radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 70% at 50% 60%, ${color}20, transparent)`,
        }}
      />

      {/* Initials badge */}
      <div className="relative flex h-full items-center justify-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}
        >
          <span
            className="select-none text-lg font-bold tracking-tight"
            style={{ color }}
          >
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
}
