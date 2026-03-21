"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Copy,
  Check,
  ChevronDown,
  Loader2,
  AlertTriangle,
  BookOpen,
  Swords,
  Eye,
} from "lucide-react";
import type {
  Platform,
  Language,
  Tone,
  FudBusterResponse,
  ChatMessage,
} from "@/lib/types";

const platforms: { value: Platform; label: string }[] = [
  { value: "x", label: "X / Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "general", label: "Generell" },
];

const tones: { value: Tone; label: string; labelNo: string }[] = [
  { value: "direct", label: "More direct", labelNo: "Mer direkte" },
  { value: "balanced", label: "Balanced", labelNo: "Balansert" },
  { value: "soft", label: "Softer", labelNo: "Mykere" },
];

const triageIcons = {
  fight: Swords,
  ignore: Eye,
  educate: BookOpen,
};

const triageLabels = {
  fight: { no: "Kjemp", en: "Fight" },
  ignore: { no: "Ignorer", en: "Ignore" },
  educate: { no: "Utdann", en: "Educate" },
};

export default function AgentPage() {
  const [fudText, setFudText] = useState("");
  const [platform, setPlatform] = useState<Platform>("general");
  const [language, setLanguage] = useState<Language>("no");
  const [tone, setTone] = useState<Tone>("balanced");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSources, setShowSources] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fudText.trim() || isLoading) return;

    setError(null);
    const userMessage: ChatMessage = { role: "user", content: fudText.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setFudText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/fud-buster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fudText: userMessage.content,
          platform,
          language,
          tone,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Noe gikk galt");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let fullText = "";

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.text) {
                fullText += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: fullText,
                  };
                  return updated;
                });
              }
            } catch (parseErr) {
              // Skip malformed chunks
            }
          }
        }
      }

      // Try to parse the structured response
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
            };
            return updated;
          });
        }
      } catch {
        // If JSON parsing fails, keep the raw text
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt");
      setMessages((prev) => prev.filter((m) => m.content !== ""));
    } finally {
      setIsLoading(false);
    }
  }

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const lastAssistantMsg = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          FUD Buster <span className="gradient-text">Agent</span>
        </h1>
        <p className="text-dark-300">
          Lim inn en Bitcoin-FUD-kommentar og få et faktabasert svar.
        </p>
      </div>

      {/* Settings bar */}
      <div className="card p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          {/* Platform */}
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs text-dark-400 mb-1.5">
              Plattform
            </label>
            <div className="relative">
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="w-full appearance-none bg-dark-700 border border-dark-600 text-dark-100 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-bitcoin"
              >
                {platforms.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
            </div>
          </div>

          {/* Language */}
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs text-dark-400 mb-1.5">Språk</label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full appearance-none bg-dark-700 border border-dark-600 text-dark-100 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-bitcoin"
              >
                <option value="no">Norsk</option>
                <option value="en">English</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
            </div>
          </div>

          {/* Tone */}
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs text-dark-400 mb-1.5">Tone</label>
            <div className="flex rounded-lg border border-dark-600 overflow-hidden">
              {tones.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    tone === t.value
                      ? "bg-bitcoin text-dark-950"
                      : "bg-dark-700 text-dark-300 hover:text-white"
                  }`}
                >
                  {t.labelNo}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="card min-h-[400px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-bitcoin/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-bitcoin" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Ingen FUD ennå
              </h3>
              <p className="text-dark-400 text-sm max-w-sm mx-auto">
                Lim inn en Bitcoin-kritisk kommentar fra sosiale medier, og
                agenten vil gi deg et faktabasert svar.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-bitcoin/20 border border-bitcoin/30 text-dark-100"
                    : "bg-dark-700 border border-dark-600 text-dark-100"
                }`}
              >
                {msg.role === "assistant" && msg.triageResult && (
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-dark-600">
                    {msg.triageResult && (() => {
                      const Icon = triageIcons[msg.triageResult];
                      return (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-600 text-xs font-medium text-dark-200">
                          <Icon className="w-3.5 h-3.5" />
                          {triageLabels[msg.triageResult]?.no}
                        </span>
                      );
                    })()}
                    {msg.fudType && (
                      <span className="px-2.5 py-1 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-medium">
                        {msg.fudType}
                      </span>
                    )}
                    {msg.strategy && (
                      <span className="px-2.5 py-1 rounded-full bg-dark-600 text-dark-300 text-xs">
                        {msg.strategy}
                      </span>
                    )}
                  </div>
                )}

                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>

                {msg.role === "assistant" && msg.content && (
                  <div className="mt-3 pt-3 border-t border-dark-600 flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(msg.content)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bitcoin/10 hover:bg-bitcoin/20 text-bitcoin text-xs font-medium transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Kopiert!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Kopier svar
                        </>
                      )}
                    </button>

                    {msg.sources && msg.sources.length > 0 && (
                      <button
                        onClick={() => setShowSources(!showSources)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-600 hover:bg-dark-500 text-dark-200 text-xs font-medium transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Kilder ({msg.sources.length})
                      </button>
                    )}
                  </div>
                )}

                {msg.role === "assistant" &&
                  showSources &&
                  msg.sources &&
                  msg.sources.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.sources.map((src, j) => (
                        <div
                          key={j}
                          className="p-2.5 rounded-lg bg-dark-800 text-xs"
                        >
                          <p className="font-medium text-dark-200">
                            {src.name}
                          </p>
                          <p className="text-dark-400 mt-0.5">
                            {src.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.content === "" && (
            <div className="flex justify-start">
              <div className="bg-dark-700 border border-dark-600 rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 text-bitcoin animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error */}
        {error && (
          <div className="mx-4 sm:mx-6 mb-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-dark-700 p-4 sm:p-6"
        >
          <div className="flex gap-3">
            <textarea
              ref={textareaRef}
              value={fudText}
              onChange={(e) => setFudText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Lim inn en FUD-kommentar her..."
              rows={2}
              maxLength={5000}
              className="flex-1 bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-sm text-dark-100 placeholder:text-dark-500 resize-none focus:outline-none focus:border-bitcoin transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !fudText.trim()}
              className="self-end px-4 py-3 bg-bitcoin hover:bg-bitcoin-dark disabled:opacity-50 disabled:cursor-not-allowed text-dark-950 rounded-xl transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-dark-500">
            Trykk Enter for å sende, Shift+Enter for ny linje.{" "}
            {fudText.length > 0 && `${fudText.length}/5000`}
          </p>
        </form>
      </div>
    </div>
  );
}
