"use client";

import { useRef, useState, useCallback, useEffect } from "react";
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

const LONG_PRESS_MS = 500;

export function Projects() {
  const { locale } = useLocale();
  const { projects } = contentMap[locale];
  const [fullscreenImage, setFullscreenImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const preventNextClickRef = useRef(false);

  const openFullscreen = useCallback((src: string, alt: string) => {
    setFullscreenImage({ src, alt });
    preventNextClickRef.current = true;
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreenImage(null);
  }, []);

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
                  longPressToViewFull={projects.longPressToViewFull}
                  onOpenFullscreen={openFullscreen}
                  preventNextClickRef={preventNextClickRef}
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

function useLongPress(onLongPress: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(onLongPress, LONG_PRESS_MS);
  }, [onLongPress, clearTimer]);

  return { onTouchStart: start, onTouchEnd: clearTimer, onTouchCancel: clearTimer, onMouseDown: start, onMouseUp: clearTimer, onMouseLeave: clearTimer };
}

function ProjectCard({
  project,
  longPressToViewFull,
  onOpenFullscreen,
  preventNextClickRef,
}: {
  project: {
    title: string;
    description: string;
    tags: string[];
    href?: string;
    color?: string;
    image?: string;
    status?: string;
  };
  longPressToViewFull: string;
  onOpenFullscreen: (src: string, alt: string) => void;
  preventNextClickRef: React.MutableRefObject<boolean>;
}) {
  const { locale } = useLocale();
  const inReviewLabel = locale === "tr" ? "İncelemede" : "In Review";
  const longPress = useLongPress(
    useCallback(() => {
      if (project.image) onOpenFullscreen(project.image, project.title);
    }, [project.image, project.title, onOpenFullscreen])
  );

  const handleImageClick = useCallback(
    (e: React.MouseEvent) => {
      if (preventNextClickRef.current) {
        e.preventDefault();
        e.stopPropagation();
        preventNextClickRef.current = false;
      }
    },
    [preventNextClickRef]
  );

  const inner = (
    <motion.div
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/20 hover:shadow-xl"
      whileHover={{ y: -4 }}
    >
      <div className="relative">
        {project.image ? (
          <div
            className="relative aspect-video w-full overflow-hidden"
            {...longPress}
            onClick={handleImageClick}
            onContextMenu={(e) => e.preventDefault()}
            role="button"
            tabIndex={0}
            aria-label={`${longPressToViewFull} — ${project.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-top"
            />
            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/75 to-transparent py-2.5 text-xs font-medium text-white/95"
              initial={false}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                className="h-3.5 w-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              <span>{longPressToViewFull}</span>
            </motion.div>
          </div>
        ) : (
          <Thumbnail
            color={project.color}
            label={project.title}
            className="w-full h-44"
          />
        )}
        {project.status === "in_review" && (
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {inReviewLabel}
          </span>
        )}
      </div>

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
