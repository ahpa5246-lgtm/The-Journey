# Release evidence

Environment: Linux container, Node 24.19.0, npm 11.9.0, Chromium headless 141,
Playwright 1.56.1. Starting commit: `e739573`. Revision: commits on
`fix/deployment-readiness` (see Git history). No hosted deployment was created.

| Check | Observed result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run build` | Passed on Next 16.4.1; `/` prerendered, `/api/health` available |
| `npm run test:e2e` | 5 passed, 2.7 seconds, against `next start` |
| Mobile 320px EN/AR | Automated reflow and grid checks passed |
| Finder | Food returns honest empty state; nature returns Ahwar; Arabic ٥ interpreted as 5 |
| Provider outage | Blocking OpenFreeMap still allows region/category catalogue filtering |
| Storage denied | Intro can be dismissed, language remains operable |
| HTTP | Health JSON, nosniff header and missing route 404 passed |
| `npm audit --audit=true --omit=dev --json` | 0 known production dependency vulnerabilities after updates |
| `git diff --check` | Passed |

The first mobile run failed: the bottom nav intercepted clicks on the language button.
Root cause: backdrop-filter on its ancestor changed the fixed-position containing block.
Removing that effect on mobile and using two header columns resolved the same test.
The initial audit reported 4 vulnerable dependencies; upgrading Next/MapLibre/React removed
all production findings in the repeated audit. Registry audits are point-in-time checks,
not proof of universal security. Test browser download initially failed, but an alternate
mirror succeeded with the pinned test runtime.

## Outstanding checks and limits

- Manual screen reader review, full contrast/state audit, real low-end hardware and field CWV
  are not completed. The framework checklist records these as pending.
- Six editorial seed entries only; food/stay inventory and creator submissions are not implemented.
- No accounts, bookings, billing, owner claims or durable user records in this release.
- Basemap availability and upstream source uptime are external dependencies. No live provider
  certification or live production smoke test is implied by the outage test.
- Final domain is not supplied, so no invented canonical URL/sitemap origin is configured.
- Render Blueprint is supplied, not applied to a live account. Validate in Render before creation.
- Recovery and hosting checks: see RELEASE_READINESS.md.

## Constrained lab capture

Chromium 141, 360×800, cold page, reduced motion, 4x CPU slowdown, CDP network
150ms latency, 200,000 bytes/s down and 93,750 bytes/s up. Resource Timing snapshot
1.5 seconds after load: JS encoded bodies 141,932 bytes; total resource encoded bodies
362,011 bytes across 10 resources. These are body bytes (local Next server), not a claim
of gzip CDN transfer, full page weight after scrolling, or field Web Vitals.
Optional map was not in this initial capture. No LCP/INP/CLS compliance claim.
