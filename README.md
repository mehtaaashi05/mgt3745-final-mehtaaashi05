# Team Explorer Directory

**One sentence:** This static directory lets interns search fictional curated profiles and explore example line-of-business guides, while employees can prepare a local opt-in request for manual review.

**Deployed URL:** Pending. The GitHub Pages workflow is ready; enable Pages with the GitHub Actions source after merging, then replace this line with the verified deployment URL.

**Status:** Working locally as a static prototype with curated JSON profiles, browser-side search, a local opt-in request-file form, and a guide panel. It has no shared backend.

**Hours spent:** 4-6 hours

## See It Work

The page loads fictional sample profiles from `data/directory.json` and a line-of-business guide for Business Credit and Treasury Management. Search the directory by employee name, team, or conversation topic. These sample entries do not connect interns with real employees.

The opt-in form downloads a JSON request to the employee's device; it does not send the request or publish an entry. A maintainer must receive it through an approved private channel, review it, update the curated JSON file, and redeploy. Opt-outs also require a private request to the maintainer and a redeployment. The public demo uses fictional details only.

## Who It Is For

The primary user is the hesitant explorer: an intern who wants firsthand information about another team without it reading like a transfer request. The page reduces the social friction of cold outreach by giving employees a clear opt-in signal and providing example questions to ask before a formal move discussion ever begins. Most other solutions depend on existing connections or a formal application flow that feels more commitment than the user wants.

## Run It

```bash
npm install
npm test
python3 -m http.server 8000
```

Then open http://localhost:8000.

## The Record

| Artifact | Link |
|---|---|
| Problem and success measures | [context/PROJECT.md](context/PROJECT.md) |
| Users and jobs | [context/USERS.md](context/USERS.md) |
| Features (EARS rows) | [context/FEATURES.md](context/FEATURES.md) |
| Architecture and ADRs | [context/ARCHITECTURE.md](context/ARCHITECTURE.md), [docs/ADR-003.md](docs/ADR-003.md) |
| Evals, RAT, Stakes, production verdict | [context/EVALS.md](context/EVALS.md) |
| Delegation log | [docs/DDR-LOG.md](docs/DDR-LOG.md) |
| Decision memo | [docs/DECISION-001.md](docs/DECISION-001.md) |
| Real-user feedback | [docs/FEEDBACK.md](docs/FEEDBACK.md) |
| Scaffold audits | [docs/AUDIT.md](docs/AUDIT.md) |
| Deployment notes | [docs/DEPLOY.md](docs/DEPLOY.md) |
| Self-review with Homogenization Check | [docs/SELF-REVIEW.md](docs/SELF-REVIEW.md) |
| Sourcing Audit | [docs/SOURCING-AUDIT.md](docs/SOURCING-AUDIT.md) |

## AI Use

Historical F-04 drafts from bolt.new and Google AI Studio were reviewed and edited in the workspace; unexpected packages from the generated output were not retained. GitHub Copilot was also used for the sourcing audit. The builders are not runtime dependencies. See the [delegation log](docs/DDR-LOG.md) and [Sourcing Audit](docs/SOURCING-AUDIT.md).
