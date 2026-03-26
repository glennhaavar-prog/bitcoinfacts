-- Migration 003: Add new categories and ~38 new facts from DARI + Skill
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- ============================================================
-- STEP 1: Add new categories
-- ============================================================
INSERT INTO categories (slug, name_no, name_en, icon, description_no, description_en, sort_order) VALUES
  ('ewaste', 'E-avfall & maskinvare', 'E-Waste & Hardware', '♻️', 'Fakta om Bitcoin-minings e-avfall, ASIC-levetid og resirkulering', 'Facts about Bitcoin mining e-waste, ASIC lifespan, and recycling', 8),
  ('water', 'Vannforbruk', 'Water Usage', '💧', 'Bevis om Bitcoin-minings vannforbruk og sammenligninger', 'Evidence about Bitcoin mining water usage and comparisons', 9),
  ('methane', 'Metanreduksjon', 'Methane Mitigation', '🔥', 'Hvordan Bitcoin-mining fanger metan og baner vei mot karbonnøytralitet', 'How Bitcoin mining captures methane and paves the way to carbon neutrality', 10)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- STEP 2: Insert new facts (DARI + Skill sources)
-- ============================================================

-- --- ENERGY: BEEST Model & CCAF ---

INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES

-- 1. BEEST vs CCAF
((SELECT id FROM categories WHERE slug = 'energy'), 'published',
'CCAF er den mest nøyaktige kilden for Bitcoin-energidata',
'CCAF is the most accurate source for Bitcoin energy data',
'DA-RIs BEEST-modell fant minimum 52,6 % nullutslippsenergi (midt 2023), stigende til 56,7 % sent 2024. CCAFs septemberrapport 2022 viste bare 37,6 %. Avviket skyldes primært at CCAF utelukker off-grid mining helt.',
'DA-RI''s BEEST model found Bitcoin uses a minimum of 52.6% zero-emission energy (mid-2023), rising to 56.7% by late 2024. CCAF''s September 2022 report showed only 37.6%. The discrepancy is primarily due to CCAF excluding off-grid mining entirely.',
'DA-RI BEEST Model; CCAF September 2022', 'https://www.da-ri.org/', '2024-01-01',
'Verdens mest omfattende mining-database — ikke tilknyttet Bitcoin-selskaper — viser over 56 % bærekraftig energi.',
'The world''s most comprehensive mining database — not affiliated with Bitcoin companies — shows over 56% sustainable energy. The Cambridge model missed this because it excluded all off-grid miners.',
ARRAY['beest', 'ccaf', 'dari', 'energy-mix'], 'high'),

-- 2. Off-grid mining
((SELECT id FROM categories WHERE slug = 'energy'), 'published',
'All Bitcoin-mining er koblet til strømnettet',
'All Bitcoin mining is connected to the power grid',
'28 % av alle Bitcoin-minere opererer off-grid. Av disse drives 78–80 % av bærekraftig energi. 42 betydelige mining-selskaper ble identifisert gjennom 6 måneders feltforskning. Gjennomsnittlig nullutslippsenergi blant off-grid bærekraftige minere: 96,96 %.',
'28% of all Bitcoin miners operate off-grid. Of these, 78-80% are powered by sustainable energy. 42 significant mining companies were identified through 6 months of field research. Average zero-emission energy use among off-grid sustainable miners: 96.96%.',
'DA-RI BEEST Model field research', 'https://www.da-ri.org/', '2023-01-01',
'28 % av alle Bitcoin-minere er helt off-grid — og nesten alle kjører på bærekraftig energi. Cambridge-modellen oversåg hver eneste av dem.',
'28% of all Bitcoin miners are completely off-grid — and nearly all of them run on sustainable energy. Cambridge''s model missed every single one of them.',
ARRAY['off-grid', 'dari', 'beest', 'field-research'], 'high'),

-- 3. CCAF overestimation
((SELECT id FROM categories WHERE slug = 'energy'), 'published',
'Cambridge sine energiestimater er pålitelige',
'Cambridge energy estimates are reliable',
'CCAFs utslippsintensitet var 506,7 g/kWh vs. DA-RIs 299 g/kWh — 69 % overestimering. 31. august 2023 innrømmet Cambridge at de hadde «overvurdert energiforbruket i over to år».',
'CCAF''s emission intensity was 506.7 g/kWh vs. DA-RI''s calculated 299 g/kWh — a 69% overestimate. On August 31, 2023, Cambridge acknowledged "overstating energy consumption for more than two years."',
'DA-RI analysis; Cambridge CCAF admission', 'https://www.da-ri.org/', '2023-08-31',
'Selv Cambridge innrømmet at de overvurderte Bitcoins energiforbruk i over to år.',
'Even Cambridge admitted they overstated Bitcoin''s energy consumption for over two years. Their revised numbers now align with what independent researchers found.',
ARRAY['ccaf', 'overestimate', 'dari', 'emissions'], 'high'),

-- 4. Kazakhstan overrepresentation
((SELECT id FROM categories WHERE slug = 'energy'), 'published',
'Kazakhstan er en stor kilde til Bitcoin-mining og kullkraft',
'Kazakhstan is a major source of Bitcoin mining and coal power',
'CCAF estimerte Kazakhstan til 13,2 % av global hashrate (januar 2022-data). Faktisk hashrate per midt-2023: under 1 %. Å bruke det utdaterte tallet overestimerer utslipp med ~43 %.',
'CCAF estimated Kazakhstan at 13.2% of global hashrate (January 2022 data). Actual hashrate as of mid-2023: under 1%. Using the outdated figure overestimates emissions by ~43%.',
'DA-RI analysis; Bitriver data', 'https://www.da-ri.org/', '2023-06-01',
'Modellen kritikere bruker tildeler 13 % av Bitcoin-mining til kullrike Kazakhstan. Det reelle tallet er under 1 %. Den ene feilen blåser opp utslippsestimatene med 43 %.',
'The model critics use assigns 13% of Bitcoin mining to coal-heavy Kazakhstan. The real figure is under 1%. That single error inflates emission estimates by 43%.',
ARRAY['kazakhstan', 'ccaf', 'dari', 'hashrate'], 'high'),

