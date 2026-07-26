import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!process.env.SUPABASE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Downloads are not configured yet." },
      { status: 503 },
    );
  }

  const admin = createAdminSupabaseClient();
  const { data: model, error } = await admin
    .from("models")
    .select(
      "id,slug,bbmodel_path,download_ready,published,redistribution_allowed,attribution_status",
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (
    error ||
    !model ||
    !model.download_ready ||
    !model.bbmodel_path ||
    !model.redistribution_allowed ||
    !["original", "verified"].includes(model.attribution_status)
  ) {
    return NextResponse.json(
      { error: "This project file is not available for download." },
      { status: 404 },
    );
  }

  const { data: signed, error: signError } = await admin.storage
    .from("model-files")
    .createSignedUrl(model.bbmodel_path, 60, {
      download: `${model.slug}.bbmodel`,
    });

  if (signError || !signed?.signedUrl) {
    return NextResponse.json(
      { error: "The download could not be prepared." },
      { status: 503 },
    );
  }

  const { error: recordError } = await admin.rpc("record_model_download", {
    target_model_id: model.id,
  });

  if (recordError) {
    return NextResponse.json(
      { error: "The download could not be recorded." },
      { status: 503 },
    );
  }

  const response = NextResponse.redirect(signed.signedUrl, 302);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
