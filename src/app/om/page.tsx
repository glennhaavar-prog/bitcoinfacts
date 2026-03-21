import { ExternalLink, Github, Heart, Zap } from "lucide-react";

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
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Om <span className="gradient-text">FUD Buster</span>
        </h1>
        <p className="text-dark-300 max-w-2xl mx-auto">
          Hvorfor dette prosjektet finnes og hvem som står bak.
        </p>
      </div>

      {/* Mission */}
      <section className="card p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-bitcoin/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-bitcoin" />
          </div>
          <h2 className="text-xl font-bold text-white">Oppdraget</h2>
        </div>
        <div className="space-y-4 text-dark-200 text-sm leading-relaxed">
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
            noen poster FUD på sosiale medier, trenger du et godt svar — raskt.
          </p>
          <p>
            FUD Buster løser dette. Den kombinerer Daniel Battens
            kommunikasjonsplaybook med en kuratert faktadatabase og en AI-agent
            som genererer faktagrunnede, plattformtilpassede svar du kan kopiere
            og lime inn direkte.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="card p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Metoden</h2>
        </div>
        <div className="space-y-4 text-dark-200 text-sm leading-relaxed">
          <p>
            FUD Buster er bygget på Daniel Battens kommunikasjonsmetode, som
            vektlegger sannhet, empati og kildegrunnlag. Agenten følger fire
            prinsipper:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>
              <strong className="text-white">Sannhet først</strong> — Aldri
              overdriv. Innrøm det som er sant.
            </li>
            <li>
              <strong className="text-white">Påvirk, ikke bare informer</strong>{" "}
              — Emosjonell forbindelse før data.
            </li>
            <li>
              <strong className="text-white">Sjekk intensjonen</strong> — Er
              dette for å utdanne, eller for å vinne?
            </li>
            <li>
              <strong className="text-white">Autoritet + ydmykhet</strong> —
              Sitér bevis trygt. Vær ydmyk om kompleksitet.
            </li>
          </ol>
          <p>
            Alle fakta i databasen er hentet fra fagfellevurderte studier,
            Cambridge University, ERCOT-data, og verifiserbare kilder.
          </p>
        </div>
      </section>

      {/* Sources */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Nøkkelkilder</h2>
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
                <h3 className="text-white font-medium text-sm group-hover:text-bitcoin transition-colors">
                  {source.name}
                </h3>
                <p className="text-dark-400 text-xs mt-1">
                  {source.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Open Source */}
      <section className="card p-8 text-center">
        <Github className="w-10 h-10 text-dark-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Open Source</h2>
        <p className="text-dark-300 text-sm max-w-md mx-auto mb-4">
          FUD Buster er åpen kildekode under MIT-lisens. Bidra med fakta,
          forbedringer eller oversettelser.
        </p>
        <p className="text-dark-500 text-xs">Et Beyond 66-prosjekt</p>
      </section>
    </div>
  );
}
