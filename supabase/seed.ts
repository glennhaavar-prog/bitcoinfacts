import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

// Load .env.local since we're running outside Next.js
// process.cwd() is the project root when running via npm script
try {
  const envContent = readFileSync(process.cwd() + "/.env.local", "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex);
        const value = trimmed.slice(eqIndex + 1);
        process.env[key] = value;
      }
    }
  }
  console.log("Loaded .env.local");
} catch {
  console.error("Could not read .env.local — make sure it exists in the project root.");
  process.exit(1);
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

interface SeedFact {
  claim_no: string;
  claim_en: string;
  reality_no: string;
  reality_en: string;
  source_name: string;
  source_url?: string;
  source_date?: string;
  batten_tip_no: string;
  batten_tip_en: string;
  category_slug: string;
  tags: string[];
}

const seedFacts: SeedFact[] = [
  {
    category_slug: "energy",
    claim_no: "Bitcoin bruker for mye energi / like mye energi som hele land",
    claim_en: "Bitcoin uses too much energy / as much energy as whole countries",
    reality_no: "Cambridge University sier at å sammenligne industrier med land ikke er meningsfullt og er et eksempel på 'presentasjonsskjevhet'. Konsensus innen miljøvitenskap fokuserer på å transformere energisystemet, ikke redusere total energibruk.",
    reality_en: "Cambridge University states that comparing industries to countries is not meaningful and is an example of 'presenter bias'. The consensus within environmental science focuses on transforming the energy system, not reducing total energy use.",
    source_name: "Cambridge University CBECI",
    source_url: "https://ccaf.io/cbnsi/cbeci/comparisons",
    source_date: "2025-01-01",
    batten_tip_no: "Led med Cambridge-sitatet om presentasjonsskjevhet. Drei deretter til rammeverket med 7 spørsmål for å evaluere energibruk.",
    batten_tip_en: "Lead with the Cambridge quote about presenter bias. Then pivot to the 7 questions framework for evaluating energy use.",
    tags: ["energy", "cambridge", "presenter-bias"],
  },
  {
    category_slug: "energy",
    claim_no: "Bitcoins karbonfotavtrykk er veldig høyt",
    claim_en: "Bitcoin's carbon footprint is very high",
    reality_no: "Bitcoin-mining er den eneste globale industrien med robust tredjepartsdata som viser at den har krysset terskelen på 50 % bærekraftig energi (52,4 % ifølge Cambridge april 2025). Som elbiler har Bitcoin-mining ingen direkte utslipp — kun scope 2-utslipp fra strømforbruk.",
    reality_en: "Bitcoin mining is the only global industry with robust third-party data showing it has crossed the 50% sustainable energy threshold (52.4% per Cambridge April 2025). Like EVs, Bitcoin mining has no direct emissions — only scope-2 emissions from electricity.",
    source_name: "Cambridge University Bitcoin Mining Report, April 2025",
    source_url: "https://ccaf.io/cbnsi/cbeci",
    source_date: "2025-04-01",
    batten_tip_no: "Bruk elbil-analogien: 'Å si at Bitcoin har et høyt karbonfotavtrykk er som å si at elbiler har et høyt karbonfotavtrykk — vesentlig villedende.'",
    batten_tip_en: "Use the EV analogy: 'Saying Bitcoin has a high carbon footprint is like saying EVs have a high carbon footprint — materially misleading.'",
    tags: ["carbon", "emissions", "scope-2", "cambridge"],
  },
  {
    category_slug: "energy",
    claim_no: "Mesteparten av Bitcoin-mining bruker fossilt brensel / kull",
    claim_en: "Most Bitcoin mining uses fossil fuels / coal",
    reality_no: "Dette var sant før Kinas forbud mot mining, men nå er 56,5 % bærekraftig energi. Bloomberg Intelligence byttet fra Cambridge-modellen til Daniel Battens åpen kildekode BEEST-modell.",
    reality_en: "This was true before the China mining ban but is now 56.5% sustainable energy. Bloomberg Intelligence switched to Daniel Batten's open-source BEEST model, stating it 'appears to be more accurate'.",
    source_name: "WooCharts ESG Bitcoin Mining Sustainability Tracker",
    source_url: "https://woocharts.com/esg-bitcoin-mining-sustainability/",
    source_date: "2025-01-01",
    batten_tip_no: "Påpek at dataene er dynamiske — å bruke et 3 år gammelt datasett er som å forutsi et valg basert på en 3 år gammel meningsmåling.",
    batten_tip_en: "Point out the data is dynamic — using a 3-year-old dataset is like predicting an election from a 3-year-old poll.",
    tags: ["fossil-fuels", "coal", "sustainable-energy", "beest"],
  },
  {
    category_slug: "environment",
    claim_no: "Proof of Stake er bedre for miljøet enn Proof of Work",
    claim_en: "Proof of Stake is better for the environment than Proof of Work",
    reality_no: "Bitcoins PoW bruker mer energi enn PoS, men å hevde at dette gjør PoS mer miljøvennlig forveksler energibruk med skade. Bitcoins Proof of Work muliggjør metanreduksjon, nettstabilisering, økt fornybar kapasitet.",
    reality_en: "Bitcoin's PoW uses more energy than PoS, but claiming this makes PoS more environmentally friendly conflates energy use with harm. Bitcoin's PoW enables methane mitigation, grid stabilization, increased renewable capacity.",
    source_name: "Cambridge University; 22 peer-reviewed papers",
    source_date: "2025-01-01",
    batten_tip_no: "Lobotomi-analogien fungerer godt: 'Å foreslå at Bitcoin bør gå over til PoS for å spare energi er som å foreslå at et barn får lobotomi for å dempe energinivået.'",
    batten_tip_en: "The lobotomy analogy works well: 'Suggesting Bitcoin move to PoS to save energy is like suggesting a child get a lobotomy to curb their energy levels.'",
    tags: ["pos", "pow", "ethereum", "methane"],
  },
  {
    category_slug: "environment",
    claim_no: "Bitcoin-mining sløser med energi",
    claim_en: "Bitcoin mining wastes energy",
    reality_no: "Betydelig fagfellevurdert litteratur viser at Bitcoin-mining forhindrer sløsing av fornybar energi. Moghimi et al fant at integrering av Bitcoin-mining i mikronett forhindret nesten alt energisvinn og reduserte driftskostnader med 46,5 %.",
    reality_en: "Significant peer-reviewed literature shows Bitcoin mining prevents waste of renewable energy. Moghimi et al found integrating Bitcoin mining into microgrids prevented almost all energy waste while decreasing operating costs by 46.5%.",
    source_name: "Moghimi et al; Lai & You (Cornell University)",
    source_date: "2024-01-01",
    batten_tip_no: "'Å sløse med energi' er en verdivurdering. Spør: kan du virkelig hevde at energi sløses hvis det produserer 19 dokumenterte sosiale og miljømessige fordeler?",
    batten_tip_en: "'Wasting energy' is a value judgment. Ask: can you really claim energy is wasted if it produces 19 documented social and environmental benefits?",
    tags: ["waste", "microgrids", "renewable", "cornell"],
  },
  {
    category_slug: "environment",
    claim_no: "Man kunne brukt deponigas til andre ting enn Bitcoin-mining",
    claim_en: "You could use landfill gas for things other than Bitcoin mining",
    reality_no: "Selv om det er teknisk sant, er det økonomisk ugjennomførbart. Nuno Barbosa, CEO i Unicarbo: '50 % av verdens deponier har ingen mulighet til å selge strømmen tilbake til nettet.'",
    reality_en: "While technically true, it's economically infeasible. Nuno Barbosa, CEO of Unicarbo: '50% of the world's landfills have no option to sell their power back to the grid.'",
    source_name: "Nuno Barbosa, CEO Unicarbo",
    source_date: "2024-01-01",
    batten_tip_no: "Bruk romheis-analogien: teknisk mulig, økonomisk ugjennomførbart.",
    batten_tip_en: "Use the space elevator analogy: technically possible, economically infeasible.",
    tags: ["landfill", "methane", "unicarbo"],
  },
  {
    category_slug: "grid",
    claim_no: "Bitcoin-mining destabiliserer strømnett",
    claim_en: "Bitcoin mining destabilizes grids",
    reality_no: "En voksende mengde uavhengig forskning viser at Bitcoin-mining stabiliserer strømnett på grunn av sin fleksible, modulære og avbrytbare natur. Duke University konkluderte med at Kontrollerbare Lastressurser stabiliserer nett.",
    reality_en: "A growing body of independent research shows Bitcoin mining stabilizes grids due to its flexible, modular, and interruptible nature. Duke University concluded that Controllable Load Resources stabilize grids.",
    source_name: "Duke University; Lai et al; Ibañez et al; Menati et al; ERCOT",
    source_date: "2025-01-01",
    batten_tip_no: "Sitér Brad Jones (tidl. ERCOT-sjef): Bitcoin-minere 'fant en måte å ta overskuddswind i lavsesong.'",
    batten_tip_en: "Quote Brad Jones (former ERCOT CEO): Bitcoin miners 'found a way to take excess wind in offpeak periods.'",
    tags: ["grid", "stability", "ercot", "duke-university"],
  },
  {
    category_slug: "grid",
    claim_no: "Bitcoin-mining tar fornybar energi fra andre brukere",
    claim_en: "Bitcoin mining takes renewable energy from other users",
    reality_no: "Ikke støttet av bevis. Bitcoin-mining er en 'ikke-rivaliserende energibruker' — den slår seg av når prisene stiger. Gridless i Afrika leverte fornybar energi til fire landsbyer (~28 000 mennesker).",
    reality_en: "Not supported by evidence. Bitcoin mining is a 'non-rival energy user' — it powers down when prices spike. Gridless in Africa delivered renewable energy to four villages (~28,000 people).",
    source_name: "ERCOT; Gridless; EEP data (Ethiopia)",
    source_date: "2024-01-01",
    batten_tip_no: "Smuler-analogien: 'Å si at Bitcoin tar energi fra andre er som å si at smulene maur spiser hvert år kunne mettet en nasjon.'",
    batten_tip_en: "The crumbs analogy: 'Saying Bitcoin takes energy from others is like saying taking crumbs eaten by ants each year could feed a nation.'",
    tags: ["renewable", "gridless", "africa", "non-rival"],
  },
  {
    category_slug: "price",
    claim_no: "Forbrukere betaler mer for strøm på grunn av Bitcoin-minere",
    claim_en: "Consumers pay more for electricity because of Bitcoin miners",
    reality_no: "Mellom 2021-2024 steg strømkostnadene i Texas med 23,8 % (7,0 % inflasjonsjustert) — faktisk litt MINDRE enn gjennomsnittet i USA. Norge opplevde at prisene hoppet 20 % ETTER at en Bitcoin-mining-operasjon forlot nettet.",
    reality_en: "Between 2021-2024, Texas electricity costs rose 23.8% (7.0% inflation-adjusted) — actually slightly LESS than the US average. Norway saw prices jump 20% AFTER a Bitcoin mining operation left.",
    source_name: "ERCOT; US EIA data; CNBC (Kenya); Norwegian grid data",
    source_date: "2024-01-01",
    batten_tip_no: "Norge- og Kenya-eksemplene er kraftige fordi de viser den direkte, målbare effekten.",
    batten_tip_en: "The Norway and Kenya examples are powerful because they show the direct, measurable impact.",
    tags: ["prices", "texas", "norway", "kenya"],
  },
  {
    category_slug: "price",
    claim_no: "Bitcoin-mining tvinger nettoperatører til å bygge dyr infrastruktur",
    claim_en: "Bitcoin mining forces grid operators to build expensive infrastructure",
    reality_no: "Det motsatte er sant. I Texas brukte ERCOT Bitcoin-minere som fleksibel last i stedet for å bygge gasskraftverk til 18 milliarder dollar.",
    reality_en: "The opposite is true. In Texas, ERCOT used Bitcoin miners as flexible load instead of building $18 billion worth of gas peaker plants.",
    source_name: "Digital Assets Research Institute; Duke University",
    source_date: "2025-01-01",
    batten_tip_no: "Motorvei-analogien: Bitcoin-mining 'åpner permanent et ekstra felt, bruker det i lavsesong, og frigjør det i høysesong.'",
    batten_tip_en: "The highway analogy: Bitcoin mining 'permanently opens an extra lane, uses it at offpeak, and frees it at onpeak.'",
    tags: ["infrastructure", "peaker-plants", "texas", "cost-savings"],
  },
  {
    category_slug: "adoption",
    claim_no: "Bitcoin har ingen bruk i den virkelige verden",
    claim_en: "Bitcoin has no real-world use",
    reality_no: "Det finnes 19 dokumenterte miljø- og humanitære bruksområder for Bitcoin. Gridless gir tilgang til fornybar energi for ~28 000 mennesker i fire afrikanske landsbyer.",
    reality_en: "There are 19 documented environmental and humanitarian uses of Bitcoin. Gridless provides renewable energy access to ~28,000 people across four African villages.",
    source_name: "Gridless; HRF; World Bank",
    source_date: "2024-01-01",
    batten_tip_no: "Spør: 'Er du klar over de 19 dokumenterte sosiale og miljømessige bruksområdene?'",
    batten_tip_en: "Ask: 'Are you aware of the 19 documented social and environmental uses?'",
    tags: ["use-case", "humanitarian", "gridless", "africa"],
  },
  {
    category_slug: "academic",
    claim_no: "Det finnes ingen vitenskapelig støtte for Bitcoin-minings fordeler",
    claim_en: "There's no scientific support for Bitcoin mining's benefits",
    reality_no: "Det finnes nå over 22 fagfellevurderte artikler som dokumenterer Bitcoin-minings miljøfordeler. 9 artikler konkluderte med at Bitcoin-mining akselererer den grønne energiomstillingen.",
    reality_en: "There are now 22+ peer-reviewed papers documenting Bitcoin mining's environmental benefits. 9 papers concluded Bitcoin mining accelerates the green energy transition.",
    source_name: "Sai & Vranken 2023; Cambridge April 2025; Lai et al; Cornell University",
    source_date: "2025-01-01",
    batten_tip_no: "Medietiden har snudd: 22 publikasjoner inkludert BBC, WSJ, Bloomberg har kjørt saker om Bitcoin-minings miljøfordeler.",
    batten_tip_en: "The media tide has turned: 22 publications including BBC, WSJ, Bloomberg have run stories on Bitcoin mining's environmental benefits.",
    tags: ["peer-reviewed", "academic", "media", "cambridge"],
  },
  {
    category_slug: "academic",
    claim_no: "Bitcoin bruker mye energi/vann/e-avfall per transaksjon",
    claim_en: "Bitcoin uses a lot of energy/water/eWaste per transaction",
    reality_no: "Avvist i fire fagfellevurderte studier og av Cambridge University. Bitcoins ressursbruk kommer ikke fra transaksjonene — nettverket kan skalere transaksjonsvolum uten å øke ressursbruken.",
    reality_en: "Dismissed in four peer-reviewed studies and by Cambridge University. Bitcoin's resource use does not come from its transactions — the network can scale transaction volume without increasing resource use.",
    source_name: "Cambridge University; Masanet et al; Sai & Vranken",
    source_date: "2025-01-01",
    batten_tip_no: "Bruk bilradio-analogien: å måle utslipp per sang spilt er like meningsløst som utslipp per Bitcoin-transaksjon.",
    batten_tip_en: "Use the car radio analogy: measuring emissions per song played is as meaningless as emissions per Bitcoin transaction.",
    tags: ["per-transaction", "de-vries", "ewaste", "water"],
  },
  {
    category_slug: "myths",
    claim_no: "Bitcoin-mining gjenåpnet nedlagte fossile kraftverk",
    claim_en: "Bitcoin mining reopened mothballed fossil fuel plants",
    reality_no: "Det finnes bare 2 eksempler som siteres: Greenidge og Montana. Ingen Bitcoin-mining foregår for tiden på gjenoppstartede fossile kraftverk.",
    reality_en: "There are only 2 examples cited: Greenidge and Montana. No Bitcoin mining currently occurs on resurrected fossil fuel plants.",
    source_name: "SEC filings; Marathon Digital Holdings",
    source_date: "2022-12-01",
    batten_tip_no: "Enkel omformulering: 'Nevn én Bitcoin-mine som opererer på et gjenoppstartet fossilt kraftverk. Det er null.'",
    batten_tip_en: "Simple reframe: 'Name one currently operating Bitcoin mine on a resurrected fossil fuel plant. There are zero.'",
    tags: ["fossil-fuel", "greenidge", "marathon", "coal"],
  },
  {
    category_slug: "myths",
    claim_no: "Bitcoin er et Ponzi-opplegg / har ingen iboende verdi",
    claim_en: "Bitcoin is a Ponzi scheme / has no intrinsic value",
    reality_no: "Et Ponzi-opplegg krever: (1) en sentral operatør, (2) bruk av nye investorpenger til å betale eksisterende, (3) ingen faktisk produkt. Bitcoin har ingen av disse.",
    reality_en: "A Ponzi scheme requires: (1) a central operator, (2) using new investor money to pay existing investors, (3) no actual product. Bitcoin has none of these.",
    source_name: "SEC (Ponzi definition); Bitcoin whitepaper",
    source_date: "2008-01-01",
    batten_tip_no: "Ikke bli defensiv. Gå rolig gjennom Ponzi-definisjonen og vis hvordan Bitcoin feiler hvert kriterium.",
    batten_tip_en: "Don't get defensive. Calmly walk through the Ponzi definition and show how Bitcoin fails every criterion.",
    tags: ["ponzi", "value", "definition"],
  },
  {
    category_slug: "myths",
    claim_no: "Bitcoin brukes hovedsakelig av kriminelle",
    claim_en: "Bitcoin is mainly used by criminals",
    reality_no: "Chainalysis-data viser at ulovlig aktivitet utgjør mindre enn 0,34 % av alt kryptovalutatransaksjonsvolum. FN anslår at 2-5 % av globalt BNP hvitvaskes gjennom tradisjonell bankvirksomhet.",
    reality_en: "Chainalysis data shows illicit activity accounts for less than 0.34% of all cryptocurrency transaction volume. The UN estimates 2-5% of global GDP is laundered through traditional banking.",
    source_name: "Chainalysis 2024 Crypto Crime Report; UN Office on Drugs and Crime",
    source_date: "2024-01-01",
    batten_tip_no: "180°-omformulering: Bitcoins blokkjede er det mest transparente finanssystemet som noensinne er laget.",
    batten_tip_en: "180° reframe: Bitcoin's blockchain is the most transparent financial system ever created.",
    tags: ["criminal", "chainalysis", "money-laundering", "transparency"],
  },
];

async function seed() {
  console.log("Seeding categories and facts...");

  // Get categories
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("id, slug");

  if (catError) {
    console.error("Error fetching categories:", catError);
    console.log("Make sure you've run the SQL migrations first.");
    process.exit(1);
  }

  const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));

  // Insert facts
  let inserted = 0;
  for (const fact of seedFacts) {
    const categoryId = categoryMap.get(fact.category_slug);
    if (!categoryId) {
      console.warn(`Category '${fact.category_slug}' not found, skipping: ${fact.claim_en}`);
      continue;
    }

    const { error } = await supabase.from("facts").insert({
      category_id: categoryId,
      status: "published",
      claim_no: fact.claim_no,
      claim_en: fact.claim_en,
      reality_no: fact.reality_no,
      reality_en: fact.reality_en,
      source_name: fact.source_name,
      source_url: fact.source_url || null,
      source_date: fact.source_date || null,
      verified_date: new Date().toISOString().split("T")[0],
      batten_tip_no: fact.batten_tip_no,
      batten_tip_en: fact.batten_tip_en,
      tags: fact.tags,
      confidence: "high",
    });

    if (error) {
      console.error(`Error inserting fact: ${fact.claim_en}`, error);
    } else {
      inserted++;
    }
  }

  console.log(`Done! Inserted ${inserted}/${seedFacts.length} facts.`);
}

seed().catch(console.error);
