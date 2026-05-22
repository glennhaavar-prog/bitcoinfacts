-- ============================================
-- Arguments — logical / economic reasoning
-- (distinct from empirical, source-cited facts)
-- ============================================

create table arguments (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id),
  status text not null default 'published' check (status in ('draft', 'pending', 'published', 'rejected', 'archived')),

  -- Content
  title_no text not null,
  title_en text,
  thesis_no text,            -- the core assertion (1-2 sentences)
  thesis_en text,
  reasoning_no text,         -- the logical argument, in our own words
  reasoning_en text,

  -- Attribution (paraphrased, never verbatim)
  source_name text,          -- e.g. "Parker Lewis — Gradually, Then Suddenly"
  source_chapter text,       -- chapter / article title
  source_url text,

  -- Metadata
  tags text[] default '{}',
  fud_type text,             -- links to chat fudType: energy|ponzi|criminal|useless|grid|environment|skepticism|other
  strength text default 'sound' check (strength in ('sound', 'plausible', 'contested')),
  notes text,

  -- Tracking
  submitted_by uuid references contributors(id),
  reviewed_by uuid references admins(id),
  reviewed_at timestamptz,
  review_note text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- Row Level Security
-- ============================================

alter table arguments enable row level security;

create policy "Public read published arguments" on arguments
  for select using (status = 'published');

create policy "Admins manage arguments" on arguments
  for all using (auth.uid() in (select auth_user_id from admins));

-- ============================================
-- Indexes
-- ============================================

create index idx_arguments_category on arguments(category_id);
create index idx_arguments_status on arguments(status);
create index idx_arguments_fud_type on arguments(fud_type);
create index idx_arguments_tags on arguments using gin(tags);
create index idx_arguments_search on arguments using gin(
  to_tsvector('english',
    coalesce(title_en, '') || ' ' ||
    coalesce(thesis_en, '') || ' ' ||
    coalesce(reasoning_en, '') || ' ' ||
    coalesce(source_chapter, ''))
);

-- ============================================
-- Updated_at trigger
-- ============================================

create trigger arguments_updated_at
  before update on arguments
  for each row execute function update_updated_at();
