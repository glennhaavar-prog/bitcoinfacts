import Link from "next/link";
import { ArrowRight, Copy, MessageSquare, Zap, Target, Shield, TrendingUp, Leaf, Globe } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "1. Lim inn FUD",
    description: "Kopier kommentaren fra sosiale medier og lim den inn i agenten.",
  },
  {
    icon: Target,
    title: "2. Velg plattform",
    description: "Agenten tilpasser svaret til X, LinkedIn, Facebook eller generelt format.",
  },
  {
    icon: Copy,
    title: "3. Kopier svaret",
    description: "Få et faktabasert, velformulert svar klart til å lime inn — på sekunder.",
  },
];

const didYouKnow = [
  {
    icon: Zap,
    fact: "Bitcoin-mining bruker 52,4 % bærekraftig energi — den eneste globale industrien verifisert over 50 %-terskelen.",
    source: "Cambridge University, April 2025",
  },
  {
    icon: Shield,
    fact: "I Norge steg strømprisene med 20 % umiddelbart etter at en Bitcoin-mining-operasjon forlot nettet.",
    source: "Norske nettdata, sept 2024",
  },
  {
    icon: TrendingUp,
    fact: "Texas sparte $18 milliarder ved å bruke Bitcoin-minere som fleksibel last i stedet for å bygge gasskraftverk.",
    source: "Digital Assets Research Institute",
  },
  {
    icon: Leaf,
    fact: "Bitcoin-mining kan utnytte opptil 98 % av tilgjengelig solenergi og 92 % av vindenergi som ellers ville gått til spille.",
    source: "Lai & You, Cornell University",
  },
  {
    icon: Globe,
    fact: "Gridless leverer fornybar energi til ~28 000 mennesker i fire afrikanske landsbyer — finansiert av Bitcoin-mining.",
    source: "Gridless",
  },
  {
    icon: MessageSquare,
    fact: "22 mediepublikasjoner, inkludert BBC, WSJ og Bloomberg, har nå kjørt saker om Bitcoin-minings miljøfordeler.",
    source: "Daniel Batten, medieanalyse",
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
              Fakta slår FUD
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Noen du kjenner poster{" "}
              <span className="gradient-text">Bitcoin-FUD?</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-dark-200 max-w-2xl mx-auto">
              Få et faktabasert, velformulert svar på sekunder. Bygget med
              Daniel Battens kommunikasjonsplaybook og verifisert forskning.
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
                href="/fakta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-800 hover:bg-dark-700 text-white font-semibold text-lg rounded-xl border border-dark-700 transition-all"
              >
                Utforsk fakta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-step explanation */}
      <section className="py-20 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Slik fungerer det
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
            Visste du at...?
          </h2>
          <p className="text-dark-300 text-center mb-12 max-w-2xl mx-auto">
            Overraskende fakta om Bitcoin-mining som de fleste ikke kjenner til.
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
                <p className="text-dark-400 text-xs">Kilde: {item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-dark-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Klar til å svare med fakta?
          </h2>
          <p className="text-dark-300 mb-8">
            Lim inn en FUD-kommentar og få et profesjonelt, kildebasert svar du
            kan bruke umiddelbart.
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
