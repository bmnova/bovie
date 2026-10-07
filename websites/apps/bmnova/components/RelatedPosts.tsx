import Link from "next/link";
import { contentMap } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import type { PostMeta } from "@/lib/posts";

type RelatedPostsProps = {
  posts: PostMeta[];
  locale: Locale;
};

export function RelatedPosts({ posts, locale }: RelatedPostsProps) {
  if (posts.length === 0) return null;
  const { blog } = contentMap[locale];

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="mb-6 text-lg font-bold text-primary">{blog.relatedHeading}</h2>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={localePath(locale, `/blog/${post.slug}`)}
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
