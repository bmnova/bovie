interface SquiggleProps {
  className?: string;
  color?: string;
}

export function Squiggle({ className = "", color = "currentColor" }: SquiggleProps) {
  return (
    <svg
      viewBox="0 0 240 14"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M 0 9 Q 30 3 60 9 Q 90 15 120 9 Q 150 3 180 9 Q 210 15 240 9"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
