import { storeLinks } from "@/config/store-links";
import type { FirstPartyProject } from "@/lib/site";
import {
  absoluteUrl,
  FIRST_PARTY_EXTERNAL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export type FaqItem = { question: string; answer: string };

type SoftwareAppConfig = {
  name: string;
  description: string;
  path: string;
  category: string;
  storeKey?: keyof typeof storeLinks;
};

export const SOFTWARE_APPS: Record<FirstPartyProject, SoftwareAppConfig> = {
  dietpal: {
    name: "DietPal",
    description:
      "AI-powered diet app that personalizes your plan based on your needs and lifestyle. Track food, exercise, and well-being with ease.",
    path: "/projects/dietpal",
    category: "HealthApplication",
    storeKey: "dietpal",
  },
  fitvibe: {
    name: "FitVibe",
    description:
      "AI-powered digital wardrobe app. Add clothes, get outfit combinations, discover wardrobe gaps, and virtually try on looks.",
    path: "/projects/fitvibe",
    category: "LifestyleApplication",
    storeKey: "fitvibe",
  },
  roompace: {
    name: "RoomPace",
    description:
      "AI interior design app that plans room makeovers to your budget. Upload a photo, get AI layouts, and build a shoppable wishlist.",
    path: "/projects/roompace",
    category: "LifestyleApplication",
    storeKey: "roompace",
  },
  kami: {
    name: "Kami AI",
    description:
      "AI manga comics generator. Script your story, define your protagonist, pick a visual style, and generate full comic panels.",
    path: "/projects/kami",
    category: "EntertainmentApplication",
  },
  offer: {
    name: "Offer",
    description:
      "Connect with people around you by offering drinks, snacks, or other items at local businesses. Break the ice and make real connections.",
    path: "/projects/offer",
    category: "SocialNetworkingApplication",
    storeKey: "offer",
  },
  nextstep: {
    name: "NextStep",
    description:
      "A minimalist AI coaching app that turns overthinking into action. One reflection, one question, one clear next step.",
    path: "/projects/nextstep",
    category: "LifestyleApplication",
  },
  bloomish: {
    name: "Bloomish",
    description:
      "Generate stunning AI bouquets and send them as gifts. Share moments of joy with anyone, anywhere — beautifully wrapped and personally meaningful.",
    path: "/projects/bloomish",
    category: "LifestyleApplication",
  },
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
      storeLinks.dietpal.googlePlay,
      storeLinks.dietpal.appStore,
      storeLinks.fitvibe.googlePlay,
      storeLinks.fitvibe.appStore,
      storeLinks.roompace.googlePlay,
      storeLinks.roompace.appStore,
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
  const app = SOFTWARE_APPS[project];
  const store = app.storeKey ? storeLinks[app.storeKey] : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: absoluteUrl(app.path),
    applicationCategory: app.category,
    operatingSystem: "iOS, Android",
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
          downloadUrl: [store.googlePlay, store.appStore],
          installUrl: store.googlePlay,
        }
      : {}),
  };
}
