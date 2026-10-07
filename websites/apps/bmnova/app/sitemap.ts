import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { LOCALES, localePath } from "@/lib/i18n";
import { FIRST_PARTY_PROJECTS, SITE_URL } from "@/lib/site";

/** Every page exists in English at the root and in Turkish under /tr; posts are English only. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    "/",
    "/blog",
    "/about-us",
    "/careers",
    "/privacy-policy",
    "/terms-of-use",
    "/refund-policy",
    "/account-data-deletion",
    ...FIRST_PARTY_PROJECTS.map((slug) => `/projects/${slug}`),
  ];

  const absolute = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
  const localized: MetadataRoute.Sitemap = pages.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: absolute(localePath(locale, path)),
      lastModified: now,
      changeFrequency: path === "/" || path === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/blog" || path.startsWith("/projects") ? 0.8 : 0.5,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, absolute(localePath(l, path))])),
      },
    }))
  );

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...localized, ...posts];
}