-- 5. Sustainable energy growth rate
((SELECT id FROM categories WHERE slug = 'energy'), 'published',
'Bitcoin-mining avkarboniserer ikke raskt nok',
'Bitcoin mining is not decarbonizing fast enough',
'Bitcoin-minings bærekraftige energiandel økte med +38 prosentpoeng fra juli 2019 til juni 2023 — raskere enn noen annen industri. Årlig økning: +4,49 % mer nullutslippsenergi per år. Industrisektoren: 0,4 % per år.',
'Bitcoin mining''s sustainable energy share increased by +38 percentage points from July 2019 to June 2023 — faster than any other industry. Annual increase rate: +4.49% more zero-emission power per year. Industrial sector: 0.4% per year.',
'DA-RI BEEST Model; IEA (industrial)', 'https://www.da-ri.org/', '2023-06-01',
'Bitcoin-mining avkarboniserer raskere enn noen annen industri — nesten 5 prosentpoeng med bærekraftig energi per år.',
'Bitcoin mining is decarbonizing faster than any industry on the planet — adding nearly 5 percentage points of sustainable energy per year.',
ARRAY['decarbonization', 'dari', 'growth-rate'], 'high'),

-- 6. Emissions flat despite hashrate growth
((SELECT id FROM categories WHERE slug = 'energy'), 'published',
'Bitcoins utslipp øker med nettverkets vekst',
'Bitcoin emissions grow as the network grows',
'Bitcoins utslipp forble i hovedsak uendret over 4 år til tross for 400 %+ hashrate-vekst. Utslippsintensiteten (per energienhet) ble halvert i denne perioden.',
'Bitcoin''s emissions remained essentially unchanged over 4 years despite 400%+ hashrate growth. Emissions intensity (per unit of energy) halved during this period.',
'DA-RI BEEST Model', 'https://www.da-ri.org/', '2023-01-01',
'Nettverket vokste 4x. Utslippene forble uendret. Effektivitetsgevinster og det grønne energiskiftet absorberte all veksten.',
'The network grew 4x. Emissions didn''t budge. That''s because efficiency gains and the green energy shift absorbed all the growth.',
ARRAY['emissions', 'hashrate', 'dari', 'efficiency'], 'high'),

-- 7. Industry sustainability rankings
((SELECT id FROM categories WHERE slug = 'energy'), 'published',
'Bitcoin-mining er blant de minst bærekraftige industriene',
'Bitcoin mining is among the least sustainable industries',
'Per juni 2023 rangerer Bitcoin-mining (52,6 % bærekraftig) høyest blant alle sammenlignede industrier. Rangering: Bitcoin 52,6 %, Bankvirksomhet 39,2 %, Industri 32 %, Landbruk 19,5 %, Gull 12,8 %, Jern & Stål 9,8 %.',
'As of June 2023, Bitcoin mining (52.6% sustainable) ranks highest among all industries compared. Rankings: Bitcoin Mining 52.6%, Banking 39.2%, Industrial 32%, Agriculture 19.5%, Gold 12.8%, Iron & Steel 9.8%.',
'DA-RI analysis using IEA, Our World in Data', 'https://www.da-ri.org/', '2023-06-01',
'Bitcoin-mining bruker mer bærekraftig energi enn bank, industri, gullgruvedrift, landbruk og stål. Det er bokstavelig talt den grønneste store industrien.',
'Bitcoin mining uses more sustainable energy than banking, industry, gold mining, agriculture, and steel. It''s literally the greenest major industry.',
ARRAY['industry-comparison', 'dari', 'sustainability-ranking'], 'high'),

-- 8. Gold mining comparison
((SELECT id FROM categories WHERE slug = 'energy'), 'published',
'Gullgruvedrift er mer bærekraftig enn Bitcoin-mining',
'Gold mining is more sustainable than Bitcoin mining',
'Gullgruvedrift bruker bare 12,8 % bærekraftig energi totalt, med 67,22 % ikke-elektriske energikilder. Bitcoin-mining bruker over 56 % bærekraftig energi.',
'Gold mining uses only 12.8% sustainable energy overall, with 67.22% non-electrical energy sources. Bitcoin mining uses over 56% sustainable energy.',
'DA-RI analysis of gold industry data', 'https://www.da-ri.org/', '2023-06-01',
'Gullgruvedrift drives 87 % av fossil energi. Bitcoin, dens digitale konkurrent, drives over 56 % bærekraftig.',
'Gold mining is 87% fossil-fuel powered. Bitcoin, its digital competitor, is over 56% sustainable.',
ARRAY['gold', 'dari', 'comparison', 'fossil-fuels'], 'high');

-- --- E-WASTE ---

INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES

-- 9. E-waste myth debunked
((SELECT id FROM categories WHERE slug = 'ewaste'), 'published',
'Bitcoin-mining genererer enorme mengder e-avfall',
'Bitcoin mining generates enormous amounts of e-waste',
'Cambridge 2025-rapport fant faktisk Bitcoin e-avfall på ~2,3 kilotonn i 2024 — bare 7 % av de Vries'' anslåtte nivåer (~30 000 tonn årlig). Nesten 90 % av mining-ASICs resirkuleres, selges eller gjenbrukes.',
'Cambridge''s 2025 report found actual Bitcoin e-waste at ~2.3 kilotonnes in 2024 — only 7% of de Vries'' projected levels (~30,000 tonnes annually predicted). Nearly 90% of mining ASICs are recycled, sold, or repurposed.',
'Cambridge Centre for Alternative Finance (2025); DA-RI', 'https://www.da-ri.org/', '2025-01-01',
'Den spådde e-avfallskrisen? Faktisk avfall var 93 % lavere enn hva den mest siterte kritikeren spådde. 90 % av minere resirkuleres eller gjenbrukes.',
'The predicted e-waste crisis? Actual waste was 93% lower than what the most-cited critic predicted. 90% of miners are recycled or repurposed.',
ARRAY['ewaste', 'dari', 'cambridge', 'de-vries'], 'high'),

