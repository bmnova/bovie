import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { FirstPartyProject } from "@/lib/site";
import type { FaqItem } from "@/lib/json-ld";

const postsDir = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number; // minutes
  product?: FirstPartyProject;
}

export interface Post extends PostMeta {
  contentHtml: string;
  contentMarkdown: string;
  faqs: FaqItem[];
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Parse FAQ section: **Question?** followed by answer paragraphs until next **Q** or ## */
export function parseFaqsFromMarkdown(markdown: string): FaqItem[] {
  const faqHeading = markdown.search(/^## FAQ\s*$/m);
  if (faqHeading === -1) return [];

  const afterHeading = markdown.slice(faqHeading).replace(/^## FAQ\s*\n/, "");
  const endMatch = afterHeading.search(/\n## |\n---\s*\n/);
  const body = (endMatch === -1 ? afterHeading : afterHeading.slice(0, endMatch)).trim();

  const parts = body.split(/\n(?=\*\*)/);
  const faqs: FaqItem[] = [];

  for (const part of parts) {
    const m = part.match(/^\*\*(.+?)\*\*\s*\n([\s\S]+)$/);
    if (!m) continue;
    const question = stripMarkdown(m[1]);
    const answer = stripMarkdown(m[2]);
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}

function toMeta(
  slug: string,
  data: Record<string, unknown>,
  content: string
): PostMeta {
  const wordCount = content.trim().split(/\s+/).length;
  const product = data.product as FirstPartyProject | undefined;

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    summary: data.summary as string,
    tags: (data.tags as string[]) ?? [],
    readingTime: Math.max(1, Math.ceil(wordCount / 200)),
    ...(product ? { product } : {}),
  };
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data, content } = matter(raw);
      return toMeta(slug, data, content);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const contentHtml = await marked(content);
  const meta = toMeta(slug, data, content);

  return {
    ...meta,
    contentHtml,
    contentMarkdown: content,
    faqs: parseFaqsFromMarkdown(content),
  };
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
      const sameProduct =
        current.product && p.product && current.product === p.product ? 2 : 0;
      return { post: p, score: sharedTags + sameProduct };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.post.date < b.post.date ? 1 : -1;
    });

  return scored.slice(0, limit).map((x) => x.post);
}

export function getPostsByProduct(product: FirstPartyProject): PostMeta[] {
  return getAllPosts().filter((p) => p.product === product);
}
