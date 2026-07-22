"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  blurIn,
  fadeInUp,
  staggerContainer,
  staggerContainerFast,
} from "@websites/shared/animations";
import { Thumbnail } from "@websites/shared/assets";
import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { MouseGlow, TiltCard } from "@/components/motion";

export function Projects() {
  const { locale } = useLocale();
  const { projects } = contentMap[locale];
  const [fullscreenImage, setFullscreenImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const openFullscreen = useCallback((src: string, alt: string) => {
    setFullscreenImage({ src, alt });
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreenImage(null);
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-28 md:px-12"
    >
      <MouseGlow color="#6366F1" size={560} opacity={0.1} />
      <div className="relative z-10 mx-auto max-w-6xl">
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
            className="flex flex-wrap justify-center gap-6"
          >
            {projects.items.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                className="mb-6 w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <ProjectCard
                  project={project}
                  onOpenFullscreen={openFullscreen}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {fullscreenImage && (
          <FullscreenImageOverlay
            key={fullscreenImage.src}
            src={fullscreenImage.src}
            alt={fullscreenImage.alt}
            onClose={closeFullscreen}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function FullscreenImageOverlay({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        onClick={onClose}
        aria-label="Close"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="relative max-h-[90vh] max-w-full overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-[90vh] w-auto max-w-full object-contain"
        />
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  onOpenFullscreen,
}: {
  project: {
    title: string;
    description: string;
    tags: string[];
    href?: string;
    color?: string;
    image?: string;
    initials?: string;
    status?: string;
  };
  onOpenFullscreen: (src: string, alt: string) => void;
}) {
  const { locale } = useLocale();
  const inReviewLabel = locale === "tr" ? "İncelemede" : "In Review";

  const inner = (
    <motion.div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/20 hover:shadow-xl"
      whileHover={{ y: -4 }}
    >
      {project.color && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${project.color}18, transparent 70%)`,
          }}
          aria-hidden
        />
      )}
      <div className="relative z-[1]">
        {project.image ? (
          <TiltCard maxTilt={7} className="aspect-video w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <button
              type="button"
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/40"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenFullscreen(project.image!, project.title);
              }}
              aria-label={`View full image — ${project.title}`}
            >
              <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-primary opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                View
              </span>
            </button>
          </TiltCard>
        ) : (
          <TiltCard maxTilt={7} className="overflow-hidden">
            <Thumbnail
              color={project.color}
              label={project.title}
              initials={project.initials}
              className="h-44 w-full"
            />
          </TiltCard>
        )}
        {project.status === "in_review" && (
          <span className="absolute right-3 top-3 z-30 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {inReviewLabel}
          </span>
        )}
      </div>

      <div className="relative z-[1] flex flex-1 flex-col p-6">
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
        <h3 className="mb-2 text-lg font-bold text-primary transition-colors group-hover:text-accent">
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
