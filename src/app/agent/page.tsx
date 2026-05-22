"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  Send,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
  BookOpen,
  Swords,
  Eye,
  Shield,
  Settings2,
  Lightbulb,
  FileText,
  X,
} from "lucide-react";
import type {
  Platform,
  Language,
  Tone,
  AnswerMode,
  TriageResult,
  FudBusterResponse,
  ChatMessage,
  PrincipleKey,
} from "@/lib/types";
import { LANGUAGE_LABELS } from "@/lib/types";
import NewsletterSignup from "@/components/NewsletterSignup";

const platforms: { value: Platform; label: string }[] = [
  { value: "x", label: "X / Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "general", label: "General" },
];

const tones: { value: Tone; label: string }[] = [
  { value: "direct", label: "Direct" },
  { value: "balanced", label: "Balanced" },
  { value: "soft", label: "Soft" },
];

const triageIcons = {
  fight: Swords,
  ignore: Eye,
  educate: BookOpen,
};

// UI chrome strings, localized to follow the language selector (en/no/de/es/pt/fr).
interface UIStrings {
  placeholder: string;
  inputHint: string;
  emptyTitle: string;
  emptyBody: string;
  analyzing: string;
  writing: string;
  copy: string;
  copied: string;
  sources: string;
  principles: string;
  principlesApplied: string;
  triage: Record<TriageResult, string>;
  platform: string;
  languageLabel: string;
  tone: string;
  toneLabels: Record<Tone, string>;
  generalPlatform: string;
  knowledgeBase: string;
  facts: string;
  argumentsLabel: string;
  modeHint: string;
  newsletterPrompt: string;
  dismiss: string;
}

const UI: Record<Language, UIStrings> = {
  en: {
    placeholder: "Paste a Bitcoin claim or criticism…",
    inputHint: "Enter to send · Shift+Enter for new line",
    emptyTitle: "Ready to analyse",
    emptyBody: "Paste a Bitcoin-related claim or criticism and get a fact-based, evidence-backed response.",
    analyzing: "Analyzing claim",
    writing: "Writing",
    copy: "Copy",
    copied: "Copied!",
    sources: "Sources",
    principles: "Principles",
    principlesApplied: "Batten Principles Applied",
    triage: { fight: "Fight", ignore: "Ignore", educate: "Educate" },
    platform: "Platform",
    languageLabel: "Language",
    tone: "Tone",
    toneLabels: { direct: "Direct", balanced: "Balanced", soft: "Soft" },
    generalPlatform: "General",
    knowledgeBase: "Knowledge base",
    facts: "Facts",
    argumentsLabel: "Arguments",
    modeHint: "Switch after an answer to re-run the same question.",
    newsletterPrompt: "Want a daily Bitcoin fact-check by email?",
    dismiss: "Dismiss",
  },
  no: {
    placeholder: "Lim inn en Bitcoin-påstand eller kritikk…",
    inputHint: "Enter for å sende · Shift+Enter for ny linje",
    emptyTitle: "Klar til å analysere",
    emptyBody: "Lim inn en Bitcoin-relatert påstand eller kritikk og få et faktabasert, dokumentert svar.",
    analyzing: "Analyserer påstand",
    writing: "Skriver",
    copy: "Kopier",
    copied: "Kopiert!",
    sources: "Kilder",
    principles: "Prinsipper",
    principlesApplied: "Batten-prinsipper brukt",
    triage: { fight: "Imøtegå", ignore: "Ignorer", educate: "Opplys" },
    platform: "Plattform",
    languageLabel: "Språk",
    tone: "Tone",
    toneLabels: { direct: "Direkte", balanced: "Balansert", soft: "Myk" },
    generalPlatform: "Generell",
    knowledgeBase: "Kunnskapsbase",
    facts: "Fakta",
    argumentsLabel: "Argumenter",
    modeHint: "Bytt etter et svar for å kjøre samme spørsmål på nytt.",
    newsletterPrompt: "Vil du ha en daglig Bitcoin-faktasjekk på e-post?",
    dismiss: "Lukk",
  },
  de: {
    placeholder: "Bitcoin-Behauptung oder Kritik einfügen…",
    inputHint: "Enter zum Senden · Umschalt+Enter für neue Zeile",
    emptyTitle: "Bereit zur Analyse",
    emptyBody: "Füge eine Bitcoin-bezogene Behauptung oder Kritik ein und erhalte eine faktenbasierte, belegte Antwort.",
    analyzing: "Behauptung wird analysiert",
    writing: "Schreibt",
    copy: "Kopieren",
    copied: "Kopiert!",
    sources: "Quellen",
    principles: "Prinzipien",
    principlesApplied: "Angewandte Batten-Prinzipien",
    triage: { fight: "Kontern", ignore: "Ignorieren", educate: "Aufklären" },
    platform: "Plattform",
    languageLabel: "Sprache",
    tone: "Ton",
    toneLabels: { direct: "Direkt", balanced: "Ausgewogen", soft: "Sanft" },
    generalPlatform: "Allgemein",
    knowledgeBase: "Wissensbasis",
    facts: "Fakten",
    argumentsLabel: "Argumente",
    modeHint: "Nach einer Antwort wechseln, um dieselbe Frage erneut auszuführen.",
    newsletterPrompt: "Täglich einen Bitcoin-Faktencheck per E-Mail?",
    dismiss: "Schließen",
  },
  es: {
    placeholder: "Pega una afirmación o crítica sobre Bitcoin…",
    inputHint: "Enter para enviar · Mayús+Enter para nueva línea",
    emptyTitle: "Listo para analizar",
    emptyBody: "Pega una afirmación o crítica relacionada con Bitcoin y obtén una respuesta basada en hechos y evidencia.",
    analyzing: "Analizando la afirmación",
    writing: "Escribiendo",
    copy: "Copiar",
    copied: "¡Copiado!",
    sources: "Fuentes",
    principles: "Principios",
    principlesApplied: "Principios de Batten aplicados",
    triage: { fight: "Refutar", ignore: "Ignorar", educate: "Educar" },
    platform: "Plataforma",
    languageLabel: "Idioma",
    tone: "Tono",
    toneLabels: { direct: "Directo", balanced: "Equilibrado", soft: "Suave" },
    generalPlatform: "General",
    knowledgeBase: "Base de conocimiento",
    facts: "Hechos",
    argumentsLabel: "Argumentos",
    modeHint: "Cambia después de una respuesta para volver a ejecutar la misma pregunta.",
    newsletterPrompt: "¿Quieres una verificación diaria sobre Bitcoin por correo?",
    dismiss: "Cerrar",
  },
  pt: {
    placeholder: "Cole uma afirmação ou crítica sobre o Bitcoin…",
    inputHint: "Enter para enviar · Shift+Enter para nova linha",
    emptyTitle: "Pronto para analisar",
    emptyBody: "Cole uma afirmação ou crítica relacionada ao Bitcoin e receba uma resposta baseada em fatos e evidências.",
    analyzing: "Analisando a afirmação",
    writing: "Escrevendo",
    copy: "Copiar",
    copied: "Copiado!",
    sources: "Fontes",
    principles: "Princípios",
    principlesApplied: "Princípios de Batten aplicados",
    triage: { fight: "Rebater", ignore: "Ignorar", educate: "Educar" },
    platform: "Plataforma",
    languageLabel: "Idioma",
    tone: "Tom",
    toneLabels: { direct: "Direto", balanced: "Equilibrado", soft: "Suave" },
    generalPlatform: "Geral",
    knowledgeBase: "Base de conhecimento",
    facts: "Fatos",
    argumentsLabel: "Argumentos",
    modeHint: "Troque após uma resposta para refazer a mesma pergunta.",
    newsletterPrompt: "Quer uma verificação diária sobre Bitcoin por e-mail?",
    dismiss: "Fechar",
  },
  fr: {
    placeholder: "Collez une affirmation ou critique sur le Bitcoin…",
    inputHint: "Entrée pour envoyer · Maj+Entrée pour nouvelle ligne",
    emptyTitle: "Prêt à analyser",
    emptyBody: "Collez une affirmation ou critique liée au Bitcoin et obtenez une réponse fondée sur des faits et des preuves.",
    analyzing: "Analyse de l'affirmation",
    writing: "Rédaction",
    copy: "Copier",
    copied: "Copié !",
    sources: "Sources",
    principles: "Principes",
    principlesApplied: "Principes de Batten appliqués",
    triage: { fight: "Réfuter", ignore: "Ignorer", educate: "Éduquer" },
    platform: "Plateforme",
    languageLabel: "Langue",
    tone: "Ton",
    toneLabels: { direct: "Direct", balanced: "Équilibré", soft: "Doux" },
    generalPlatform: "Général",
    knowledgeBase: "Base de connaissances",
    facts: "Faits",
    argumentsLabel: "Arguments",
    modeHint: "Changez après une réponse pour relancer la même question.",
    newsletterPrompt: "Un fact-check Bitcoin quotidien par e-mail ?",
    dismiss: "Fermer",
  },
};

const principleLabels: Record<PrincipleKey, { name: string; icon: string; color: string }> = {
  truth_first: { name: "Truth First", icon: "🛡️", color: "text-eb-green bg-eb-green-faint border-eb-green/20" },
  influence: { name: "Influence, Don't Just Inform", icon: "💗", color: "text-pink-600 bg-pink-50 border-pink-200" },
  check_intention: { name: "Check Intention", icon: "🎯", color: "text-blue-600 bg-blue-50 border-blue-200" },
  authority_humility: { name: "Authority + Humility", icon: "🏅", color: "text-eb-gold bg-eb-gold-faint border-eb-gold-border" },
  yes_and: { name: "Yes, And — Never Yes, But", icon: "🌉", color: "text-purple-700 bg-purple-50 border-purple-200" },
};

const TEXT_COLLAPSE_LENGTH = 280;
// Rough expected reply length in characters — used to estimate streaming progress.
// Most FUD responses come in around 1200-1800 chars. Calibrated so the bar
// reaches ~90% around when the response actually finishes.
const EXPECTED_REPLY_LENGTH = 1500;

function CollapsibleText({
  text,
  className,
  isStreaming = false,
}: {
  text: string;
  className?: string;
  isStreaming?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const needsCollapse = text.length > TEXT_COLLAPSE_LENGTH;

  // While streaming, always show full text so users can watch it grow in real time.
  // The "Read more" collapse only kicks in once the response is complete.
  const showFull = isStreaming || expanded || !needsCollapse;

  return (
    <div>
      <p className={className}>
        {showFull ? text : `${text.slice(0, TEXT_COLLAPSE_LENGTH)}...`}
        {isStreaming && (
          <span className="inline-block w-[2px] h-[14px] bg-eb-gold ml-0.5 align-middle animate-pulse" />
        )}
      </p>
      {needsCollapse && !isStreaming && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1.5 text-eb-gold text-xs font-medium hover:text-eb-gold-dark transition-colors inline-flex items-center gap-1"
        >
          {expanded ? (
            <><ChevronUp className="w-3 h-3" /> Show less</>
          ) : (
            <><ChevronDown className="w-3 h-3" /> Read more</>
          )}
        </button>
      )}
    </div>
  );
}

// Progress bar shown below a streaming message. Gives users visual confirmation
// that work is happening, even once characters are flowing.
function StreamingProgress({ charCount, language }: { charCount: number; language: Language }) {
  // The reply text streams first; afterwards the model emits sources/principles
  // (no reply growth), so a charCount-only bar freezes there and looks hung.
  // Drive a steady creep toward ~95% on a timer so the bar is ALWAYS moving,
  // and let actual text length push it ahead whenever it streams fast.
  const [pct, setPct] = useState(6);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => Math.min(95, p + (95 - p) * 0.05));
    }, 150);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const charPct = Math.min(90, (charCount / EXPECTED_REPLY_LENGTH) * 90);
    setPct((p) => (charPct > p ? charPct : p));
  }, [charCount]);

  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex-1 h-1 rounded-full bg-eb-surface-2 overflow-hidden">
        <div
          className="h-full bg-eb-gold transition-all duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-eb-muted whitespace-nowrap">
        {UI[language].writing}
      </span>
    </div>
  );
}

