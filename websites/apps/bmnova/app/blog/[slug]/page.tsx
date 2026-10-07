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

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
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

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

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
            href="/blog"
            className="mb-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            ← All posts
          </Link>

          <div className="mb-3 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-xs text-muted/60">·</span>
            <span className="text-xs text-muted">{post.readingTime} min read</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary md:text-5xl">
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

          <RelatedPosts posts={related} />
        </div>
      </main>
    </InnerPageLayout>
  );
}
