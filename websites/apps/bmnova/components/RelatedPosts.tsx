import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

type RelatedPostsProps = {
  posts: PostMeta[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="mb-6 text-lg font-bold text-primary">Related reading</h2>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block transition-colors"
            >
              <h3 className="mb-1 text-base font-semibold text-primary group-hover:text-accent">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
