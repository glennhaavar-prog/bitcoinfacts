import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { buildSystemPrompt } from "@/lib/prompts/system-prompt";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Platform, Language, Tone } from "@/lib/types";

const LANGUAGE_NAME: Record<Language, string> = {
  no: "Norwegian (Bokmål)",
  en: "English",
  de: "German (Hochdeutsch)",
  es: "Spanish",
  pt: "Portuguese",
  fr: "French",
};

// --- Rate limiting ---
// Per-IP limit: tighter than before (5 per hour, not 10 per minute) to stop bot abuse
// while still feeling natural for real users exploring the tool.
// A daily cap is layered on top so a single IP can't burn through 24 × 5 = 120
// requests/day by patiently spreading load across hours.
//
// Note: this is in-memory and per-Vercel-instance. A bot that hits different
// cold instances can bypass it. For real protection, the global daily cap
// (Supabase-backed) is the hard ceiling.
type RateEntry = {
  hourCount: number;
  hourResetTime: number;
  dayCount: number;
  dayResetTime: number;
};
const rateLimitMap = new Map<string, RateEntry>();
const HOUR_LIMIT = 5;
const HOUR_WINDOW_MS = 60 * 60 * 1000;
const DAY_LIMIT = 15;
const DAY_WINDOW_MS = 24 * 60 * 60 * 1000;

type RateLimitVerdict =
  | { limited: false }
  | { limited: true; scope: "hour" | "day" };

function checkRateLimit(ip: string): RateLimitVerdict {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, {
      hourCount: 1,
      hourResetTime: now + HOUR_WINDOW_MS,
      dayCount: 1,
      dayResetTime: now + DAY_WINDOW_MS,
    });
    return { limited: false };
  }

  if (now > entry.hourResetTime) {
    entry.hourCount = 0;
    entry.hourResetTime = now + HOUR_WINDOW_MS;
  }
  if (now > entry.dayResetTime) {
    entry.dayCount = 0;
    entry.dayResetTime = now + DAY_WINDOW_MS;
  }

  if (entry.dayCount >= DAY_LIMIT) return { limited: true, scope: "day" };
  if (entry.hourCount >= HOUR_LIMIT) return { limited: true, scope: "hour" };

  entry.hourCount++;
  entry.dayCount++;
  return { limited: false };
}

// --- Daily global cap (circuit breaker) ---
// Hard ceiling across ALL users to prevent runaway costs. If a post goes viral
// or a bot evades per-IP limits, we stop serving until the next day.
// With Haiku 4.5 (~$0.025/query at full input price, far less with cache hits),
// this caps daily AI spend at ~$25 in the worst case.
const DAILY_CAP = 1000;

async function checkAndIncrementDailyUsage(): Promise<{ allowed: boolean; count: number }> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.rpc("increment_daily_usage");
    if (error) {
      // Fail open if Supabase unavailable — don't break the app, but log.
      console.error("Daily usage check failed:", error);
      return { allowed: true, count: 0 };
    }
    const count = data as number;
    return { allowed: count <= DAILY_CAP, count };
  } catch (err) {
    console.error("Daily usage check error:", err);
    return { allowed: true, count: 0 };
  }
}

// --- Origin check ---
// Block requests that don't come from our own site. Real users hit the API via
// the browser, which sends an Origin or Referer header matching our domain.
// Bots hitting the API directly usually don't set these, or set them to something else.
const ALLOWED_ORIGINS = [
  "https://facts.bitcoinbeyond66.com",
  "http://localhost:3000",
];

function hasValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (origin && ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed))) {
    return true;
  }
  if (referer && ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed))) {
    return true;
  }
  return false;
}

export async function POST(request: NextRequest) {
  // 1. Origin check — block direct API calls from scripts/bots
  if (!hasValidOrigin(request)) {
    return NextResponse.json(
      { error: "Forbidden." },
      { status: 403 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // 2. Per-IP rate limit (hour + day)
  const verdict = checkRateLimit(ip);
  if (verdict.limited) {
    const message =
      verdict.scope === "day"
        ? "You have reached the daily limit. Try again tomorrow."
        : "You have reached the hourly limit. Try again in an hour.";
    return NextResponse.json({ error: message }, { status: 429 });
  }

  // 3. Global daily cap
  const { allowed, count } = await checkAndIncrementDailyUsage();
  if (!allowed) {
    return NextResponse.json(
      {
        error:
          "The research tool is experiencing high demand today and has reached its daily cap. Please try again tomorrow.",
      },
      { status: 503 }
    );
  }
  // Soft warning log if we're approaching the cap
  if (count > DAILY_CAP * 0.8) {
    console.warn(`Daily usage at ${count}/${DAILY_CAP} — approaching cap.`);
  }

  try {
    const body = await request.json();
    const {
      fudText,
      platform = "general",
      language = "no",
      tone = "balanced",
    }: {
      fudText: string;
      platform: Platform;
      language: Language;
      tone: Tone;
    } = body;

    if (!fudText || typeof fudText !== "string" || fudText.trim().length === 0) {
      return NextResponse.json(
        { error: "FUD-tekst er påkrevd." },
        { status: 400 }
      );
    }

    if (fudText.length > 5000) {
      return NextResponse.json(
        { error: "Text is too long. Max 5000 characters." },
        { status: 400 }
      );
    }

    const { staticPrompt, dynamicSupplement } = await buildSystemPrompt(language);

    const userMessage = `Platform: ${platform}
Tone: ${tone}
Language: ${LANGUAGE_NAME[language] ?? "English"}

FUD comment to respond to:
"""
${fudText.trim()}
"""

Respond with valid JSON only. No markdown, no code fences.`;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await anthropic.messages.create({
            model: "claude-haiku-4-5-20251001",
            // Lowered from 2048 to 1024 — responses fit comfortably in this budget
            // and this halves the per-query output cost.
            max_tokens: 1024,
            // Prompt caching: split into a STATIC block (principles, workflow,
            // baseline facts, tactics — changes only on deploy) and a DYNAMIC
            // block (latest Supabase facts + curated examples — changes when admin
            // publishes new content). Only the static prefix is cached, so edits
            // in Supabase no longer invalidate the cached prefix. On cache hits
            // Anthropic charges ~10% of normal input cost for the cached portion.
            system: [
              {
                type: "text",
                text: staticPrompt,
                cache_control: { type: "ephemeral" },
              },
              ...(dynamicSupplement
                ? [{ type: "text" as const, text: dynamicSupplement }]
                : []),
            ],
            messages: [{ role: "user", content: userMessage }],
            stream: true,
          });

          for await (const event of response) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "An error occurred";
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: errorMessage })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
