import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { buildSystemPrompt } from "@/lib/prompts/system-prompt";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Platform, Language, Tone } from "@/lib/types";

// --- Rate limiting ---
// Per-IP limit: tighter than before (5 per hour, not 10 per minute) to stop bot abuse
// while still feeling natural for real users exploring the tool.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  return false;
}

// --- Daily global cap (circuit breaker) ---
// Hard ceiling across ALL users to prevent runaway costs. If a post goes viral
// or a bot evades per-IP limits, we stop serving until the next day.
// At ~$0.07/query this caps daily AI spend at ~$70.
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

  // 2. Per-IP rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "You have reached the hourly limit. Try again in an hour." },
      { status: 429 }
    );
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

    const systemPrompt = await buildSystemPrompt(language);

    const userMessage = `Platform: ${platform}
Tone: ${tone}
Language: ${language === "no" ? "Norwegian (Bokmål)" : "English"}

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
            model: "claude-sonnet-4-20250514",
            // Lowered from 2048 to 1024 — responses fit comfortably in this budget
            // and this halves the per-query output cost.
            max_tokens: 1024,
            // Prompt caching: the system prompt is large (~15-20K tokens) and rarely
            // changes between requests. Anthropic caches it server-side and charges
            // ~10% of normal input cost on cache hits, which is the dominant cost
            // saving once traffic picks up.
            system: [
              {
                type: "text",
                text: systemPrompt,
                cache_control: { type: "ephemeral" },
              },
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
