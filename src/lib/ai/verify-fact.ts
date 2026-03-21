import { anthropic } from "@/lib/anthropic";
import type { FactRow } from "@/lib/supabase/types";

export interface VerificationResult {
  still_accurate: boolean;
  updated_claim_en?: string;
  updated_claim_no?: string;
  updated_reality_en?: string;
  updated_reality_no?: string;
  changes_summary: string;
  new_confidence: "high" | "medium" | "needs-verification";
  notes: string;
}

export async function verifyFact(
  fact: FactRow
): Promise<VerificationResult> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system: `You are a fact-checker for Bitcoin mining claims. You have access to current knowledge up to your training cutoff.

Given a fact about Bitcoin mining, assess whether it is still accurate. Consider:
1. Has the data been updated? (e.g., sustainable energy percentage changes)
2. Have new studies been published that confirm, update, or contradict this?
3. Is the source still considered reliable?

Respond with valid JSON only:
{
  "still_accurate": true/false,
  "updated_claim_en": "Updated claim if changed, or null",
  "updated_claim_no": "Oppdatert påstand hvis endret, eller null",
  "updated_reality_en": "Updated reality if changed, or null",
  "updated_reality_no": "Oppdatert realitet hvis endret, eller null",
  "changes_summary": "Brief summary of what changed (or 'No changes needed')",
  "new_confidence": "high | medium | needs-verification",
  "notes": "Any additional notes for the admin"
}`,
    messages: [
      {
        role: "user",
        content: `Verify this Bitcoin mining fact:

Claim (EN): ${fact.claim_en}
Claim (NO): ${fact.claim_no}
Reality (EN): ${fact.reality_en}
Reality (NO): ${fact.reality_no}
Source: ${fact.source_name}
Source URL: ${fact.source_url || "N/A"}
Last verified: ${fact.verified_date}
Tags: ${fact.tags.join(", ")}`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type");
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not parse verification result");
  }

  return JSON.parse(jsonMatch[0]);
}
