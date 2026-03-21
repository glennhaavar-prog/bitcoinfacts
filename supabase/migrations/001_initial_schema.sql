-- ============================================
-- Bitcoin FUD Buster — Phase 2 Schema
-- ============================================

-- Contributors (visitors who submit facts)
create table contributors (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  email text unique,
  approved_count int default 0,
  created_at timestamptz default now()
);

-- Admin users
create table admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  role text default 'admin' check (role in ('admin', 'moderator')),
  auth_user_id uuid references auth.users(id),
  created_at timestamptz default now()
);

-- Categories
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_no text not null,
  name_en text not null,
  icon text default '📄',
  description_no text,
  description_en text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Facts
create table facts (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) not null,
  status text not null default 'published' check (status in ('draft', 'pending', 'published', 'rejected', 'archived')),

  -- Content
  claim_no text not null,
  claim_en text,
  reality_no text,
  reality_en text,
  source_name text not null,
  source_url text,
  source_date date,
  verified_date date not null default current_date,

  -- Batten presentation
  batten_tip_no text,
  batten_tip_en text,
  reframe_example_no text,
  reframe_example_en text,

  -- Metadata
  tags text[] default '{}',
  confidence text default 'high' check (confidence in ('high', 'medium', 'needs-verification')),
  notes text,

  -- Tracking
  submitted_by uuid references contributors(id),
  reviewed_by uuid references admins(id),
  reviewed_at timestamptz,
  review_note text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Submissions
create table submissions (
  id uuid primary key default gen_random_uuid(),
  contributor_id uuid references contributors(id),
  status text not null default 'pending' check (status in ('pending', 'processing', 'ready_for_review', 'approved', 'rejected', 'duplicate')),

  -- Raw input
  input_type text not null check (input_type in ('url', 'text', 'fact')),
  input_url text,
  input_text text,

  -- AI-extracted
  ai_extracted_facts jsonb,
  ai_quality_score float,
  ai_duplicate_check jsonb,
  ai_summary text,

  -- Admin handling
  reviewed_by uuid references admins(id),
  reviewed_at timestamptz,
  review_note text,

  created_at timestamptz default now()
);

-- ============================================
-- Row Level Security
-- ============================================

alter table facts enable row level security;
alter table submissions enable row level security;
alter table categories enable row level security;
alter table contributors enable row level security;
alter table admins enable row level security;

-- Public read for published facts
create policy "Public read published facts" on facts
  for select using (status = 'published');

-- Admins manage facts
create policy "Admins manage facts" on facts
  for all using (auth.uid() in (select auth_user_id from admins));

-- Public read for categories
create policy "Public read categories" on categories
  for select using (true);

-- Anyone can submit
create policy "Anyone can submit" on submissions
  for insert with check (true);

-- Submitters can read their own submissions
create policy "Read own submissions" on submissions
  for select using (
    contributor_id in (
      select id from contributors where id = contributor_id
    )
  );

-- Admins manage submissions
create policy "Admins manage submissions" on submissions
  for all using (auth.uid() in (select auth_user_id from admins));

-- Anyone can create contributors
create policy "Anyone can create contributor" on contributors
  for insert with check (true);

-- Admins read contributors
create policy "Admins read contributors" on contributors
  for select using (auth.uid() in (select auth_user_id from admins));

-- Admins read admins
create policy "Admins read admins" on admins
  for select using (auth.uid() = auth_user_id);

-- ============================================
-- Indexes
-- ============================================

create index idx_facts_category on facts(category_id);
create index idx_facts_status on facts(status);
create index idx_facts_tags on facts using gin(tags);
create index idx_submissions_status on submissions(status);
create index idx_facts_search on facts using gin(
  to_tsvector('english', coalesce(claim_en, '') || ' ' || coalesce(source_name, '') || ' ' || coalesce(notes, ''))
);

-- ============================================
-- Updated_at trigger
-- ============================================

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger facts_updated_at
  before update on facts
  for each row execute function update_updated_at();
