-- Migration 013: 1 fact addressing the "Bitcoin has been hacked" claim
--
-- Background: A common FUD point is that "Bitcoin has been hacked." This
-- conflates two very different things:
--   1. The Bitcoin protocol itself — which has had exactly ONE critical
--      vulnerability (CVE-2010-5139, the Value Overflow Incident on
--      Aug 15, 2010), patched in under 5 hours via soft fork. No real
--      user lost funds, the invalid chain was orphaned, and nothing
--      comparable has occurred in the 15+ years since.
--   2. Centralized exchanges and custodians (Mt. Gox, Bitfinex, FTX) —
--      these are companies that held users' keys; their failures are
--      not protocol failures. Analogy: "my bank was robbed" is not the
--      same as "the dollar was hacked."
--
-- Source quality: HIGH. CVE-2010-5139 is a documented protocol-level
-- incident with primary sources (Bitcoin Wiki, the actual CVE record,
-- and contemporaneous developer messages from Satoshi). The factual
-- claim — that this is the only such incident — is verifiable against
-- the public CVE list for Bitcoin Core.
--
-- Run in Supabase SQL Editor.

INSERT INTO facts (category_id, status, claim_en, claim_no, reality_en, reality_no, source_name, source_url, source_date, verified_date, batten_tip_en, batten_tip_no, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug='myths'), 'published',
 'Bitcoin has been hacked before',
 'Bitcoin har blitt hacket tidligere',
 $txt$The Bitcoin protocol has had exactly one critical vulnerability in its 15+ year history: the Value Overflow Incident on August 15, 2010 (CVE-2010-5139). An integer overflow bug in transaction validation in wxBitcoin/bitcoind versions before 0.3.11 let a crafted transaction create 184,467,440,737 BTC — orders of magnitude above the 21M supply cap — across three addresses in block 74638. Satoshi Nakamoto released a patched client (v0.3.10) within 5 hours; the network performed a soft fork; the invalid chain was orphaned at block 74691, roughly 19 hours after the incident began. No real user lost funds, and the 21M cap was preserved.

In the 15+ years since: no successful double-spend on mainnet, no forged signatures, no successful 51% attack, no further inflation bugs. Exchange and custodian failures (Mt. Gox 2014, Bitfinex 2016, FTX 2022) are breaches of CENTRALIZED COMPANIES that held users' private keys — not breaches of the Bitcoin protocol itself. The protocol does not care who controls a key; if you control the key, you control the bitcoin. Saying "Bitcoin was hacked" because Mt. Gox lost customer keys is like saying "the dollar was hacked" because a bank vault was robbed.$txt$,
 $txt$Bitcoin-protokollen har hatt nøyaktig én kritisk sårbarhet i sin 15+ års historie: Value Overflow Incident 15. august 2010 (CVE-2010-5139). En integer-overflow-bug i transaksjonsvalideringen i wxBitcoin/bitcoind før versjon 0.3.11 lot en spesiallaget transaksjon generere 184 467 440 737 BTC — langt over 21M-grensen — til tre adresser i blokk 74638. Satoshi Nakamoto publiserte en patch (v0.3.10) innen 5 timer; nettverket utførte en soft fork; den ugyldige kjeden ble forlatt i blokk 74691, ca. 19 timer etter at hendelsen startet. Ingen ekte bruker tapte penger, og 21M-grensen ble bevart.

I de 15+ årene siden: ingen vellykket dobbeltbruk på mainnet, ingen forfalskede signaturer, ingen vellykket 51%-angrep, ingen ytterligere inflasjonsbugger. Exchange- og custodian-tap (Mt. Gox 2014, Bitfinex 2016, FTX 2022) er brudd hos SENTRALISERTE SELSKAPER som holdt brukernes private nøkler — ikke brudd på Bitcoin-protokollen. Å si "Bitcoin ble hacket" fordi Mt. Gox mistet kundenøkler er som å si "dollaren ble hacket" fordi en bankhvelv ble ranet.$txt$,
 'Bitcoin Wiki — CVE-2010-5139 / Value overflow incident', 'https://en.bitcoin.it/wiki/CVE-2010-5139', '2010-08-15', CURRENT_DATE,
 $txt$Are you aware that Bitcoin's only protocol-level vulnerability was patched in under 5 hours back in 2010, when the network was 1.5 years old — and that there have been zero successful attacks on the protocol itself in the 15+ years since? The hacks people remember (Mt. Gox, FTX) were breaches of centralized companies holding customer keys — not breaches of Bitcoin. If you control your own keys, you weren't hacked.$txt$,
 $txt$Er du klar over at Bitcoins eneste protokoll-sårbarhet ble patchet på under 5 timer tilbake i 2010, da nettverket var halvannet år gammelt — og at det har vært null vellykkede angrep på selve protokollen i de 15+ årene siden? Hackene folk husker (Mt. Gox, FTX) var brudd hos sentraliserte selskaper som holdt kundenøkler — ikke brudd på Bitcoin. Hvis du har dine egne nøkler, ble du ikke hacket.$txt$,
 ARRAY['security','protocol','history','common-fud','exchange-hacks','value-overflow','cve-2010-5139','self-custody'], 'high');
