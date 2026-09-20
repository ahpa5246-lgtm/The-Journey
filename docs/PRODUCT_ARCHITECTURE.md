# The Journey — product architecture

## Product job

The Journey is an Iraq-first discovery platform. Its primary user is an international visitor who needs a coherent view of Iraq's heritage and practical travel context instead of scattered tabs. A secondary mode serves people living in Iraq who want current ideas for outings, restaurants, stays and creator-led routes.

The product must still be useful if every cinematic effect is removed. Motion is presentation; the catalogue, map, provenance and planner are the product.

## Navigation

1. **Discover** — a small, strongly sourced set of notable places and practical travel essentials.
2. **Map** — all reviewed listings, organized by governorate and category.
3. **Creator trails** — opt-in links submitted by creators. We store lightweight metadata and thumbnails; the primary click goes back to the original platform.

The old standalone dictionary concept is intentionally removed. Useful language and etiquette can appear in the context where a visitor needs it.

## Two audiences without two products

On entry the interface offers two modes:

- `I'm visiting Iraq` prioritizes heritage, entry information, travel essentials and map-led discovery.
- `I live in Iraq` prioritizes new places, weekend/family discovery and creator trails.

This changes content ranking and copy, not the underlying database.

## Data trust model

A directory becomes dangerous when it looks certain while its data is stale. Every record therefore has provenance and a publication state.

### Source tiers

- **Tier A — authoritative:** UNESCO, Iraqi government ministries/portals, governorate/municipality or official heritage institutions.
- **Tier B — first-party:** the official website/social account of a venue, hotel, restaurant or verified creator submission.
- **Tier C — discovery:** OpenStreetMap/Overpass and other open datasets. These generate candidates; they do not automatically become verified listings.

### Publication states

`candidate -> reviewed -> verified -> needs-review -> archived`

A verified listing should carry at minimum:

- canonical name in English and Arabic where available;
- category and governorate;
- coordinates;
- source URL and source type;
- `lastCheckedAt` and `lastVerifiedAt`;
- reviewer/contributor identifier;
- sponsorship flag separated from verification;
- optional opening hours, price range, contact and accessibility fields with their own source/freshness.

**Verified does not mean "safe."** The platform does not invent personal-safety scores. For changing safety or entry matters, it links to dated official sources and states when information was checked.

## Free data strategy

### Geographic boundaries

Use the Iraq ADM1 GeoJSON from `tawfek/Iraqi-Cities-and-Districts-data` under CC BY 4.0, with attribution. Vendor a copy into `public/data` so the app is not dependent on another GitHub repository at runtime.

### Place discovery

Use OpenStreetMap through Overpass to build a review queue for historical sites, attractions, museums, hotels, restaurants, cafés, parks and similar tags. `scripts/refresh-osm.mjs` deliberately writes records as `candidate` and `verified: false`.

This makes breadth cheap without pretending that crowd-sourced completeness equals editorial trust.

### Curated seed

Start with Iraq's six UNESCO World Heritage properties so the initial experience has real sourced content before large-scale ingestion begins.

## Freshness automation

`.github/workflows/data-refresh.yml` runs twice per week and can also be run manually. It:

1. refreshes the OSM/Overpass candidate queue;
2. checks whether tracked official sources are reachable;
3. commits changed machine-generated data.

Automation may discover and flag changes, but it must not promote a candidate to verified without a review step. Later, an AI agent can summarize differences or suggest field updates, but a source-backed review gate remains mandatory.

## Creator pipeline

Creators opt in. Submission fields should include:

- creator identity/profile URL;
- original video URL;
- title and short description;
- thumbnail URL or platform-provided preview when terms allow;
- places referenced and governorate;
- disclosure of paid partnerships if applicable;
- permission to display the submitted metadata.

The platform should prefer official embed/preview mechanisms or creator-supplied thumbnails. Do not mirror video files.

## Search and smart planner

The first version is deterministic and explainable: group size, party type, budget and interest filter reviewed records. That is more useful and cheaper than a chatbot that invents answers.

A later conversational layer can translate natural language — e.g. "family of five, medium budget, one afternoon in Baghdad" — into the same filters and explain why each result matched. It must answer from reviewed records and expose sources for changing facts.

## Monetization without generic display ads

Revenue can come from:

- clearly labeled sponsored placement;
- premium business profiles with richer media and analytics;
- referral/booking commissions where a legitimate partner program exists;
- sponsored creator itineraries with disclosure;
- paid itinerary or destination campaigns for hospitality/tourism partners;
- later, B2B access to curated destination widgets/data.

Payment must never change a listing's verification state or hide negative factual information. Sponsored ranking and editorial trust are separate signals.

## Performance budget

- Cinematic intro appears only on the first visit and always has Skip.
- `prefers-reduced-motion` bypasses the intro.
- The main map is code-split and should mount only when near the viewport.
- No autoplay creator video; use thumbnails and outbound links.
- Use Next image optimization for photography and responsive `sizes`.
- Keep the intro map tile-free: only the Iraq GeoJSON and a flat background style.
- Cache mostly-static catalogue responses at the edge/server.
- Never load an all-Iraq raw dataset into the initial JavaScript bundle; query/filter server-side as the catalogue grows.

## Visual system

The memorable moment is the first-visit Iraq map and triptych; everything after it becomes calmer and information-led.

- Night: `#070806`
- Marsh green: `#102B23`
- Deep green: `#1A4538`
- Desert sand: `#D6C4A3`
- Warm paper: `#F6F1E8`
- Iraqi red accent: `#B53A32`

English display uses Cormorant Garamond; Arabic uses Noto Sans Arabic. Avoid generic SaaS card grids and decorative microcopy.

## Team split for three builders

- **Product / frontend:** interaction, bilingual UI, accessibility, mobile, performance.
- **Data / editorial:** sources, verification queue, bilingual place content, creator moderation.
- **Platform / integrations:** data refresh, submissions, database/API, analytics and deployment.

All three work through small issues/PRs with one owner per change.

## MVP boundary

A credible first release is:

- first-visit cinematic sequence;
- bilingual Discover page;
- interactive governorate map with filters;
- six authoritative heritage seeds plus reviewable OSM candidates;
- travel essentials linking to official sources;
- explainable trip finder;
- creator-trail demo/submission architecture;
- visible provenance and sponsorship rules.

Do not claim "all places in Iraq" until coverage can be measured and maintained.
