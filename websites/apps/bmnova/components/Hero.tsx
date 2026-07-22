"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { Squiggle } from "@websites/shared/assets";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import {
  MagneticCTA,
  MouseGlow,
  SplitWords,
  TiltCard,
  useCanHover,
  usePrefersReducedMotion,
} from "@/components/motion";

export function Hero() {
  const { locale } = useLocale();
  const { hero } = contentMap[locale];
  const reduced = usePrefersReducedMotion();
  const canHover = useCanHover();
  const sectionRef = useRef<HTMLElement>(null);

  const blob1X = useSpring(0, { stiffness: 50, damping: 20 });
  const blob1Y = useSpring(0, { stiffness: 50, damping: 20 });
  const blob2X = useSpring(0, { stiffness: 40, damping: 22 });
  const blob2Y = useSpring(0, { stiffness: 40, damping: 22 });

  useEffect(() => {
    if (reduced || !canHover) return;
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      blob1X.set(nx * 36);
      blob1Y.set(ny * 28);
      blob2X.set(nx * -28);
      blob2Y.set(ny * -22);
    };
    const onLeave = () => {
      blob1X.set(0);
      blob1Y.set(0);
      blob2X.set(0);
      blob2Y.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, canHover, blob1X, blob1Y, blob2X, blob2Y]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[85dvh] items-center justify-center overflow-hidden bg-hero-gradient px-6 md:min-h-screen"
    >
      <MouseGlow color="#6366F1" size={560} opacity={0.12} />

      {/* Organic animated blob 1 */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px]"
        style={{
          x: blob1X,
          y: blob1Y,
          background: "radial-gradient(ellipse at center, #6366F118, transparent 70%)",
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          filter: "blur(70px)",
        }}
        animate={
          reduced
            ? undefined
            : {
                borderRadius: [
                  "60% 40% 70% 30% / 50% 60% 40% 50%",
                  "40% 60% 30% 70% / 60% 40% 60% 40%",
                  "55% 45% 65% 35% / 45% 55% 45% 55%",
                  "60% 40% 70% 30% / 50% 60% 40% 50%",
                ],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Organic animated blob 2 */}
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px]"
        style={{
          x: blob2X,
          y: blob2Y,
          background: "radial-gradient(ellipse at center, #818CF812, transparent 70%)",
          borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
          filter: "blur(55px)",
        }}
        animate={
          reduced
            ? undefined
            : {
                borderRadius: [
                  "40% 60% 30% 70% / 60% 40% 60% 40%",
                  "60% 40% 70% 30% / 50% 60% 40% 50%",
                  "35% 65% 55% 45% / 50% 35% 65% 50%",
                  "40% 60% 30% 70% / 60% 40% 60% 40%",
                ],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #0f172a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              variants={fadeInUp}
              className="mb-10 flex items-center justify-center gap-3 lg:justify-start"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-accent"
                style={{
                  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.4)",
                }}
              >
                BM
              </div>
              <span className="font-mono text-lg font-semibold tracking-tight text-primary">
                BMNova Innovations
              </span>
            </motion.div>

            <motion.p variants={fadeInUp} className="mb-6 text-sm font-medium text-muted">
              Ankara, Turkey &mdash; Ostim Teknokent
            </motion.p>

            <SplitWords
              text={hero.tagline}
              className="mb-4 text-5xl font-bold leading-[1.1] tracking-tight text-primary md:text-7xl"
            />

            <motion.div
              variants={fadeInUp}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <Squiggle className="w-48 opacity-40" color="#6366F1" />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl lg:mx-0"
            >
              {hero.sub}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <MagneticCTA>
                <a
                  href={hero.cta.href}
                  className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-accent/30"
                >
                  {hero.cta.label}
                </a>
              </MagneticCTA>
              <MagneticCTA strength={0.25}>
                <a
                  href={hero.ctaSecondary.href}
                  className="rounded-full border border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:border-accent hover:text-accent"
                >
                  {hero.ctaSecondary.label}
                </a>
              </MagneticCTA>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs lg:justify-start"
            >
              <span className="flex items-center gap-1.5">
                <CountUp to={hero.stats.total.count} delay={900} className="font-bold text-primary" />
                <span className="text-muted">{hero.stats.total.label}</span>
              </span>
              <span className="hidden text-muted/30 sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <CountUp to={hero.stats.own.count} delay={1000} className="font-bold text-primary" />
                <span className="text-muted">{hero.stats.own.label}</span>
              </span>
              <span className="hidden text-muted/30 sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <CountUp to={hero.stats.client.count} delay={1050} className="font-bold text-primary" />
                <span className="text-muted">{hero.stats.client.label}</span>
              </span>
              <span className="hidden text-muted/30 sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <CountUp to={hero.stats.founders.count} delay={1100} className="font-bold text-primary" />
                <span className="text-muted">{hero.stats.founders.label}</span>
              </span>
              <span className="hidden text-muted/30 sm:inline">·</span>
              <span className="font-medium text-muted">{hero.stats.techStack}</span>
            </motion.div>
          </div>

          {/* Phone mockup — visible in portrait and landscape */}
          <motion.div
            variants={fadeInUp}
            className="flex shrink-0 justify-center max-sm:scale-90"
          >
            <TiltCard maxTilt={10} className="rounded-[2.8rem]">
              <AppMockup />
            </TiltCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function CountUp({
  to,
  delay = 0,
  className,
}: {
  to: number;
  delay?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setCount(to);
      return;
    }
    const startTimer = setTimeout(() => {
      const duration = 1200;
      const startTime = Date.now();
      const timer = setInterval(() => {
        const progress = Math.min((Date.now() - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * to));
        if (progress >= 1) clearInterval(timer);
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [to, delay, reduced]);

  return <span className={className}>{count}</span>;
}

function AppMockup() {
  const [step, setStep] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setStep(3);
      return;
    }
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];
    const clearAll = () => {
      timeoutIds.forEach(clearTimeout);
      timeoutIds.length = 0;
    };
    const runCycle = () => {
      clearAll();
      setStep(0);
      timeoutIds.push(setTimeout(() => setStep(1), 1000));
      timeoutIds.push(setTimeout(() => setStep(2), 2200));
      timeoutIds.push(setTimeout(() => setStep(3), 3200));
      timeoutIds.push(setTimeout(runCycle, 7000));
    };
    runCycle();
    return clearAll;
  }, [reduced]);

  const bars = [
    { width: 72, label: "Mobile" },
    { width: 45, label: "Web" },
    { width: 88, label: "AI" },
    { width: 61, label: "SaaS" },
  ];

  return (
    <div
      className="relative w-[230px] overflow-hidden rounded-[2.8rem] shadow-2xl"
      style={{
        background: "linear-gradient(145deg, #1e1b4b, #0f172a)",
        padding: "3px",
      }}
    >
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[2.8rem]"
          style={{
            background:
              "conic-gradient(from 0deg, #6366F140, #818CF820, #6366F140, transparent 60%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#080d1a]">
        <div className="flex items-center justify-between px-6 pb-1 pt-4">
          <span className="text-[10px] font-medium text-white/30">9:41</span>
          <div className="h-[18px] w-[80px] rounded-full bg-black" />
          <div className="flex items-center gap-1">
            <div className="h-1 w-3 rounded-full bg-white/30" />
            <div className="h-1 w-3 rounded-full bg-white/30" />
            <div className="h-2 w-2 rounded-full bg-white/30" />
          </div>
        </div>

        <div className="px-5 pb-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">
              intyx<span className="text-accent">.ai</span>
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-accent"
                animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </div>

        <div className="min-h-[300px] px-4 pb-2">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                key="user-msg"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 flex justify-end"
              >
                <div
                  className="max-w-[80%] rounded-2xl rounded-tr-sm px-3 py-2"
                  style={{ background: "#6366F130" }}
                >
                  <p className="text-[11px] leading-relaxed text-white/90">
                    Analyze Q4 revenue data
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-3"
              >
                <TypingDots />
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div
                key="ai-response"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3"
              >
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white/5 px-3 py-3">
                  <p className="mb-3 text-[11px] font-semibold text-accent">
                    ↑ 34% revenue growth detected
                  </p>
                  <div className="space-y-2">
                    {bars.map((bar, i) => (
                      <div key={bar.label} className="flex items-center gap-2">
                        <span className="w-8 text-[9px] text-white/30">{bar.label}</span>
                        <div className="flex-1 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className="h-1.5 rounded-full bg-accent/70"
                            initial={{ width: 0 }}
                            animate={{ width: `${bar.width}%` }}
                            transition={{
                              delay: i * 0.12,
                              duration: 0.7,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                        <span className="w-6 text-right text-[9px] text-white/30">
                          {bar.width}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-4 pb-6 pt-2">
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2.5">
            <span className="flex-1 text-[10px] text-white/20">Ask anything...</span>
            <motion.div
              className="flex h-5 w-5 items-center justify-center rounded-full bg-accent"
              animate={reduced ? undefined : { scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 7V1M1.5 3.5L4 1L6.5 3.5"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm bg-white/5 px-3 py-2.5">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/40"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay }}
        />
      ))}
    </div>
  );
}
