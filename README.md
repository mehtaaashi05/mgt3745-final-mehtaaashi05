# Team Explorer Directory

**One sentence:** This static directory helps interns learn about another team without signaling dissatisfaction, while employees can opt in to a short informational conversation and view example line-of-business guides.

**Deployed:** Not deployed in this environment; the page is designed to run from the repository root as a static site.  
**Status:** Working locally as a static prototype with a directory form, guide panel, and server-compatible API contract.  
**Hours spent:** 4-6 hours

## See It Work

The page loads an opt-in directory and a line-of-business guide for Business Credit and Treasury Management.

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
| Architecture and ADRs | [context/ARCHITECTURE.md](context/ARCHITECTURE.md), [docs/ADR-001.md](docs/ADR-001.md) |
| Evals, RAT, Stakes, production verdict | [context/EVALS.md](context/EVALS.md) |
| Delegation log | [docs/DDR-LOG.md](docs/DDR-LOG.md) |
| Decision memo | [docs/DECISION-001.md](docs/DECISION-001.md) |
| Real-user feedback | [docs/FEEDBACK.md](docs/FEEDBACK.md) |
| Scaffold audits | [docs/AUDIT.md](docs/AUDIT.md) |
| Deployment notes | [docs/DEPLOY.md](docs/DEPLOY.md) |
| Self-review with Homogenization Check | [docs/SELF-REVIEW.md](docs/SELF-REVIEW.md) |
| Sourcing Audit | [docs/SOURCING-AUDIT.md](docs/SOURCING-AUDIT.md) |

## AI Use

The repository context and assignment guidance were used to define the feature boundaries, while the final page and tests were assembled directly in the workspace to match the directory and guide behaviors described in the project docs.