// ── Memoised input form — does NOT re-render during streaming ─────────────────
interface ChatInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
  placeholder: string;
  hint: string;
}

const ChatInput = memo(function ChatInput({ onSubmit, isLoading, placeholder, hint }: ChatInputProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setText("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;
      onSubmit(trimmed);
      setText("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-eb-border p-3 flex-shrink-0 bg-white">
      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          maxLength={5000}
          className="flex-1 min-h-[3.25rem] bg-eb-surface-2 border border-eb-border rounded-lg px-3 py-2.5 text-sm leading-snug text-eb-navy placeholder:text-eb-subtle resize-none focus:outline-none focus:border-eb-gold focus:ring-1 focus:ring-eb-gold/20 transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="self-end p-2.5 bg-eb-gold hover:bg-eb-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors active:scale-95"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>
      <p className="mt-1.5 text-[10px] text-eb-subtle">
        {hint}
        {text.length > 0 && ` · ${text.length}/5000`}
      </p>
    </form>
  );
});

// ── Main page ────────────────────────────────────────────────────────────────
export default function AgentPage() {
  const [platform, setPlatform] = useState<Platform>("general");
  const [language, setLanguage] = useState<Language>("en");
  const [tone, setTone] = useState<Tone>("balanced");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);
  // Settings start collapsed on mobile (drawer); always shown on desktop via lg:block.
  const [showSettings, setShowSettings] = useState(false);
  const [newsletterDismissed, setNewsletterDismissed] = useState(false);

  // Knowledge-base mode for the AI answer. Default = facts. The user can flip to
  // arguments before sending, or switch after an answer to re-run in the other mode.
  const [mode, setMode] = useState<AnswerMode>("facts");

  // Localized UI chrome — follows the language selector.
  const t = UI[language];
  const platformLabel = (value: Platform) =>
    value === "general" ? t.generalPlatform : platforms.find((p) => p.value === value)?.label;

  // Scroll refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastUserMsgRef = useRef<HTMLDivElement>(null);
  const lastStreamUpdateRef = useRef(0);

  // Collapse settings on mobile after first message
  useEffect(() => {
    if (messages.length > 0 && window.innerWidth < 640) {
      setShowSettings(false);
    }
  }, [messages.length]);

  // When a new exchange (or mode re-run) starts, pin the latest question to the
  // top of the chat scroll area so it stays visible while the answer streams
  // below it — instead of the question scrolling out of view.
  const msgCountRef = useRef(0);
  useEffect(() => {
    if (messages.length > msgCountRef.current) {
      requestAnimationFrame(() => {
        const c = scrollContainerRef.current;
        const el = lastUserMsgRef.current;
        if (c && el) {
          c.scrollTop += el.getBoundingClientRect().top - c.getBoundingClientRect().top - 8;
        }
      });
    }
    msgCountRef.current = messages.length;
  }, [messages.length]);

  // Runs a query in a given mode. When isRerun is true (user flipped the
  // facts/arguments toggle after an answer), we reuse the previous question and
  // append only a fresh assistant message instead of duplicating the user bubble.
  const runQuery = useCallback(async (fudText: string, runMode: AnswerMode, isRerun = false) => {
    setError(null);
    setExpandedPanel(null);

    // Add an empty assistant placeholder (and, for new questions, the user
    // message) in one update so the thinking-indicator renders immediately —
    // otherwise the user stares at a blank chat for 2-5s while the server warms
    // up and it looks like it froze.
    setMessages((prev) => {
      const placeholder: ChatMessage = { role: "assistant", content: "", mode: runMode };
      return isRerun
        ? [...prev, placeholder]
        : [...prev, { role: "user", content: fudText }, placeholder];
    });
    setIsLoading(true);

    try {
      const res = await fetch("/api/fud-buster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fudText, platform, language, tone, mode: runMode }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Something went wrong");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let fullText = "";
      lastStreamUpdateRef.current = Date.now();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        for (const line of chunk.split("\n")) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.error) throw new Error(parsed.error);
              if (parsed.text) {
                fullText += parsed.text;
                // Throttle state updates to ~20fps to prevent textarea lag
                const now = Date.now();
                if (now - lastStreamUpdateRef.current >= 50) {
                  // Extract the partial "reply" field from the streaming JSON
                  // so users see clean text appearing progressively, not raw
                  // JSON fragments like {"triageResult":"educate","reply":"...
                  // If we haven't seen "reply":" yet, keep content empty so the
                  // thinking indicator stays visible instead of showing JSON.
                  const replyMatch = fullText.match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)/);
                  const progressiveReply = replyMatch
                    ? replyMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\")
                    : "";
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      ...updated[updated.length - 1],
                      content: progressiveReply,
                    };
                    return updated;
                  });
                  lastStreamUpdateRef.current = now;
                }
              }
            } catch {
              /* skip malformed events */
            }
          }
        }
      }

      // Final update — parse structured JSON from stream
      try {
        const jsonMatch = fullText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed: FudBusterResponse = JSON.parse(jsonMatch[0]);
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: parsed.reply,
              fudType: parsed.fudType,
              strategy: parsed.strategy,
              sources: parsed.sources,
              triageResult: parsed.triageResult,
              principles: parsed.principles,
              mode: runMode,
            };
            return updated;
          });
        } else {
          // Ensure the last streaming text is committed
          const snapshot = fullText;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: snapshot,
            };
            return updated;
          });
        }
      } catch {
        // Keep raw text if JSON parse fails
        const snapshot = fullText;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: snapshot,
          };
          return updated;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setMessages((prev) => prev.filter((m) => m.content !== ""));
    } finally {
      setIsLoading(false);
    }
  }, [platform, language, tone]);

  // New question from the input always uses the currently-selected mode.
  const handleSubmit = useCallback(
    (text: string) => runQuery(text, mode, false),
    [runQuery, mode]
  );

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function togglePanel(panel: string) {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  }

  // Most recent question the user asked — used to re-run when the mode is flipped.
  const lastUserText =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? null;
  const lastUserIndex = messages.map((m) => m.role).lastIndexOf("user");

  // Switch knowledge base. If an answer already exists, immediately re-run the
  // last question in the new mode so the user sees the alternative grounding.
  function switchMode(next: AnswerMode) {
    if (next === mode) return;
    setMode(next);
    if (!isLoading && lastUserText) {
      runQuery(lastUserText, next, true);
    }
  }

  return (
    <>
    <div
      className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-3 lg:gap-4"
      style={{ height: "calc(100dvh - 4rem)" }}
    >
      {/* Controls — left sidebar on desktop, collapsible drawer on mobile.
          These are set-and-forget, so they get out of the way of the answer. */}
      <aside className="flex-shrink-0 lg:w-64 pt-3 sm:pt-4">
        {/* Mobile: summary toggle */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="lg:hidden w-full flex items-center justify-between card px-3 py-2.5 mb-2"
        >
          <span className="flex items-center gap-2 text-xs text-eb-muted">
            <Settings2 className="w-3.5 h-3.5 text-eb-gold" />
            {mode === "arguments" ? t.argumentsLabel : t.facts}
            {" · "}
            {platformLabel(platform)}
            {" · "}
            {language.toUpperCase()}
            {" · "}
            {t.toneLabels[tone]}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-eb-muted transition-transform ${showSettings ? "rotate-180" : ""}`}
          />
        </button>

        {/* Settings panel */}
        <div className={`card p-3 ${showSettings ? "block" : "hidden"} lg:block`}>
          {/* Knowledge-base mode toggle */}
          <div className="mb-3">
            <label className="block text-[10px] text-eb-subtle mb-1 uppercase tracking-wider font-semibold">
              {t.knowledgeBase}
            </label>
            <div className="flex rounded-md border border-eb-border overflow-hidden">
              {([
                { value: "facts", label: t.facts, Icon: FileText },
                { value: "arguments", label: t.argumentsLabel, Icon: Lightbulb },
              ] as { value: AnswerMode; label: string; Icon: typeof Lightbulb }[]).map((m) => (
                <button
                  key={m.value}
                  onClick={() => switchMode(m.value)}
                  disabled={isLoading}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 text-[11px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    mode === m.value
                      ? "bg-eb-gold text-white"
                      : "bg-eb-surface-2 text-eb-muted hover:text-eb-navy"
                  }`}
                >
                  <m.Icon className="w-3.5 h-3.5" />
                  {m.label}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[10px] text-eb-subtle leading-snug">
              {t.modeHint}
            </p>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
            {/* Platform */}
            <div>
              <label className="block text-[10px] text-eb-subtle mb-1 uppercase tracking-wider font-semibold">
                {t.platform}
              </label>
              <div className="relative">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="w-full appearance-none bg-eb-surface-2 border border-eb-border text-eb-navy text-xs rounded-lg px-2 sm:px-2.5 py-2 pr-6 focus:outline-none focus:border-eb-gold"
                >
                  {platforms.map((p) => (
                    <option key={p.value} value={p.value}>{platformLabel(p.value)}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-eb-muted pointer-events-none" />
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-[10px] text-eb-subtle mb-1 uppercase tracking-wider font-semibold">
                {t.languageLabel}
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full appearance-none bg-eb-surface-2 border border-eb-border text-eb-navy text-xs rounded-lg px-2 sm:px-2.5 py-2 pr-6 focus:outline-none focus:border-eb-gold"
                >
                  {(Object.keys(LANGUAGE_LABELS) as Language[]).map((code) => (
                    <option key={code} value={code}>
                      {LANGUAGE_LABELS[code]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-eb-muted pointer-events-none" />
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-[10px] text-eb-subtle mb-1 uppercase tracking-wider font-semibold">
                {t.tone}
              </label>
              <div className="flex rounded-md border border-eb-border overflow-hidden">
                {tones.map((tn) => (
                  <button
                    key={tn.value}
                    onClick={() => setTone(tn.value)}
                    className={`flex-1 px-1 sm:px-2 py-2 text-[10px] sm:text-[11px] font-medium transition-colors ${
                      tone === tn.value
                        ? "bg-eb-gold text-white"
                        : "bg-eb-surface-2 text-eb-muted hover:text-eb-navy"
                    }`}
                  >
                    {t.toneLabels[tn.value]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Chat column — takes all remaining space so the answer is the focus */}
      <div className="flex-1 flex flex-col min-h-0 lg:pt-4 pb-3 sm:pb-4">
        {/* Chat area */}
        <div className="card flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Messages */}
        <div
          ref={scrollContainerRef}
          className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto"
        >
          {messages.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 rounded-xl bg-eb-gold-faint border border-eb-gold-border flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-eb-gold" />
              </div>
              <h3 className="font-serif text-sm font-semibold text-eb-navy mb-1">
                {t.emptyTitle}
              </h3>
              <p className="text-eb-muted text-xs max-w-xs mx-auto">
                {t.emptyBody}
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              ref={i === lastUserIndex ? lastUserMsgRef : undefined}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[85%] rounded-xl px-3 py-2.5 ${
                  msg.role === "user"
                    ? "bg-eb-gold-faint border border-eb-gold-border text-eb-navy"
                    : "bg-white border border-eb-border text-eb-slate shadow-card"
                }`}
              >
                {/* Triage & classification badges */}
                {msg.role === "assistant" && msg.triageResult && (
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 pb-2 border-b border-eb-border flex-wrap">
                    {(() => {
                      const Icon = triageIcons[msg.triageResult];
                      return (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-eb-surface-2 border border-eb-border text-[10px] font-medium text-eb-slate">
                          <Icon className="w-3 h-3" />
                          {t.triage[msg.triageResult]}
                        </span>
                      );
                    })()}
                    {msg.fudType && (
                      <span className="px-2 py-0.5 rounded-full bg-eb-gold-faint border border-eb-gold-border text-eb-gold text-[10px] font-medium">
                        {msg.fudType}
                      </span>
                    )}
                    {msg.strategy && (
                      <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-eb-surface-2 border border-eb-border text-eb-muted text-[10px]">
                        {msg.strategy}
                      </span>
                    )}
                    {msg.mode && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-eb-surface-2 border border-eb-border text-eb-muted text-[10px]">
                        {msg.mode === "arguments" ? <Lightbulb className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                        {msg.mode === "arguments" ? t.argumentsLabel : t.facts}
                      </span>
                    )}
                  </div>
                )}

                {/* Message text.
                    isStreaming = true for the last assistant message while we're still loading —
                    in that case CollapsibleText stays fully expanded and shows a blinking cursor. */}
                {(() => {
                  const isLastAssistant =
                    msg.role === "assistant" && i === messages.length - 1;
                  const isStreamingThis = isLastAssistant && isLoading && !!msg.content;
                  return (
                    <>
                      <CollapsibleText
                        text={msg.content}
                        className="text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap"
                        isStreaming={isStreamingThis}
                      />
                      {isStreamingThis && (
                        <StreamingProgress charCount={msg.content.length} language={language} />
                      )}
                    </>
                  );
                })()}

                {/* Action buttons — hidden while streaming so the progress bar owns the bottom */}
                {msg.role === "assistant" && msg.content && !(i === messages.length - 1 && isLoading) && (
                  <div className="mt-2 pt-2 border-t border-eb-border flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => copyToClipboard(msg.content)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-eb-gold-faint hover:bg-eb-gold/20 text-eb-gold border border-eb-gold-border text-[11px] font-medium transition-colors active:scale-95"
                    >
                      {copied ? (
                        <><Check className="w-3.5 h-3.5" /> {t.copied}</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> {t.copy}</>
                      )}
                    </button>
                    {msg.sources && msg.sources.length > 0 && (
                      <button
                        onClick={() => togglePanel(`sources-${i}`)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors active:scale-95 border ${
                          expandedPanel === `sources-${i}`
                            ? "bg-eb-gold-faint text-eb-gold border-eb-gold-border"
                            : "bg-eb-surface-2 hover:bg-eb-surface-2 text-eb-muted border-eb-border hover:text-eb-navy"
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        {t.sources}
                      </button>
                    )}
                    {msg.principles && msg.principles.length > 0 && (
                      <button
                        onClick={() => togglePanel(`principles-${i}`)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors active:scale-95 border ${
                          expandedPanel === `principles-${i}`
                            ? "bg-eb-gold-faint text-eb-gold border-eb-gold-border"
                            : "bg-eb-surface-2 text-eb-muted border-eb-border hover:text-eb-navy"
                        }`}
                      >
                        <Shield className="w-3.5 h-3.5" />
                        {t.principles}
                      </button>
                    )}
                  </div>
                )}

                {/* Sources panel */}
                {msg.role === "assistant" && expandedPanel === `sources-${i}` && msg.sources && (
                  <div className="mt-2 space-y-1.5">
                    {msg.sources.map((src, j) => (
                      <div key={j} className="p-2 rounded-md bg-eb-surface-2 border border-eb-border text-[11px]">
                        <p className="font-medium text-eb-navy">{src.name}</p>
                        <p className="text-eb-muted mt-0.5">{src.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Principles panel */}
                {msg.role === "assistant" && expandedPanel === `principles-${i}` && msg.principles && (
                  <div className="mt-2 space-y-1.5">
                    <p className="text-[10px] font-semibold text-eb-muted uppercase tracking-wider">
                      {t.principlesApplied}
                    </p>
                    {msg.principles.map((p, j) => {
                      const label = principleLabels[p.key] || {
                        name: p.key,
                        icon: "📋",
                        color: "text-eb-slate bg-eb-surface-2 border-eb-border",
                      };
                      return (
                        <div key={j} className={`p-2 rounded-md border text-[11px] ${label.color}`}>
                          <p className="font-semibold">
                            {label.icon} {label.name}
                          </p>
                          <p className="opacity-80 mt-0.5">{p.how}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Thinking indicator — shown while waiting for first stream token.
              Uses animated dots + text so users don't think the app froze. */}
          {isLoading && messages[messages.length - 1]?.content === "" && (
            <div className="flex justify-start">
              <div className="bg-white border border-eb-border rounded-xl px-3 py-2.5 shadow-card inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-eb-gold animate-spin" />
                <span className="text-[13px] text-eb-muted">
                  {t.analyzing}
                </span>
                <span className="inline-flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-eb-gold animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1 h-1 rounded-full bg-eb-gold animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 h-1 rounded-full bg-eb-gold animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error */}
        {error && (
          <div className="mx-3 mb-2 p-2.5 rounded-md bg-eb-red-faint border border-eb-red/20 text-eb-red text-xs">
            {error}
          </div>
        )}

        {/* Input — memoised, does not re-render during streaming */}
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} placeholder={t.placeholder} hint={t.inputHint} />
        </div>
      </div>
    </div>

      {/* Newsletter — placed BELOW the tool so it never sits between the answer
          and the input. Slim, dismissible, shown once after the first answer. */}
      {!isLoading && !newsletterDismissed && messages.some((m) => m.role === "assistant" && m.content) && (
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pb-5">
          <div className="rounded-lg border border-eb-border bg-eb-surface-2 px-3 py-2.5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-[11px] text-eb-muted leading-snug">
                {t.newsletterPrompt}
              </p>
              <button
                onClick={() => setNewsletterDismissed(true)}
                aria-label={t.dismiss}
                className="flex-shrink-0 text-eb-subtle hover:text-eb-navy transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <NewsletterSignup source="agent" variant="compact" />
          </div>
        </div>
      )}
    </>
  );
}
