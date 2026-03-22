"use client";

import { useState } from "react";
import {
  Shield, Heart, Target, Award, ArrowRight, ChevronDown, ChevronUp,
  X, Check, HelpCircle, Eye, Swords, BookOpen, Ban,
} from "lucide-react";

const principles = [
  {
    icon: Shield, title: "Truth First",
    description: "Never exaggerate, never lie. Acknowledge what is true in the criticism. If Bitcoin mining actually caused problems in Kazakhstan in 2021, say so. Credibility comes from honesty, not from spin.",
    color: "text-green-400", bg: "bg-green-400/10",
  },
  {
    icon: Heart, title: "Influence, Don't Just Inform",
    description: "Create emotional connection BEFORE presenting data. Show that you understand their perspective. People don't change their minds because of data alone — they change when they feel heard first.",
    color: "text-pink-400", bg: "bg-pink-400/10",
  },
  {
    icon: Target, title: "Check Your Intention",
    description: "Are you responding to educate and serve — or to win a debate? Only the first approach works. If you're trying to 'own' someone, you'll trigger their defenses and accomplish nothing.",
    color: "text-blue-400", bg: "bg-blue-400/10",
  },
  {
    icon: Award, title: "Authority + Humility",
    description: "Cite evidence confidently. Be humble about complexity. 'The research shows X, but this is a complex and evolving field' is more persuasive than 'You're wrong, here's the proof.'",
    color: "text-bitcoin", bg: "bg-bitcoin/10",
  },
];

const reframeExamples = [
  {
    category: "180° Reframe",
    fud: "Bitcoin mining destabilizes power grids.",
    wrong: "That's not true! Bitcoin is great for the grid!",
    right: "I understand the concern. It surprises many that research from Duke University, ERCOT data, and multiple peer-reviewed studies actually show the opposite: Bitcoin mining STABILIZES power grids due to its unique flexibility.",
    why: "Wrong answer: defensive, no sources. Right answer: empathy first, then 180° with specific sources.",
  },
  {
    category: "Admit & Redefine",
    fud: "Bitcoin uses an enormous amount of energy.",
    wrong: "Bitcoin's energy use is a drop in the ocean compared to Christmas lights!",
    right: "Yes, Bitcoin does use significant energy. But the question isn't HOW MUCH — it's WHAT KIND and WHAT FOR. Cambridge shows 52.4% sustainable energy, it's 100% electrified with no direct emissions, and that energy enables grid stabilization, methane mitigation and acceleration of renewable development.",
    why: "Wrong answer: whataboutism, minimizing. Right answer: acknowledges the claim, redefines the framework.",
  },
  {
    category: "Question Technique",
    fud: "Bitcoin is bad for the environment.",
    wrong: "You obviously haven't done your research! DYOR.",
    right: "Are you aware that there are now over 22 peer-reviewed papers documenting Bitcoin mining's environmental benefits? Or that it's the only global industry verified to use more than 50% sustainable energy?",
    why: "Wrong answer: condescending, closes the conversation. Right answer: opens curiosity with questions.",
  },
];

const neverSay = [
  { phrase: "Do your own research (DYOR)", reason: "Dismissive and rude — closes the conversation" },
  { phrase: "Bitcoin's energy use is a rounding error", reason: "Minimizes a real number — destroys credibility" },
  { phrase: "But Christmas lights use more energy!", reason: "Whataboutism — doesn't address the argument" },
  { phrase: "You just don't understand Bitcoin", reason: "Condescending — shuts down dialogue" },
  { phrase: "Personal attacks of any kind", reason: "Always attack the argument, never the person" },
  { phrase: "HFSP (Have Fun Staying Poor)", reason: "Toxic, tribal mentality, counterproductive" },
  { phrase: "Bitcoin fixes this", reason: "Vague and cult-like sounding to outsiders" },
];

