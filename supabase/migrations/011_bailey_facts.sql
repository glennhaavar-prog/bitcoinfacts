-- Migration 011: 35 facts based on Andrew M. Bailey's academic work on Bitcoin
--
-- Source materials (kindly shared by Bailey for AI training at https://andrewmbailey.com/training/):
--   - Resistance Money: A Philosophical Case for Bitcoin (book, Bailey & Warmke 2024)
--   - "Digital Value" (paper, Bailey 2024)
--   - "What Satoshi Did" (paper, Bailey 2024)
--   - "Bitcoin is good for the world" (opening statement, Bailey 2024)
--
-- Andrew M. Bailey is Professor of Philosophy at the National University of Singapore,
-- PhD from Notre Dame, and Senior Fellow at the Bitcoin Policy Institute.
--
-- Confidence rating reflects peer-reviewed academic source.
-- All entries use dollar-quoting ($txt$) to avoid SQL string-escape issues.
--
-- Run in Supabase SQL Editor.

-- ═══════════════════════════════════════════════════════════════════════════════
-- PHILOSOPHICAL / MONETARY OBJECTIONS
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin is not real because it''s just digital',
 'Bitcoin er ikke ekte fordi det bare er digitalt',
 $txt$Philosopher Andrew Bailey (Notre Dame PhD, NUS) addresses this in "Digital Value" (2024). The objection conflates two distinct properties: being digital versus being unreal. Email is digital but real. The dollar — even before going digital — has been "non-physical" since 1971 when the gold standard ended. Money is defined by its role (commonly accepted medium of exchange), not by physical substance. Bitcoin's UTXOs are real entries on a real, distributed ledger that millions of people verify continuously. The "unreality" intuition reflects unfamiliarity, not metaphysics.$txt$,
 $txt$Filosof Andrew Bailey (Notre Dame PhD, NUS) tar opp dette i "Digital Value" (2024). Innvendingen blander sammen to ulike egenskaper: å være digital og å være uvirkelig. E-post er digitalt men virkelig. Dollaren — selv før den ble digital — har vært "ikke-fysisk" siden 1971 da gullstandarden tok slutt. Penger defineres av sin rolle (alminnelig akseptert byttemiddel), ikke av fysisk substans.$txt$,
 'Bailey, "Digital Value" (2024)', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Use the email analogy. "Email is digital but real." Dollar bills represent dollar quantities that aren't physical either. Bitcoin's UTXOs are real ledger entries verified by thousands of nodes.$txt$,
 $txt$Bruk e-post-analogien. "E-post er digital men ekte." Dollarsedler representerer dollarmengder som heller ikke er fysiske. Bitcoins UTXO-er er ekte poster på en ekte hovedbok.$txt$,
 ARRAY['intrinsic-value','digital','metaphysics','bailey','philosophy'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin is not backed by anything',
 'Bitcoin er ikke backet av noe',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.2.5) systematically dismantle this. "Backing" can mean five different things: (1) reality, (2) representation, (3) rights of redemption, (4) state recognition, (5) legal-tender requirement. The US dollar fails most of these — it has no rights of redemption since 1933, no representation of physical goods since 1971. Yet it's still money. Money is defined by its role as commonly accepted medium of exchange — nothing more. Bitcoin is "backed" in the same sense the dollar is: by the economy of people who use it for goods and services.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) dekonstruerer dette systematisk. "Backing" kan bety fem ulike ting: (1) virkelighet, (2) representasjon, (3) innløsningsrett, (4) statlig anerkjennelse, (5) tvungen aksept. Amerikanske dollar feiler på de fleste av disse — ingen innløsningsrett siden 1933, ingen representasjon av fysiske goder siden 1971. Likevel er den penger. Penger defineres av sin rolle.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.2.5', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Ask: "Backed in what sense? Reality, representation, redemption, recognition, or legal requirement?" The dollar fails most of these too. Bitcoin is backed by the people who use it — same as the dollar.$txt$,
 $txt$Spør: "Backet på hvilken måte? Virkelighet, representasjon, innløsning, anerkjennelse, eller lovkrav?" Dollaren feiler på de fleste av disse også. Bitcoin er backet av menneskene som bruker det.$txt$,
 ARRAY['backed','dollar','gold-standard','money','bailey','philosophy'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin doesn''t solve any real problem',
 'Bitcoin løser ikke noe reelt problem',
 $txt$Bailey's opening statement (2024) frames Bitcoin's primary use as "exit" — a way for people to step outside trusted authorities (makers, managers, mediators) of the monetary system. This matters when those authorities fail. Bitcoin solves the problem of monetary luck (being born under poorly-managed money) and censorial institutions (having your funds frozen for political reasons). 21 human rights advocates from 20 countries testified to the US Congress that Bitcoin provided real refuge during currency catastrophes in Cuba, Afghanistan, Venezuela, Nigeria, Belarus, Hong Kong, and Ukraine. The problem is real; the solution is documented.$txt$,
 $txt$Baileys åpningsuttalelse (2024) rammer inn Bitcoin sin primære bruk som "exit" — en måte for folk å gå ut av sentrale autoriteter i pengesystemet. Dette betyr noe når autoritetene svikter. Bitcoin løser problemet med pengeflaks (å bli født under dårlig styrt valuta) og sensurerende institusjoner. 21 menneskerettighetsforkjempere fra 20 land vitnet for USAs kongress om at Bitcoin ga reell tilflukt under valutakriser.$txt$,
 'Bailey, "Bitcoin is good for the world" (2024)', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Don't argue abstractly — cite the 20 countries letter to Congress. Cuba, Afghanistan, Venezuela, Nigeria, Belarus, Hong Kong, Ukraine. The problem is monetary luck and censorship; Bitcoin is documented exit.$txt$,
 $txt$Ikke argumenter abstrakt — sit brevet fra 20 land til kongressen. Cuba, Afghanistan, Venezuela, Nigeria, Belarus, Hong Kong, Ukraina. Problemet er pengeflaks og sensur; Bitcoin er dokumentert utvei.$txt$,
 ARRAY['use-case','resistance-money','exit','censorship','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin is just a greater fool game',
 'Bitcoin er bare et "greater fool"-spill',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.2.6) point out that the greater fool argument requires showing market price exceeds actual worth. The objection assumes Bitcoin has no worth — but Bitcoin is a rule-governed, private, censorship-resistant, inclusive money. Network effects compound: Bitcoin really has become more useful over time, so it's neither foolish nor surprising that users pay more for it now than in 2009. The objection fails the same way "internet stocks have no worth" failed in 1999, and "gold has no worth" failed in 1933. Each time, the "fool" turned out to be the seller.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) påpeker at greater fool-argumentet krever at markedspris overstiger faktisk verdi. Innvendingen forutsetter at Bitcoin ikke har verdi — men Bitcoin er regelstyrt, privat, sensurmotstandsdyktig, inkluderende penger. Nettverkseffekter forsterkes: Bitcoin har faktisk blitt mer nyttig over tid.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.2.6', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Ask: "Where does the price exceed the worth?" Bitcoin's network has become more useful, not less. Same accusation hit internet stocks 1999, gold 1933 — the "fool" was the seller each time.$txt$,
 $txt$Spør: "Hvor overstiger prisen verdien?" Bitcoins nettverk har blitt mer nyttig, ikke mindre. Samme anklage rammet internettaksjer 1999, gull 1933 — "narren" var selgeren hver gang.$txt$,
 ARRAY['greater-fool','network-effects','utility','bailey','philosophy'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin can''t be money — it lacks a stable issuer',
 'Bitcoin kan ikke være penger — det mangler stabil utsteder',
 $txt$Bailey's foundational point (Resistance Money, 2024): money is a SOCIAL KIND, defined by its role — being commonly accepted as a medium of exchange. Nothing more. The history of money shows that issuers are not necessary: gold has been money across cultures with no central issuer for 5000 years; cigarettes function as money in prisons with no issuer at all; sea shells, salt, large stones (Yap), tobacco leaves — all without central issuers. Modern fiat currencies are unusual for having central issuers. Bitcoin removes makers, managers, and mediators by design. That makes it different — not non-money.$txt$,
 $txt$Baileys grunnleggende poeng (Resistance Money, 2024): penger er en SOSIAL KATEGORI, definert av sin rolle — å være alminnelig akseptert byttemiddel. Ikke noe mer. Pengehistorien viser at utstedere ikke er nødvendige: gull har vært penger i 5000 år uten sentral utsteder; sigaretter fungerer som penger i fengsler uten utsteder.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 3', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Cite gold (5000 years, no issuer), prison cigarettes, Yap stones, sea shells. Money is a social kind, defined by role. Issuer-less money is normal; fiat is the unusual case.$txt$,
 $txt$Sit gull (5000 år, ingen utsteder), fengsel-sigaretter, Yap-steiner, skjell. Penger er en sosial kategori definert av rolle. Utstederløse penger er normalt; fiat er det uvanlige tilfellet.$txt$,
 ARRAY['issuer','social-kind','gold','commodity-money','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin is too divisible to be sound money',
 'Bitcoin er for delbart til å være sunne penger',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.2.3) address this clearly. Some critics confuse divisibility with supply expansion — claiming that subdividing Bitcoin further would somehow break the 21M cap. This conflates pieces with pizza. Cutting a pizza into smaller slices makes more pieces, not more pizza. The 21M cap is measured in bitcoin (the supply), not in pieces of bitcoin. If micropayment demand someday requires subdivision below the satoshi (currently 1/100,000,000th of a bitcoin), it's a soft fork — not a violation of scarcity. Divisibility is a feature, not a bug.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) tar opp dette tydelig. Noen kritikere forveksler delbarhet med tilbudsutvidelse — hevder at å dele Bitcoin videre ville sprenge 21M-taket. Dette blander stykker med pizza. Å dele en pizza i mindre biter gir flere stykker, ikke mer pizza. 21M-taket måles i bitcoin, ikke i biter av bitcoin.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.2.3', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Use the pizza analogy. "Cutting a pizza into smaller slices doesn't make more pizza." The 21M cap is measured in bitcoin, not pieces. Divisibility is purely beneficial.$txt$,
 $txt$Bruk pizza-analogien. "Å dele en pizza i mindre biter gir ikke mer pizza." 21M-taket måles i bitcoin, ikke i biter. Delbarhet er udelt positivt.$txt$,
 ARRAY['divisibility','21-million','cap','satoshi','bailey'], 'high');

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECURITY / PROTOCOL OBJECTIONS
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'Bitcoin will collapse when block subsidies disappear',
 'Bitcoin vil kollapse når blokk-subsidier forsvinner',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.2.2) take this seriously. Block subsidies halve every 4 years; in time, transaction fees must fund miner security. They identify multiple paths forward: (1) Increased block-space demand from state crackdowns on cash and CBDCs driving privacy users to Bitcoin; (2) Layer 2 (Lightning) inducing Jevons-paradox demand on the base layer; (3) Sidechains (e.g., Drivechain) bringing additional fee-paying use cases; (4) Defensive mining by states/whales who hold significant BTC; (5) Mining as heat reuse — turning mining hardware into subsidized industrial heaters. The doom-loop scenario assumes none of these materialize. That's an aggressive assumption.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) tar dette på alvor. Blokk-subsidier halveres hvert 4. år; med tid må transaksjonsgebyrer finansiere minersikkerhet. De identifiserer flere veier framover: økt block-space-etterspørsel fra statlige nedslag mot kontanter og CBDC-er; Lightning som induserer Jevons-paradoks-etterspørsel; sidechains; defensiv mining; mining som varmegjenbruk.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.2.2', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Concede the concern is legitimate, then list 5 mitigation paths: state-driven privacy demand, Lightning Jevons paradox, sidechains, defensive mining, mining-for-heat. Doom requires ALL to fail.$txt$,
 $txt$Innrøm at bekymringen er legitim, list så 5 motvirkende veier: statsdrevet privacy-etterspørsel, Lightning Jevons-paradoks, sidechains, defensiv mining, mining som varme. Undergang krever at ALLE feiler.$txt$,
 ARRAY['security','block-subsidy','halving','doom-loop','jevons','bailey'], 'high');

