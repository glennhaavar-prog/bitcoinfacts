import type { Fact, FactCategory } from "@/lib/types";

export const factCategories: FactCategory[] = [
  {
    id: "energy",
    name: "Energy & Sustainability",
    nameNo: "Energi & bærekraft",
    icon: "⚡",
    description: "Facts about Bitcoin mining's energy use and sustainability profile",
    descriptionNo: "Fakta om Bitcoin-minings energibruk og bærekraftsprofil",
  },
  {
    id: "environment",
    name: "Environmental Benefits",
    nameNo: "Miljøfordeler",
    icon: "🌱",
    description: "How Bitcoin mining benefits the environment through methane mitigation and more",
    descriptionNo: "Hvordan Bitcoin-mining gagner miljøet gjennom metanreduksjon og mer",
  },
  {
    id: "grid",
    name: "Grid & Flexibility",
    nameNo: "Strømnett & fleksibilitet",
    icon: "🔌",
    description: "Bitcoin mining's role in stabilizing power grids",
    descriptionNo: "Bitcoin-minings rolle i å stabilisere strømnett",
  },
  {
    id: "price",
    name: "Electricity Prices",
    nameNo: "Strømpriser",
    icon: "💰",
    description: "Evidence on Bitcoin mining's impact on electricity prices",
    descriptionNo: "Bevis på Bitcoin-minings påvirkning på strømpriser",
  },
  {
    id: "adoption",
    name: "Adoption & Social Impact",
    nameNo: "Adopsjon & sosial påvirkning",
    icon: "🌍",
    description: "Bitcoin's growing adoption and social benefits worldwide",
    descriptionNo: "Bitcoins voksende adopsjon og sosiale fordeler verden over",
  },
  {
    id: "academic",
    name: "Academic Support",
    nameNo: "Akademisk støtte",
    icon: "📚",
    description: "Peer-reviewed research supporting Bitcoin mining's benefits",
    descriptionNo: "Fagfellevurdert forskning som støtter Bitcoin-minings fordeler",
  },
  {
    id: "myths",
    name: "Common Myths",
    nameNo: "Vanlige myter",
    icon: "🔍",
    description: "Debunking the most persistent Bitcoin myths",
    descriptionNo: "Avlivning av de mest hardnakkede Bitcoin-mytene",
  },
  {
    id: "ewaste",
    name: "E-Waste & Hardware",
    nameNo: "E-avfall & maskinvare",
    icon: "♻️",
    description: "Facts about Bitcoin mining e-waste, ASIC lifespan, and recycling",
    descriptionNo: "Fakta om Bitcoin-minings e-avfall, ASIC-levetid og resirkulering",
  },
  {
    id: "water",
    name: "Water Usage",
    nameNo: "Vannforbruk",
    icon: "💧",
    description: "Evidence about Bitcoin mining water usage and comparisons",
    descriptionNo: "Bevis om Bitcoin-minings vannforbruk og sammenligninger",
  },
  {
    id: "methane",
    name: "Methane Mitigation",
    nameNo: "Metanreduksjon",
    icon: "🔥",
    description: "How Bitcoin mining captures methane and paves the way to carbon neutrality",
    descriptionNo: "Hvordan Bitcoin-mining fanger metan og baner vei mot karbonnøytralitet",
  },
];

