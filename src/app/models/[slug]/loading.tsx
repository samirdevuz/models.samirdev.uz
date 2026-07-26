export default function ModelLoading() {
  return (
    <main className="detail-page" aria-busy="true">
      <div className="site-container">
        <div className="detail-loading-breadcrumb" />
        <div className="detail-layout">
          <div className="viewer-shell detail-loading-viewer" />
          <div className="detail-loading-copy">
            <span />
            <strong />
            <p />
            <p />
          </div>
        </div>
      </div>
    </main>
  );
}