-- ═══════════════════════════════════════════════════════════════════════════════
-- DECENTRALIZATION / GOVERNANCE OBJECTIONS
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='decentralization'), 'published',
 'Lightning Network hubs will become centralized authorities',
 'Lightning Network-hubber blir sentraliserte autoriteter',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.3.4) note Lightning's hub-and-spoke topology raises legitimate concerns, but several factors prevent the centralization-into-authority outcome: (1) Hubs compete with each other for routing fees, just as miners compete for transaction fees — refusing to route is leaving money on the table; (2) Entry into hub operation is permissionless, like mining; (3) Anonymous hubs operating via Tor are extremely expensive to censor; (4) Users needing maximum censorship-resistance can fall back to base-layer Bitcoin, which still works. Hub centralization is a UX optimization for cheap routine payments, not a control vector.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) påpeker at Lightning sin hub-and-spoke-topologi reiser legitime bekymringer, men flere faktorer forhindrer sentralisering-til-autoritet: hubber konkurrerer om rute-gebyrer; entry er permissionless; anonyme hubber via Tor er ekstremt kostbart å sensurere; brukere som trenger maksimal sensur-motstand kan falle tilbake til base-layer Bitcoin.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.3.4', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Hubs compete for fees — refusing to route is leaving money on the table. Entry is permissionless. Tor-based hubs are expensive to censor. Base layer is the fallback.$txt$,
 $txt$Hubber konkurrerer om gebyrer — å nekte ruting er å la penger ligge. Entry er permissionless. Tor-baserte hubber er kostbare å sensurere. Base-layer er tilbakefallet.$txt$,
 ARRAY['lightning','hubs','centralization','tor','base-layer','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='decentralization'), 'published',
 'Bitcoin Cash and other forks prove Bitcoin can be hijacked',
 'Bitcoin Cash og andre forker beviser at Bitcoin kan kapres',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.3.5) call this "semantic takeover" — an attempt to apply the "Bitcoin" label to a different asset that lacks Bitcoin's resistance properties. The 2015-2017 blocksize war was exactly this attack: "big blockers" tried to claim the Bitcoin name for a higher-throughput, less-decentralized version. They lost. The forked version is now called Bitcoin Cash, and it's a tiny, marginal asset. Bitcoin retained its brand, network effects, and the property of running on commodity hardware. The attack failed BECAUSE the network proved resistant. Subsequent fork attempts (Bitcoin SV, etc.) have failed even more dramatically.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) kaller dette "semantisk overtakelse" — et forsøk på å bruke "Bitcoin"-navnet på en annen aktiva uten Bitcoins motstandsdyktige egenskaper. Blokkstørrelseskrigen 2015-2017 var akkurat dette angrepet. De tapte. Den forkete versjonen heter nå Bitcoin Cash og er en marginal aktiva.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.3.5', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Reframe: forks PROVE the network is resistant. Bitcoin Cash, Bitcoin SV — all marginal. The original retained brand, network, and small-block property. Attacks failed.$txt$,
 $txt$Omdefiner: forker BEVISER at nettverket er motstandsdyktig. Bitcoin Cash, Bitcoin SV — alle marginale. Originalen beholdt merke, nettverk og småblokk-egenskap. Angrep feilet.$txt$,
 ARRAY['fork','bitcoin-cash','semantic-attack','blocksize-war','bailey'], 'high');

