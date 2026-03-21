// Database types — manually defined until `supabase gen types` is run
// Run: npx supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: string;
          name_no: string;
          name_en: string;
          icon: string;
          description_no: string | null;
          description_en: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["categories"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      facts: {
        Row: {
          id: string;
          category_id: string;
          status: "draft" | "pending" | "published" | "rejected" | "archived";
          claim_no: string;
          claim_en: string | null;
          reality_no: string | null;
          reality_en: string | null;
          source_name: string;
          source_url: string | null;
          source_date: string | null;
          verified_date: string;
          batten_tip_no: string | null;
          batten_tip_en: string | null;
          reframe_example_no: string | null;
          reframe_example_en: string | null;
          tags: string[];
          confidence: "high" | "medium" | "needs-verification";
          notes: string | null;
          submitted_by: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          review_note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["facts"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["facts"]["Insert"]>;
      };
      contributors: {
        Row: {
          id: string;
          display_name: string;
          email: string | null;
          approved_count: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["contributors"]["Row"], "id" | "created_at" | "approved_count"> & {
          id?: string;
          created_at?: string;
          approved_count?: number;
        };
        Update: Partial<Database["public"]["Tables"]["contributors"]["Insert"]>;
      };
      admins: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: "admin" | "moderator";
          auth_user_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["admins"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["admins"]["Insert"]>;
      };
      submissions: {
        Row: {
          id: string;
          contributor_id: string | null;
          status: "pending" | "processing" | "ready_for_review" | "approved" | "rejected" | "duplicate";
          input_type: "url" | "text" | "fact";
          input_url: string | null;
          input_text: string | null;
          ai_extracted_facts: ExtractedFact[] | null;
          ai_quality_score: number | null;
          ai_duplicate_check: DuplicateCheck[] | null;
          ai_summary: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          review_note: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["submissions"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["submissions"]["Insert"]>;
      };
    };
  };
}

export interface ExtractedFact {
  claim_en: string;
  claim_no: string;
  reality_en?: string;
  reality_no?: string;
  source_name: string;
  source_date?: string;
  category_slug: string;
  tags: string[];
  batten_tip_en?: string;
  batten_tip_no?: string;
  confidence: "high" | "medium" | "needs-verification";
}

export interface DuplicateCheck {
  existing_fact_id: string;
  similarity: string;
  claim_preview: string;
}

export interface QualityAssessment {
  score: number;
  reasoning: string;
  source_type: "academic" | "institutional" | "media" | "blog" | "social";
}

// Convenience aliases
export type FactRow = Database["public"]["Tables"]["facts"]["Row"];
export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
export type SubmissionRow = Database["public"]["Tables"]["submissions"]["Row"];
export type ContributorRow = Database["public"]["Tables"]["contributors"]["Row"];
export type AdminRow = Database["public"]["Tables"]["admins"]["Row"];

export type FactWithCategory = FactRow & {
  categories: CategoryRow;
};
