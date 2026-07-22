import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { FIRST_PARTY_PROJECTS, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/blog",
    "/about-us",
    "/careers",
    "/privacy-policy",
    "/terms-of-use",
    "/refund-policy",
    "/account-data-deletion",
    ...FIRST_PARTY_PROJECTS.map((slug) => `/projects/${slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path.startsWith("/projects")
      ? "monthly"
      : path === "/blog" || path === ""
        ? "weekly"
        : "monthly",
    priority:
      path === ""
        ? 1
        : path === "/blog" || path.startsWith("/projects")
          ? 0.8
          : 0.5,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts];
}