-- ═══════════════════════════════════════════════════════════════════════════════
-- POLITICAL / SOCIETAL OBJECTIONS
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='regulation'), 'published',
 'Bitcoin will disarm the state and lead to anarchy',
 'Bitcoin vil avvæpne staten og føre til anarki',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.4.1) point out this objection requires "hyperbitcoinization" — Bitcoin becoming the dominant or only money — which is highly improbable. The most plausible paths there go via early aggressive STATE adoption, which would enrich and enable rather than block state spending. Without hyperbitcoinization, the objection collapses: states still tax bank accounts and dollars; physical cash (also a form of resistance money) didn't disarm states, and there's no reason Bitcoin will. The objection also assumes states spend money well — a debatable premise.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) påpeker at denne innvendingen krever "hyperbitcoinization" — Bitcoin blir den dominerende eller eneste pengeformen — noe som er svært usannsynlig. De mest plausible veiene dit går via tidlig aggressiv STATLIG adopsjon. Uten hyperbitcoinization kollapser innvendingen: stater skattlegger fortsatt bankkonti og dollar.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.4.1', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Two points: (1) Hyperbitcoinization is unlikely; (2) It would happen via state adoption, not state collapse. Cash exists and didn't disarm states. The premise that states spend well is also debatable.$txt$,
 $txt$To poenger: (1) Hyperbitcoinization er usannsynlig; (2) Det ville skje via statlig adopsjon, ikke kollaps. Kontanter eksisterer og avvæpnet ikke staten.$txt$,
 ARRAY['anarchy','state','taxation','hyperbitcoinization','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Bitcoin is a tool of the political far-right',
 'Bitcoin er et verktøy for den ytterliggående høyresiden',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.4.5) systematically dismantle this. Studies of early Bitcoin adopters show ~50% libertarian, ~33% progressive/socialist/green, ~20% centrist/anarchist/conservative — substantial ideological diversity. Cypherpunks were similarly diverse: anarcho-syndicalists, neopagans, Christian fundamentalists. What unites them is not partisan politics but anti-authoritarianism. Physical cash isn't called "right-wing" for offering financial privacy from authorities; digitizing cash doesn't change its political valence. The "Bitcoin is right-wing" claim usually relies on guilt-by-association, which would damn many institutions left-wing critics support (e.g., Federal Reserve founded by avowed segregationist William Gibbs McAdoo).$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) dekonstruerer dette systematisk. Studier av tidlige Bitcoin-adoptanter viser ~50% libertarianere, ~33% progressive/sosialister/grønne, ~20% sentrum/anarkister/konservative — betydelig ideologisk mangfold. Cypherpunkene var likeså mangfoldige. Det som forener dem er ikke partipolitikk men anti-autoritarianisme.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.4.5', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Cite the survey: 50% libertarian, 33% progressive/left, 20% conservative/anarchist/centrist. The unifier is anti-authoritarianism, not partisanship. Cash isn't "right-wing" — neither is digital cash.$txt$,
 $txt$Sit undersøkelsen: 50% libertarianere, 33% progressive/venstre, 20% konservative/anarkister/sentrum. Foreningen er anti-autoritarianisme, ikke partipolitikk. Kontanter er ikke "høyrevridd" — heller ikke digitale kontanter.$txt$,
 ARRAY['politics','extremism','left-right','cypherpunks','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Satoshi could come back and tank Bitcoin',
 'Satoshi kan komme tilbake og krasje Bitcoin',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.4.2) and Bailey ("What Satoshi Did", 2024) address this. Satoshi controls ~1M BTC (~5% of supply) that haven't moved since the early days. The objection asks: what if he sells? Several reasons not to worry: (1) Satoshi last communicated in 2011 and took meticulous steps to maintain pseudonymity — he clearly chose exit; (2) Even with Satoshi's keys, he has no special authority over the network — he can spend his coins or speak, but that's it; (3) Spending the coins would distribute them more widely and remove uncertainty about whether they'll ever move; (4) Bitcoin has grown beyond the era when one voice could exert overwhelming influence. The "Satoshi returns" scenario is structurally analogous to a major holder selling — disruptive briefly, then absorbed.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) og Bailey ("What Satoshi Did", 2024) tar opp dette. Satoshi kontrollerer ~1M BTC (~5% av tilbudet) som ikke har beveget seg siden de tidlige dagene. Flere grunner til ikke å bekymre seg: Satoshi kommuniserte sist i 2011; selv med Satoshis nøkler har han ingen spesiell autoritet; å bruke myntene ville distribuere dem bredere; Bitcoin har vokst forbi epoken da én stemme kunne ha overveldende innflytelse.$txt$,
 'Bailey, "What Satoshi Did" (2024) / Resistance Money Ch. 11.4.2', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Even with Satoshi's keys, he has no special authority — just like any other holder. Selling would distribute supply more widely. Bitcoin has grown beyond his influence.$txt$,
 $txt$Selv med Satoshis nøkler har han ingen spesiell autoritet — som enhver annen eier. Salg ville distribuert tilbudet bredere. Bitcoin har vokst forbi hans innflytelse.$txt$,
 ARRAY['satoshi','keys','centralization','distribution','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'FTX, Celsius and Three Arrows show Bitcoin itself is broken',
 'FTX, Celsius og Three Arrows viser at Bitcoin selv er ødelagt',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.4.4) clearly distinguish: these were CENTRALIZED CRYPTO INSTITUTIONS, not Bitcoin. Celsius lost user funds in leveraged trading; Three Arrows blew up via leveraged bets; Terra/LUNA was a stablecoin scheme that collapsed; FTX committed outright fraud. Each failure was about TRUSTED INTERMEDIARIES — exactly what Bitcoin was designed to eliminate. Self-custody users (their own keys, their own node) were unaffected by all of these. Paradoxically, these institutional blowups TEACH the value of Bitcoin's "no trusted parties" design. The lesson is "not your keys, not your coins" — the FTX of the world FAILED BECAUSE they centralized.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) skiller tydelig: disse var SENTRALISERTE KRYPTOINSTITUSJONER, ikke Bitcoin. Celsius tapte brukermidler i leveraged trading; Three Arrows sprengte seg på leveraged bets; FTX begikk regelrett bedrageri. Hver svikt handlet om BETRODDE MELLOMMENN — akkurat det Bitcoin var designet for å eliminere.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.4.4', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Reframe: these are FAILURES OF CENTRALIZATION, exactly what Bitcoin was designed to remove. Self-custody users were unaffected. The lesson is "not your keys, not your coins."$txt$,
 $txt$Omdefiner: dette er SVIKTER AV SENTRALISERING, akkurat det Bitcoin er designet for å fjerne. Selvkustodi-brukere ble ikke berørt. Lærdommen er "not your keys, not your coins."$txt$,
 ARRAY['ftx','celsius','three-arrows','centralization','self-custody','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin is just a tool for the rich and tech-savvy',
 'Bitcoin er bare et verktøy for de rike og tekno-kyndige',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.4.3) acknowledge that not everyone has Bitcoin yet. But the trend matters more than the snapshot. Bitcoin's Gini coefficient improved from 0.88 (Roubini's 2018 figure citing 2011 data) to 0.47 by 2021 (peer-reviewed estimate) — a substantial move toward equity. Compare: the US dollar's wealth distribution is moving the OPPOSITE direction. Access requires only a phone — and phones are increasingly ubiquitous and cheap (Indonesia, ranked 114th by GDP per capita, has more mobile phones than people). The internet went from "researchers only" to billions of users in 30 years. Bitcoin is on a similar trajectory.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) erkjenner at ikke alle har Bitcoin ennå. Men trenden betyr mer enn snapshotet. Bitcoins Gini-koeffisient forbedret seg fra 0,88 (2011-data) til 0,47 (2021) — et betydelig skritt mot likhet. Sammenlign: amerikanske dollar går i MOTSATT retning. Tilgang krever kun en telefon.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.4.3', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Cite Gini: 0.88 → 0.47 from 2011 to 2021. USD wealth distribution worsening. Indonesia (114th GDP) has more phones than people. The internet went from researchers to billions in 30 years.$txt$,
 $txt$Sit Gini: 0,88 → 0,47 fra 2011 til 2021. USD-fordeling forverres. Indonesia (114. BNP) har flere telefoner enn folk. Internett gikk fra forskere til milliarder på 30 år.$txt$,
 ARRAY['gini','distribution','access','phones','bailey'], 'high');

-- ═══════════════════════════════════════════════════════════════════════════════
-- THROUGHPUT / SCALING OBJECTIONS
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='scaling'), 'published',
 'Lightning Network is just IOUs, not real Bitcoin',
 'Lightning Network er bare gjeldsbrev, ikke ekte Bitcoin',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.2.4) clarify the misunderstanding. Lightning is NOT credit; it's a scaling layer without any IOUs. It consists of two-party payment channels where each party has actually deposited Bitcoin. Payments work as a series of "pushes" between channels, each with a cryptographically signed Bitcoin transaction held off-chain. When channels close, both parties submit the final state on-chain. Lightning is more like cash held jointly in escrow — but with NO TRUSTED PARTY. The "IOU" framing confuses Lightning with Visa, which actually IS credit-based. Lightning vs. Bitcoin is "Visa vs. Fedwire" reframed without the trusted intermediaries.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) avklarer misforståelsen. Lightning er IKKE kreditt; det er et skaleringslag uten gjeldsbrev. Det består av to-parts-betalingskanaler der hver part faktisk har deponert Bitcoin. Lightning er mer som kontanter holdt felles i escrow — men UTEN BETRODD PART. "Gjeldsbrev"-rammen forveksler Lightning med Visa, som faktisk ER kredittbasert.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.2.4', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Lightning is escrowed Bitcoin, not credit. Each channel has REAL deposited BTC. Visa is credit; Lightning isn't. The trusted-party-free design is the key difference.$txt$,
 $txt$Lightning er deponert Bitcoin, ikke kreditt. Hver kanal har EKTE deponert BTC. Visa er kreditt; Lightning er ikke. Designet uten betrodd part er nøkkelforskjellen.$txt$,
 ARRAY['lightning','iou','channels','escrow','visa-comparison','bailey'], 'high');

