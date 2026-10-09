import { storeLinks } from "@/config/store-links";
import { APPS, appStore } from "@/content/apps";
import type { FirstPartyProject } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import {
  absoluteUrl,
  FIRST_PARTY_EXTERNAL,
  FIRST_PARTY_PROJECTS,
  ORG_ID,
  SITE_DESCRIPTION,
  SITE_LEGAL_NAME,
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

const ORG_DESCRIPTION: Record<Locale, string> = {
  en: SITE_DESCRIPTION,
  tr: "BMNova (BMNova Innovations), Ankara Ostim Teknokent'te kurulu bir mobil uygulama stüdyosu ve tüketici uygulaması startup'ıdır. Kendi yapay zekâ uygulamalarını tasarlar, geliştirir ve yayınlar: Pali, FitVibe, Haki, RoomPace, NextStep, Bloomish ve Offer.",
};

export function organizationJsonLd(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    alternateName: ["BM Nova", SITE_LEGAL_NAME, "BMNova app studio"],
    url: SITE_URL,
    email: "contact@bmnova.com",
    description: ORG_DESCRIPTION[locale],
    slogan: locale === "tr" ? "Küçük stüdyo. Büyük uygulamalar." : "Tiny studio. Big apps.",
    foundingLocation: {
      "@type": "Place",
      name: "Ostim Teknokent",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ostim Teknokent",
        addressLocality: "Ankara",
        addressCountry: "TR",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ostim Teknokent",
      addressLocality: "Ankara",
      addressCountry: "TR",
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "mobile app studio",
      "consumer mobile apps",
      "mobile app startup",
      "iOS apps",
      "Android apps",
      "Flutter",
      "artificial intelligence",
    ],
    founder: [
      {
        "@type": "Person",
        name: "Ali Mertcan Karaman",
        jobTitle: "Founder",
        image: absoluteUrl("/team/ali-mertcan-karaman.jpg"),
        sameAs: [
          "https://www.linkedin.com/in/ali-mertcan-karaman-088582133/",
          "https://x.com/alimertcank",
        ],
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@bmnova.com",
      contactType: "customer support",
      availableLanguage: ["English", "Turkish"],
    },
    brand: FIRST_PARTY_PROJECTS.map((slug) => ({
      "@type": "Brand",
      name: APPS[slug].name,
      url: absoluteUrl(`/projects/${slug}`),
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "tr" ? "BMNova uygulamaları" : "BMNova apps",
      itemListElement: FIRST_PARTY_PROJECTS.map((slug, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: APPS[slug].name,
          url: absoluteUrl(`/projects/${slug}`),
          applicationCategory: APP_CATEGORY[slug],
          author: { "@id": ORG_ID },
        },
      })),
    },
    sameAs: [
      ...Object.values(storeLinks).flatMap((links) => Object.values(links)),
      ...FIRST_PARTY_EXTERNAL.map((p) => p.url),
    ],
  };
}

export function websiteJsonLd(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: ORG_DESCRIPTION[locale],
    inLanguage: ["en", "tr"],
    publisher: { "@id": ORG_ID },
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
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
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

export function softwareApplicationJsonLd(project: FirstPartyProject, locale: Locale = "en") {
  const app = APPS[project];
  const copy = app.copy[locale];
  const store = appStore(app);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: copy.seoDescription ?? copy.heroBody,
    url: absoluteUrl(`/projects/${project}`),
    inLanguage: locale,
    applicationCategory: APP_CATEGORY[project],
    featureList: copy.features.map((feature) => feature.title),
    operatingSystem: app.platforms === "both" ? "iOS, Android" : "Android",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
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
