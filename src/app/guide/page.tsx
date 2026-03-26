"use client";

import { Printer } from "lucide-react";

export default function GuidePage() {
  return (
    <>
      {/* Print button */}
      <div className="print:hidden fixed top-20 right-6 z-50">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 bg-eb-gold hover:bg-eb-gold-dark text-white font-semibold text-sm rounded-lg shadow-card-md transition-colors"
        >
          <Printer className="w-4 h-4" />
          Save as PDF
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 print:px-0 print:py-0 print:max-w-none">

        {/* Cover */}
        <div className="text-center mb-16 print:mb-12 print:pt-20">
          <p className="text-eb-gold print:text-orange-700 text-sm font-semibold uppercase tracking-widest mb-4">
            The Bitcoin Evidence Base
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-eb-navy print:text-black leading-tight mb-6">
            The Complete Guide to<br />Responding to Bitcoin Criticism
          </h1>
          <p className="text-eb-muted print:text-gray-600 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Facts, frameworks, and ready-to-use techniques for countering
            Bitcoin misinformation with evidence and empathy.
          </p>
          <div className="text-eb-subtle print:text-gray-500 text-sm space-y-1">
            <p>Based on Daniel Batten&apos;s Communication Playbook</p>
            <p>Published by Beyond 66 — bitcoinbeyond66.com</p>
            <p>Version 1.0 — March 2026</p>
          </div>
        </div>

        <hr className="border-eb-border print:border-gray-300 mb-12" />

        {/* Table of Contents */}
        <section className="mb-12 print:break-after-page">
          <h2 className="font-serif text-2xl font-bold text-eb-navy print:text-black mb-6">
            Table of Contents
          </h2>
          <ol className="space-y-2 text-eb-slate print:text-gray-700 text-sm">
            {[
              "The 4 Core Principles",
              "Communication Techniques",
              "FUD Triage: Fight, Ignore, or Educate",
              "Analogies That Work",
              "Never Say These Things",
              "Platform Formatting Guide",
              "Facts Database: Energy & Sustainability",
              "Facts Database: Environmental Benefits",
              "Facts Database: Grid & Flexibility",
              "Facts Database: Electricity Prices",
              "Facts Database: Adoption & Academic Support",
              "Facts Database: Common Myths",
              "Key Sources & References",
            ].map((title, i) => (
              <li key={i} className="flex items-baseline gap-2">
                <span className="text-eb-gold print:text-orange-700 font-bold font-mono text-sm">
                  {i + 1}.
                </span>
                {title}
              </li>
            ))}
          </ol>
        </section>

        {/* 1. Core Principles */}
        <section className="mb-12 print:break-before-page">
          <h2 className="font-serif text-2xl font-bold text-eb-navy print:text-black mb-6 flex items-baseline gap-3">
            <span className="text-eb-gold print:text-orange-700">1.</span> The 4 Core Principles
          </h2>
          <p className="text-eb-muted print:text-gray-600 text-sm mb-6 leading-relaxed">
            These principles, developed by Daniel Batten, are the foundation of effective Bitcoin communication.
            They apply to every interaction — whether you&apos;re responding to a tweet or writing a LinkedIn article.
          </p>

          <div className="space-y-4">
            {[
              {
                title: "Principle 1: Truth First",
                color: "text-eb-green print:text-green-700",
                bg: "bg-eb-green-faint print:bg-white",
                border: "border-eb-green/20 print:border-gray-200",
                text: "Never exaggerate, never lie. Acknowledge what is true in the criticism. If Bitcoin mining actually caused problems in Kazakhstan in 2021, say so. If energy use IS significant, acknowledge it before reframing. Credibility comes from honesty, not from spin. The moment you overstate a claim, you lose the trust of everyone watching the conversation — not just the person you're responding to.",
              },
              {
                title: "Principle 2: Influence, Don't Just Inform",
                color: "text-pink-600 print:text-pink-700",
                bg: "bg-pink-50 print:bg-white",
                border: "border-pink-200 print:border-gray-200",
                text: "Create emotional connection BEFORE presenting data. Show that you understand their perspective. People don't change their minds because of data alone — they change when they feel heard first. Start with \"I understand why you'd think that\" or \"That's a fair concern\" before presenting evidence. This isn't manipulation — it's basic human psychology. Data without rapport feels like an attack.",
              },
              {
                title: "Principle 3: Check Your Intention",
                color: "text-blue-600 print:text-blue-700",
                bg: "bg-blue-50 print:bg-white",
                border: "border-blue-200 print:border-gray-200",
                text: "Are you responding to educate and serve — or to win a debate? Only the first approach works. If you're trying to \"own\" someone, you'll trigger their defenses and accomplish nothing. Before responding, ask yourself: \"Am I doing this for the audience, or for my ego?\" If you can't answer honestly, don't respond. The best responses leave the other person thinking, not defensive.",
              },
              {
                title: "Principle 4: Authority + Humility",
                color: "text-eb-gold print:text-orange-700",
                bg: "bg-eb-gold-faint print:bg-white",
                border: "border-eb-gold-border print:border-gray-200",
                text: "Cite evidence confidently. Be humble about complexity. \"The research shows X, and this is a complex and evolving field\" is more persuasive than \"You're wrong, here's the proof.\" Authority without humility feels arrogant. Humility without authority feels uncertain. The combination — confident citation paired with intellectual honesty — is what builds lasting credibility.",
              },
            ].map((p) => (
              <div key={p.title} className={`card ${p.bg} border ${p.border} p-6`}>
                <h3 className={`font-serif text-lg font-bold ${p.color} mb-2`}>{p.title}</h3>
                <p className="text-eb-slate print:text-gray-700 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Techniques */}
        <section className="mb-12 print:break-before-page">
          <h2 className="font-serif text-2xl font-bold text-eb-navy print:text-black mb-6 flex items-baseline gap-3">
            <span className="text-eb-gold print:text-orange-700">2.</span> Communication Techniques
          </h2>

          <div className="space-y-8">
            {[
              {
                title: "The 180° Reframe",
                desc: "Take the exact claim being made and show that the opposite is true, with evidence. This is the most powerful technique when the evidence clearly supports the opposite conclusion.",
                fud: "\"Bitcoin mining destabilizes power grids\"",
                label: "180° Reframe",
                response: "\"I understand the concern. It surprises many that research from Duke University, ERCOT data, and multiple peer-reviewed studies actually show the opposite: Bitcoin mining STABILIZES power grids due to its unique flexibility — it can power down in 500 milliseconds.\"",
              },
              {
                title: "Admit & Redefine",
                desc: "For arguments that have some truth to them. Acknowledge the valid part, then redefine the frame. Use when the basic factual claim is technically correct but the implied conclusion is wrong.",
                fud: "\"Bitcoin uses an enormous amount of energy\"",
                label: "Admit & Redefine",
                response: "\"Yes, Bitcoin does use significant energy. And the question isn't HOW MUCH — it's WHAT KIND and WHAT FOR. Cambridge shows 52.4% sustainable energy, it's 100% electrified with no direct emissions, and that energy enables grid stabilization, methane mitigation and acceleration of renewable energy development.\"",
              },
              {
                title: "The Question Technique",
                desc: "Instead of making statements, ask questions that lead to the correct conclusion. Best used with genuinely curious people — questions feel less confrontational and let people discover the truth themselves.",
                fud: "\"Bitcoin is bad for the environment\"",
                label: "Question Technique",
                response: "\"Are you aware that there are now over 22 peer-reviewed papers documenting Bitcoin mining's environmental benefits? Or that it's the only global industry verified to use more than 50% sustainable energy?\"",
              },
            ].map((t) => (
              <div key={t.title}>
                <h3 className="font-serif text-lg font-bold text-eb-navy print:text-black mb-3">{t.title}</h3>
                <p className="text-eb-muted print:text-gray-600 text-sm mb-3 leading-relaxed">{t.desc}</p>
                <div className="card print:border print:border-gray-200 p-5 space-y-3">
                  <div>
                    <p className="text-xs text-eb-subtle print:text-gray-500 uppercase font-semibold mb-1">Claim</p>
                    <p className="text-eb-slate print:text-gray-700 text-sm italic">{t.fud}</p>
                  </div>
                  <div>
                    <p className="text-xs text-eb-green print:text-green-700 uppercase font-semibold mb-1">{t.label}</p>
                    <p className="text-eb-slate print:text-gray-700 text-sm leading-relaxed">{t.response}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Triage */}
        <section className="mb-12 print:break-before-page">
          <h2 className="font-serif text-2xl font-bold text-eb-navy print:text-black mb-6 flex items-baseline gap-3">
            <span className="text-eb-gold print:text-orange-700">3.</span> FUD Triage: Fight, Ignore, or Educate
          </h2>
          <p className="text-eb-muted print:text-gray-600 text-sm mb-6 leading-relaxed">
            Before responding to any claim, classify it. Not every comment deserves your energy.
          </p>

          <div className="space-y-4">
            {[
              {
                label: "FIGHT — High-priority responses",
                color: "text-eb-green print:text-green-700",
                items: [
                  "High-profile accounts spreading misinformation to large audiences",
                  "Media articles with factual errors that will be widely shared",
                  "Regulatory comments or policy discussions based on outdated data",
                ],
                note: "→ Deploy your strongest, most evidence-based response",
                noteColor: "text-eb-green/80 print:text-green-700",
              },
              {
                label: "IGNORE — Don't waste energy",
                color: "text-eb-muted print:text-gray-500",
                items: [
                  "Anonymous trolling with no genuine interest in discussion",
                  "People who have shown they argue in bad faith",
                  "Comments with no audience or reach",
                ],
                note: "→ Walk away. Use your energy on higher-impact responses",
                noteColor: "text-eb-subtle print:text-gray-500",
              },
              {
                label: "EDUCATE — Best opportunity",
                color: "text-blue-600 print:text-blue-700",
                items: [
                  "Genuinely curious people asking questions",
                  "People who cite outdated but once-valid data",
                  "Friends and family sharing mainstream media claims",
                ],
                note: "→ Lead with empathy, use questions, provide verifiable sources",
                noteColor: "text-blue-500/80 print:text-blue-700",
              },
            ].map((section) => (
              <div key={section.label} className="card print:border print:border-gray-200 p-5">
                <h3 className={`font-serif font-bold mb-2 ${section.color}`}>{section.label}</h3>
                <ul className="text-eb-slate print:text-gray-700 text-sm space-y-1.5">
                  {section.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
                <p className={`${section.noteColor} text-xs font-medium mt-3`}>{section.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Analogies */}
        <section className="mb-12 print:break-before-page">
          <h2 className="font-serif text-2xl font-bold text-eb-navy print:text-black mb-6 flex items-baseline gap-3">
            <span className="text-eb-gold print:text-orange-700">4.</span> Analogies That Work
          </h2>
          <div className="space-y-4">
            {[
              { name: "The EV Analogy", use: "Carbon footprint claims", analogy: "Saying Bitcoin has a high carbon footprint is like saying EVs have a high carbon footprint. Both have zero direct emissions — only scope-2 from electricity. Both are misleading when presented without comparing them to the more emission-intensive systems they replace." },
              { name: "The Car Radio Analogy", use: "Per-transaction energy claims", analogy: "Measuring Bitcoin's energy per transaction is like measuring a car's emissions per song played on the radio. The audio system doesn't cause the emissions. Similarly, Bitcoin's energy use doesn't come from its transactions — the network can scale volume without increasing resource use." },
              { name: "The Highway Analogy", use: "Grid impact claims", analogy: "Bitcoin mining permanently opens an extra lane of highway, uses it at off-peak times, but frees it up at peak times by taking the nearest off-ramp. The result is less congestion for everyone on the grid." },
              { name: "The Space Elevator Analogy", use: "'Use methane for something else' claims", analogy: "Saying we could use landfill gas for something other than Bitcoin mining is like saying we could build a space elevator from carbon nanotubes. Technically true. Economically infeasible. Bitcoin mining is uniquely positioned because ~80% of costs are electricity." },
              { name: "The Crumbs Analogy", use: "'Takes energy from others' claims", analogy: "Saying Bitcoin takes energy that could be used better is like saying if we collected all the crumbs eaten by ants each year, we could feed a small nation. Most energy Bitcoin uses is stranded and unable to be utilized by others." },
            ].map((a) => (
              <div key={a.name} className="card print:border print:border-gray-200 p-5">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-eb-navy print:text-black font-bold text-sm font-serif">{a.name}</h3>
                  <span className="text-eb-subtle print:text-gray-500 text-xs">— for {a.use}</span>
                </div>
                <p className="text-eb-slate print:text-gray-700 text-sm leading-relaxed">{a.analogy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Never Say */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-eb-navy print:text-black mb-6 flex items-baseline gap-3">
            <span className="text-eb-gold print:text-orange-700">5.</span> Never Say These Things
          </h2>
          <div className="card print:border print:border-gray-200 p-5">
            <div className="space-y-3">
              {[
                { phrase: "Do your own research (DYOR)", why: "Dismissive and rude — closes the conversation instantly" },
                { phrase: "Bitcoin's energy use is a rounding error", why: "Minimizes a real number — destroys your credibility" },
                { phrase: "But Christmas lights use more energy!", why: "Whataboutism — doesn't address the actual argument" },
                { phrase: "You just don't understand Bitcoin", why: "Condescending — shuts down any productive dialogue" },
                { phrase: "Personal attacks of any kind", why: "Always attack the argument, never the person" },
                { phrase: "HFSP (Have Fun Staying Poor)", why: "Toxic tribal mentality that repels potential allies" },
                { phrase: "Bitcoin fixes this", why: "Vague and cult-like sounding to anyone outside the community" },
              ].map((item) => (
                <div key={item.phrase} className="flex items-start gap-3 py-2 border-b border-eb-border print:border-gray-200 last:border-0">
                  <span className="text-eb-red print:text-red-600 text-sm mt-0.5">✕</span>
                  <div>
                    <p className="text-eb-navy print:text-black text-sm font-semibold">&quot;{item.phrase}&quot;</p>
                    <p className="text-eb-muted print:text-gray-500 text-xs mt-0.5">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Platform Guide */}
        <section className="mb-12 print:break-before-page">
          <h2 className="font-serif text-2xl font-bold text-eb-navy print:text-black mb-6 flex items-baseline gap-3">
            <span className="text-eb-gold print:text-orange-700">6.</span> Platform Formatting Guide
          </h2>
          <div className="space-y-4">
            {[
              { platform: "X / Twitter", rules: "Max 280 characters per tweet. Thread OK for complex topics. Lead with a hook — a surprising number or counterintuitive claim. Be punchy but always factual. Use specific numbers, not vague claims." },
              { platform: "LinkedIn", rules: "1,000–1,500 characters. Professional tone. Open with a surprising data point that challenges assumptions. Structure with short paragraphs. End with a question that invites discussion — this drives engagement and reaches more people." },
              { platform: "Facebook", rules: "Conversational and warm. Use analogies — they work exceptionally well here. Shorter than LinkedIn, warmer than X. Write as if explaining to a smart friend over coffee. Avoid jargon." },
              { platform: "General", rules: "Medium length. Neutral platform tone. Balance data with readability. Include at least one specific source. Works for email, forums, comments, or any context where you're unsure of the format." },
            ].map((p) => (
              <div key={p.platform} className="card print:border print:border-gray-200 p-5">
                <h3 className="text-eb-navy print:text-black font-serif font-bold text-sm mb-2">{p.platform}</h3>
                <p className="text-eb-slate print:text-gray-700 text-sm leading-relaxed">{p.rules}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7-12. Facts Database */}
        {[
          {
            num: "7", title: "Energy & Sustainability", facts: [
              { claim: "Bitcoin uses too much energy / as much energy as whole countries", reality: "Cambridge University states that comparing industries to countries is not meaningful and is an example of 'presenter bias'. The consensus within environmental science focuses on transforming the energy system, not reducing total energy use. Bitcoin mining, because of its high flexible energy use, offers decarbonization benefits including grid stabilization, methane mitigation, and accelerating the renewable energy transition.", source: "Cambridge University CBECI" },
              { claim: "Bitcoin's carbon footprint is very high", reality: "Bitcoin mining is the only global industry with robust third-party data showing it has crossed the 50% sustainable energy threshold (52.4% per Cambridge April 2025). Like EVs, Bitcoin mining has no direct emissions — only scope-2 emissions from electricity. Cambridge attributes ~39.8 MtCO2e, solely from electricity usage. The banking sector it replaces has higher emission intensity.", source: "Cambridge University Bitcoin Mining Report, April 2025" },
              { claim: "Most Bitcoin mining uses fossil fuels / coal", reality: "This was true before the China mining ban but is now 56.5% sustainable energy. Bloomberg Intelligence switched to Daniel Batten's open-source BEEST model, stating it 'appears to be more accurate'. Hydro has overtaken coal as the major power source.", source: "WooCharts ESG Tracker; Bloomberg Intelligence" },
            ]
          },
          {
            num: "8", title: "Environmental Benefits", facts: [
              { claim: "Proof of Stake is better for the environment than Proof of Work", reality: "Bitcoin's PoW uses more energy than PoS, but claiming this makes PoS more environmentally friendly conflates energy use with harm. Bitcoin's Proof of Work enables methane mitigation, grid stabilization, increased renewable capacity, and clean microgrid development — all proven in peer-reviewed research. Cambridge estimates Bitcoin pays off 5.5% of its annual carbon debt through methane mitigation alone.", source: "Cambridge University; 22 peer-reviewed papers" },
              { claim: "Bitcoin mining wastes energy", reality: "Significant peer-reviewed literature shows Bitcoin mining prevents waste of renewable energy. Moghimi et al found that integrating Bitcoin mining into microgrids prevented almost all energy waste while decreasing operating costs by 46.5%. Lai and You found up to 98% and 92% utilization of available solar and wind power respectively.", source: "Moghimi et al; Lai & You, Cornell University" },
              { claim: "You could use landfill gas for things other than Bitcoin mining", reality: "While technically true, it's economically infeasible. Nuno Barbosa, CEO of Unicarbo: '50% of the world's landfills have no option to sell their power back to the grid, but if they had an onsite customer, that would change everything.'", source: "Nuno Barbosa, CEO Unicarbo" },
            ]
          },
          {
            num: "9", title: "Grid & Flexibility", facts: [
              { claim: "Bitcoin mining destabilizes grids", reality: "A growing body of independent research shows Bitcoin mining stabilizes grids due to its flexible, modular, and interruptible nature. Duke University concluded that Controllable Load Resources (Bitcoin mining) stabilize grids and defer expensive upgrades. On ERCOT, Bitcoin mining provides near-daily stabilization through Frequency Regulation and Demand Response.", source: "Duke University; Lai et al; Ibañez et al; Menati et al; ERCOT" },
              { claim: "Bitcoin mining takes renewable energy from other users", reality: "Not supported by evidence. Bitcoin mining is a 'non-rival energy user' — it powers down when prices spike (when others need power). Gridless in Africa delivered renewable energy to four villages (~28,000 people). In Ethiopia, Bitcoin mining accelerated building transmission lines to rural communities.", source: "ERCOT; Gridless; EEP data (Ethiopia)" },
            ]
          },
          {
            num: "10", title: "Electricity Prices", facts: [
              { claim: "Consumers pay more for electricity because of Bitcoin miners", reality: "Between 2021-2024, Texas electricity costs rose 23.8% (7.0% inflation-adjusted) — actually slightly LESS than the US average of 24.67%. Brad Jones (former ERCOT CEO) stated Bitcoin mining 'helped keep the cost of electricity low for all Texans.' Norway saw prices jump 20% AFTER a mining operation left. In Kenya, adding Bitcoin mining dropped power costs from 35 to 25 cents/kWh.", source: "ERCOT; US EIA data; CNBC (Kenya); Norwegian grid data" },
              { claim: "Bitcoin mining forces grid operators to build expensive infrastructure", reality: "The opposite is true. In Texas, ERCOT used Bitcoin miners as flexible load instead of building $18 billion worth of gas peaker plants. Bitcoin miners can power down in 500 milliseconds and sustain reduced consumption for days. A Duke University study showed Bitcoin mining helps grid operators defer or avoid cost-prohibitive grid upgrade costs.", source: "Digital Assets Research Institute; Duke University" },
            ]
          },
          {
            num: "11", title: "Adoption & Academic Support", facts: [
              { claim: "Bitcoin has no real-world use", reality: "There are 19 documented environmental and humanitarian uses of Bitcoin. Gridless provides renewable energy access to ~28,000 people across four African villages. Bitcoin enables censorship-resistant remittances for people under authoritarian regimes. It provides financial access to the 1.4 billion unbanked adults worldwide.", source: "Gridless; HRF; World Bank" },
              { claim: "There's no scientific support for Bitcoin mining's benefits", reality: "There are now 22+ peer-reviewed papers documenting Bitcoin mining's environmental benefits. 9 papers concluded it accelerates the green energy transition. One showed it cuts the payback period of solar farms in half. Cambridge University's April 2025 report showed 52.4% sustainable energy. The work of critic Alex de Vries was comprehensively debunked by Sai and Vranken (2023).", source: "Sai & Vranken 2023; Cambridge April 2025; Lai et al" },
              { claim: "Bitcoin uses a lot of energy/water/eWaste per transaction", reality: "Dismissed in four peer-reviewed studies and by Cambridge University. Bitcoin's resource use does not come from its transactions — the network can scale transaction volume without increasing resource use. De Vries' eWaste estimates were overestimated by 1204% according to Cambridge 2025.", source: "Cambridge University; Masanet et al; Sai & Vranken" },
            ]
          },
          {
            num: "12", title: "Common Myths", facts: [
              { claim: "Bitcoin mining reopened mothballed fossil fuel plants", reality: "There are only 2 examples cited: Greenidge and Montana. No Bitcoin mining currently occurs on resurrected fossil fuel plants. Greenidge was restarted to supply grid power (not for mining) — SEC filings confirm this. The Montana coal facility was fully migrated to a Texas wind farm by Marathon Digital in late 2022.", source: "SEC filings; Marathon Digital Holdings" },
              { claim: "Bitcoin is a Ponzi scheme / has no intrinsic value", reality: "A Ponzi scheme requires: (1) a central operator who promises returns, (2) using new investor money to pay existing investors, (3) no actual product or service. Bitcoin has none of these — it's a decentralized protocol with no central operator, no promised returns, and provides real utility.", source: "SEC (Ponzi definition); Bitcoin whitepaper" },
              { claim: "Bitcoin is mainly used by criminals", reality: "Chainalysis data shows illicit activity accounts for less than 0.34% of all cryptocurrency transaction volume (2023). The UN estimates 2-5% of global GDP ($800B-$2T) is laundered through traditional banking annually. Bitcoin's transparent, immutable blockchain actually makes it a poor choice for criminals.", source: "Chainalysis 2024 Crypto Crime Report; UN Office on Drugs and Crime" },
            ]
          },
        ].map((section) => (
          <section key={section.num} className="mb-12 print:break-before-page">
            <h2 className="font-serif text-2xl font-bold text-eb-navy print:text-black mb-6 flex items-baseline gap-3">
              <span className="text-eb-gold print:text-orange-700">{section.num}.</span> {section.title}
            </h2>
            <div className="space-y-5">
              {section.facts.map((fact) => (
                <div key={fact.claim} className="card print:border print:border-gray-200 p-5">
                  <p className="text-eb-gold print:text-orange-700 text-xs font-semibold uppercase tracking-wider mb-2">
                    Common claim
                  </p>
                  <p className="text-eb-navy print:text-black font-serif font-semibold text-sm mb-3 italic">
                    &quot;{fact.claim}&quot;
                  </p>
                  <p className="text-xs text-eb-green print:text-green-700 font-semibold uppercase tracking-wider mb-1">
                    The evidence
                  </p>
                  <p className="text-eb-slate print:text-gray-700 text-sm leading-relaxed mb-3">
                    {fact.reality}
                  </p>
                  <p className="text-eb-subtle print:text-gray-500 text-xs">
                    Source: {fact.source}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* 13. References */}
        <section className="mb-12 print:break-before-page">
          <h2 className="font-serif text-2xl font-bold text-eb-navy print:text-black mb-6 flex items-baseline gap-3">
            <span className="text-eb-gold print:text-orange-700">13.</span> Key Sources &amp; References
          </h2>
          <div className="card print:border print:border-gray-200 p-5">
            <ul className="space-y-3 text-sm text-eb-slate print:text-gray-700">
              <li><strong className="text-eb-navy print:text-black">Cambridge University CBECI</strong> — ccaf.io/cbnsi/cbeci — The gold standard for Bitcoin energy data</li>
              <li><strong className="text-eb-navy print:text-black">Daniel Batten / BEEST Model</strong> — batcoinz.com — Open-source Bitcoin sustainability tracker</li>
              <li><strong className="text-eb-navy print:text-black">WooCharts ESG Tracker</strong> — woocharts.com/esg-bitcoin-mining-sustainability — Live sustainability data</li>
              <li><strong className="text-eb-navy print:text-black">Sai &amp; Vranken (2023)</strong> — &quot;A critique of Bitcoin energy consumption estimates&quot; — Debunked de Vries&apos; methodology</li>
              <li><strong className="text-eb-navy print:text-black">Digital Assets Research Institute</strong> — da-ri.org — Independent Bitcoin mining research</li>
              <li><strong className="text-eb-navy print:text-black">ERCOT / Brad Jones</strong> — Former interim CEO testimony on Bitcoin mining&apos;s grid benefits</li>
              <li><strong className="text-eb-navy print:text-black">Duke University</strong> — Whitepaper on Controllable Load Resources and grid stability</li>
              <li><strong className="text-eb-navy print:text-black">Lai &amp; You, Cornell University</strong> — Bitcoin mining and renewable energy utilization</li>
              <li><strong className="text-eb-navy print:text-black">Moghimi et al</strong> — Microgrid integration and 46.5% cost reduction</li>
              <li><strong className="text-eb-navy print:text-black">Chainalysis 2024</strong> — Crypto Crime Report showing 0.34% illicit activity</li>
              <li><strong className="text-eb-navy print:text-black">Nuno Barbosa, Unicarbo</strong> — Landfill gas and Bitcoin mining economics</li>
              <li><strong className="text-eb-navy print:text-black">Gridless</strong> — Renewable energy access in Africa via Bitcoin mining</li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-eb-border print:border-gray-300">
          <p className="text-eb-muted print:text-gray-500 text-sm mb-1">
            The Bitcoin Evidence Base — The Complete Guide
          </p>
          <p className="text-eb-subtle print:text-gray-400 text-xs">
            Version 1.0 — March 2026 — Published by Beyond 66
          </p>
          <p className="text-eb-subtle print:text-gray-400 text-xs mt-1">
            bitcoinbeyond66.com
          </p>
        </div>
      </div>
    </>
  );
}
