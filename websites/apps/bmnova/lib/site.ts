export const SITE_URL = "https://bmnova.com";
export const SITE_NAME = "BMNova";
export const SITE_DESCRIPTION =
  "BMNova builds user-friendly AI apps, mobile products, and SaaS tools. Clean code, thoughtful design.";

export const FIRST_PARTY_PROJECTS = [
  "dietpal",
  "fitvibe",
  "roompace",
  "kami",
  "offer",
  "nextstep",
  "bloomish",
] as const;

export type FirstPartyProject = (typeof FIRST_PARTY_PROJECTS)[number];

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
