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
} from "lucide-react";
import type {
  Platform,
  Language,
  Tone,
  FudBusterResponse,
  ChatMessage,
  PrincipleKey,
} from "@/lib/types";

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

const triageLabels = {
  fight: "Fight",
  ignore: "Ignore",
  educate: "Educate",
};

const principleLabels: Record<PrincipleKey, { name: string; icon: string; color: string }> = {
  truth_first: { name: "Truth First", icon: "🛡️", color: "text-eb-green bg-eb-green-faint border-eb-green/20" },
  influence: { name: "Influence, Don't Just Inform", icon: "💗", color: "text-pink-600 bg-pink-50 border-pink-200" },
  check_intention: { name: "Check Intention", icon: "🎯", color: "text-blue-600 bg-blue-50 border-blue-200" },
  authority_humility: { name: "Authority + Humility", icon: "🏅", color: "text-eb-gold bg-eb-gold-faint border-eb-gold-border" },
};

const TEXT_COLLAPSE_LENGTH = 280;

function CollapsibleText({ text, className }: { text: string; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const needsCollapse = text.length > TEXT_COLLAPSE_LENGTH;

  if (!needsCollapse) return <p className={className}>{text}</p>;

  return (
    <div>
      <p className={className}>
        {expanded ? text : `${text.slice(0, TEXT_COLLAPSE_LENGTH)}...`}
      </p>
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
    </div>
  );
}

// ── Memoised input form — does NOT re-render during streaming ─────────────────
interface ChatInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const ChatInput = memo(function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
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
          placeholder="Paste a Bitcoin claim or criticism here..."
          rows={1}
          maxLength={5000}
          className="flex-1 bg-eb-surface-2 border border-eb-border rounded-lg px-3 py-2.5 text-sm text-eb-navy placeholder:text-eb-subtle resize-none focus:outline-none focus:border-eb-gold focus:ring-1 focus:ring-eb-gold/20 transition-colors"
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
        Enter to send · Shift+Enter for new line
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
  const [showSettings, setShowSettings] = useState(true);

  // Scroll tracking — don't auto-scroll if user manually scrolled up
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userScrolledUpRef = useRef(false);
  const lastStreamUpdateRef = useRef(0);

  // Detect manual scroll
  function handleScroll() {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    userScrolledUpRef.current = !isNearBottom;
  }

  // Auto-scroll to bottom when new messages arrive — only if user is at bottom
  useEffect(() => {
    if (!userScrolledUpRef.current && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Collapse settings on mobile after first message
  useEffect(() => {
    if (messages.length > 0 && window.innerWidth < 640) {
      setShowSettings(false);
    }
  }, [messages.length]);

  const handleSubmit = useCallback(async (fudText: string) => {
    setError(null);
    setExpandedPanel(null);
    // Reset scroll tracking — user just submitted, scroll to bottom
    userScrolledUpRef.current = false;

    const userMessage: ChatMessage = { role: "user", content: fudText };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/fud-buster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fudText, platform, language, tone }),
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

      // Add empty assistant message to fill during streaming
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

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
                  const snapshot = fullText;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      ...updated[updated.length - 1],
                      content: snapshot,
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

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function togglePanel(panel: string) {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  }

  return (
    <div
      className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col"
      style={{ height: "calc(100dvh - 4rem)" }}
    >
      {/* Settings bar */}
      <div className="flex-shrink-0 mt-3 sm:mt-4">
        {/* Mobile: summary toggle */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="sm:hidden w-full flex items-center justify-between card px-3 py-2.5 mb-2"
        >
          <span className="flex items-center gap-2 text-xs text-eb-muted">
            <Settings2 className="w-3.5 h-3.5 text-eb-gold" />
            {platform === "general" ? "General" : platforms.find((p) => p.value === platform)?.label}
            {" · "}
            {language === "en" ? "EN" : "NO"}
            {" · "}
            {tone.charAt(0).toUpperCase() + tone.slice(1)}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-eb-muted transition-transform ${showSettings ? "rotate-180" : ""}`}
          />
        </button>

        {/* Settings panel */}
        <div className={`card p-3 mb-3 ${showSettings ? "block" : "hidden sm:block"}`}>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* Platform */}
            <div>
              <label className="block text-[10px] text-eb-subtle mb-1 uppercase tracking-wider font-semibold">
                Platform
              </label>
              <div className="relative">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="w-full appearance-none bg-eb-surface-2 border border-eb-border text-eb-navy text-xs rounded-lg px-2 sm:px-2.5 py-2 pr-6 focus:outline-none focus:border-eb-gold"
                >
                  {platforms.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-eb-muted pointer-events-none" />
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-[10px] text-eb-subtle mb-1 uppercase tracking-wider font-semibold">
                Language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full appearance-none bg-eb-surface-2 border border-eb-border text-eb-navy text-xs rounded-lg px-2 sm:px-2.5 py-2 pr-6 focus:outline-none focus:border-eb-gold"
                >
                  <option value="en">English</option>
                  <option value="no">Norsk</option>
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-eb-muted pointer-events-none" />
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-[10px] text-eb-subtle mb-1 uppercase tracking-wider font-semibold">
                Tone
              </label>
              <div className="flex rounded-md border border-eb-border overflow-hidden">
                {tones.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    className={`flex-1 px-1 sm:px-2 py-2 text-[10px] sm:text-[11px] font-medium transition-colors ${
                      tone === t.value
                        ? "bg-eb-gold text-white"
                        : "bg-eb-surface-2 text-eb-muted hover:text-eb-navy"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="card flex-1 flex flex-col min-h-0 mb-3 sm:mb-4 overflow-hidden">
        {/* Messages */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto"
        >
          {messages.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 rounded-xl bg-eb-gold-faint border border-eb-gold-border flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-eb-gold" />
              </div>
              <h3 className="font-serif text-sm font-semibold text-eb-navy mb-1">
                Ready to analyse
              </h3>
              <p className="text-eb-muted text-xs max-w-xs mx-auto">
                Paste a Bitcoin-related claim or criticism and get a
                fact-based, evidence-backed response.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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
                          {triageLabels[msg.triageResult]}
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
                  </div>
                )}

                {/* Message text */}
                <CollapsibleText
                  text={msg.content}
                  className="text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap"
                />

                {/* Action buttons */}
                {msg.role === "assistant" && msg.content && (
                  <div className="mt-2 pt-2 border-t border-eb-border flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => copyToClipboard(msg.content)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-eb-gold-faint hover:bg-eb-gold/20 text-eb-gold border border-eb-gold-border text-[11px] font-medium transition-colors active:scale-95"
                    >
                      {copied ? (
                        <><Check className="w-3.5 h-3.5" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy</>
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
                        Sources
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
                        Principles
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
                      Batten Principles Applied
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

          {/* Streaming indicator */}
          {isLoading && messages[messages.length - 1]?.content === "" && (
            <div className="flex justify-start">
              <div className="bg-white border border-eb-border rounded-xl px-3 py-2.5 shadow-card">
                <Loader2 className="w-4 h-4 text-eb-gold animate-spin" />
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
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
