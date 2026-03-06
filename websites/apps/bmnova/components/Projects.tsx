"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  blurIn,
  fadeInUp,
  staggerContainer,
  staggerContainerFast,
} from "@websites/shared/animations";
import { Thumbnail } from "@websites/shared/assets";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";

export function Projects() {
  const { locale } = useLocale();
  const { projects } = contentMap[locale];

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
            {projects.eyebrow}
          </motion.p>
          <motion.h2
            variants={blurIn}
            className="mb-16 text-4xl font-bold tracking-tight text-primary md:text-5xl"
          >
            {projects.heading}
          </motion.h2>

          <motion.div
            variants={staggerContainerFast}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.items.map((project, i) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <ProjectCard project={project} featured={i === 0} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: {
    title: string;
    description: string;
    tags: string[];
    href?: string;
    color?: string;
    image?: string;
  };
  featured?: boolean;
}) {
  const inner = (
    <motion.div
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/20 hover:shadow-xl"
      whileHover={{ y: -4 }}
    >
      {project.image ? (
        <div
          className={`flex w-full items-center justify-center overflow-hidden ${featured ? "h-56" : "h-44"}`}
          style={{ backgroundColor: project.color ? `${project.color}18` : "rgba(0,0,0,0.04)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-auto object-contain"
          />
        </div>
      ) : (
        <Thumbnail
          color={project.color}
          label={project.title}
          className={`w-full ${featured ? "h-56" : "h-44"}`}
        />
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3
          className={`mb-2 font-bold text-primary transition-colors group-hover:text-accent ${featured ? "text-xl" : "text-lg"}`}
        >
          {project.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        {project.href && (
          <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-accent">
            {project.href.startsWith("/") ? "Learn more →" : "Visit →"}
          </div>
        )}
      </div>
    </motion.div>
  );

  if (project.href) {
    const isInternal = project.href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={project.href} className="block h-full">
          {inner}
        </Link>
      );
    }
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {inner}
      </a>
    );
  }

  return <div className="block h-full">{inner}</div>;
}
