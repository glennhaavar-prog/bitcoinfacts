import { ExternalLink, BookOpen, Scale, Play } from "lucide-react";

const sources = [
  {
    name: "Daniel Batten",
    description:
      "Technology investor, environmental advocate and Bitcoin mining researcher. Developer of the BEEST model.",
    url: "https://batcoinz.com",
  },
  {
    name: "Cambridge University CBECI",
    description:
      "The gold standard for Bitcoin energy data. The April 2025 report showed 52.4% sustainable energy.",
    url: "https://ccaf.io/cbnsi/cbeci",
  },
  {
    name: "WooCharts ESG Tracker",
    description:
      "Live tracking of Bitcoin mining's sustainability profile, based on the BEEST model.",
    url: "https://woocharts.com/esg-bitcoin-mining-sustainability/",
  },
  {
    name: "Sai & Vranken (2023)",
    description:
      "Peer-reviewed critique that uncovered systematic methodological flaws in de Vries' work.",
    url: "https://www.sciencedirect.com/science/article/pii/S2096720923000441",
  },
  {
    name: "Digital Assets Research Institute",
    description:
      "Independent research on Bitcoin mining's energy and environmental impact.",
    url: "https://www.da-ri.org/",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12">
        <p className="section-label mb-2">About this project</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-eb-navy mb-3">
          The Bitcoin Evidence Base
        </h1>
        <p className="text-eb-muted max-w-2xl mx-auto leading-relaxed">
          Why this project exists, how it works, and who&apos;s behind it.
        </p>
      </div>

      {/* Daniel Batten Video */}
      <section className="mb-8">
        <a
          href="https://www.youtube.com/watch?v=Zak12xxYg0k"
          target="_blank"
          rel="noopener noreferrer"
          className="card-hover p-6 flex flex-col sm:flex-row items-center gap-5 group block"
        >
          <div className="w-full sm:w-48 h-32 sm:h-28 rounded-lg bg-eb-surface-2 border border-eb-border flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            <img
              src="https://img.youtube.com/vi/Zak12xxYg0k/hqdefault.jpg"
              alt="Daniel Batten - Bitcoin and Energy"
              className="w-full h-full object-cover rounded-lg opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-eb-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-card-md">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
            </div>
          </div>
          <div>
            <p className="section-label mb-1">Featured Video</p>
            <h2 className="font-serif text-lg font-bold text-eb-navy group-hover:text-eb-gold transition-colors">
              Daniel Batten — Bitcoin &amp; the Environment
            </h2>
            <p className="text-eb-muted text-sm mt-1 leading-relaxed">
              The essential talk on why Bitcoin mining is not what most people
              think. Data-driven, nuanced, and eye-opening.
            </p>
          </div>
        </a>
      </section>

      {/* Mission */}
      <section className="card p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-eb-gold-faint border border-eb-gold-border flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-eb-gold" />
          </div>
          <h2 className="font-serif text-xl font-bold text-eb-navy">The Mission</h2>
        </div>
        <div className="space-y-4 text-eb-slate text-sm leading-relaxed">
          <p>
            Bitcoin mining is surrounded by misconceptions. Much of the
            criticism is based on outdated data, methodologically weak studies,
            or plain lack of knowledge. Meanwhile, a growing body of
            peer-reviewed research shows that Bitcoin mining can have
            significant environmental benefits.
          </p>
          <p>
            The problem is that most people don&apos;t have time to read 22+
            peer-reviewed papers, Cambridge reports and ERCOT data. When
            someone posts criticism on social media, you need a credible
            response — fast.
          </p>
          <p>
            The Bitcoin Evidence Base solves this. It combines Daniel
            Batten&apos;s communication playbook with a curated fact database
            and an AI research tool that generates fact-based, platform-adapted
            responses you can copy and paste directly.
          </p>
        </div>
      </section>

      {/* Method */}
      <section className="card p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-eb-green-faint border border-eb-green/20 flex items-center justify-center">
            <Scale className="w-5 h-5 text-eb-green" />
          </div>
          <h2 className="font-serif text-xl font-bold text-eb-navy">The Method</h2>
        </div>
        <div className="space-y-4 text-eb-slate text-sm leading-relaxed">
          <p>
            This tool is built on Daniel Batten&apos;s communication method,
            which emphasises truth, empathy and source-backed evidence. The
            agent follows four principles:
          </p>
          <ol className="space-y-3 pl-2">
            {[
              {
                title: "Truth first",
                desc: "Never exaggerate. Acknowledge what is true in the criticism.",
              },
              {
                title: "Influence, don't just inform",
                desc: "Create emotional connection before presenting data.",
              },
              {
                title: "Check your intention",
                desc: "Is this to educate and serve — or to win an argument?",
              },
              {
                title: "Authority + humility",
                desc: "Cite evidence confidently. Be humble about complexity.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-eb-gold mt-0.5 flex-shrink-0">
                  0{i + 1}
                </span>
                <span>
                  <strong className="text-eb-navy font-semibold">{item.title}</strong>
                  {" — "}
                  {item.desc}
                </span>
              </li>
            ))}
          </ol>
          <p>
            All facts in the database are sourced from peer-reviewed studies,
            Cambridge University, ERCOT data, and verifiable sources.
          </p>
        </div>
      </section>

      {/* Key Sources */}
      <section className="mb-8">
        <h2 className="font-serif text-xl font-bold text-eb-navy mb-4">
          Key Sources
        </h2>
        <div className="space-y-3">
          {sources.map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover p-4 flex items-start gap-4 group block"
            >
              <ExternalLink className="w-4 h-4 text-eb-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-eb-navy font-semibold text-sm group-hover:text-eb-gold transition-colors">
                  {source.name}
                </h3>
                <p className="text-eb-muted text-xs mt-1 leading-relaxed">
                  {source.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Beyond 66 */}
      <section className="card p-8 text-center border-eb-gold/20">
        <div className="w-10 h-10 rounded-xl bg-eb-gold-faint border border-eb-gold-border flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-5 h-5 text-eb-gold" />
        </div>
        <h2 className="font-serif text-xl font-bold text-eb-navy mb-2">
          Built by Beyond 66
        </h2>
        <p className="text-eb-muted text-sm max-w-md mx-auto mb-5 leading-relaxed">
          The Bitcoin Evidence Base is a project by Beyond 66 — advancing
          Bitcoin adoption through education, tools and research.
        </p>
        <a
          href="https://www.bitcoinbeyond66.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-eb-gold hover:bg-eb-gold-dark text-white font-semibold text-sm rounded-lg transition-colors"
        >
          Visit bitcoinbeyond66.com
          <ExternalLink className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
