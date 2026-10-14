# Publication contract

## Scope and assumptions

Audience: visitors to Iraq and local readers, on phones and desktops, Arabic/English.
This release is a public, read-only discovery catalogue, not a booking service.
The maintainer owns editorial updates. Six sourced entries are committed in `lib/content.ts`.
No account, personal data, shared write, payment, reservation or creator submission endpoint exists.
Commercial plans and creator examples are previews, not live services. No API keys are required.

## Architecture decision

Keep the existing Next.js application as one deployable service on Node 24.
Pages are prerendered; client state supports locale, filters and a rules-based finder.
Alternative: static export/CDN. Rejected for this patch to preserve the existing `npm start`
workflow and permit health checks/security headers without a second host configuration.
Revisit trusted server operations and durable storage before implementing any shared writes.
There is no reason to add a database solely to publish this catalogue.

## Feature inventory and acceptance

| Surface/control | Outcome | Data/trust boundary | Failure/recovery | Evidence |
| --- | --- | --- | --- | --- |
| Intro skip/Escape | Reach catalogue | Optional localStorage flag only | Storage errors ignored; reduced motion skips intro | Browser test |
| Language | Arabic RTL / English LTR | Local state | Accessible name remains at mobile size | Browser test |
| Audience switch | Change introduction text | Local state, no personalization claim | No persistence promised | Manual inspection required |
| Featured place/source | Navigate to original source | Maintainer-owned HTTPS links | Provider availability is external | Source review, not uptime guarantee |
| Map/region/category | Filter the six committed entries | No remote candidates promoted automatically | Region select works independently of basemap; empty state | Browser test with blocked map provider |
| Finder | Interest-matched source links | Local rules, no LLM or price data | Empty result instead of unrelated places | Browser test |
| People/group/budget | Notes for trip description | Not suitability/price ranking | People bounded to 1–12, Arabic numerals interpreted | Browser test |
| Creator/business sections | Show labeled future concepts | No writes or commercial offer | Explicit preview labels | Content inspection |
| Health | 200 `{status: "ok"}` | No private diagnostics | Hosting health check/restart | HTTP test |
| Unknown route | Useful bilingual 404 | No fallback fake success | Return home link | HTTP test |

## Security boundary

All rendered inputs use React text escaping; no user HTML or server-side URL fetching.
Public data is intentionally readable. Authentication, IDOR, tenant isolation, CSRF, SQL,
uploads and payment invariants are N/A because none of those capabilities exists.
Negative checks: blocked storage; unavailable map service; absent category; invalid group size;
unknown route. Public headers deny framing and MIME sniffing, restrict device permissions.
This is not a full penetration test or claim of WCAG conformance.

## Design and resource decision

Preserve the existing editorial sand/green/red identity, bilingual type and discovery hierarchy.
Alternative: dashboard layout; unnecessary for six entries and no administrative tasks.
No unrelated redesign or photographic assets are added. Map code remains lazily loaded;
intro map only mounts in its active stage. Fonts are downloaded at build and self-hosted by Next.
Build therefore requires network access to font providers.

Initial targets: ordinary route JS <=150 KB gzip, initial transfer <=1 MB;
optional MapLibre is tracked separately. Desired constrained profile: 360px, 4x CPU,
1.6 Mbps down/750 Kbps up, 150 ms latency. No field CWV claim without measurements.

## Deploy and rollback

1. Run `npm ci`, `npm run typecheck`, `npm run build` and `npm run test:e2e`.
2. Connect this repository in Render as a Blueprint using `render.yaml`.
   For an existing Node service use `npm ci && npm run build` and
   `npm start -- --hostname 0.0.0.0`; health path `/api/health`, Node 24.
   Inspect the selected branch before publishing. Render supplies `PORT`.
3. Check `/`, `/api/health`, a missing route, source links, Arabic and map fallback over HTTPS.
4. Configure host monitoring for health failures and server errors. Repository owner operates it.
5. Roll back to the previous **safe** deployment through Render if smoke checks fail.
   No database migration/restore is required; catalogue data is versioned in Git.
   Do not roll back to known vulnerable dependencies merely to recover availability.

A build or local smoke test does not prove the live deployment. This patch does not create a
paid service, publish a production deployment or claim creator/booking services work.
