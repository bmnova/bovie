"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@websites/shared/animations";
import { privacyPolicyContent } from "@/content/privacy-policy";
import { useLocale } from "@/app/locale-context";
import { contentMap } from "@/content";

function linkifyEmail(text: string) {
  const linkClass = "text-accent underline transition-colors hover:text-accent/80";
  const parts = text.split(/(https:\/\/[^\s]+|contact@bmnova\.com)/g);

  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, i) => {
        if (part === "contact@bmnova.com") {
          return (
            <a key={i} href="mailto:contact@bmnova.com" className={linkClass}>
              {part}
            </a>
          );
        }
        if (part.startsWith("https://")) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {part}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function PrivacyPolicyContent() {
  const { locale } = useLocale();
  const content = privacyPolicyContent[locale];
  const { privacyPolicy } = contentMap[locale];

  return (
    <main className="min-h-screen bg-surface">
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
              {privacyPolicy.lastUpdatedLabel} {content.lastUpdated}
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
