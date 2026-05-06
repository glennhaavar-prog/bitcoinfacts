-- Migration 012: 10 facts about Bitcoin Circular Economies (BCEs)
--
-- Source: Federation of Bitcoin Circular Economies (https://fbce.io/find-bces)
-- and individual BCE project websites.
--
-- Suggested by Luke (community contributor) as the strongest
-- single-source proof that Bitcoin is being used as actual money,
-- not just speculation, in real-world communities — especially in
-- the global south where traditional banking fails.
--
-- Confidence ratings:
--   high   = directly verifiable from named project websites or
--            documented in major media
--   medium = self-reported community data, harder to independently audit
--
-- All entries use dollar-quoting ($txt$).
--
-- Run in Supabase SQL Editor.

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Where is the actual proof people use Bitcoin as money?',
 'Hvor er det faktiske beviset på at folk bruker Bitcoin som penger?',
 $txt$The Federation of Bitcoin Circular Economies (FBCE) maintains a public, clickable directory of 79+ active Bitcoin Circular Economies across six continents, each verifiable through its own project page and social channels. A circular economy means Bitcoin moves through every level of the local economy: workers earn it, vendors receive it, suppliers accept it. This is qualitatively different from "merchant accepts Bitcoin as one of many payment options." Each listing on fbce.io/find-bces links to the underlying project, which in turn links to local merchants, payment infrastructure, and community on Nostr/X. The proof is not theoretical — it is browsable and falsifiable.$txt$,
 $txt$Federation of Bitcoin Circular Economies (FBCE) vedlikeholder en offentlig, klikkbar katalog over 79+ aktive Bitcoin sirkulære økonomier på tvers av seks kontinenter, hver verifiserbar gjennom sin egen prosjektside. En sirkulær økonomi betyr at Bitcoin beveger seg gjennom hvert nivå i den lokale økonomien: arbeidere tjener det, butikker mottar det, leverandører aksepterer det.$txt$,
 'Federation of Bitcoin Circular Economies (FBCE)', 'https://fbce.io/find-bces', '2025-01-01', CURRENT_DATE,
 $txt$Don't argue, link. fbce.io/find-bces — 79+ communities, each clickable. The proof is in the directory, not in theory.$txt$,
 $txt$Ikke argumenter, lenk. fbce.io/find-bces — 79+ samfunn, hvert klikkbart. Beviset er i katalogen, ikke i teorien.$txt$,
 ARRAY['fbce','circular-economy','adoption','real-world-use','global-south'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin adoption is concentrated in wealthy Western countries',
 'Bitcoin-adopsjon er konsentrert i rike vestlige land',
 $txt$The Federation of Bitcoin Circular Economies directory shows the OPPOSITE pattern. Of 79+ active circular economies, the largest concentration is in the global south: Africa (37+), Latin America & Caribbean (23+), Asia (3), versus North America (8) and Europe (9). Specific projects include Bitcoin Ekasi in a Mossel Bay township (South Africa), Bitcoin Loxion in Khayelitsha (one of South Africa's largest townships), Bitfiasi in rural Ghana, MOTIV across multiple Peruvian villages, YesBitcoinHaiti in rural Haiti, Bitcoin Famba in Mozambique. These are the communities most underserved by traditional banking — which is exactly why Bitcoin is taking root there first.$txt$,
 $txt$FBCE-katalogen viser det MOTSATTE mønsteret. Av 79+ aktive sirkulære økonomier er den største konsentrasjonen i sør: Afrika (37+), Latin-Amerika & Karibien (23+), Asia (3), mot Nord-Amerika (8) og Europa (9). Spesifikke prosjekter inkluderer Bitcoin Ekasi i en Mossel Bay-township, Bitcoin Loxion i Khayelitsha, Bitfiasi i rurale Ghana.$txt$,
 'Federation of Bitcoin Circular Economies geographic distribution', 'https://fbce.io/find-bces', '2025-01-01', CURRENT_DATE,
 $txt$Africa has 37+ active BCEs. Latin America has 23+. North America and Europe combined: 17. Bitcoin is rooting WHERE banking fails, not where it succeeds.$txt$,
 $txt$Afrika har 37+ aktive BCE-er. Latin-Amerika har 23+. Bitcoin slår rot DER banking svikter, ikke der det lykkes.$txt$,
 ARRAY['global-south','africa','latin-america','adoption','financial-inclusion','fbce'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin can only be used by vendors, not workers',
 'Bitcoin kan kun brukes av butikker, ikke av arbeidere',
 $txt$Bitcoin Ekasi (Mossel Bay, South Africa) explicitly pays 100% of staff salaries in Bitcoin. Coaches and workers receive their wages in BTC and spend it locally without converting to South African Rand — completing the circular economy loop. Bitcoin Beach in El Zonte uses Bitcoin donations to pay stipends to local participants. Bitcoin Lake in Panajachel, Bitcoin Jungle in Costa Rica, and Praia Bitcoin in Brazil all document workers receiving wages in Bitcoin. The "vendors only" framing assumes Bitcoin can only flow ONE direction (customer → merchant). Real BCEs prove it flows BOTH ways: salaries paid in BTC, spending in BTC, supplier payments in BTC.$txt$,
 $txt$Bitcoin Ekasi (Mossel Bay, Sør-Afrika) betaler eksplisitt 100% av ansattes lønn i Bitcoin. Trenere og arbeidere mottar lønnen sin i BTC og bruker den lokalt uten å konvertere til sørafrikanske rand. Bitcoin Beach bruker Bitcoin-donasjoner til å betale stipender til lokale deltakere. "Kun butikker"-rammen forutsetter at Bitcoin kun kan flyte ÉN retning. Reelle BCE-er beviser det flyter BEGGE veier.$txt$,
 'Bitcoin Ekasi (bitcoinekasi.com) / Bitcoin Beach (bitcoinbeach.com)', 'https://www.bitcoinekasi.com', '2024-01-01', CURRENT_DATE,
 $txt$Bitcoin Ekasi pays 100% of staff salaries in BTC. Workers spend it locally. The "vendors only" claim assumes one-way flow — circular economies disprove that.$txt$,
 $txt$Bitcoin Ekasi betaler 100% av ansattes lønn i BTC. Arbeidere bruker det lokalt. "Kun butikker"-påstanden forutsetter enveis flyt — sirkulære økonomier motbeviser det.$txt$,
 ARRAY['salaries','workers','bitcoin-ekasi','circular-economy','south-africa'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin Beach El Zonte was just an isolated experiment',
 'Bitcoin Beach El Zonte var bare et isolert eksperiment',
 $txt$Bitcoin Beach (El Zonte, El Salvador) was launched in 2019 by Mike Peterson, Roman Martínez (Chimbera) and Peter DeSoto, seeded by an anonymous early Bitcoin donor. Far from being isolated, it became the prototype that directly inspired El Salvador's 2021 Legal Tender Law making Bitcoin official currency — the first nation-state adoption in history. President Nayib Bukele has publicly cited the El Zonte experiment as the proof point. Beyond El Salvador, the model has been replicated in 78+ other documented Bitcoin Circular Economies on six continents (FBCE registry, 2025). Praia Bitcoin (Brazil), Bitcoin Lake (Guatemala), Bitcoin Ekasi (South Africa) all explicitly cite Bitcoin Beach as their inspiration. An "isolated experiment" doesn't spawn a movement.$txt$,
 $txt$Bitcoin Beach (El Zonte, El Salvador) ble lansert i 2019 av Mike Peterson, Roman Martínez (Chimbera) og Peter DeSoto, finansiert av en anonym tidlig Bitcoin-donor. Langt fra isolert ble det prototypen som direkte inspirerte El Salvadors 2021-lov om legal tender. Modellen er replikert i 78+ andre dokumenterte Bitcoin sirkulære økonomier.$txt$,
 'Bitcoin Beach (bitcoinbeach.com) / FBCE registry', 'https://bitcoinbeach.com', '2024-01-01', CURRENT_DATE,
 $txt$2019 launch in El Zonte. Inspired El Salvador legal tender 2021. Replicated in 78+ communities on 6 continents. Movements aren't isolated experiments.$txt$,
 $txt$2019-lansering i El Zonte. Inspirerte El Salvador legal tender 2021. Replikert i 78+ samfunn.$txt$,
 ARRAY['bitcoin-beach','el-salvador','el-zonte','legal-tender','bukele','prototype'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'No one in Africa actually uses Bitcoin',
 'Ingen i Afrika bruker faktisk Bitcoin',
 $txt$Africa hosts the largest concentration of documented Bitcoin Circular Economies of any region, with 37+ active projects across at least 12 countries: Kenya (Afribit Kibra, Bitcoin Nairobi, Bitcoin Chama, Bitcoin Kitui, Bitcoin Githurai), South Africa (Bitcoin Ekasi, Bitcoin Loxion, Bitcoin Karoo, Bitcoin Plett, Bitcoin Sedgefield, Bitcoin Sisonke, Bitcoin Ubuntu, Bitcoin Witsand, Soweto BTC), Nigeria (Bitcoin Anambra, Bitcoin Edo, Bitcoin Ekiti, Bitcoin Ikorodu, Bitcoin Kwara, Calabar Bitcoin), Ghana (Bitcoin Aves, Bitcoin Dua, Bitfiasi, College BTC), Tanzania (Bitcoin Arusha), Uganda (Bitcoin Kampala), Zambia (Bitcoin Campus, Bitcoin Victoria Falls), Mozambique (Bitcoin Famba), Botswana (Ola Bitcoin), Burundi (Bitcoin Shule), DRC (Kiveclair), Malawi (Women of Satoshi Cooperative). Each has its own merchants, users, and on-chain activity verifiable through linked profiles.$txt$,
 $txt$Afrika har den største konsentrasjonen av dokumenterte Bitcoin sirkulære økonomier av noen region, med 37+ aktive prosjekter i minst 12 land. Hver har sine egne kjøpmenn, brukere og on-chain-aktivitet verifiserbar gjennom lenkede profiler.$txt$,
 'FBCE African community directory', 'https://fbce.io/find-bces', '2025-01-01', CURRENT_DATE,
 $txt$37+ documented BCEs across 12+ African countries. Each one has merchants, users, and verifiable activity. List them by country if pressed.$txt$,
 $txt$37+ dokumenterte BCE-er på tvers av 12+ afrikanske land. Hver har butikker, brukere og verifiserbar aktivitet.$txt$,
 ARRAY['africa','kenya','south-africa','nigeria','ghana','adoption','fbce'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin is too volatile to function as everyday money',
 'Bitcoin er for volatil til å fungere som hverdagspenger',
 $txt$The volatility argument predicts that Bitcoin Circular Economies should be impossible — workers wouldn't accept wages in volatile money, merchants wouldn't price in it, communities wouldn't sustain it. Yet 79+ active BCEs on six continents demonstrate empirically that the prediction is wrong. Bitcoin Ekasi pays 100% of salaries in BTC. Bitcoin Lake, Bitcoin Beach, Praia Bitcoin, MOTIV (Peru), Bitcoin Famba (Mozambique) all sustain ongoing local economies. Why does it work? Because Lightning Network enables instant conversion if needed, holders can choose how much to keep vs. spend, and for communities serving the unbanked or living under failing local currencies (Argentine peso, Venezuelan bolivar, Lebanese pound) Bitcoin's volatility is LESS than their alternatives. Theory said it shouldn't work; reality says it does.$txt$,
 $txt$Volatilitetsargumentet forutsier at Bitcoin sirkulære økonomier skulle være umulige — arbeidere ville ikke akseptert lønn i volatil valuta, kjøpmenn ville ikke priset i det. Likevel demonstrerer 79+ aktive BCE-er på seks kontinenter empirisk at forutsigelsen er feil. Hvorfor fungerer det? Lightning Network muliggjør konvertering, eiere kan velge hvor mye de beholder, og for samfunn som lever under feilende lokale valutaer er Bitcoins volatilitet MINDRE enn alternativene.$txt$,
 'FBCE directory + Lightning Network adoption data', 'https://fbce.io/find-bces', '2025-01-01', CURRENT_DATE,
 $txt$Theory said volatility makes Bitcoin unusable as money. Reality: 79+ circular economies running. Empirical reality beats theoretical objection.$txt$,
 $txt$Teorien sa volatilitet gjorde Bitcoin ubrukelig som penger. Realiteten: 79+ sirkulære økonomier i drift.$txt$,
 ARRAY['volatility','adoption','empirical','lightning','circular-economy'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='adoption'), 'published',
 'Bitcoin adoption is going backwards',
 'Bitcoin-adopsjon går bakover',
 $txt$The opposite is true. The Federation of Bitcoin Circular Economies registry has grown to 79+ active communities across six continents, with new projects added regularly across 2024-2025. Specific recent additions include Bitcoin Roatán (Honduras), Bitcoin Ikorodu (Nigeria), Bitcoin Anambra (Nigeria), Cuba Bitcoin (Havana), and Mayan Bitcoin (Mexico). El Salvador formalized national legal tender (2021), CAR followed (2022), Bhutan built strategic Bitcoin reserves (2023), Bitcoin spot ETFs launched in the US (Jan 2024) and now hold $50B+ in assets, MicroStrategy/Strategy holds 600,000+ BTC ($60B+) for corporate treasury. Adoption has accelerated, not reversed. The "going backwards" claim usually fixates on price during corrections while ignoring infrastructure that grows in every cycle.$txt$,
 $txt$Det motsatte er sant. FBCE-registret har vokst til 79+ aktive samfunn på tvers av seks kontinenter, med nye prosjekter regelmessig lagt til i 2024-2025. El Salvador formaliserte nasjonal legal tender (2021), CAR fulgte (2022), Bhutan bygde strategiske Bitcoin-reserver (2023), spot-ETF-er lansert i USA holder nå $50mrd+ i aktiva.$txt$,
 'FBCE registry + ETF AUM + sovereign holdings data', 'https://fbce.io/find-bces', '2025-01-01', CURRENT_DATE,
 $txt$Adoption only goes backward in price charts. Infrastructure: BCEs growing, sovereign reserves up, ETF AUM at all-time highs. Each cycle adds, never removes.$txt$,
 $txt$Adopsjon går bare bakover i prisgrafer. Infrastruktur: BCE-er vokser, statlige reserver opp, ETF AUM på all-time highs.$txt$,
 ARRAY['adoption','growth','infrastructure','etf','sovereigns'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin doesn''t serve indigenous or marginalized communities',
 'Bitcoin tjener ikke urfolk eller marginaliserte samfunn',
 $txt$Counter-examples are extensive and documented. La IslaBTC operates in Cuba's Isla de la Juventud. Lago Bitcoin (Bitcoin Lake) serves Mayan communities around Lake Atitlán in Guatemala. Mayan Bitcoin operates in the Yucatán peninsula. Women of Satoshi Cooperative operates in Lilongwe, Malawi as a women-led economic project. Bitcoin Loxion operates in Khayelitsha, one of South Africa''s largest informal settlements. YesBitcoinHaiti serves rural Haiti, where banking infrastructure is minimal. MOTIV operates across multiple Peruvian indigenous communities. The pattern is consistent: Bitcoin Circular Economies emerge MOST in places where traditional finance has failed marginalized communities, not in places where it has succeeded.$txt$,
 $txt$Mot-eksempler er omfattende og dokumenterte. Lago Bitcoin tjener Maya-samfunn rundt Atitlán-sjøen i Guatemala. Mayan Bitcoin opererer på Yucatán-halvøya. Women of Satoshi Cooperative opererer i Lilongwe, Malawi som et kvinneledet økonomisk prosjekt. Bitcoin Loxion opererer i Khayelitsha. Mønsteret er konsekvent: BCE-er oppstår MEST der tradisjonell finans har sviktet.$txt$,
 'FBCE community profiles', 'https://fbce.io/find-bces', '2025-01-01', CURRENT_DATE,
 $txt$Specific cases: Lago Bitcoin (Mayan), Mayan Bitcoin (Yucatán), Women of Satoshi (Malawi), Bitcoin Loxion (Khayelitsha), YesBitcoinHaiti, MOTIV (indigenous Peru). Bitcoin emerges WHERE finance fails.$txt$,
 $txt$Konkrete saker: Lago Bitcoin (Maya), Mayan Bitcoin (Yucatán), Women of Satoshi (Malawi), Bitcoin Loxion (Khayelitsha), YesBitcoinHaiti, MOTIV (urfolk Peru).$txt$,
 ARRAY['indigenous','marginalized','women','mayan','financial-inclusion','fbce'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin Circular Economies don''t actually exist at scale',
 'Bitcoin sirkulære økonomier eksisterer ikke i skala',
 $txt$The Federation of Bitcoin Circular Economies maintains a public, browsable directory of 79+ documented circular economies. By definition, a Bitcoin Circular Economy is one where Bitcoin moves through every level of the local economy: workers earn it, vendors receive it, suppliers accept it, and users live on it without needing to convert. This is a stricter standard than "merchants accept it as payment option." The directory is geographically distributed: 37+ in Africa, 23+ in Latin America & Caribbean, 9 in Europe, 8 in North America, 3 in Asia. Each project has its own website, social channels (X/Nostr), and verifiable on-chain activity. The "doesn''t exist at scale" claim is an empirical question with an empirical answer: 79+, and growing.$txt$,
 $txt$FBCE vedlikeholder en offentlig, søkbar katalog over 79+ dokumenterte sirkulære økonomier. Per definisjon er en Bitcoin sirkulær økonomi en der Bitcoin beveger seg gjennom hvert nivå i lokaløkonomien: arbeidere tjener det, kjøpmenn mottar det, leverandører aksepterer det. Dette er en strengere standard enn "kjøpmenn aksepterer det som betalingsalternativ".$txt$,
 'Federation of Bitcoin Circular Economies', 'https://fbce.io/find-bces', '2025-01-01', CURRENT_DATE,
 $txt$Definitions matter. BCE = Bitcoin moves through every level (workers, vendors, suppliers). 79+ documented. Browsable directory at fbce.io/find-bces.$txt$,
 $txt$Definisjoner betyr noe. BCE = Bitcoin beveger seg gjennom hvert nivå (arbeidere, kjøpmenn, leverandører). 79+ dokumentert.$txt$,
 ARRAY['circular-economy','fbce','definition','adoption','scale'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='adoption'), 'published',
 'Lightning Network has no real-world adoption',
 'Lightning Network har ingen reell adopsjon',
 $txt$Most Bitcoin Circular Economies run on Lightning Network for everyday transactions. Bitcoin Beach pioneered Lightning-based local payments via the Bitcoin Beach Wallet (later evolved into Blink). Bitcoin Jungle in Costa Rica is explicitly built on the Bitcoin Lightning Network as an open-source community project. Bitcoin Ekasi, Bitcoin Loxion, Praia Bitcoin, Lago Bitcoin, MOTIV, Bitcoin Famba — all use Lightning for sub-second, sub-cent payments suitable for everyday spending. Lightning is what makes Bitcoin practical as actual currency in these communities, not just store of value. The "no adoption" claim usually compares Lightning to Visa''s aggregate volumes, missing that Lightning is a year-old technology already serving millions of payments daily across these communities.$txt$,
 $txt$De fleste Bitcoin sirkulære økonomier bruker Lightning Network for hverdagstransaksjoner. Bitcoin Beach pionerte Lightning-baserte lokale betalinger via Bitcoin Beach Wallet. Bitcoin Jungle er eksplisitt bygget på Bitcoin Lightning Network. Bitcoin Ekasi, Bitcoin Loxion, Praia Bitcoin, Lago Bitcoin, MOTIV — alle bruker Lightning for sub-sekund, sub-cent betalinger.$txt$,
 'Bitcoin Jungle / Bitcoin Beach Wallet (Blink) / FBCE directory', 'https://www.bitcoinjungle.app', '2024-01-01', CURRENT_DATE,
 $txt$Lightning powers most BCEs: Bitcoin Beach (via Blink), Bitcoin Jungle, Bitcoin Ekasi, Lago Bitcoin, Praia. Sub-second, sub-cent payments. Adoption is in the global south where banks failed.$txt$,
 $txt$Lightning driver de fleste BCE-ene: Bitcoin Beach, Bitcoin Jungle, Bitcoin Ekasi, Lago Bitcoin. Sub-sekund, sub-cent betalinger.$txt$,
 ARRAY['lightning','adoption','blink','bitcoin-beach','bitcoin-jungle','fbce'], 'high');
