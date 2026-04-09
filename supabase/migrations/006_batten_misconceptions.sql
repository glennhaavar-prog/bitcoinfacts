-- Migration 006: Daniel Batten's "Common Bitcoin Energy Misconceptions" article
-- Source: https://x.com/DSBatten/status/2007466463062270193
-- Run in Supabase SQL Editor

-- 1. Per-transaction metrics debunked
INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence)
VALUES (
  (SELECT id FROM categories WHERE slug = 'academic'),
  'published',
  'Bitcoin uses a lot of energy/water/eWaste per transaction',
  'Bitcoin bruker mye energi/vann/e-avfall per transaksjon',
  'Dismissed by four peer-reviewed studies (Masanet et al. 2019, Dittmar et al. 2019, Sedlmeir et al. 2020, Sai & Vranken 2023) and by Cambridge University. Bitcoin''s resource use does not come from transactions — transaction volume can scale without increasing resource use. The claim originated from de Vries'' 2018 non-empirical commentary. In 2025, Cambridge showed de Vries'' eWaste estimate was overestimated by 1204% (2.3 kT actual vs 30 kT claimed).',
  'Avvist av fire fagfellevurderte studier (Masanet et al. 2019, Dittmar et al. 2019, Sedlmeir et al. 2020, Sai & Vranken 2023) og av Cambridge University. Bitcoins ressursbruk kommer ikke fra transaksjoner — transaksjonsvolum kan skaleres uten å øke ressursbruken. Påstanden stammer fra de Vries'' ikke-empiriske kommentar fra 2018. I 2025 viste Cambridge at de Vries'' e-avfallsestimat var overestimert med 1204%.',
  'Daniel Batten / Cambridge University / Multiple peer-reviewed studies',
  'https://x.com/DSBatten/status/2007466463062270193',
  '2025-06-01',
  CURRENT_DATE,
  'Per-transaction metrics are debunked by 4 peer-reviewed studies AND Cambridge. De Vries'' eWaste numbers were off by 1204%. This is the single most important misconception to correct.',
  'Per-transaksjon-målinger er avvist av 4 fagfellevurderte studier OG Cambridge. De Vries'' e-avfallstall var feil med 1204%. Dette er den viktigste misforståelsen å rette opp.',
  ARRAY['per-transaction', 'ewaste', 'de-vries', 'cambridge', 'peer-reviewed', 'debunked'],
  'high'
);

-- 2. Grid stabilization evidence
INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence)
VALUES (
  (SELECT id FROM categories WHERE slug = 'grid'),
  'published',
  'Bitcoin mining destabilizes grids',
  'Bitcoin-mining destabiliserer strømnettet',
  'A growing body of independent research shows Bitcoin mining stabilizes grids due to its flexible, modular and interruptible nature. Duke University concluded Controllable Load Resources (Bitcoin mining) help stabilize grids and defer expensive upgrades. Lai et al. found mining can "balance the electrical grid". Menati et al. demonstrated mining flexibility is pivotal for grid reliability. On ERCOT (Texas), large-scale stabilization events significantly outnumber destabilization — with only one mild, localized destabilizing incident documented (April 2024) versus multiple major stabilization events including the July 2022 heatwave.',
  'En voksende mengde uavhengig forskning viser at Bitcoin-mining stabiliserer strømnett på grunn av sin fleksible, modulære og avbrytbare natur. Duke University konkluderte med at Controllable Load Resources (Bitcoin-mining) hjelper med å stabilisere nett og utsette kostbare oppgraderinger. Lai et al. fant at mining kan "balansere det elektriske nettet". På ERCOT (Texas) overgår storskala stabiliseringshendelser destabilisering betydelig.',
  'Daniel Batten / Duke University / Lai et al. / Menati et al. / ERCOT data',
  'https://x.com/DSBatten/status/2007466463062270193',
  '2025-06-01',
  CURRENT_DATE,
  'Use the ERCOT track record: multiple major stabilization events vs ONE mild destabilization incident. Quote Brad Jones (ERCOT CEO) directly.',
  'Bruk ERCOT-historikken: flere store stabiliseringshendelser vs ÉN mild destabiliseringshendelse. Siter Brad Jones (ERCOT-sjef) direkte.',
  ARRAY['grid', 'ercot', 'texas', 'stabilization', 'duke-university', 'demand-response'],
  'high'
);

