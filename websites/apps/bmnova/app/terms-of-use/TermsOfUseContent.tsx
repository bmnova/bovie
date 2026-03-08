"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { termsOfUseContent } from "@/content/terms-of-use";
import { useLocale } from "@/app/locale-context";
import { contentMap } from "@/content";

function linkifyEmail(text: string) {
  if (text.includes("contact@bmnova.com")) {
    return (
      <>
        {text.split("contact@bmnova.com").map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 ? (
              <a
                href="mailto:contact@bmnova.com"
                className="text-accent underline transition-colors hover:text-accent/80"
              >
                contact@bmnova.com
              </a>
            ) : null}
          </span>
        ))}
      </>
    );
  }
  if (text.startsWith("https://")) {
    const url = text.split(/\s/)[0];
    return (
      <>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline transition-colors hover:text-accent/80"
        >
          {url}
        </a>
        {text.slice(url.length) ? ` ${text.slice(url.length)}` : null}
      </>
    );
  }
  return text;
}

export function TermsOfUseContent() {
  const { locale } = useLocale();
  const content = termsOfUseContent[locale];
  const { termsOfUse } = contentMap[locale];

  return (
    <main className="min-h-screen bg-surface">
      <div className="px-6 py-5 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          {termsOfUse.back}
        </Link>
      </div>

      <section className="px-6 pb-20 pt-4 md:px-12">
        <div className="mx-auto max-w-3xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeInUp}
              className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent"
            >
              {termsOfUse.lastUpdatedLabel} {content.lastUpdated}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="mb-6 text-4xl font-bold tracking-tight text-primary md:text-5xl"
            >
              {content.title}
            </motion.h1>

            {content.intro?.length > 0 && (
              <motion.div variants={fadeInUp} className="mb-10 space-y-3 text-sm leading-relaxed text-muted">
                {content.intro.map((p, i) => (
                  <p key={i}>{linkifyEmail(p)}</p>
                ))}
              </motion.div>
            )}

            {content.sections.map((section) => (
              <motion.div
                key={section.number}
                variants={fadeInUp}
                className="mb-10"
              >
                <h2 className="mb-3 text-lg font-semibold text-primary">
                  {section.number}. {section.title}
                </h2>
                <div className="space-y-2 text-sm leading-relaxed text-muted">
                  {section.paragraphs.map((para, i) => (
                    <p key={i}>{linkifyEmail(para)}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
