import Link from "next/link";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { APPS } from "@/content/apps";
import { answerParts, paliFaqContent, plainAnswer } from "@/content/pali-faq";
import { localePath, pageMetadata, type Locale } from "@/lib/i18n";
import { faqPageJsonLd } from "@/lib/json-ld";

type Props = { params: { lang: Locale } };

const linkClass = "text-accent underline transition-colors hover:text-accent/80";

export function generateMetadata({ params }: Props) {
  const { title, description } = paliFaqContent[params.lang];
  return pageMetadata({ locale: params.lang, path: "/pali/faq", title, description });
}

export default function PaliFaqPage({ params }: Props) {
  const content = paliFaqContent[params.lang];

  return (
    <InnerPageLayout>
      <JsonLd
        data={faqPageJsonLd(content.items.map((item) => ({ question: item.question, answer: plainAnswer(item.answer) })))}
      />
      <main className="min-h-screen bg-surface">
        <section className="px-6 pb-20 pt-4 md:px-12">
          <div className="mx-auto max-w-3xl">
            <Link
              href={localePath(params.lang, "/projects/pali")}
              className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-accent"
            >
              ← {APPS.pali.name}
            </Link>
            <h1 className="mb-10 text-4xl font-bold tracking-tight text-primary md:text-5xl">{content.title}</h1>
            <div className="flex flex-col gap-3">
              {content.items.map((item) => (
                <details key={item.question} className="group rounded-[20px] border border-border bg-card px-6 py-5">
                  <summary className="cursor-pointer list-none text-[17px] font-semibold text-primary">{item.question}</summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {answerParts(item.answer).map((part, i) =>
                      "text" in part ? (
                        <span key={i}>{part.text}</span>
                      ) :part.href.startsWith("/") ? (
                        <Link key={i} href={localePath(params.lang, part.href)} className={linkClass}>
                          {part.label}
                        </Link>
                      ) : (
                        <a key={i} href={part.href} className={linkClass}>
                          {part.label}
                        </a>
                      )
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </InnerPageLayout>
  );
}
