create table public.models (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null
    check (char_length(title) between 2 and 120),
  source_title text not null default '',
  description text not null default '',
  category text not null
    check (category in ('animals', 'props', 'characters', 'vehicles')),
  animated boolean not null default false,
  model_year smallint not null
    check (model_year between 2000 and 2100),
  display_order integer not null default 0
    check (display_order >= 0),
  sketchfab_id text not null unique
    check (sketchfab_id ~ '^[a-f0-9]{32}$'),
  sketchfab_url text not null
    check (sketchfab_url ~ '^https://sketchfab\.com/'),
  thumbnail_url text not null
    check (thumbnail_url ~ '^https://'),
  original_creator text,
  original_source_url text
    check (original_source_url is null or original_source_url ~ '^https://'),
  license_code text,
  attribution_status text not null default 'pending'
    check (
      attribution_status in (
        'pending',
        'original',
        'verified',
        'restricted'
      )
    ),
  redistribution_allowed boolean not null default false,
  bbmodel_path text unique,
  published boolean not null default true,
  download_count bigint not null default 0
    check (download_count >= 0),
  download_ready boolean generated always as (
    bbmodel_path is not null
    and redistribution_allowed
    and attribution_status in ('original', 'verified')
    and original_creator is not null
    and license_code is not null
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint releasable_file_has_verified_attribution check (
    bbmodel_path is null
    or (
      redistribution_allowed
      and attribution_status in ('original', 'verified')
      and original_creator is not null
      and license_code is not null
    )
  )
);

comment on table public.models is
  'Public model catalog with explicit provenance and redistribution controls.';
comment on column public.models.bbmodel_path is
  'Private Storage object path. Never expose this column directly to anonymous clients.';

create index models_public_catalog_idx
  on public.models (published, display_order, created_at desc);
create index models_category_idx
  on public.models (category)
  where published;

create table public.model_downloads (
  id bigint generated always as identity primary key,
  model_id uuid not null references public.models(id) on delete cascade,
  created_at timestamptz not null default now()
);

comment on table public.model_downloads is
  'Privacy-light download events. No IP address or user identifier is stored.';

create index model_downloads_model_created_idx
  on public.model_downloads (model_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public;

create trigger models_set_updated_at
before update on public.models
for each row
execute function public.set_updated_at();

alter table public.models enable row level security;
alter table public.models force row level security;
alter table public.model_downloads enable row level security;
alter table public.model_downloads force row level security;

grant select (
  id,
  slug,
  title,
  source_title,
  description,
  category,
  animated,
  model_year,
  display_order,
  sketchfab_id,
  sketchfab_url,
  thumbnail_url,
  original_creator,
  original_source_url,
  license_code,
  attribution_status,
  redistribution_allowed,
  published,
  download_count,
  download_ready,
  created_at,
  updated_at
) on public.models to anon, authenticated;
grant insert, update, delete on table public.models to authenticated;
grant select, insert on table public.model_downloads to service_role;
grant usage, select on sequence public.model_downloads_id_seq to service_role;

create policy "Published models are publicly readable"
on public.models
for select
to anon, authenticated
using (published);

create policy "Admins can read every model"
on public.models
for select
to authenticated
using (
  coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

create policy "Admins can insert models"
on public.models
for insert
to authenticated
with check (
  coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

create policy "Admins can update models"
on public.models
for update
to authenticated
using (
  coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
)
with check (
  coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

create policy "Admins can delete models"
on public.models
for delete
to authenticated
using (
  coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

create or replace function public.record_model_download(target_model_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1
    from public.models
    where id = target_model_id
      and published
      and redistribution_allowed
      and attribution_status in ('original', 'verified')
      and bbmodel_path is not null
  ) then
    raise exception 'Model is not available for download';
  end if;

  insert into public.model_downloads (model_id)
  values (target_model_id);

  update public.models
  set download_count = download_count + 1
  where id = target_model_id;
end;
$$;

revoke all on function public.record_model_download(uuid) from public;
revoke all on function public.record_model_download(uuid) from anon;
revoke all on function public.record_model_download(uuid) from authenticated;
grant execute on function public.record_model_download(uuid) to service_role;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'model-files',
  'model-files',
  false,
  52428800,
  array[
    'application/json',
    'application/octet-stream',
    'text/plain'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Admins can read model files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'model-files'
  and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

create policy "Admins can upload model files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'model-files'
  and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

create policy "Admins can replace model files"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'model-files'
  and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
)
with check (
  bucket_id = 'model-files'
  and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

create policy "Admins can delete model files"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'model-files'
  and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);
