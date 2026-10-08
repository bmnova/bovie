export const SITE_URL = "https://www.bmnova.com";
export const SITE_NAME = "BMNova";
export const SITE_LEGAL_NAME = "BMNova Innovations";
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_DESCRIPTION =
  "BMNova is an Ankara-based mobile app studio and consumer-app startup. We design, build and ship our own AI apps: Pali, FitVibe, Haki, RoomPace, NextStep, Bloomish and Offer.";

/** First-party apps with landings on bmnova.com/projects/*, in order of importance */
export const FIRST_PARTY_PROJECTS = [
  "pali",
  "fitvibe",
  "haki",
  "roompace",
  "nextstep",
  "bloomish",
  "offer",
] as const;

export type FirstPartyProject = (typeof FIRST_PARTY_PROJECTS)[number];

/**
 * First-party products on their own domains (still BMNova — not partners).
 * Not listed in FIRST_PARTY_PROJECTS because they have no /projects/* route here.
 */
export const FIRST_PARTY_EXTERNAL = [
  {
    id: "intyx",
    name: "intyx.ai",
    url: "https://intyx.ai",
    description:
      "Transform your data into instant dashboards. Upload a CSV and AI creates interactive charts in seconds.",
  },
  {
    id: "dynamic-intyx",
    name: "dynamic.intyx.ai",
    url: "https://dynamic.intyx.ai",
    description:
      "Update your Flutter app content in real time without shipping a new build.",
  },
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