-- 3. Consumer electricity prices
INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence)
VALUES (
  (SELECT id FROM categories WHERE slug = 'price'),
  'published',
  'Everyday consumers pay more for electricity because of Bitcoin miners',
  'Vanlige forbrukere betaler mer for strøm på grunn av Bitcoin-mining',
  'Data shows Texas (highest Bitcoin mining concentration in US) saw electricity costs rise 23.8% (2021-2024), slightly LESS than the US average of 24.67%. Neither data nor peer-reviewed studies support the claim. Five mechanisms lower prices: monetizing wasted renewables, competitive ancillary services, avoiding gas peaker plants, reducing curtailment fees, and deferring grid infrastructure costs. After 2021 Texas blackouts, Bitcoin miners (up to 3 GW flexible load) replaced the proposed $18B Berkshire gas peaker plan. Norway saw 20% price INCREASE when mining left. Kenya saw 28.5% price DECREASE when mining was added.',
  'Data viser at Texas (høyeste Bitcoin-mining-konsentrasjon i USA) hadde strømkostnader som økte 23,8% (2021-2024), litt MINDRE enn USA-snittet på 24,67%. Hverken data eller studier støtter påstanden. Norge opplevde 20% prisØKNING da mining forsvant. Kenya opplevde 28,5% prisNEDGANG da mining ble lagt til.',
  'Daniel Batten / ERCOT / EIA data / CNBC (Kenya)',
  'https://x.com/DSBatten/status/2007466463062270193',
  '2025-06-01',
  CURRENT_DATE,
  'Lead with the Texas vs US data comparison — it directly contradicts the claim with numbers. Then cite Norway (+20%) and Kenya (-28.5%) as real-world case studies.',
  'Led med Texas vs USA-datasammenligningen — den motbeviser påstanden direkte med tall. Deretter nevn Norge (+20%) og Kenya (-28,5%) som case-studier.',
  ARRAY['electricity-prices', 'texas', 'norway', 'kenya', 'consumer-costs', 'peaker-plants'],
  'high'
);

-- 4. Energy use framing
INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence)
VALUES (
  (SELECT id FROM categories WHERE slug = 'energy'),
  'published',
  'Bitcoin uses too much energy / as much energy as whole countries',
  'Bitcoin bruker for mye energi / like mye energi som hele land',
  'Cambridge University states comparing industries to countries is not meaningful, tends to result in misleading portrayals, and is "presenter bias". The IPCC consensus focuses on transforming the energy system, not reducing total energy use. Key IPCC changes: rapid shift to zero-carbon sources, greater flexibility and electrification, reduced fossil fuels. Bitcoin mining already delivers all three: it is fully electrified (no direct emissions), uniquely capable of shutting off/restarting entire load within 500ms without external storage, and profitably mitigates methane at scale.',
  'Cambridge University sier at sammenligning av industrier med land ikke er meningsfylt, og er "presentatør-bias". IPCC-konsensus fokuserer på å transformere energisystemet, ikke redusere totalbruk. Bitcoin-mining leverer allerede alle tre IPCC-nøkkelendringer: fullt elektrifisert, unikt fleksibel (500ms responstid), og mitigerer metan lønnsomt.',
  'Daniel Batten / Cambridge University / IPCC Assessment Reports',
  'https://x.com/DSBatten/status/2007466463062270193',
  '2025-06-01',
  CURRENT_DATE,
  'Quote Cambridge directly on "presenter bias" for country comparisons. Then reframe using IPCC criteria — Bitcoin mining meets all three transformation requirements.',
  'Siter Cambridge direkte om "presentatør-bias" for landssammenligninger. Deretter omdefiner med IPCC-kriterier — Bitcoin-mining oppfyller alle tre transformasjonskrav.',
  ARRAY['energy-use', 'country-comparison', 'cambridge', 'ipcc', 'presenter-bias', 'electrification'],
  'high'
);

