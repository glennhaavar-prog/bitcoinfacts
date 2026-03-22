"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertTriangle,
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
  truth_first: { name: "Truth First", icon: "🛡️", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  influence: { name: "Influence, Don't Just Inform", icon: "💗", color: "text-pink-400 bg-pink-400/10 border-pink-400/20" },
  check_intention: { name: "Check Intention", icon: "🎯", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  authority_humility: { name: "Authority + Humility", icon: "🏅", color: "text-bitcoin bg-bitcoin/10 border-bitcoin/20" },
};

const TEXT_COLLAPSE_LENGTH = 280;

function CollapsibleText({ text, className }: { text: string; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const needsCollapse = text.length > TEXT_COLLAPSE_LENGTH;

  if (!needsCollapse) {
    return <p className={className}>{text}</p>;
  }

  return (
    <div>
      <p className={className}>
        {expanded ? text : `${text.slice(0, TEXT_COLLAPSE_LENGTH)}...`}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-1.5 text-bitcoin text-xs font-medium hover:text-bitcoin-light transition-colors inline-flex items-center gap-1"
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

export default function AgentPage() {
  const [fudText, setFudText] = useState("");
  const [platform, setPlatform] = useState<Platform>("general");
  const [language, setLanguage] = useState<Language>("en");
  const [tone, setTone] = useState<Tone>("balanced");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Collapse settings on mobile after first message
  useEffect(() => {
    if (messages.length > 0 && window.innerWidth < 640) {
      setShowSettings(false);
    }
  }, [messages.length]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fudText.trim() || isLoading) return;

    setError(null);
    setExpandedPanel(null);
    const userMessage: ChatMessage = { role: "user", content: fudText.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setFudText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/fud-buster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fudText: userMessage.content, platform, language, tone }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Something went wrong");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let fullText = "";

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
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...updated[updated.length - 1], content: fullText };
                  return updated;
                });
              }
            } catch { /* skip */ }
          }
        }
      }

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
        }
      } catch { /* keep raw */ }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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

  function togglePanel(panel: string) {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col" style={{ height: "calc(100dvh - 4rem)" }}>
      {/* Settings bar — collapsible on mobile */}
      <div className="flex-shrink-0 mt-3 sm:mt-4">
        {/* Mobile: toggle button */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="sm:hidden w-full flex items-center justify-between card px-3 py-2.5 mb-2"
        >
          <span className="flex items-center gap-2 text-xs text-dark-300">
            <Settings2 className="w-3.5 h-3.5 text-bitcoin" />
            {platform === "general" ? "General" : platforms.find(p => p.value === platform)?.label} · {language === "en" ? "EN" : "NO"} · {tone.charAt(0).toUpperCase() + tone.slice(1)}
          </span>
          <ChevronDown className={`w-4 h-4 text-dark-400 transition-transform ${showSettings ? "rotate-180" : ""}`} />
        </button>

        {/* Settings content */}
        <div className={`card p-3 mb-3 ${showSettings ? "block" : "hidden sm:block"}`}>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div>
              <label className="block text-[10px] text-dark-400 mb-1 uppercase tracking-wider">Platform</label>
              <div className="relative">
                <select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="w-full appearance-none bg-dark-700 border border-dark-600 text-dark-100 text-xs rounded-lg px-2 sm:px-2.5 py-2 pr-6 focus:outline-none focus:border-bitcoin">
                  {platforms.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-dark-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-dark-400 mb-1 uppercase tracking-wider">Language</label>
              <div className="relative">
                <select value={language} onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full appearance-none bg-dark-700 border border-dark-600 text-dark-100 text-xs rounded-lg px-2 sm:px-2.5 py-2 pr-6 focus:outline-none focus:border-bitcoin">
                  <option value="en">English</option>
                  <option value="no">Norsk</option>
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-dark-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-dark-400 mb-1 uppercase tracking-wider">Tone</label>
              <div className="flex rounded-md border border-dark-600 overflow-hidden">
                {tones.map((t) => (
                  <button key={t.value} onClick={() => setTone(t.value)}
                    className={`flex-1 px-1 sm:px-2 py-2 text-[10px] sm:text-[11px] font-medium transition-colors ${
                      tone === t.value ? "bg-bitcoin text-dark-950" : "bg-dark-700 text-dark-300 hover:text-white"
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="card flex-1 flex flex-col min-h-0 mb-3 sm:mb-4">
        {/* Messages */}
        <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 rounded-xl bg-bitcoin/10 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-bitcoin" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">No FUD yet</h3>
              <p className="text-dark-400 text-xs max-w-xs mx-auto">
                Paste a Bitcoin-critical comment and get a fact-based response.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[90%] sm:max-w-[85%] rounded-xl px-3 py-2.5 ${
                msg.role === "user"
                  ? "bg-bitcoin/15 border border-bitcoin/25 text-dark-100"
                  : "bg-dark-700/80 border border-dark-600 text-dark-100"
              }`}>
                {/* Triage badges */}
                {msg.role === "assistant" && msg.triageResult && (
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 pb-2 border-b border-dark-600 flex-wrap">
                    {(() => {
                      const Icon = triageIcons[msg.triageResult];
                      return (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-dark-600 text-[10px] font-medium text-dark-200">
                          <Icon className="w-3 h-3" />{triageLabels[msg.triageResult]}
                        </span>
                      );
                    })()}
                    {msg.fudType && (
                      <span className="px-2 py-0.5 rounded-full bg-bitcoin/10 text-bitcoin text-[10px] font-medium">{msg.fudType}</span>
                    )}
                    {msg.strategy && (
                      <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-dark-600 text-dark-300 text-[10px]">{msg.strategy}</span>
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
                  <div className="mt-2 pt-2 border-t border-dark-600 flex items-center gap-1.5 flex-wrap">
                    <button onClick={() => copyToClipboard(msg.content)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-bitcoin/10 hover:bg-bitcoin/20 text-bitcoin text-[11px] font-medium transition-colors active:scale-95">
                      {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                    {msg.sources && msg.sources.length > 0 && (
                      <button onClick={() => togglePanel(`sources-${i}`)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors active:scale-95 ${
                          expandedPanel === `sources-${i}` ? "bg-bitcoin/20 text-bitcoin" : "bg-dark-600 hover:bg-dark-500 text-dark-200"
                        }`}>
                        <BookOpen className="w-3.5 h-3.5" />Sources
                      </button>
                    )}
                    {msg.principles && msg.principles.length > 0 && (
                      <button onClick={() => togglePanel(`principles-${i}`)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors active:scale-95 ${
                          expandedPanel === `principles-${i}` ? "bg-bitcoin/20 text-bitcoin" : "bg-dark-600 hover:bg-dark-500 text-dark-200"
                        }`}>
                        <Shield className="w-3.5 h-3.5" />Principles
                      </button>
                    )}
                  </div>
                )}

                {/* Sources panel */}
                {msg.role === "assistant" && expandedPanel === `sources-${i}` && msg.sources && (
                  <div className="mt-2 space-y-1.5">
                    {msg.sources.map((src, j) => (
                      <div key={j} className="p-2 rounded-md bg-dark-800 text-[11px]">
                        <p className="font-medium text-dark-200">{src.name}</p>
                        <p className="text-dark-400 mt-0.5">{src.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Principles panel */}
                {msg.role === "assistant" && expandedPanel === `principles-${i}` && msg.principles && (
                  <div className="mt-2 space-y-1.5">
                    <p className="text-[10px] font-semibold text-dark-400 uppercase tracking-wider">Batten Principles Applied</p>
                    {msg.principles.map((p, j) => {
                      const label = principleLabels[p.key] || { name: p.key, icon: "📋", color: "text-dark-300 bg-dark-700 border-dark-600" };
                      return (
                        <div key={j} className={`p-2 rounded-md border text-[11px] ${label.color}`}>
                          <p className="font-semibold">{label.icon} {label.name}</p>
                          <p className="opacity-80 mt-0.5">{p.how}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.content === "" && (
            <div className="flex justify-start">
              <div className="bg-dark-700 border border-dark-600 rounded-xl px-3 py-2.5">
                <Loader2 className="w-4 h-4 text-bitcoin animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error */}
        {error && (
          <div className="mx-3 mb-2 p-2.5 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-xs">{error}</div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-dark-700 p-3 flex-shrink-0">
          <div className="flex gap-2">
            <textarea
              value={fudText}
              onChange={(e) => setFudText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
              placeholder="Paste a FUD comment here..."
              rows={1}
              maxLength={5000}
              className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-3 py-2.5 text-sm text-dark-100 placeholder:text-dark-500 resize-none focus:outline-none focus:border-bitcoin transition-colors"
            />
            <button type="submit" disabled={isLoading || !fudText.trim()}
              className="self-end p-2.5 bg-bitcoin hover:bg-bitcoin-dark disabled:opacity-50 disabled:cursor-not-allowed text-dark-950 rounded-lg transition-colors active:scale-95">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <p className="mt-1.5 text-[10px] text-dark-500">
            Enter to send, Shift+Enter for new line{fudText.length > 0 && ` · ${fudText.length}/5000`}
          </p>
        </form>
      </div>
    </div>
  );
}
