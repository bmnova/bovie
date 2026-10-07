import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { LocaleProvider } from "@/app/locale-context";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { isLocale, LOCALE_PARAMS, pageMetadata } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { contentMap } from "@/content";
import "../globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALE_PARAMS;
}

export const viewport: Viewport = {
  themeColor: "#0B0B12",
  colorScheme: "dark",
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const { meta } = contentMap[params.lang];
  return {
    metadataBase: new URL(SITE_URL),
    ...pageMetadata({
      locale: params.lang,
      path: "/",
      title: meta.homeTitle,
      description: meta.description,
    }),
    applicationName: SITE_NAME,
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();

  return (
    <html
      lang={params.lang}
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual'" }} />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </head>
      <body>
        <LocaleProvider locale={params.lang}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
