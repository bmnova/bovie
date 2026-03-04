"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@websites/shared/animations";
import { about } from "@/content";

export function About() {
  return (
    <section id="about" className="bg-primary px-6 py-28 md:px-12">
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
            About Us
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mb-6 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl"
          >
            {about.heading}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mb-16 max-w-2xl text-lg leading-relaxed text-white/60"
          >
            {about.body}
          </motion.p>

          {/* Values */}
          <div className="mb-20 grid gap-6 md:grid-cols-3">
            {about.values.map((value, i) => (
              <motion.div
                key={value.title}
                variants={i % 2 === 0 ? slideInLeft : slideInRight}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <span className="mb-4 block text-2xl text-accent">{value.icon}</span>
                <h3 className="mb-2 text-lg font-semibold text-white">{value.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Team */}
          <motion.div variants={fadeInUp}>
            <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-white/40">
              The Team
            </p>
            <div className="flex flex-wrap gap-6">
              {about.team.map((member) => (
                <div key={member.name} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{member.name}</p>
                    <p className="text-xs text-white/40">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
