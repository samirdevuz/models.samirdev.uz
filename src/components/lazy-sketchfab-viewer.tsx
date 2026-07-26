"use client";

import Image from "next/image";
import { useState } from "react";
import { CubeIcon } from "@/components/icons";

type LazySketchfabViewerProps = {
  animated: boolean;
  modelId: string;
  thumbnail: string;
  title: string;
};

export function LazySketchfabViewer({
  animated,
  modelId,
  thumbnail,
  title,
}: LazySketchfabViewerProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="viewer-shell">
      <div className="viewer-bar">
        <span>Interactive Sketchfab viewer</span>
        <span>{animated ? "Animation available" : "Static model"}</span>
      </div>

      <div className="viewer-stage">
        {active ? (
          <iframe
            title={`${title} interactive 3D preview`}
            src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_theme=dark`}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <>
            <Image
              src={thumbnail}
              alt={`${title} 3D preview`}
              fill
              sizes="(max-width: 900px) 100vw, 68vw"
              priority
            />
            <button
              className="viewer-launch"
              type="button"
              onClick={() => setActive(true)}
              aria-label={`Load the interactive 3D viewer for ${title}`}
            >
              <span className="viewer-launch-icon" aria-hidden="true">
                <CubeIcon />
              </span>
              <strong>Load interactive 3D viewer</strong>
              <span>Sketchfab loads only after you click</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
