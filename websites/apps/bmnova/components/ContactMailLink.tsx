"use client";

/**
 * Mailto link that opens the user's mail client with to, subject and body
 * pre-filled. Uses encodeURIComponent so Turkish characters and line breaks
 * work correctly.
 */
export type ContactMailLinkProps = {
  email: string;
  subject: string;
  body: string;
  children: React.ReactNode;
  className?: string;
  /** If true, render as a button-styled link (default: true). */
  asButton?: boolean;
};

export function buildMailtoHref(email: string, subject: string, body: string): string {
  const bodyWithNewlines = body.replace(/\n/g, "\r\n");
  const parts: string[] = [];
  if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
  parts.push(`body=${encodeURIComponent(bodyWithNewlines)}`);
  const qs = parts.join("&");
  return `mailto:${email}?${qs}`;
}

export function ContactMailLink({
  email,
  subject,
  body,
  children,
  className,
  asButton = true,
}: ContactMailLinkProps) {
  const href = buildMailtoHref(email, subject, body);

  return (
    <a
      href={href}
      className={
        asButton
          ? `inline-block rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted transition-all hover:border-accent hover:text-accent ${className ?? ""}`
          : className
      }
    >
      {children}
    </a>
  );
}

// Nasıl çalışır: buildMailtoHref, mailto:email?subject=...&body=... URL'ini üretir.
// subject ve body encodeURIComponent ile encode edilir; böylece Türkçe karakterler
// ve satır sonları (body'de \r\n → %0D%0A) mail istemcisinde doğru görünür.
// Tıklanınca tarayıcı varsayılan mail uygulamasını bu URL ile açar.
