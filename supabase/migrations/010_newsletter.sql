-- Migration 010: Newsletter (daily Bitcoin claim + evidence)
-- Run in Supabase SQL Editor.

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'unsubscribed', 'bounced')),
  frequency text NOT NULL DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly')),
  language text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'no')),
  -- Random tokens used in confirmation/unsubscribe URLs. UUIDs are sufficient
  -- entropy and cheap to generate; we don't need cryptographic signing here.
  confirmation_token text NOT NULL DEFAULT replace(gen_random_uuid()::text, '-', ''),
  unsubscribe_token text NOT NULL DEFAULT replace(gen_random_uuid()::text, '-', ''),
  source text,                  -- where did they sign up (homepage/agent/footer/etc)
  confirmed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz,
  last_sent_at timestamptz
);

CREATE INDEX idx_subscribers_status ON subscribers(status);
CREATE INDEX idx_subscribers_unsubscribe_token ON subscribers(unsubscribe_token);
CREATE INDEX idx_subscribers_confirmation_token ON subscribers(confirmation_token);

-- Tracks which facts each subscriber has received, so the cron job can pick
-- a fresh one each day. When a subscriber has seen all facts, the cron resets
-- their history (see /api/cron/daily-newsletter logic).
CREATE TABLE IF NOT EXISTS sent_facts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id uuid REFERENCES subscribers(id) ON DELETE CASCADE NOT NULL,
  fact_id uuid REFERENCES facts(id) ON DELETE CASCADE NOT NULL,
  sent_at timestamptz DEFAULT now(),
  UNIQUE (subscriber_id, fact_id)
);

CREATE INDEX idx_sent_facts_subscriber ON sent_facts(subscriber_id);
CREATE INDEX idx_sent_facts_fact ON sent_facts(fact_id);

-- RLS: only service_role can read/write (the API uses service role key)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sent_facts ENABLE ROW LEVEL SECURITY;