-- 10. ASIC lifespan
((SELECT id FROM categories WHERE slug = 'ewaste'), 'published',
'Mining-maskinvare varer bare 1-2 år',
'Mining hardware only lasts 1-2 years',
'De Vries hevdet ASIC-levetider på 1,12–2,15 år. Faktisk: S19-serien brukt i over 5 år. S9-minere brukt omtrent 8 år etter utgivelsen midt i 2016. Mining-rigger brukes nesten tre ganger lenger enn gjennomsnittlige smarttelefoner.',
'De Vries claimed ASIC lifespans of 1.12-2.15 years. Actual: S19 series miners used for over 5 years. S9 miners utilized approximately 8 years after their mid-2016 release. Mining rigs are used nearly three times longer than average smartphones.',
'DA-RI analysis; Cambridge 2025 report', 'https://www.da-ri.org/', '2025-01-01',
'Kritikeren sa mining-maskinvare varer 1 år. Virkeligheten? 5–8 år. Estimatet hans var 346 % feil.',
'The critic said mining hardware lasts 1 year. The reality? 5-8 years. His estimate was off by 346%. And unlike smartphones, miners are profitably recyclable.',
ARRAY['ewaste', 'dari', 'asic', 'lifespan', 'de-vries'], 'high'),

-- 11. Hut8 recycling
((SELECT id FROM categories WHERE slug = 'ewaste'), 'published',
'Mining-maskinvare havner på søppelfyllinga',
'Mining hardware ends up in landfills',
'Hut8 resirkulerte 369 metriske tonn e-avfall på litt over tre uker (november 2023) og genererte 7 500 karbonkreditter gjennom prosessen. Mining-rigger mangler tungmetaller (i motsetning til smarttelefoner) og inneholder resirkulerbare materialer: aluminium, stål, gull, sølv, nikkel.',
'Hut8 recycled 369 metric tonnes of e-waste in just over three weeks (November 2023), generating 7,500 carbon credits. Mining rigs lack heavy metals (unlike smartphones) and contain recyclable materials: aluminum, steel, gold, silver, nickel.',
'Hut8 corporate data; DA-RI', 'https://www.da-ri.org/', '2023-11-01',
'Ett mining-selskap resirkulerte 369 tonn e-avfall på tre uker — og tjente 7 500 karbonkreditter. Dette er ikke avfall — det er sirkulærøkonomi.',
'One mining company recycled 369 tonnes of e-waste in three weeks — and earned 7,500 carbon credits doing it. This isn''t waste — it''s a circular economy.',
ARRAY['ewaste', 'dari', 'hut8', 'recycling', 'carbon-credits'], 'high');

-- --- WATER ---

INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES

-- 12. Per-transaction water metric
((SELECT id FROM categories WHERE slug = 'water'), 'published',
'Hver Bitcoin-transaksjon bruker tusenvis av liter vann',
'Each Bitcoin transaction uses thousands of liters of water',
'Cambridge University sier selv at å måle ressurser «per transaksjon» er «ikke en meningsfull metrikk i PoW-blokkjeder.» En enkelt blokkjedetransaksjon kan inneholde «mange tusen betalinger.» BBC-overskriften overestimerte vannforbruket med minimum faktor 1 000x.',
'Cambridge University itself states measuring resources "per transaction" is "not a meaningful metric in PoW blockchains." A single blockchain transaction can contain "many thousands of payments." The BBC headline overstated water usage by a minimum factor of 1,000x.',
'Cambridge University CCAF (2019); DA-RI rebuttal', 'https://www.da-ri.org/', '2023-12-01',
'Cambridge University — kilden kritikere elsker å sitere — sa selv at per-transaksjon-metrikker er «ikke meningsfulle». Overskriften var feil med minst 1 000x.',
'Cambridge University — the source critics love to cite — said themselves that per-transaction metrics are "not meaningful." The headline was off by at least 1,000x.',
ARRAY['water', 'dari', 'per-transaction', 'cambridge'], 'high'),

-- 13. Water: Bitcoin vs Gold
((SELECT id FROM categories WHERE slug = 'water'), 'published',
'Bitcoin-mining bruker for mye vann',
'Bitcoin mining uses too much water',
'Store Bitcoin-mining-anlegg bruker mindre enn en tredjedel av vannet til en gjennomsnittlig amerikansk husholdning. Mining-forbruk utgjør 0,0006 % av vannet brukt av en typisk gullgruve. Mesteparten av vannet tilskrevet Bitcoin-mining er kjølevann som returneres til kilden.',
'Large Bitcoin mining facilities use less than one-third the water of an average U.S. household. Mining consumption represents 0.0006% of water used by a typical gold mine. Much of the water attributed to Bitcoin mining is cooling water returned to the source.',
'Marathon Digital Holdings (2024); DA-RI rebuttal', 'https://www.da-ri.org/', '2024-01-01',
'Bitcoin-mining bruker 0,0006 % av vannet en gullgruve bruker. Null komma null null null seks prosent.',
'Bitcoin mining uses 0.0006% of the water a gold mine uses. Zero point zero zero zero six percent.',
ARRAY['water', 'dari', 'gold', 'comparison'], 'high');

-- --- METHANE ---

INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES

-- 14. 35 landfills = net zero
((SELECT id FROM categories WHERE slug = 'methane'), 'published',
'Bitcoin-nettverket kan aldri bli karbonnøytralt',
'The Bitcoin network can never become carbon neutral',
'291,9 MW kraft fra metan (ventilerte) kilder ville gjort hele Bitcoin-nettverket karbonnøytralt. Dette tilsvarer omtrent 35 mellomstore søppelfyllinger à 8 MW. Investering nødvendig: ca. 421 millioner dollar.',
'291.9 MW of power from methane (vented) sources would make the entire Bitcoin network carbon-neutral. This equals approximately 35 mid-sized landfills at 8 MW each. Investment required: approximately $421 million.',
'DA-RI original research; BEEST model', 'https://www.da-ri.org/', '2023-05-01',
'35 søppelfyllinger. Det er alt som trengs for å gjøre hele Bitcoin-nettverket karbonnøytralt. Ikke 35 000. Ikke 350. Bare 35.',
'35 landfills. That''s all it takes to make the entire Bitcoin network carbon-neutral. Not 35,000. Not 350. Just 35.',
ARRAY['methane', 'dari', 'landfill', 'carbon-neutral'], 'high'),

