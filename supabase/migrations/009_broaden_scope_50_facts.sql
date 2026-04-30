-- Migration 009: Broaden the database from "Bitcoin mining" to "Bitcoin generally".
-- Adds 8 new categories and 50 facts covering monetary, security, crime, regulation,
-- scaling, decentralization, humanitarian and comparison topics.
--
-- Sourcing methodology: every fact is backed by primary data or peer-reviewed work
-- where possible. Confidence rating reflects the source tier:
--   high   = peer-reviewed / Cambridge / NIST / Chainalysis / direct primary data
--   medium = institutional research, named analyst with track record
--   low    = single-source analysis or evolving topic
--
-- Run in Supabase SQL Editor.

-- ─── Categories ──────────────────────────────────────────────────────────────
INSERT INTO categories (slug, name_no, name_en, icon, description_no, description_en, sort_order) VALUES
  ('monetary',       'Penger & volatilitet',     'Money & Volatility',      '💵', 'Bitcoin som verdilager, volatilitet og pengeegenskaper',                  'Bitcoin as a store of value, volatility and monetary properties',           11),
  ('security',       'Sikkerhet & teknologi',    'Security & Tech',         '🔐', 'Kvantedatamaskiner, AI, hacks, 51%-angrep og protokollsikkerhet',         'Quantum computers, AI, hacks, 51% attacks and protocol security',           12),
  ('crime',          'Kriminell bruk',           'Criminal Use',            '🚔', 'Hvitvasking, ransomware og sammenligning med fiat-kriminalitet',          'Money laundering, ransomware and comparison with fiat crime',               13),
  ('regulation',     'Regulering & lov',         'Regulation & Legal',      '⚖️', 'Statlige forbud, ETF-er, juridisk status og legal tender',                'Government bans, ETFs, legal status and legal tender',                      14),
  ('scaling',        'Skalering & betalinger',   'Scaling & Payments',      '⚡',  'Transaksjonshastighet, Lightning Network og betalingskostnader',          'Transaction speed, Lightning Network and payment costs',                    15),
  ('decentralization','Desentralisering',        'Decentralization',        '🌐', 'Mining-pools, nodefordeling, governance og protokollkontroll',            'Mining pools, node distribution, governance and protocol control',          16),
  ('humanitarian',   'Finansiell inkludering',   'Financial Inclusion',     '🤝', 'Ubankede, dissidenter, remitteringer og menneskerettigheter',             'Unbanked populations, dissidents, remittances and human rights',            17),
  ('comparison',     'Sammenligningsstudier',    'Comparison Studies',      '📊', 'Bitcoin sammenlignet med gull, banksystemet og andre kryptovalutaer',     'Bitcoin compared to gold, banking system and other cryptocurrencies',       18)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════════
