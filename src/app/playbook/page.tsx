"use client";

import { useState } from "react";
import {
  Shield,
  Heart,
  Target,
  Award,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  HelpCircle,
  Eye,
  Swords,
  BookOpen,
  Ban,
} from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Sannhet først",
    description:
      "Aldri overdriv, aldri lyv. Innrøm det som er sant i kritikken. Hvis Bitcoin-mining faktisk forårsaket problemer i Kasakhstan i 2021, si det. Troverdighet kommer fra ærlighet, ikke fra spin.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: Heart,
    title: "Påvirk, ikke bare informer",
    description:
      "Skap emosjonell forbindelse FØR du presenterer data. Vis at du forstår perspektivet. Folk endrer ikke mening bare på grunn av data — de endrer mening når de føler seg hørt først.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    icon: Target,
    title: "Sjekk intensjonen",
    description:
      "Svarer du for å utdanne og tjene — eller for å vinne en debatt? Bare det første fungerer. Prøver du å 'eie' noen, trigger du forsvarsmekanismene deres.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Award,
    title: "Autoritet + Ydmykhet",
    description:
      "Sitér bevis med trygghet. Vær ydmyk om kompleksitet. 'Forskningen viser X, men dette er et komplekst felt i utvikling' er mer overbevisende enn 'Du tar feil, her er beviset.'",
    color: "text-bitcoin",
    bg: "bg-bitcoin/10",
  },
];

const reframeExamples = [
  {
    category: "180° Reframe",
    fud: "Bitcoin-mining destabiliserer strømnett.",
    wrong: "Det er ikke sant! Bitcoin er bra for nettet!",
    right:
      "Jeg forstår bekymringen. Det overrasker mange at forskning fra Duke University, data fra ERCOT, og flere fagfellevurderte studier faktisk viser det motsatte: Bitcoin-mining STABILISERER strømnett på grunn av sin unike fleksibilitet.",
    why: "Feil svar: defensivt, ingen kilder. Riktig svar: empati først, deretter 180° med spesifikke kilder.",
  },
  {
    category: "Innrøm & redefiner",
    fud: "Bitcoin bruker enormt mye energi.",
    wrong: "Bitcoins energibruk er en dråpe i havet sammenlignet med julelys!",
    right:
      "Ja, Bitcoin bruker betydelig energi. Men spørsmålet er ikke HVOR MYE — det er HVILKEN TYPE og TIL HVA. Cambridge viser 52,4 % bærekraftig energi, det er 100 % elektrifisert uten direkte utslipp, og den energien muliggjør nettstabilisering, metanreduksjon og akselerasjon av fornybar utvikling.",
    why: "Feil svar: whataboutism, minimerer. Riktig svar: innrømmer påstanden, redefinerer rammeverket.",
  },
  {
    category: "Spørsmålsteknikk",
    fud: "Bitcoin er dårlig for miljøet.",
    wrong: "Du har tydeligvis ikke gjort research! DYOR.",
    right:
      "Er du klar over at det nå finnes over 22 fagfellevurderte artikler som dokumenterer Bitcoin-minings miljøfordeler? Eller at det er den eneste globale industrien verifisert til å bruke mer enn 50 % bærekraftig energi?",
    why: "Feil svar: nedlatende, lukker samtalen. Riktig svar: åpner nysgjerrighet med spørsmål.",
  },
];

const neverSay = [
  { phrase: "Do your own research (DYOR)", reason: "Avvisende og uhøflig — lukker samtalen" },
  { phrase: "Bitcoins energibruk er en avrundingsfeil", reason: "Minimerer et reelt tall — ødelegger troverdighet" },
  { phrase: "Men julelys bruker mer energi!", reason: "Whataboutism — adresserer ikke argumentet" },
  { phrase: "Du forstår bare ikke Bitcoin", reason: "Nedlatende — stenger dialogen" },
  { phrase: "Personangrep", reason: "Angrip alltid argumentet, aldri personen" },
  { phrase: "HFSP (Have Fun Staying Poor)", reason: "Giftig, stammementalitet, kontraproduktivt" },
  { phrase: "Bitcoin fixes this", reason: "Vagt og kultaktig for utenforstående" },
];

