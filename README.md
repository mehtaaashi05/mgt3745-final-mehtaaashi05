# Team Explorer Directory

**One sentence:** This static prototype lets interns search fictional curated profiles and explore example line-of-business guides; its local opt-in request form is a demo and does not submit requests.

**Deployed URL:** Pending. Pages is enabled per the repository owner's report, but no successful deployment has been verified; add the URL only after a successful workflow run.

**Status:** Working locally as a static prototype with curated JSON profiles, browser-side search, a local opt-in request-file form, and a guide panel. It has no shared backend.

**Hours spent:** 4-6 hours

## See It Work

The page loads fictional sample profiles from `data/directory.json` and a line-of-business guide for Business Credit and Treasury Management. Search the directory by employee name, team, or conversation topic. These sample entries do not connect interns with real employees.

The opt-in form only prepares a demo JSON file on the visitor's device; it does not submit a request or publish an entry. No approved private intake or opt-out channel is configured, so real opt-ins and opt-outs are not available. Do not enter real employee details. The demo uses fictional details only.

No real-user search test has been completed. Automated checks use fictional data and do not establish that interns can find or contact real employees.

## Who It Is For

The intended primary user is the hesitant explorer: an intern who wants firsthand information about another team without it reading like a transfer request. The current prototype supports the search and provides example questions, but fictional profiles and the missing private opt-in process mean it does not yet connect interns with employees or provide a live employee opt-in signal.

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
