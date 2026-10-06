# Recovery guide

## Broken production deployment

1. Roll back to the previous known-good provider deployment.
2. Check CI and deployment logs.
3. Reproduce the failure on the branch when possible.
4. Fix through a PR and let CI validate the fix.

## Regression on main

Use a reviewed revert PR rather than rewriting shared history. Do not force-push `main`.

## Deleted or incorrect environment variable

Restore it through the Vercel/GitHub environment settings. Never commit the value to the repository.

## Leaked secret

Rotate/revoke the secret first. Then remove the leaked value from the source or configuration and inspect logs/history for additional exposure.

## Database migration failure

Do not run destructive production migrations automatically. Follow the migration's documented rollback or recovery procedure, coordinate with the backend/data owner, and restore from the provider's available database backup when necessary.

## Backups

Git history protects source code; **Git is not a database backup**. If Supabase becomes the production database, document the exact backup/restore capability of the selected Supabase plan before claiming an RPO/RTO.

## Health check

The public health endpoint is:

```
GET /api/health
```

It returns only a status, timestamp and application version. It must never expose credentials, database URLs or stack traces.
