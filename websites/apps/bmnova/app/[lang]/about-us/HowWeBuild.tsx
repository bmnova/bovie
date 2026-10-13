"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

/** Colour and spot on the stage for each agent, in the same order as the agents in the copy */
const AGENT_LAYOUT = [
  { color: "#5B8CFF", x: 50, y: 12.5 },
  { color: "#FF7A2F", x: 83.3, y: 38.4 },
  { color: "#5BC48B", x: 70.5, y: 80.4 },
  { color: "#A855F7", x: 29.5, y: 80.4 },
  { color: "#FF3EA5", x: 16.7, y: 38.4 },
];

const STEP_MS = 1400;
const LAST_STEP = 3;

/** The studio's five agents around the core; a tour walks each through a task until someone picks an agent. */
export function HowWeBuild() {
  const { locale } = useLocale();
  const { howWeBuild: copy } = contentMap[locale].aboutUs;
  const reduced = usePrefersReducedMotion();
  const [tour, setTour] = useState({ agent: 0, step: 0 });
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTour((t) => {
        if (t.step < LAST_STEP) return { ...t, step: t.step + 1 };
        if (auto && !reduced) return { agent: (t.agent + 1) % AGENT_LAYOUT.length, step: 0 };
        return t;
      });
    }, STEP_MS);
    return () => clearInterval(id);
  }, [auto, reduced]);

  const current = copy.agents[tour.agent];
  const layout = AGENT_LAYOUT[tour.agent];
  const target = { "--tx": `${layout.x}%`, "--ty": `${layout.y}%` } as React.CSSProperties;

  return (
    <section className="px-6 pb-24 md:px-12">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14">
        <div className="reveal flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div className="flex max-w-[720px] flex-[1_1_560px] flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">{copy.eyebrow}</p>
            <h2 className="font-display text-[clamp(40px,5.4vw,72px)] font-extrabold">
              {copy.heading}
              <br />
              <span className="text-accent">{copy.headingAccent}</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted">{copy.body}</p>
          </div>
          <span className="whitespace-nowrap rounded-full border border-accent/35 bg-accent/5 px-4 py-2.5 font-mono text-xs uppercase tracking-[.1em] text-accent">
            {copy.badge}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-10">
          {/* Stage */}
          <div className="flex min-w-0 flex-[1_1_520px] justify-center">
            <div className="relative aspect-[600/560] w-full max-w-[600px]" style={{ "--glow": "#DAFF47" } as React.CSSProperties}>
              <svg viewBox="0 0 600 560" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
                <g fill="none" stroke="rgb(218 255 71 / 0.28)" strokeWidth="1.5" strokeDasharray="4 7">
                  {AGENT_LAYOUT.map(({ x, y }) => (
                    <line key={`${x}-${y}`} className="animate-wire" x1="300" y1="280" x2={x * 6} y2={y * 5.6} />
                  ))}
                </g>
              </svg>

              {[0, -2.25].map((delay) => (
                <div key={delay} className="pointer-events-none absolute inset-[38%] animate-ripple rounded-full border border-accent/50" style={{ animationDelay: `${delay}s` }} />
              ))}
              <div className="pointer-events-none absolute inset-[31%] animate-glow rounded-full bg-[radial-gradient(circle,rgb(218_255_71/0.24),transparent_70%)]" />

              <span
                className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-agent-out rounded-full"
                style={{ ...target, background: layout.color, boxShadow: `0 0 18px ${layout.color}` }}
              />
              {tour.step >= 1 && (
                <span
                  className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-agent-back rounded-full bg-accent shadow-[0_0_18px_#DAFF47]"
                  style={target}
                />
              )}

              <div className="absolute left-1/2 top-1/2 flex aspect-square w-[26%] -translate-x-1/2 -translate-y-1/2 animate-breathe flex-col items-center justify-center gap-1 rounded-full border border-accent/40 bg-surface text-center">
                <div className="absolute inset-[7%] animate-spin-7 rounded-full border-2 border-dotted border-accent/45" />
                <span className="font-display text-[clamp(14px,2.4vw,22px)] font-extrabold leading-none">
                  bm<span className="text-accent">nova</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[.1em] text-muted">{copy.hub}</span>
              </div>

              {copy.agents.map((agent, i) => {
                const { color, x, y } = AGENT_LAYOUT[i];
                const active = i === tour.agent;
                return (
                  <button
                    key={agent.name}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setTour({ agent: i, step: 0 });
                      setAuto(false);
                    }}
                    className={`absolute flex w-[27%] min-w-[104px] -translate-x-1/2 -translate-y-1/2 flex-col gap-1.5 rounded-[18px] border bg-card px-3 py-3 sm:px-3.5 text-left transition duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent ${active ? "scale-105 opacity-100" : "border-white/10 opacity-60"}`}
                    style={{ left: `${x}%`, top: `${y}%`, ...(active && { borderColor: color, boxShadow: `0 0 36px ${color}55` }) }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-[9px] w-[9px] shrink-0 rounded-full" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
                      <span className="font-mono text-[10px] uppercase tracking-[.1em] text-dim">{`0${i + 1}`}</span>
                    </span>
                    <span className="font-display text-[clamp(13px,1.6vw,18px)] font-bold leading-tight">{agent.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Task card */}
          <div className="mx-auto flex min-w-0 max-w-[520px] flex-[1_1_380px] flex-col gap-4">
            <div className="flex flex-col gap-[22px] rounded-card border border-border bg-card p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 animate-blink rounded-full" style={{ background: layout.color, boxShadow: `0 0 14px ${layout.color}` }} />
                  <span className="font-mono text-xs uppercase tracking-[.1em] text-muted">
                    {`0${tour.agent + 1}`} · {current.name} {copy.agentSuffix}
                  </span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[.1em] text-dim">{copy.exampleTask}</span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-[28px] font-bold leading-tight">{current.task}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{current.desc}</p>
              </div>

              <ol className="flex flex-col gap-3 border-t border-white/[.08] pt-5">
                {copy.steps.map((label, i) => {
                  const done = tour.step > i;
                  const active = tour.step === i;
                  return (
                    <li key={label} className={`flex min-h-7 items-center gap-3 transition-opacity ${done || active ? "opacity-100" : "opacity-40"}`}>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${done ? "border-accent bg-accent" : active ? "border-accent/60" : "border-white/20"}`}
                      >
                        {done && (
                          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                            <path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="#0B0B12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {active && <span className="h-2 w-2 animate-blink rounded-full bg-accent" />}
                      </span>
                      <span className="text-[15px] font-medium">{label}</span>
                      {active && i === 0 && (
                        <span className="flex gap-1" aria-hidden="true">
                          {[0, 0.15, 0.3].map((delay) => (
                            <span key={delay} className="h-[5px] w-[5px] animate-blink rounded-full bg-muted" style={{ animationDelay: `${delay}s` }} />
                          ))}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>

              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 font-mono text-[10px] uppercase tracking-[.1em] text-dim">{copy.worksIn}</span>
                {current.tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-[13px] text-soft">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-muted">{copy.humanYes}</span>
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setAuto(!auto)}
                  className="min-h-11 rounded-full border border-white/15 px-[18px] text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {auto ? copy.pause : copy.play}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
