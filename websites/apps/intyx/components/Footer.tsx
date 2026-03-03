export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <span className="font-mono text-sm font-bold text-primary">
          int<span className="text-accent">yx</span>
        </span>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} intyx. A BM Nova product.
        </p>
        <a
          href="https://bmnova.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted transition-colors hover:text-accent"
        >
          by bmnova →
        </a>
      </div>
    </footer>
  );
}
