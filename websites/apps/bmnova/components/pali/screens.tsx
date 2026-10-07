"use client";

import { useState } from "react";
import { Lexend } from "next/font/google";
import { PaliMascot, type PaliMood } from "@/components/pali/PaliMascot";

const lexend = Lexend({ subsets: ["latin", "latin-ext"], display: "swap" });

/** The Pali app's own palette, kept as in the product prototype. */
const C = {
  ink: "#14183A",
  sub: "#5C6185",
  blue: "#4A61EE",
  blueText: "#2F3FC4",
  lilac: "#F3F2FB",
  bg: "#F7F8FC",
  line: "#EEF0F6",
  yellow: "#FFD15C",
  green: "#37C48F",
};

/** A 390px-wide app screen in the Pali app's typeface. */
function Screen({ height, bg = C.bg, children }: { height: number; bg?: string; children: React.ReactNode }) {
  return (
    <div
      className={`${lexend.className} relative overflow-hidden`}
      style={{ width: 390, height, background: bg, color: C.ink }}
    >
      {children}
    </div>
  );
}

function TabBar({ active }: { active: "today" | "shots" }) {
  const item = (on: boolean) =>
    ({ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 11, fontWeight: on ? 700 : 400, color: on ? C.blueText : C.sub }) as const;
  const icon = (on: boolean) => ({ stroke: on ? C.blueText : C.sub });
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 88, display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", alignItems: "start", padding: "10px 6px 0", background: "#fff", borderTop: `1px solid ${C.line}` }}
    >
      <span style={item(active === "today")}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...icon(active === "today")}><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" /></svg>
        Today
      </span>
      <span style={item(active === "shots")}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...icon(active === "shots")}><path d="M14 4l6 6M17 7l-9 9-3 1 1-3 9-9M4 20l2-2" /></svg>
        Shots
      </span>
      <span style={{ display: "flex", justifyContent: "center" }}>
        <span style={{ marginTop: -32, width: 70, height: 70, borderRadius: "50%", border: "5px solid #fff", background: "#E6E9FF", boxShadow: "0 6px 18px rgba(74,97,238,0.35)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxSizing: "border-box" }}>
          <span style={{ marginTop: 4 }}><PaliMascot size={50} float={false} /></span>
        </span>
      </span>
      <span style={item(false)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19h16M7 16V9M12 16V5M17 16v-4" /></svg>
        Progress
      </span>
      <span style={item(false)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.sub} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></svg>
        Profile
      </span>
    </div>
  );
}

function arc(cx: number, cy: number, r: number, i: number, gap: number) {
  const span = 360 / 7;
  const a0 = -90 + i * span + gap / 2;
  const a1 = a0 + span - gap;
  const pt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const [x0, y0] = pt(a0);
  const [x1, y1] = pt(a1);
  const [mx, my] = pt(a0 + (span - gap) / 2);
  return { d: `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`, mx, my };
}

const PHASES: { label: string; color: string; mood: PaliMood; bg: string; blob: string; blob2: string; msg: string }[] = [
  { label: "Settling", color: "#9AA3F5", mood: "tired", bg: "#EEF0FF", blob: "#DDE1FF", blob2: "#FFF1C9", msg: "Shot was last night. Small plates, slow sips. I've got you." },
  { label: "Settling", color: "#9AA3F5", mood: "worried", bg: "#EEF0FF", blob: "#DDE1FF", blob2: "#FFF1C9", msg: "Day 2 is usually the bumpiest. Ginger tea helps some people." },
  { label: "Steady", color: C.green, mood: "happy", bg: "#E9F8F1", blob: "#D3F1E2", blob2: "#DDE1FF", msg: "Appetite is quiet. Good day to bank some protein." },
  { label: "Steady", color: C.green, mood: "giggle", bg: "#E9F8F1", blob: "#D3F1E2", blob2: "#DDE1FF", msg: "Steady days are for walks and water." },
  { label: "Steady", color: C.green, mood: "proud", bg: "#E9F8F1", blob: "#D3F1E2", blob2: "#DDE1FF", msg: "Halfway. 4 of 5 check-ins done this week." },
  { label: "Noise returns", color: "#FF9F6E", mood: "neutral", bg: "#FFF1E8", blob: "#FFE0CF", blob2: "#DDE1FF", msg: "Food noise may creep back. That's the medicine easing off, not you." },
  { label: "Shot day", color: "#FFC233", mood: "party", bg: "#FFF6DC", blob: "#FFE9A8", blob2: "#DDE1FF", msg: "Shot day! Protein breakfast now, water all afternoon." },
];
const DATES = ["Fri 25 Sep", "Sat 26 Sep", "Sun 27 Sep", "Mon 28 Sep", "Tue 29 Sep", "Wed 30 Sep", "Thu 1 Oct"];

/** A tappable element, or a plain one when the screen is only a preview inside another control. */
function Tap({
  interactive,
  onClick,
  style,
  label,
  children,
}: {
  interactive: boolean;
  onClick: () => void;
  style: React.CSSProperties;
  label?: string;
  children?: React.ReactNode;
}) {
  if (!interactive) return <span style={{ ...style, display: style.display ?? "inline-flex" }}>{children}</span>;
  return (
    <button type="button" onClick={onClick} aria-label={label} style={style}>
      {children}
    </button>
  );
}

function Ring({ value, color, track }: { value: number; color: string; track: string }) {
  return (
    <span style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0, background: `conic-gradient(${color} 0 ${value}%, ${track} ${value}% 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#fff" }} />
    </span>
  );
}

/** Pali's Today screen: tap a day of the shot cycle to see Pali's mood and advice change. */
export function PaliToday({ interactive = true }: { interactive?: boolean }) {
  const [day, setDay] = useState(6);
  const [done, setDone] = useState<Record<string, boolean>>({ a: true });
  const [waterMl, setWaterMl] = useState(1100);
  const cur = PHASES[day];
  const shotDay = day === 6;
  const wins = shotDay
    ? [["a", "Protein breakfast"], ["b", "Pen out at 18:30"], ["c", "Shot at 19:00"]]
    : [["a", "Protein with every meal"], ["b", "Drink 2.3 L"], ["c", "Tell Pali how you feel"]];
  const waterPct = Math.min(100, Math.round((waterMl / 2300) * 100));

  return (
    <Screen height={844}>
      <div style={{ padding: "50px 16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 2px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 12, color: C.sub }}>{DATES[day]}</span>
            <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.8 }}>
              {shotDay ? "Shot day" : day < 2 ? "Go gently" : day < 5 ? "Steady on" : "Hang in there"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 12px 4px 4px", borderRadius: 999, background: "#fff", boxShadow: "0 1px 3px rgba(20,24,58,0.06)" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `conic-gradient(${C.blue} 0 75%, ${C.line} 75% 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#E6E9FF", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <PaliMascot size={26} float={false} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Shot 9</span>
              <span style={{ fontSize: 11, color: C.sub }}>3 to the cape</span>
            </div>
          </div>
        </div>

        <div style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "12px 16px 14px", borderRadius: 28, background: cur.bg, transition: "background .5s ease" }}>
          <div style={{ position: "absolute", left: -70, top: -60, width: 220, height: 220, borderRadius: "50%", background: cur.blob, transition: "background .5s ease" }} />
          <div style={{ position: "absolute", right: -80, top: 120, width: 200, height: 200, borderRadius: "50%", background: cur.blob2 }} />
          <div style={{ position: "relative", width: 204, height: 204 }}>
            <svg width="204" height="204" viewBox="0 0 204 204" fill="none" aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
              {PHASES.map((p, i) => (
                <path key={i} d={arc(102, 102, 86, i, 10).d} stroke={p.color} strokeOpacity={i === day ? 1 : 0.28} strokeWidth="16" strokeLinecap="round" />
              ))}
            </svg>
            <div style={{ position: "absolute", left: 42, top: 36 }}>
              <PaliMascot mood={cur.mood} size={120} />
            </div>
            {PHASES.map((p, i) => {
              const { mx, my } = arc(102, 102, 86, i, 10);
              const on = i === day;
              return (
                <Tap
                  key={i}
                  interactive={interactive}
                  onClick={() => setDay(i)}
                  label={`Day ${i + 1}, ${p.label}`}
                  style={{ position: "absolute", left: mx - 14, top: my - 14, width: 28, height: 28, borderRadius: "50%", border: 0, fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0, background: on ? C.ink : "transparent", color: on ? "#fff" : C.ink, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {i + 1}
                </Tap>
              );
            })}
          </div>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: cur.color }} />
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3 }}>
              Day {day + 1} · {cur.label}
            </span>
          </div>
          <div style={{ position: "relative", fontSize: 14, lineHeight: 1.4, textAlign: "center", color: "#3F4570", minHeight: 40 }}>{cur.msg}</div>
          <span style={{ position: "relative", alignSelf: "stretch", display: "flex", justifyContent: "center", alignItems: "center", height: 48, borderRadius: 999, fontSize: 15, fontWeight: 700, background: shotDay ? C.yellow : "#fff", color: shotDay ? C.ink : C.blueText }}>
            {shotDay ? "Log tonight's shot" : "How I feel today"}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, borderRadius: 20, background: "#fff" }}>
            <Ring value={42} color="#FF9F6E" track="#FFE6DA" />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}><span style={{ fontSize: 14, fontWeight: 700 }}>46g</span><span style={{ fontSize: 11, color: C.sub }}>protein</span></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, borderRadius: 20, background: "#fff" }}>
            <Ring value={40} color={C.green} track="#DDF6EB" />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}><span style={{ fontSize: 14, fontWeight: 700 }}>12g</span><span style={{ fontSize: 11, color: C.sub }}>fibre</span></div>
          </div>
          <Tap
            interactive={interactive}
            onClick={() => setWaterMl((ml) => Math.min(4000, ml + 250))}
            label="Add 250 ml water"
            style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, borderRadius: 20, background: "#fff", border: 0, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
          >
            <Ring value={waterPct} color="#3D9BFF" track="#E0EEFF" />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}><span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{(waterMl / 1000).toFixed(1)}L</span><span style={{ fontSize: 11, color: C.sub }}>water +</span></span>
          </Tap>
        </div>

        <div style={{ display: "flex", flexDirection: "column", padding: "6px 12px", borderRadius: 22, background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 32 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: 0.6 }}>{shotDay ? "Shot day wins" : "Today's small wins"}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.blueText }}>{wins.filter(([id]) => done[id]).length}/3</span>
          </div>
          {wins.map(([id, label]) => {
            const on = !!done[id];
            return (
              <Tap
                key={id}
                interactive={interactive}
                onClick={() => setDone((d) => ({ ...d, [id]: !on }))}
                style={{ display: "flex", alignItems: "center", gap: 10, minHeight: 42, padding: 0, border: 0, borderTop: `1px solid ${C.lilac}`, background: "transparent", textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}
              >
                <span style={{ width: 24, height: 24, borderRadius: 8, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, ...(on ? { background: C.green } : { border: "2px solid #C9CDF2" }) }}>
                  {on && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  )}
                </span>
                <span style={{ fontSize: 14, color: on ? C.sub : C.ink, textDecoration: on ? "line-through" : "none" }}>{label}</span>
              </Tap>
            );
          })}
        </div>
      </div>
      <TabBar active="today" />
    </Screen>
  );
}

