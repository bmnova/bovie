export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <span className="font-mono text-sm font-bold text-primary">
          bm<span className="text-accent">nova</span>
        </span>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} BM Nova. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
