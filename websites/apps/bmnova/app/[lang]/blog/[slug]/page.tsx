import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { RelatedPosts } from "@/components/RelatedPosts";
import { PostStoreCta } from "@/components/PostStoreCta";
import { getPost, getAllPosts, getRelatedPosts, getTranslation, type Post } from "@/lib/posts";
import {
  blogPostingJsonLd,
  faqPageJsonLd,
} from "@/lib/json-ld";
import { contentMap } from "@/content";
import { LOCALES, localePath, type Locale } from "@/lib/i18n";

type Props = { params: { lang: Locale; slug: string } };

export async function generateStaticParams({ params }: { params: { lang: Locale } }) {
  return getAllPosts(params.lang).map((post) => ({ slug: post.slug }));
}

/** Where the language switch goes: the translated post, or that language's blog index. */
function localeHrefs(post: Post): Record<Locale, string> {
  const translation = getTranslation(post);
  return Object.fromEntries(
    LOCALES.map((l) => [
      l,
      l === post.locale
        ? localePath(l, `/blog/${post.slug}`)
        : localePath(l, translation ? `/blog/${translation.slug}` : "/blog"),
    ])
  ) as Record<Locale, string>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug, params.lang);
  if (!post) return {};
  const url = localePath(post.locale, `/blog/${post.slug}`);
  const translation = getTranslation(post);
  return {
    title: `${post.title} — BMNova`,
    description: post.summary,
    alternates: {
      canonical: url,
      ...(translation
        ? {
            languages: {
              [post.locale]: url,
              [translation.locale]: localePath(translation.locale, `/blog/${translation.slug}`),
              "x-default": post.locale === "en" ? url : localePath("en", `/blog/${translation.slug}`),
            },
          }
        : {}),
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: ["BMNova"],
      tags: post.tags,
      url,
      locale: post.locale === "tr" ? "tr_TR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug, params.lang);
  if (!post) notFound();
  const locale = params.lang;
  const { blog } = contentMap[locale];

  const related = getRelatedPosts(post.slug, locale);
  const schemas = [
    blogPostingJsonLd(post),
    faqPageJsonLd(post.faqs),
  ].filter(Boolean) as Record<string, unknown>[];

  return (
    <InnerPageLayout localeHrefs={localeHrefs(post)}>
      <JsonLd data={schemas} />
      <main className="min-h-screen bg-surface px-6 py-12 md:px-12">
        <div className="mx-auto max-w-2xl">
          <Link
            href={localePath(locale, "/blog")}
            className="mb-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            {blog.allPosts}
          </Link>

          <div className="mb-3 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              {new Date(post.date).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </span>
            <span className="text-xs text-dim">·</span>
            <span className="text-xs text-muted">
              {post.readingTime} {blog.minRead}
            </span>
          </div>

          <h1 className="mb-4 font-display text-[clamp(36px,5vw,60px)] font-extrabold text-primary">
            {post.title}
          </h1>

          <p className="mb-6 text-lg text-muted">{post.summary}</p>

          <div className="mb-12 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {post.product ? <PostStoreCta product={post.product} /> : null}

          <RelatedPosts posts={related} locale={locale} />
        </div>
      </main>
    </InnerPageLayout>
  );
}
