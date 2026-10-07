"use client";

import { useId } from "react";

export type PaliMood =
  | "happy"
  | "neutral"
  | "worried"
  | "sad"
  | "tired"
  | "party"
  | "cheer"
  | "love"
  | "giggle"
  | "wink"
  | "surprised"
  | "proud"
  | "yum"
  | "sip";

type PaliMascotProps = {
  mood?: PaliMood;
  size?: number;
  /** Bob, breathe and blink */
  float?: boolean;
  className?: string;
};

const INK = "#23243A";
const CHEEK = "#FF8A6B";

/** Fin angle and height for the moods that move Pali's fins. */
const FINS: Partial<Record<PaliMood, [number, number, number]>> = {
  cheer: [-70, 70, 94],
  surprised: [-42, 42, 100],
  proud: [-14, 14, 104],
  love: [-30, 30, 102],
  giggle: [-28, 28, 104],
  sip: [-20, 20, 104],
};

function Cheeks({ rx = 7, ry = 4.5, y = 128, x = 66, opacity = 0.55 }) {
  return (
    <>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={CHEEK} opacity={opacity} />
      <ellipse cx={200 - x} cy={y} rx={rx} ry={ry} fill={CHEEK} opacity={opacity} />
    </>
  );
}

function OpenEyes({ r = 10, y = 112, shine = 3, blink }: { r?: number; y?: number; shine?: number; blink?: string }) {
  return (
    <g className={blink}>
      <circle cx="82" cy={y} r={r} fill={INK} />
      <circle cx="118" cy={y} r={r} fill={INK} />
      <circle cx="85" cy={y - 3} r={shine} fill="#fff" />
      <circle cx="121" cy={y - 3} r={shine} fill="#fff" />
    </g>
  );
}

