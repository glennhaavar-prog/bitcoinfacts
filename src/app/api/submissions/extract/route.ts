import { NextRequest, NextResponse } from "next/server";
import { extractFactsFromUrl, extractFactsFromText } from "@/lib/ai/extract-facts";
import { checkDuplicates } from "@/lib/ai/duplicate-check";

// Rate limit: 5 per hour per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3_600_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { input_type, input_url, input_text } = body;

    let result;

    if (input_type === "url" && input_url) {
      const { extraction } = await extractFactsFromUrl(input_url);
      result = extraction;
    } else if (input_type === "text" && input_text) {
      result = await extractFactsFromText(input_text);
    } else {
      return NextResponse.json(
        { error: "Invalid input." },
        { status: 400 }
      );
    }

    // Check for duplicates
    const duplicates = await checkDuplicates(result.facts);

    return NextResponse.json({
      facts: result.facts,
      quality_assessment: result.quality_assessment,
      potential_duplicates: [
        ...result.potential_duplicates,
        ...duplicates.map((d) => `${d.claim_preview} (${d.similarity})`),
      ],
      summary: result.summary,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Extraction failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