-- 15. Vented gas 13x more effective
((SELECT id FROM categories WHERE slug = 'methane'), 'published',
'Det finnes bedre måter å håndtere metanutslipp på',
'There are better ways to handle methane emissions',
'Ventilert gassmitigering via Bitcoin-mining gir 13x høyere karbonmitigering sammenlignet med andre metoder. Forbrenning av ventilert metan reduserer netto CO2-ekvivalente utslipp med 95,8 % (UNFCCC-metodologi).',
'Vented gas mitigation via Bitcoin mining provides 13x higher level of carbon mitigation compared to other methods. Combusting vented methane reduces net CO2-equivalent emissions by 95.8% (UNFCCC methodology).',
'DA-RI calculation using UNFCCC methodology', 'https://www.da-ri.org/', '2023-01-01',
'Ventilert metan er 84x verre enn CO2. Å fange det for Bitcoin-mining eliminerer 95,8 % av oppvarmingseffekten. Ingen annen teknologi gir dette finansielle insentivet.',
'Vented methane is 84x worse than CO2. Capturing it for Bitcoin mining eliminates 95.8% of the warming impact. No other technology provides this financial incentive.',
ARRAY['methane', 'dari', 'vented-gas', 'unfccc'], 'high'),

-- 16. 6% already offset
((SELECT id FROM categories WHERE slug = 'methane'), 'published',
'Bitcoin-minere gjør ingenting for å redusere utslipp',
'Bitcoin miners are doing nothing to reduce emissions',
'Per sent 2023 mitigerer Bitcoin-minere allerede ca. 6 % av nettverkets totale utslipp gjennom metanfangst. Bitcoin er på sporet til å bli karbonnegativ innen 2027 basert på nåværende vekstrater.',
'As of late 2023, Bitcoin miners already mitigate approximately 6% of the network''s total emissions through methane capture. Bitcoin is on track to become carbon-negative by 2027 at current growth rates.',
'DA-RI BEEST Model; ESMA submission', 'https://www.da-ri.org/', '2023-12-01',
'Bitcoin-minere kompenserer allerede 6 % av nettverkets utslipp gjennom metanfangst alene. Og det tallet vokser hvert kvartal.',
'Bitcoin miners already offset 6% of the network''s entire emissions through methane capture alone. And that number is growing every quarter.',
ARRAY['methane', 'dari', 'offset', 'carbon-negative'], 'high'),

-- 17. Flaring efficiency
((SELECT id FROM categories WHERE slug = 'methane'), 'published',
'Gassfakling er en tilstrekkelig løsning for metanutslipp',
'Gas flaring is a sufficient solution for methane emissions',
'Standard gassfakling er bare 92 % effektiv — 8 % av metanet slipper ut. Bitcoin-mining oppnår nær 100 % forbrenning gjennom generatorer/mikroturbiner.',
'Standard gas flaring is only 92% efficient — 8% of methane still escapes. Bitcoin mining achieves near-100% combustion through generators/microturbines.',
'IEA (flaring efficiency); DA-RI analysis', 'https://www.da-ri.org/', '2023-01-01',
'Fakling av gass sløser 8 % av metanet. Mining sløser i praksis null. «Løsningen» er mer sløsende enn Bitcoin-løsningen.',
'Flaring gas wastes 8% of the methane. Mining it wastes essentially zero. The "waste" solution is more wasteful than the Bitcoin solution.',
ARRAY['methane', 'dari', 'flaring', 'efficiency'], 'high');

-- --- GRID (additional DARI facts) ---

INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES

-- 18. Gas peaker plant profile
((SELECT id FROM categories WHERE slug = 'grid'), 'published',
'Gasskraftverk er den beste løsningen for nettkapasitet',
'Gas peaker plants are the best solution for grid capacity',
'Gasskraftverk kjører mindre enn 1 500 timer per år. Noen opererer så lite som 250 timer (2,9 % av året). De har høye oppstarts-/vedlikeholdskostnader og slipper ut 0,4–0,6 tonn CO2 per MWh. Gasskraftverk slipper ut ca. 17 millioner tonn metan årlig — 3 % av verdens totale metanutslipp.',
'Gas peaker plants run less than 1,500 hours per year. Some operate as little as 250 hours (2.9% of the year). They have high setup/maintenance costs and emit 0.4-0.6 tons of CO2 per MWh. Gas plants release approximately 17 million metric tons of methane annually — 3% of the world''s total methane emissions.',
'DA-RI article; industry data', 'https://www.da-ri.org/', '2025-01-01',
'Gasskraftverk står stille 97 % av året, koster milliarder å bygge og forurenser når de kjører. Bitcoin-minere gjør samme jobb — renere, billigere og uten tomgangskostnad.',
'Gas peaker plants sit idle 97% of the year, cost billions to build, and pollute when they run. Bitcoin miners do the same job — but cleaner, cheaper, and with zero idle cost.',
ARRAY['grid', 'dari', 'peaker-plants', 'methane'], 'high'),

-- 19. RIOT demand response
((SELECT id FROM categories WHERE slug = 'grid'), 'published',
'Bitcoin-minere tjener penger på å ikke gjøre noe',
'Bitcoin miners get paid for doing nothing',
'RIOT tjente 7 millioner dollar fra salg av etterspørselsresponstjenester (august 2023) og 24 millioner dollar fra å selge tilbake kjøpt men ubrukt energi. The Economist rapporterte feilaktig at RIOT tjente 32 millioner dollar for å «ikke mine Bitcoin».',
'RIOT earned $7 million from selling demand response services (August 2023) and $24 million from selling back purchased but unused energy. The Economist incorrectly reported RIOT earned $32 million from "not mining Bitcoin."',
'DA-RI rebuttal of The Economist; Yes Energy blog', 'https://www.da-ri.org/', '2023-08-01',
'RIOT tjente ikke penger for «å ikke mine». De tjente penger ved å levere nettjenester — den samme tjenesten gasskraftverk tar milliarder for.',
'RIOT didn''t earn money for "not mining." They earned money by providing grid services — the same service gas peaker plants charge billions for.',
ARRAY['grid', 'dari', 'riot', 'demand-response'], 'high'),

