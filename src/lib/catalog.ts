import { createClient } from "@supabase/supabase-js";
import { models as fallbackModels, type ModelRecord } from "@/lib/models";
import { getPublicSupabaseEnv, hasSupabaseEnv } from "@/lib/supabase/env";

type PublicModelRow = {
  slug: string;
  title: string;
  source_title: string;
  description: string;
  category: ModelRecord["category"];
  animated: boolean;
  model_year: number;
  display_order: number;
  sketchfab_id: string;
  sketchfab_url: string;
  thumbnail_url: string;
  original_creator: string | null;
  original_source_url: string | null;
  license_code: string | null;
  attribution_status: ModelRecord["attributionStatus"];
  redistribution_allowed: boolean;
  download_ready: boolean;
  download_count: number;
};

const publicColumns =
  "slug,title,source_title,description,category,animated,model_year,display_order,sketchfab_id,sketchfab_url,thumbnail_url,original_creator,original_source_url,license_code,attribution_status,redistribution_allowed,download_ready,download_count";

function mapRow(row: PublicModelRow): ModelRecord {
  return {
    id: row.sketchfab_id,
    index: row.display_order,
    slug: row.slug,
    title: row.title,
    sourceTitle: row.source_title,
    category: row.category,
    animated: row.animated,
    year: row.model_year,
    thumbnail: row.thumbnail_url,
    sketchfabUrl: row.sketchfab_url,
    description: row.description,
    originalCreator: row.original_creator,
    originalSourceUrl: row.original_source_url,
    licenseCode: row.license_code,
    attributionStatus: row.attribution_status,
    redistributionAllowed: row.redistribution_allowed,
    downloadReady: row.download_ready,
    downloadCount: row.download_count,
  };
}

function getPublicClient() {
  const { url, publishableKey } = getPublicSupabaseEnv();
  return createClient(url, publishableKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function getCatalogModels(): Promise<ModelRecord[]> {
  if (!hasSupabaseEnv()) {
    return fallbackModels;
  }

  const { data, error } = await getPublicClient()
    .from("models")
    .select(publicColumns)
    .eq("published", true)
    .order("display_order");

  if (error || !data?.length) {
    return fallbackModels;
  }

  return (data as PublicModelRow[]).map(mapRow);
}

export async function getCatalogModel(slug: string): Promise<ModelRecord | undefined> {
  if (!hasSupabaseEnv()) {
    return fallbackModels.find((model) => model.slug === slug);
  }

  const { data, error } = await getPublicClient()
    .from("models")
    .select(publicColumns)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) {
    return fallbackModels.find((model) => model.slug === slug);
  }

  return mapRow(data as PublicModelRow);
}