function Face({ mood, blink }: { mood: PaliMood; blink?: string }) {
  switch (mood) {
    case "happy":
      return (
        <>
          <OpenEyes blink={blink} />
          <Cheeks />
          <path d="M89 131 Q100 141 111 131" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
        </>
      );
    case "neutral":
      return (
        <>
          <OpenEyes blink={blink} />
          <path d="M72 98 Q82 94 92 98" stroke="#4459E6" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity=".85" />
          <path d="M108 91 Q118 85 128 91" stroke="#4459E6" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity=".85" />
          <Cheeks />
          <path d="M89 131 L111 131" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
        </>
      );
    case "worried":
      return (
        <>
          <OpenEyes r={11} shine={4} />
          <path d="M70 96 Q80 90 92 94" stroke="#2C3FB8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M130 96 Q120 90 108 94" stroke="#2C3FB8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <Cheeks opacity={0.5} />
          <path d="M88 134 q6-6 12 0t12 0" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M150 70q7 11 0 15q-7-4 0-15Z" fill="#81CEF4" />
        </>
      );
    case "sad":
      return (
        <>
          <OpenEyes r={11} y={111} shine={4.5} />
          <circle cx="79" cy="114" r="2" fill="#fff" opacity=".7" />
          <circle cx="115" cy="114" r="2" fill="#fff" opacity=".7" />
          <Cheeks x={64} rx={8} ry={5} />
          <path d="M91 134 Q100 130 109 134" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      );
    case "party":
      return (
        <>
          <OpenEyes r={11} y={110} shine={4} />
          <Cheeks x={64} rx={8} ry={5} opacity={0.6} />
          <path d="M86 128 Q100 146 114 128 Z" fill={INK} />
        </>
      );
    case "cheer":
      return (
        <>
          <OpenEyes r={11} y={110} shine={4.5} />
          <Cheeks x={64} rx={9} ry={5.5} opacity={0.65} />
          <path d="M82 126 Q100 152 118 126 Z" fill={INK} />
          <path d="M90 138 Q100 148 110 138 Q100 142 90 138 Z" fill="#FF8A8A" />
        </>
      );
    case "love":
      return (
        <>
          <path d="M82 104 c-5-7-15-3-12 5 c2 5 8 8 12 12 c4-4 10-7 12-12 c3-8-7-12-12-5z" fill="#FF5C8A" />
          <path d="M118 104 c-5-7-15-3-12 5 c2 5 8 8 12 12 c4-4 10-7 12-12 c3-8-7-12-12-5z" fill="#FF5C8A" />
          <Cheeks x={64} rx={10} ry={6} opacity={0.7} />
          <path d="M88 132 Q100 144 112 132" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
        </>
      );
    case "giggle":
      return (
        <>
          <path d="M72 114 Q82 102 92 114" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M108 114 Q118 102 128 114" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
          <Cheeks x={64} rx={10} ry={6} opacity={0.65} />
          <path d="M84 128 Q100 148 116 128 Z" fill={INK} />
          <path d="M90 136 Q100 144 110 136 Q100 140 90 136 Z" fill="#FF8A8A" />
        </>
      );
    case "wink":
      return (
        <>
          <circle cx="82" cy="112" r="10" fill={INK} />
          <circle cx="85" cy="109" r="3" fill="#fff" />
          <path d="M108 112 Q118 104 128 112" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
          <Cheeks />
          <path d="M88 130 Q100 142 112 130" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M104 134 Q110 146 116 136 Q110 138 104 134 Z" fill="#FF8A8A" />
        </>
      );
    case "surprised":
      return (
        <>
          <OpenEyes r={12} shine={4} />
          <path d="M70 92 Q82 86 94 92" stroke="#2C3FB8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M106 92 Q118 86 130 92" stroke="#2C3FB8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <Cheeks y={130} opacity={0.5} />
          <ellipse cx="100" cy="136" rx="7" ry="9" fill={INK} />
        </>
      );
    case "proud":
      return (
        <>
          <OpenEyes />
          <path d="M70 104 Q82 100 94 106 L94 98 L70 98 Z" fill="#5A73FF" />
          <path d="M130 104 Q118 100 106 106 L106 98 L130 98 Z" fill="#5A73FF" />
          <Cheeks />
          <path d="M88 132 Q102 142 114 130" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M150 150 l2 5 5 2 -5 2 -2 5 -2-5 -5-2 5-2z" fill="#FFFFFF" opacity="0.9" />
        </>
      );
    case "yum":
      return (
        <>
          <path d="M72 110 Q82 120 92 110" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M108 110 Q118 120 128 110" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
          <Cheeks x={64} rx={10} ry={6} opacity={0.65} />
          <path d="M86 128 Q100 146 114 128 Z" fill={INK} />
          <path d="M98 134 Q108 136 112 148 Q104 148 98 140 Z" fill="#FF8A8A" />
        </>
      );
    case "sip":
      return (
        <>
          <path d="M72 112 Q82 102 92 112" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M108 112 Q118 102 128 112" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
          <Cheeks x={62} y={130} rx={11} ry={7} opacity={0.6} />
          <circle cx="100" cy="134" r="5" fill={INK} />
          <path d="M102 132 L136 90" stroke="#3D9BFF" strokeWidth="5" strokeLinecap="round" />
          <path d="M150 70 q5 7 0 11 q-5-4 0-11z" fill="#3D9BFF" />
        </>
      );
    default:
      return null;
  }
}

function Sparkles({ mood }: { mood: PaliMood }) {
  if (mood === "party" || mood === "cheer") {
    return (
      <>
        <path d="M30 40 L33 50 L43 53 L33 56 L30 66 L27 56 L17 53 L27 50 Z" fill="#FFD34D" />
        <path d="M172 30 L175 40 L185 43 L175 46 L172 56 L169 46 L159 43 L169 40 Z" fill="#FFD34D" />
        <circle cx="170" cy="96" r="4" fill="#FF8A6B" />
      </>
    );
  }
  if (mood === "love") {
    return <path d="M166 44 c-4-6-13-2-10 5 c2 4 6 7 10 10 c4-3 8-6 10-10 c3-7-6-11-10-5z" fill="#FF5C8A" />;
  }
  if (mood === "surprised") {
    return <path d="M158 40 l0 14 M152 46 l12 0" stroke="#FFD34D" strokeWidth="4" strokeLinecap="round" />;
  }
  return null;
}