export const facts: Fact[] = [
  // Energy & Sustainability
  {
    id: "energy-1",
    category: "energy",
    claim: "Bitcoin uses too much energy / as much energy as whole countries",
    claimNo: "Bitcoin bruker for mye energi / like mye energi som hele land",
    reality:
      "Cambridge University states that comparing industries to countries is not meaningful and is an example of 'presenter bias'. The consensus within environmental science focuses on transforming the energy system, not reducing total energy use. Bitcoin mining, precisely because of its high flexible energy use, offers decarbonization benefits including grid stabilization, methane mitigation, and accelerating renewable energy transition.",
    realityNo:
      "Cambridge University sier at å sammenligne industrier med land ikke er meningsfullt og er et eksempel på 'presentasjonsskjevhet'. Konsensus innen miljøvitenskap fokuserer på å transformere energisystemet, ikke redusere total energibruk. Bitcoin-mining, nettopp på grunn av sitt høye fleksible energiforbruk, tilbyr dekarboniseringsfordeler inkludert nettstabilisering, metanreduksjon og akselerasjon av fornybar energiovergang.",
    source: "Cambridge University CBECI",
    sourceUrl: "https://ccaf.io/cbnsi/cbeci/comparisons",
    date: "2025",
    tip: "Lead with the Cambridge quote about presenter bias. Then pivot to the 7 questions framework for evaluating energy use.",
    tipNo: "Led med Cambridge-sitatet om presentasjonsskjevhet. Drei deretter til rammeverket med 7 spørsmål for å evaluere energibruk.",
  },
  {
    id: "energy-2",
    category: "energy",
    claim: "Bitcoin's carbon footprint is very high",
    claimNo: "Bitcoins karbonfotavtrykk er veldig høyt",
    reality:
      "Bitcoin mining is the only global industry with robust third-party data showing it has crossed the 50% sustainable energy threshold (52.4% per Cambridge April 2025). Like EVs, Bitcoin mining has no direct emissions — only scope-2 emissions from electricity. Cambridge data attributes ~39.8 MtCO2e, solely from electricity usage. The banking sector it obviates has higher emission intensity.",
    realityNo:
      "Bitcoin-mining er den eneste globale industrien med robust tredjepartsdata som viser at den har krysset terskelen på 50 % bærekraftig energi (52,4 % ifølge Cambridge april 2025). Som elbiler har Bitcoin-mining ingen direkte utslipp — kun scope 2-utslipp fra strømforbruk. Cambridge tilskriver ~39,8 MtCO2e, utelukkende fra strømforbruk. Banksektoren den erstatter har høyere utslippsintensitet.",
    source: "Cambridge University Bitcoin Mining Report, April 2025",
    sourceUrl: "https://ccaf.io/cbnsi/cbeci",
    date: "April 2025",
    tip: "Use the EV analogy: 'Saying Bitcoin has a high carbon footprint is like saying EVs have a high carbon footprint — materially misleading.'",
    tipNo: "Bruk elbil-analogien: 'Å si at Bitcoin har et høyt karbonfotavtrykk er som å si at elbiler har et høyt karbonfotavtrykk — vesentlig villedende.'",
  },
  {
    id: "energy-3",
    category: "energy",
    claim: "Most Bitcoin mining uses fossil fuels / coal",
    claimNo: "Mesteparten av Bitcoin-mining bruker fossilt brensel / kull",
    reality:
      "This was true before the China mining ban but is now 56.5% sustainable energy. Bloomberg Intelligence switched from the Cambridge model to Daniel Batten's open-source BEEST model, stating it 'appears to be more accurate'. Hydro has overtaken coal as the major power source. Cambridge's earlier model omitted off-grid mining (30% of network, 79% sustainable).",
    realityNo:
      "Dette var sant før Kinas forbud mot mining, men nå er 56,5 % bærekraftig energi. Bloomberg Intelligence byttet fra Cambridge-modellen til Daniel Battens åpen kildekode BEEST-modell og sa den 'ser ut til å være mer nøyaktig'. Vannkraft har overtatt kull som hovedstrømkilde. Cambridges tidligere modell utelot off-grid mining (30 % av nettverket, 79 % bærekraftig).",
    source: "WooCharts ESG Bitcoin Mining Sustainability Tracker",
    sourceUrl: "https://woocharts.com/esg-bitcoin-mining-sustainability/",
    date: "2025",
    tip: "Point out the data is dynamic — using a 3-year-old dataset is like predicting an election from a 3-year-old poll.",
    tipNo: "Påpek at dataene er dynamiske — å bruke et 3 år gammelt datasett er som å forutsi et valg basert på en 3 år gammel meningsmåling.",
  },
  // Environmental Benefits
  {
    id: "env-1",
    category: "environment",
    claim: "Proof of Stake is better for the environment than Proof of Work",
    claimNo: "Proof of Stake er bedre for miljøet enn Proof of Work",
    reality:
      "Bitcoin's PoW uses more energy than PoS, but claiming this makes PoS more environmentally friendly conflates energy use with harm. Bitcoin's Proof of Work enables methane mitigation, grid stabilization, increased renewable capacity, and clean microgrid development — all proven in peer-reviewed research. Ethereum lost these capabilities when moving to PoS. Cambridge estimates Bitcoin pays off 5.5% of its annual carbon debt through methane mitigation alone.",
    realityNo:
      "Bitcoins PoW bruker mer energi enn PoS, men å hevde at dette gjør PoS mer miljøvennlig forveksler energibruk med skade. Bitcoins Proof of Work muliggjør metanreduksjon, nettstabilisering, økt fornybar kapasitet og ren mikronettutvikling — alt bevist i fagfellevurdert forskning. Ethereum mistet disse egenskapene da de gikk over til PoS. Cambridge anslår at Bitcoin betaler ned 5,5 % av sin årlige karbongjeld gjennom metanreduksjon alene.",
    source: "Cambridge University; 22 peer-reviewed papers",
    date: "2025",
    tip: "The lobotomy analogy works well: 'Suggesting Bitcoin move to PoS to save energy is like suggesting a child get a lobotomy to curb their energy levels.'",
    tipNo: "Lobotomi-analogien fungerer godt: 'Å foreslå at Bitcoin bør gå over til PoS for å spare energi er som å foreslå at et barn får lobotomi for å dempe energinivået.'",
  },
  {
    id: "env-2",
    category: "environment",
    claim: "Bitcoin mining wastes energy",
    claimNo: "Bitcoin-mining sløser med energi",
    reality:
      "Significant peer-reviewed literature shows Bitcoin mining prevents waste of renewable energy. Moghimi et al found that integrating Bitcoin mining into microgrids prevented almost all energy waste while decreasing operating costs by 46.5%. Lai and You found Bitcoin mining achieved up to 98% and 92% utilization of available solar and wind power respectively. There are 19 documented environmental and humanitarian uses of Bitcoin.",
    realityNo:
      "Betydelig fagfellevurdert litteratur viser at Bitcoin-mining forhindrer sløsing av fornybar energi. Moghimi et al fant at integrering av Bitcoin-mining i mikronett forhindret nesten alt energisvinn og reduserte driftskostnader med 46,5 %. Lai og You fant at Bitcoin-mining oppnådde opptil 98 % og 92 % utnyttelse av tilgjengelig sol- og vindkraft. Det finnes 19 dokumenterte miljø- og humanitære bruksområder for Bitcoin.",
    source: "Moghimi et al; Lai & You (Cornell University)",
    date: "2023-2024",
    tip: "'Wasting energy' is a value judgment. Ask: can you really claim energy is wasted if it produces 19 documented social and environmental benefits?",
    tipNo: "'Å sløse med energi' er en verdivurdering. Spør: kan du virkelig hevde at energi sløses hvis det produserer 19 dokumenterte sosiale og miljømessige fordeler?",
  },
  {
    id: "env-3",
    category: "environment",
    claim: "You could use landfill gas for things other than Bitcoin mining",
    claimNo: "Man kunne brukt deponigas til andre ting enn Bitcoin-mining",
    reality:
      "While technically true, it's economically infeasible. Nuno Barbosa, CEO of Unicarbo (world expert on LFGTE and LFG Carbon Credits) stated: '50% of the world's landfills have no option to sell their power back to the grid, but if they had an onsite customer, that would change everything.' EV charging stations and biogas refineries seldom pencil out economically without subsidies. Bitcoin mining's ~80% electricity cost creates a unique economic incentive.",
    realityNo:
      "Selv om det er teknisk sant, er det økonomisk ugjennomførbart. Nuno Barbosa, CEO i Unicarbo (verdensekspert på LFGTE og LFG-karbonkreditter) sa: '50 % av verdens deponier har ingen mulighet til å selge strømmen tilbake til nettet, men hvis de hadde en kunde på stedet, ville det endre alt.' Elbilladere og biogassraffinerier er sjelden økonomisk lønnsomme uten subsidier.",
    source: "Nuno Barbosa, CEO Unicarbo",
    date: "2024",
    tip: "Use the space elevator analogy: technically possible, economically infeasible. Bitcoin mining is uniquely positioned because ~80% of costs are electricity.",
    tipNo: "Bruk romheis-analogien: teknisk mulig, økonomisk ugjennomførbart. Bitcoin-mining er unikt posisjonert fordi ~80 % av kostnadene er strøm.",
  },
  // Grid & Flexibility
  {
    id: "grid-1",
    category: "grid",
    claim: "Bitcoin mining destabilizes grids",
    claimNo: "Bitcoin-mining destabiliserer strømnett",
    reality:
      "A growing body of independent research shows Bitcoin mining stabilizes grids due to its flexible, modular, and interruptible nature. Duke University concluded that Controllable Load Resources (Bitcoin mining) stabilize grids and defer expensive upgrades. On the ERCOT grid, Bitcoin mining provides near-daily stabilization through Frequency Regulation and Demand Response. Over a multi-year period, large-scale grid stabilization events significantly outnumber destabilization events.",
    realityNo:
      "En voksende mengde uavhengig forskning viser at Bitcoin-mining stabiliserer strømnett på grunn av sin fleksible, modulære og avbrytbare natur. Duke University konkluderte med at Kontrollerbare Lastressurser (Bitcoin-mining) stabiliserer nett og utsetter kostbare oppgraderinger. På ERCOT-nettet gir Bitcoin-mining daglig stabilisering gjennom frekvensregulering og etterspørselsrespons.",
    source: "Duke University; Lai et al; Ibañez et al; Menati et al; ERCOT",
    date: "2023-2025",
    tip: "Quote Brad Jones (former ERCOT CEO): Bitcoin miners 'found a way to take excess wind in offpeak periods' and 'quickly respond to frequency disruption.'",
    tipNo: "Sitér Brad Jones (tidl. ERCOT-sjef): Bitcoin-minere 'fant en måte å ta overskuddswind i lavsesong' og 'raskt reagere på frekvensforstyrelser.'",
  },
  {
    id: "grid-2",
    category: "grid",
    claim: "Bitcoin mining takes renewable energy from other users",
    claimNo: "Bitcoin-mining tar fornybar energi fra andre brukere",
    reality:
      "Not supported by evidence. Bitcoin mining is a 'non-rival energy user' — it powers down when prices spike (when others need power). Brad Jones (former ERCOT CEO) confirmed this. Meanwhile, Gridless in Africa delivered renewable energy to four villages (~28,000 people), and in Ethiopia, Bitcoin mining accelerated building transmission lines to rural communities. Much of the energy Bitcoin mining uses is stranded and unable to be utilized by others.",
    realityNo:
      "Ikke støttet av bevis. Bitcoin-mining er en 'ikke-rivaliserende energibruker' — den slår seg av når prisene stiger (når andre trenger strøm). Brad Jones (tidl. ERCOT-sjef) bekreftet dette. Gridless i Afrika leverte fornybar energi til fire landsbyer (~28 000 mennesker), og i Etiopia akselererte Bitcoin-mining bygging av kraftlinjer til landlige samfunn.",
    source: "ERCOT; Gridless; EEP data (Ethiopia)",
    date: "2024",
    tip: "The crumbs analogy: 'Saying Bitcoin takes energy from others is like saying taking crumbs eaten by ants each year could feed a nation.'",
    tipNo: "Smuler-analogien: 'Å si at Bitcoin tar energi fra andre er som å si at smulene maur spiser hvert år kunne mettet en nasjon.'",
  },
  // Electricity Prices
  {
    id: "price-1",
    category: "price",
    claim: "Consumers pay more for electricity because of Bitcoin miners",
    claimNo: "Forbrukere betaler mer for strøm på grunn av Bitcoin-minere",
    reality:
      "Between 2021-2024, Texas electricity costs rose 23.8% (7.0% inflation-adjusted) — actually slightly LESS than the US average of 24.67% (7.7% adjusted), despite having the highest concentration of Bitcoin mining. Brad Jones stated Bitcoin mining 'helped keep the cost of electricity low for all Texans.' Norway saw prices jump 20% AFTER a Bitcoin mining operation left. In Kenya, adding Bitcoin mining dropped power costs from 35 to 25 cents/kWh (29% reduction).",
    realityNo:
      "Mellom 2021-2024 steg strømkostnadene i Texas med 23,8 % (7,0 % inflasjonsjustert) — faktisk litt MINDRE enn gjennomsnittet i USA på 24,67 % (7,7 % justert), til tross for høyeste konsentrasjon av Bitcoin-mining. Brad Jones sa at Bitcoin-mining 'hjalp med å holde strømprisen lav for alle texanere.' Norge opplevde at prisene hoppet 20 % ETTER at en Bitcoin-mining-operasjon forlot nettet. I Kenya falt strømprisen fra 35 til 25 cent/kWh (29 % reduksjon) etter Bitcoin-mining ble lagt til.",
    source: "ERCOT; US EIA data; CNBC (Kenya); Norwegian grid data",
    date: "2024",
    tip: "The Norway and Kenya examples are powerful because they show the direct, measurable impact of Bitcoin mining leaving or joining a grid.",
    tipNo: "Norge- og Kenya-eksemplene er kraftige fordi de viser den direkte, målbare effekten av at Bitcoin-mining forlater eller kommer på et nett.",
  },
  {
    id: "price-2",
    category: "price",
    claim: "Bitcoin mining forces grid operators to build expensive infrastructure",
    claimNo: "Bitcoin-mining tvinger nettoperatører til å bygge dyr infrastruktur",
    reality:
      "The opposite is true. In Texas, ERCOT used Bitcoin miners as flexible load instead of building $18 billion worth of gas peaker plants. Bitcoin miners can power down in 500 milliseconds and sustain reduced consumption for days, replacing the need for backup generation. A Duke University study showed Bitcoin mining helps grid operators defer or avoid cost-prohibitive grid upgrade costs.",
    realityNo:
      "Det motsatte er sant. I Texas brukte ERCOT Bitcoin-minere som fleksibel last i stedet for å bygge gasskraftverk til 18 milliarder dollar. Bitcoin-minere kan slå seg av på 500 millisekunder og opprettholde redusert forbruk i dager, noe som erstatter behovet for reserve-generering. En Duke University-studie viste at Bitcoin-mining hjelper nettoperatører med å utsette eller unngå kostbare nettoppgraderinger.",
    source: "Digital Assets Research Institute; Duke University",
    date: "2024-2025",
    tip: "The highway analogy: Bitcoin mining 'permanently opens an extra lane, uses it at offpeak, and frees it at onpeak by taking the nearest offramp.'",
    tipNo: "Motorvei-analogien: Bitcoin-mining 'åpner permanent et ekstra felt, bruker det i lavsesong, og frigjør det i høysesong ved å ta nærmeste avkjøring.'",
  },
  // Adoption & Social Impact
  {
    id: "social-1",
    category: "adoption",
    claim: "Bitcoin has no real-world use",
    claimNo: "Bitcoin har ingen bruk i den virkelige verden",
    reality:
      "There are 19 documented environmental and humanitarian uses of Bitcoin. Gridless provides renewable energy access to ~28,000 people across four African villages. Bitcoin mining has accelerated rural electrification in Ethiopia. Bitcoin enables censorship-resistant remittances for people under authoritarian regimes. It provides financial access to the 1.4 billion unbanked adults worldwide.",
    realityNo:
      "Det finnes 19 dokumenterte miljø- og humanitære bruksområder for Bitcoin. Gridless gir tilgang til fornybar energi for ~28 000 mennesker i fire afrikanske landsbyer. Bitcoin-mining har akselerert elektrifisering av landlige områder i Etiopia. Bitcoin muliggjør sensurresistente pengeoverføringer for folk under autoritære regimer. Det gir finansiell tilgang til 1,4 milliarder voksne uten banktilgang verden over.",
    source: "Gridless; HRF; World Bank",
    date: "2024",
    tip: "Ask: 'Are you aware of the 19 documented social and environmental uses?' Most people aren't — this opens genuine curiosity.",
    tipNo: "Spør: 'Er du klar over de 19 dokumenterte sosiale og miljømessige bruksområdene?' De fleste er ikke det — dette åpner genuin nysgjerrighet.",
  },
  // Academic Support
  {
    id: "academic-1",
    category: "academic",
    claim: "There's no scientific support for Bitcoin mining's benefits",
    claimNo: "Det finnes ingen vitenskapelig støtte for Bitcoin-minings fordeler",
    reality:
      "There are now 22+ peer-reviewed papers documenting Bitcoin mining's environmental benefits. 9 papers concluded Bitcoin mining accelerates the green energy transition. One showed it cuts the payback period of solar farms in half. Cambridge University's April 2025 report (gold standard for regulators) showed 52.4% sustainable energy. The work of critic Alex de Vries was comprehensively debunked by Sai and Vranken (2023) for systemic methodological flaws.",
    realityNo:
      "Det finnes nå over 22 fagfellevurderte artikler som dokumenterer Bitcoin-minings miljøfordeler. 9 artikler konkluderte med at Bitcoin-mining akselererer den grønne energiomstillingen. Én viste at det halverer tilbakebetalingstiden for solcelleparker. Cambridge Universitys rapport fra april 2025 (gullstandarden for regulatorer) viste 52,4 % bærekraftig energi. Arbeidet til kritikeren Alex de Vries ble grundig tilbakevist av Sai og Vranken (2023) for systematiske metodologiske feil.",
    source: "Sai & Vranken 2023; Cambridge April 2025; Lai et al; Cornell University",
    date: "2023-2025",
    tip: "The media tide has turned: 22 publications including BBC, WSJ, Bloomberg have run stories on Bitcoin mining's environmental benefits.",
    tipNo: "Medietiden har snudd: 22 publikasjoner inkludert BBC, WSJ, Bloomberg har kjørt saker om Bitcoin-minings miljøfordeler.",
  },
  {
    id: "academic-2",
    category: "academic",
    claim: "Bitcoin uses a lot of energy/water/eWaste per transaction",
    claimNo: "Bitcoin bruker mye energi/vann/e-avfall per transaksjon",
    reality:
      "Dismissed in four peer-reviewed studies (Masanet et al 2019; Dittmar et al 2019; Sedlmeir et al 2020; Sai & Vranken 2023) and by Cambridge University. Bitcoin's resource use does not come from its transactions — the network can scale transaction volume without increasing resource use. De Vries' eWaste estimates were overestimated by 1204% according to Cambridge 2025 (2.3 kT actual vs 30 kT claimed).",
    realityNo:
      "Avvist i fire fagfellevurderte studier (Masanet et al 2019; Dittmar et al 2019; Sedlmeir et al 2020; Sai & Vranken 2023) og av Cambridge University. Bitcoins ressursbruk kommer ikke fra transaksjonene — nettverket kan skalere transaksjonsvolum uten å øke ressursbruken. De Vries' e-avfallsestimater var overestimert med 1204 % ifølge Cambridge 2025 (2,3 kT faktisk vs 30 kT hevdet).",
    source: "Cambridge University; Masanet et al; Sai & Vranken",
    date: "2019-2025",
    tip: "Use the car radio analogy: measuring emissions per song played is as meaningless as emissions per Bitcoin transaction. Both are unrelated to the activity.",
    tipNo: "Bruk bilradio-analogien: å måle utslipp per sang spilt er like meningsløst som utslipp per Bitcoin-transaksjon. Begge er urelatert til aktiviteten.",
  },
  // Common Myths
  {
    id: "myth-1",
    category: "myths",
    claim: "Bitcoin mining reopened mothballed fossil fuel plants",
    claimNo: "Bitcoin-mining gjenåpnet nedlagte fossile kraftverk",
    reality:
      "There are only 2 examples cited: Greenidge (Lake Seneca gas plant) and a Hardin, Montana coal factory. No Bitcoin mining currently occurs on resurrected fossil fuel plants. Greenidge was restarted to supply power to the grid (not for mining) — SEC filings confirm this. The Montana coal facility was fully migrated to a Texas wind farm by Marathon Digital in late 2022.",
    realityNo:
      "Det finnes bare 2 eksempler som siteres: Greenidge (Lake Seneca gasskraftverk) og en kullfabrikk i Hardin, Montana. Ingen Bitcoin-mining foregår for tiden på gjenoppstartede fossile kraftverk. Greenidge ble startet opp igjen for å levere strøm til nettet (ikke for mining) — SEC-innleveringer bekrefter dette. Montana-kullanlegget ble fullstendig migrert til en vindpark i Texas av Marathon Digital i slutten av 2022.",
    source: "SEC filings; Marathon Digital Holdings (Fred Thiel, AIM Conference Dec 2022)",
    date: "2022",
    tip: "Simple reframe: 'Name one currently operating Bitcoin mine on a resurrected fossil fuel plant. There are zero.'",
    tipNo: "Enkel omformulering: 'Nevn én Bitcoin-mine som opererer på et gjenoppstartet fossilt kraftverk. Det er null.'",
  },
  {
    id: "myth-2",
    category: "myths",
    claim: "Bitcoin is a Ponzi scheme / has no intrinsic value",
    claimNo: "Bitcoin er et Ponzi-opplegg / har ingen iboende verdi",
    reality:
      "A Ponzi scheme requires: (1) a central operator who promises returns, (2) using new investor money to pay existing investors, (3) no actual product or service. Bitcoin has none of these — it's a decentralized protocol with no central operator, no promised returns, and provides real utility: censorship-resistant value transfer, store of value, and 19 documented environmental/humanitarian applications.",
    realityNo:
      "Et Ponzi-opplegg krever: (1) en sentral operatør som lover avkastning, (2) bruk av nye investorpenger til å betale eksisterende investorer, (3) ingen faktisk produkt eller tjeneste. Bitcoin har ingen av disse — det er en desentralisert protokoll uten sentral operatør, ingen lovede avkastninger, og gir reell nytte: sensurresistent verdioverføring, verdioppbevaring, og 19 dokumenterte miljø-/humanitære applikasjoner.",
    source: "SEC (Ponzi definition); Bitcoin whitepaper",
    date: "2008-present",
    tip: "Don't get defensive. Calmly walk through the Ponzi definition and show how Bitcoin fails every criterion. Then mention real-world uses.",
    tipNo: "Ikke bli defensiv. Gå rolig gjennom Ponzi-definisjonen og vis hvordan Bitcoin feiler hvert kriterium. Nevn deretter virkelige bruksområder.",
  },
  {
    id: "myth-3",
    category: "myths",
    claim: "Bitcoin is mainly used by criminals",
    claimNo: "Bitcoin brukes hovedsakelig av kriminelle",
    reality:
      "Chainalysis data shows illicit activity accounts for less than 0.34% of all cryptocurrency transaction volume (2023). The UN estimates 2-5% of global GDP ($800B-$2T) is laundered through traditional banking annually. Bitcoin's transparent, immutable blockchain actually makes it a poor choice for criminals — every transaction is permanently recorded and traceable.",
    realityNo:
      "Chainalysis-data viser at ulovlig aktivitet utgjør mindre enn 0,34 % av alt kryptovalutatransaksjonsvolum (2023). FN anslår at 2-5 % av globalt BNP ($800 mrd-$2 bill) hvitvaskes gjennom tradisjonell bankvirksomhet årlig. Bitcoins transparente, uforanderlige blokkjede gjør den faktisk til et dårlig valg for kriminelle — hver transaksjon er permanent registrert og sporbar.",
    source: "Chainalysis 2024 Crypto Crime Report; UN Office on Drugs and Crime",
    date: "2024",
    tip: "180° reframe: Bitcoin's blockchain is the most transparent financial system ever created. That's why law enforcement increasingly prefers catching criminals who use crypto.",
    tipNo: "180°-omformulering: Bitcoins blokkjede er det mest transparente finanssystemet som noensinne er laget. Derfor foretrekker rettshåndhevelse i økende grad å ta kriminelle som bruker krypto.",
  },
  // E-Waste & Hardware (DARI source)
  {
    id: "ewaste-1",
    category: "ewaste",
    claim: "Bitcoin mining generates enormous amounts of e-waste",
    claimNo: "Bitcoin-mining genererer enorme mengder e-avfall",
    reality:
      "Cambridge's 2025 report found actual Bitcoin e-waste at ~2.3 kilotonnes in 2024 — only 7% of de Vries' projected levels (~30,000 tonnes annually predicted). Nearly 90% of mining ASICs are recycled, sold, or repurposed. ASIC lifespans are 5-8 years, not 1-2 years as critics claimed.",
    realityNo:
      "Cambridge 2025-rapport fant faktisk Bitcoin e-avfall på ~2,3 kilotonn i 2024 — bare 7 % av de Vries' anslåtte nivåer (~30 000 tonn årlig). Nesten 90 % av mining-ASICs resirkuleres, selges eller gjenbrukes. ASIC-levetider er 5-8 år, ikke 1-2 år som kritikere hevdet.",
    source: "Cambridge Centre for Alternative Finance (2025); DA-RI",
    sourceUrl: "https://www.da-ri.org/",
    date: "2025",
    tip: "The predicted e-waste crisis? Actual waste was 93% lower than what the most-cited critic predicted. 90% of miners are recycled or repurposed.",
    tipNo: "Den spådde e-avfallskrisen? Faktisk avfall var 93 % lavere enn hva den mest siterte kritikeren spådde. 90 % av minere resirkuleres eller gjenbrukes.",
  },
  // Water Usage (DARI source)
  {
    id: "water-1",
    category: "water",
    claim: "Each Bitcoin transaction uses thousands of liters of water",
    claimNo: "Hver Bitcoin-transaksjon bruker tusenvis av liter vann",
    reality:
      "Cambridge University itself states measuring resources 'per transaction' is 'not a meaningful metric in PoW blockchains.' A single blockchain transaction can contain 'many thousands of payments.' Bitcoin mining uses 0.0006% of the water a typical gold mine uses. Most water attributed to mining is cooling water returned to the source.",
    realityNo:
      "Cambridge University sier selv at å måle ressurser 'per transaksjon' er 'ikke en meningsfull metrikk i PoW-blokkjeder.' En enkelt blokkjedetransaksjon kan inneholde 'mange tusen betalinger.' Bitcoin-mining bruker 0,0006 % av vannet en typisk gullgruve bruker. Mesteparten av vannet tilskrevet mining er kjølevann som returneres til kilden.",
    source: "Cambridge University CCAF; Marathon Digital Holdings; DA-RI",
    sourceUrl: "https://www.da-ri.org/",
    date: "2024",
    tip: "Cambridge — the source critics love to cite — said themselves that per-transaction metrics are 'not meaningful.'",
    tipNo: "Cambridge — kilden kritikere elsker å sitere — sa selv at per-transaksjon-metrikker er 'ikke meningsfulle'.",
  },
  // Methane Mitigation (DARI source)
  {
    id: "methane-1",
    category: "methane",
    claim: "The Bitcoin network can never become carbon neutral",
    claimNo: "Bitcoin-nettverket kan aldri bli karbonnøytralt",
    reality:
      "291.9 MW of power from methane (vented) sources would make the entire Bitcoin network carbon-neutral — approximately 35 mid-sized landfills. Investment required: ~$421 million. Bitcoin miners already offset ~6% of network emissions through methane capture. The network is projected to reach carbon-negativity by 2027.",
    realityNo:
      "291,9 MW kraft fra metan (ventilerte) kilder ville gjort hele Bitcoin-nettverket karbonnøytralt — omtrent 35 mellomstore søppelfyllinger. Investering nødvendig: ~421 millioner dollar. Bitcoin-minere kompenserer allerede ~6 % av nettverkets utslipp gjennom metanfangst. Nettverket er anslått å nå karbonnegativitet innen 2027.",
    source: "DA-RI original research; BEEST model",
    sourceUrl: "https://www.da-ri.org/",
    date: "2023",
    tip: "35 landfills. That's all it takes to make the entire Bitcoin network carbon-neutral. Not 35,000. Not 350. Just 35.",
    tipNo: "35 søppelfyllinger. Det er alt som trengs for å gjøre hele Bitcoin-nettverket karbonnøytralt. Ikke 35 000. Ikke 350. Bare 35.",
  },
  // Additional DARI: Industry comparison
  {
    id: "energy-4",
    category: "energy",
    claim: "Bitcoin mining is among the least sustainable industries",
    claimNo: "Bitcoin-mining er blant de minst bærekraftige industriene",
    reality:
      "Bitcoin mining (52.6% sustainable) ranks highest among all industries compared. Rankings: Bitcoin Mining 52.6%, Banking 39.2%, Industrial 32%, Agriculture 19.5%, Gold 12.8%, Iron & Steel 9.8%. Bitcoin is decarbonizing at 4.49% per year vs industrial sector's 0.4%.",
    realityNo:
      "Bitcoin-mining (52,6 % bærekraftig) rangerer høyest blant alle sammenlignede industrier. Rangering: Bitcoin 52,6 %, Bank 39,2 %, Industri 32 %, Landbruk 19,5 %, Gull 12,8 %, Jern & Stål 9,8 %. Bitcoin avkarboniserer med 4,49 % per år vs industrisektorens 0,4 %.",
    source: "DA-RI analysis using IEA, Our World in Data",
    sourceUrl: "https://www.da-ri.org/",
    date: "2023",
    tip: "Bitcoin mining uses more sustainable energy than banking, industry, gold mining, agriculture, and steel. It's literally the greenest major industry.",
    tipNo: "Bitcoin-mining bruker mer bærekraftig energi enn bank, industri, gullgruvedrift, landbruk og stål. Det er bokstavelig talt den grønneste store industrien.",
  },
  // Additional DARI: Refugees & humanitarian
  {
    id: "adoption-2",
    category: "adoption",
    claim: "Bitcoin is only for wealthy speculators in Western countries",
    claimNo: "Bitcoin er bare for rike spekulanter i vestlige land",
    reality:
      "At least 329,000 displaced people have relied on Bitcoin for financial continuity. 5.7 billion people live under autocratic regimes — 9 of top 10 Bitcoin-adopting nations are autocratic. 2 billion people are unbanked (55% women, 90% people of color). 10.97 million Afghan women are legally prohibited from bank accounts.",
    realityNo:
      "Minst 329 000 fordrevne mennesker har vært avhengige av Bitcoin for finansiell kontinuitet. 5,7 milliarder mennesker lever under autokratiske regimer — 9 av de 10 største Bitcoin-adopsjonsnasjonene er autokratiske. 2 milliarder er uten banktilgang (55 % kvinner, 90 % ikke-hvite). 10,97 millioner afghanske kvinner er juridisk forhindret fra å ha bankkonto.",
    source: "DA-RI / Dr. Simon Collins; World Bank; Statista",
    sourceUrl: "https://www.da-ri.org/",
    date: "2025",
    tip: "The people who need Bitcoin most are the ones adopting it fastest — not Silicon Valley speculators, but 5.7 billion people living under autocratic regimes.",
    tipNo: "Menneskene som trenger Bitcoin mest er de som adopterer det raskest — ikke Silicon Valley-spekulanter, men 5,7 milliarder mennesker under autokratiske regimer.",
  },
  // Additional DARI: De Vries debunk
  {
    id: "academic-3",
    category: "academic",
    claim: "Alex de Vries / Digiconomist is a reliable source on Bitcoin energy",
    claimNo: "Alex de Vries / Digiconomist er en pålitelig kilde om Bitcoin-energi",
    reality:
      "De Vries' 2017 model predicted energy usage 2,509x higher than reality. He is affiliated with DNB (Dutch Central Bank), often undisclosed. Wikipedia dropped Digiconomist as a reference source. Cambridge called his per-transaction metric 'not meaningful.' His e-waste predictions were 93% too high.",
    realityNo:
      "De Vries' 2017-modell spådde energibruk 2 509x høyere enn virkeligheten. Han er tilknyttet DNB (den nederlandske sentralbanken), ofte ikke oppgitt. Wikipedia droppet Digiconomist som referansekilde. Cambridge kalte per-transaksjon-metrikken hans 'ikke meningsfull'. E-avfallsspådommene hans var 93 % for høye.",
    source: "DA-RI multiple rebuttals; Cambridge CCAF",
    sourceUrl: "https://www.da-ri.org/",
    date: "2023",
    tip: "The most-cited Bitcoin energy critic works for a central bank, predicted energy usage 2,509 times higher than reality, and even Cambridge said his metric is 'not meaningful.'",
    tipNo: "Den mest siterte Bitcoin-energikritikeren jobber for en sentralbank, spådde energibruk 2 509 ganger høyere enn virkeligheten, og selv Cambridge sa metrikken hans er 'ikke meningsfull'.",
  },
];

export const factsForPrompt = facts
  .map(
    (f) =>
      `### ${f.claim}\n**Reality:** ${f.reality}\n**Source:** ${f.source} (${f.date || ""})\n**How to use:** ${f.tip}`
  )
  .join("\n\n");
