import Link from "next/link";
import { contentMap } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import type { PostMeta } from "@/lib/posts";

type ProjectRelatedReadingProps = {
  posts: PostMeta[];
  locale: Locale;
};

/** Server-rendered related blog links for app landings */
export function ProjectRelatedReading({ posts, locale }: ProjectRelatedReadingProps) {
  if (posts.length === 0) return null;
  const { blog } = contentMap[locale];

  return (
    <section className="reveal mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)] pb-[72px]">
      <div className="mb-6 flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[.14em] text-accent">{blog.relatedEyebrow}</span>
        <h2 className="font-display text-[clamp(28px,3vw,40px)] font-extrabold">{blog.relatedHeading}</h2>
      </div>
      <ul className="stagger flex flex-wrap gap-3.5">
        {posts.map((post) => (
          <li key={post.slug} className="flex-[1_1_300px]">
            <Link
              href={localePath(locale, `/blog/${post.slug}`)}
              className="group flex h-full flex-col gap-2 rounded-[20px] border border-border bg-card px-6 py-5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/30"
            >
              <h3 className="font-semibold text-primary group-hover:text-accent">{post.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
