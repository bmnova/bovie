"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@websites/shared/animations";
import { projects } from "@/content";

export function Projects() {
  return (
    <section id="projects" className="px-6 py-28 md:px-12">
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
            Our Work
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mb-16 text-4xl font-bold tracking-tight text-primary md:text-5xl"
          >
            Products & Projects
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <motion.div key={project.title} variants={scaleIn}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: { title: string; description: string; tags: string[]; href?: string };
}) {
  const inner = (
    <div className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 h-full">
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent/8 px-3 py-1 text-xs font-semibold text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mb-3 text-xl font-bold text-primary group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{project.description}</p>
      {project.href && (
        <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-accent">
          Visit →
        </div>
      )}
    </div>
  );

  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }

  return inner;
}