-- 20. Demand response 40 years
((SELECT id FROM categories WHERE slug = 'grid'), 'published',
'Etterspørselsrespons fra Bitcoin-minere er upålitelig',
'Demand response from Bitcoin miners is unreliable',
'Etterspørselsrespons-ordninger har eksistert i over 40 år. Bitcoin-minere gjør det bedre — de kan redusere forbruket med opptil 95 % under toppbelastninger. Shaun Connell (15+ års erfaring med energihandel) kalte Bitcoin-mining «Rolls Royce av etterspørselsrespons».',
'Demand response schemes have existed for more than 40 years. Bitcoin miners do it better — they can reduce consumption by up to 95% during peak demand events. Shaun Connell (15+ years energy trading expertise) called Bitcoin mining "the Rolls Royce of demand response."',
'DA-RI rebuttals; Rio Platforms', 'https://www.da-ri.org/', '2023-01-01',
'Etterspørselsrespons har eksistert i 40 år. Bitcoin-minere gjør det med 95 % reduksjon. Ingen annen industriell last kommer i nærheten.',
'Demand response has been around for 40 years. Bitcoin miners do it at 95% curtailment. No other industrial load comes close.',
ARRAY['grid', 'dari', 'demand-response', 'curtailment'], 'high'),

-- 21. Renewable payback acceleration
((SELECT id FROM categories WHERE slug = 'grid'), 'published',
'Bitcoin-mining konkurrerer med batterilagring om fornybar energi',
'Bitcoin mining competes with battery storage for renewable energy',
'ARK Invest fant at batterilagring og Bitcoin-mining fungerer «synergistisk» — mining «myker opp lønnsomhetskravene for sol». Bitcoin-mining kan redusere tilbakebetalingsperioden for fornybare energiprosjekter ved å fungere som en umiddelbar kjøper av kraft.',
'ARK Invest found battery storage and Bitcoin mining work "synergistically" — mining "softens the profitability requirements of solar." Bitcoin mining can reduce the payback period for renewable energy projects by acting as an immediate buyer of power.',
'ARK Invest (2021); DA-RI', 'https://www.da-ri.org/', '2021-01-01',
'ARK Invest fant at Bitcoin-mining ikke konkurrerer med batterier — de fungerer synergistisk. Mining gjør sol lønnsomt selv før batteriet er installert.',
'ARK Invest found that Bitcoin mining doesn''t compete with batteries — they work together synergistically. Mining makes solar profitable even before the battery is installed.',
ARRAY['grid', 'dari', 'ark-invest', 'solar', 'batteries'], 'high'),

-- 22. Finland home heating
((SELECT id FROM categories WHERE slug = 'grid'), 'published',
'Varmen fra Bitcoin-mining er bortkastet energi',
'Heat from Bitcoin mining is wasted energy',
'Titusenvis av hjem i Finland varmes opp ved hjelp av spillvarme fra Bitcoin-mining, noe som sparer hundretusenvis av tonn klimagasser.',
'Tens of thousands of homes in Finland are heated using Bitcoin mining waste heat, saving hundreds of thousands of tonnes of greenhouse gases.',
'DA-RI Gill et al. rebuttal', 'https://www.da-ri.org/', '2025-01-01',
'I Finland varmer Bitcoin-mining titusenvis av hjem. «Bortkastet» energi fra mining erstatter fossilt oppvarming.',
'In Finland, Bitcoin mining heats tens of thousands of homes. The "waste" energy from mining replaces fossil-fuel heating.',
ARRAY['grid', 'dari', 'finland', 'heat-recycling'], 'high');

-- --- ADOPTION / SOCIAL IMPACT ---

INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES

-- 23. Refugees using Bitcoin
((SELECT id FROM categories WHERE slug = 'adoption'), 'published',
'Bitcoin er bare for rike spekulanter i vestlige land',
'Bitcoin is only for wealthy speculators in Western countries',
'Minst 329 000 fordrevne mennesker har vært avhengige av Bitcoin for finansiell kontinuitet. Anslått å vokse til 7,5 millioner innen 2035. Casestudier fra Ukraina, Gaza og Kongo er dokumentert. 2 milliarder mennesker globalt er uten bankkonto — 55 % er kvinner, 90 % er ikke-hvite.',
'At least 329,000 displaced people have relied on Bitcoin for financial continuity. Projected to grow to 7.5 million by 2035. Case studies from Ukraine, Gaza, and the Congo documented. 2 billion people globally are unbanked — 55% are women, 90% are people of color.',
'DA-RI / Dr. Simon Collins (July 2025); Business Insider', 'https://www.da-ri.org/', '2025-07-01',
'329 000 flyktninger har brukt Bitcoin til å bære formuen sin over grenser. Når du flykter fra landet ditt, er Bitcoin det eneste aktivumet du kan ta med i hodet.',
'329,000 refugees have used Bitcoin to carry their wealth across borders. When you flee your country, Bitcoin is the only asset you can take in your head.',
ARRAY['adoption', 'dari', 'refugees', 'humanitarian', 'unbanked'], 'high'),

-- 24. Autocratic regimes
((SELECT id FROM categories WHERE slug = 'adoption'), 'published',
'Bitcoin-adopsjon drives av spekulasjon, ikke behov',
'Bitcoin adoption is driven by speculation, not need',
'5,7 milliarder mennesker lever under autokratiske eller semi-autokratiske regimer. 9 av de 10 største Bitcoin-adopsjonsnasjonene er autokratiske. 7 av de 10 er fra det globale sør. 10,97 millioner voksne kvinner i Afghanistan er juridisk forhindret fra å åpne bankkontoer.',
'5.7 billion people live under autocratic or semi-autocratic regimes. 9 of the top 10 Bitcoin-adopting nations are autocratic. 7 of the top 10 are from the Global South. 10.97 million adult women in Afghanistan are legally prohibited from opening bank accounts.',
'DA-RI article; World Bank; Statista', 'https://www.da-ri.org/', '2023-01-01',
'Menneskene som trenger Bitcoin mest er de som adopterer det raskest — ikke Silicon Valley-spekulanter, men 5,7 milliarder mennesker under autokratiske regimer.',
'The people who need Bitcoin most are the ones adopting it fastest — not Silicon Valley speculators, but 5.7 billion people living under autocratic regimes.',
ARRAY['adoption', 'dari', 'autocratic', 'afghanistan', 'women'], 'high'),

