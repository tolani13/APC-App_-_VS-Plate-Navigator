// APC Application & VS Plate Navigator — knowledge base
// Taxonomy follows ACGIH Industrial Ventilation, Chapter 13 (Specific Operations).
// VS plate references are series-level pointers for sales discovery only —
// always verify the exact plate against the current ACGIH edition before quoting.

export type Contaminant =
  | 'Dust'
  | 'Fume'
  | 'Mist'
  | 'Vapor'
  | 'Abrasive'
  | 'Sticky'
  | 'Combustible'
  | 'High-toxicity';

export type Condition =
  | 'New system'
  | 'Undersized system'
  | 'Filter problem'
  | 'Process change'
  | 'Visible emissions'
  | 'High energy cost';

export interface AppEntry {
  id: string;
  name: string;
  kind: 'family' | 'equipment';
  family: string;
  parentId?: string; // equipment entries inherit from a family entry
  acgih: string;
  industries: string[];
  contaminants: Contaminant[];
  equipment: string[];
  conditions: Condition[];
  aliases: string[];
  overview: string;
  sourceCapture: string[];
  discovery: string[];
  redFlags: string[];
  camfil: string;
  stakeholders: string[];
  siteSurvey: string[];
  aftermarket: string;
  engineeringTrigger: string;
  caseStudyAngles: string[];
}

export const CONTAMINANTS: Contaminant[] = [
  'Dust', 'Fume', 'Mist', 'Vapor', 'Abrasive', 'Sticky', 'Combustible', 'High-toxicity',
];

export const CONDITIONS: Condition[] = [
  'New system', 'Undersized system', 'Filter problem', 'Process change', 'Visible emissions', 'High energy cost',
];

export const INDUSTRIES = [
  'Woodworking',
  'Metal fabrication',
  'Food & beverage',
  'Pharmaceutical',
  'Recycling',
  'Foundry',
  'Automotive',
  'Aerospace',
  'Composites',
  'Chemical processing',
  'Mining & aggregates',
  'General manufacturing',
];

// ---------------------------------------------------------------------------
// FAMILY-LEVEL ENTRIES (ACGIH Chapter 13 taxonomy)
// ---------------------------------------------------------------------------

