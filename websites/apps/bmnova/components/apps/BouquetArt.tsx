const DEFAULT_COLORS = ["#FF6B8B", "#FFB3C1", "#FF9F7A", "#FFD1A8", "#F08DA6", "#FF7E95"];

const BLOOMS = [
  { left: 31, top: 16, size: 36 },
  { left: 10, top: 32, size: 32 },
  { left: 56, top: 30, size: 34 },
  { left: 34, top: 44, size: 30 },
  { left: 18, top: 54, size: 24 },
  { left: 58, top: 56, size: 24 },
];

/** A bouquet drawn from circles; blooms take the given colours in turn and sway gently. */
export function BouquetArt({
  colors = DEFAULT_COLORS,
  className = "",
}: {
  colors?: string[];
  className?: string;
}) {
  return (
    <span className={`relative block aspect-square overflow-hidden ${className}`} aria-hidden="true">
      {BLOOMS.map((b, i) => (
        <span
          key={i}
          className="absolute aspect-square animate-sway rounded-full transition-colors duration-500"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `${b.size}%`,
            background: colors[i % colors.length],
            animationDelay: `${-0.8 * i}s`,
          }}
        />
      ))}
      <span className="absolute left-[36%] top-[72%] h-[26%] w-[28%] rounded-[6px_6px_24px_24px] bg-[#7FB48C]" />
      <span className="absolute left-[42%] top-[70%] h-[8%] w-[16%] rounded-full bg-[#FF9EC4]" />
    </span>
  );
}