export default function PlaybookPage() {
  const [activeExample, setActiveExample] = useState<number | null>(null);
  const [showWrong, setShowWrong] = useState<Record<number, boolean>>({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Kommunikasjons<span className="gradient-text">playbook</span>
        </h1>
        <p className="text-dark-300 max-w-2xl mx-auto">
          Daniel Battens metode for effektiv Bitcoin-kommunikasjon. Lær
          prinsippene, teknikkene og fallgruvene.
        </p>
      </div>

      {/* 4 Core Principles */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">
          De 4 kjerneprinsippene
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p) => (
            <div key={p.title} className="card p-6">
              <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                <p.icon className={`w-6 h-6 ${p.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {p.title}
              </h3>
              <p className="text-dark-300 text-sm leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 180° Reframe Examples */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">
          Teknikker med eksempler
        </h2>
        <p className="text-dark-300 mb-6">
          Se FUD-en, det feil svaret, og det riktige svaret side om side.
        </p>
        <div className="space-y-6">
          {reframeExamples.map((ex, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() =>
                  setActiveExample(activeExample === i ? null : i)
                }
                className="w-full p-5 text-left flex items-center justify-between"
              >
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-medium">
                    {ex.category}
                  </span>
                  <p className="mt-2 text-white font-medium">
                    &ldquo;{ex.fud}&rdquo;
                  </p>
                </div>
                {activeExample === i ? (
                  <ChevronUp className="w-5 h-5 text-dark-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-dark-400" />
                )}
              </button>

              {activeExample === i && (
                <div className="px-5 pb-5 space-y-4">
                  {/* Wrong response */}
                  <div
                    className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 cursor-pointer"
                    onClick={() =>
                      setShowWrong({ ...showWrong, [i]: !showWrong[i] })
                    }
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <X className="w-4 h-4 text-red-400" />
                      <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                        Feil svar
                      </span>
                      <span className="text-xs text-dark-500 ml-auto">
                        {showWrong[i] ? "Skjul" : "Vis"}
                      </span>
                    </div>
                    {showWrong[i] && (
                      <p className="text-dark-300 text-sm">{ex.wrong}</p>
                    )}
                  </div>

                  {/* Right response */}
                  <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">
                        Riktig svar
                      </span>
                    </div>
                    <p className="text-dark-200 text-sm leading-relaxed">
                      {ex.right}
                    </p>
                  </div>

                  {/* Why */}
                  <div className="p-4 rounded-lg bg-dark-900 border border-dark-700">
                    <div className="flex items-center gap-2 mb-2">
                      <HelpCircle className="w-4 h-4 text-bitcoin" />
                      <span className="text-xs font-semibold text-bitcoin uppercase tracking-wider">
                        Hvorfor?
                      </span>
                    </div>
                    <p className="text-dark-300 text-sm">{ex.why}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FUD Triage Decision Tree */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">
          FUD-triagering
        </h2>
        <p className="text-dark-300 mb-6">
          Før du svarer — vurder om det er verdt energien din.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 border-green-500/20">
            <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center mb-4">
              <Swords className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Kjemp</h3>
            <ul className="space-y-2 text-sm text-dark-300">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                Høy-profil kontoer med feilinformasjon
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                Medieartikler med faktafeil
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                Regulatoriske kommentarer basert på utdatert data
              </li>
            </ul>
            <p className="mt-4 text-xs text-green-400/80 font-medium">
              → Bruk ditt sterkeste, kildebaserte svar
            </p>
          </div>

          <div className="card p-6 border-dark-600">
            <div className="w-12 h-12 rounded-xl bg-dark-600 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-dark-300" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Ignorer</h3>
            <ul className="space-y-2 text-sm text-dark-300">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-dark-500 flex-shrink-0 mt-0.5" />
                Anonym trolling
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-dark-500 flex-shrink-0 mt-0.5" />
                Folk som argumenterer i ond tro
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-dark-500 flex-shrink-0 mt-0.5" />
                Kommentarer uten publikum/rekkevidde
              </li>
            </ul>
            <p className="mt-4 text-xs text-dark-400 font-medium">
              → Gå videre. Bruk energien bedre.
            </p>
          </div>

          <div className="card p-6 border-blue-500/20">
            <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Utdann</h3>
            <ul className="space-y-2 text-sm text-dark-300">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                Genuint nysgjerrige mennesker
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                Folk som siterer utdatert data
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                Venner/familie som deler mainstream FUD
              </li>
            </ul>
            <p className="mt-4 text-xs text-blue-400/80 font-medium">
              → Led med empati, bruk spørsmål, gi kilder
            </p>
          </div>
        </div>
      </section>

      {/* Never Say These */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">
          Aldri si dette
        </h2>
        <p className="text-dark-300 mb-6">
          Disse uttrykkene ødelegger troverdighet og lukker samtaler.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {neverSay.map((item, i) => (
            <div
              key={i}
              className="card p-4 flex items-start gap-3 border-red-500/10"
            >
              <Ban className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium">
                  &ldquo;{item.phrase}&rdquo;
                </p>
                <p className="text-dark-400 text-xs mt-1">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
