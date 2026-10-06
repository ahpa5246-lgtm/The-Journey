# Logging and monitoring

## Current approach

For the current project size, GitHub Actions logs plus the deployment provider's application/build logs are sufficient as the initial operational baseline.

Do not add Sentry or another external monitoring platform unless the project owner later decides the added complexity is justified.

## Safe logging

Logs may help diagnose:

- build failures;
- application/API failures;
- data ingestion failures;
- database connectivity;
- scheduled workflow failures.

Never log:

- passwords;
- access tokens;
- cookies;
- Supabase service-role keys;
- private user data.

## Health

Use `GET /api/health` for a lightweight availability check. It intentionally exposes only safe metadata.

## Uptime

A lightweight external uptime monitor can be considered after a production URL exists. Do not add a ping job merely to defeat a provider's legitimate free-tier sleep behavior.
