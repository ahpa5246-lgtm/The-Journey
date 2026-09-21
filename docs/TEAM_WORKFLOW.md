# Team workflow

## Branches

The shared branches are:

- `main` — production source.
- `feat/frontend-experience` — frontend/UI work.
- `feat/data-backend` — backend/data work.
- `feat/cloud-infrastructure` — cloud, CI/CD, reliability and security work.

Use focused feature/fix branches for smaller changes, for example `feat/place-detail`, `fix/map-mobile`, `data/add-baghdad-places` and `chore/update-dependencies`.

## Daily workflow

1. Start from the latest `main`.
2. Create or switch to your focused branch.
3. Make a small, reviewable change.
4. Run `npm run typecheck` and `npm run build`.
5. Commit with a clear message.
6. Push the branch.
7. Open a PR into `main`.
8. Wait for CI and review before merging.
9. After another PR merges, sync your branch with the latest `main` before continuing.

Example:

```bash
git fetch origin
git checkout main
git pull --ff-only origin main
git checkout -b feat/my-change
npm install
npm run typecheck
npm run build
git add .
git commit -m "feat: describe the change"
git push -u origin feat/my-change
```

## Updating an existing branch

```bash
git fetch origin
git checkout feat/my-change
git rebase origin/main
```

If the team prefers merge commits, use the repository's agreed merge policy instead. Resolve conflicts carefully and never delete another teammate's changes just to make a merge clean.

## Pull requests

Every PR should explain:

- what changed;
- screenshots when UI is affected;
- tests/validation performed;
- environment-variable changes;
- database migrations;
- new dependencies;
- security impact.

CI should pass before merge.

## Branch protection / ruleset

The project owner should configure a GitHub ruleset for `main` with:

- pull request required;
- successful required CI checks;
- no force pushes;
- no branch deletion.

Repository administration is intentionally not automated from application code.

## Ownership

The team should use explicit ownership for frontend, backend/data and infrastructure. A `CODEOWNERS` file is intentionally not added until real GitHub usernames are known.

## New contributors

Codespaces can forward port 3000 automatically. Local development remains possible without production cloud credentials.