export const ENTRIES: AppEntry[] = [
  {
    id: 'welding-cutting',
    name: 'Welding & Cutting',
    kind: 'family',
    family: 'Welding and cutting',
    acgih: 'ACGIH Ch. 13 — VS-40 series (verify plate in current edition)',
    industries: ['Metal fabrication', 'Automotive', 'Aerospace', 'General manufacturing'],
    contaminants: ['Fume', 'High-toxicity'],
    equipment: ['MIG/MAG welder', 'TIG welder', 'Stick welder', 'Plasma cutter', 'Laser cutting table', 'Oxy-fuel cutting', 'Robotic weld cell'],
    conditions: ['New system', 'Undersized system', 'Process change', 'Visible emissions', 'High energy cost'],
    aliases: ['welding', 'weld fume', 'mig', 'tig', 'stick', 'smaw', 'gmaw', 'plasma', 'laser cutting', 'thermal cutting', 'fume extraction', 'weld cell'],
    overview:
      'Welding and thermal cutting generate submicron metallic fume that is a confirmed health hazard — hexavalent chromium on stainless and manganese on mild steel drive exposure limits down. Source capture is strongly preferred over ambient dilution because fume rises on thermal currents straight through the breathing zone.',
    sourceCapture: [
      'Extraction torches or on-torch extraction for MIG/MAG where process allows',
      'Articulated extraction arms positioned within ~1 hood diameter of the arc',
      'Downdraft or backdraft tables for bench-scale welding and fitting',
      'Enclose robotic weld cells and exhaust the enclosure, not the room',
      'For large workpieces: capture at the arc with portable/swing arms rather than relying on push-pull dilution',
    ],
    discovery: [
      'Base metals and filler metals in use (mild steel, stainless, aluminum, galvanized)?',
      'Welding process mix — MIG, TIG, stick, flux-core — and approximate arc-on time per shift?',
      'Manual, robotic, or mixed stations? How many simultaneous arcs?',
      'Current capture method, if any — arms, tables, ambient recirculation?',
      'Any documented exposure monitoring or respiratory protection program?',
      'Is recirculation of filtered air into the workspace being considered?',
      'Production hours, shift patterns, and planned capacity additions?',
    ],
    redFlags: [
      'Stainless or high-alloy welding (Cr VI, Ni) with interest in recirculating filtered air',
      'Galvanized or coated materials being welded or cut',
      'No exposure monitoring history for a long-running operation',
      'Existing extraction arms consistently pushed aside by operators',
      'Weld cell added without re-balancing or re-rating the collector',
    ],
    camfil:
      'Position Camfil APC cartridge collectors (e.g., Gold Series-style) with fire-retardant, high-efficiency media sized for submicron fume, plus spark-management options upstream. Pair with source-capture arms or cell exhaust designs. For stainless fume, frame HEPA-after-filter or safe-duct-to-outdoors options rather than recirculation.',
    stakeholders: ['EHS / safety manager', 'Plant manager', 'Weld shop supervisor', 'Facilities / maintenance', 'Insurance or corporate risk (Cr VI exposure)'],
    siteSurvey: [
      'Map each weld station: process, base metal, arc-on time, workpiece size',
      'Photograph existing capture devices and measure hood-to-arc distances',
      'Record collector make/model/nameplate, duct sizes, and fan data',
      'Note compressed-air availability and dustbin/drum handling preferences',
    ],
    aftermarket:
      'Fume applications are filter-life sensitive — track differential pressure trends and change-out intervals as a recurring revenue stream. Offer media upgrades (flame-retardant, PTFE-membrane) where pulse cleaning underperforms. Spark events drive premature filter damage — sell spark arrestors as protection.',
    engineeringTrigger:
      'Any recirculation of stainless/high-alloy fume, any combustible-metal process mixed into the stream, or more than ~6 simultaneous manual arcs on one collector.',
    caseStudyAngles: [
      'Heavy-equipment fabricator — central fume system replacing wall fans',
      'Job shop — extraction arms + cartridge collector retrofit with measurable air-quality improvement',
    ],
  },
  {
    id: 'woodworking',
    name: 'Woodworking',
    kind: 'family',
    family: 'Woodworking',
    acgih: 'ACGIH Ch. 13 — VS-95 series (verify plate in current edition)',
    industries: ['Woodworking', 'General manufacturing'],
    contaminants: ['Dust', 'Combustible', 'Abrasive'],
    equipment: ['CNC router', 'Table saw', 'Sander', 'Planer', 'Moulder', 'Edge bander', 'Dowel insertion machine'],
    conditions: ['New system', 'Undersized system', 'Filter problem', 'Process change', 'Visible emissions', 'High energy cost'],
    aliases: ['wood', 'sawdust', 'sanding', 'cabinet', 'furniture', 'joinery', 'millwork', 'mdf', 'particleboard', 'combustible dust'],
    overview:
      'Woodworking dust is a classic combustible-dust application with fine, abrasive particulate — sanding dust especially. Hardwoods carry sensitization and carcinogen concerns (oak, beech). NFPA 652 dust hazard analysis (DHA) obligations shape nearly every conversation; capture velocity and enclosure design matter more than raw airflow.',
    sourceCapture: [
      'Machine-supplied hoods verified against VS plate capture velocities — many OEM hoods underperform',
      'Sanding operations: downdraft tables or tight shrouds; fine dust escapes perimeter capture easily',
      'Duct velocities maintained above minimum transport velocity (~4000 fpm for wood dust) to prevent drop-out',
      'Gates/blast gates on every drop with a balancing plan when machines run intermittently',
      'Collector located outdoors or vented/deflagration-protected per NFPA 664/652 findings',
    ],
    discovery: [
      'Wood species and board products (solid hardwood, MDF, particleboard, plywood with adhesives)?',
      'Process mix — sawing, routing, sanding, planing — and which dominate fine-dust load?',
      'Number and location of pickup points; which machines run simultaneously?',
      'Is a dust hazard analysis (DHA) on file? When was it last updated?',
      'Existing collector location — indoors or outdoors — and explosion protection status?',
      'Any history of filter fires, smoldering material in the duct, or visible dust accumulation on surfaces?',
      'Recirculation interest (winter heat savings)?',
      'Production hours and expansion plans?',
    ],
    redFlags: [
      'No DHA on file, or DHA older than the last process change',
      'Kst/Pmax values unknown for the actual dust mix',
      'Interest in recirculating to the workspace without documented testing and monitoring',
      'Existing system modified after installation without re-engineering review',
      'Multiple machines added over time without system re-balancing',
      'Visible dust layer on rafters or equipment — housekeeping gap and secondary-explosion indicator',
    ],
    camfil:
      'Lead with safety-first framing: Camfil APC collectors with appropriate explosion mitigation (venting, suppression, or isolation per the DHA), high-efficiency fire-retardant media, and properly engineered duct design. Emphasize lifecycle value — energy-efficient fan/filter pairing and long filter life on abrasive wood dust.',
    stakeholders: ['EHS manager', 'Plant / operations manager', 'Maintenance lead', 'Insurance carrier / risk engineer', 'Corporate engineering'],
    siteSurvey: [
      'Complete site-survey form; capture photos of every pickup point and hood',
      'Record collector nameplate, fan curve data, duct sizes, and layout sketch',
      'Measure static pressure at key points if safe and permitted',
      'Document dust accumulation patterns and housekeeping practices',
      'Note machine utilization — which drops are open simultaneously',
    ],
    aftermarket:
      'Abrasive dust wears media — position premium long-life cartridges and schedule PM change-outs. Blast gates get left open/closed — offer annual system balancing checks. DHA updates every 5 years (or on change) create re-engagement moments.',
    engineeringTrigger:
      'Any recirculation request, any DHA finding requiring mitigation, indoor collector placement, or addition of machines to an existing system.',
    caseStudyAngles: [
      'Cabinet manufacturer — outdoor collector with explosion venting replacing aging indoor baghouse',
      'Furniture plant — energy savings via proper blast-gate management and VFD fan control',
    ],
  },
  {
    id: 'cnc-router',
    name: 'CNC Router',
    kind: 'equipment',
    family: 'Woodworking',
    parentId: 'woodworking',
    acgih: 'ACGIH Ch. 13, VS-95-07 (verify against current edition)',
    industries: ['Woodworking', 'Composites', 'Aerospace', 'General manufacturing'],
    contaminants: ['Dust', 'Combustible', 'Abrasive'],
    equipment: ['CNC router', 'Nesting CNC', 'Flat-table router'],
    conditions: ['New system', 'Undersized system', 'Process change', 'Visible emissions'],
    aliases: ['cnc', 'router', 'nesting', 'flat table', 'cnc router', 'spoilboard', 'nested-based manufacturing'],
    overview:
      'CNC routers generate high volumes of fine, airborne dust at the spindle — especially on MDF and sheet goods. OEM shrouds often capture well only in some orientations; high feed rates throw chips and fines past the brush skirt. Multi-head and nested-based machines need generous, well-located pickup points.',
    sourceCapture: [
      'Spindle shroud with brush skirt in good condition — verify seal against the work surface',
      'Pickup sized for the full toolpath envelope, including edge cuts and through-cuts',
      'Consider dual pickups or perimeter extraction on large nesting tables',
      'Maintain duct transport velocity; router chips are heavy but sanding-adjacent passes make fines',
    ],
    discovery: [
      'Wood type and board products — solid wood vs. MDF/particleboard/OSB?',
      'Sanding versus routing versus cutting operations on the same machine?',
      'Number and location of pickup points per machine?',
      'Machine enclosure and access requirements for operators?',
      'Existing collector and duct layout — shared with other machines?',
      'Production hours and expansion plans?',
      'Dust hazard analysis status?',
      'Current housekeeping and visible dust issues around the machine?',
    ],
    redFlags: [
      'Unknown combustible dust characteristics for the actual material mix',
      'Recirculation interest without DHA support',
      'Existing system modified after installation',
      'Multiple machines added without system review',
      'Worn or missing shroud brushes — capture has silently degraded',
    ],
    camfil:
      'Same family narrative as Woodworking — safety-first combustible-dust positioning, properly sized collector and duct, explosion mitigation per DHA, premium media for abrasive fines.',
    stakeholders: ['EHS manager', 'Plant / operations manager', 'Maintenance lead', 'CNC shop supervisor'],
    siteSurvey: [
      'Complete site-survey form',
      'Capture photos of spindle shroud, pickup points, and collector nameplate',
      'Submit engineering review packet',
      'Record machine duty cycle and simultaneous-machine count',
    ],
    aftermarket:
      'Abrasive fines shorten filter life — lock in a scheduled change-out program. Shroud brushes and flex hose are wear items worth bundling into PM visits.',
    engineeringTrigger:
      'Adding routers to an existing system, any recirculation proposal, or MDF-heavy cutting with no DHA.',
    caseStudyAngles: [
      'Nesting operation — capture restoration via shroud redesign plus right-sized collector',
    ],
  },
  {
    id: 'grinding-buffing',
    name: 'Grinding, Buffing, Polishing & Abrasive Blasting',
    kind: 'family',
    family: 'Grinding, buffing, polishing, and abrasive blasting',
    acgih: 'ACGIH Ch. 13 — VS-80 series (verify plate in current edition)',
    industries: ['Metal fabrication', 'Aerospace', 'Automotive', 'Foundry', 'General manufacturing'],
    contaminants: ['Dust', 'Abrasive', 'Combustible', 'High-toxicity'],
    equipment: ['Pedestal grinder', 'Bench grinder', 'Belt sander', 'Buffing jack', 'Polishing lathe', 'Blast cabinet', 'Blast room', 'Swing-frame grinder'],
    conditions: ['New system', 'Undersized system', 'Filter problem', 'Visible emissions', 'High energy cost'],
    aliases: ['grinding', 'grinder', 'buffing', 'polishing', 'blasting', 'sandblasting', 'abrasive blasting', 'shot blast', 'deburring', 'aluminum grinding', 'titanium'],
    overview:
      'Grinding and buffing throw heavy particulate with a strong directional trajectory — hoods must intercept the throw, not just the cloud. Aluminum, magnesium, and titanium fines are combustible-metal hazards requiring wet collectors or specifically rated dry systems. Abrasive blasting adds extreme media loading and wear.',
    sourceCapture: [
      'Backdraft/downdraft hoods aligned with the particle trajectory, per VS plate geometry',
      'Enclose blasting operations; reclaim systems need their own exhaust balance',
      'Buffing with compound: capture both dust and sticky compound carryover',
      'Combustible metals: wet collector (NFPA 484) — never mix into a dry combustible-dust system',
    ],
    discovery: [
      'Metals being ground — steel, stainless, aluminum, titanium, magnesium, mixed?',
      'Hand-held or fixed workpieces? Operator position relative to throw direction?',
      'Buffing compounds in use (rouge, tripoli) — sticky load on filters?',
      'Blast media type and reclaim system details?',
      'Any mixed metals on the same duct system (steel + aluminum = hazard)?',
      'Existing wet collector or dry? Condition and age?',
      'Silica content risk (castings, blasting sand) and exposure monitoring?',
    ],
    redFlags: [
      'Aluminum/magnesium/titanium dust in a dry collector without NFPA 484 review',
      'Mixed combustible metals sharing one duct system',
      'Buffing compound blinding filters (sticky load)',
      'Silica-bearing blasting media still in use',
      'Hoods misaligned with throw direction — visible escape at the wheel',
    ],
    camfil:
      'Segment the offer: wet collection for combustible metals; heavy-duty cartridge collectors with abrasion-resistant inlet design for steel grinding; media selected for compound-laden buffing loads. Lead with compliance safety (NFPA 484, silica RCS) — these customers respond to risk framing.',
    stakeholders: ['EHS manager', 'Shop supervisor', 'Maintenance lead', 'Corporate risk / insurance'],
    siteSurvey: [
      'Photograph each hood and note orientation to the wheel/belt throw',
      'Identify every metal ground on each line — walk the process, don\'t trust the org chart',
      'Record collector type (wet/dry), nameplate, and water-system condition if wet',
      'Sample or request records of dust characterization testing',
    ],
    aftermarket:
      'Abrasion wears inlets, duct, and filters — sell wear liners and premium media. Sticky buffing loads drive frequent change-outs: offer compound-specific media trials. Wet collectors need sludge handling service conversations.',
    engineeringTrigger:
      'Any combustible metal, any silica-bearing media, or conversion between wet and dry collection.',
    caseStudyAngles: [
      'Aerospace finishing shop — titanium grinding moved to wet collection after insurance audit',
      'Automotive supplier — buffing filter life doubled with media change',
    ],
  },
  {
    id: 'machining',
    name: 'Machining',
    kind: 'family',
    family: 'Machining',
    acgih: 'ACGIH Ch. 13 — VS-60 series (verify plate in current edition)',
    industries: ['Metal fabrication', 'Automotive', 'Aerospace', 'General manufacturing'],
    contaminants: ['Mist', 'Vapor', 'Fume'],
    equipment: ['CNC machining center', 'Lathe', 'Mill', 'Grinder (wet)', 'Screw machine', 'Hobbing machine', 'EDM'],
    conditions: ['New system', 'Filter problem', 'Process change', 'Visible emissions', 'High energy cost'],
    aliases: ['machining', 'cnc mill', 'lathe', 'oil mist', 'coolant mist', 'metalworking fluid', 'smoke', 'mist collector', 'turning', 'milling'],
    overview:
      'Wet machining generates coolant/oil mist and, on high-temperature operations, oil smoke. Enclosed CNC machines simplify capture (machine-mounted exhaust), while open machines need hooding. Straight-oil systems carry fire risk; water-miscible coolants carry biological and dermatological concerns.',
    sourceCapture: [
      'Machine-mounted mist collectors or direct duct connections on enclosed CNC machines',
      'Maintain negative pressure in the enclosure so mist doesn\'t escape when doors open',
      'Multi-stage filtration: mechanical pre-separation + fiber bed/HEPA for submicron smoke',
      'Allow dwell time after cycle end before door opening — capture continues during coast-down',
    ],
    discovery: [
      'Coolant chemistry — straight oil, soluble, semi-synthetic, synthetic?',
      'Enclosed or open machines? Door-open frequency per cycle?',
      'Mist or smoke — any high-heat operations (hardened turning, grinding)?',
      'Existing mist collectors — per-machine or central? Condition?',
      'Visible haze in the shop, residue on lights/rafters, or slip hazards on floors?',
      'Fire history or insurance concerns with straight-oil machines?',
      'Reclaim value of captured oil — is it returned to sumps?',
    ],
    redFlags: [
      'Straight-oil machining with electrostatic or dry collectors showing fire history',
      'Electrostatic precipitators with deferred maintenance — arcing and efficiency collapse',
      'Visible blue haze at ceiling level (chronic under-capture)',
      'Coolant changes (chemistry switch) without collector review',
      'Central system serving mixed straight-oil and water-based machines',
    ],
    camfil:
      'Position multi-stage mist collection sized to machine enclosure volume and door-open behavior, with HEPA final stages where smoke or fine mist is present. Emphasize captured-fluid reclaim, housekeeping improvements, and fire-safe design for straight-oil lines as differentiators vs. legacy electrostatics.',
    stakeholders: ['Plant manager', 'EHS manager', 'Maintenance lead', 'Manufacturing engineering'],
    siteSurvey: [
      'Count machines by enclosure type, coolant type, and duty cycle',
      'Photograph existing collectors and note oil residue patterns on surfaces',
      'Record machine enclosure volumes and door-open cadence',
      'Check floor condition around machines (slip-hazard evidence)',
    ],
    aftermarket:
      'Mist filters load progressively — staged media replacement schedules are predictable recurring revenue. Offer efficiency upgrades on aging electrostatics (avoid their maintenance burden). Coolant-chemistry changes trigger re-specification visits.',
    engineeringTrigger:
      'Straight-oil with fire history, central systems over ~10 machines, or any HEPA final stage on a recirculation path.',
    caseStudyAngles: [
      'Transmission plant — electrostatic-to-media conversion cutting maintenance hours',
      'Aerospace machine shop — haze elimination documented with particle counts',
    ],
  },
  {
    id: 'foundry',
    name: 'Foundry & Metal Melting',
    kind: 'family',
    family: 'Foundry and metal melting',
    acgih: 'ACGIH Ch. 13 — VS-90 series (verify plate in current edition)',
    industries: ['Foundry', 'Metal fabrication', 'Automotive', 'Recycling'],
    contaminants: ['Fume', 'Dust', 'Combustible', 'High-toxicity', 'Abrasive'],
    equipment: ['Induction furnace', 'Cupola', 'Electric arc furnace', 'Pouring station', 'Shakeout', 'Sand handling', 'Shot blast'],
    conditions: ['New system', 'Undersized system', 'Process change', 'Visible emissions'],
    aliases: ['foundry', 'melting', 'furnace', 'casting', 'shakeout', 'molding sand', 'silica', 'pouring', 'smelting', 'die casting'],
    overview:
      'Foundries combine extreme heat, silica-bearing sand, metallic fume, and combustion byproducts. Capture must handle thermal buoyancy (canopy hoods, furnace-side extraction) and very high dust loading (shakeout, sand systems). Crystalline silica exposure drives regulatory scrutiny; heat kills filters without spark and temperature management.',
    sourceCapture: [
      'Canopy or side-draft hoods at furnaces sized for thermal plume volume, not just face area',
      'Enclose shakeout with exhaust maintaining inward airflow at all openings',
      'Sand systems: capture at every transfer, screen, and conveyor point',
      'Spark arrestion and temperature control (dilution/cooler) ahead of any fabric filter',
    ],
    discovery: [
      'Furnace type, capacity, and melt schedule (batch vs. continuous)?',
      'Metals poured — iron, steel, aluminum, brass/bronze (lead, zinc content)?',
      'Sand system type — green sand, no-bake, lost foam?',
      'Silica exposure monitoring history and OSHA compliance status?',
      'Existing collector condition — baghouse age, emissions history, opacity events?',
      'Hot work near collection equipment — spark/fire history?',
    ],
    redFlags: [
      'Brass/bronze melting (lead/zinc fume) with recirculation interest',
      'Baghouse fires or smoldering events in history',
      'Silica overexposure citations or pending OSHA interaction',
      'Shakeout without enclosure — massive exposure point',
      'Collector undersized after furnace capacity upgrades',
    ],
    camfil:
      'Frame as heavy-duty continuous-duty collection: high-temp-rated collectors with spark management, abrasion-tolerant inlets, and premium media for silica-laden, abrasive loads. Emphasize uptime and compliance documentation support — foundries buy reliability and regulator-readiness.',
    stakeholders: ['Plant manager', 'EHS / industrial hygiene', 'Maintenance manager', 'Corporate engineering', 'Environmental compliance'],
    siteSurvey: [
      'Walk the full melt-to-shakeout process flow; photograph every emission point',
      'Record furnace nameplate data, melt rates, and cycle timing',
      'Document existing hood geometry vs. furnace/pour geometry',
      'Note ambient temperatures, crane paths, and physical constraints for duct routing',
    ],
    aftermarket:
      'High-load, high-temperature service consumes filters — structured PM contracts are the norm, not the exception. Cages, bags/cartridges, and spark arrestor service all recur. Opacity complaints create urgent re-engagement.',
    engineeringTrigger:
      'Always — foundry systems are engineered projects. Route every foundry opportunity through applications engineering.',
    caseStudyAngles: [
      'Iron foundry — shakeout enclosure cutting silica exposure below action level',
      'Die caster — baghouse rebuild after fire with added spark management',
    ],
  },
  {
    id: 'material-transport',
    name: 'Material Transport, Conveying, Filling & Loadout',
    kind: 'family',
    family: 'Material transport, conveying, filling, bins, hoppers, and truck/rail loading',
    acgih: 'ACGIH Ch. 13 — VS-30 series (verify plate in current edition)',
    industries: ['Food & beverage', 'Recycling', 'Mining & aggregates', 'Chemical processing', 'Pharmaceutical', 'General manufacturing'],
    contaminants: ['Dust', 'Combustible', 'Abrasive', 'Sticky', 'High-toxicity'],
    equipment: ['Conveyor transfer point', 'Bucket elevator', 'Bag dump station', 'Silo/bin vent', 'Truck loading spout', 'Railcar loadout', 'Screw conveyor', 'Weigh hopper'],
    conditions: ['New system', 'Undersized system', 'Filter problem', 'Process change', 'Visible emissions'],
    aliases: ['conveyor', 'transfer point', 'bin vent', 'silo', 'hopper', 'bucket elevator', 'bag dump', 'truck loading', 'rail loading', 'loadout', 'chute', 'pneumatic conveying'],
    overview:
      'Dust is generated wherever material falls, accelerates, or displaces air — transfer points, filling, and loadout. Capture is about enclosing the drop and exhausting the displaced air volume (air entrainment scales with drop height and throughput). Many of these streams are combustible (grain, sugar, plastics) or abrasive (minerals).',
    sourceCapture: [
      'Enclose transfer points with skirted hoods; exhaust the displaced-air volume plus indraft margin',
      'Bin/silo vents: vent filters sized for filling air displacement rate, not just breathing',
      'Bag dump stations: downdraft capture with integral hopper',
      'Loadout spouts: capture at the spout-to-hatch annulus during filling',
    ],
    discovery: [
      'Material identity, particle size, moisture, flowability — MSDS and dust test data?',
      'Throughput rates, batch vs. continuous, drop heights?',
      'Combustibility data (Kst/Pmax) — grain, sugar, plastics, wood, metals?',
      'Existing vent filters on bins/silos — condition and history of blinding?',
      'Product reclaim value — is captured dust returned to process?',
      'Indoor vs. outdoor locations; freeze/condensation exposure?',
      'Cross-contamination constraints (food, pharma)?',
    ],
    redFlags: [
      'Silo vent filters with history of blinding or over-pressurization events',
      'Unknown Kst on an organic dust stream',
      'Hygroscopic/sticky materials proposed for standard media',
      'Food/pharma streams with cross-contamination or allergen concerns',
      'Transfer-point hoods added piecemeal without system airflow accounting',
    ],
    camfil:
      'Lead with point-of-use vent filters and compact collectors matched to displacement airflow, with explosion protection per DHA. Emphasize product reclaim (captured dust = salable product in food/agg), sanitary options for food/pharma, and media selection for sticky or abrasive service.',
    stakeholders: ['Plant manager', 'Process engineer', 'EHS manager', 'Maintenance lead', 'Quality (food/pharma)'],
    siteSurvey: [
      'Document every transfer/fill point with photos and dimensions',
      'Record material specs, throughput, and cycle times',
      'Inspect existing vent filters — note blinding, leakage, corrosion',
      'Sketch conveying routes and identify shared-duct opportunities',
    ],
    aftermarket:
      'Vent filters are consumable and numerous — fleet-wide change-out agreements are high-volume recurring revenue. Sticky and abrasive service accelerates replacement. Silo over-pressurization events create urgent service calls.',
    engineeringTrigger:
      'Combustible dust without test data, bin/silo over-pressure history, or food/pharma sanitary requirements.',
    caseStudyAngles: [
      'Grain terminal — vent filter fleet upgrade ending blinding-driven downtime',
      'Snack food plant — reclaim of seasoning dust offsetting system cost',
    ],
  },
  {
    id: 'conveyor-transfer',
    name: 'Conveyor Transfer Point',
    kind: 'equipment',
    family: 'Material transport, conveying, filling, bins, hoppers, and truck/rail loading',
    parentId: 'material-transport',
    acgih: 'ACGIH Ch. 13 — VS-30 series (verify plate in current edition)',
    industries: ['Food & beverage', 'Mining & aggregates', 'Recycling', 'Chemical processing'],
    contaminants: ['Dust', 'Abrasive', 'Combustible'],
    equipment: ['Conveyor transfer point', 'Belt conveyor', 'Chute'],
    conditions: ['Undersized system', 'Filter problem', 'Visible emissions'],
    aliases: ['transfer point', 'belt transfer', 'chute', 'conveyor discharge', 'skirting'],
    overview:
      'The classic dust point: material falling from one belt to another entrains air proportional to drop height and tonnage. Capture design hinges on enclosure (skirting), stilling-zone volume, and exhausting displaced air at the right location.',
    sourceCapture: [
      'Enclose with proper skirting and a stilling chamber; exhaust downstream of the impact point',
      'Size exhaust for induced airflow from belt speed and drop height',
      'Multiple transfers on one collector: airflow accounting per point is mandatory',
    ],
    discovery: [
      'Tonnage per hour, belt speed, drop height at each transfer?',
      'Material abrasiveness and moisture?',
      'Skirting and enclosure condition today?',
      'How many transfer points share (or should share) one collector?',
    ],
    redFlags: [
      'Visible dust plume at transfers despite an existing collector (enclosure failure, not airflow)',
      'Abrasive minerals wearing through hoods and duct',
      'Transfers modified (taller drops, faster belts) without exhaust review',
    ],
    camfil:
      'Compact collector near the transfer cluster with abrasion-resistant design; position enclosure/skirting correction as part of the solution, not an afterthought.',
    stakeholders: ['Plant manager', 'Maintenance lead', 'Process engineer'],
    siteSurvey: [
      'Photograph each transfer with belt running (visible plume = diagnostic gold)',
      'Measure drop heights, belt widths, skirting lengths',
    ],
    aftermarket: 'Wear liners, skirting rubber, and filter media on abrasive duty recur predictably.',
    engineeringTrigger: 'More than ~4 transfers on one collector, or combustible material.',
    caseStudyAngles: ['Aggregate plant — plume elimination via enclosure-first retrofit'],
  },
  {
    id: 'mixing',
    name: 'Mixing',
    kind: 'family',
    family: 'Mixing',
    acgih: 'ACGIH Ch. 13 — verify plate in current edition',
    industries: ['Food & beverage', 'Pharmaceutical', 'Chemical processing', 'General manufacturing'],
    contaminants: ['Dust', 'Vapor', 'Combustible', 'Sticky', 'High-toxicity'],
    equipment: ['Ribbon blender', 'Paddle mixer', 'High-shear mixer', 'Planetary mixer', 'Batch mixer', 'Continuous mixer'],
    conditions: ['New system', 'Filter problem', 'Process change', 'Visible emissions'],
    aliases: ['mixing', 'mixer', 'blender', 'blending', 'batching', 'ingredient addition', 'dump station'],
    overview:
      'Mixing generates dust at ingredient addition (dump events) and during agitation of dry materials; solvent-based mixing adds vapor. Capture focuses on the charge port and mixer vent. Food and pharma mixers add sanitary design, allergen segregation, and potent-compound containment requirements.',
    sourceCapture: [
      'Capture at the charge/dump port — the peak emission moment',
      'Vent the mixer headspace for displaced air during filling',
      'Slotted or enclosure hoods at open mixers; keep operator out of the capture zone',
      'Potent compounds (pharma): containment-rated capture with safe-change filtration',
    ],
    discovery: [
      'Ingredients and their hazards — combustible, allergen, potent, solvent-bearing?',
      'Batch size, additions per batch, dump method (bags, totes, scoops)?',
      'Mixer type and whether it can be vented/enclosed?',
      'Cross-contamination rules — dedicated lines vs. changeover?',
      'Existing capture at the dump point — operator complaints?',
      'Cleaning method — washdown near collectors?',
    ],
    redFlags: [
      'Potent compounds (hormones, APIs) without containment-rated equipment',
      'Solvent vapor mixed into a dust collector stream (LEL risk)',
      'Allergen segregation requirements with shared ductwork',
      'Bag-dump events with no capture and visible dust clouds',
    ],
    camfil:
      'Position sanitary or industrial collectors at dump/charge points with safe-change options for potent compounds, explosion protection for combustible ingredients, and washable/cleanable configurations for food. Frame around product quality and operator protection together.',
    stakeholders: ['EHS manager', 'Quality assurance', 'Process engineer', 'Operations manager'],
    siteSurvey: [
      'Observe a full batch cycle including ingredient additions',
      'List every ingredient with hazard data sheets',
      'Photograph charge ports, mixer vents, and operator positions',
      'Note washdown zones and electrical classifications',
    ],
    aftermarket:
      'Frequent change-outs on dusty batch duty; safe-change (bag-in/bag-out) components add service revenue. Sanitary applications value documented PM. Recipe changes trigger re-reviews.',
    engineeringTrigger:
      'Potent compounds, solvent-bearing streams, or allergen-critical food lines.',
    caseStudyAngles: [
      'Bakery mix line — dump-station capture ending allergen complaints',
      'Pharma blender — safe-change containment upgrade passing audit',
    ],
  },
  {
    id: 'open-surface-tanks',
    name: 'Open Surface Tanks',
    kind: 'family',
    family: 'Open surface tanks',
    acgih: 'ACGIH Ch. 13 — VS-75 series (verify plate in current edition)',
    industries: ['Metal fabrication', 'Chemical processing', 'Aerospace', 'Automotive', 'General manufacturing'],
    contaminants: ['Vapor', 'Mist', 'High-toxicity'],
    equipment: ['Plating tank', 'Degreasing tank', 'Pickling tank', 'Anodizing line', 'Cleaning tank', 'Etching tank', 'Chromating tank'],
    conditions: ['New system', 'Undersized system', 'Process change', 'Visible emissions'],
    aliases: ['tank', 'plating', 'degreasing', 'pickling', 'anodizing', 'etching', 'lateral exhaust', 'push-pull tank', 'electroplating', 'chrome'],
    overview:
      'Open tanks emit vapor, mist, and gases across the liquid surface; lateral exhaust (slot hoods along tank sides) is the classic VS plate application. Hazard class of the tank contents (per ACGIH hazard classification A–D) drives capture velocity. Chrome plating and cyanide/acid systems are high-toxicity with strict OSHA rules.',
    sourceCapture: [
      'Lateral slot exhaust sized from tank dimensions and hazard class per the VS plate',
      'Push-pull (jet-assisted) for wide tanks where pull-only can\'t reach across',
      'Maintain slot velocity against crossdrafts — room air currents defeat marginal systems',
      'Scrubber/mist elimination where corrosive or regulated gases are captured',
    ],
    discovery: [
      'Tank chemistry — acids, caustics, solvents, chrome, cyanide?',
      'Tank dimensions, liquid temperature, agitation (air sparging raises emissions)?',
      'Process rate — parts per hour, drag-out volume?',
      'Existing lateral exhaust — slot dimensions, duct condition, corrosion?',
      'OSHA history — chrome PEL issues, citations, monitoring results?',
      'Crossdraft sources near the tanks (doors, fans, crane movement)?',
    ],
    redFlags: [
      'Hexavalent chrome plating — strict OSHA substance-specific standard',
      'Air-agitated tanks (vastly higher emission rates)',
      'Corroded duct/fan on acid service — imminent failure risk',
      'Tank lines added or widened without exhaust re-design',
      'Cyanide and acid streams that could mix (HCN risk)',
    ],
    camfil:
      'This is a ventilation-engineering-led sale — Camfil APC supports with corrosion-appropriate air handling and mist/gas stage recommendations, but the slot design must come from engineering. Position compliance expertise (chrome standard) as the door-opener.',
    stakeholders: ['EHS manager', 'Process/plating engineer', 'Plant manager', 'Environmental compliance'],
    siteSurvey: [
      'Measure every tank: length, width, liquid level, freeboard',
      'Record chemistry, temperature, agitation per tank',
      'Photograph existing slots, duct, fan, and corrosion state',
      'Note crossdraft sources and building pressure issues',
    ],
    aftermarket:
      'Corrosion consumes fans and duct — inspection and replacement services recur. Mist-eliminator stages need scheduled media. Chemistry changes trigger re-evaluation visits.',
    engineeringTrigger:
      'Always — tank ventilation is plate-driven engineering. Escalate every tank opportunity, especially chrome and cyanide.',
    caseStudyAngles: [
      'Job-shop plater — chrome compliance achieved via slot redesign plus monitoring',
    ],
  },
  {
    id: 'paint-operations',
    name: 'Paint Operations',
    kind: 'family',
    family: 'Paint operations',
    acgih: 'ACGIH Ch. 13 — VS-70 series (verify plate in current edition)',
    industries: ['Automotive', 'Aerospace', 'Metal fabrication', 'Woodworking', 'General manufacturing'],
    contaminants: ['Mist', 'Vapor', 'Sticky', 'High-toxicity'],
    equipment: ['Spray booth', 'Paint booth', 'Powder coating booth', 'HVLP spray', 'Electrostatic spray', 'Dip tank', 'Flow coater'],
    conditions: ['New system', 'Filter problem', 'Process change', 'Visible emissions', 'High energy cost'],
    aliases: ['paint', 'spray booth', 'painting', 'powder coat', 'powder coating', 'overspray', 'coating', 'finishing', 'hvlp'],
    overview:
      'Spray finishing needs controlled airflow through the booth to capture overspray (mist) and solvent vapor while protecting finish quality. Dry-filter and waterwash booths both depend on correct face velocity and filtration staging. Powder coating is a different animal — recoverable particulate, often with cartridge reclaim systems.',
    sourceCapture: [
      'Maintain design face velocity uniformly — dead zones cause overspray escape and finish defects',
      'Stage filtration: arrestor pads/rolls for overspray, then final filtration',
      'Balance booth pressure vs. adjacent spaces to control contamination',
      'Powder booths: cartridge reclaim with safe color-change design',
    ],
    discovery: [
      'Coating chemistry — solvent-borne, waterborne, high-solids, isocyanates (2K)?',
      'Booth type — downdraft, crossdraft, waterwash, dry filter?',
      'Finish quality requirements (Class A surface?) and defect history?',
      'Filter change frequency and disposal cost today?',
      'Powder: reclaim rate, color-change frequency, combustible-dust review?',
      'Energy cost of booth makeup air — heat in winter?',
    ],
    redFlags: [
      'Isocyanate-containing coatings — respiratory sensitizer, strict controls',
      'Exhaust stack emissions complaints from neighbors',
      'Frequent filter change-outs driving cost and downtime',
      'Booth modifications (extensions, added stations) without airflow re-balance',
      'Powder systems without combustible-dust assessment',
    ],
    camfil:
      'Position filtration consumables expertise: staged overspray arrestors plus final filters tuned for life and capture, powder-booth cartridge systems, and energy analysis for makeup-air costs. Paint is an aftermarket-rich account — lead with filter performance and total cost per part.',
    stakeholders: ['Paint shop supervisor', 'Plant manager', 'EHS manager', 'Quality manager', 'Maintenance'],
    siteSurvey: [
      'Measure booth dimensions and observe spraying with filters loaded and clean',
      'Record current filter specs, change-out frequency, and disposal route',
      'Photograph overspray patterns on walls/floors (airflow diagnostics)',
      'Collect coating SDS and usage volumes',
    ],
    aftermarket:
      'One of the strongest consumables accounts in APC: arrestor media, final filters, powder cartridges on fixed cycles. Track cost-per-part and offer trials with documented comparisons. Disposal-cost reduction (longer-life media) closes deals.',
    engineeringTrigger:
      'Isocyanates with recirculation interest, booth airflow redesign, or powder reclaim on combustible powders.',
    caseStudyAngles: [
      'Tier-1 auto supplier — filter life doubled, disposal cost cut, finish rejects down',
      'Powder coater — cartridge reclaim upgrade improving transfer efficiency',
    ],
  },
  {
    id: 'lvhv',
    name: 'Low-Volume / High-Velocity (LVHV) Source Capture',
    kind: 'family',
    family: 'Low-volume/high-velocity source capture',
    acgih: 'ACGIH Ch. 13 — verify LVHV plates in current edition',
    industries: ['Composites', 'Aerospace', 'Woodworking', 'Metal fabrication', 'General manufacturing'],
    contaminants: ['Dust', 'Combustible', 'Abrasive', 'High-toxicity'],
    equipment: ['Handheld sander', 'Orbital sander', 'Hand grinder', 'Trim router', 'Dowel drill'],
    conditions: ['New system', 'Undersized system', 'Visible emissions', 'High energy cost'],
    aliases: ['lvhv', 'low volume high velocity', 'tool-mounted extraction', 'on-tool extraction', 'central vacuum', 'vacuum sanding', 'composites sanding'],
    overview:
      'LVHV puts small capture openings right at the tool — 1–2 inch hoses at high velocity instead of large hoods. Ideal for handheld tools on composites, fiberglass, and fine finishing where operators move constantly. Air volumes are small but velocities and static pressures are high; the collector is essentially an industrial vacuum.',
    sourceCapture: [
      'Tool-integrated shrouds matched to each tool model — generic shrouds underperform',
      'Hose runs kept short with minimal bends; diameter matched to tool port',
      'High-static collectors/vacuum producers — not standard low-static dust collectors',
      'Consider automatic gates per station so only active tools draw air',
    ],
    discovery: [
      'Tool list with make/model — can shrouds be fitted?',
      'Material being worked — carbon fiber, fiberglass, wood, metal (toxicity and combustibility)?',
      'Number of simultaneous operators and station layout?',
      'Hose management and operator acceptance history?',
      'Carbon fiber or conductive dust — special handling needs?',
    ],
    redFlags: [
      'Carbon-fiber dust (conductive — electrical equipment rating issues)',
      'Operators removing shrouds because of tool balance/interference',
      'Standard dust collector proposed for high-static LVHV duty (it will fail)',
      'Toxic dust (beryllium, lead paint) needing HEPA and safe-change',
    ],
    camfil:
      'Position high-static vacuum collection with appropriate filtration (HEPA where toxic), per-station gating for energy control, and tool-shroud guidance. Emphasize operator ergonomics in shroud selection — acceptance is the make-or-break factor.',
    stakeholders: ['EHS manager', 'Production supervisor', 'Operators (acceptance!)', 'Facilities'],
    siteSurvey: [
      'Inventory tools and stations; photograph work practices',
      'Measure station layout for hose/drop routing',
      'Observe actual operator technique and reach requirements',
    ],
    aftermarket:
      'Hoses, shrouds, cuffs, and gaskets are wear items — bundle into service. Filter media on fine composite dust loads steadily. Station additions expand the installed base.',
    engineeringTrigger:
      'Toxic or conductive dusts, or more than ~20 stations on one producer.',
    caseStudyAngles: [
      'Composites fabricator — on-tool capture bringing fiber exposure under control',
    ],
  },
  {
    id: 'vehicle-exhaust',
    name: 'Vehicle Exhaust',
    kind: 'family',
    family: 'Vehicle exhaust',
    acgih: 'ACGIH Ch. 13 — verify plate in current edition',
    industries: ['Automotive', 'General manufacturing'],
    contaminants: ['Fume', 'Vapor', 'High-toxicity'],
    equipment: ['Tailpipe extraction', 'Hose drop', 'Underground exhaust system', 'Dynamometer cell'],
    conditions: ['New system', 'Visible emissions', 'High energy cost'],
    aliases: ['vehicle exhaust', 'tailpipe', 'diesel exhaust', 'hose reel', 'garage exhaust', 'service bay', 'fire station', 'maintenance bay'],
    overview:
      'Diesel and gasoline exhaust capture at service bays, fire stations, inspection lanes, and dyno cells. Diesel particulate is a recognized carcinogen — source capture at the tailpipe is the standard. Fire/EMS stations have strong awareness and funding; maintenance shops need education.',
    sourceCapture: [
      'Direct tailpipe connection with hose drops/reels that move with the vehicle',
      'Nozzle matched to pipe geometry including stacked/dual exhaust',
      'High-temp-rated hose and fan placement for hot exhaust',
      'Ambient capture is a distant second choice — insist on source connection',
    ],
    discovery: [
      'Vehicle types and duty cycles — idle, run-up, dyno testing?',
      'Bay layout and vehicle movement paths?',
      'Existing extraction — functioning? Hoses intact? Nozzles matched to current fleet?',
      'Fire/EMS station with diesel running in-apparatus bays?',
      'Any documented health complaints or union attention?',
    ],
    redFlags: [
      'Diesel run-up or regeneration events indoors without direct capture',
      'Damaged hoses/nozzles left hanging (system present but non-functional)',
      'Fleet change (larger vehicles) making existing nozzles obsolete',
      'Dyno cells without engineered extraction — extreme concentration',
    ],
    camfil:
      'Straightforward source-capture sale: rail/hose-reel systems with filtration where discharge requires it. Fire stations are reference-rich, grant-funded accounts — ask about funding cycles. Position carcinogen framing for fleet maintenance decision-makers.',
    stakeholders: ['Fleet manager', 'Facilities manager', 'Fire chief / station captain', 'EHS'],
    siteSurvey: [
      'Measure bay dimensions and document vehicle flow patterns',
      'Inventory tailpipe configurations across the fleet',
      'Photograph existing equipment condition',
    ],
    aftermarket:
      'Hoses and nozzles are wear items — scheduled inspection agreements work well. Filters on filtered systems change on duty cycle. Fleet changes trigger nozzle updates.',
    engineeringTrigger: 'Dyno cells and enclosed run-up rooms — engineered airflow required.',
    caseStudyAngles: [
      'Municipal fire fleet — station-wide tailpipe capture funded by grant',
    ],
  },
  {
    id: 'push-pull',
    name: 'Push-Pull Systems',
    kind: 'family',
    family: 'Push-pull systems',
    acgih: 'ACGIH Ch. 13 — verify plate in current edition',
    industries: ['Metal fabrication', 'Chemical processing', 'General manufacturing', 'Automotive'],
    contaminants: ['Fume', 'Vapor', 'Mist'],
    equipment: ['Wide tank push-pull', 'Large workpiece welding push-pull', 'Assembly line push-pull'],
    conditions: ['New system', 'Undersized system', 'High energy cost'],
    aliases: ['push pull', 'push-pull', 'jet assisted', 'air jet', 'cross flow', 'wide tank'],
    overview:
      'Push-pull uses a supply air jet to carry contaminants across a wide span to a receiving hood — for tanks too wide for lateral exhaust, or open processes where enclosures are impossible. The jet does the work; the exhaust must only capture what the jet delivers. Sensitive to crossdrafts and jet/exhaust balance.',
    sourceCapture: [
      'Jet manifold sized for throw distance — velocity at the receiving hood must still exceed capture requirement',
      'Receiving hood captures jet volume plus entrained air (entrainment multiplies volume)',
      'Protect the jet path from crossdrafts and obstructions',
      'Never let the push jet entrain contaminated air into occupied zones',
    ],
    discovery: [
      'What prevented conventional capture — span width, crane access, process layout?',
      'Span distance from push to pull?',
      'Crossdraft sources across the jet path?',
      'Existing supply/exhaust balance in the building (pressure issues)?',
      'Contaminant hazard class — is push-pull even appropriate for this toxicity?',
    ],
    redFlags: [
      'High-toxicity contaminants proposed for push-pull (usually inappropriate)',
      'Crane or forklift traffic breaking the jet stream',
      'Building pressure imbalances reversing intended flow',
      'Retrofit proposals without verifying jet throw across the full span',
    ],
    camfil:
      'Engineering-led sale: Camfil APC supports the collection side; jet/hood design must be validated by engineering. Position as solution partner for difficult geometries where competitors propose ineffective ambient approaches.',
    stakeholders: ['Plant engineer', 'EHS manager', 'Operations manager'],
    siteSurvey: [
      'Measure the full span and document obstructions in the jet path',
      'Smoke-test existing airflow patterns if a system exists',
      'Record building makeup-air and pressure conditions',
    ],
    aftermarket:
      'Balance drift is the failure mode — periodic re-balancing and verification services are valuable. Filters on the receiving end load per process duty.',
    engineeringTrigger:
      'Always — push-pull performance lives or dies on engineered jet/hood balance. Route every opportunity to engineering.',
    caseStudyAngles: [
      'Fabrication shop — push-pull over large weldments where hoods were impossible',
    ],
  },
  {
    id: 'specialty',
    name: 'Miscellaneous Specialty Operations',
    kind: 'family',
    family: 'Miscellaneous specialty operations',
    acgih: 'ACGIH Ch. 13 — specialty plates (verify in current edition)',
    industries: ['Pharmaceutical', 'Food & beverage', 'Recycling', 'Chemical processing', 'General manufacturing', 'Composites'],
    contaminants: ['Dust', 'Fume', 'Combustible', 'High-toxicity', 'Sticky', 'Vapor'],
    equipment: ['Tablet press', 'Laser engraving', '3D printer (additive)', 'Plasma spray', 'Thermal spray', 'Battery assembly', 'Recycling shredder'],
    conditions: ['New system', 'Process change', 'Visible emissions', 'Filter problem'],
    aliases: ['tablet press', 'pharma', 'laser marking', 'laser engraving', 'additive manufacturing', '3d printing', 'thermal spray', 'battery', 'lithium', 'shredder', 'dental', 'laboratory'],
    overview:
      'The catch-all for operations without a dedicated chapter — emerging processes (additive manufacturing, battery handling), pharma containment, laboratory sources, and unusual contaminant combinations. Discovery discipline matters most here: characterize the contaminant before proposing anything.',
    sourceCapture: [
      'Start from contaminant characterization: toxicity, combustibility, particle size, loading',
      'Containment-first thinking for potent or nano-scale materials',
      'Enclose emerging-tech processes (AM printers, laser markers) and exhaust the enclosure',
      'When no plate exists, derive capture design from first principles with engineering',
    ],
    discovery: [
      'What exactly is emitted — get SDS, test data, or process chemistry?',
      'Toxicity class — potent compound, sensitizer, carcinogen, nano-material?',
      'Combustibility — has the dust/powder been tested (Kst, MIE, MEC)?',
      'Regulatory context — FDA containment, OSHA substance standards, ATEX/NFPA?',
      'Is this process documented anywhere internally, or brand new?',
      'What happens to captured material — disposal, reclaim, return?',
    ],
    redFlags: [
      'Unknown contaminant with pressure to quote immediately',
      'Nano-scale or potent materials without containment expertise involved',
      'Battery materials (lithium, cobalt, nickel) — combined toxicity and fire risk',
      'Metal AM powders (titanium, aluminum) — combustible metal handling',
      'Any request to recirculate from an uncharacterized process',
    ],
    camfil:
      'Position Camfil APC as engineering partner for non-standard problems: containment-rated collectors, safe-change filtration, HEPA stages, and test-data-driven design. The differentiator is disciplined characterization before equipment selection — say no to guessing.',
    stakeholders: ['EHS manager', 'Process engineer', 'R&D (for new processes)', 'Regulatory affairs (pharma)'],
    siteSurvey: [
      'Gather every available data sheet and test report before visiting',
      'Observe the full process cycle including cleaning and maintenance modes',
      'Interview operators about what they see, smell, and clean up',
      'Document utility constraints and room classifications',
    ],
    aftermarket:
      'Specialty applications often have high-value media (HEPA, safe-change) with critical change-out procedures — service contracts fit naturally. Process evolution creates frequent re-engagement.',
    engineeringTrigger:
      'Always — specialty means no standard answer. Full engineering review before any proposal.',
    caseStudyAngles: [
      'Metal AM facility — combustible-powder handling with inert-rated collection',
      'Pharma OSD plant — containment upgrade passing potent-compound audit',
    ],
  },
];

