type StoreBadgesProps = {
  googlePlayUrl: string;
  appStoreUrl: string;
  className?: string;
};

/** Shared display height — both badges are SVG with ~3:1 aspect ratio */
const BADGE_CLASS = "h-10 w-auto md:h-11";

export function StoreBadges({
  googlePlayUrl,
  appStoreUrl,
  className = "",
}: StoreBadgesProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-4 sm:gap-5 ${className}`}
    >
      <a
        href={googlePlayUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center transition-opacity hover:opacity-85"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/badges/google-play.svg"
          alt="Get it on Google Play"
          className={BADGE_CLASS}
        />
      </a>
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center transition-opacity hover:opacity-85"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/badges/app-store.svg"
          alt="Download on the App Store"
          className={BADGE_CLASS}
        />
      </a>
    </div>
  );
}
