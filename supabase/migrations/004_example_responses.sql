-- Migration 004: Example responses table + trainer role
-- Run in Supabase SQL Editor

-- Extend role constraint to include 'trainer'
ALTER TABLE admins DROP CONSTRAINT IF EXISTS admins_role_check;
ALTER TABLE admins ADD CONSTRAINT admins_role_check CHECK (role IN ('admin', 'moderator', 'trainer'));

-- Example responses table — for training the AI agent's communication style
CREATE TABLE example_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fud_text text NOT NULL,
  ideal_response text NOT NULL,
  fud_type text CHECK (fud_type IN ('energy', 'ponzi', 'criminal', 'useless', 'grid', 'environment', 'skepticism', 'other')),
  platform text DEFAULT 'general' CHECK (platform IN ('x', 'linkedin', 'facebook', 'general')),
  tone text DEFAULT 'balanced' CHECK (tone IN ('direct', 'balanced', 'soft')),
  strategy text CHECK (strategy IN ('180-reframe', 'admit-and-redefine', 'question', 'combined')),
  notes text,
  created_by uuid REFERENCES admins(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Auto-update updated_at
CREATE TRIGGER update_example_responses_updated_at
  BEFORE UPDATE ON example_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE example_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read example_responses"
  ON example_responses FOR SELECT USING (true);

CREATE POLICY "Admin and trainer manage example_responses"
  ON example_responses FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE auth_user_id = auth.uid()
      AND role IN ('admin', 'trainer')
    )
  );

-- Index for quick lookups
CREATE INDEX idx_example_responses_fud_type ON example_responses(fud_type);
