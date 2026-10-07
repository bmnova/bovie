import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

type ProjectRelatedReadingProps = {
  posts: PostMeta[];
  accent?: string;
};

/** Server-friendly related blog links for product landings */
export function ProjectRelatedReading({
  posts,
  accent = "var(--accent)",
}: ProjectRelatedReadingProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-border bg-surface px-6 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: accent }}
        >
          From the blog
        </p>
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-primary">
          Related reading
        </h2>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-border px-5 py-4 transition-colors hover:border-accent/40"
              >
                <h3 className="mb-1 font-semibold text-primary group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