// ---------------------------------------------------------------------------
// Merge helper: equipment entries inherit family fields, keep their own overrides
// ---------------------------------------------------------------------------

export function getMergedEntry(entry: AppEntry): AppEntry {
  if (entry.kind === 'family' || !entry.parentId) return entry;
  const parent = ENTRIES.find((e) => e.id === entry.parentId);
  if (!parent) return entry;
  const mergeLists = (a: string[], b: string[]) => Array.from(new Set([...a, ...b]));
  return {
    ...parent,
    ...entry,
    industries: mergeLists(parent.industries, entry.industries),
    contaminants: Array.from(new Set([...parent.contaminants, ...entry.contaminants])),
    conditions: Array.from(new Set([...parent.conditions, ...entry.conditions])),
    aliases: mergeLists(parent.aliases, entry.aliases),
    sourceCapture: entry.sourceCapture.length ? entry.sourceCapture : parent.sourceCapture,
    stakeholders: entry.stakeholders.length ? entry.stakeholders : parent.stakeholders,
    caseStudyAngles: entry.caseStudyAngles.length ? entry.caseStudyAngles : parent.caseStudyAngles,
  };
}

export function searchEntries(
  query: string,
  industry: string | null,
  contaminants: Set<Contaminant>,
  conditions: Set<Condition>,
  equipmentOnly: boolean,
): AppEntry[] {
  const q = query.trim().toLowerCase();
  return ENTRIES.filter((e) => {
    if (equipmentOnly && e.kind !== 'equipment') return false;
    if (industry && !e.industries.includes(industry)) return false;
    if (contaminants.size && ![...contaminants].some((c) => e.contaminants.includes(c))) return false;
    if (conditions.size && ![...conditions].some((c) => e.conditions.includes(c))) return false;
    if (!q) return true;
    const haystack = [
      e.name, e.family, e.acgih, e.overview,
      ...e.aliases, ...e.equipment, ...e.industries, ...e.contaminants,
    ].join(' ').toLowerCase();
    return q.split(/\s+/).every((tok) => haystack.includes(tok));
  });
}
