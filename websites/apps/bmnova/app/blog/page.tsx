import Link from "next/link";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { getAllPosts } from "@/lib/posts";
import { BlogHeader } from "./BlogHeader";

export const metadata = {
  title: "Blog — BMNova",
  description: "Evidence-based writing on health, productivity, psychology, and building software products.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — BMNova",
    description: "Evidence-based writing on health, productivity, psychology, and building software products.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — BMNova",
    description: "Evidence-based writing on health, productivity, psychology, and building software products.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <InnerPageLayout>
      <main className="min-h-screen bg-surface px-6 py-12 md:px-12">
        <div className="mx-auto max-w-2xl">
          <BlogHeader />

          {posts.length === 0 ? (
            <p className="text-muted">No posts yet. Check back soon.</p>
          ) : (
            <ul className="divide-y divide-border">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block py-10">
                    <div className="mb-2 flex items-center gap-3">
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
                    <h2 className="mb-2 text-xl font-bold text-primary transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-muted">
                      {post.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="ml-auto text-xs font-semibold text-accent transition-opacity group-hover:opacity-70">
                        Read →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </InnerPageLayout>
  );
}
