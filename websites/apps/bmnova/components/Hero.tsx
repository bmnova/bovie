"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blurIn, fadeInUp, staggerContainer } from "@websites/shared/animations";
import { Squiggle } from "@websites/shared/assets";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function Hero() {
  const { locale } = useLocale();
  const { hero } = contentMap[locale];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-gradient px-6">
      {/* Organic animated blob 1 */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px]"
        style={{
          background: "radial-gradient(ellipse at center, #6366F118, transparent 70%)",
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          filter: "blur(70px)",
        }}
        animate={{
          borderRadius: [
            "60% 40% 70% 30% / 50% 60% 40% 50%",
            "40% 60% 30% 70% / 60% 40% 60% 40%",
            "55% 45% 65% 35% / 45% 55% 45% 55%",
            "60% 40% 70% 30% / 50% 60% 40% 50%",
          ],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Organic animated blob 2 */}
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px]"
        style={{
          background: "radial-gradient(ellipse at center, #818CF812, transparent 70%)",
          borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
          filter: "blur(55px)",
        }}
        animate={{
          borderRadius: [
            "40% 60% 30% 70% / 60% 40% 60% 40%",
            "60% 40% 70% 30% / 50% 60% 40% 50%",
            "35% 65% 55% 45% / 50% 35% 65% 50%",
            "40% 60% 30% 70% / 60% 40% 60% 40%",
          ],
        }}
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
            {/* Logo + BMNova Innovations — above title, not in navbar */}
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

            <motion.h1
              variants={blurIn}
              className="mb-4 text-5xl font-bold leading-[1.1] tracking-tight text-primary md:text-7xl"
              style={{ whiteSpace: "pre-line" }}
            >
              {hero.tagline}
            </motion.h1>

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
              <a
                href={hero.cta.href}
                className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-accent/30"
              >
                {hero.cta.label}
              </a>
              <a
                href={hero.ctaSecondary.href}
                className="rounded-full border border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:border-accent hover:text-accent"
              >
                {hero.ctaSecondary.label}
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex items-center justify-center divide-x divide-muted/20 text-xs lg:justify-start"
            >
              <span className="flex items-center gap-1.5 px-5 first:pl-0">
                <CountUp to={4} delay={900} className="font-bold text-primary" />
                <span className="text-muted">{hero.stats.products}</span>
              </span>
              <span className="px-5 font-medium text-muted">{hero.stats.techStack}</span>
              <span className="flex items-center gap-1.5 px-5">
                <CountUp to={2} delay={1100} className="font-bold text-primary" />
                <span className="text-muted">{hero.stats.founders}</span>
              </span>
            </motion.div>
          </div>

          {/* Phone mockup — desktop only */}
          <motion.div
            variants={fadeInUp}
            className="hidden shrink-0 lg:block"
          >
            <AppMockup />
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}

// Count-up number animation (triggers on mount with optional delay)
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

  useEffect(() => {
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
  }, [to, delay]);

  return <span className={className}>{count}</span>;
}

// Animated AI mobile mockup
function AppMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 2200),
      setTimeout(() => setStep(3), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const bars = [
    { width: 72, label: "Mobile" },
    { width: 45, label: "Web" },
    { width: 88, label: "AI" },
    { width: 61, label: "SaaS" },
  ];

  return (
    // Outer phone frame
    <div
      className="relative w-[230px] overflow-hidden rounded-[2.8rem] shadow-2xl"
      style={{
        background: "linear-gradient(145deg, #1e1b4b, #0f172a)",
        padding: "3px",
      }}
    >
      {/* Animated border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[2.8rem]"
        style={{
          background:
            "conic-gradient(from 0deg, #6366F140, #818CF820, #6366F140, transparent 60%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Screen */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#080d1a]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-1">
          <span className="text-[10px] font-medium text-white/30">9:41</span>
          {/* Dynamic island */}
          <div className="h-[18px] w-[80px] rounded-full bg-black" />
          <div className="flex items-center gap-1">
            <div className="h-1 w-3 rounded-full bg-white/30" />
            <div className="h-1 w-3 rounded-full bg-white/30" />
            <div className="h-2 w-2 rounded-full bg-white/30" />
          </div>
        </div>

        {/* App header */}
        <div className="px-5 pb-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">
              intyx<span className="text-accent">.ai</span>
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-accent"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </div>

        {/* Chat area */}
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

        {/* Input bar */}
        <div className="px-4 pb-6 pt-2">
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2.5">
            <span className="flex-1 text-[10px] text-white/20">Ask anything...</span>
            <motion.div
              className="flex h-5 w-5 items-center justify-center rounded-full bg-accent"
              animate={{ scale: [1, 1.1, 1] }}
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
