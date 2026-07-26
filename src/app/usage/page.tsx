import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usage and attribution",
  description:
    "How authorship, licensing, redistribution, and .bbmodel downloads are handled in Samir’s 3D archive.",
};

export default function UsagePage() {
  return (
    <main className="policy-page">
      <div className="site-container policy-copy">
        <p className="eyebrow">Archive policy</p>
        <h1>Use the work. Keep the credit clear.</h1>
        <p className="policy-intro">
          Every model has its own origin and license. This archive never treats
          one blanket rule as permission for every file.
        </p>

        <section className="policy-block">
          <h2>Before a file is released</h2>
          <p>
            We verify the original creator, source link, license, and whether
            redistribution of the editable Blockbench project is allowed.
            Models still under review remain visible as previews, but their
            project-file download stays locked.
          </p>
        </section>

        <section className="policy-block">
          <h2>When a model is Samir’s original work</h2>
          <p>
            The model page will state the exact license and allowed uses.
            Attribution requirements, modification rules, and commercial-use
            status will be shown next to the download.
          </p>
        </section>

        <section className="policy-block">
          <h2>When a model uses another creator’s work</h2>
          <ul>
            <li>The original creator and source are named clearly.</li>
            <li>Tutorial-based work is labeled as a study, not an original concept.</li>
            <li>
              An editable file is not redistributed unless the license or
              creator explicitly permits it.
            </li>
            <li>
              If redistribution is not allowed, the page links back to the
              approved original source.
            </li>
          </ul>
        </section>

        <section className="policy-block">
          <h2>Found a missing or incorrect credit?</h2>
          <p>
            Please contact Samir at{" "}
            <a className="text-link" href="mailto:samirabdumominov@gmail.com">
              samirabdumominov@gmail.com
            </a>
            . The download will be paused while the record is reviewed.
          </p>
        </section>
      </div>
    </main>
  );
}
