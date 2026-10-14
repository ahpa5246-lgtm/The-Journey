# Framework review

Reference: `ahpa5246-lgtm/Senior-level-website-development-skills`, 100-error matrix.
Status is scoped to publication of the existing read-only catalogue. PENDING is not a pass.
Browser-dependent results are documented separately in RELEASE_EVIDENCE.md.

| ID | Review prompt | Status | Evidence / limitation |
| --- | --- | --- | --- |
| 1 | Coding without requirements | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 2 | Disorganized structure | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 3 | Monolithic components | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 4 | Code duplication | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 5 | Unnecessary complexity | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 6 | Non-scalable design | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 7 | Mixed layers | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 8 | Inconsistent architecture | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 9 | Ignoring existing code | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 10 | Reinventing critical primitives | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 11 | Generic repetitive design | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 12 | Excessive effects | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 13 | Weak hierarchy | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 14 | Clutter | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 15 | Inconsistent spacing | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 16 | Inconsistent visual language | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 17 | Fake interactions | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 18 | Missing UI states | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 19 | Confusing navigation | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 20 | No feedback | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 21 | Desktop-only layout | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 22 | Fixed overflow widths | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 23 | Overlapping content | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 24 | Broken Arabic RTL | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 25 | Poor contrast | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 26 | Small touch targets | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 27 | Mouse-only interaction | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 28 | Unlabeled fields | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 29 | Missing image alternatives | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 30 | Broken dialog focus | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 31 | Redundant state | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 32 | Unnecessary effects | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 33 | Unstable keys | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 34 | Direct state mutation | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 35 | Excessive rerenders | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 36 | Request races | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 37 | Resource leaks | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 38 | Hydration mismatch | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 39 | Unneeded client code | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 40 | Lost input state | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 41 | Trusting frontend validation | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 42 | Incomplete validation | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 43 | False HTTP success | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 44 | Unbounded list responses | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 45 | No dependency timeout | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 46 | Blind retries | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 47 | No idempotency | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 48 | Leaking internal errors | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 49 | Inconsistent API | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 50 | Assuming providers succeed | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 51 | Exposed API secrets | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 52 | Weak action authorization | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 53 | IDOR | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 54 | SQL injection | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 55 | XSS | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 56 | CSRF where applicable | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 57 | Unsafe passwords | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 58 | Unsafe uploads | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 59 | Unsafe CORS | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 60 | Vulnerable dependencies | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 61 | Oversized images | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 62 | Layout shift from media | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 63 | Excessive JavaScript | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 64 | No code splitting | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 65 | Sequential independent requests | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 66 | No caching | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 67 | Incorrect/private cache | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 68 | Heavy fonts | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 69 | Expensive rendering effects | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 70 | Eager noncritical loading | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 71 | Missing indexes | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 72 | N+1 queries | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 73 | Invalid relationships | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 74 | Partial dependent writes | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 75 | Concurrent corruption | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 76 | No uniqueness constraint | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 77 | Timezone confusion | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 78 | Unsafe schema change | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 79 | Unverified backup | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 80 | Excess personal data | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 81 | Missing logic tests | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 82 | Render-only validation | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 83 | No E2E journeys | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 84 | Happy-path-only tests | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 85 | No permission tests | N/A | No identity, database, mutation, upload, payment, personalized cache or image pipeline in this release. |
| 86 | Ignoring bad networks | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 87 | Nonisolated tests | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 88 | No regression protection | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 89 | No diagnostic logs | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 90 | No monitoring | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 91 | Development-only verification | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 92 | Missing configuration | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 93 | Development URLs in release | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 94 | Missing error routes | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 95 | Accidental indexing block | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 96 | Missing metadata | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 97 | Missing discovery sitemap | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 98 | Incorrect canonical | PENDING | Requires manual, browser, constrained-performance or live-host review; no blanket certification claimed. |
| 99 | No rollback plan | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
| 100 | Incomplete documentation | PASS (scoped) | See publication contract, release evidence and source diff; pass is limited to the implemented read-only scope. |
