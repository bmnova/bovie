"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { webApps } from "@/content";

export function WebApps() {
  return (
    <section id="products" className="relative px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent"
          >
            {webApps.heading}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mb-16 text-4xl font-bold tracking-tight text-primary md:text-5xl"
          >
            Two products.
            <br />
            <span className="text-muted">One vision.</span>
          </motion.h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {webApps.items.map((app) => (
              <motion.div key={app.id} variants={fadeInUp}>
                <AppCard app={app} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AppCard({
  app,
}: {
  app: {
    label: string;
    badge: string;
    tagline: string;
    description: string;
    highlights: string[];
    href: string;
    color: string;
  };
}) {
  return (
    <a href={app.href} target="_blank" rel="noopener noreferrer" className="block group">
      <motion.div
        className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface-2 p-8 transition-all duration-300 group-hover:border-accent/30"
        whileHover={{ y: -4 }}
      >
        {/* Top glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent, ${app.color}60, transparent)`,
          }}
        />

        <div className="mb-6 flex items-start justify-between">
          <div>
            <span
              className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: `${app.color}20`, color: app.color }}
            >
              {app.badge}
            </span>
            <h3 className="text-2xl font-bold text-primary">{app.label}</h3>
            <p className="mt-1 text-sm font-medium" style={{ color: app.color }}>
              {app.tagline}
            </p>
          </div>
          <span
            className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            style={{ color: app.color }}
          >
            ↗
          </span>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-muted">{app.description}</p>

        <ul className="space-y-2">
          {app.highlights.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-primary/70">
              <span style={{ color: app.color }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </a>
  );
}