-- 5. Carbon footprint context
INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence)
VALUES (
  (SELECT id FROM categories WHERE slug = 'energy'),
  'published',
  'Bitcoin''s carbon footprint is very high',
  'Bitcoins karbonavtrykk er veldig høyt',
  'Bitcoin mining is the only global industry with robust third-party data showing it has crossed the 50% sustainable energy threshold (global grid average is ~40% renewable). Cambridge estimates ~39.8 MtCO2e — these are exclusively scope-2 emissions (from electricity), with zero direct scope-1 emissions. Like EVs, Bitcoin replaces a more emission-intensive technology (banking at ~263 TWh). EVs accounted for 80 MtCO2e in China and US alone but aren''t called high-carbon. Cambridge April 2025 report shows Bitcoin''s emission intensity at 288 g/kWh — lower and improving faster than banking.',
  'Bitcoin-mining er den eneste globale industrien med robuste tredjepartsdata som viser at den har krysset 50% bærekraftig energigrensen. Cambridge estimerer ~39,8 MtCO2e — utelukkende scope-2-utslipp. Som elbiler erstatter Bitcoin en mer utslippsintensiv teknologi (banksektor). Elbiler sto for 80 MtCO2e i Kina og USA alene men kalles ikke høy-karbon.',
  'Daniel Batten / Cambridge CCAF April 2025',
  'https://x.com/DSBatten/status/2007466463062270193',
  '2025-06-01',
  CURRENT_DATE,
  'Use the EV parallel: if you call Bitcoin high-carbon, you must call EVs high-carbon too. Both have only scope-2 emissions. Both replace more polluting predecessors.',
  'Bruk elbil-parallellen: kaller du Bitcoin høy-karbon, må du kalle elbiler høy-karbon også. Begge har kun scope-2-utslipp.',
  ARRAY['carbon-footprint', 'emissions', 'scope-2', 'ev-comparison', 'cambridge', 'banking'],
  'high'
);

-- 6. PoW vs PoS environmental comparison
INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence)
VALUES (
  (SELECT id FROM categories WHERE slug = 'environment'),
  'published',
  'Proof of Stake (Ethereum) is better for the environment than Proof of Work (Bitcoin)',
  'Proof of Stake (Ethereum) er bedre for miljøet enn Proof of Work (Bitcoin)',
  'PoW uses more energy than PoS, but claiming this makes PoS more environmentally friendly conflates energy use with harm. Bitcoin''s PoW has proven ability to mitigate methane, stabilize grids, increase renewable capacity, monetize wasted energy, and support clean microgrid development — all backed by peer-reviewed research. Ethereum lost these capabilities when switching to PoS in Sept 2022. Cambridge estimates Bitcoin pays off 5.5% of annual carbon debt through methane mitigation alone. No barriers prevent exceeding 100% mitigation in future. 22 peer-reviewed papers and 8 independent reports document benefits that stem from energy-intensive PoW.',
  'PoW bruker mer energi enn PoS, men å hevde at dette gjør PoS mer miljøvennlig forveksler energibruk med skade. Bitcoins PoW har bevist evne til å mitigere metan, stabilisere nett, øke fornybar kapasitet. Ethereum mistet disse evnene da det byttet til PoS i sept 2022. Cambridge estimerer at Bitcoin betaler ned 5,5% av årlig karbongjeld gjennom metanmitigering alene. 22 fagfellevurderte artikler dokumenterer fordeler som stammer fra energiintensiv PoW.',
  'Daniel Batten / Cambridge April 2025 / 22 peer-reviewed papers',
  'https://x.com/DSBatten/status/2007466463062270193',
  '2025-06-01',
  CURRENT_DATE,
  'Reframe: energy use ≠ environmental harm. PoW delivers methane mitigation, grid stability, and renewable acceleration that PoS cannot. Cambridge confirms 5.5% carbon debt offset from methane alone.',
  'Omdefiner: energibruk ≠ miljøskade. PoW leverer metanmitigering, nettstabilitet og fornybar akselerasjon som PoS ikke kan.',
  ARRAY['pow-vs-pos', 'ethereum', 'methane', 'environmental-benefits', 'cambridge'],
  'high'
);

-- 7. Landfill gas alternatives myth
INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence)
VALUES (
  (SELECT id FROM categories WHERE slug = 'environment'),
  'published',
  'You could use landfill gas/flare gas for things other than Bitcoin mining',
  'Du kan bruke deponi-/fakelgass til andre ting enn Bitcoin-mining',
  'Technically true but economically infeasible. 50% of world''s landfills have no option to sell power back to the grid. Bitcoin mining is unique because ~80% of its operating costs is electricity, creating a strong economic incentive to find the cheapest energy even if remote or hard to access. Nuno Barbosa (CEO Unicarbo, LFGTE expert) states: "If they had an onsite customer, that would change everything." He confirms EV charging stations and biogas refineries seldom pencil out economically as initial users of landfill gas without government subsidies.',
  'Teknisk sant men økonomisk ugjennomførbart. 50% av verdens deponier har ingen mulighet til å selge strøm tilbake til nettet. Bitcoin-mining er unikt fordi ~80% av driftskostnadene er elektrisitet. Nuno Barbosa (CEO Unicarbo, LFGTE-ekspert): "Hvis de hadde en kunde på stedet, ville det endret alt."',
  'Daniel Batten / Nuno Barbosa (CEO Unicarbo)',
  'https://x.com/DSBatten/status/2007466463062270193',
  '2025-06-01',
  CURRENT_DATE,
  'Quote Unicarbo CEO directly. The "technically true but economically infeasible" framing is powerful — compare to harvesting body heat or building space elevators.',
  'Siter Unicarbo-sjefen direkte. "Teknisk sant men økonomisk ugjennomførbart" er en kraftig framing.',
  ARRAY['landfill-gas', 'flare-gas', 'methane', 'unicarbo', 'economic-feasibility'],
  'high'
);

