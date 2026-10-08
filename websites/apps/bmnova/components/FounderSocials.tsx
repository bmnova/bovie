import { LinkedInIcon, XIcon } from "@/components/icons";

const linkClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/10 hover:text-primary";

export function FounderSocials({ twitter, linkedin }: { twitter?: string; linkedin?: string }) {
  if (!twitter && !linkedin) return null;
  return (
    <span className="flex items-center gap-1">
      {twitter && (
        <a href={twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className={linkClass}>
          <XIcon className="h-3.5 w-3.5" />
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={linkClass}>
          <LinkedInIcon className="h-4 w-4" />
        </a>
      )}
    </span>
  );
}
