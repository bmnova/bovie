import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { BlogHeader } from "./BlogHeader";

export const metadata = {
  title: "Blog — BM Nova",
  description: "Thoughts on AI, Flutter, and building software.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-surface px-6 py-28 md:px-12">
      <div className="mx-auto max-w-2xl">
        <BlogHeader />

        {posts.length === 0 ? (
          <p className="text-muted">No posts yet. Check back soon.</p>
        ) : (
          <ul className="space-y-10">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-accent">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <h2 className="mb-2 text-xl font-bold text-primary transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mb-3 text-sm leading-relaxed text-muted">
                    {post.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
