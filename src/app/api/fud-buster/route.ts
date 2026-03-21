import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { buildSystemPrompt } from "@/lib/prompts/system-prompt";
import type { Platform, Language, Tone } from "@/lib/types";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

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

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "For mange forespørsler. Prøv igjen om litt." },
      { status: 429 }
    );
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
        { error: "Teksten er for lang. Maks 5000 tegn." },
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
            max_tokens: 2048,
            system: systemPrompt,
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
      { error: "Noe gikk galt. Prøv igjen." },
      { status: 500 }
    );
  }
}
