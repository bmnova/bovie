import Link from "next/link";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { contentMap } from "@/content";
import { localePath, pageMetadata, type Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";

type Props = { params: { lang: Locale } };

export function generateMetadata({ params }: Props) {
  return pageMetadata({ locale: params.lang, path: "/blog", ...contentMap[params.lang].meta.pages.blog });
}

export default function BlogPage({ params }: Props) {
  const locale = params.lang;
  const { blog } = contentMap[locale];
  const posts = getAllPosts();
  const date = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <InnerPageLayout>
      <main className="min-h-screen px-[clamp(20px,4vw,56px)] pb-20 pt-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="hero-in mb-3 font-display text-[clamp(48px,7vw,88px)] font-extrabold">{blog.title}</h1>
          <p className="hero-in hero-in-2 mb-3 text-lg text-muted">{blog.subtitle}</p>
          {locale !== "en" && <p className="hero-in hero-in-3 text-sm text-dim">{blog.onlyEnglish}</p>}

          {posts.length === 0 ? (
            <p className="mt-12 text-muted">{blog.noPosts}</p>
          ) : (
            <ul className="mt-12 divide-y divide-border">
              {posts.map((post) => (
                <li key={post.slug} className="reveal">
                  <Link href={localePath(locale, `/blog/${post.slug}`)} className="group block py-10">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                        {date.format(new Date(post.date))}
                      </span>
                      <span className="text-xs text-dim">·</span>
                      <span className="text-xs text-muted">
                        {post.readingTime} {blog.minRead}
                      </span>
                    </div>
                    <h2 className="mb-2 text-xl font-bold text-primary transition-colors group-hover:text-accent">{post.title}</h2>
                    <p className="mb-4 text-sm leading-relaxed text-muted">{post.summary}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
                          {tag}
                        </span>
                      ))}
                      <span className="ml-auto text-xs font-semibold text-accent transition-transform group-hover:translate-x-1">→</span>
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
