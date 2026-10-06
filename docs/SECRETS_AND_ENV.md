# Secrets and environment variables

## Rules

- Never commit passwords, API keys, access tokens, cookies or service-role credentials.
- `.env.local` is for local development and is ignored by Git.
- `.env.example` contains names only; it never contains real values.
- `NEXT_PUBLIC_*` variables are browser-visible by design.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be imported into client components or exposed to the browser.
- Do not expose secrets to untrusted pull-request workflows.

## Where values belong

| Variable type | Local | GitHub Actions | Vercel |
| --- | --- | --- | --- |
| Public/browser-safe | `.env.local` | repository/environment variables if needed | Development / Preview / Production |
| Server-only secret | `.env.local` | encrypted repository/environment secret | Server-side environment variable |
| CI-only secret | `.env.local` only when needed | encrypted secret | Usually not needed |

## Current project

The current application does not require Supabase credentials to render its existing public catalogue. Future Supabase integration should add the variables only when the backend contract requires them.

For production, separate Development, Preview and Production values. Preview credentials must not point at production data when the preview can write or mutate data.

## Rotation

If a secret is exposed:

1. Revoke or rotate it immediately at its provider.
2. Replace the value in the appropriate secret store.
3. Remove the leaked value from source/history where practical.
4. Review workflow logs and deployments for accidental exposure.
5. Do not paste the replacement secret into a GitHub issue, PR, commit or chat.
