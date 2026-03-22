import Link from "next/link";
import { ArrowRight, Copy, MessageSquare, Zap, Target, Shield, TrendingUp, Leaf, Globe } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "1. Paste the FUD",
    description: "Copy a comment from social media and paste it into the agent.",
  },
  {
    icon: Target,
    title: "2. Choose platform",
    description: "The agent adapts the response for X, LinkedIn, Facebook or general format.",
  },
  {
    icon: Copy,
    title: "3. Copy the response",
    description: "Get a fact-based, well-crafted response ready to paste — in seconds.",
  },
];

const didYouKnow = [
  {
    icon: Zap,
    fact: "Bitcoin mining uses 52.4% sustainable energy — the only global industry verified above the 50% threshold.",
    source: "Cambridge University, April 2025",
  },
  {
    icon: Shield,
    fact: "In Norway, electricity prices rose 20% immediately after a Bitcoin mining operation left the grid.",
    source: "Norwegian grid data, Sept 2024",
  },
  {
    icon: TrendingUp,
    fact: "Texas saved $18 billion by using Bitcoin miners as flexible load instead of building gas peaker plants.",
    source: "Digital Assets Research Institute",
  },
  {
    icon: Leaf,
    fact: "Bitcoin mining can utilize up to 98% of available solar energy and 92% of wind energy that would otherwise be wasted.",
    source: "Lai & You, Cornell University",
  },
  {
    icon: Globe,
    fact: "Gridless delivers renewable energy to ~28,000 people across four African villages — funded by Bitcoin mining.",
    source: "Gridless",
  },
  {
    icon: MessageSquare,
    fact: "22 media publications, including BBC, WSJ and Bloomberg, have now run stories on Bitcoin mining's environmental benefits.",
    source: "Daniel Batten, media analysis",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bitcoin/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bitcoin/10 border border-bitcoin/20 text-bitcoin text-sm mb-6">
              <Zap className="w-4 h-4" />
              Facts beat FUD
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Someone you know posting{" "}
              <span className="gradient-text">Bitcoin FUD?</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-dark-200 max-w-2xl mx-auto">
              Get a fact-based, well-crafted response in seconds. Built with
              Daniel Batten&apos;s communication playbook and verified research.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/agent"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-bitcoin hover:bg-bitcoin-dark text-dark-950 font-bold text-lg rounded-xl transition-all hover:scale-105 glow-bitcoin"
              >
                Bust some FUD
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/facts"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-800 hover:bg-dark-700 text-white font-semibold text-lg rounded-xl border border-dark-700 transition-all"
              >
                Explore facts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-step explanation */}
      <section className="py-20 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.title} className="card p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-bitcoin/10 flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-bitcoin" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-dark-300 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Did you know */}
      <section className="py-20 border-t border-dark-800 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Did you know...?
          </h2>
          <p className="text-dark-300 text-center mb-12 max-w-2xl mx-auto">
            Surprising facts about Bitcoin mining that most people don&apos;t know.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {didYouKnow.map((item, i) => (
              <div key={i} className="card-hover p-6">
                <div className="w-10 h-10 rounded-lg bg-bitcoin/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-bitcoin" />
                </div>
                <p className="text-dark-100 text-sm leading-relaxed mb-3">
                  {item.fact}
                </p>
                <p className="text-dark-400 text-xs">Source: {item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-dark-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to respond with facts?
          </h2>
          <p className="text-dark-300 mb-8">
            Paste a FUD comment and get a professional, source-backed response
            you can use immediately.
          </p>
          <Link
            href="/agent"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bitcoin hover:bg-bitcoin-dark text-dark-950 font-bold text-lg rounded-xl transition-all hover:scale-105 glow-bitcoin"
          >
            Start FUD Buster
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
