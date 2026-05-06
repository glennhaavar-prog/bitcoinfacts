-- Migration 012: 7 facts about Bitcoin Circular Economies (BCEs)
--
-- Source: Federation of Bitcoin Circular Economies (https://fbce.io/find-bces)
-- and individual BCE project websites.
--
-- A Bitcoin Circular Economy (BCE) means Bitcoin moves through every level of
-- the local economy — workers earn it, vendors receive it, suppliers accept
-- it. This is a stricter standard than "merchant accepts Bitcoin as a payment
-- option." FBCE is a coordination/advocacy organization, not a peer-reviewed
-- research body. Per our methodology, that puts it at Tier 4-5 source quality.
--
-- All entries are rated 'medium' confidence: the underlying evidence is
-- community-reported, not independently audited. The strength of FBCE is
-- BREADTH (79+ communities) and FALSIFIABILITY (every project has a public
-- page, social channels, and on-chain activity that can be independently
-- verified).
--
-- We deliberately limit ourselves to 7 facts where the underlying evidence is
-- specifically citable (named projects, named locations, named practices like
-- Bitcoin Ekasi paying 100% wages in BTC). We dropped 3 weaker drafts that
-- relied on FBCE alone for broad theoretical claims (volatility, geographic
-- distribution, "scale").
--
-- All entries use dollar-quoting ($txt$).
--
-- Run in Supabase SQL Editor.

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Where is the actual proof people use Bitcoin as money?',
 'Hvor er det faktiske beviset på at folk bruker Bitcoin som penger?',
 $txt$The Federation of Bitcoin Circular Economies (FBCE) maintains a public, clickable directory of 79+ Bitcoin Circular Economies across six continents. A circular economy means Bitcoin moves through every level of the local economy: workers earn it, vendors receive it, suppliers accept it — not just "one merchant accepts Bitcoin as a payment option." Each listing on fbce.io/find-bces links to the underlying project, which in turn links to local merchants, payment infrastructure, and community channels on Nostr/X. FBCE itself is an advocacy/coordination organization (not a peer-reviewed source), but the directory is FALSIFIABLE: every project can be independently checked. The proof is browsable.$txt$,
 $txt$Federation of Bitcoin Circular Economies (FBCE) vedlikeholder en offentlig, klikkbar katalog over 79+ Bitcoin sirkulære økonomier på tvers av seks kontinenter. En sirkulær økonomi betyr at Bitcoin beveger seg gjennom hvert nivå av lokaløkonomien — ikke bare "én butikk aksepterer Bitcoin." FBCE er en advocacy-organisasjon (ikke en fagfellevurdert kilde), men katalogen kan VERIFISERES: hvert prosjekt kan sjekkes uavhengig.$txt$,
 'Federation of Bitcoin Circular Economies (FBCE)', 'https://fbce.io/find-bces', '2025-01-01', CURRENT_DATE,
 $txt$Don't argue, link. fbce.io/find-bces — 79+ communities, each clickable. The proof is in the directory, not in theory. Be honest that FBCE is advocacy, not academia — but the data is verifiable.$txt$,
 $txt$Ikke argumenter, lenk. fbce.io/find-bces — 79+ samfunn, hver klikkbar. Vær ærlig om at FBCE er advocacy, ikke akademia — men dataene kan verifiseres.$txt$,
 ARRAY['fbce','circular-economy','adoption','real-world-use'], 'medium');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin can only be used by vendors, not workers',
 'Bitcoin kan kun brukes av butikker, ikke av arbeidere',
 $txt$Bitcoin Ekasi in Mossel Bay, South Africa explicitly pays 100% of staff salaries in Bitcoin. Coaches and workers receive their wages in BTC and spend it locally without converting to South African Rand — completing the circular-economy loop. Bitcoin Beach in El Zonte uses Bitcoin donations to pay stipends to local participants. Several other documented Bitcoin Circular Economies (Bitcoin Lake in Guatemala, Praia Bitcoin in Brazil, Bitcoin Jungle in Costa Rica) report workers receiving wages in Bitcoin. The "vendors only" framing assumes Bitcoin can flow only one direction (customer → merchant). Real BCEs prove it flows both ways: salaries paid in BTC, spending in BTC, supplier payments in BTC.$txt$,
 $txt$Bitcoin Ekasi i Mossel Bay, Sør-Afrika betaler eksplisitt 100% av ansattes lønn i Bitcoin. Trenere og arbeidere mottar lønnen sin i BTC og bruker den lokalt uten å konvertere til sørafrikanske rand. Bitcoin Beach bruker Bitcoin-donasjoner til å betale stipender til lokale deltakere. Flere andre dokumenterte BCE-er rapporterer det samme. "Kun butikker"-rammen forutsetter at Bitcoin kun kan flyte én retning. Reelle BCE-er beviser det flyter begge veier.$txt$,
 'Bitcoin Ekasi (bitcoinekasi.com) / Bitcoin Beach (bitcoinbeach.com)', 'https://www.bitcoinekasi.com', '2024-01-01', CURRENT_DATE,
 $txt$Bitcoin Ekasi pays 100% of staff salaries in BTC. Workers spend it locally. The "vendors only" claim assumes one-way flow — circular economies disprove that.$txt$,
 $txt$Bitcoin Ekasi betaler 100% av ansattes lønn i BTC. Arbeidere bruker det lokalt. "Kun butikker"-påstanden forutsetter enveis flyt — sirkulære økonomier motbeviser det.$txt$,
 ARRAY['salaries','workers','bitcoin-ekasi','circular-economy','south-africa'], 'medium');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin Beach El Zonte was just an isolated experiment',
 'Bitcoin Beach El Zonte var bare et isolert eksperiment',
 $txt$Bitcoin Beach (El Zonte, El Salvador) was launched in 2019 by Mike Peterson, Roman Martínez (Chimbera) and Peter DeSoto, seeded by an anonymous early Bitcoin donor. Far from being isolated, it became the prototype that directly inspired El Salvador's 2021 Legal Tender Law making Bitcoin official currency — the first nation-state adoption in history. President Nayib Bukele has publicly cited the El Zonte experiment as the proof point. Beyond El Salvador, the model has been replicated in 78+ other documented Bitcoin Circular Economies on six continents (FBCE registry, 2025). Praia Bitcoin (Brazil), Bitcoin Lake (Guatemala), Bitcoin Ekasi (South Africa) all explicitly cite Bitcoin Beach as their inspiration.$txt$,
 $txt$Bitcoin Beach (El Zonte, El Salvador) ble lansert i 2019 av Mike Peterson, Roman Martínez (Chimbera) og Peter DeSoto, finansiert av en anonym tidlig Bitcoin-donor. Langt fra isolert ble det prototypen som direkte inspirerte El Salvadors 2021-lov om legal tender — den første nasjonalstatens adopsjon i historien. Modellen er replikert i 78+ andre dokumenterte BCE-er på tvers av seks kontinenter.$txt$,
 'Bitcoin Beach (bitcoinbeach.com) / FBCE registry', 'https://bitcoinbeach.com', '2024-01-01', CURRENT_DATE,
 $txt$2019 launch in El Zonte. Inspired El Salvador legal tender 2021. Replicated in 78+ communities on 6 continents. Movements aren't isolated experiments.$txt$,
 $txt$2019-lansering i El Zonte. Inspirerte El Salvador legal tender 2021. Replikert i 78+ samfunn.$txt$,
 ARRAY['bitcoin-beach','el-salvador','el-zonte','legal-tender','prototype'], 'medium');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'No one in Africa actually uses Bitcoin',
 'Ingen i Afrika bruker faktisk Bitcoin',
 $txt$The Federation of Bitcoin Circular Economies registers 37+ active community projects across at least 12 African countries — Kenya (Afribit Kibra, Bitcoin Nairobi, Bitcoin Chama, Bitcoin Kitui, Bitcoin Githurai), South Africa (Bitcoin Ekasi, Bitcoin Loxion, Bitcoin Karoo, Bitcoin Plett, Bitcoin Sedgefield, Bitcoin Sisonke, Bitcoin Ubuntu, Bitcoin Witsand, Soweto BTC), Nigeria (Bitcoin Anambra, Bitcoin Edo, Bitcoin Ekiti, Bitcoin Ikorodu, Bitcoin Kwara, Calabar Bitcoin), Ghana (Bitcoin Aves, Bitcoin Dua, Bitfiasi, College BTC), Tanzania (Bitcoin Arusha), Uganda (Bitcoin Kampala), Zambia (Bitcoin Campus, Bitcoin Victoria Falls), Mozambique (Bitcoin Famba), Botswana (Ola Bitcoin), Burundi (Bitcoin Shule), DRC (Kiveclair), Malawi (Women of Satoshi Cooperative). Each project has its own merchants, users, and verifiable activity. We don't have aggregate African user counts — but the claim that "no one" uses Bitcoin in Africa is straightforwardly contradicted by 37 organized communities.$txt$,
 $txt$FBCE registrerer 37+ aktive prosjekter i minst 12 afrikanske land. Hvert prosjekt har sine egne kjøpmenn, brukere og verifiserbar aktivitet. Vi har ikke aggregerte afrikanske brukertall — men påstanden om at "ingen" bruker Bitcoin i Afrika motbevises av 37 organiserte samfunn.$txt$,
 'FBCE African community directory', 'https://fbce.io/find-bces', '2025-01-01', CURRENT_DATE,
 $txt$37+ documented BCEs across 12+ African countries. Each one has merchants, users, and verifiable activity. List them by country if pressed. Be honest that we don't have aggregate user counts.$txt$,
 $txt$37+ dokumenterte BCE-er i 12+ afrikanske land. Hver har butikker, brukere og verifiserbar aktivitet. Vær ærlig om at vi ikke har aggregerte brukertall.$txt$,
 ARRAY['africa','kenya','south-africa','nigeria','ghana','adoption','fbce'], 'medium');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin doesn''t serve indigenous or marginalized communities',
 'Bitcoin tjener ikke urfolk eller marginaliserte samfunn',
 $txt$Counter-examples are extensive and documented. La IslaBTC operates in Cuba's Isla de la Juventud. Lago Bitcoin (Bitcoin Lake) serves Mayan communities around Lake Atitlán in Guatemala. Mayan Bitcoin operates in the Yucatán peninsula. Women of Satoshi Cooperative operates in Lilongwe, Malawi as a women-led economic project. Bitcoin Loxion operates in Khayelitsha, one of South Africa's largest informal settlements. YesBitcoinHaiti serves rural Haiti, where banking infrastructure is minimal. MOTIV operates across multiple Peruvian indigenous communities. The pattern is consistent: Bitcoin Circular Economies emerge MOST in places where traditional finance has failed marginalized communities. We don't have aggregate impact metrics — but the projects exist and serve specific marginalized populations.$txt$,
 $txt$Mot-eksempler er omfattende og dokumenterte. Lago Bitcoin tjener Maya-samfunn rundt Atitlán-sjøen i Guatemala. Mayan Bitcoin opererer på Yucatán-halvøya. Women of Satoshi Cooperative opererer i Lilongwe, Malawi. Bitcoin Loxion opererer i Khayelitsha. Mønsteret er konsekvent: BCE-er oppstår MEST der tradisjonell finans har sviktet marginaliserte samfunn.$txt$,
 'FBCE community profiles', 'https://fbce.io/find-bces', '2025-01-01', CURRENT_DATE,
 $txt$Specific cases: Lago Bitcoin (Mayan), Mayan Bitcoin (Yucatán), Women of Satoshi (Malawi), Bitcoin Loxion (Khayelitsha), YesBitcoinHaiti, MOTIV (indigenous Peru). Bitcoin emerges WHERE finance fails. Be honest about lack of aggregate metrics.$txt$,
 $txt$Konkrete saker: Lago Bitcoin (Maya), Mayan Bitcoin (Yucatán), Women of Satoshi (Malawi), Bitcoin Loxion (Khayelitsha).$txt$,
 ARRAY['indigenous','marginalized','women','mayan','financial-inclusion','fbce'], 'medium');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin Circular Economies don''t actually exist',
 'Bitcoin sirkulære økonomier eksisterer ikke',
 $txt$The Federation of Bitcoin Circular Economies maintains a public, browsable directory of 79+ documented circular economies. By definition, a Bitcoin Circular Economy is one where Bitcoin moves through every level of the local economy: workers earn it, vendors receive it, suppliers accept it. This is a stricter standard than "merchants accept it as a payment option." The directory is geographically distributed: 37+ in Africa, 23+ in Latin America & Caribbean, 9 in Europe, 8 in North America, 3 in Asia. Each project has its own website, social channels (X/Nostr), and verifiable on-chain activity. We don't claim BCEs operate at "scale" — 79 globally is real but not large in commercial terms. The "don't exist" claim is empirically falsifiable, and falsified.$txt$,
 $txt$FBCE vedlikeholder en offentlig, søkbar katalog over 79+ dokumenterte sirkulære økonomier. Per definisjon er en Bitcoin sirkulær økonomi en der Bitcoin beveger seg gjennom hvert nivå i lokaløkonomien. Vi hevder ikke BCE-er opererer i "skala" — 79 globalt er reelt men ikke stort i kommersielle termer. "Eksisterer ikke"-påstanden er empirisk falsifisert.$txt$,
 'Federation of Bitcoin Circular Economies', 'https://fbce.io/find-bces', '2025-01-01', CURRENT_DATE,
 $txt$Definitions matter. BCE = Bitcoin moves through every level (workers, vendors, suppliers). 79+ documented. Browsable at fbce.io/find-bces. Be honest: this is "exists," not "at scale."$txt$,
 $txt$Definisjoner betyr noe. BCE = Bitcoin beveger seg gjennom hvert nivå. 79+ dokumentert. Vær ærlig: dette er "eksisterer," ikke "i skala."$txt$,
 ARRAY['circular-economy','fbce','definition','adoption','existence'], 'medium');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='adoption'), 'published',
 'Lightning Network has no real-world adoption',
 'Lightning Network har ingen reell adopsjon',
 $txt$Most Bitcoin Circular Economies run on Lightning Network for everyday transactions. Bitcoin Beach pioneered Lightning-based local payments via the Bitcoin Beach Wallet (later evolved into Blink). Bitcoin Jungle in Costa Rica is explicitly built on the Bitcoin Lightning Network as an open-source community project. Bitcoin Ekasi, Bitcoin Loxion, Praia Bitcoin, Lago Bitcoin, MOTIV, Bitcoin Famba — all use Lightning for sub-second, sub-cent payments suitable for everyday spending. Lightning is what makes Bitcoin practical as actual currency in these communities, not just store of value. We don't claim Lightning has Visa-scale aggregate volume — but it is in production use across dozens of community economies.$txt$,
 $txt$De fleste Bitcoin sirkulære økonomier bruker Lightning Network for hverdagstransaksjoner. Bitcoin Beach pionerte Lightning-baserte lokale betalinger via Bitcoin Beach Wallet (Blink). Bitcoin Jungle er eksplisitt bygget på Bitcoin Lightning Network. Bitcoin Ekasi, Bitcoin Loxion, Praia Bitcoin, Lago Bitcoin, MOTIV — alle bruker Lightning for sub-sekund, sub-cent betalinger. Vi hevder ikke at Lightning har Visa-skala volum — men det er i produksjonsbruk.$txt$,
 'Bitcoin Jungle / Bitcoin Beach Wallet (Blink) / FBCE directory', 'https://www.bitcoinjungle.app', '2024-01-01', CURRENT_DATE,
 $txt$Lightning powers most BCEs: Bitcoin Beach (via Blink), Bitcoin Jungle, Bitcoin Ekasi, Lago Bitcoin, Praia. Sub-second, sub-cent payments. In production, not theoretical.$txt$,
 $txt$Lightning driver de fleste BCE-ene: Bitcoin Beach, Bitcoin Jungle, Bitcoin Ekasi, Lago Bitcoin. Sub-sekund, sub-cent betalinger.$txt$,
 ARRAY['lightning','adoption','blink','bitcoin-beach','bitcoin-jungle','fbce'], 'medium');
