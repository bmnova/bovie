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
  const initials = label
    .split(/[\s._/-]/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}28 0%, ${color}08 100%)`,
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />
      {/* Bottom glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background: `linear-gradient(to top, ${color}18, transparent)`,
        }}
      />
      {/* Initials */}
      <div className="relative flex h-full items-center justify-center">
        <span
          className="text-3xl font-bold tracking-tight select-none"
          style={{ color, opacity: 0.25 }}
        >
          {initials || label.slice(0, 2).toUpperCase()}
        </span>
      </div>
    </div>
  );
}