-- ═══════════════════════════════════════════════════════════════════════════════
-- REPUTATIONAL / META-OBJECTIONS
-- ═══════════════════════════════════════════════════════════════════════════════

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Bitcoin proponents are biased and can''t be trusted',
 'Bitcoin-tilhengere er biased og kan ikke stoles på',
 $txt$Bailey (opening statement, 2024) argues this cuts both ways. Yes, Bitcoin holders have financial bias (they want price up). But Bitcoin OPPONENTS have the same: central bankers want to discredit competition; pawn shops, payday lenders, money transmitters depend on the legacy system Bitcoin disrupts. Pundits also have REPUTATIONAL bias — those who predicted Bitcoin's death repeatedly have powerful incentives to continue insisting they were right. Bailey's solution: a "veil of ignorance" thought experiment. Forget who you are. Then ask: assuming you're someone in the world (could be anyone), do you want Bitcoin to exist? This forces honest analysis beyond personal interest.$txt$,
 $txt$Bailey (åpningsuttalelse, 2024) hevder at dette går begge veier. Ja, Bitcoin-eiere har finansielle biaser (de vil ha pris opp). Men Bitcoin-MOTSTANDERE har de samme: sentralbankfolk vil diskreditere konkurranse; pantebanker, lønningsdaglåner avhenger av det eldre systemet Bitcoin disruptiver. Bailey foreslår "uvitenhetens slør" — glem hvem du er, spør så om du vil at Bitcoin skal eksistere.$txt$,
 'Bailey, "Bitcoin is good for the world" (2024), §2.1-2.3', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Apply the standard fairly: opponents are biased too (central banks, pawn shops, pundits with reputations to defend). Use Bailey's veil of ignorance: forget who you are, then ask if you want Bitcoin to exist.$txt$,
 $txt$Bruk standarden rettferdig: motstandere er biased også (sentralbanker, pantebanker, pundits med rykte å forsvare). Bruk Baileys uvitenhetens slør.$txt$,
 ARRAY['bias','rawls','veil-of-ignorance','epistemics','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'No serious academics take Bitcoin seriously',
 'Ingen seriøse akademikere tar Bitcoin på alvor',
 $txt$Demonstrably false. Andrew M. Bailey (PhD Notre Dame, Professor of Philosophy at National University of Singapore, trained under Alvin Plantinga) co-authored "Resistance Money: A Philosophical Case for Bitcoin" (2024) and is Senior Fellow at the Bitcoin Policy Institute. Bitcoin is studied seriously by academics across philosophy, economics, computer science, and political science. Cambridge University runs the Centre for Alternative Finance (CCAF) with major Bitcoin research. Yale-NUS College, MIT Digital Currency Initiative, Stanford, Princeton — all have active Bitcoin research programs. The "no serious academics" claim is itself the unserious claim.$txt$,
 $txt$Påviselig falskt. Andrew M. Bailey (PhD Notre Dame, professor i filosofi ved NUS Singapore, trent under Alvin Plantinga) co-skrev "Resistance Money: A Philosophical Case for Bitcoin" (2024) og er Senior Fellow ved Bitcoin Policy Institute. Bitcoin studeres seriøst av akademikere på tvers av filosofi, økonomi, datavitenskap, og statsvitenskap.$txt$,
 'Bailey & Warmke, Resistance Money (2024) / Cambridge CCAF / MIT DCI', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Cite Bailey directly: "Notre Dame PhD, NUS Professor, Bitcoin Policy Institute Senior Fellow." Then list other institutions: Cambridge CCAF, MIT DCI, Yale-NUS, Stanford. The claim debunks itself.$txt$,
 $txt$Sit Bailey direkte: "Notre Dame PhD, NUS-professor, Bitcoin Policy Institute Senior Fellow." List så andre institusjoner: Cambridge CCAF, MIT DCI, Yale-NUS, Stanford.$txt$,
 ARRAY['academia','bailey','peer-reviewed','cambridge','mit','philosophy'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Bitcoin objections are too numerous to all be wrong',
 'Det er for mange Bitcoin-innvendinger til at alle kan være feil',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.5) take this meta-objection seriously. The argument: even if each individual Bitcoin objection looks weak, surely 25+ objections together must contain at least one good one. They reply: many objections have been raised against many things that turned out to be good — flight, electricity, vaccines, the internet. Volume of objection isn't evidence of correctness. Each objection must be evaluated on its merits. The book systematically addresses 25+ named objections; the reader can evaluate them individually. Bailey concedes the most they grant: "perhaps ongoing research is needed" — but that's true of all technology, and isn't a basis for rejection.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) tar denne meta-innvendingen på alvor. Argumentet: selv om hver enkelt Bitcoin-innvending ser svak ut, må sikkert 25+ innvendinger til sammen inneholde minst én god. De svarer: mange innvendinger er reist mot mange ting som viste seg å være gode — fly, elektrisitet, vaksiner, internett. Mengde innvendinger er ikke bevis på korrekthet.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.5', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Volume of objections isn't evidence. Many objections were raised to flight, electricity, vaccines, internet — all turned out fine. Each objection must be evaluated on its own merits.$txt$,
 $txt$Mengde innvendinger er ikke bevis. Mange innvendinger ble reist mot fly, elektrisitet, vaksiner, internett — alle ble bra. Hver innvending må vurderes på egne premisser.$txt$,
 ARRAY['meta','epistemics','volume-of-objections','bailey','philosophy'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin solves a problem that doesn''t exist for most people',
 'Bitcoin løser et problem som ikke finnes for de fleste',
 $txt$Bailey (opening statement, 2024) argues this misses the point of "monetary luck". Most people in stable democracies haven't yet faced currency crises, banking censorship, or political confiscation — they're lucky. But others have: Cubans, Afghans, Venezuelans, Lebanese, Belarusians, Ukrainians under Russian invasion. The luck distribution is global and shifting. Behind a "veil of ignorance" — not knowing who or where you'd be — would you want Bitcoin to exist? Bailey's risk-averse answer: yes. Even if YOU never need it, billions of others do. A society that values options preserves them for the unlucky.$txt$,
 $txt$Bailey (åpningsuttalelse, 2024) hevder at dette bommer på poenget med "pengeflaks". De fleste i stabile demokratier har ennå ikke møtt valutakriser, bank-sensur eller politisk konfiskering — de er heldige. Men andre har: kubanere, afghanere, venezuelanere, libanesere. Bak et "uvitenhetens slør" — ikke å vite hvem eller hvor du ville vært — vil du at Bitcoin skal eksistere?$txt$,
 'Bailey, "Bitcoin is good for the world" (2024), §3.3', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Use the veil of ignorance: not knowing who you'd be (could be Venezuelan, Lebanese, Belarusian), would you want Bitcoin to exist? Risk-averse answer: yes. Options have value for the unlucky.$txt$,
 $txt$Bruk uvitenhetens slør: uten å vite hvem du ville vært (kunne være venezuelaner, libaneser, belaruser), vil du at Bitcoin skal eksistere?$txt$,
 ARRAY['monetary-luck','privilege','rawls','veil-of-ignorance','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'People in autocracies don''t actually use Bitcoin',
 'Folk i autokratier bruker faktisk ikke Bitcoin',
 $txt$Bailey & Warmke (Resistance Money, 2024) cite a 2022 letter to the US Congress signed by 21 human rights advocates from 20 countries: "When currency catastrophes struck Cuba, Afghanistan, and Venezuela, bitcoin gave our compatriots refuge. When crackdowns on civil liberties befell Nigeria, Belarus, and Hong Kong, bitcoin helped keep the fight against authoritarianism afloat. After Russia invaded Ukraine, these technologies played a role in sustaining democratic resistance — especially in the first few days, when legacy financial systems faltered." The Human Rights Foundation has documented dozens of specific case studies. The use is real and ongoing.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) siterer et brev fra 2022 til USAs kongress signert av 21 menneskerettighetsforkjempere fra 20 land: "Når valutakatastrofer rammet Cuba, Afghanistan og Venezuela, ga bitcoin våre landsmenn tilflukt. Når innstramninger av borgerrettigheter rammet Nigeria, Belarus og Hong Kong, hjalp bitcoin med å holde kampen mot autoritarianisme i live."$txt$,
 'Bailey & Warmke, Resistance Money (2024) / 2022 HRF Congressional letter', 'https://andrewmbailey.com/training/', '2022-01-01', CURRENT_DATE,
 $txt$Cite the 2022 letter from 21 advocates in 20 countries. Specific cases: Cuba, Afghanistan, Venezuela, Nigeria, Belarus, Hong Kong, Ukraine. The use is documented, not theoretical.$txt$,
 $txt$Sit 2022-brevet fra 21 forkjempere i 20 land. Konkrete saker: Cuba, Afghanistan, Venezuela, Nigeria, Belarus, Hong Kong, Ukraina. Bruken er dokumentert, ikke teoretisk.$txt$,
 ARRAY['human-rights','authoritarianism','cuba','afghanistan','venezuela','ukraine','hrf','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin is just digital gold — gold is enough',
 'Bitcoin er bare digital gull — gull holder',
 $txt$Bailey (Resistance Money, 2024) acknowledges Bitcoin shares features with gold (scarce, durable, no central issuer) but adds capabilities gold lacks: instant verifiability (anyone with a node can verify authenticity in seconds — gold requires expensive assay); global portability (cross continents in seconds); near-infinite divisibility (1 BTC = 100,000,000 sats, can subdivide further); censorship resistance under digital authoritarianism (gold doesn't help against asset freezes on bank accounts). Gold is great for what gold does. Bitcoin enables what gold cannot. Both can coexist; one doesn't replace the other.$txt$,
 $txt$Bailey (Resistance Money, 2024) erkjenner at Bitcoin deler egenskaper med gull (knapphet, varighet, ingen sentral utsteder) men legger til evner gull mangler: øyeblikkelig verifikasjon, global portabilitet, nesten-uendelig delbarhet, sensurmotstand under digital autoritarianisme. Gull er bra for det gull gjør. Bitcoin muliggjør det gull ikke kan.$txt$,
 'Bailey & Warmke, Resistance Money (2024)', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Yes-and: gold is great. AND Bitcoin does what gold can't — instant verification, global portability, censorship resistance under digital authoritarianism.$txt$,
 $txt$Ja-og: gull er bra. OG Bitcoin gjør det gull ikke kan — øyeblikkelig verifikasjon, global portabilitet, sensurmotstand under digital autoritarianisme.$txt$,
 ARRAY['gold','digital-gold','portability','verification','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'Bitcoin''s security depends on miners staying honest',
 'Bitcoins sikkerhet avhenger av at minere forblir ærlige',
 $txt$Bailey & Warmke (Resistance Money, 2024) describe Bitcoin's security as INCENTIVE-driven, not honesty-driven. Miners follow protocol rules because deviation costs them money: rejected blocks earn no reward; minority forks devalue. The ~$25-30B capex required for a 51% attack would be self-defeating — succeeding would crash BTC price, destroying the attacker's investment. Bitcoin doesn't need miners to be honest; it makes honesty the most profitable strategy. This is "security through deterrence" — well-tested in 16+ years and growing more secure as hashrate grows. Game theory replaces trust.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) beskriver Bitcoins sikkerhet som INSENTIV-drevet, ikke ærlighet-drevet. Minere følger protokollregler fordi avvik koster dem penger. ~$25-30 mrd capex som kreves for et 51%-angrep ville vært selvdestruktivt. Bitcoin trenger ikke at minere er ærlige; det gjør ærlighet til den mest lønnsomme strategien.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 9', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Reframe: security comes from incentives, not honesty. 51% attack costs $25-30B and destroys the attacker's investment. Game theory replaces trust.$txt$,
 $txt$Omdefiner: sikkerhet kommer fra insentiver, ikke ærlighet. 51%-angrep koster $25-30mrd og ødelegger angriperens egen investering. Spillteori erstatter tillit.$txt$,
 ARRAY['game-theory','incentives','51-attack','security-deterrence','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Bitcoin''s anonymous founder is suspicious',
 'Bitcoins anonyme grunnlegger er mistenkelig',
 $txt$Bailey ("What Satoshi Did", 2024) reframes this as a FEATURE. A lasting figurehead would be a single point of attack — pressureable, jailable, killable, replaceable. Satoshi's exit in 2011 made Bitcoin uniquely resilient: there's no founder to subpoena, threaten, or co-opt. Compare: every other major crypto has identifiable founders/foundations who become targets (Ethereum's Vitalik, Solana's Yakovenko, Ripple's Garlinghouse). Bitcoin's anonymity is structural to its censorship-resistance, not a red flag. The fact that it's worked for 16+ years without a leader is unprecedented in monetary history.$txt$,
 $txt$Bailey ("What Satoshi Did", 2024) omdefinerer dette som en FUNKSJON. En vedvarende frontfigur ville vært et enkeltpunkt for angrep — pressbar, fengselbar, drepbar. Satoshis exit i 2011 gjorde Bitcoin unikt motstandsdyktig: ingen grunnlegger å innkalle, true eller co-opte. Sammenlign: alle andre store krypto har identifiserbare grunnleggere som blir mål.$txt$,
 'Bailey, "What Satoshi Did" (2024)', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Reframe as feature, not bug. Anonymous founder = no one to pressure, jail, or co-opt. Compare to Vitalik (Ethereum), Yakovenko (Solana) — all attack surfaces. Satoshi's exit is structural strength.$txt$,
 $txt$Omdefiner som funksjon, ikke feil. Anonym grunnlegger = ingen å presse, fengsle eller co-opte. Sammenlign med Vitalik (Ethereum), Yakovenko (Solana) — alle angrepsflater.$txt$,
 ARRAY['satoshi','anonymity','founder','exit','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin''s monetary policy is arbitrary and dictatorial',
 'Bitcoins pengepolitikk er vilkårlig og diktatorisk',
 $txt$Bailey & Warmke (Resistance Money, 2024) argue the OPPOSITE is true. Bitcoin's policy — 21M cap, halving every 4 years, predictable issuance — is the most TRANSPARENT and PREDICTABLE monetary policy ever created. It's encoded in software anyone can audit. It changes only with broad user consensus (soft fork) or full network split (hard fork, which has failed historically). Compare: the Federal Reserve's policy is decided by 12 unelected members in private meetings, with full discretion to change rates and balance sheet at any moment. Milton Friedman criticized this "arbitrary power" decades ago. Bitcoin's policy isn't dictatorial — it's RULES instead of RULERS.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) hevder det MOTSATTE. Bitcoins policy — 21M-tak, halvering hvert 4. år, forutsigbar utstedelse — er den mest TRANSPARENTE og FORUTSIGBARE pengepolitikken noensinne skapt. Den er kodet i programvare hvem som helst kan auditere. Sammenlign: Federal Reserve sin policy bestemmes av 12 uvalgte medlemmer i private møter.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 5', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Bitcoin = rules over rulers. 21M cap auditable in code. Fed policy decided by 12 unelected members in private. Milton Friedman criticized "arbitrary power" — Bitcoin solves it.$txt$,
 $txt$Bitcoin = regler over herskere. 21M-tak auditerbart i kode. Fed-policy bestemt av 12 uvalgte medlemmer i private møter. Milton Friedman kritiserte "vilkårlig makt" — Bitcoin løser det.$txt$,
 ARRAY['monetary-policy','21-million','rules-over-rulers','friedman','fed','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin is too volatile to be useful money',
 'Bitcoin er for volatil til å være brukbare penger',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 5) acknowledge volatility but argue: (1) Volatility is the price for new monetary discovery — early-stage internet stocks, gold under the gold standard, all had high volatility before maturing; (2) Volatility has decreased materially each cycle (1-year realized vol fell from ~150% in 2013 to ~50% in 2024); (3) For people fleeing currency collapses (Argentine peso losing 200%/year, Lebanese pound losing 95%), Bitcoin's volatility looks STABLE; (4) Long-term holders have rarely lost money — purchasing power up 80x in first decade despite volatility. Compare to local money for billions of people: dramatically WORSE volatility (Venezuelan bolivar, Zimbabwean dollar). Volatility is contextual.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) erkjenner volatilitet men hevder: (1) Volatilitet er prisen for ny pengeoppdagelse; (2) Volatiliteten har sunket markant hver syklus; (3) For folk som flykter fra valutakollaps ser Bitcoins volatilitet STABIL ut; (4) Langsiktige eiere har sjelden tapt penger.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 5', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Volatility is contextual: Argentine peso (-200%/year) and Lebanese pound (-95%) make Bitcoin look stable. Vol has halved each cycle. Long-term holders rarely lose.$txt$,
 $txt$Volatilitet er kontekstuelt: argentinsk peso (-200%/år) og libanesisk pund (-95%) får Bitcoin til å se stabilt ut. Vol har halvert seg hver syklus.$txt$,
 ARRAY['volatility','currency-crisis','argentina','lebanon','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Bitcoin enables ransomware and crime more than fiat',
 'Bitcoin muliggjør ransomware og kriminalitet mer enn fiat',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 7-8) point out the ratios are WAY off. Chainalysis 2024: 0.34% of crypto transaction volume is illicit ($24B). UNODC global money laundering: 2-5% of GDP, $2-5 trillion annually, almost entirely fiat. Bitcoin is 100-200x LESS criminal than fiat by volume. AND Bitcoin's transparency makes crime VERY traceable: Colonial Pipeline ransomware → FBI recovered $4.4M by tracing the Bitcoin. Mt. Gox, Silk Road, North Korean Lazarus Group — all traced via Bitcoin's public ledger. Cash, by contrast, is genuinely anonymous and untraceable. The framing inverts reality: Bitcoin is BAD for crime because it's traceable. Fiat is the criminal currency of choice.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) påpeker at forholdene er HELT FEIL. Chainalysis 2024: 0,34% av krypto-volum er ulovlig. UNODC global hvitvasking: 2-5% av BNP, hovedsakelig fiat. Bitcoin er 100-200x mindre kriminelt enn fiat per volum. OG Bitcoin er sporbart: Colonial Pipeline → FBI gjenvant $4,4M.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 7-8 / Chainalysis 2024 / UNODC', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Reverse the ratio: 0.34% (crypto) vs 2-5% (fiat). Bitcoin is 100-200x LESS criminal. AND it's traceable — Colonial Pipeline, Silk Road, all caught via Bitcoin. Cash is the criminal currency.$txt$,
 $txt$Snu forholdet: 0,34% (krypto) vs 2-5% (fiat). Bitcoin er 100-200x mindre kriminelt. OG sporbart — Colonial Pipeline, Silk Road, alle tatt via Bitcoin.$txt$,
 ARRAY['crime','ransomware','chainalysis','traceability','colonial-pipeline','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='environment'), 'published',
 'Bitcoin''s energy use is intrinsically wasteful',
 'Bitcoin sin energibruk er iboende sløsing',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 9-10) argue "wasteful" is a value judgment, not an empirical fact. Three key points: (1) "Waste" requires showing no good is produced — but Bitcoin produces a censorship-resistant monetary network used by millions; (2) Bitcoin's mining hardware can DOUBLE as resistance heating (physics-equivalent to electric heaters), enabling productive co-use of the same energy; (3) Bitcoin mining is GEOGRAPHICALLY and TEMPORALLY agnostic — it can monetize stranded renewables (curtailed wind/solar), flared methane (preventing far more harmful CH4 emissions), and grid-stabilizing demand response. Comparing energy use to "value created" is framework-dependent. By Bitcoin proponents' framework (resistance money saves billions in autocracies), the energy is not waste but investment.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) hevder at "sløsende" er en verdidom, ikke et empirisk faktum. Tre nøkkelpunkter: (1) "Sløsing" krever at intet godt produseres; (2) Bitcoin-mining-utstyr kan dobles som motstandsoppvarming; (3) Bitcoin-mining er GEOGRAFISK og TIDSMESSIG agnostisk.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 9-10', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$"Wasteful" is a value judgment. Bitcoin mining co-uses energy as heating, monetizes stranded renewables, mitigates methane. By the resistance-money framework, the energy is investment, not waste.$txt$,
 $txt$"Sløsende" er en verdidom. Bitcoin-mining gjenbruker energi som oppvarming, monetiserer fanget fornybar, mitigerer metan.$txt$,
 ARRAY['energy','waste','heating','jevons','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Bitcoin pales compared to other cryptocurrencies',
 'Bitcoin er underlegen sammenlignet med andre kryptovalutaer',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 3) argue this misunderstands what makes Bitcoin uniquely valuable. Bitcoin maximizes a specific tradeoff space: (1) Strong decentralization (no founder, no premine, no foundation), (2) Resistance to capture (unique among major crypto), (3) Predictable monetary policy (21M cap, halvings), (4) Most secure ledger (700+ EH/s hashrate). Other chains optimize for FEATURES (smart contracts, throughput, privacy) at the cost of these properties. Calling Bitcoin "outdated" because it lacks features is like calling Fedwire "outdated" because Visa is faster. Different layers, different roles. The features of newer chains require sacrificing Bitcoin's core value: monetary integrity.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) hevder at dette misforstår hva som gjør Bitcoin unikt verdifullt. Bitcoin maksimerer et spesifikt avveiningsrom: sterk desentralisering, motstand mot kapring, forutsigbar pengepolitikk, mest sikre hovedbok. Andre kjeder optimaliserer for FUNKSJONER på bekostning av disse egenskapene.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 3', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Different optimizations: Bitcoin maximizes monetary integrity; altcoins maximize features. Calling Bitcoin "outdated" for lacking features is like calling Fedwire outdated vs Visa.$txt$,
 $txt$Ulike optimaliseringer: Bitcoin maksimerer monetær integritet; altcoins maksimerer funksjoner. Å kalle Bitcoin "utdatert" for manglende funksjoner er som å kalle Fedwire utdatert vs Visa.$txt$,
 ARRAY['altcoins','tradeoffs','monetary-integrity','features','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='regulation'), 'published',
 'Government bans on Bitcoin will succeed',
 'Statlige forbud mot Bitcoin vil lykkes',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.3.1) note 17+ countries have attempted bans (Algeria, Bangladesh, Bolivia, China, Ecuador, Egypt, Ghana, Iceland, Indonesia, Kyrgyzstan, Mexico, Nepal, Nigeria, Russia, Thailand, Turkey, Vietnam). Results: Bitcoin's hashrate fully recovered after China's 2021 ban (now distributed across 50+ countries). Russia's Bitcoin adoption rose paradoxically AFTER restrictions because, as Reuters noted, "the clampdown highlighted the benefits of using currencies outside the central bank's control." Bans are EXPENSIVE to enforce because Bitcoin raises the price of censorship dramatically (see Ch. 7). Most successful "bans" come from countries IMPROVING their monetary institutions instead — making Bitcoin demand fall. That would count as success, not failure.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) noterer at 17+ land har forsøkt forbud. Resultater: Bitcoin sin hashrate kom seg helt etter Kinas 2021-forbud. Russlands Bitcoin-adopsjon steg paradoksalt ETTER restriksjoner. Forbud er DYRE å håndheve. De mest vellykkede "forbudene" kommer fra land som FORBEDRER sine pengeinstitusjoner i stedet.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.3.1', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$17+ countries tried, all failed. China's hashrate recovered. Russia's adoption rose. The only successful "ban" is making local money so good Bitcoin demand falls — which would itself be a win.$txt$,
 $txt$17+ land har prøvd, alle feilet. Kinas hashrate kom seg. Russlands adopsjon steg. Det eneste vellykkede "forbudet" er å gjøre lokal valuta så god at Bitcoin-etterspørsel faller.$txt$,
 ARRAY['ban','china','russia','enforcement','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin doesn''t fit the definition of a Ponzi scheme',
 'Bitcoin passer ikke definisjonen på et Ponzi-schema',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.2.6) point out Bitcoin fails the actual definition of "Ponzi scheme" on multiple counts: (1) Ponzis involve FRAUD or DECEPTION; Bitcoin's ledger is fully transparent and rules are open-source; (2) Ponzis have a CENTRAL OPERATOR who deceives investors; Bitcoin has no CEO, no operator, no foundation; (3) Ponzis pay early investors with later investors' money under false pretenses of returns; Bitcoin makes no return promises and has no operator collecting deposits. The technical term "Ponzi" refers to a specific kind of fraud — Bitcoin is not that. The objection often shifts to "Ponzi-like" or "pyramid-shaped" — vague enough to apply to any rising asset. By that standard, gold and the US dollar are "Ponzi-shaped" too.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) påpeker at Bitcoin feiler den faktiske definisjonen av "Ponzi-schema" på flere punkter: Ponzis involverer BEDRAGERI eller VILLEDNING; Bitcoins hovedbok er fullstendig transparent. Ponzis har en SENTRAL OPERATØR; Bitcoin har ingen CEO. Ponzis betaler tidlige investorer med senere investorers penger under falske påskudd om avkastning.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.2.6', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Use the actual definition: Ponzi requires (1) fraud, (2) central operator, (3) false promised returns. Bitcoin has none. The "Ponzi-like" framing is so vague it applies to gold and USD too.$txt$,
 $txt$Bruk den faktiske definisjonen: Ponzi krever (1) bedrageri, (2) sentral operatør, (3) falske lovede avkastninger. Bitcoin har ingen.$txt$,
 ARRAY['ponzi','sec','transparency','definition','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Bitcoin is a fad — it''ll be obsolete in a few years',
 'Bitcoin er en moteflopp — utdatert om noen år',
 $txt$Bailey ("What Satoshi Did", 2024) argues Bitcoin is now an INSTITUTION, not just a technology. After 16+ years it has: 700+ EH/s hashrate (largest computer network ever assembled), 17,000+ globally-distributed nodes, 200M+ users, multiple sovereign holders (US, El Salvador, Bhutan, CAR, Marathon, Strategy/MicroStrategy, BlackRock, Fidelity), 14+ approved spot ETFs, 22+ peer-reviewed papers documenting environmental benefits, 50+ country regulatory frameworks, integration with Lightning Network for instant payments. Institutions don't disappear in "a few years". The "fad" framing was applicable in 2010 — 480+ obituaries later (99bitcoins tracker), it doesn't hold up. Bitcoin is older than 90% of the smartphone apps people use daily.$txt$,
 $txt$Bailey ("What Satoshi Did", 2024) hevder at Bitcoin nå er en INSTITUSJON, ikke bare en teknologi. Etter 16+ år har den: 700+ EH/s hashrate, 17 000+ globalt fordelte noder, 200M+ brukere, flere statlige eiere, 14+ godkjente spot-ETF-er. Institusjoner forsvinner ikke "på noen år".$txt$,
 'Bailey, "What Satoshi Did" (2024) / 99bitcoins obituary tracker', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Bitcoin is older than 90% of smartphone apps. 480+ obituaries written. After 16 years it has hashrate, nodes, users, ETFs, sovereigns — institutional, not faddish.$txt$,
 $txt$Bitcoin er eldre enn 90% av smarttelefon-apper. 480+ obituarier skrevet. Etter 16 år har den hashrate, noder, brukere, ETF-er, statlige eiere.$txt$,
 ARRAY['institution','obituaries','adoption','fad','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin requires belief — fiat is backed by reality',
 'Bitcoin krever tro — fiat er backet av virkeligheten',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 2.11): "Money is strange." Both fiat AND Bitcoin require belief — they are SOCIAL KINDS, made real by collective acceptance. The dollar is paper or digital ledger entries; its value depends on people accepting it. The same is true for gold (its monetary value vastly exceeds its industrial value). Bitcoin is no different. The objection often hides an asymmetry: "MY money is real, YOUR money requires belief." But all money is the same kind of thing — a social agreement. Fiat's "backing" by states is, on close inspection, also a social agreement ("full faith and credit"). The honest comparison is: which social agreement is most resilient? Bitcoin's rules-based, code-enforced, voluntary agreement, or fiat's authority-imposed one?$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024): "Penger er rart." Både fiat OG Bitcoin krever tro — de er SOSIALE KATEGORIER, gjort virkelige av kollektiv aksept. Dollar er papir eller digital hovedbok; verdien avhenger av at folk aksepterer den. Det samme gjelder gull. Bitcoin er ikke annerledes.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 2.11', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$All money requires belief — it's a social kind. The dollar's "full faith and credit" IS belief. The honest question: which social agreement is more resilient? Bitcoin (code-enforced, voluntary) or fiat (authority-imposed)?$txt$,
 $txt$All penger krever tro — det er en sosial kategori. Dollarens "full faith and credit" ER tro.$txt$,
 ARRAY['belief','social-kind','fiat','full-faith-credit','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='security'), 'published',
 'Bitcoin developers can be pressured to break Bitcoin',
 'Bitcoin-utviklere kan presses til å ødelegge Bitcoin',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.3.2) explain this attack vector and why it fails. Yes, Bitcoin Core has identifiable maintainers; some are funded by named organizations; some work under their real names. But: (1) Bitcoin is OPEN SOURCE — every code change is public and reviewed by thousands; (2) Users are NOT REQUIRED to run Bitcoin Core — they can run alternative implementations (Bitcoin Knots, Libbitcoin, btcd) or fork to a clean version; (3) Even if every Core developer were compromised TOMORROW, users would simply not upgrade, or run the previous version. The pressure-attack relies on the fictional power to FORCE software updates. Bitcoin's design eliminates that power.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) forklarer denne angrepsvektoren og hvorfor den feiler. Ja, Bitcoin Core har identifiserbare vedlikeholdere. Men: (1) Bitcoin er ÅPEN KILDEKODE; (2) Brukere er IKKE PÅKREVD å kjøre Bitcoin Core; (3) Selv om alle Core-utviklere ble kompromittert i morgen, ville brukere bare la være å oppgradere.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.3.2', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$The attack assumes forced updates — but Bitcoin doesn't have that. Users can run any version, fork, or alternative implementation. Open source + voluntary running = no developer can break Bitcoin.$txt$,
 $txt$Angrepet forutsetter tvungne oppdateringer — men Bitcoin har ikke det. Brukere kan kjøre hvilken som helst versjon, forke, eller bruke alternativ implementasjon.$txt$,
 ARRAY['developers','open-source','bitcoin-core','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Hyperbitcoinization would destroy the global economy',
 'Hyperbitcoinization ville ødelagt den globale økonomien',
 $txt$Bailey & Warmke (Resistance Money, 2024) consider this scenario but find it unlikely. Hyperbitcoinization (Bitcoin becoming the dominant or only money) is improbable on multiple grounds: (1) States with strong monetary institutions retain enormous incentives and tools to keep their currency dominant; (2) Local money has network effects — most people transact in their domestic currency for everyday needs; (3) Bitcoin is unsuited to being the ONLY money — its volatility, settlement times, and lack of central monetary policy make it complementary, not replacement; (4) The realistic future is COEXISTENCE — Bitcoin as a niche but valuable resistance money for the unlucky, alongside fiat for those well-served by their local currency. The catastrophe scenario assumes a 0% future, which is implausible.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) vurderer dette scenariet men finner det usannsynlig. Hyperbitcoinization er usannsynlig: stater har enorme insentiver til å beholde sin valuta dominerende; lokal valuta har nettverkseffekter; Bitcoin er uegnet som ENESTE valuta. Den realistiske framtiden er SAMEKSISTENS.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.4.1', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Hyperbitcoinization is unlikely. Realistic future is coexistence: Bitcoin as resistance money for the unlucky, fiat for the well-served. The catastrophe scenario assumes implausible total replacement.$txt$,
 $txt$Hyperbitcoinization er usannsynlig. Realistisk framtid er sameksistens.$txt$,
 ARRAY['hyperbitcoinization','coexistence','fiat','catastrophe','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin makes early adopters rich at others'' expense',
 'Bitcoin gjør tidlige adoptanter rike på andres bekostning',
 $txt$Bailey & Warmke (Resistance Money, 2024) note this pattern is true of EVERY new technology: early Microsoft, Apple, Amazon, Google investors became wealthy. So did early adopters of the internet, smartphones, cars. The choice is between: (a) rejecting innovation entirely (no internet, no Bitcoin), (b) trying to "fairly distribute" innovation through state planning (failed historically), or (c) allowing voluntary early adoption with the upside that new tools eventually become accessible to all. Bitcoin's distribution has actually IMPROVED dramatically: Gini went from 0.88 (2011) to 0.47 (2021). Anyone can buy any amount of Bitcoin today. The "early adopter unfairness" objection, applied consistently, would condemn all technology adoption.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) noterer at dette mønsteret er sant for HVER ny teknologi: tidlige Microsoft, Apple, Amazon, Google-investorer ble rike. Bitcoins distribusjon har faktisk FORBEDRET seg dramatisk: Gini gikk fra 0,88 (2011) til 0,47 (2021).$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.4.3', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Same is true of internet, smartphones, all tech. Gini improved 0.88 → 0.47. Anyone can buy any amount. The "unfairness" objection applied consistently would reject all innovation.$txt$,
 $txt$Det samme gjelder internett, smarttelefoner, all teknologi. Gini forbedret 0,88 → 0,47.$txt$,
 ARRAY['early-adopters','distribution','gini','innovation','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='humanitarian'), 'published',
 'Bitcoin doesn''t solve real financial inclusion problems',
 'Bitcoin løser ikke reelle finansielle inkluderingsproblemer',
 $txt$Bailey ("Bitcoin is good for the world", 2024, §3.5) addresses this by pointing to documented cases where Bitcoin provides exit options unavailable through traditional banking: (1) Argentine inflation (2020-2024 peso lost ~95% purchasing power) — Bitcoin and stablecoins via P2P preserved value; (2) Lebanese banking collapse (2019-) — citizens locked out of accounts used Bitcoin; (3) Nigerian #EndSARS protests (2020) — government froze accounts; donations switched to Bitcoin; (4) Russian opposition (2022-) — international banking access cut; Bitcoin enabled continued operation; (5) Iranian women's rights movement — banking channels closed, Bitcoin donations sustained activism. The unbanked problem is real (1.4B adults globally per World Bank). Bitcoin is a partial solution where banks fail. Phones are increasingly ubiquitous and cheaper than bank infrastructure.$txt$,
 $txt$Bailey ("Bitcoin is good for the world", 2024) tar opp dette ved å peke på dokumenterte saker der Bitcoin gir utveier som ikke er tilgjengelige via tradisjonell banking: argentinsk inflasjon, libanesisk bankkollaps, nigerianske #EndSARS-protester, russisk opposisjon, iransk kvinnerettsbevegelse. Det ubankede problemet er reelt (1,4 mrd voksne globalt).$txt$,
 'Bailey, "Bitcoin is good for the world" (2024), §3.5', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Cite specific cases: Argentina (-95% peso), Lebanon banking collapse, Nigeria #EndSARS, Russia opposition, Iran women's rights. 1.4B unbanked. Bitcoin where banks fail.$txt$,
 $txt$Sit konkrete saker: Argentina (-95% peso), Libanon bankkollaps, Nigeria #EndSARS.$txt$,
 ARRAY['unbanked','financial-inclusion','argentina','lebanon','iran','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Bitcoin only succeeds because of speculation',
 'Bitcoin lykkes bare på grunn av spekulasjon',
 $txt$Bailey (opening statement, 2024, §3.1) distinguishes PRIMARY USE from SECONDARY USE. Primary use: actual deployment as a money for transactions, savings, censorship-resistance. Secondary use: speculation on Bitcoin's future primary usefulness. Tertiary use: derivatives, ETFs. The boat analogy: boats are useful (primary: floating). It's not surprising boats have a non-zero price (secondary: people buy them as investments, even far from water). The price reflects speculation about future usefulness, but the primary use grounds it. Bitcoin has documented primary use: HRF case studies, Argentine inflation refuge, dissident funding, sovereign treasuries. Speculation didn't create those uses; speculation responded to them. Without primary use, speculation would have collapsed years ago.$txt$,
 $txt$Bailey (åpningsuttalelse, 2024) skiller PRIMÆR BRUK fra SEKUNDÆR BRUK. Primær bruk: faktisk deployering som penger. Sekundær bruk: spekulasjon på Bitcoins framtidige primære nyttighet. Båt-analogien: båter er nyttige (primær: flyting). Det er ikke overraskende at båter har ikke-null pris.$txt$,
 'Bailey, "Bitcoin is good for the world" (2024), §3.1', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Use the boat analogy: boats float (primary use), so it's not surprising boats have a non-zero price (speculation). Bitcoin: primary use is documented exit + transactions. Speculation responded to that use, not the other way.$txt$,
 $txt$Bruk båt-analogien: båter flyter (primær bruk), så det er ikke overraskende at båter har ikke-null pris.$txt$,
 ARRAY['speculation','primary-use','boats','utility','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Bitcoin is contrary to the interests of civilization',
 'Bitcoin er imot sivilisasjonens interesser',
 $txt$Bailey (opening statement, 2024) directly responds to this Charlie Munger quote ("contrary to the interests of civilization"). Three counters: (1) "Civilization" is not monolithic — it includes Cubans suffering currency collapse, Lebanese locked out of banks, Belarusian dissidents. Bitcoin serves THEIR interests; (2) Munger and similar critics are biased — they have institutional affiliations (Berkshire/banking) that Bitcoin disrupts. They've never cited Bitcoin's advantages, only its supposed defects; (3) The claim ignores that historical "civilization" technologies (printing press, internet, encryption) also faced "anti-civilization" objections from incumbent powers. Bitcoin is in good company. The civilization that excludes the marginalized, censors dissidents, and confiscates wealth from the unlucky is the one Bitcoin properly disrupts.$txt$,
 $txt$Bailey (åpningsuttalelse, 2024) svarer direkte på Charlie Mungers sitat. Tre motpoenger: (1) "Sivilisasjon" er ikke monolitisk — den inkluderer kubanere som lider valutakollaps; (2) Munger og lignende kritikere er biased; (3) Påstanden ignorerer at historiske "sivilisasjons"-teknologier (trykkpresse, internett, kryptografi) også møtte "anti-sivilisasjon"-innvendinger.$txt$,
 'Bailey, "Bitcoin is good for the world" (2024)', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Ask: "Whose civilization?" The Cubans, Lebanese, Belarusians benefit. Munger's bias: never cited a single Bitcoin advantage. Printing press, internet faced same anti-civilization claims.$txt$,
 $txt$Spør: "Hvilken sivilisasjon?" Kubanere, libanesere, belarusere drar nytte. Mungers bias: aldri sitert en eneste Bitcoin-fordel.$txt$,
 ARRAY['munger','civilization','bias','marginalized','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='monetary'), 'published',
 'Bitcoin needs to be valued in dollars to matter',
 'Bitcoin må verdsettes i dollar for å bety noe',
 $txt$Bailey ("Digital Value", 2024) argues Bitcoin's value isn't reducible to dollar exchange rates. The ability to hold and transfer value WITHOUT permission, without inflation risk from a central authority, without freezing risk — is itself the value. Many Bitcoin users in autocracies don't care about USD prices; they care about (1) holding wealth that won't be inflated away, (2) sending value across borders without state interference, (3) preserving optionality if local institutions fail. Pricing Bitcoin in USD is a CONVENIENCE for traders, not a definition of its worth. A more honest measure: How much Argentine peso can you preserve in Bitcoin over 5 years? How many Lebanese accounts can be reopened? Bitcoin's WORTH and Bitcoin's PRICE are different things.$txt$,
 $txt$Bailey ("Digital Value", 2024) hevder at Bitcoins verdi ikke kan reduseres til dollar-vekslingskurser. Evnen til å holde og overføre verdi UTEN tillatelse, uten inflasjonsrisiko, uten frysingsrisiko — er i seg selv verdien.$txt$,
 'Bailey, "Digital Value" (2024)', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Worth ≠ price. The worth: holding value without inflation/freeze risk. The price: USD convenience for traders. A Lebanese citizen's bitcoin worth is "savings preserved across collapse" — not "$X."$txt$,
 $txt$Verdi ≠ pris. Verdien: holde verdi uten inflasjons-/frysrisiko. Prisen: USD-bekvemmelighet for handlere.$txt$,
 ARRAY['value','price','worth','use-value','bailey'], 'high');

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Bitcoin''s 25+ objections collectively prove it has problems',
 'Bitcoins 25+ innvendinger til sammen beviser at det har problemer',
 $txt$Bailey & Warmke (Resistance Money, 2024, Ch. 11.5) take this meta-objection seriously and offer their own NOVEL objection: a "perception of objections" attack. Even if every Bitcoin objection fails, public AWARENESS of objections (without awareness of their refutations) is itself a barrier to Bitcoin adoption. Bitcoin is a network good (more useful as more use it). So the volume of FUD itself reduces the network value, even when the FUD is wrong. To this objection Bailey says: minds change. People learn. The book itself is one effort; reasoned engagement with each objection helps. The path forward is NOT debating whether each objection is wrong (they are) but engaging the public conversation honestly.$txt$,
 $txt$Bailey & Warmke (Resistance Money, 2024) tar denne meta-innvendingen på alvor og tilbyr sin egen NYE innvending: et "innvendings-oppfatning"-angrep. Selv om hver Bitcoin-innvending feiler, er offentlig BEVISSTHET om innvendinger (uten bevissthet om motbevisene) i seg selv en barriere mot Bitcoin-adopsjon.$txt$,
 'Bailey & Warmke, Resistance Money (2024), Ch. 11.5', 'https://andrewmbailey.com/training/', '2024-01-01', CURRENT_DATE,
 $txt$Acknowledge the meta-point: yes, awareness of objections is itself a barrier. The solution is engagement, not dismissal. Cite the book, the 22+ peer-reviewed papers, the 50+ country regulations.$txt$,
 $txt$Erkjenn meta-poenget: ja, bevissthet om innvendinger er i seg selv en barriere. Løsningen er engasjement, ikke avvisning.$txt$,
 ARRAY['meta','perception','network-good','public-discourse','bailey'], 'high');
