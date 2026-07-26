import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalIcon } from "@/components/icons";
import { getCatalogModel } from "@/lib/catalog";
import { getModel, models } from "@/lib/models";

type ModelPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export function generateStaticParams() {
  return models.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({
  params,
}: ModelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(slug);

  if (!model) {
    return {};
  }

  return {
    title: model.title,
    description: model.description,
    alternates: { canonical: `/models/${model.slug}` },
    openGraph: {
      title: model.title,
      description: model.description,
      images: [{ url: model.thumbnail, width: 720, height: 405 }],
    },
  };
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { slug } = await params;
  const model = await getCatalogModel(slug);

  if (!model) {
    notFound();
  }

  return (
    <main className="detail-page">
      <div className="site-container">
        <div className="detail-breadcrumb">
          <Link href="/">Archive</Link>
          <span>/</span>
          <span>M_{String(model.index).padStart(3, "0")}</span>
        </div>

        <div className="detail-layout">
          <div className="viewer-shell">
            <div className="viewer-bar">
              <span>Interactive Sketchfab viewer</span>
              <span>{model.animated ? "Animation available" : "Static model"}</span>
            </div>
            <iframe
              title={`${model.title} interactive 3D preview`}
              src={`https://sketchfab.com/models/${model.id}/embed?autostart=0&ui_theme=dark`}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          </div>

          <aside className="detail-sidebar">
            <p className="detail-kicker">
              {model.category} / {model.year}
            </p>
            <h1 className="detail-title">{model.title}</h1>
            <p className="detail-description">{model.description}</p>

            <dl className="detail-facts">
              <div>
                <dt>Format</dt>
                <dd>Blockbench</dd>
              </div>
              <div>
                <dt>Motion</dt>
                <dd>{model.animated ? "Animated" : "Static"}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Reviewing</dd>
              </div>
            </dl>

            {model.downloadReady ? (
              <div className="review-notice review-notice-ready">
                <strong>Verified for redistribution</strong>
                The source, creator, and license record for this project file
                have been reviewed. Keep the listed attribution with the work.
              </div>
            ) : (
              <div className="review-notice">
                <strong>Attribution review in progress</strong>
                The original creator, tutorial source, license, and permission to
                redistribute the project file are being verified. The .bbmodel
                download stays locked until that review is complete.
              </div>
            )}

            <div className="detail-actions">
              {model.downloadReady ? (
                <a className="button button-primary" href={`/api/download/${model.slug}`}>
                  Download .bbmodel
                </a>
              ) : (
                <button
                  className="button button-disabled"
                  type="button"
                  disabled
                  title="The project file is still being reviewed"
                >
                  .bbmodel coming soon
                </button>
              )}
              <a
                className="button button-secondary"
                href={model.sketchfabUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open Sketchfab
                <ExternalIcon />
              </a>
            </div>

            <div className="source-row">
              <span>Source title</span>
              <a href={model.sketchfabUrl} target="_blank" rel="noreferrer">
                {model.sourceTitle}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