const SITES: [string, "last" | "next" | "ok", string][] = [
  ["Arm R", "last", "last week"],
  ["Belly UL", "next", "next"],
  ["Belly UR", "ok", "rested"],
  ["Arm L", "ok", "rested"],
  ["Belly LL", "ok", "rested"],
  ["Belly LR", "ok", "rested"],
  ["Thigh L", "ok", "rested"],
  ["Thigh R", "ok", "rested"],
];
const PLANS = {
  far: { label: "7 days left", countdown: "In 7 days", day: 1, due: false, tone: C.blueText },
  soon: { label: "In 2 days", countdown: "In 2 days", day: 5, due: false, tone: C.blueText },
  due: { label: "Due today", countdown: "Due today", day: 7, due: true, tone: C.ink },
  late: { label: "2 days late", countdown: "2 days late", day: 7, due: true, tone: "#9A3F12" },
};
const CYCLE_COLORS = ["#FFC233", "#9AA3F5", "#9AA3F5", C.green, C.green, C.green, "#FF9F6E"];

/** Pali's Shots tab: countdown ring, next injection site and the rotation grid. */
export function PaliShots() {
  const [demo, setDemo] = useState<keyof typeof PLANS>("far");
  const p = PLANS[demo];
  return (
    <Screen height={844}>
      <div style={{ padding: "50px 16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.8, padding: "0 2px" }}>Shots</span>
        <div style={{ display: "flex", padding: 3, borderRadius: 999, background: "#fff" }}>
          {(Object.keys(PLANS) as (keyof typeof PLANS)[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setDemo(id)}
              style={{ flex: 1, minHeight: 32, border: 0, borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "0 4px", fontFamily: "inherit", ...(demo === id ? { background: C.ink, color: "#fff" } : { background: "transparent", color: C.sub }) }}
            >
              {PLANS[id].label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16, borderRadius: 28, background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: 0.6 }}>Next shot</span>
              <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.1, color: p.tone }}>{p.countdown}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Tue 13 Oct · 14:00</span>
              <span style={{ fontSize: 12, color: C.sub }}>Zepbound® 5 mg · weekly pen</span>
            </div>
            <div style={{ position: "relative", width: 84, height: 84, flexShrink: 0 }}>
              <svg width="84" height="84" viewBox="0 0 84 84" fill="none" aria-hidden="true">
                {CYCLE_COLORS.map((color, i) => (
                  <path key={i} d={arc(42, 42, 34, i, 14).d} stroke={color} strokeOpacity={i < p.day ? (i === p.day - 1 ? 1 : 0.6) : 0.2} strokeWidth="8" strokeLinecap="round" />
                ))}
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                <span style={{ fontSize: 20, fontWeight: 800 }}>{p.day}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: 0.4 }}>
                  {p.day === 1 ? "shot day" : p.day <= 3 ? "settling" : p.day <= 6 ? "steady" : "noise"}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 14, background: C.lilac }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px dashed ${C.blue}`, boxSizing: "border-box" }} />
            <span style={{ fontSize: 13, flexGrow: 1 }}><span style={{ color: C.sub }}>Next site ·</span> Belly, upper left</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.blueText }}>Rotation</span>
          </div>
          <span style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 50, borderRadius: 999, fontSize: 15, fontWeight: 700, ...(p.due ? { background: C.yellow, color: C.ink } : { background: "#fff", color: C.blueText, border: `1.5px solid ${C.blue}` }) }}>
            Log shot
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "14px 16px", borderRadius: 22, background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Rotation</span>
            <span style={{ fontSize: 12, color: C.sub }}>7 of 8 sites rested</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 6 }}>
            {SITES.map(([name, kind, sub]) => (
              <div
                key={name}
                style={{ display: "flex", flexDirection: "column", gap: 2, padding: "8px 6px", borderRadius: 14, minHeight: 52, boxSizing: "border-box", ...(kind === "next" ? { background: "#E6E9FF", border: `1.5px dashed ${C.blue}` } : kind === "last" ? { background: C.lilac, border: `1.5px solid ${C.lilac}`, color: C.sub } : { background: "#fff", border: `1.5px solid ${C.line}` }) }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.15 }}>{name}</span>
                <span style={{ fontSize: 10, color: kind === "next" ? C.blueText : kind === "last" ? C.sub : "#145C3B", fontWeight: kind === "next" ? 700 : 400 }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 22, background: "#fff" }}>
          <PaliMascot mood="wink" size={28} float={false} />
          <span style={{ fontSize: 12, color: C.sub }}>Tap a shot to fix the site, time or dose. No judgement.</span>
        </div>
      </div>
      <TabBar active="shots" />
    </Screen>
  );
}

const SYMPTOMS: [string, string][] = [
  ["nausea", "Nausea"],
  ["constipation", "Constipation"],
  ["heartburn", "Heartburn"],
  ["tired", "Tiredness"],
  ["appetite", "Low appetite"],
];
const LEVEL_FILL = ["#E4E3F2", "#B9BFF7", C.blue, "#FF6B6B"];
const LEVEL_WORD = ["none", "mild", "some", "strong"];

/** Pali's How-you-feel check-in: four-step scales; Pali's face follows the total. */
export function PaliFeel() {
  const [sev, setSev] = useState<Record<string, number>>({ nausea: 1, constipation: 2, heartburn: 0, tired: 1, appetite: 2 });
  const [noise, setNoise] = useState("quiet");
  const total = Object.values(sev).reduce((a, b) => a + b, 0);
  let face: PaliMood = "happy";
  let bubble = "Morning after. Sounds like a calm one, nice.";
  if (total >= 4) {
    face = "neutral";
    bubble = "Morning after. A bit bumpy, that's normal on day 1.";
  }
  if (total >= 8) {
    face = "worried";
    bubble = "Rough one. Small sips, rest, and tell your doctor if it lasts.";
  }
  return (
    <Screen height={844} bg={C.lilac}>
      <div style={{ padding: "52px 16px 20px", display: "flex", flexDirection: "column", gap: 12, height: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.sub }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#B9BFF7" }} />
            Fri · day 1 · Settling
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
          <PaliMascot mood={face} size={64} />
          <div style={{ padding: "14px 16px", borderRadius: "22px 22px 22px 6px", background: "#fff", fontSize: 16, lineHeight: 1.35, fontWeight: 500 }}>{bubble}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "14px 16px", borderRadius: 28, background: "#fff" }}>
          {SYMPTOMS.map(([id, name]) => {
            const cur = sev[id] ?? 0;
            return (
              <div key={id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: cur === 0 ? C.sub : LEVEL_FILL[cur] }}>{LEVEL_WORD[cur]}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 4 }}>
                  {[0, 1, 2, 3].map((lv) => (
                    <button
                      key={lv}
                      type="button"
                              aria-label={`${name}: ${LEVEL_WORD[lv]}`}
                      onClick={() => setSev((s) => ({ ...s, [id]: lv }))}
                      style={{ height: 28, border: 0, borderRadius: 8, cursor: "pointer", padding: 0, background: lv <= cur && cur > 0 ? LEVEL_FILL[cur] : lv === 0 && cur === 0 ? "#C9CDF2" : C.lilac }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: 0.6 }}>Food noise</span>
          <div style={{ display: "flex", padding: 4, borderRadius: 999, background: "#fff" }}>
            {["quiet", "some", "loud"].map((id) => (
              <button
                key={id}
                type="button"
                  onClick={() => setNoise(id)}
                style={{ flex: 1, minHeight: 42, border: 0, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", fontFamily: "inherit", ...(noise === id ? { background: C.ink, color: "#fff" } : { background: "transparent", color: C.sub }) }}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "14px 16px", borderRadius: 22, background: "#1B1F4B", color: "#fff" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.yellow }}>Pattern · last 3 shots</span>
          <span style={{ fontSize: 13, lineHeight: 1.45, color: "#DDE2FF" }}>Nausea peaks on day 2 and has been milder after lighter dinners.</span>
        </div>
        <span style={{ marginTop: "auto", display: "flex", justifyContent: "center", alignItems: "center", height: 58, borderRadius: 999, background: C.blue, color: "#fff", fontSize: 17, fontWeight: 700 }}>Save</span>
      </div>
    </Screen>
  );
}