/** Pali, the blue mascot of the Pali app, drawn as SVG so it sits cleanly on any background. */
export function PaliMascot({ mood = "happy", size = 240, float = true, className }: PaliMascotProps) {
  const id = useId().replace(/:/g, "");
  const height = Math.round((size * 210) / 200);
  const fins = FINS[mood];
  const isSad = mood === "sad";
  const leafY = isSad ? 108 : fins ? fins[2] : 104;
  const leafL = isSad ? -28 : fins ? fins[0] : -22;
  const leafR = isSad ? 28 : fins ? fins[1] : 22;
  const tilt =
    isSad ? "rotate(-7 100 118)" : mood === "giggle" ? "rotate(6 100 118)" : mood === "wink" ? "rotate(-4 100 118)" : undefined;
  const body = `url(#${id}-body)`;
  const leaf = `url(#${id}-leaf)`;
  const tuft = `url(#${id}-tuft)`;

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 200 210"
      aria-hidden="true"
      className={className}
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`${id}-body`} cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#9AABFF" />
          <stop offset="0.5" stopColor="#5A73FF" />
          <stop offset="1" stopColor="#3A4FD6" />
        </radialGradient>
        <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6077FF" />
          <stop offset="1" stopColor="#3347CC" />
        </linearGradient>
        <linearGradient id={`${id}-tuft`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7389FF" />
          <stop offset="1" stopColor="#3F55E0" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#071553" stopOpacity="0.35" />
          <stop offset="1" stopColor="#071553" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-bounce`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#C9D2FF" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      <ellipse
        className={float ? "pali-shadow" : undefined}
        cx="100"
        cy="190"
        rx={mood === "tired" ? 62 : 56}
        ry="9"
        fill={`url(#${id}-shadow)`}
      />

      <g className={float ? "pali-bob" : undefined}>
        {mood === "tired" ? (
          <>
            <ellipse cx="44" cy="122" rx="27" ry="40" fill={leaf} transform="rotate(-52 44 122)" />
            <ellipse cx="156" cy="122" rx="27" ry="40" fill={leaf} transform="rotate(52 156 122)" />
            <ellipse cx="100" cy="66" rx="40" ry="21" fill={tuft} />
            <ellipse cx="100" cy="126" rx="60" ry="54" fill={body} />
            <path d="M56 154q44 36 88 0q-12 26-44 26t-44-26Z" fill={`url(#${id}-bounce)`} />
            <ellipse cx="70" cy="98" rx="9" ry="15" fill="#ffffff" fillOpacity="0.35" transform="rotate(45 70 98)" />
            <path d="M72 118 Q82 126 92 118" stroke={INK} strokeWidth="5.5" fill="none" strokeLinecap="round" />
            <path d="M108 118 Q118 126 128 118" stroke={INK} strokeWidth="5.5" fill="none" strokeLinecap="round" />
            <path d="M90 140 Q100 136 110 140" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M142 46 L156 46 L142 57 L156 57" fill="none" stroke="#8B9BFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <g transform={tilt}>
            <ellipse cx="46" cy={leafY} rx="26" ry="44" fill={leaf} transform={`rotate(${leafL} 46 ${leafY})`} />
            <ellipse cx="154" cy={leafY} rx="26" ry="44" fill={leaf} transform={`rotate(${leafR} 154 ${leafY})`} />
            <ellipse cx="100" cy="54" rx="42" ry="24" fill={tuft} />
            <ellipse cx="88" cy="46" rx="16" ry="5" fill="#ffffff" fillOpacity="0.25" />
            <circle cx="100" cy="118" r="58" fill={body} />
            <path d="M56 150q44 40 88 0q-12 26-44 26t-44-26Z" fill={`url(#${id}-bounce)`} />
            <path d="M150 96q12 24 0 50" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="4" fill="none" strokeLinecap="round" />
            <ellipse cx="70" cy="86" rx="9" ry="16" fill="#ffffff" fillOpacity="0.4" transform="rotate(40 70 86)" />
            <path d="M72 82 Q100 62 128 82" stroke="#8B9BFF" strokeWidth="5" fill="none" strokeLinecap="round" />
            <Face mood={mood} blink={float ? "pali-blink" : undefined} />
          </g>
        )}
        <Sparkles mood={mood} />
      </g>
    </svg>
  );
}
