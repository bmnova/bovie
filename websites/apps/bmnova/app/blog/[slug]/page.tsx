import { notFound } from "next/navigation";
import Link from "next/link";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { getPost, getAllPosts } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) return {};
  return { title: `${post.title} — BMNova`, description: post.summary };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <InnerPageLayout>
      <main className="min-h-screen bg-surface px-6 py-12 md:px-12">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="mb-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            ← All posts
          </Link>

          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>

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
        </div>
      </main>
    </InnerPageLayout>
  );
}
