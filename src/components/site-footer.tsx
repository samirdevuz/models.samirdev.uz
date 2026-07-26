import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <div>
          <Link className="brand" href="/" prefetch={false}>
            <span className="brand-mark" aria-hidden="true" />
            <span>
              samirdev <span>/ models</span>
            </span>
          </Link>
          <p className="footer-copy">
            A carefully indexed archive of Blockbench experiments and
            Minecraft-style 3D work.
          </p>
        </div>
        <div>
          <p className="footer-label">Navigate</p>
          <div className="footer-links">
            <Link href="/#catalog" prefetch={false}>
              Model archive
            </Link>
            <Link href="/usage" prefetch={false}>
              Usage policy
            </Link>
            <a href="https://samirdev.uz">Main portfolio</a>
          </div>
        </div>
        <div>
          <p className="footer-label">Elsewhere</p>
          <div className="footer-links">
            <a href="https://sketchfab.com/3DartSam">Sketchfab</a>
            <a href="https://github.com/samirdevuz">GitHub</a>
            <a href="https://t.me/samirdevuz">Telegram</a>
          </div>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>© 2026 Samir Abdumo&apos;minov</span>
        <span>Built with Blockbench spirit + Next.js</span>
      </div>
    </footer>
  );
}
