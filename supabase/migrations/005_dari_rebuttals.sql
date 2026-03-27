-- Migration 005: Add 5 DARI rebuttals of flawed academic studies
-- These are key rebuttals Daniel Batten / DARI published against widely-cited anti-Bitcoin studies
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Add "rebuttals" category if not exists
INSERT INTO categories (slug, name_no, name_en, icon, description_no, description_en, sort_order) VALUES
  ('rebuttals', 'Tilbakeviste studier', 'Debunked Studies', '🔬', 'DARI-tilbakevisninger av feilaktige akademiske studier om Bitcoin-mining', 'DARI rebuttals of flawed academic studies about Bitcoin mining', 11)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Rebuttal 1: Çelik & Özırmak (2025)
-- ============================================================
INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug = 'rebuttals'), 'published',
'Bitcoin-mining er uforenlig med bærekraftig utvikling (Çelik & Özırmak 2025)',
'Bitcoin mining is incompatible with sustainable development (Çelik & Özırmak 2025)',
'Studien bygger tungt på avkreftede kilder som Mora et al. (2018) og de Vries'' estimater fra 2018. Den ignorerer at 56,7 % av Bitcoins energimiks kommer fra bærekraftige kilder (2024), at over 86 % av avviklede minere gjenbrukes eller resirkuleres, og at Bitcoin-mining fungerer som fleksibel etterspørsel som stabiliserer strømnett. Studien bruker også utdaterte geografiske påstander om kullkonsentrasjon som ikke reflekterer post-2021 redistribusjon til fornybar-rike regioner.',
'The study relies heavily on discredited sources like Mora et al. (2018) and de Vries'' 2018 estimates. It ignores that 56.7% of Bitcoin''s energy mix comes from sustainable sources (2024), that over 86% of decommissioned miners are reused or recycled (actual 2024 e-waste ~2.3 kilotons), and that Bitcoin mining acts as flexible demand stabilizing grids. The study also uses outdated geographic claims about coal concentration that don''t reflect post-2021 redistribution to renewable-rich regions.',
'DARI – Dr. Simon Collins', 'https://www.da-ri.org/rebuttal/celikandozirmaks', '2025-04-01',
'Denne studien siterer Mora et al. som påstod Bitcoin alene kunne forårsake 2°C oppvarming — en påstand som er grundig avkreftet. Den ignorerer også at 86 % av ASIC-er gjenbrukes.',
'This study cites Mora et al. who claimed Bitcoin alone could cause 2°C warming — a claim thoroughly debunked. It also ignores that 86% of ASICs are reused or recycled.',
ARRAY['rebuttal', 'dari', 'celik', 'sustainability', 'sdg'], 'high');

-- ============================================================
-- Rebuttal 2: Dominici et al. / "Harvard Study" (2025)
-- ============================================================
INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug = 'rebuttals'), 'published',
'Bitcoin-mining forårsaker betydelig PM2.5-forurensning i USA (Dominici et al. / "Harvard-studien" 2025)',
'Bitcoin mining causes significant PM2.5 pollution in the US (Dominici et al. / "Harvard Study" 2025)',
'Nature Communications-studien tilskriver utslipp basert på regionale balanseringsmyndigheter i stedet for faktiske kontraktsfestede strømkilder — og ignorerer at mange operasjoner eksplisitt kjøper fornybar energi. Den misbruker WattTimes MOER-metodologi (designet for kortsiktige nettresponser, ikke langsiktige strukturelle endringer). Kun 34 av 137 amerikanske mining-operasjoner ble analysert, og fornybar-tunge operasjoner som Marathons 114 MW vindpark og Crusoes gassoppsamling ble ekskludert. EPA-data fra 2018 ble brukt for å analysere 2022–2023-operasjoner.',
'The Nature Communications study attributes emissions based on regional balancing authorities rather than actual contractual power sources — ignoring that many operations explicitly purchase renewable energy. It misuses WattTime''s MOER methodology (designed for short-term grid responses, not long-term structural changes). Only 34 of 137 US mining operations were analyzed, excluding renewable-heavy operations like Marathon''s 114 MW wind farm and Crusoe''s flare-gas mitigation. 2018 EPA data was used to analyze 2022–2023 operations.',
'DARI', 'https://www.da-ri.org/rebuttal/rebuttal-dominici-et-al-2025', '2025-04-04',
'«Harvard-studien» analyserte bare 34 av 137 minere — og utelot bevisst de mest bærekraftige. Det er som å anslå utslipp fra bilbransjen ved kun å måle SUV-er.',
'"The Harvard study" analyzed only 34 of 137 miners — deliberately excluding the most sustainable ones. That''s like estimating car industry emissions by only measuring SUVs.',
ARRAY['rebuttal', 'dari', 'harvard', 'dominici', 'pm25', 'nature'], 'high');