-- 25. Bitcoin GDP equivalent
((SELECT id FROM categories WHERE slug = 'adoption'), 'published',
'Bitcoin er for lite til å være relevant',
'Bitcoin is too small to be relevant',
'Hvis Bitcoin var et land, ville BNP (basert på transaksjonsvolum) rangert som 17. globalt. $2,6 billioner USD i Bitcoin ble utvekslet over 30 dager (august 2024). Lightning Network har kapasitet på 1+ million transaksjoner per sekund, potensielt opptil 40 millioner TPS.',
'If Bitcoin were a country, its GDP (based on transaction volume) would rank 17th globally. $2.6 trillion USD in Bitcoin was exchanged over 30 days (August 2024). Lightning Network has capacity of 1+ million TPS, potentially up to 40 million TPS.',
'DA-RI; CoinMarketCap; WooCharts (2024)', 'https://www.da-ri.org/', '2024-08-01',
'Bitcoins transaksjonsvolum ville gjort det til den 17. største økonomien på jorden. Fortsatt tror det er en leke?',
'Bitcoin''s transaction volume would make it the 17th largest economy on Earth. Still think it''s a toy?',
ARRAY['adoption', 'dari', 'gdp', 'lightning-network', 'volume'], 'high'),

-- 26. ESG opportunity
((SELECT id FROM categories WHERE slug = 'adoption'), 'published',
'ESG-fond kan ikke investere i Bitcoin',
'ESG funds cannot invest in Bitcoin',
'23 billioner dollar i ESG-fond er for tiden ute av stand til å allokere til Bitcoin på grunn av utdatert ESG-narrativ. 1 % ESG-allokering ville økt Bitcoins markedsverdi fra 724 milliarder til 1,76 billioner dollar.',
'$23 trillion in ESG funds is currently unable to deploy into Bitcoin due to outdated ESG narrative concerns. A 1% ESG allocation would increase Bitcoin''s market cap from $724 billion to $1.76 trillion.',
'DA-RI article', 'https://www.da-ri.org/', '2023-01-01',
'Det er 23 billioner dollar i ESG-penger utestengt fra Bitcoin av et utdatert narrativ. Når fakta innhenter, dobler 1 % allokering Bitcoins markedsverdi.',
'There''s $23 trillion in ESG money locked out of Bitcoin by an outdated narrative. When the facts catch up, a 1% allocation doubles Bitcoin''s market cap.',
ARRAY['adoption', 'dari', 'esg', 'institutional'], 'high');

-- --- ACADEMIC (additional DARI facts) ---

INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES

-- 27. De Vries track record
((SELECT id FROM categories WHERE slug = 'academic'), 'published',
'Alex de Vries / Digiconomist er en pålitelig kilde om Bitcoin-energi',
'Alex de Vries / Digiconomist is a reliable source on Bitcoin energy',
'De Vries'' 2017-modell spådde 25 % månedlige energiøkninger — faktisk forbruk viste seg å være 2 509x lavere enn hans prognose. Han er tilknyttet DNB (den nederlandske sentralbanken), et faktum som ofte ikke oppgis. Wikipedia droppet Digiconomist som referansekilde.',
'De Vries'' 2017 model predicted 25% monthly energy increases — actual consumption proved 2,509x lower than his projection. He is affiliated with DNB (Dutch Central Bank), a fact often undisclosed. Wikipedia dropped Digiconomist as a reference source.',
'DA-RI multiple rebuttals; Cambridge CCAF', 'https://www.da-ri.org/', '2023-01-01',
'Den mest siterte Bitcoin-energikritikeren jobber for en sentralbank, spådde energibruk 2 509 ganger høyere enn virkeligheten, og selv Cambridge sa metrikken hans er «ikke meningsfull».',
'The most-cited Bitcoin energy critic works for a central bank, predicted energy usage 2,509 times higher than reality, and even Cambridge said his per-transaction metric is "not meaningful."',
ARRAY['academic', 'dari', 'de-vries', 'digiconomist', 'debunk'], 'high'),

-- 28. Mora et al debunked
((SELECT id FROM categories WHERE slug = 'academic'), 'published',
'Bitcoin-utslipp alene kan presse global oppvarming over 2°C',
'Bitcoin emissions alone could push global warming above 2°C',
'Mora et al.s påstand ble tilbakevist i Nature Climate Change (2019) som basert på «umulige adopsjonsscenarioer». Tidlige Bitcoin-kritiske publikasjoner akkumulerte sitater til tross for at de ble tilbakevist — dette er dokumentert i en egen fagfellevurdert artikkel om «løpske sitater».',
'Mora et al.''s claim was rebutted in Nature Climate Change (2019) as based on "impossible adoption scenarios." Early Bitcoin-critical publications accumulated citations despite being debunked — this is documented in a dedicated peer-reviewed paper on "runaway citations."',
'Nature Climate Change (2019); DA-RI Working Paper V2.0', 'https://www.da-ri.org/', '2019-01-01',
'Det mest alarmerende Bitcoin-klimakravet ble tilbakevist i Nature Climate Change som basert på «umulige scenarioer». Men det blir fortsatt sitert.',
'The most alarming Bitcoin climate claim was debunked in Nature Climate Change as based on "impossible scenarios." But it''s still being cited.',
ARRAY['academic', 'dari', 'mora', 'nature', 'debunk'], 'high'),

-- 29. Dominici et al critique
((SELECT id FROM categories WHERE slug = 'academic'), 'published',
'Ny forskning viser at Bitcoin-mining forurenser lokalmiljøet',
'New research shows Bitcoin mining pollutes local environments',
'Dominici et al.-studien analyserte bare 34 av 137 amerikanske Bitcoin-operasjoner, utelukket store fornybare operasjoner (Marathons 114 MW vindpark, Crusoes 200 MW faklingsmitigering), brukte 2018 eGRID-data for 2022-2023 operasjoner, og prøvde under 25 % av minere.',
'The Dominici et al. study analyzed only 34 of 137 U.S. Bitcoin mining operations, excluded major renewable-collocated operations (Marathon''s 114 MW windfarm, Crusoe''s 200 MW flare-gas mitigation), relied on 2018 eGRID data for 2022-2023 operations, and sampled less than 25% of miners.',
'DA-RI rebuttal of Dominici et al. (April 2025)', 'https://www.da-ri.org/', '2025-04-01',
'Forurensningsstudien utelukket de største fornybare mining-operasjonene, brukte 5 år gamle nettdata og prøvde under 25 % av minerne. Det er ikke vitenskap — det er seleksjonsskjevhet.',
'The pollution study excluded the biggest renewable mining operations, used 5-year-old grid data, and sampled less than 25% of miners. That''s not science — that''s selection bias.',
ARRAY['academic', 'dari', 'dominici', 'pm25', 'selection-bias'], 'high'),

