import { ExternalLink, BookOpen, Scale } from "lucide-react";

const sources = [
  {
    name: "Daniel Batten",
    description:
      "Teknologiinvestor, miljøforkjemper og Bitcoin-mining-forsker. Utvikler av BEEST-modellen.",
    url: "https://batcoinz.com",
  },
  {
    name: "Cambridge University CBECI",
    description:
      "Gullstandarden for Bitcoin-energidata. April 2025-rapporten viste 52,4 % bærekraftig energi.",
    url: "https://ccaf.io/cbnsi/cbeci",
  },
  {
    name: "WooCharts ESG Tracker",
    description:
      "Live-sporing av Bitcoin-minings bærekraftsprofil, basert på BEEST-modellen.",
    url: "https://woocharts.com/esg-bitcoin-mining-sustainability/",
  },
  {
    name: "Sai & Vranken (2023)",
    description:
      "Fagfellevurdert kritikk som avdekket systematiske metodologiske feil i de Vries' arbeid.",
    url: "https://www.sciencedirect.com/science/article/pii/S2096720923000441",
  },
  {
    name: "Digital Assets Research Institute",
    description:
      "Uavhengig forskning på Bitcoin-minings energi- og miljøpåvirkning.",
    url: "https://www.da-ri.org/",
  },
];

export default function OmPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12">
        <p className="section-label mb-2">Om dette prosjektet</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-eb-navy mb-3">
          The Bitcoin Evidence Base
        </h1>
        <p className="text-eb-muted max-w-2xl mx-auto leading-relaxed">
          Hvorfor dette prosjektet finnes og hvem som står bak.
        </p>
      </div>

      {/* Mission */}
      <section className="card p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-eb-gold-faint border border-eb-gold-border flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-eb-gold" />
          </div>
          <h2 className="font-serif text-xl font-bold text-eb-navy">Oppdraget</h2>
        </div>
        <div className="space-y-4 text-eb-slate text-sm leading-relaxed">
          <p>
            Bitcoin-mining er omgitt av misforståelser. Mye av kritikken er
            basert på utdaterte data, metodologisk svake studier, eller ren
            mangel på kunnskap. Samtidig viser et voksende antall
            fagfellevurderte studier at Bitcoin-mining kan ha betydelige
            miljøfordeler.
          </p>
          <p>
            Problemet er at de fleste ikke har tid til å lese 22+
            fagfellevurderte artikler, Cambridge-rapporter og ERCOT-data. Når
            noen poster kritikk på sosiale medier, trenger du et godt svar —
            raskt.
          </p>
          <p>
            The Bitcoin Evidence Base løser dette. Den kombinerer Daniel
            Battens kommunikasjonsplaybook med en kuratert faktadatabase og et
            AI-verktøy som genererer faktagrunnede, plattformtilpassede svar
            du kan kopiere og lime inn direkte.
          </p>
        </div>
      </section>

      {/* Method */}
      <section className="card p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-eb-green-faint border border-eb-green/20 flex items-center justify-center">
            <Scale className="w-5 h-5 text-eb-green" />
          </div>
          <h2 className="font-serif text-xl font-bold text-eb-navy">Metoden</h2>
        </div>
        <div className="space-y-4 text-eb-slate text-sm leading-relaxed">
          <p>
            Verktøyet er bygget på Daniel Battens kommunikasjonsmetode, som
            vektlegger sannhet, empati og kildegrunnlag. Agenten følger fire
            prinsipper:
          </p>
          <ol className="space-y-3 pl-2">
            {[
              { title: "Sannhet først", desc: "Aldri overdriv. Innrøm det som er sant i kritikken." },
              { title: "Påvirk, ikke bare informer", desc: "Emosjonell forbindelse før data." },
              { title: "Sjekk intensjonen", desc: "Er dette for å utdanne, eller for å vinne?" },
              { title: "Autoritet + ydmykhet", desc: "Sitér bevis trygt. Vær ydmyk om kompleksitet." },
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
            Alle fakta i databasen er hentet fra fagfellevurderte studier,
            Cambridge University, ERCOT-data, og verifiserbare kilder.
          </p>
        </div>
      </section>

      {/* Sources */}
      <section className="mb-8">
        <h2 className="font-serif text-xl font-bold text-eb-navy mb-4">Nøkkelkilder</h2>
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
      <section className="card p-8 text-center">
        <div className="w-10 h-10 rounded-xl bg-eb-gold-faint border border-eb-gold-border flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-5 h-5 text-eb-gold" />
        </div>
        <h2 className="font-serif text-xl font-bold text-eb-navy mb-2">
          Bygget av Beyond 66
        </h2>
        <p className="text-eb-muted text-sm max-w-md mx-auto mb-5 leading-relaxed">
          The Bitcoin Evidence Base er et prosjekt av Beyond 66 — som fremmer
          Bitcoin-adopsjon gjennom utdanning, verktøy og forskning.
        </p>
        <a
          href="https://www.bitcoinbeyond66.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-eb-gold hover:bg-eb-gold-dark text-white font-semibold text-sm rounded-lg transition-colors"
        >
          Besøk bitcoinbeyond66.com
          <ExternalLink className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
