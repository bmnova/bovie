import { storeLinks } from "@/config/store-links";
import { APPS, appStore } from "@/content/apps";
import type { FirstPartyProject } from "@/lib/site";
import {
  absoluteUrl,
  FIRST_PARTY_EXTERNAL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export type FaqItem = { question: string; answer: string };

/** schema.org application category for each app */
const APP_CATEGORY: Record<FirstPartyProject, string> = {
  pali: "HealthApplication",
  fitvibe: "LifestyleApplication",
  haki: "EntertainmentApplication",
  roompace: "LifestyleApplication",
  nextstep: "LifestyleApplication",
  bloomish: "LifestyleApplication",
  offer: "SocialNetworkingApplication",
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: "hello@bmnova.com",
    description: SITE_DESCRIPTION,
    sameAs: [
      ...Object.values(storeLinks).flatMap((links) => Object.values(links)),
      ...FIRST_PARTY_EXTERNAL.map((p) => p.url),
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function blogPostingJsonLd(input: {
  title: string;
  summary: string;
  slug: string;
  date: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.summary,
    datePublished: input.date,
    dateModified: input.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${input.slug}`),
    keywords: input.tags.join(", "),
    url: absoluteUrl(`/blog/${input.slug}`),
  };
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function softwareApplicationJsonLd(project: FirstPartyProject) {
  const app = APPS[project];
  const store = appStore(app);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.copy.en.heroBody,
    url: absoluteUrl(`/projects/${project}`),
    applicationCategory: APP_CATEGORY[project],
    operatingSystem: app.platforms === "both" ? "iOS, Android" : "Android",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(store
      ? {
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          downloadUrl: Object.values(store),
          installUrl: store.googlePlay,
        }
      : {}),
  };
}
