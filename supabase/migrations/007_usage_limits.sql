-- Migration 007: Global usage counter for daily request cap
-- Prevents runaway costs from viral traffic or bot abuse
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS usage_counters (
  day date PRIMARY KEY,
  request_count int NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Atomic increment function: increments today's counter and returns the new value.
-- Used by the fud-buster API to check if the daily cap has been exceeded.
CREATE OR REPLACE FUNCTION increment_daily_usage()
RETURNS int
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count int;
BEGIN
  INSERT INTO usage_counters (day, request_count)
  VALUES (CURRENT_DATE, 1)
  ON CONFLICT (day)
  DO UPDATE SET
    request_count = usage_counters.request_count + 1,
    updated_at = now()
  RETURNING request_count INTO new_count;

  RETURN new_count;
END;
$$;

-- RLS: service role only (no public access)
ALTER TABLE usage_counters ENABLE ROW LEVEL SECURITY;

-- Grant service role permission to call the function
GRANT EXECUTE ON FUNCTION increment_daily_usage() TO service_role;
