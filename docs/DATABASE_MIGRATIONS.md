# Database migrations

The current repository does not contain an application database migration system. The backend/data teammate owns the database contract.

When Supabase migrations are introduced:

1. Review schema changes in a PR.
2. Keep migrations forward-compatible with the application rollout where practical.
3. Identify whether the migration is destructive.
4. Apply production migrations through an explicit, reviewed deployment process.
5. Do not make production deployment automatically run destructive SQL.
6. Document rollback/recovery steps for risky migrations.
7. Keep preview/development data isolated from production.

The infrastructure branch supports the deployment and environment separation; it does not redesign the database schema.