-- 30. Greenpeace campaign
((SELECT id FROM categories WHERE slug = 'academic'), 'published',
'Greenpeace sin «Change the Code»-kampanje viser at Bitcoin bør endre seg',
'Greenpeace''s "Change the Code" campaign shows Bitcoin should change',
'Greenpeace USAs «Change the Code»-kampanje ble finansiert av en donasjon på 5 millioner dollar fra Chris Larson, styreleder i Ripple (en Bitcoin-konkurrent). Null Bitcoin-nodeeiere, utviklere eller minere implementerte de foreslåtte endringene.',
'Greenpeace USA''s "Change the Code" campaign was funded by a $5 million donation from Chris Larson, Chairman of Ripple (a Bitcoin competitor). Zero Bitcoin node owners, developers, or miners implemented the suggested changes.',
'DA-RI Greenpeace rebuttal; public donation records', 'https://www.da-ri.org/', '2023-01-01',
'Greenpeaces Bitcoin-kampanje ble finansiert med 5 millioner dollar fra styrelederen i en Bitcoin-konkurrent. Ingen i Bitcoin fulgte forslaget deres. Ikke én person.',
'Greenpeace''s Bitcoin campaign was funded by $5 million from the chairman of a Bitcoin competitor. Nobody in Bitcoin adopted their suggestion. Not one person.',
ARRAY['academic', 'dari', 'greenpeace', 'ripple', 'campaign'], 'high'),

-- 31. Bloomberg adopted BEEST
((SELECT id FROM categories WHERE slug = 'academic'), 'published',
'Det finnes ingen uavhengig validering av Bitcoin-minings bærekraft',
'There is no independent validation of Bitcoin mining sustainability',
'Bloomberg Intelligence adopterte DA-RIs BEEST-modell 14. september 2023, og gikk bort fra Cambridge-data for Bitcoin-bærekraftsmetrikker. KPMG publiserte en Bitcoin ESG-studie (2023) som støtter Bitcoin-minings miljøprofil. Institute of Risk Management fant at mining fremmer fornybare overganger.',
'Bloomberg Intelligence adopted DA-RI''s BEEST model on September 14, 2023, moving away from Cambridge data for Bitcoin sustainability metrics. KPMG published a Bitcoin ESG study (2023) supporting Bitcoin mining''s environmental credentials. Institute of Risk Management found mining facilitates renewable transitions.',
'Bloomberg Intelligence; KPMG; IRM Europe; DA-RI', 'https://www.da-ri.org/', '2023-09-14',
'Bloomberg — gullstandarden for finansdata — byttet til DA-RIs modell framfor Cambridges fordi den er mer nøyaktig. Det er institusjonell validering.',
'Bloomberg — the gold standard of financial data — switched to DA-RI''s model over Cambridge''s because it''s more accurate. That''s institutional validation.',
ARRAY['academic', 'dari', 'bloomberg', 'kpmg', 'irm'], 'high'),

-- 32. 15 of 17 studies positive
((SELECT id FROM categories WHERE slug = 'academic'), 'published',
'Forskningen er delt om Bitcoin-minings miljøpåvirkning',
'Research is divided on Bitcoin mining environmental impact',
'Av de siste 17 store artiklene om Bitcoin-mining og energi, rapporterer 15 positive eller nøytrale effekter på fornybar energiintegrasjon. DA-RI identifiserte 21 miljøfordeler med støttende bevis, mot 5 kritiske påstander som har blitt tilbakevist.',
'Of the latest 17 major articles on Bitcoin mining and energy, 15 report positive or neutral impacts on renewable energy integration. DA-RI identified 21 environmental benefits with supporting evidence, versus 5 major critical claims that have been debunked.',
'DA-RI rebuttal of Radulescu et al.; Greenpeace rebuttal', 'https://www.da-ri.org/', '2025-01-01',
'15 av 17 nyere store studier fant at Bitcoin-mining har positiv eller nøytral miljøpåvirkning. Konsensus har endret seg — har du?',
'15 out of 17 recent major studies found Bitcoin mining has positive or neutral environmental impact. The consensus has shifted — have you?',
ARRAY['academic', 'dari', 'consensus', 'peer-reviewed'], 'high'),

-- 33. Positive media shift
((SELECT id FROM categories WHERE slug = 'academic'), 'published',
'Media er overveiende negativt til Bitcoin-mining',
'Media coverage of Bitcoin mining is overwhelmingly negative',
'Av de første 30 hovedstrømsmedieartiklene om Bitcoin og ESG undersøkt i Q1 2023, var 24 (80 %) positive. Positivt-til-negativt rapporteringsforhold: 4:1 i Q1 2023.',
'Of the first 30 mainstream media articles on Bitcoin and ESG examined in Q1 2023, 24 (80%) were positive. Positive-to-negative reporting ratio: 4:1 in Q1 2023.',
'DA-RI media tracking', 'https://www.da-ri.org/', '2023-03-01',
'80 % av mainstream miljørapportering om Bitcoin er nå positiv. Narrativet har allerede snudd — spørsmålet er om informasjonen din har det.',
'80% of mainstream environmental reporting on Bitcoin is now positive. The narrative has already shifted — the question is whether your information has.',
ARRAY['academic', 'dari', 'media', 'narrative-shift'], 'high'),

