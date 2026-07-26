"use client";

import { useState } from "react";
import { updateModelAction } from "@/app/admin/actions";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type AdminModel = {
  id: string;
  slug: string;
  title: string;
  description: string;
  original_creator: string | null;
  original_source_url: string | null;
  license_code: string | null;
  attribution_status: string;
  redistribution_allowed: boolean;
  published: boolean;
  bbmodel_path: string | null;
};

export function AdminModelEditor({ model }: { model: AdminModel }) {
  const [bbmodelPath, setBbmodelPath] = useState(model.bbmodel_path ?? "");
  const [uploadState, setUploadState] = useState("");
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file: File | undefined) {
    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith(".bbmodel")) {
      setUploadState("Choose a .bbmodel file.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setUploadState("The file must be smaller than 50 MB.");
      return;
    }

    setUploading(true);
    setUploadState("Uploading…");

    try {
      const supabase = createBrowserSupabaseClient();
      const path = `models/${model.slug}/${crypto.randomUUID()}.bbmodel`;
      const { error } = await supabase.storage
        .from("model-files")
        .upload(path, file, {
          cacheControl: "3600",
          contentType: "application/json",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      setBbmodelPath(path);
      setUploadState("Uploaded. Save the record to attach this file.");
    } catch {
      setUploadState("Upload failed. Check the session and try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={updateModelAction} className="admin-editor">
      <input type="hidden" name="id" value={model.id} />
      <input type="hidden" name="slug" value={model.slug} />
      <input type="hidden" name="bbmodelPath" value={bbmodelPath} />

      <div className="admin-editor-grid">
        <label className="admin-field admin-field-wide">
          <span>Display title</span>
          <input name="title" defaultValue={model.title} required minLength={2} />
        </label>

        <label className="admin-field admin-field-wide">
          <span>Description</span>
          <textarea
            name="description"
            defaultValue={model.description}
            rows={5}
          />
        </label>

        <label className="admin-field">
          <span>Original creator</span>
          <input
            name="originalCreator"
            defaultValue={model.original_creator ?? ""}
            placeholder="Creator name"
          />
        </label>

        <label className="admin-field">
          <span>License</span>
          <input
            name="licenseCode"
            defaultValue={model.license_code ?? ""}
            placeholder="CC BY 4.0"
          />
        </label>

        <label className="admin-field admin-field-wide">
          <span>Original source URL</span>
          <input
            name="originalSourceUrl"
            type="url"
            defaultValue={model.original_source_url ?? ""}
            placeholder="https://…"
          />
        </label>

        <label className="admin-field">
          <span>Attribution status</span>
          <select
            name="attributionStatus"
            defaultValue={model.attribution_status}
          >
            <option value="pending">Pending review</option>
            <option value="original">Original work</option>
            <option value="verified">Verified third-party source</option>
            <option value="restricted">Restricted / no redistribution</option>
          </select>
        </label>

        <label className="admin-file-field">
          <span>Blockbench project</span>
          <input
            type="file"
            accept=".bbmodel,application/json"
            disabled={uploading}
            onChange={(event) => uploadFile(event.target.files?.[0])}
          />
          <small>{uploadState || (bbmodelPath ? "A project file is attached." : "No file attached.")}</small>
        </label>
      </div>

      <div className="admin-checks">
        <label>
          <input
            type="checkbox"
            name="redistributionAllowed"
            defaultChecked={model.redistribution_allowed}
          />
          Redistribution is permitted
        </label>
        <label>
          <input
            type="checkbox"
            name="published"
            defaultChecked={model.published}
          />
          Show in public archive
        </label>
      </div>

      <div className="admin-editor-actions">
        <button className="button button-primary" type="submit">
          Save model record
        </button>
      </div>
    </form>
  );
}
