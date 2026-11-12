# Team Explorer Directory

**One sentence:** This static prototype lets interns search fictional curated profiles and explore example line-of-business guides; its opt-in form only prepares a local JSON snippet.

**Deployed URL:** [Deployed Build](https://mehtaaashi05.github.io/mgt3745-final-mehtaaashi05/)

**Status:** Static JSON search and local request-snippet preview work locally. The form does not submit or publish requests. Profiles are fictional; no approved private opt-in or opt-out channel exists, so do not enter real employee data.

**Hours spent:** 4-6 hours

## See It Work

The page loads fictional profiles from `data/directory.json` and a line-of-business guide for Business Credit and Treasury Management. Search by name, team, or topic. The opt-in form prepares a JSON snippet on your device only; it does not add an entry.

No real-user search test has been completed. Automated tests use fictional records and do not establish that interns can contact real employees.

## Who It Is For

The primary user is the hesitant explorer: an intern who wants firsthand information about another team without it reading like a transfer request. The current prototype supports the search task and offers example questions, but its fictional profiles and lack of an approved private opt-in process mean it does not connect interns with real employees.

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
| Architecture and ADRs | [context/ARCHITECTURE.md](context/ARCHITECTURE.md), [docs/ADR-001.md](docs/ADR-001.md), [docs/ADR-002.md](docs/ADR-002.md) |
| Evals, RAT, Stakes, production verdict | [context/EVALS.md](context/EVALS.md) |
| Delegation log | [docs/DDR-LOG.md](docs/DDR-LOG.md) |
| Decision memo | [docs/DECISION-001.md](docs/DECISION-001.md) |
| Real-user feedback | [docs/FEEDBACK.md](docs/FEEDBACK.md) |
| Scaffold audits | [docs/AUDIT.md](docs/AUDIT.md) |
| Deployment notes | [docs/DEPLOY.md](docs/DEPLOY.md) |
| Self-review with Homogenization Check | [docs/SELF-REVIEW.md](docs/SELF-REVIEW.md) |
| Sourcing Audit | [docs/SOURCING-AUDIT.md](docs/SOURCING-AUDIT.md) |

## AI Use

Historical F-04 drafts from bolt.new and Google AI Studio were reviewed and edited in the workspace; their extra packages were not retained. GitHub Copilot assisted with the static-directory implementation and documentation. These tools are not runtime dependencies. See the [delegation log](docs/DDR-LOG.md) and [Sourcing Audit](docs/SOURCING-AUDIT.md).