-- ============================================================
-- Rebuttal 3: Radulescu et al. (2025)
-- ============================================================
INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug = 'rebuttals'), 'published',
'Bitcoin-mining har alvorlige konsekvenser for energi- og vannressurser (Radulescu et al. 2025)',
'Bitcoin mining has severe impacts on energy and water resources (Radulescu et al. 2025)',
'Studien baserer seg på Cambridge-estimater som er over tre år gamle og tidligere avkreftede publikasjoner fra de Vries (2018–2021). Den overser dekarboniseringsfordeler som fornybar integrering, nettstabilisering og metanreduksjon. Vannforbruks-påstandene er misvisende fordi mye av vannet tilskrevet Bitcoin-mining verken er ferskvann eller permanent forbrukt — det brukes i lukkede kjølesystemer og resirkuleres. 15 av 17 store fagfellevurderte artikler viser positiv eller nøytral påvirkning på fornybar energi-integrering.',
'The study relies on Cambridge estimates over three years old and previously debunked de Vries publications (2018–2021). It overlooks decarbonization benefits including renewable integration, grid stabilization, and methane mitigation. Water consumption claims are misleading because much of the water attributed to Bitcoin mining is neither freshwater nor permanently consumed — closed-loop cooling systems and recycled water are standard. 15 of 17 major peer-reviewed articles show positive or neutral impact on renewable energy integration.',
'DARI – Dr. Simon Collins', 'https://www.da-ri.org/rebuttal/re-examining-bitcoin-minings-environmental-impact-a-rebuttal-to-radulescu-et-al-2025', '2025-03-12',
'15 av 17 fagfellevurderte studier viser positive eller nøytrale effekter fra Bitcoin-mining på fornybar energi. Denne studien velger å ignorere dem alle.',
'15 of 17 peer-reviewed studies show positive or neutral effects from Bitcoin mining on renewable energy. This study chose to ignore all of them.',
ARRAY['rebuttal', 'dari', 'radulescu', 'water', 'energy'], 'high');

-- ============================================================
-- Rebuttal 4: Gill et al. — "Economic Limits"
-- ============================================================
INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug = 'rebuttals'), 'published',
'Bitcoin-mining skaper motinsentiver for investering i lagring og nettinfrastruktur (Gill et al.)',
'Bitcoin mining creates counter-incentives for investing in storage and grid infrastructure (Gill et al.)',
'Gill et al. baserer seg på avkreftede forskere (de Vries, Mora) og 2022 Cambridge Index-data. E-avfall-estimatene bruker en tilbakevist levetid på 1,56 år for mining-utstyr — faktisk levetid er minst fire ganger lengre med et robust bruktmarked. Statisk likevektsmodellering ignorerer Bitcoins vanskelighetsjustering som naturlig demper ekspansjon. Minere vil ikke betale fossile brenselsrater (høyeste marginalkostnader) når fornybar energi koster nær null. Duke University-forskning viser at mining faktisk unngår unødvendige nettoppgraderinger.',
'Gill et al. rely on discredited researchers (de Vries, Mora) and 2022 Cambridge Index data. E-waste estimates use a debunked 1.56-year mining equipment lifespan — actual lifespan is at least four times longer with robust secondary markets. Static equilibrium modeling ignores Bitcoin''s difficulty adjustment mechanism that naturally dampens expansion. Miners won''t pay fossil fuel rates (highest marginal costs) when renewable energy costs near zero. Duke University research shows mining actually avoids unnecessary grid upgrades.',
'DARI – Dr. Simon Collins', 'https://www.da-ri.org/rebuttal/self-limited-economists', '2025-01-01',
'Gill et al. bruker en levetid på 1,56 år for mining-utstyr — tilbakevist av hele bransjen. Faktisk levetid er 6+ år med et aktivt bruktmarked. Det er som å hevde at biler skrotes etter 18 måneder.',
'Gill et al. use a 1.56-year lifespan for mining equipment — debunked by the entire industry. Actual lifespan is 6+ years with an active secondary market. That''s like claiming cars are scrapped after 18 months.',
ARRAY['rebuttal', 'dari', 'gill', 'economics', 'ewaste', 'grid'], 'high');

-- ============================================================
-- Rebuttal 5: Chamanara et al. / UN University Study (2023)
-- ============================================================
INSERT INTO facts (category_id, status, claim_no, claim_en, reality_no, reality_en, source_name, source_url, source_date, batten_tip_no, batten_tip_en, tags, confidence) VALUES
((SELECT id FROM categories WHERE slug = 'rebuttals'), 'published',
'FN-universitetet: Bitcoin bruker mer vann enn hele land og har massivt karbonfotavtrykk (Chamanara et al. 2023)',
'UN University: Bitcoin uses more water than entire countries and has massive carbon footprint (Chamanara et al. 2023)',
'FN-studien bruker utdaterte Cambridge-data og de Vries'' metodologi som er fagfellevurdert avkreftet. Vannberegningene inkluderer indirekte vannforbruk i kraftproduksjon (kjølevann) som ikke er unikt for Bitcoin — alle strømforbrukere har dette fotavtrykket. Studien ignorerer at Bitcoin-mining i økende grad bruker lukkede kjølesystemer, ikke-drikkbart vann og fornybar energi som har minimalt vannbehov (sol, vind). Det faktiske direkte vannforbruket er en brøkdel av det som hevdes.',
'The UN study uses outdated Cambridge data and de Vries'' methodology which has been peer-review debunked. Water calculations include indirect water use in power generation (cooling water) which is not unique to Bitcoin — all electricity consumers share this footprint. The study ignores that Bitcoin mining increasingly uses closed-loop cooling systems, non-potable water, and renewable energy with minimal water needs (solar, wind). Actual direct water consumption is a fraction of what is claimed.',
'DARI rebuttal of UN University study', 'https://cdn.prod.website-files.com/627aa615676bdd1d47ec97d4/65b004ac744cd4c6abb8934e_UN%20Paper%20FINAL%20.pdf', '2024-01-01',
'FN-studien teller kjølevann i kraftverk som «Bitcoins vannforbruk» — med den logikken «bruker» Netflix like mye vann. Det er kraftverkets fotavtrykk, ikke Bitcoins.',
'The UN study counts power plant cooling water as "Bitcoin''s water use" — by that logic, Netflix "uses" just as much water. That''s the power plant''s footprint, not Bitcoin''s.',
ARRAY['rebuttal', 'dari', 'un', 'chamanara', 'water', 'carbon'], 'high');
