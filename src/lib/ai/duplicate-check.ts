import { createAdminClient } from "@/lib/supabase/admin";
import type { ExtractedFact, DuplicateCheck } from "@/lib/supabase/types";

export async function checkDuplicates(
  extractedFacts: ExtractedFact[]
): Promise<DuplicateCheck[]> {
  const supabase = createAdminClient();

  const { data: existingFacts } = await supabase
    .from("facts")
    .select("id, claim_en, claim_no, tags")
    .in("status", ["published", "pending"]);

  if (!existingFacts || existingFacts.length === 0) return [];

  const duplicates: DuplicateCheck[] = [];

  for (const extracted of extractedFacts) {
    for (const existing of existingFacts) {
      // Simple tag overlap check
      const extractedTags = new Set(extracted.tags);
      const existingTags = new Set(existing.tags || []);
      const overlap = [...extractedTags].filter((t) => existingTags.has(t));

      // Simple text similarity (word overlap)
      const extractedWords = new Set(
        extracted.claim_en.toLowerCase().split(/\s+/)
      );
      const existingWords = new Set(
        (existing.claim_en || "").toLowerCase().split(/\s+/)
      );
      const wordOverlap = [...extractedWords].filter((w) =>
        existingWords.has(w)
      );
      const similarity =
        wordOverlap.length /
        Math.max(extractedWords.size, existingWords.size);

      if (overlap.length >= 2 || similarity > 0.5) {
        duplicates.push({
          existing_fact_id: existing.id,
          similarity: `${Math.round(similarity * 100)}% word overlap, ${overlap.length} shared tags`,
          claim_preview:
            existing.claim_en || existing.claim_no,
        });
      }
    }
  }

  return duplicates;
}
