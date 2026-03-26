export type Platform = "x" | "linkedin" | "facebook" | "general";
export type Language = "no" | "en";
export type Tone = "direct" | "balanced" | "soft";
export type TriageResult = "fight" | "ignore" | "educate";
export type FudType =
  | "energy"
  | "ponzi"
  | "criminal"
  | "useless"
  | "grid"
  | "skepticism"
  | "environment"
  | "other";

export interface FudBusterRequest {
  fudText: string;
  platform: Platform;
  language: Language;
  tone?: Tone;
}

export type PrincipleKey = "truth_first" | "influence" | "check_intention" | "authority_humility" | "yes_and";

export interface AppliedPrinciple {
  key: PrincipleKey;
  how: string;
}

export interface FudBusterResponse {
  reply: string;
  fudType: FudType;
  strategy: string;
  sources: Array<{ name: string; description: string }>;
  triageResult: TriageResult;
  principles: AppliedPrinciple[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  fudType?: FudType;
  strategy?: string;
  sources?: Array<{ name: string; description: string }>;
  triageResult?: TriageResult;
  principles?: AppliedPrinciple[];
}

export interface FactCategory {
  id: string;
  name: string;
  nameNo: string;
  icon: string;
  description: string;
  descriptionNo: string;
}

export interface Fact {
  id: string;
  category: string;
  claim: string;
  claimNo: string;
  reality: string;
  realityNo: string;
  source: string;
  sourceUrl?: string;
  date?: string;
  tip: string;
  tipNo: string;
}

export interface PlaybookPrinciple {
  id: string;
  title: string;
  titleNo: string;
  description: string;
  descriptionNo: string;
  icon: string;
}

export interface ReframeExample {
  fud: string;
  fudNo: string;
  wrongResponse: string;
  wrongResponseNo: string;
  rightResponse: string;
  rightResponseNo: string;
  explanation: string;
  explanationNo: string;
}
