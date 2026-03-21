import { anthropic } from "@/lib/anthropic";
import type { ExtractedFact, QualityAssessment } from "@/lib/supabase/types";

const EXTRACTION_PROMPT = `Analyser denne artikkelen/teksten og ekstraher fakta relevante for Bitcoin-debatten.

For hvert fakta, returner JSON:
{
  "facts": [
    {
      "claim_en": "The specific factual claim in English",
      "claim_no": "Påstanden på norsk",
      "reality_en": "The evidence-based reality",
      "reality_no": "Den evidensbaserte realiteten",
      "source_name": "Name of the primary source",
      "source_date": "YYYY-MM-DD if available",
      "category_slug": "energy | environment | grid | price | adoption | academic | myths",
      "tags": ["relevant", "tags"],
      "batten_tip_en": "How to use this fact in a discussion, in the style: 'Are you aware that [authority] found that...?'",
      "batten_tip_no": "Slik bruker du dette faktumet i en diskusjon",
      "confidence": "high | medium | needs-verification"
    }
  ],
  "quality_assessment": {
    "score": 0.85,
    "reasoning": "Explanation of source quality",
    "source_type": "academic | institutional | media | blog | social"
  },
  "potential_duplicates": ["Brief description of any overlap with known Bitcoin mining facts"],
  "summary": "Brief summary of the submitted material"
}

Source credibility ranking (highest to lowest):
1. Peer-reviewed academic journals
2. Cambridge Centre for Alternative Finance (CCAF)
3. Government/public data (EIA, ERCOT, EPA)
4. Institutional research (MIT, Bloomberg)
5. Industry reports with data (MARA, Crusoe, Chainalysis)
6. Recognized analysts (Daniel Batten, Lyn Alden)

Be critical. Do not extract facts you cannot verify from the text.
Write Batten tips in style: "Are you aware that [authority] found that...?"
Respond with valid JSON only. No markdown, no code fences.`;

export interface ExtractionResult {
  facts: ExtractedFact[];
  quality_assessment: QualityAssessment;
  potential_duplicates: string[];
  summary: string;
}

export async function extractFactsFromText(
  text: string
): Promise<ExtractionResult> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: EXTRACTION_PROMPT,
    messages: [
      {
        role: "user",
        content: `Extract Bitcoin-relevant facts from this content:\n\n${text.slice(0, 15000)}`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type");
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not parse JSON from AI response");
  }

  return JSON.parse(jsonMatch[0]);
}

export async function extractFactsFromUrl(url: string): Promise<{
  extraction: ExtractionResult;
  fetchedContent: string;
}> {
  // Fetch URL content server-side
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; FUDBuster/1.0)",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status}`);
  }

  const html = await response.text();

  // Basic HTML to text extraction
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

  if (text.length < 100) {
    throw new Error(
      "Could not extract meaningful content from this URL. Try pasting the text directly."
    );
  }

  const extraction = await extractFactsFromText(
    `Source URL: ${url}\n\nContent:\n${text}`
  );

  return { extraction, fetchedContent: text.slice(0, 5000) };
}
