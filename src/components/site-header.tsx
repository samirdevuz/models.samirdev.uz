import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Samir’s model archive home"
          prefetch={false}
        >
          <span className="brand-mark" aria-hidden="true" />
          <span>
            samirdev <span>/ models</span>
          </span>
        </Link>
        <nav className="header-nav" aria-label="Primary navigation">
          <Link href="/#catalog" prefetch={false}>
            Archive
          </Link>
          <Link href="/usage" prefetch={false}>
            Usage
          </Link>
          <a href="https://samirdev.uz">Portfolio</a>
        </nav>
        <div className="header-meta">
          <span className="online-dot" />
          archive online
        </div>
      </div>
    </header>
  );
}
