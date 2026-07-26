import Link from "next/link";
import { ArrowIcon, CubeIcon, ShieldIcon } from "@/components/icons";
import { ModelCatalog } from "@/components/model-catalog";
import { getCatalogModels } from "@/lib/catalog";

export const revalidate = 300;

export default async function Home() {
  const models = await getCatalogModels();
  const animatedCount = models.filter((model) => model.animated).length;

  return (
    <main>
      <section className="hero-shell">
        <div className="hero-grid" aria-hidden="true" />
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              The 3D archive of Samir
            </p>
            <h1>
              Blocky ideas,
              <br />
              <span>ready to explore.</span>
            </h1>
            <p className="hero-lede">
              A growing collection of Blockbench experiments, Minecraft-style
              assets, creatures, props, and animated models.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#catalog">
                Browse the archive
                <ArrowIcon />
              </a>
              <a
                className="button button-secondary"
                href="https://sketchfab.com/3DartSam"
                target="_blank"
                rel="noreferrer"
              >
                View on Sketchfab
                <ArrowIcon />
              </a>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>{models.length}</dt>
                <dd>published models</dd>
              </div>
              <div>
                <dt>{animatedCount}</dt>
                <dd>animated builds</dd>
              </div>
              <div>
                <dt>.bbmodel</dt>
                <dd>source archive soon</dd>
              </div>
            </dl>
          </div>

          <div className="turntable" aria-label="Abstract voxel model preview">
            <div className="turntable-toolbar">
              <span>MODEL_015</span>
              <span>ISO / 45°</span>
            </div>
            <div className="axis axis-x">X</div>
            <div className="axis axis-y">Y</div>
            <div className="axis axis-z">Z</div>
            <div className="voxel-object" aria-hidden="true">
              <span className="voxel voxel-a" />
              <span className="voxel voxel-b" />
              <span className="voxel voxel-c" />
              <span className="voxel voxel-d" />
              <span className="voxel voxel-e" />
            </div>
            <div className="turntable-floor" />
            <div className="turntable-caption">
              <span>
                <CubeIcon />
                Blockbench archive
              </span>
              <span>Drag on a model page to inspect</span>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-section" id="catalog">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Model index</p>
              <h2>Explore the collection</h2>
            </div>
            <p>
              Every listing keeps its Sketchfab source visible. Original
              authorship and redistribution rights are reviewed before a
              project file becomes downloadable.
            </p>
          </div>
          <ModelCatalog models={models} />
        </div>
      </section>

      <section className="trust-section">
        <div className="site-container trust-panel">
          <div className="trust-mark">
            <ShieldIcon />
          </div>
          <div>
            <p className="eyebrow">Clear attribution</p>
            <h2>Credit stays attached to the work.</h2>
          </div>
          <p>
            Some models in this archive began from tutorials or other creators’
            work. Those records are being reviewed. Files are only released
            when redistribution is permitted and the original creator can be
            credited correctly.
          </p>
          <Link className="text-link" href="/usage">
            Read the usage policy
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
