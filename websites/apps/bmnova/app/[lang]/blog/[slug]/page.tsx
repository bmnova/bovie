import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { RelatedPosts } from "@/components/RelatedPosts";
import { PostStoreCta } from "@/components/PostStoreCta";
import { getPost, getAllPosts, getRelatedPosts } from "@/lib/posts";
import {
  blogPostingJsonLd,
  faqPageJsonLd,
} from "@/lib/json-ld";
import { contentMap } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

type Props = { params: { lang: Locale; slug: string } };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** Posts are written in English, so every locale points search engines at the English URL. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — BMNova`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: ["BMNova"],
      tags: post.tags,
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const locale = params.lang;
  const { blog } = contentMap[locale];

  const related = getRelatedPosts(post.slug);
  const schemas = [
    blogPostingJsonLd(post),
    faqPageJsonLd(post.faqs),
  ].filter(Boolean) as Record<string, unknown>[];

  return (
    <InnerPageLayout>
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
            lang="en"
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
