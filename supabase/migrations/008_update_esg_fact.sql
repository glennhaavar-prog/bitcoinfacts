-- Migration 008: Update ESG fact with concrete real-world examples
-- Based on Daniel Batten feedback: previous answer was theoretical,
-- but several ESG-classified Bitcoin products already exist in the market.
-- Run in Supabase SQL Editor.

UPDATE facts
SET
  reality_en = 'ESG funds already invest in Bitcoin — the claim is outdated. Two concrete examples: (1) Jacobi FT Wilshire Bitcoin ETF (BCOIN, Euronext Amsterdam) launched August 2023 as Europe''s first spot Bitcoin ETF, classified as an SFDR Article 8 fund (promotes environmental, social and governance characteristics) with a built-in decarbonization strategy via Renewable Energy Certificates (RECs) to offset emissions. (2) 7RCC Spot Bitcoin and Carbon Credit Futures ETF (BTCK, NYSE Arca) approved late 2024 — a hybrid product holding ~80% spot Bitcoin and ~20% carbon credit futures, explicitly designed as an ESG Bitcoin ETF for sustainability-focused investors. Bitcoin mining is also the only global industry verified to cross the 50% sustainable energy threshold (Cambridge April 2025), making the underlying asset increasingly ESG-compatible.',
  reality_no = 'ESG-fond investerer allerede i Bitcoin — påstanden er utdatert. To konkrete eksempler: (1) Jacobi FT Wilshire Bitcoin ETF (BCOIN, Euronext Amsterdam) ble lansert i august 2023 som Europas første spot Bitcoin ETF, klassifisert som et SFDR Artikkel 8-fond (fremmer miljømessige, sosiale og styringsmessige egenskaper) med innebygd dekarboniseringsstrategi via Renewable Energy Certificates (RECs) for å kompensere for utslipp. (2) 7RCC Spot Bitcoin and Carbon Credit Futures ETF (BTCK, NYSE Arca) godkjent sent 2024 — et hybridprodukt som holder ~80% spot Bitcoin og ~20% karbonkredittfutures, eksplisitt designet som et ESG Bitcoin ETF for bærekraftsfokuserte investorer. Bitcoin-mining er også den eneste globale industrien som er verifisert til å ha krysset 50%-grensen for bærekraftig energi (Cambridge april 2025).',
  source_name = 'Jacobi FT Wilshire (Euronext Amsterdam, 2023) / 7RCC NYSE Arca (2024) / Cambridge April 2025',
  source_url = 'https://www.jacobiam.com/',
  batten_tip_en = 'Lead with the SFDR Article 8 classification — that''s the formal European ESG framework. Then cite the US 7RCC ETF for breadth. Both products exist now (not theoretical). The Cambridge 50%+ sustainable energy figure backs up why ESG investors are increasingly comfortable with Bitcoin.',
  batten_tip_no = 'Led med SFDR Artikkel 8-klassifiseringen — det er det formelle europeiske ESG-rammeverket. Sit deretter den amerikanske 7RCC ETF-en for bredde. Begge produktene eksisterer nå (ikke teoretisk). Cambridge sin 50%+ bærekraftig energi-figur underbygger hvorfor ESG-investorer er stadig mer komfortable med Bitcoin.',
  source_date = '2024-12-01',
  verified_date = CURRENT_DATE,
  tags = ARRAY['esg', 'sfdr', 'jacobi', '7rcc', 'etf', 'institutional', 'sustainability'],
  confidence = 'high'
WHERE claim_en = 'ESG funds cannot invest in Bitcoin';