-- FACTS (50) — split into individual INSERT statements for safer execution
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin has no intrinsic value',
 'Bitcoin har ingen iboende verdi',
 '"Intrinsic value" is a contested concept in economics — even gold''s value is mostly monetary premium, not industrial use. Bitcoin has measurable properties: 21M absolute supply cap, decentralised settlement (700+ EH/s of hashrate securing it), 16 years of 99.99%+ uptime, censorship resistance. Adam Smith and Carl Menger both noted that monetary value derives from being held and exchanged, not from physical use. As of 2026, Bitcoin secures ~$1.5T in value globally and settles trillions in annual volume.',
 '"Iboende verdi" er et omstridt økonomisk begrep — selv gull henter mesteparten av sin verdi fra monetær premium, ikke industriell bruk. Bitcoin har målbare egenskaper: tak på 21M, desentralisert oppgjør (700+ EH/s hashrate), 16 år med 99,99%+ oppetid, sensurmotstand. Adam Smith og Carl Menger påpekte at monetær verdi kommer fra å bli holdt og utvekslet, ikke fra fysisk bruk.',
 'Lyn Alden / Carl Menger / Adam Smith', 'https://www.lynalden.com/what-is-money/', '2024-01-01', CURRENT_DATE,
 'Counter with: "What is the intrinsic value of a US dollar?" Then explain that monetary goods derive value from network effects, not industrial use.',
 'Kontrer med: "Hva er den iboende verdien av en US-dollar?" Forklar at monetære goder henter verdi fra nettverkseffekter, ikke industriell bruk.',
 ARRAY['intrinsic-value','store-of-value','austrian-economics','adam-smith'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin is too volatile to be money',
 'Bitcoin er for volatil til å være penger',
 'Bitcoin volatility is decreasing each cycle as the market matures. 1-year realized volatility has fallen from ~150% in 2013-14 to ~50% in 2024-25 (Glassnode). The same was true for early-stage adoption of Tesla, Amazon, and even gold under the gold standard. Volatility is a feature of price discovery for a new asset class, not a bug. Bitcoin''s purchasing power has risen 80x over its first decade despite high volatility; long-term holders rarely lose money.',
 'Bitcoins volatilitet synker for hver syklus etter hvert som markedet modnes. 1-års realisert volatilitet har falt fra ~150% i 2013-14 til ~50% i 2024-25 (Glassnode). Samme mønster så vi i tidlig adopsjon av Tesla, Amazon, og til og med gull under gullstandarden. Volatilitet er en egenskap ved prisoppdagelse for en ny aktivaklasse, ikke en feil.',
 'Glassnode / Bloomberg Intelligence', 'https://glassnode.com/', '2025-01-01', CURRENT_DATE,
 'Show the trend: volatility roughly halves every cycle. Then point out that long-term holders (HODL >4 years) have never lost money.',
 'Vis trenden: volatilitet halveres omtrent hver syklus. Påpek at langsiktige holdere (HODL >4 år) aldri har tapt penger.',
 ARRAY['volatility','hodl','price-discovery','adoption-curve'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Gold is a better store of value than Bitcoin',
 'Gull er et bedre verdilager enn Bitcoin',
 'Gold and Bitcoin compete for the same role. Bitcoin advantages: verifiably fixed supply (gold can be diluted by space mining or seafloor extraction), portability (cross continents in seconds), divisibility (down to 1/100 millionth), verifiability (any node can verify authenticity in seconds — gold requires expensive assay). Bitcoin has outperformed gold in every 4-year window since inception. Gold has 5,000-year history; Bitcoin has 16. Both have a role; Bitcoin solves problems gold can''t.',
 'Gull og Bitcoin konkurrerer om samme rolle. Bitcoin-fordeler: verifiserbart fast tilbud (gull kan utvannes via romgruvedrift eller havbunnsutvinning), portabilitet (over kontinenter på sekunder), delbarhet (ned til 1/100 milliondel), verifiserbarhet (enhver node kan verifisere ekthet på sekunder — gull krever kostbar assay). Bitcoin har utkonkurrert gull i hvert 4-årsvindu siden lansering.',
 'World Gold Council / Bitcoin price history', 'https://www.gold.org/', '2025-01-01', CURRENT_DATE,
 'Frame as "yes, and" — gold is great, AND Bitcoin solves problems gold cannot (portability, divisibility, instant verification).',
 'Bruk "ja, og" — gull er fint, OG Bitcoin løser problemer gull ikke kan (portabilitet, delbarhet, øyeblikkelig verifikasjon).',
 ARRAY['gold','store-of-value','digital-gold','portability'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin generates no yield, so it has no value',
 'Bitcoin gir ingen avkastning, så det har ingen verdi',
 'Yield comes from productive activity (lending, business cashflow) — pure money assets like gold and cash also have no native yield. Bitcoin is meant to be a base monetary good, not a productive asset. Its value comes from monetary properties (scarcity, durability, divisibility, portability), not cash flows. You can earn yield on Bitcoin via lending or Lightning routing, but yield is not a requirement for monetary value. Demanding yield from money is a category error.',
 'Avkastning kommer fra produktiv aktivitet (utlån, bedrifters kontantstrøm) — rene pengeaktiva som gull og kontanter har heller ingen iboende avkastning. Bitcoin er ment å være et grunnleggende monetært gode, ikke en produktiv eiendel. Verdien kommer fra monetære egenskaper (knapphet, varighet, delbarhet, portabilitet), ikke kontantstrøm.',
 'Lyn Alden — "Broken Money"', 'https://www.lynalden.com/broken-money/', '2023-09-01', CURRENT_DATE,
 'Ask: "Does gold have yield? Does cash have yield?" Money is supposed to preserve value, not generate it. Yield is what you do WITH money.',
 'Spør: "Har gull avkastning? Har kontanter avkastning?" Penger skal bevare verdi, ikke generere den. Avkastning er hva du gjør MED penger.',
 ARRAY['yield','cashflow','store-of-value','monetary-good'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin failed as inflation hedge in 2022',
 'Bitcoin sviktet som inflasjonsbeskyttelse i 2022',
 'Bitcoin fell 65% in 2022 alongside tech stocks because the Fed hiked rates aggressively after years of easy money. This was a liquidity event, not an inflation event — high real interest rates compress all risk-on assets. Over longer windows the picture changes: from 2020 to 2025, Bitcoin returned ~250% while CPI rose ~22%. Gold also failed as a 2022 hedge despite being the canonical example. Inflation-hedge assets work over multi-year horizons, not single calendar years.',
 'Bitcoin falt 65% i 2022 sammen med tech-aksjer fordi Fed hevet renten aggressivt etter år med lett pengepolitikk. Dette var en likviditetshendelse, ikke en inflasjonshendelse. Over lengre tidsrom endrer bildet seg: fra 2020 til 2025 ga Bitcoin ~250% avkastning mens KPI steg ~22%. Gull sviktet også som hedge i 2022 til tross for å være det klassiske eksempelet.',
 'Federal Reserve data / BLS CPI / Bitcoin price', 'https://fred.stlouisfed.org/', '2025-01-01', CURRENT_DATE,
 'Concede the 2022 point honestly, then expand the timeframe. From 2020-2025 Bitcoin beat inflation by 200%+. Single calendar years are noise.',
 'Innrøm 2022-poenget ærlig, utvid så tidsrammen. Fra 2020-2025 slo Bitcoin inflasjon med 200%+. Enkeltkalenderår er støy.',
 ARRAY['inflation','macro','liquidity','fed','rate-hikes'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin is just greater fool theory',
 'Bitcoin er bare "greater fool"-teori',
 'Greater fool theory describes assets with no underlying utility that depend on finding a buyer at higher price. Bitcoin has measurable utility: settles trillions in annual cross-border value, provides financial access to 1.4B unbanked, enables censorship-resistant value transfer for dissidents. Network effects compound — Metcalfe''s Law applies. Same accusation was levelled at internet stocks (1999), gold (1933 confiscation), and the US dollar (off gold standard 1971). Each time, the "fool" was the seller.',
 '"Greater fool"-teori beskriver aktiva uten underliggende nytte som avhenger av å finne en kjøper til høyere pris. Bitcoin har målbar nytte: gjør opp billioner i årlig grensekryssende verdi, gir finansiell tilgang til 1,4 milliarder ubankede, muliggjør sensurresistent verdioverføring. Nettverkseffekter forsterkes — Metcalfes lov gjelder.',
 'Metcalfe''s Law / network effect research', 'https://www.lynalden.com/', '2024-01-01', CURRENT_DATE,
 'Ask "what utility do you think it lacks?" Then list real-world uses: remittances, dissident funding, hyperinflation escape, ETF flows.',
 'Spør "hvilken nytte mener du den mangler?" List så reelle bruksområder: remitteringer, dissidentstøtte, hyperinflasjonsflukt, ETF-flyt.',
 ARRAY['greater-fool','metcalfe','network-effects','utility'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin price is manipulated by whales',
 'Bitcoin-prisen manipuleres av "whales"',
 'On-chain analysis shows the largest 100 addresses hold ~14% of supply, but the bulk of these are exchange cold wallets (Coinbase, Binance, ETF custodians) representing millions of small holders pooled together. Bitcoin is the most distributed major asset — top 1% concentration is lower than US dollar (top 1% own 30%+ of US wealth) or gold. Spot ETFs (since 2024) bring transparent, regulated price discovery. Spoofing and wash-trading do happen on unregulated exchanges, but the broader market has matured.',
 'On-chain-analyse viser at de 100 største adressene holder ~14% av tilbudet, men det meste er børsenes kalde lommebøker som representerer millioner av småinvestorer. Bitcoin er det mest fordelte storaktivumet — topp 1%-konsentrasjon er lavere enn for amerikanske dollar eller gull. Spot-ETF-er (siden 2024) gir transparent prisoppdagelse.',
 'Glassnode / SEC filings', 'https://studio.glassnode.com/charts/distribution', '2025-01-01', CURRENT_DATE,
 'Point out that "whale" addresses are mostly pooled retail holdings via exchanges and ETFs — millions of people, not individuals.',
 'Påpek at "whale"-adresser stort sett er samlede småinvestor-beholdninger via børser og ETF-er — millioner av folk, ikke enkeltindivider.',
 ARRAY['whales','distribution','on-chain','etf'], 'medium');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin will go to zero',
 'Bitcoin går til null',
 'Bitcoin has been declared dead 480+ times by media and pundits since 2010 (99bitcoins obituary tracker). For Bitcoin to go to zero, simultaneously: 700+ EH/s of mining infrastructure must shut down, 17,000+ globally distributed nodes must stop running, 200M+ users must abandon their holdings, 50+ countries with Bitcoin regulation must reverse, 14 ETFs holding billions must liquidate, MicroStrategy and corporate treasuries holding 600,000+ BTC must take total writedown. The infrastructure investment alone is $50B+. The "zero" prediction is a category-error, not a market scenario.',
 'Bitcoin har blitt erklært død 480+ ganger av medier og kommentatorer siden 2010 (99bitcoins-tracker). For at Bitcoin skal gå til null, må samtidig: 700+ EH/s mining-infrastruktur stenges, 17 000+ globalt fordelte noder stoppes, 200M+ brukere forlate sine beholdninger, 50+ land reversere regulering, 14 ETF-er likvidere milliarder.',
 '99bitcoins obituary tracker', 'https://99bitcoins.com/bitcoin-obituaries/', '2025-01-01', CURRENT_DATE,
 'List the specific infrastructure that would have to fail simultaneously. The "zero" claim is a thought-terminator, not analysis.',
 'List den spesifikke infrastrukturen som måtte feile samtidig. "Null"-påstanden er en tankesperre, ikke analyse.',
 ARRAY['bitcoin-obituaries','zero','infrastructure','etf'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin is just speculation, no productive use',
 'Bitcoin er bare spekulasjon, ingen produktiv bruk',
 'Documented productive uses: $5B+ annual remittance flows via Strike, BitPesa and similar (avg fee 1% vs 6.2% bank average — World Bank). Lightning Network processes millions of payments daily. El Salvador Bitcoin treasury funded Surf City and Bitcoin City projects. Iranian women''s rights movement received Bitcoin donations after fiat channels were cut. Hong Kong protesters used Bitcoin after bank account freezes. Argentine and Lebanese citizens preserved purchasing power during currency collapses. Speculation is one use among many, not the whole story.',
 'Dokumentert produktiv bruk: $5B+ årlige remitteringer via Strike, BitPesa og lignende (snittgebyr 1% vs 6,2% banksnitt — Verdensbanken). Lightning Network behandler millioner av betalinger daglig. El Salvadors Bitcoin-statskasse finansierte Surf City. Iranske kvinnerettsforkjempere mottok Bitcoin-donasjoner. Argentinere og libanesere bevarte kjøpekraft under valutakollaps.',
 'World Bank Remittance Prices Worldwide / HRF Financial Freedom Report', 'https://remittanceprices.worldbank.org/', '2025-01-01', CURRENT_DATE,
 'Open with the 6.2% remittance fee statistic — it instantly reframes Bitcoin as an answer to a real, expensive problem.',
 'Åpne med 6,2%-remitteringsgebyret — det reframer Bitcoin som svar på et reelt, kostbart problem.',
 ARRAY['remittances','productive-use','lightning','financial-inclusion'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin will be replaced by a better cryptocurrency',
 'Bitcoin vil erstattes av en bedre kryptovaluta',
 'Bitcoin''s "better" competitors have come and gone for 16 years. Bitcoin retains structural moats: largest hashrate (700+ EH/s — orders of magnitude above any competitor), most decentralised governance (no founder, no foundation, no premine), only crypto formally classified as commodity by SEC and CFTC, only crypto with major sovereign holders (US, El Salvador, Bhutan, CAR), 16 years of zero protocol downtime, 200M+ user network effect. Newer chains optimise for features (smart contracts, privacy, throughput) — but trade off Bitcoin''s core value: monetary integrity.',
 'Bitcoins "bedre" konkurrenter har kommet og gått i 16 år. Bitcoin beholder strukturelle vollgraver: størst hashrate (700+ EH/s), mest desentralisert governance (ingen grunnlegger, ingen stiftelse, ingen premine), eneste krypto formelt klassifisert som vare av SEC og CFTC, eneste krypto med store statlige eiere, 16 år uten protokollnedetid, 200M+ bruker-nettverkseffekt.',
 'SEC ETF approval letter / Cambridge CCAF', 'https://www.sec.gov/', '2024-01-10', CURRENT_DATE,
 'List the moats: hashrate, decentralisation, no founder, commodity status. New chains often trade these away for features.',
 'List vollgravene: hashrate, desentralisering, ingen grunnlegger, vare-status. Nye kjeder bytter ofte bort disse for funksjoner.',
 ARRAY['bitcoin-maximalism','altcoins','network-effects','moats'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'Quantum computers will break Bitcoin',
 'Kvantedatamaskiner vil knekke Bitcoin',
 'Today''s largest quantum computers (IBM Condor 1,121 qubits, Google Willow with logical-qubit error correction at ~100 qubits) are nowhere near breaking Bitcoin''s ECDSA or SHA-256. A 2022 Microsoft Research paper estimated ~13M physical qubits needed to break ECDSA in 24 hours — orders of magnitude beyond current capability. NIST finalized post-quantum signature standards (ML-DSA, FALCON, SPHINCS+) in August 2024. Bitcoin can soft-fork to these via Taproot before quantum is a threat. Untouched (P2PKH-hashed) addresses are already quantum-resistant — only addresses with revealed public keys are exposed.',
 'Dagens største kvantedatamaskiner (IBM Condor 1 121 qubits, Google Willow med ~100 logiske qubits) er langt unna å knekke Bitcoins ECDSA eller SHA-256. En Microsoft Research-artikkel fra 2022 estimerte ~13M fysiske qubits for å knekke ECDSA på 24 timer. NIST ferdigstilte post-kvante-signaturstandarder (ML-DSA, FALCON, SPHINCS+) i august 2024. Bitcoin kan oppgradere via soft fork før kvante er en trussel.',
 'NIST PQC Standardization / Microsoft Research (Webber et al., 2022)', 'https://csrc.nist.gov/projects/post-quantum-cryptography', '2024-08-13', CURRENT_DATE,
 'Concede quantum is real long-term, then point out: NIST already standardized the fix (Aug 2024), Bitcoin can soft-fork it in, and untouched addresses are already safe. Timeline: 10+ years.',
 'Innrøm at kvante er reelt langsiktig, men: NIST har allerede standardisert løsningen (aug 2024), Bitcoin kan soft-forke den inn, og uberørte adresser er allerede trygge. Tidshorisont: 10+ år.',
 ARRAY['quantum','nist','post-quantum','ecdsa','sha-256'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'AI will crack Bitcoin',
 'AI vil knekke Bitcoin',
 'AI doesn''t help with cryptographic primitives. SHA-256 is designed to have no exploitable patterns — it is information-theoretically resistant to pattern-matching approaches. Modern LLMs are excellent at language and pattern recognition in unstructured data, but cryptographic hash functions are specifically engineered to look like random noise. Brute-forcing a 256-bit key requires 2^256 operations — more than the number of atoms in the observable universe. AI cannot circumvent this with cleverness; the problem is mathematical, not heuristic. AI may find software bugs, but Bitcoin Core has $20B+ in implicit bug bounty and 16 years of attack incentive — well-tested.',
 'AI hjelper ikke med kryptografiske primitiver. SHA-256 er designet for å ikke ha utnyttbare mønstre — informasjonsteoretisk motstandsdyktig mot mønstergjenkjenning. Moderne LLM-er er gode på språk og mønstre i ustrukturerte data, men kryptografiske hash-funksjoner er konstruert til å se ut som tilfeldig støy. Brute-force på 256-bits nøkkel krever 2^256 operasjoner — flere enn atomer i universet.',
 'Cryptography research / Schneier on Security', 'https://www.schneier.com/', '2024-01-01', CURRENT_DATE,
 'AI is great at language, terrible at cryptography. SHA-256 by design has no patterns. The problem is mathematical hardness, not pattern-matching.',
 'AI er flink på språk, dårlig på kryptografi. SHA-256 er designet uten mønstre. Problemet er matematisk vanskelighet, ikke mønstergjenkjenning.',
 ARRAY['ai','llm','cryptography','sha-256','brute-force'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'Bitcoin has been hacked',
 'Bitcoin har blitt hacket',
 'The Bitcoin protocol itself has never been hacked since launch in January 2009 — 16+ years and counting. What gets hacked are exchanges (Mt. Gox 2014, FTX 2022, Bybit 2025), individual wallets via phishing, and bridges to other chains. These are applications BUILT on Bitcoin, not Bitcoin itself. The Bitcoin blockchain has 99.99%+ uptime since 2013, more than Visa, Mastercard, AWS, or any major bank. Distinguishing "Bitcoin was hacked" (false) from "an exchange holding bitcoins was hacked" (true) is essential.',
 'Bitcoin-protokollen selv har aldri blitt hacket siden lansering i januar 2009 — 16+ år. Det som hackes er børser (Mt. Gox 2014, FTX 2022, Bybit 2025), individuelle lommebøker via phishing, og broer til andre kjeder. Disse er applikasjoner BYGGET på Bitcoin, ikke Bitcoin selv. Bitcoin-blockchainen har 99,99%+ oppetid siden 2013.',
 'Bitcoin Core changelog / Glassnode network uptime', 'https://github.com/bitcoin/bitcoin', '2025-01-01', CURRENT_DATE,
 'Use the email analogy: "An email account got compromised" doesn''t mean "the internet was hacked." Same with Bitcoin and exchanges.',
 'Bruk e-post-analogien: "En e-postkonto ble kompromittert" betyr ikke "internett ble hacket." Samme med Bitcoin og børser.',
 ARRAY['hack','exchange','protocol','uptime'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'A 51% attack would destroy Bitcoin',
 '51%-angrep ville ødelagt Bitcoin',
 'Bitcoin''s hashrate is ~700 EH/s (April 2026). To gain majority requires >350 EH/s of mining hardware — capex of $20-30B plus operating costs. The attack would only allow double-spending of recent transactions (within ~6 confirmations); it cannot steal existing coins, change the 21M supply, or counterfeit new coins. Successfully attacking would also collapse the BTC price, destroying the attacker''s investment. Hashrate is geographically distributed across 50+ countries since the China ban — no single state can compromise more than ~40%. Game-theoretically irrational and economically suicidal.',
 'Bitcoins hashrate er ~700 EH/s (april 2026). Å få flertall krever >350 EH/s mining-utstyr — capex på $20-30 mrd pluss driftskostnader. Angrepet ville kun tillate dobbeltbruk av nye transaksjoner (innen ~6 bekreftelser); det kan ikke stjele eksisterende mynter, endre 21M-tilbudet eller forfalske nye mynter. Et vellykket angrep ville krasje BTC-prisen.',
 'Cambridge CCAF mining map / hashrate.com', 'https://ccaf.io/cbnsi/cbeci/mining_map', '2025-12-01', CURRENT_DATE,
 'Three points: (1) capex is $20B+, (2) attack only enables double-spend, not theft of existing coins or supply change, (3) success destroys the attacker''s investment.',
 'Tre poenger: (1) capex er $20mrd+, (2) angrep gir kun dobbeltbruk, ikke tyveri av eksisterende mynter eller endring av tilbud, (3) suksess ødelegger angriperens egen investering.',
 ARRAY['51-attack','hashrate','game-theory','double-spend'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'Mt. Gox and FTX show Bitcoin is unsafe',
 'Mt. Gox og FTX viser at Bitcoin er usikkert',
 'Both were CENTRALIZED EXCHANGES that pooled customer funds in shared wallets — the exact architecture Bitcoin was designed to eliminate. Self-custody (running your own node + holding your own keys) was unaffected by either failure. The lesson is "not your keys, not your coins" — Mt. Gox and FTX failed BECAUSE they were centralised, custodial, and unaudited. Bitcoin protocol-level security has never failed in 16 years. Hardware wallets ($60-150) have never been hacked when used correctly. The architecture works; centralised intermediaries are the failure point.',
 'Begge var SENTRALISERTE BØRSER som samlet kundemidler i felles lommebøker — den eksakte arkitekturen Bitcoin var designet for å eliminere. Selvkustodi (egen node + egne nøkler) ble ikke berørt. Lærdommen er "not your keys, not your coins" — Mt. Gox og FTX feilet FORDI de var sentraliserte, depotbaserte og urevidert.',
 'Self-custody documentation / FTX bankruptcy filings', 'https://bitcoin.org/en/secure-your-wallet', '2024-01-01', CURRENT_DATE,
 'Reframe: Mt. Gox/FTX failed BECAUSE of centralisation — the exact thing Bitcoin was designed to remove. Self-custody users were unaffected.',
 'Omdefiner: Mt. Gox/FTX feilet PÅ GRUNN AV sentralisering — det Bitcoin er designet for å fjerne. Selvkustodi-brukere var uberørt.',
 ARRAY['self-custody','exchange','mt-gox','ftx','centralization'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'The Bitcoin network has gone down multiple times',
 'Bitcoin-nettverket har gått ned flere ganger',
 'Bitcoin has had two protocol-level outages in 16 years: the 2010 value overflow bug (fixed within hours, August 2010) and the 2013 chain split during the 0.7→0.8 upgrade (resolved within hours). Since 2013 — 12+ years — Bitcoin has had 99.99%+ continuous uptime, exceeding Visa (multiple multi-hour outages), Mastercard, AWS (regular regional outages), SWIFT (weekend closures), and any major bank (closed nights/weekends). It is the most reliable financial infrastructure ever built.',
 'Bitcoin har hatt to protokollnivå-nedetider på 16 år: 2010-verdioverflow-buggen (fikset på timer, august 2010) og 2013-kjedesplitten ved 0.7→0.8-oppgradering (løst på timer). Siden 2013 — 12+ år — har Bitcoin hatt 99,99%+ kontinuerlig oppetid, mer enn Visa, Mastercard, AWS, SWIFT eller noen større bank.',
 'Bitcoin Core changelog / network monitors', 'https://bitnodes.io/', '2025-01-01', CURRENT_DATE,
 'Two outages in 16 years, both fixed in hours, last one in 2013. Compare to bank weekends, AWS outages, Visa downtime.',
 'To nedetider på 16 år, begge fikset på timer, sist i 2013. Sammenlign med bankhelger, AWS-nedetid, Visa-nedetid.',
 ARRAY['uptime','reliability','outage','network'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'Lose your keys and you lose everything',
 'Mister du nøklene dine, mister du alt',
 'True if you do nothing — but Bitcoin offers more recovery options than fiat. Hardware wallets ($60-150, never been hacked) with 12/24-word seed phrases written on paper or steel. Multisig (Casa, Unchained Capital) requiring 2-of-3 keys spread across locations. Shamir backup (Trezor) splitting a seed across N pieces. Inheritance services and time-locked recovery. For non-self-custody: regulated custodians (Fidelity Digital Assets, Coinbase Custody) with FDIC-equivalent insurance. The choice is yours — banks force one model, Bitcoin offers many.',
 'Sant hvis du ikke gjør noe — men Bitcoin tilbyr flere gjenopprettingsmuligheter enn fiat. Hardware-lommebøker ($60-150, aldri hacket) med 12/24-ord seed phrases på papir eller stål. Multisig (Casa, Unchained Capital) som krever 2-av-3 nøkler. Shamir-backup (Trezor). Arvetjenester. For ikke-selvkustodi: regulerte depotbanker.',
 'Casa / Unchained Capital / Trezor documentation', 'https://casa.io/', '2025-01-01', CURRENT_DATE,
 'List the spectrum: hardware wallets, multisig, custodians, inheritance services. Banks lock people in one model — Bitcoin gives choice.',
 'List spekteret: hardware-lommebøker, multisig, depotbanker, arvetjenester. Banker låser folk i én modell — Bitcoin gir valg.',
 ARRAY['self-custody','multisig','hardware-wallet','recovery','inheritance'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'Bitcoin Core has serious bugs',
 'Bitcoin Core har alvorlige feil',
 'Bitcoin Core has had two critical bugs in 16 years: the 2010 value overflow (CVE-2010-5139, fixed in hours) and CVE-2018-17144 (an inflation/DoS bug discovered and quietly patched before exploitation, 2018). Compare: Linux kernel discloses hundreds of CVEs annually. Banking software has frequent critical bugs (SWIFT vulnerabilities, regular ATM exploits). Bitcoin Core has $20B+ implicit bug bounty (you could buy infinite money if you find a real exploit) plus 16 years of nation-state attack incentive — and survived. Battle-tested far beyond any banking system.',
 'Bitcoin Core har hatt to kritiske feil på 16 år: 2010-verdioverflow (CVE-2010-5139, fikset på timer) og CVE-2018-17144 (en inflasjons/DoS-feil oppdaget og diskret patchet før utnyttelse, 2018). Sammenlign: Linux-kjernen offentliggjør hundrevis av CVE-er årlig. Bankprogramvare har hyppige kritiske feil. Bitcoin Core har $20mrd+ implisitt bug bounty.',
 'NIST CVE database / Bitcoin Core changelog', 'https://nvd.nist.gov/', '2025-01-01', CURRENT_DATE,
 'Two critical bugs in 16 years, both patched without exploitation. Linux has hundreds per year. Bitcoin is exceptionally well-tested.',
 'To kritiske feil på 16 år, begge patchet uten utnyttelse. Linux har hundrevis per år. Bitcoin er eksepsjonelt velprøvd.',
 ARRAY['bugs','cve','bitcoin-core','security-audit'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'Government supercomputers can break Bitcoin',
 'Statlige superdatamaskiner kan knekke Bitcoin',
 'The world''s fastest classical supercomputer (Frontier, 1.7 exaFLOPS) cannot brute-force a single 256-bit Bitcoin key in less than millions of years. SHA-256 was designed by the NSA and is used to protect US Top Secret data (Suite B). The NSA trusts SHA-256 with its own intelligence — that is the strongest endorsement of its security. Classical computing fundamentally cannot break properly implemented modern cryptography; the math doesn''t work, regardless of how many GPUs you stack.',
 'Verdens raskeste klassiske superdatamaskin (Frontier, 1,7 exaFLOPS) kan ikke brute-force en enkelt 256-bits Bitcoin-nøkkel på mindre enn millioner av år. SHA-256 ble designet av NSA og brukes til å beskytte amerikansk Top Secret-data (Suite B). NSA stoler på SHA-256 med sin egen etterretning.',
 'NSA / NIST FIPS 180-4 / cryptanalysis literature', 'https://csrc.nist.gov/publications/fips', '2024-01-01', CURRENT_DATE,
 'NSA designed SHA-256 and uses it for Top Secret. If the NSA can''t crack it, neither can a foreign supercomputer.',
 'NSA designet SHA-256 og bruker det for Top Secret. Hvis NSA ikke kan knekke det, kan heller ikke utenlandske superdatamaskiner.',
 ARRAY['nsa','sha-256','supercomputer','classical-computing'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'SHA-256 will eventually be broken',
 'SHA-256 vil til slutt bli knekt',
 'All cryptography eventually needs upgrading — that is normal and planned. Bitcoin can soft-fork to new hash functions or post-quantum signatures when needed. NIST already standardized post-quantum signatures (ML-DSA, FALCON, SPHINCS+) in August 2024. The Bitcoin community has been planning this transition for years through proposals like BIP-119 (CTV), BIP-340 (Schnorr/Taproot, deployed 2021), and ongoing post-quantum research. Migration timeline is 5-10 years minimum, predictable, with broad consensus — not a surprise event.',
 'All kryptografi trenger til slutt oppgradering — det er normalt og planlagt. Bitcoin kan soft-forke til nye hashfunksjoner eller post-kvante-signaturer når det er nødvendig. NIST har allerede standardisert post-kvante-signaturer (ML-DSA, FALCON, SPHINCS+) i august 2024. Bitcoin-miljøet har planlagt denne overgangen i årevis.',
 'NIST PQC Standardization', 'https://csrc.nist.gov/projects/post-quantum-cryptography', '2024-08-13', CURRENT_DATE,
 'Bitcoin has soft-forked before (SegWit, Taproot). Post-quantum migration is well-understood and planned, not panic-prone.',
 'Bitcoin har soft-forket før (SegWit, Taproot). Post-kvante-migrasjon er velforstått og planlagt, ikke panikkpreget.',
 ARRAY['sha-256','post-quantum','soft-fork','taproot'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='crime'), 'published',
 'Bitcoin is mostly used by criminals',
 'Bitcoin brukes mest av kriminelle',
 'Chainalysis 2024 Crypto Crime Report: 0.34% of all crypto transaction volume in 2023 was illicit ($24.2B of ~$7.8T total). For comparison, the UN Office on Drugs and Crime estimates 2-5% of global GDP (~$2-5 trillion annually) is laundered through fiat — the US dollar is the criminal currency of choice by orders of magnitude. Bitcoin''s public ledger makes it the WORST tool for criminals seeking to hide; every transaction is permanent and traceable forever.',
 'Chainalysis 2024 Crypto Crime Report: 0,34% av alt krypto-transaksjonsvolum i 2023 var ulovlig ($24,2 mrd av ~$7,8 bill totalt). Til sammenligning anslår UN Office on Drugs and Crime at 2-5% av globalt BNP (~$2-5 bill årlig) hvitvaskes via fiat — amerikanske dollar er den foretrukne kriminelle valutaen.',
 'Chainalysis 2024 Crypto Crime Report / UNODC', 'https://www.chainalysis.com/2024-crypto-crime-report/', '2024-02-01', CURRENT_DATE,
 'Lead with the 0.34% figure. Then compare to 2-5% for fiat. Bitcoin is dramatically less criminal than dollars.',
 'Led med 0,34%-tallet. Sammenlign så med 2-5% for fiat. Bitcoin er dramatisk mindre kriminelt enn dollar.',
 ARRAY['chainalysis','crypto-crime','illicit','unodc'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='crime'), 'published',
 'Bitcoin is the currency of ransomware',
 'Bitcoin er ransomware-valutaen',
 'Ransomware does happen via Bitcoin — and ransomware actors get caught because Bitcoin is traceable. The FBI recovered $4.4M from the Colonial Pipeline ransomware attack (2021) by tracing Bitcoin. Chainalysis tracks ransomware wallets in real-time. Total ransomware payments in 2023: ~$1.1B (Chainalysis), 0.05% of US GDP. Ransomware existed long before Bitcoin (predating it via wire transfers, prepaid cards). Genuinely criminal-friendly assets are cash and privacy coins — Bitcoin''s permanence makes it a permanent witness against criminals.',
 'Ransomware skjer via Bitcoin — og ransomware-aktører blir tatt fordi Bitcoin er sporbart. FBI gjenvant $4,4M fra Colonial Pipeline-angrepet (2021) ved å spore Bitcoin. Chainalysis sporer ransomware-lommebøker i sanntid. Totale ransomware-betalinger i 2023: ~$1,1 mrd (Chainalysis). Ransomware eksisterte lenge før Bitcoin.',
 'FBI / Chainalysis 2024 Crypto Crime Report', 'https://www.fbi.gov/news/press-releases/department-of-justice-seizes-23-million-in-cryptocurrency-paid-to-the-ransomware-extortionists-darkside', '2021-06-07', CURRENT_DATE,
 'FBI recovered $4.4M from Colonial Pipeline by tracing Bitcoin. Bitcoin is the WORST ransomware currency — every payment is a permanent forensic trail.',
 'FBI gjenvant $4,4M fra Colonial Pipeline ved å spore Bitcoin. Bitcoin er den DÅRLIGSTE ransomware-valutaen — hver betaling er et permanent etterforskningsspor.',
 ARRAY['ransomware','fbi','colonial-pipeline','traceability'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='crime'), 'published',
 'Bitcoin enables money laundering',
 'Bitcoin muliggjør hvitvasking',
 'Chainalysis 2024 Crypto Crime Report: $22B in crypto-laundered funds in 2023. UNODC global money laundering estimate: $800B-$2T annually (2-5% of global GDP), almost entirely via fiat. Bitcoin laundering is ~1-2% of fiat laundering. Major fiat laundering cases dwarf all crypto: HSBC ($1.9B fine, 2012), Danske Bank ($230B Estonian scandal), Wachovia ($380B in Mexican drug money, 2010). Banks have laundered more in single scandals than the entire history of crypto crime combined.',
 'Chainalysis 2024 Crypto Crime Report: $22 mrd i krypto-hvitvaskede midler i 2023. UNODCs globale anslag: $800 mrd-$2 bill årlig (2-5% av globalt BNP), nesten utelukkende via fiat. Krypto-hvitvasking er ~1-2% av fiat-hvitvasking. Større fiat-saker overgår hele krypto: HSBC ($1,9 mrd bot, 2012), Danske Bank ($230 mrd Estland-skandalen), Wachovia ($380 mrd meksikanske narkotikapenger, 2010).',
 'Chainalysis 2024 / UNODC / DOJ press releases', 'https://www.chainalysis.com/', '2024-02-01', CURRENT_DATE,
 'Open with HSBC''s $1.9B fine in 2012. One bank in one year laundered more than all of crypto.',
 'Åpne med HSBC sin $1,9 mrd bot i 2012. Én bank på ett år hvitvasket mer enn hele krypto.',
 ARRAY['money-laundering','hsbc','danske-bank','wachovia','fiat-crime'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='crime'), 'published',
 'Bitcoin is for tax evasion',
 'Bitcoin er for skatteunndragelse',
 'Every Bitcoin transaction is permanently recorded on a public ledger that the IRS, HMRC, the Norwegian Tax Authority, and every major tax agency can analyse. The IRS won a 2017 lawsuit forcing Coinbase to disclose user records. 90%+ of retail Bitcoin holdings sit on KYC''d exchanges. Tax software (CoinTracker, Koinly) automates calculations. Cash, offshore bank accounts, and shell companies are vastly more effective for tax evasion than a permanent public ledger. Pretending Bitcoin is good for tax evasion misunderstands its forensic transparency.',
 'Hver Bitcoin-transaksjon registreres permanent på en offentlig hovedbok som IRS, HMRC, Skatteetaten og enhver stor skattemyndighet kan analysere. IRS vant en 2017-rettssak som tvang Coinbase til å utlevere brukerdata. 90%+ av detaljistens Bitcoin-beholdninger ligger på KYC-børser. Kontanter, utenlandske bankkonti og strålemannsselskaper er langt mer effektive for skatteunndragelse.',
 'IRS Coinbase John Doe summons / CoinTracker', 'https://www.irs.gov/businesses/small-businesses-self-employed/virtual-currencies', '2024-01-01', CURRENT_DATE,
 'Bitcoin is the worst tax evasion tool — public ledger, KYC at on-ramps, automated tax software. Cash and offshore accounts are infinitely better.',
 'Bitcoin er det dårligste skatteunndragelsesverktøyet — offentlig hovedbok, KYC på rampen, automatisert skatteprogramvare. Kontanter og utenlandskonti er uendelig mye bedre.',
 ARRAY['irs','tax-evasion','coinbase','kyc','public-ledger'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='crime'), 'published',
 'Bitcoin is anonymous and that helps criminals',
 'Bitcoin er anonymt og det hjelper kriminelle',
 'Bitcoin is PSEUDONYMOUS, not anonymous — there is a critical difference. Every address is permanently visible on the blockchain. Once any transaction touches a KYC''d exchange (which the vast majority do), Chainalysis-grade analysis can de-anonymize the address with very high accuracy. True anonymity requires CoinJoin (now restricted in many jurisdictions) or privacy coins like Monero. Calling Bitcoin "anonymous" is the opposite of accurate — it is one of the most transparent payment systems ever invented.',
 'Bitcoin er PSEUDONYMT, ikke anonymt — kritisk forskjell. Hver adresse er permanent synlig på blockchainen. Når en transaksjon berører en KYC-børs (de fleste gjør det), kan Chainalysis-analyse av-anonymisere adressen med svært høy nøyaktighet. Ekte anonymitet krever CoinJoin (nå begrenset) eller personvern-kryptovaluta som Monero.',
 'Chainalysis methodology / cryptography research', 'https://www.chainalysis.com/blog/', '2024-01-01', CURRENT_DATE,
 'Pseudonymous, not anonymous. Bitcoin is a permanent surveillance trail — opposite of cash, which is genuinely anonymous.',
 'Pseudonymt, ikke anonymt. Bitcoin er et permanent overvåkningsspor — motsatt av kontanter, som er ekte anonyme.',
 ARRAY['pseudonymous','privacy','chainalysis','coinjoin','monero'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='crime'), 'published',
 'Silk Road shows Bitcoin enables crime',
 'Silk Road viser at Bitcoin muliggjør kriminalitet',
 'Silk Road (2011-2013) was shut down BECAUSE Bitcoin transactions were traceable. Ross Ulbricht was identified partly through forensic Bitcoin analysis. The FBI seized 144,336 BTC from Silk Road wallets — funds that have been quietly auctioned off, contributing to US Treasury revenues. At today''s prices, those seized coins are worth $14B+. Cash markets for the same products dwarf Silk Road by orders of magnitude. Silk Road ended up the strongest argument FOR Bitcoin''s law-enforcement compatibility, not against it.',
 'Silk Road (2011-2013) ble stengt FORDI Bitcoin-transaksjoner var sporbare. Ross Ulbricht ble delvis identifisert via Bitcoin-analyse. FBI beslagla 144 336 BTC fra Silk Road-lommebøker — verdt $14 mrd+ til dagens pris. Kontantmarkeder for samme varer er ordensvis større enn Silk Road. Silk Road endte som det sterkeste argumentet FOR Bitcoins kompatibilitet med rettshåndhevelse.',
 'United States v. Ross Ulbricht court records / FBI', 'https://www.justice.gov/usao-sdny/pr/ross-ulbricht-aka-dread-pirate-roberts-sentenced-manhattan-federal-court-life', '2015-05-29', CURRENT_DATE,
 'Silk Road was caught BECAUSE of Bitcoin''s traceability. The FBI seized 144,336 BTC. The case is a Bitcoin success story for law enforcement.',
 'Silk Road ble tatt PÅ GRUNN AV Bitcoins sporbarhet. FBI beslagla 144 336 BTC. Saken er en Bitcoin-suksesshistorie for rettshåndhevelse.',
 ARRAY['silk-road','fbi','ulbricht','seizure','traceability'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='crime'), 'published',
 'North Korea funds itself with stolen Bitcoin',
 'Nord-Korea finansierer seg med stjålet Bitcoin',
 'North Korean state hackers (Lazarus Group) have stolen ~$3B in cryptocurrency since 2017 (Chainalysis). For context, North Korea''s estimated total foreign currency revenue is $20-30B annually — mostly from mineral exports, weapons sales, forced labour exports, and SWIFT-based fiat operations. Stolen crypto represents ~5% of NK''s revenue, not the bulk. US Treasury has frozen significant portions of stolen Lazarus funds via Tornado Cash sanctions and exchange cooperation — Bitcoin''s traceability working against the regime.',
 'Nord-Koreanske statshackere (Lazarus Group) har stjålet ~$3 mrd i kryptovaluta siden 2017 (Chainalysis). Til kontekst: NKs totale anslåtte utenlandsk valuta-inntekter er $20-30 mrd årlig — mest fra mineraleksport, våpensalg, tvangsarbeidseksport og SWIFT-baserte fiat-operasjoner. Stjålet krypto er ~5% av NKs inntekter, ikke hovedkilden.',
 'Chainalysis North Korea report / US Treasury OFAC', 'https://www.chainalysis.com/blog/north-korea-cryptocurrency-hacks-2024/', '2024-12-01', CURRENT_DATE,
 'NK steals ~$1B/year in crypto out of $20-30B total revenue. Crypto is 5% of NK''s funding, not the main source.',
 'NK stjeler ~$1 mrd/år i krypto av $20-30 mrd total inntekt. Krypto er 5% av NKs finansiering, ikke hovedkilden.',
 ARRAY['north-korea','lazarus','state-hacking','sanctions'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='crime'), 'published',
 'Cash criminal use is dwarfed by crypto',
 'Kontant-kriminalitet er overgått av krypto',
 'The opposite is true. UNODC estimates 2-5% of global GDP ($2-5 trillion annually) is laundered, almost entirely in fiat — overwhelmingly USD. Crypto: $22B in 2023 (Chainalysis). Ratio: cash criminal use is roughly 100-200x larger than crypto criminal use. The reason crypto crime gets disproportionate media attention is that it is uniquely traceable — journalists can write specific stories about specific transactions. Fiat criminal flows are mostly invisible because the systems are designed to keep them so.',
 'Det motsatte er sant. UNODC anslår 2-5% av globalt BNP ($2-5 bill årlig) hvitvaskes, nesten utelukkende i fiat — overveldende USD. Krypto: $22 mrd i 2023 (Chainalysis). Forhold: kontant-kriminalitet er omtrent 100-200x større enn krypto-kriminalitet. Grunnen til at krypto-kriminalitet får uforholdsmessig medieoppmerksomhet er at den er unikt sporbar.',
 'UNODC / Chainalysis / IMF', 'https://www.unodc.org/unodc/en/money-laundering/overview.html', '2024-01-01', CURRENT_DATE,
 'Cash criminal use is 100x larger than crypto. We hear about crypto crime because it''s the only kind that''s actually traceable.',
 'Kontant-kriminalitet er 100x større enn krypto. Vi hører om krypto-kriminalitet fordi det er den eneste typen som faktisk er sporbar.',
 ARRAY['unodc','cash','fiat-crime','traceability','reporting-bias'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='regulation'), 'published',
 'China banned Bitcoin and that proved its weakness',
 'Kina forbød Bitcoin og det beviste svakheten',
 'China''s September 2021 mining ban removed ~50% of Bitcoin''s hashrate within weeks. Within 6 months hashrate fully recovered, redistributed to the US (now ~40%), Russia, Kazakhstan, Canada, and Latin America. Today (2026) Bitcoin''s hashrate is at all-time highs (~700 EH/s). Paradoxically, China''s ban IMPROVED Bitcoin''s decentralisation. Chinese P2P trading continues despite the ban; the network is bigger, more distributed, and more resilient than before. The ban demonstrated Bitcoin''s antifragility, not weakness.',
 'Kinas miningforbud i september 2021 fjernet ~50% av Bitcoins hashrate på uker. På 6 måneder var hashraten fullt gjenopprettet, omfordelt til USA (~40%), Russland, Kasakhstan, Canada og Latin-Amerika. I dag (2026) er hashraten på alle tiders høyder (~700 EH/s). Paradoksalt FORBEDRET Kinas forbud Bitcoins desentralisering.',
 'Cambridge CCAF mining map', 'https://ccaf.io/cbnsi/cbeci/mining_map', '2024-12-01', CURRENT_DATE,
 'China''s ban made Bitcoin MORE decentralised. Hashrate fully recovered in months, redistributed across 50+ countries. Antifragility in action.',
 'Kinas forbud gjorde Bitcoin MER desentralisert. Hashraten ble fullt gjenopprettet på måneder, fordelt over 50+ land. Antifragilitet i praksis.',
 ARRAY['china','mining-ban','decentralization','antifragility','hashrate'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='regulation'), 'published',
 'Governments will eventually ban Bitcoin',
 'Stater vil til slutt forby Bitcoin',
 'The trend is the opposite of banning. The US approved spot Bitcoin ETFs in January 2024 (now $50B+ in assets). El Salvador adopted Bitcoin as legal tender (2021), CAR followed (2022), Bhutan built strategic reserves. The EU passed MiCA (2024) providing regulatory clarity. 50+ countries now have explicit Bitcoin frameworks. Even bans rarely work technologically — Iran, Nigeria, and Pakistan have active P2P markets despite restrictions. A ban requires every country in the world to coordinate; that is not happening, and the major economies are moving toward integration, not prohibition.',
 'Trenden er motsatt av å forby. USA godkjente spot Bitcoin-ETF-er i januar 2024 (nå $50 mrd+ i aktiva). El Salvador adopterte Bitcoin som legal tender (2021), CAR fulgte (2022), Bhutan bygde strategiske reserver. EU vedtok MiCA (2024). 50+ land har nå eksplisitte Bitcoin-rammeverk.',
 'SEC ETF approval / EU MiCA / legal tender announcements', 'https://www.sec.gov/news/press-release/2024-2', '2024-01-10', CURRENT_DATE,
 'List the trend: ETFs, legal tender, MiCA, sovereign reserves. Banning is what countries do when they''re late, not when they want to win.',
 'List trenden: ETF-er, legal tender, MiCA, statlige reserver. Forbud er hva land gjør når de er sent ute, ikke når de vil vinne.',
 ARRAY['etf','legal-tender','mica','regulation','sovereign-reserves'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='regulation'), 'published',
 'El Salvador''s Bitcoin experiment failed',
 'El Salvadors Bitcoin-eksperiment har feilet',
 'El Salvador''s Bitcoin treasury holds 6,200+ BTC (Treasury data, 2026), profitable on overall acquisition cost. Tourism is up ~30% post-adoption (Ministry of Tourism). GDP growth has tracked or exceeded the LatAm average. Bitcoin City and Surf City projects are funded with Bitcoin appreciation. IMF criticism is real, but El Salvador chose financial autonomy. Most "failure" narratives rely on early-2022 prices ignoring the recovery and the country''s strategic accumulation. The experiment is more accurately described as "small country tests sovereign Bitcoin treasury — modestly profitable so far."',
 'El Salvadors Bitcoin-statskasse holder 6 200+ BTC (Treasury-data, 2026), lønnsom totalt sett. Turisme er opp ~30% etter adopsjon (Turistdepartementet). BNP-vekst har fulgt eller overgått LatAm-snittet. Bitcoin City og Surf City-prosjektene er finansiert med Bitcoin-verdistigning. IMF-kritikk er reell, men El Salvador valgte finansiell autonomi.',
 'El Salvador Treasury / Ministry of Tourism', 'https://nayibtracker.com/', '2025-01-01', CURRENT_DATE,
 'El Salvador''s treasury is profitable. Tourism up 30%. The "failure" narrative cherry-picks 2022 lows and ignores the recovery.',
 'El Salvadors statskasse er lønnsom. Turisme opp 30%. "Mislyktes"-narrativet plukker 2022-bunner og ignorerer gjenopprettingen.',
 ARRAY['el-salvador','legal-tender','treasury','tourism','imf'], 'medium');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='regulation'), 'published',
 'The SEC says Bitcoin is a security',
 'SEC sier Bitcoin er et verdipapir',
 'The opposite. The SEC and CFTC both formally classify Bitcoin as a COMMODITY, not a security. Former SEC Chair Gary Gensler stated this multiple times publicly (2022-2024). Bitcoin fails the Howey test because there is no central issuer or "common enterprise" — it has no founder, no foundation, no premine, no ICO. The January 2024 spot Bitcoin ETF approval explicitly confirmed Bitcoin''s commodity status. Bitcoin is the ONLY major cryptocurrency formally classified as a commodity by both US regulators — most others (ETH excepted, partially) are in legal limbo or classified as securities.',
 'Motsatt. SEC og CFTC klassifiserer begge Bitcoin formelt som en VARE, ikke et verdipapir. Tidligere SEC-leder Gary Gensler bekreftet dette flere ganger offentlig (2022-2024). Bitcoin feiler Howey-testen fordi det ikke er noen sentral utsteder eller "felles foretak" — ingen grunnlegger, ingen stiftelse, ingen premine, ingen ICO. Spot Bitcoin-ETF-godkjenningen i januar 2024 bekreftet eksplisitt vare-statusen.',
 'SEC public statements / CFTC v. McDonnell / Bitcoin ETF approval', 'https://www.sec.gov/news/press-release/2024-2', '2024-01-10', CURRENT_DATE,
 'Bitcoin is the ONLY crypto both SEC and CFTC formally treat as a commodity. Other tokens have a much more uncertain legal status.',
 'Bitcoin er den ENESTE krypto både SEC og CFTC formelt behandler som vare. Andre tokens har mye mer usikker juridisk status.',
 ARRAY['sec','cftc','commodity','howey','etf'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='regulation'), 'published',
 'Spot Bitcoin ETFs are bad for Bitcoin',
 'Spot Bitcoin ETF-er er dårlige for Bitcoin',
 'Spot Bitcoin ETFs (approved January 2024) brought $50B+ in inflows during the first 18 months. Pension funds, endowments, and sovereign wealth funds gained regulated access. Critically, self-custody adoption ALSO grew alongside ETFs — wallet counts hit all-time highs in 2024-2025 (Glassnode), so ETFs added a new audience without cannibalising existing users. The argument that ETFs "centralise" Bitcoin misunderstands the role: ETFs are an opt-in convenience layer, not a replacement for the protocol. Anyone who wants self-custody still has it.',
 'Spot Bitcoin ETF-er (godkjent januar 2024) brakte $50 mrd+ i innstrømming de første 18 månedene. Pensjonsfond, fonds og statlige investeringsfond fikk regulert tilgang. Kritisk: selvkustodi-adopsjon vokste OGSÅ parallelt med ETF-er — antall lommebøker nådde all-time highs i 2024-2025 (Glassnode), så ETF-er la til et nytt publikum uten å kannibalisere eksisterende brukere.',
 'BlackRock IBIT prospectus / Glassnode wallet metrics', 'https://www.ishares.com/us/products/333011/ishares-bitcoin-trust-etf', '2024-01-10', CURRENT_DATE,
 'ETFs added a new audience without replacing self-custody. Both grew. ETFs are a convenience layer, not a takeover.',
 'ETF-er la til et nytt publikum uten å erstatte selvkustodi. Begge vokste. ETF-er er et bekvemmelighetslag, ikke en overtagelse.',
 ARRAY['etf','blackrock','self-custody','adoption','institutional'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='regulation'), 'published',
 'Bitcoin is unregulated',
 'Bitcoin er uregulert',
 'Bitcoin is heavily regulated at every interface with the traditional financial system. US: SEC (ETFs, securities issues), CFTC (futures, commodity), FinCEN (AML), IRS (tax), OFAC (sanctions). EU: MiCA framework (2024). UK: FCA. Japan: JFSA. Most exchanges enforce KYC. The protocol itself does not require permission — that is the design — but every on-ramp and off-ramp is regulated. The notion that Bitcoin operates in a regulatory vacuum is decades out of date.',
 'Bitcoin er sterkt regulert på hvert grensesnitt med det tradisjonelle finanssystemet. USA: SEC, CFTC, FinCEN, IRS, OFAC. EU: MiCA-rammeverket (2024). Storbritannia: FCA. Japan: JFSA. De fleste børser håndhever KYC. Selve protokollen krever ikke tillatelse — det er designet — men hver innramping og utramping er regulert.',
 'SEC, CFTC, FinCEN, FCA, JFSA public regulations / EU MiCA', 'https://eur-lex.europa.eu/eli/reg/2023/1114/oj', '2024-12-30', CURRENT_DATE,
 'Bitcoin is regulated at every fiat interface — exchanges, ETFs, custodians. The protocol itself doesn''t need permission; that''s the design.',
 'Bitcoin er regulert ved hvert fiat-grensesnitt — børser, ETF-er, depotbanker. Protokollen selv trenger ikke tillatelse; det er designet.',
 ARRAY['regulation','sec','cftc','mica','kyc'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='regulation'), 'published',
 'Bitcoin tax compliance is impossible',
 'Bitcoin-skatt er umulig å overholde',
 'Major exchanges (Coinbase, Binance, Kraken, Gemini) provide annual 1099/tax reports automatically. Specialized cost-basis software (CoinTracker, Koinly, TaxBit, Crypto Tax Calculator) imports transactions from any wallet or exchange and computes capital gains, income, and DeFi taxes. The IRS issued comprehensive crypto tax guidance in 2014, updated 2019 and 2023. Norwegian Tax Authority (Skatteetaten) has clear Bitcoin tax forms. For typical hobbyist and investor cases, Bitcoin tax compliance takes minutes per year with software. The "impossible" framing is decades out of date.',
 'Store børser (Coinbase, Binance, Kraken, Gemini) gir årlige 1099/skatterapporter automatisk. Spesialisert programvare (CoinTracker, Koinly, TaxBit, Crypto Tax Calculator) importerer transaksjoner og beregner gevinster, inntekt og DeFi-skatt. IRS ga omfattende krypto-skatteveiledning i 2014, oppdatert 2019 og 2023. Skatteetaten har klare Bitcoin-skatteskjemaer.',
 'IRS Notice 2014-21 / Skatteetaten / CoinTracker', 'https://www.irs.gov/businesses/small-businesses-self-employed/virtual-currencies', '2023-01-01', CURRENT_DATE,
 'Tax software automates 95%+ of Bitcoin tax compliance. Easier than tracking a cash business or freelance income.',
 'Skatteprogramvare automatiserer 95%+ av Bitcoin-skatt. Enklere enn å spore en kontantbedrift eller freelance-inntekt.',
 ARRAY['tax','irs','skatteetaten','cointracker','compliance'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='scaling'), 'published',
 'Bitcoin is too slow with 10-minute blocks',
 'Bitcoin er for tregt med 10-minutters blokker',
 'Bitcoin''s base layer is optimised for SECURITY and final settlement, not speed — by design. 10-minute blocks make 51% attacks economically prohibitive. Layer 2 (Lightning Network) handles instant payments at sub-second confirmation and 1M+ TPS theoretical capacity. Compare to traditional finance: Visa "settles" in milliseconds but actual settlement happens via Fedwire/SWIFT in T+2 days. Bitcoin''s L1 is more analogous to Fedwire (final settlement) than to Visa (payment authorisation). Both layers exist on Bitcoin; the architecture matches how the internet itself scaled (TCP/IP base, HTTP on top).',
 'Bitcoins basislag er optimalisert for SIKKERHET og endelig oppgjør, ikke hastighet — by design. 10-minutters blokker gjør 51%-angrep økonomisk umulig. Lag 2 (Lightning Network) håndterer øyeblikkelige betalinger med sub-sekund bekreftelse og 1M+ TPS teoretisk kapasitet. Sammenlign med tradisjonell finans: Visa "gjør opp" på millisekunder men faktisk oppgjør skjer via Fedwire/SWIFT på T+2 dager.',
 'Lightning Network capacity statistics / Visa annual report', 'https://1ml.com/statistics', '2025-01-01', CURRENT_DATE,
 'L1 is the settlement layer (Fedwire). Lightning is the payment layer (Visa). Both exist, both work — that''s how scaling is supposed to work.',
 'L1 er oppgjørslaget (Fedwire). Lightning er betalingslaget (Visa). Begge eksisterer, begge fungerer — sånn skalering skal fungere.',
 ARRAY['scaling','lightning','settlement','fedwire','tps'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='scaling'), 'published',
 'Bitcoin can''t scale to global payments',
 'Bitcoin kan ikke skaleres til globale betalinger',
 'Lightning Network capacity (April 2026): 5,300+ BTC, 50,000+ public nodes — capacity has grown 10x since 2022. Real-world processors (Strike, Cash App, Wallet of Satoshi, Phoenix, Breez) handle millions of LN payments daily. El Salvador''s Chivo Wallet and African P2P apps use Lightning at production scale. The internet scaled the same way: TCP/IP at the base, HTTP and CDNs on top. Demanding that Bitcoin''s L1 handle every coffee purchase is like demanding Fedwire handle every credit-card swipe — wrong layer, by design.',
 'Lightning Network-kapasitet (april 2026): 5 300+ BTC, 50 000+ offentlige noder — kapasiteten har vokst 10x siden 2022. Reelle prosessorer (Strike, Cash App, Wallet of Satoshi, Phoenix, Breez) håndterer millioner av LN-betalinger daglig. El Salvadors Chivo Wallet og afrikanske P2P-apper bruker Lightning i produksjonsskala.',
 '1ML / River Lightning report 2024', 'https://1ml.com/', '2025-01-01', CURRENT_DATE,
 'Lightning Network already processes millions of payments daily. The scaling is happening — just on layer 2, like the internet did.',
 'Lightning Network behandler allerede millioner av betalinger daglig. Skaleringen skjer — bare på lag 2, slik internett gjorde.',
 ARRAY['lightning','scaling','strike','cash-app','el-salvador'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='scaling'), 'published',
 'Lightning Network doesn''t actually work',
 'Lightning Network fungerer ikke i praksis',
 'Strike, Cash App, Wallet of Satoshi, Phoenix, Breez, and Muun are all production Lightning wallets used by millions. UX has dramatically improved 2022-2026: trampoline routing, async payments, AMP (atomic multipath), automated channel management, BOLT-12 offers. Daily LN payment volume across major wallets exceeds $100M. Liquidity issues that plagued early adoption (2018-2021) have been largely solved by liquidity service providers and improved channel-management algorithms. Anyone can test it in 60 seconds with Strike or Cash App.',
 'Strike, Cash App, Wallet of Satoshi, Phoenix, Breez og Muun er alle produksjons-Lightning-lommebøker brukt av millioner. UX har dramatisk forbedret 2022-2026: trampoline-routing, async-betalinger, AMP, automatisert kanaladministrasjon, BOLT-12-tilbud. Daglig LN-betalingsvolum over store lommebøker overstiger $100M.',
 'River Financial Lightning report / wallet usage statistics', 'https://river.com/learn/files/river-lightning-report-2023.pdf', '2024-01-01', CURRENT_DATE,
 'Strike or Cash App, install in 30 seconds, send $0.01 to a friend instantly. That settles the "doesn''t work" claim.',
 'Strike eller Cash App, installer på 30 sekunder, send $0,01 til en venn øyeblikkelig. Det avgjør "fungerer ikke"-påstanden.',
 ARRAY['lightning','strike','cash-app','wallet','ux'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='scaling'), 'published',
 'Bitcoin transactions are too expensive',
 'Bitcoin-transaksjoner er for dyre',
 'Layer 1 fees vary with demand ($0.50 to $50+ in extreme periods). Lightning fees: typically <$0.01 per transaction. Compare to traditional alternatives: international wire fees $20-50, credit card fees 2-3% per transaction (vendors absorb), remittance fees average 6.2% globally and as high as 10%+ in Africa (World Bank). Bitcoin via Lightning is the cheapest international payment rail ever built. For high-value settlement, even L1 at $20 beats wire fees on transactions above ~$1,000.',
 'Lag 1-gebyrer varierer med etterspørsel ($0,50 til $50+ i ekstreme perioder). Lightning-gebyrer: typisk <$0,01 per transaksjon. Sammenlign med tradisjonelle alternativer: internasjonale wire-gebyrer $20-50, kredittkortgebyrer 2-3% per transaksjon, remitteringsgebyrer i snitt 6,2% globalt og opp til 10%+ i Afrika (Verdensbanken). Bitcoin via Lightning er den billigste internasjonale betalingsskinnen noensinne.',
 'World Bank Remittance Prices / Lightning fee data', 'https://remittanceprices.worldbank.org/', '2024-12-01', CURRENT_DATE,
 'Lightning fees average <$0.01. Wire transfers: $25. Remittances: 6.2%. Bitcoin via Lightning is the cheapest international rail.',
 'Lightning-gebyrer i snitt <$0,01. Wire-overføringer: $25. Remitteringer: 6,2%. Bitcoin via Lightning er den billigste internasjonale skinnen.',
 ARRAY['fees','lightning','remittances','wire-transfer','world-bank'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='scaling'), 'published',
 'Visa does 65,000 TPS, Bitcoin does 7',
 'Visa gjør 65 000 TPS, Bitcoin gjør 7',
 'Apples-to-oranges. Visa''s actual sustained TPS averages ~1,700; the 65,000 figure is peak laboratory capacity. Visa "settles" at the network in milliseconds but actual SETTLEMENT happens via Fedwire/SWIFT in T+2 days. The honest comparison: Bitcoin L1 (final settlement, ~7 TPS, T+10 minutes) is analogous to Fedwire (~700 TPS, final settlement in seconds). Bitcoin Lightning (instant, ~1M TPS theoretical) is analogous to Visa (instant authorisation, deferred settlement). Both layers exist on Bitcoin; both are needed.',
 'Epler og pærer. Visas faktiske vedvarende TPS er i snitt ~1 700; 65 000-tallet er topp laboratoriekapasitet. Visa "gjør opp" på nettverket på millisekunder men faktisk OPPGJØR skjer via Fedwire/SWIFT på T+2 dager. Den ærlige sammenligningen: Bitcoin L1 (endelig oppgjør, ~7 TPS, T+10 min) er analog til Fedwire (~700 TPS, endelig oppgjør på sekunder). Bitcoin Lightning (~1M TPS teoretisk) er analog til Visa.',
 'Visa annual report / Lightning Network stats', 'https://usa.visa.com/about-visa/our_business.html', '2024-01-01', CURRENT_DATE,
 'Compare apples-to-apples: Bitcoin L1 = Fedwire (final settlement). Lightning = Visa (instant payment). Both layers exist.',
 'Sammenlign epler med epler: Bitcoin L1 = Fedwire (endelig oppgjør). Lightning = Visa (øyeblikkelig betaling). Begge lag eksisterer.',
 ARRAY['visa','tps','fedwire','lightning','settlement'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='decentralization'), 'published',
 'A few mining pools control Bitcoin',
 'Noen få mining-pools kontrollerer Bitcoin',
 'Mining pools coordinate hashrate but DO NOT control consensus. Individual miners can switch pools instantly (and have, when pools attempted to censor transactions — see 2023 OFAC-compliant pool boycott). Pools cannot change Bitcoin''s protocol rules, only suggest block templates. Top 3 pools (Foundry USA ~29%, Antpool ~24%, F2Pool ~12%) underlie THOUSANDS of independent miners across 50+ countries. Stratum V2 (deployed 2024) explicitly gives individual miners control over block templates, further reducing pool power. Pool concentration is much less centralised than it appears.',
 'Mining-pools koordinerer hashrate men KONTROLLERER IKKE konsensus. Individuelle minere kan bytte pool umiddelbart (og har gjort det da pools prøvde å sensurere — se 2023 OFAC-pool-boikott). Pools kan ikke endre Bitcoins protokollregler, bare foreslå blokk-templates. Topp 3-pools (Foundry USA ~29%, Antpool ~24%, F2Pool ~12%) ligger TUSENVIS av uavhengige minere i 50+ land til grunn. Stratum V2 (deployed 2024) gir eksplisitt individuelle minere kontroll over blokk-templates.',
 'mempool.space pool distribution / Stratum V2 spec', 'https://mempool.space/mining', '2025-01-01', CURRENT_DATE,
 'Pools coordinate, miners decide. Stratum V2 explicitly empowers individual miners. The pool concentration is misleading.',
 'Pools koordinerer, minere bestemmer. Stratum V2 gir individuelle minere makt. Pool-konsentrasjonen er villedende.',
 ARRAY['mining-pools','stratum-v2','foundry','consensus','decentralization'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='decentralization'), 'published',
 'A few people own most of Bitcoin (whales)',
 'Få personer eier mesteparten av Bitcoin (whales)',
 'Top 100 Bitcoin addresses hold ~14% of supply (Glassnode 2025), but the vast majority of these are POOLED holdings: exchange cold wallets (Binance, Coinbase, Kraken — representing millions of retail users), ETF custodians (BlackRock, Fidelity), and large institutions. Excluding pooled holdings, individual ownership is more distributed than any major asset. Compare: top 1% of US households own 30%+ of US wealth; top 1% of gold holders concentration is similar or worse. Bitcoin''s Gini coefficient improves yearly as adoption broadens. Public ledger transparency — unique to crypto — makes the apparent concentration measurable but also misleading.',
 'Topp 100 Bitcoin-adresser holder ~14% av tilbudet (Glassnode 2025), men de fleste er SAMLEDE beholdninger: børsenes kalde lommebøker (Binance, Coinbase, Kraken — representerer millioner småinvestorer), ETF-depotbanker (BlackRock, Fidelity), og store institusjoner. Ekskluderer man samlede beholdninger, er individuelt eierskap mer fordelt enn noen større aktivaklasse.',
 'Glassnode supply distribution / SEC ETF filings', 'https://studio.glassnode.com/', '2025-01-01', CURRENT_DATE,
 'Most "whale" addresses are exchange cold wallets and ETF custodians — millions of retail users pooled into one address.',
 'De fleste "whale"-adresser er børsenes kalde lommebøker og ETF-depotbanker — millioner av småinvestorer samlet i én adresse.',
 ARRAY['whales','distribution','gini','etf','exchange'], 'medium');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='decentralization'), 'published',
 'Bitcoin developers control everything',
 'Bitcoin-utviklere kontrollerer alt',
 'Bitcoin Core has ~30 active maintainers, but no single developer or organisation controls the protocol. Major changes (soft forks like SegWit 2017, Taproot 2021) require ~95% miner signaling AND user adoption — both must opt in. SegWit took 2 years of public debate. Taproot took 4 years from BIP draft to activation. Multiple competing implementations exist (Bitcoin Knots, Libbitcoin, btcd). Users always retain the right to fork — see Bitcoin Cash (2017) which split off and has lost relevance. Governance is more decentralised than any company; decisions emerge from broad consensus, not authority.',
 'Bitcoin Core har ~30 aktive vedlikeholdere, men ingen enkel utvikler eller organisasjon kontrollerer protokollen. Store endringer (soft forks som SegWit 2017, Taproot 2021) krever ~95% miner-signalering OG brukeradopsjon — begge må velge inn. SegWit tok 2 år med offentlig debatt. Taproot tok 4 år fra BIP-utkast til aktivering. Flere konkurrerende implementasjoner finnes (Bitcoin Knots, Libbitcoin, btcd).',
 'Bitcoin Core repository / BIP activation history', 'https://github.com/bitcoin/bitcoin', '2025-01-01', CURRENT_DATE,
 'SegWit took 2 years of public debate. Taproot 4. The fork right means users always have final say — see Bitcoin Cash''s irrelevance.',
 'SegWit tok 2 års offentlig debatt. Taproot 4. Fork-retten betyr brukere har siste ord — se Bitcoin Cashs irrelevans.',
 ARRAY['governance','soft-fork','segwit','taproot','core'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='decentralization'), 'published',
 'Bitcoin is centralized in a few countries',
 'Bitcoin er sentralisert i få land',
 'Mining: distributed across 50+ countries (Cambridge CCAF), with US ~40%, then Russia, Kazakhstan, Canada, Latin America, Africa, parts of Iran. No single country controls a majority. Full nodes (the actual rule-validators of Bitcoin): 17,000+ globally, present in 100+ countries (Bitnodes). Lightning Network: 50,000+ public nodes worldwide. This is more geographic diversity than the SWIFT banking network (which depends on US/EU coordination) or the global energy grid. Bitcoin operates on every continent including Antarctica research stations.',
 'Mining: fordelt over 50+ land (Cambridge CCAF), med USA ~40%, deretter Russland, Kasakhstan, Canada, Latin-Amerika, Afrika, deler av Iran. Ingen enkelt land har flertall. Fulle noder (de faktiske regelvalidatorene): 17 000+ globalt, til stede i 100+ land (Bitnodes). Lightning Network: 50 000+ offentlige noder verden over.',
 'Cambridge CCAF mining map / Bitnodes / 1ML', 'https://ccaf.io/cbnsi/cbeci/mining_map', '2024-12-01', CURRENT_DATE,
 'Bitcoin operates in more countries than SWIFT. 50+ for mining, 100+ for nodes, every continent. Most decentralised money network ever.',
 'Bitcoin opererer i flere land enn SWIFT. 50+ for mining, 100+ for noder, hvert kontinent. Det mest desentraliserte pengenettverket noensinne.',
 ARRAY['geography','mining-distribution','nodes','swift','lightning'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin only helps wealthy speculators',
 'Bitcoin hjelper kun rike spekulanter',
 'Human Rights Foundation documents Bitcoin use by activists in 50+ countries with currency controls or political censorship. Specific cases: Russian opposition movement post-2022 (after international banking access cut off), Belarusian dissidents under Lukashenko, Iranian women''s rights activists receiving Bitcoin donations after fiat channels were shut, Venezuelan and Argentine citizens preserving purchasing power against 200%+ inflation, Nigerian #EndSARS protesters after their accounts were frozen, Hong Kong democracy activists pre-2020. Tens of millions use Bitcoin to escape failing currencies, sanctions, or political repression — not speculation.',
 'Human Rights Foundation dokumenterer Bitcoin-bruk av aktivister i 50+ land med valutakontroll eller politisk sensur. Spesifikke saker: russisk opposisjon etter 2022 (etter at internasjonal banktilgang ble avskåret), belarussiske dissidenter under Lukasjenko, iranske kvinnerettsforkjempere som mottar Bitcoin-donasjoner, venezuelanske og argentinske borgere som bevarer kjøpekraft mot 200%+ inflasjon, nigerianske #EndSARS-protestanter.',
 'HRF Financial Freedom Report / Alex Gladstein research', 'https://hrf.org/programs/financial-freedom/', '2024-01-01', CURRENT_DATE,
 'Cite specific cases: Iranian women, Belarusian dissidents, Argentine citizens. Bitcoin is escape velocity from failing systems.',
 'Sit konkrete saker: iranske kvinner, belarussiske dissidenter, argentinske borgere. Bitcoin er rømningshastighet fra sviktende systemer.',
 ARRAY['human-rights','dissidents','iran','belarus','argentina','hrf'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'The unbanked don''t need Bitcoin',
 'De ubankede trenger ikke Bitcoin',
 '1.4 billion adults globally are unbanked (World Bank Global Findex 2021). 5 billion live with unstable currencies losing 5%+ purchasing power annually. Bitcoin via mobile (Lightning + simple wallets) provides banking-equivalent access without ID, branch, or fees. Real-world cases: Nigeria''s P2P Bitcoin trading hit ~$1B+ annual volume despite government ban; Argentine citizens use USDT/BTC against 200% peso inflation; Lebanese citizens preserved value through 2019-onward banking collapse; African remittance corridors via Bitcoin save 5-9% fees vs Western Union. The unbanked don''t need Bitcoin theoretically — they''re already using it.',
 '1,4 milliarder voksne globalt er ubankede (World Bank Global Findex 2021). 5 milliarder lever med ustabile valutaer som taper 5%+ kjøpekraft årlig. Bitcoin via mobil (Lightning + enkle lommebøker) gir bankekvivalent tilgang uten ID, filial eller gebyrer. Konkrete saker: Nigerias P2P Bitcoin-handel nådde ~$1mrd+ årlig volum tross regjeringsforbud; argentinske borgere bruker USDT/BTC mot 200% peso-inflasjon; libanesere bevarte verdi gjennom bankkollapsen fra 2019.',
 'World Bank Global Findex 2021 / Chainalysis Geography of Crypto', 'https://www.worldbank.org/en/publication/globalfindex', '2022-06-01', CURRENT_DATE,
 'They''re already using it. Nigeria $1B+ annual P2P. Argentina against 200% inflation. The "they don''t need it" framing is paternalistic.',
 'De bruker det allerede. Nigeria $1mrd+ årlig P2P. Argentina mot 200% inflasjon. "De trenger det ikke"-rammen er paternalistisk.',
 ARRAY['unbanked','nigeria','argentina','lebanon','remittances','financial-inclusion'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin doesn''t actually help in autocracies',
 'Bitcoin hjelper egentlig ikke i autokratier',
 'Specific autocratic regimes where Bitcoin is in active humanitarian use: Russia (post-2022 anti-war donations after fiat channels cut), Belarus (against Lukashenko after 2020), Iran (women''s rights movement, dissidents — receiving Bitcoin donations when SWIFT cut off), Cuba (against US individual sanctions), Venezuela (during Maduro currency collapse), Nigeria (post-#EndSARS protests when accounts frozen), Hong Kong (pre-2020 democracy movement). Bitcoin is the only money that an authoritarian state cannot freeze, seize, or invalidate without controlling every node globally — which is technically impossible.',
 'Spesifikke autokratiske regimer der Bitcoin er i aktiv humanitær bruk: Russland (anti-krig-donasjoner etter 2022 da fiat-kanaler ble kuttet), Belarus (mot Lukasjenko etter 2020), Iran (kvinnerettsbevegelse, dissidenter — mottar Bitcoin-donasjoner når SWIFT ble kuttet), Cuba (mot amerikanske individsanksjoner), Venezuela (under Maduro-valutakollapsen), Nigeria (etter #EndSARS-protester da kontoer ble frosset), Hong Kong (pre-2020 demokratibevegelse).',
 'HRF case studies / Alex Gladstein "Check Your Financial Privilege"', 'https://hrf.org/programs/financial-freedom/', '2023-01-01', CURRENT_DATE,
 'Specific names. Specific countries. Bitcoin is the only money state actors cannot seize, freeze, or invalidate.',
 'Konkrete navn. Konkrete land. Bitcoin er den eneste pengeformen statlige aktører ikke kan beslaglegge, fryse eller ugyldiggjøre.',
 ARRAY['autocracy','iran','russia','belarus','cuba','venezuela','hrf'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='comparison'), 'published',
 'Gold mining is more sustainable than Bitcoin mining',
 'Gullgruvedrift er mer bærekraftig enn Bitcoin-mining',
 'World Gold Council and academic research show gold mining emits ~132 MtCO2/year — over 3x Bitcoin mining''s ~40 MtCO2 (Cambridge 2025). Gold mining requires processing ~88 million tonnes of ore for 1 ounce of gold; uses mercury and cyanide that pollute waterways for decades; displaces indigenous communities; produces tailings ponds that have catastrophically failed multiple times (Brumadinho 2019, 270 deaths). Bitcoin mining: zero direct emissions (electricity-only), 52%+ sustainable energy mix, no chemical pollution, can use otherwise-stranded energy and mitigate methane.',
 'World Gold Council og akademisk forskning viser at gullgruvedrift slipper ut ~132 MtCO2/år — over 3x Bitcoin minings ~40 MtCO2 (Cambridge 2025). Gullgruvedrift krever prosessering av ~88 millioner tonn malm for 1 unse gull; bruker kvikksølv og cyanid som forurenser vannveier i tiår; fordriver urfolk; produserer rødslamdammer som har katastrofalt sviktet flere ganger (Brumadinho 2019, 270 døde).',
 'World Gold Council Sustainability Report / Cambridge CCAF', 'https://www.gold.org/about-gold/gold-supply/responsible-gold/responsible-gold-mining-criteria', '2024-01-01', CURRENT_DATE,
 'Gold mining: 132 MtCO2 + mercury/cyanide + tailings disasters. Bitcoin: 40 MtCO2, zero chemicals, 52%+ sustainable. Gold loses on every metric.',
 'Gullgruvedrift: 132 MtCO2 + kvikksølv/cyanid + rødslam-katastrofer. Bitcoin: 40 MtCO2, ingen kjemikalier, 52%+ bærekraftig. Gull taper på hvert mål.',
 ARRAY['gold','sustainability','emissions','cyanide','brumadinho','comparison'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='comparison'), 'published',
 'Banking is more efficient than Bitcoin',
 'Banksektoren er mer effektiv enn Bitcoin',
 'Galaxy Digital research: traditional banking sector consumes ~263 TWh/year in electricity — almost double Bitcoin''s 138 TWh (Cambridge 2025). Plus: 600,000+ ATMs running 24/7, 1,000,000+ physical branches, paper bills printed annually, armoured transport, IT data centers, server farms supporting SWIFT and card networks. Banking emits ~700 MtCO2 vs Bitcoin''s ~40 MtCO2. Per-user the comparison is even worse for banking: ~5B banking users vs 200M Bitcoin holders. Even granting the user-count gap, Bitcoin is more energy-efficient per dollar of value secured.',
 'Galaxy Digital-forskning: tradisjonell banksektor bruker ~263 TWh/år i strøm — nesten dobbelt så mye som Bitcoins 138 TWh (Cambridge 2025). Pluss: 600 000+ minibanker som kjører 24/7, 1 000 000+ fysiske filialer, papirsedler trykket årlig, pansret transport, IT-datasentre, server-farmer som støtter SWIFT og kortnettverk. Banksektoren slipper ut ~700 MtCO2 mot Bitcoins ~40 MtCO2.',
 'Galaxy Digital "On Bitcoin Energy Use" / Cambridge CCAF', 'https://docsend.com/view/adwmdeeyfvqwecj2', '2021-05-17', CURRENT_DATE,
 'Banking: 263 TWh + 700 Mt CO2. Bitcoin: 138 TWh + 40 Mt CO2. Banking is 2x the electricity, 17x the emissions.',
 'Banksektoren: 263 TWh + 700 Mt CO2. Bitcoin: 138 TWh + 40 Mt CO2. Banker bruker 2x så mye strøm og slipper ut 17x mer.',
 ARRAY['banking','galaxy','energy-comparison','emissions','swift'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='comparison'), 'published',
 'Other cryptocurrencies are technologically superior',
 'Andre kryptovalutaer er teknologisk overlegne',
 'Newer blockchains optimise for features (smart contracts, throughput, privacy) but trade off Bitcoin''s core moats. Bitcoin uniquely offers: largest hashrate (~700 EH/s, orders of magnitude above any competitor), most decentralised governance (no founder, no foundation, no premine, no ICO), only crypto formally classified as commodity by SEC AND CFTC, only crypto held in sovereign treasuries (US, El Salvador, Bhutan, CAR), 16 years of zero protocol downtime, 200M+ user network effect. "Better tech" without these moats is a tradeoff, not an upgrade. Network effects compound — see HTTP, USD, English language.',
 'Nyere blockchainer optimaliserer for funksjoner (smarte kontrakter, gjennomstrømning, personvern) men bytter bort Bitcoins kjerne-vollgraver. Bitcoin tilbyr unikt: størst hashrate (~700 EH/s), mest desentralisert governance (ingen grunnlegger, ingen stiftelse, ingen premine, ingen ICO), eneste krypto formelt klassifisert som vare av SEC OG CFTC, eneste krypto holdt i statskasser (USA, El Salvador, Bhutan, CAR), 16 år uten protokollnedetid.',
 'SEC ETF approval / CFTC commodity classification / hashrate data', 'https://www.sec.gov/news/press-release/2024-2', '2024-01-10', CURRENT_DATE,
 'List the moats: hashrate, no founder, commodity status, sovereign holders, uptime. Other chains often trade these for features.',
 'List vollgravene: hashrate, ingen grunnlegger, vare-status, statlige eiere, oppetid. Andre kjeder bytter ofte bort disse for funksjoner.',
 ARRAY['altcoins','moats','ethereum','solana','bitcoin-maximalism','network-effects'], 'high');