-- 34. ESMA submission
((SELECT id FROM categories WHERE slug = 'academic'), 'published',
'Det finnes ingen formell regulatorisk dokumentasjon for Bitcoin-minings bærekraft',
'There is no formal regulatory documentation for Bitcoin mining sustainability',
'DA-RI sendte formelle bevis til European Securities and Markets Authority (ESMA) angående MiCA-reguleringer, med data som viser at Bitcoin-mining er «hovedsakelig basert på bærekraftig energi» etter Kinas forbud i mai 2021.',
'DA-RI submitted formal evidence to the European Securities and Markets Authority (ESMA) regarding MiCA regulations, presenting data that Bitcoin mining is "mostly sustainable-energy based" following China''s May 2021 mining ban.',
'DA-RI ESMA submission (December 19, 2023)', 'https://www.da-ri.org/', '2023-12-19',
'DA-RI sendte fagfellevurderte bevis direkte til europeiske regulatorer som viser at Bitcoin-mining er majoritets-bærekraftig. Dette er ikke Twitter-advocacy — det er regulatorisk vitnesbyrd.',
'DA-RI submitted peer-reviewed evidence directly to European regulators showing Bitcoin mining is majority-sustainable. This isn''t Twitter advocacy — it''s regulatory testimony.',
ARRAY['academic', 'dari', 'esma', 'mica', 'regulatory'], 'high');

-- --- SCALE & CONTEXT ---

INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES

-- 35. Chemical industry comparison
((SELECT id FROM categories WHERE slug = 'energy'), 'published',
'Bitcoin er en av verdens største energiforbrukere',
'Bitcoin is one of the world''s largest energy consumers',
'Den kjemiske industrien forbrukte 15 000 TWh elektrisitet i 2022, noe som gjør den til verdens største energiforbrukende industri. Bitcoin bruker ~150 TWh — omtrent 1 % av den kjemiske industrien. Bitcoin representerer ~0,04 % av globalt energiforbruk.',
'The chemical industry consumed 15,000 TWh of electricity in 2022, making it the world''s largest energy-consuming industry. Bitcoin uses ~150 TWh — approximately 1% of the chemical industry. Bitcoin represents ~0.04% of global energy consumption.',
'IEA; DA-RI rebuttal', 'https://www.da-ri.org/', '2022-01-01',
'Den kjemiske industrien bruker 100x mer energi enn Bitcoin. Hvor er kampanjen for å endre deres kode?',
'The chemical industry uses 100x more energy than Bitcoin. Where''s the campaign to change their code?',
ARRAY['energy', 'dari', 'chemical-industry', 'scale', 'comparison'], 'high'),

-- 36. Bitcoin volatility
((SELECT id FROM categories WHERE slug = 'adoption'), 'published',
'Bitcoin er for volatilt til å være et seriøst aktivum',
'Bitcoin is too volatile to be a serious asset',
'Bitcoins volatilitetsindeks er sammenlignbar med mega-cap teknologiaksjer inkludert Nvidia, Tesla og Meta. Volatiliteten avtar over tid etter hvert som markedet modnes. 4,7 % av verdens befolkning har brukt Bitcoin (2024) — adopsjonen følger en S-kurve.',
'Bitcoin''s volatility index is comparable to mega-cap tech stocks including Nvidia, Tesla, and Meta. Volatility is diminishing over time as the market matures. 4.7% of world population has used Bitcoin (2024) — adoption follows an S-curve.',
'Jacobs (2024); Wainwright (2024); Woo (2024); DA-RI', 'https://www.da-ri.org/', '2024-01-01',
'Bitcoins volatilitet er sammenlignbar med Nvidia og Tesla. Ingen kaller dem «for volatile til å være ekte aktiva».',
'Bitcoin''s volatility is comparable to Nvidia and Tesla. Nobody calls those "too volatile to be real assets."',
ARRAY['adoption', 'dari', 'volatility', 'nvidia', 's-curve'], 'high'),

-- 37. Solar adoption slowdown
((SELECT id FROM categories WHERE slug = 'grid'), 'published',
'Fornybar energi vokser raskt nok uten Bitcoin-mining',
'Renewable energy is growing fast enough without Bitcoin mining',
'Solenergi-adopsjonsraten bremset fra 54 % per år i 2012 til 23 % innen 2021. De siste 10 årene før COVID ble nye gasskraftverk dobbelt så ofte godkjent som sol-/vindparker. Bitcoin-mining kan reversere dette ved å gjøre fornybare prosjekter lønnsomme fra dag én.',
'Solar adoption rate slowed from 54% per year in 2012 to 23% by 2021. Over the 10 years pre-COVID, new gas plants were twice as likely to be approved as solar/wind farms. Bitcoin mining can help reverse this by making renewable projects profitable from day one.',
'DA-RI article "The Renewable Grid Needs Bitcoin Mining"', 'https://www.da-ri.org/', '2023-01-01',
'Soladopsjon bremser. Gasskraftverk godkjennes 2x oftere enn fornybare. Bitcoin-mining kan reversere dette ved å gjøre fornybare prosjekter lønnsomme fra dag én.',
'Solar adoption is slowing. Gas plants get approved 2x more often than renewables. Bitcoin mining can reverse this by making renewable projects profitable from day one.',
ARRAY['grid', 'dari', 'solar', 'renewable-slowdown'], 'high'),

-- 38. Microgrids in Africa
((SELECT id FROM categories WHERE slug = 'grid'), 'published',
'Bitcoin-mining har ingen verdi for utviklingsland',
'Bitcoin mining has no value for developing countries',
'Tikula Research Network (januar 2024) bekreftet at Bitcoin-mining gjør mikronett økonomisk levedyktige i Afrika. Bitcoin-mining muliggjør lønnsomme fornybare mikronett som betjener populasjoner sør for Sahara.',
'Tikula Research Network (January 2024) confirmed mining makes microgrids economically viable in Africa. Bitcoin mining enables profitable renewable microgrids serving sub-Saharan populations.',
'Tikula Research Network (January 2024); DA-RI Science Hub', 'https://www.da-ri.org/', '2024-01-01',
'Akademisk forskning fra Afrika bekreftet det utøvere allerede visste — Bitcoin-mining gjør mikronett lønnsomme. Uten det fungerer ikke økonomien.',
'Academic research from Africa confirmed what practitioners already knew — Bitcoin mining makes microgrids profitable. Without it, the economics don''t work.',
ARRAY['grid', 'dari', 'africa', 'microgrids', 'tikula'], 'high');