export default function PlaybookPage() {
  const [activeExample, setActiveExample] = useState<number | null>(null);
  const [showWrong, setShowWrong] = useState<Record<number, boolean>>({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Communication <span className="gradient-text">Playbook</span>
        </h1>
        <p className="text-dark-300 max-w-2xl mx-auto">
          Daniel Batten&apos;s method for effective Bitcoin communication. Learn the principles, techniques and pitfalls.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">The 4 Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p) => (
            <div key={p.title} className="card p-6">
              <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                <p.icon className={`w-6 h-6 ${p.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-dark-300 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">Techniques with Examples</h2>
        <p className="text-dark-300 mb-6">See the FUD, the wrong response, and the right response side by side.</p>
        <div className="space-y-6">
          {reframeExamples.map((ex, i) => (
            <div key={i} className="card overflow-hidden">
              <button onClick={() => setActiveExample(activeExample === i ? null : i)} className="w-full p-5 text-left flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-medium">{ex.category}</span>
                  <p className="mt-2 text-white font-medium">&ldquo;{ex.fud}&rdquo;</p>
                </div>
                {activeExample === i ? <ChevronUp className="w-5 h-5 text-dark-400" /> : <ChevronDown className="w-5 h-5 text-dark-400" />}
              </button>
              {activeExample === i && (
                <div className="px-5 pb-5 space-y-4">
                  <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 cursor-pointer" onClick={() => setShowWrong({ ...showWrong, [i]: !showWrong[i] })}>
                    <div className="flex items-center gap-2 mb-2">
                      <X className="w-4 h-4 text-red-400" /><span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Wrong response</span>
                      <span className="text-xs text-dark-500 ml-auto">{showWrong[i] ? "Hide" : "Show"}</span>
                    </div>
                    {showWrong[i] && <p className="text-dark-300 text-sm">{ex.wrong}</p>}
                  </div>
                  <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2"><Check className="w-4 h-4 text-green-400" /><span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Right response</span></div>
                    <p className="text-dark-200 text-sm leading-relaxed">{ex.right}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-dark-900 border border-dark-700">
                    <div className="flex items-center gap-2 mb-2"><HelpCircle className="w-4 h-4 text-bitcoin" /><span className="text-xs font-semibold text-bitcoin uppercase tracking-wider">Why?</span></div>
                    <p className="text-dark-300 text-sm">{ex.why}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">FUD Triage</h2>
        <p className="text-dark-300 mb-6">Before responding — assess whether it&apos;s worth your energy.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 border-green-500/20">
            <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center mb-4"><Swords className="w-6 h-6 text-green-400" /></div>
            <h3 className="text-lg font-semibold text-white mb-2">Fight</h3>
            <ul className="space-y-2 text-sm text-dark-300">
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />High-profile accounts spreading misinformation</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />Media articles with factual errors</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />Regulatory comments based on outdated data</li>
            </ul>
            <p className="mt-4 text-xs text-green-400/80 font-medium">→ Deploy your strongest evidence-based response</p>
          </div>
          <div className="card p-6 border-dark-600">
            <div className="w-12 h-12 rounded-xl bg-dark-600 flex items-center justify-center mb-4"><Eye className="w-6 h-6 text-dark-300" /></div>
            <h3 className="text-lg font-semibold text-white mb-2">Ignore</h3>
            <ul className="space-y-2 text-sm text-dark-300">
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-dark-500 flex-shrink-0 mt-0.5" />Anonymous trolling</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-dark-500 flex-shrink-0 mt-0.5" />People arguing in bad faith</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-dark-500 flex-shrink-0 mt-0.5" />Comments with no audience/reach</li>
            </ul>
            <p className="mt-4 text-xs text-dark-400 font-medium">→ Walk away. Use your energy better.</p>
          </div>
          <div className="card p-6 border-blue-500/20">
            <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center mb-4"><BookOpen className="w-6 h-6 text-blue-400" /></div>
            <h3 className="text-lg font-semibold text-white mb-2">Educate</h3>
            <ul className="space-y-2 text-sm text-dark-300">
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />Genuinely curious people</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />People citing outdated data</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />Friends/family sharing mainstream FUD</li>
            </ul>
            <p className="mt-4 text-xs text-blue-400/80 font-medium">→ Lead with empathy, use questions, provide sources</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">Never Say These</h2>
        <p className="text-dark-300 mb-6">These phrases destroy credibility and close conversations.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {neverSay.map((item, i) => (
            <div key={i} className="card p-4 flex items-start gap-3 border-red-500/10">
              <Ban className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium">&ldquo;{item.phrase}&rdquo;</p>
                <p className="text-dark-400 text-xs mt-1">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
