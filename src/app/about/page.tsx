import { ExternalLink, Github, Heart, Zap } from "lucide-react";

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
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          About <span className="gradient-text">FUD Buster</span>
        </h1>
        <p className="text-dark-300 max-w-2xl mx-auto">
          Why this project exists and who&apos;s behind it.
        </p>
      </div>

      <section className="card p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-bitcoin/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-bitcoin" />
          </div>
          <h2 className="text-xl font-bold text-white">The Mission</h2>
        </div>
        <div className="space-y-4 text-dark-200 text-sm leading-relaxed">
          <p>
            Bitcoin mining is surrounded by misconceptions. Much of the criticism
            is based on outdated data, methodologically weak studies, or plain
            lack of knowledge. Meanwhile, a growing body of peer-reviewed research
            shows that Bitcoin mining can have significant environmental benefits.
          </p>
          <p>
            The problem is that most people don&apos;t have time to read 22+
            peer-reviewed papers, Cambridge reports and ERCOT data. When someone
            posts FUD on social media, you need a good response — fast.
          </p>
          <p>
            FUD Buster solves this. It combines Daniel Batten&apos;s communication
            playbook with a curated fact database and an AI agent that generates
            fact-based, platform-adapted responses you can copy and paste directly.
          </p>
        </div>
      </section>

      <section className="card p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-white">The Method</h2>
        </div>
        <div className="space-y-4 text-dark-200 text-sm leading-relaxed">
          <p>
            FUD Buster is built on Daniel Batten&apos;s communication method, which
            emphasizes truth, empathy and source-backed evidence. The agent follows
            four principles:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li><strong className="text-white">Truth first</strong> — Never exaggerate. Acknowledge what is true.</li>
            <li><strong className="text-white">Influence, don&apos;t just inform</strong> — Emotional connection before data.</li>
            <li><strong className="text-white">Check your intention</strong> — Is this to educate, or to win?</li>
            <li><strong className="text-white">Authority + humility</strong> — Cite evidence confidently. Be humble about complexity.</li>
          </ol>
          <p>
            All facts in the database are sourced from peer-reviewed studies,
            Cambridge University, ERCOT data, and verifiable sources.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Key Sources</h2>
        <div className="space-y-3">
          {sources.map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover p-4 flex items-start gap-4 group block"
            >
              <ExternalLink className="w-5 h-5 text-bitcoin flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-white font-medium text-sm group-hover:text-bitcoin transition-colors">{source.name}</h3>
                <p className="text-dark-400 text-xs mt-1">{source.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="card p-8 text-center">
        <Github className="w-10 h-10 text-dark-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Open Source</h2>
        <p className="text-dark-300 text-sm max-w-md mx-auto mb-4">
          FUD Buster is open source under the MIT license. Contribute facts,
          improvements or translations.
        </p>
        <p className="text-dark-500 text-xs">A Beyond 66 project</p>
      </section>
    </div>
  );
}
