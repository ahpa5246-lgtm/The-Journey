# Deployment

## Decision

The Journey is a Next.js application, so the simplest deployment architecture is **Vercel** with GitHub integration.

This repository does not create cloud resources or provider secrets automatically. The project owner should connect the repository to the provider dashboard and configure environment variables there.

## Environments

| Environment | Source | Purpose |
| --- | --- | --- |
| Development | Local / Codespaces | Day-to-day development |
| Preview | Pull request / feature branch | Review changes safely |
| Production | `main` | Public release |

A preview deployment must use preview-safe data and credentials. It must not silently write to production data, send real production email, run destructive maintenance, or process real payments.

## GitHub → Vercel flow

1. Connect the repository to Vercel.
2. Set the production branch to `main`.
3. Enable preview deployments for pull requests and branches.
4. Configure environment variables separately for Development, Preview and Production.
5. Do not commit provider credentials or secret environment values.
6. Keep production-only credentials out of preview.

The expected flow is:

```text
feature branch / PR
        ↓
   Vercel Preview
        ↓
      review
        ↓
       main
        ↓
 Vercel Production
```

## Build

The project requires Node 24 or newer. The repository currently validates with:

```bash
npm install
npm run typecheck
npm run build
```

There is currently no committed `package-lock.json`, so CI intentionally uses `npm install` until a lockfile is generated and reviewed. Once a valid lockfile is committed, CI should move to `npm ci`.

## Rollback

For a broken production deployment:

1. Use the deployment provider's rollback/redeploy mechanism to restore the last known-good deployment.
2. If `main` contains a regression, revert the offending commit through a reviewed PR.
3. Re-run CI before restoring production traffic to a changed build.
4. For environment-variable problems, restore the value through the provider dashboard rather than committing it.

## Custom domain

No domain is purchased by infrastructure automation. When a domain is approved later, configure DNS and HTTPS through the deployment provider and document the chosen canonical `www` / non-`www` behavior.