-- 8. Renewable energy competition myth
INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence)
VALUES (
  (SELECT id FROM categories WHERE slug = 'grid'),
  'published',
  'Bitcoin mining takes away renewable energy from other users / could be used for something better',
  'Bitcoin-mining tar fornybar energi fra andre brukere / kunne brukes til noe bedre',
  'Not supported by evidence. Bitcoin mining''s inbuilt economic incentives mean it powers down when wholesale prices spike — the exact time other users need power. Brad Jones (ERCOT) attested mining is a "non-rival energy user". Evidence shows the opposite: Gridless in Africa delivered renewable energy to ~28,000 people across four villages. In Ethiopia, Bitcoin mining accelerated transmission line construction to deliver renewable energy to rural communities. Much of the energy used is stranded and unable to be utilized by others. There are now 19 documented environmental and humanitarian uses for Bitcoin mining.',
  'Ikke støttet av bevis. Bitcoins innebygde økonomiske insentiver gjør at den slår seg av når spotprisen stiger. Brad Jones (ERCOT) bekreftet at mining er en "ikke-rivaliserende energibruker". Gridless i Afrika leverte fornybar energi til ~28 000 mennesker. I Etiopia akselererte Bitcoin-mining bygging av kraftlinjer til landsbygda. Det finnes nå 19 dokumenterte miljø- og humanitære bruksområder.',
  'Daniel Batten / ERCOT Brad Jones / Gridless / EEP Ethiopia data',
  'https://x.com/DSBatten/status/2007466463062270193',
  '2025-06-01',
  CURRENT_DATE,
  'Lead with "non-rival energy user" quote from ERCOT CEO. Then use Africa examples. The "19 documented uses" is a strong counter to "something better".',
  'Led med "ikke-rivaliserende energibruker"-sitatet fra ERCOT-sjefen. Bruk Afrika-eksemplene. "19 dokumenterte bruksområder" er et sterkt motargument.',
  ARRAY['renewable-competition', 'non-rival', 'africa', 'gridless', 'ethiopia', 'stranded-energy'],
  'high'
);

-- 9. Energy waste myth
INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence)
VALUES (
  (SELECT id FROM categories WHERE slug = 'energy'),
  'published',
  'Bitcoin mining wastes energy',
  'Bitcoin-mining sløser med energi',
  'Significant peer-reviewed literature shows Bitcoin mining PREVENTS energy waste. Moghimi et al. found that integrating Bitcoin mining into microgrids prevented almost all energy waste while decreasing operating costs by 46.5%. Lai & You found mining can achieve up to 98% solar and 92% wind utilization by acting as virtual carriers for otherwise wasted renewable energy. "Wasting energy" is a value judgment — energy is only wasted if no good is produced. Bitcoin mining has 19 well-documented social and environmental benefits.',
  'Betydelig fagfellevurdert litteratur viser at Bitcoin-mining FORHINDRER energisløsing. Moghimi et al. fant at integrering av Bitcoin-mining i mikronett forhindret nesten all energisløsing og reduserte driftskostnader med 46,5%. Lai & You fant at mining kan oppnå opptil 98% sol- og 92% vindutnyttelse. "Sløsing med energi" er en verdidom — energi sløses kun hvis intet godt produseres.',
  'Daniel Batten / Moghimi et al. / Lai & You',
  'https://x.com/DSBatten/status/2007466463062270193',
  '2025-06-01',
  CURRENT_DATE,
  'The 98% solar / 92% wind utilization stat from Lai & You is powerful. Moghimi''s 46.5% cost reduction for microgrids is a strong economic argument. Reframe: "Failure to mine Bitcoin is what wastes energy."',
  'Statistikken med 98% sol / 92% vindbruk fra Lai & You er kraftig. Moghimis 46,5% kostnadsreduksjon er et sterkt økonomisk argument. Omdefiner: "Det er å IKKE drive Bitcoin-mining som sløser med energi."',
  ARRAY['energy-waste', 'microgrids', 'solar', 'wind', 'utilization', 'peer-reviewed'],
  'high'
);
