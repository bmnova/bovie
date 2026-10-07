"use client";

import { contentMap } from "@/content";
import { useLocale } from "@/app/locale-context";
import { AppleIcon, PlayIcon } from "@/components/icons";

type StoreBadgesProps = {
  googlePlayUrl: string;
  appStoreUrl?: string;
  /** "light" buttons sit on the ink ground, "dark" ones on an accent panel */
  tone?: "light" | "dark";
  className?: string;
};

export function StoreBadges({
  googlePlayUrl,
  appStoreUrl,
  tone = "light",
  className = "",
}: StoreBadgesProps) {
  const { locale } = useLocale();
  const { appPage } = contentMap[locale];
  const button =
    tone === "light"
      ? "bg-primary text-surface hover:shadow-[0_14px_40px_rgba(255,255,255,.18)]"
      : "bg-surface text-primary hover:shadow-[0_14px_40px_rgba(11,11,18,.35)]";

  const badges = [
    appStoreUrl && { url: appStoreUrl, Icon: AppleIcon, small: appPage.downloadOn, big: "App Store" },
    { url: googlePlayUrl, Icon: PlayIcon, small: appPage.getItOn, big: "Google Play" },
  ].filter(Boolean) as { url: string; Icon: typeof AppleIcon; small: string; big: string }[];

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {badges.map(({ url, Icon, small, big }) => (
        <a
          key={big}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex h-14 items-center gap-2.5 rounded-2xl pl-4 pr-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 ${button}`}
        >
          <Icon className="h-6 w-6" />
          <span className="flex flex-col leading-[1.1]">
            <span className="text-[10px] font-semibold opacity-70">{small}</span>
            <span className="text-[17px] font-bold tracking-[-0.01em]">{big}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
