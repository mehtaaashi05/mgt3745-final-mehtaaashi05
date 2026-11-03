# Sourcing Audit

## Audit 1, November 2026

### Prediction Stake (commit before any evidence)
This project will end up with no third-party npm runtime dependency at all; the important external trust boundaries are GitHub/Codespaces, GitHub Copilot, and the optional Cloudflare worker platform, so the main work is documenting those choices instead of removing packages. Resolution: Tight.

### Weights (commit in their own commit, before scoring)
| Criterion | Weight | Why this weight for this project |
|-----------|--------|----------------------------------|
| Stability | 40 | The product is a static interface and a small optional API, so continuity and predictability matter more than broad feature expansion. |
| Pricing predictability | 25 | The project currently has no app-level paid dependency, so cost risk is moderate but still worth documenting as the platform footprint grows. |
| Institutional fit | 20 | GitHub and the course environment already provide the primary tooling and submission path, so they fit the project well. |
| Exit cost | 15 | The app is intentionally simple, so a future swap should be straightforward if a platform changes or a service becomes unavailable. |
Total: 100

### Inventory
| Dependency | Kind (package, dev package, platform, model, builder, CDN script) | Where it is recorded | Ships to users? |
|------------|------|------|------|
| Node.js + npm | platform | package.json, `npm install`, `npm ls --all --depth=0` | No |
| No third-party npm package | package | package.json, `npm ls --all --depth=0` | No |
| GitHub Codespaces | platform | `.devcontainer/devcontainer.json`, `context/TOOLS.md` | No |
| GitHub Copilot | builder | `context/TOOLS.md` | No |
| Cloudflare Workers + D1 (optional if deployed) | platform | `context/TOOLS.md`, `worker/src/index.js` | Yes, if deployed |
| GitHub Pages (planned static host) | platform | `README.md` | Yes, if deployed |

Total installed package count: 0 direct packages; no transitive dependency tree under `npm ls --all --depth=0`.

### Evidence (each fact with its source and the date you read it)
| Dependency | Latest version and date | Maintainers or vendor | License or terms | Limits or price | Other notes | Checked on |
|------------|------|------|------|------|------|------|
| Node.js + npm | Node.js v24.21.0 on 2026-11-03; npm 11.19.0 on 2026-11-03 | Node.js Foundation / npm, Inc. | Open-source MIT / npm licensing terms | Local runtime only; no application fee in this repo | Used to run tests and local validation, not to serve live user traffic | 2026-11-03 |
| No third-party npm package | `npm ls --all --depth=0` returned `(empty)` on 2026-11-03 | N/A | N/A | $0 in direct dependency spend | Direct dependency count is 0; there is no third-party package drift in the project today | 2026-11-03 |
| GitHub Codespaces | Service platform; package version not applicable | GitHub | GitHub service terms and account terms | Included within the course/GitHub account environment; no project-specific fee in this repo | Used for development, not shipped to users | 2026-11-03 |
| GitHub Copilot | Service platform; package version not applicable | GitHub | GitHub product terms | May be subject to a GitHub subscription or workspace plan | Used as an implementation and review tool, not a runtime dependency | 2026-11-03 |
| Cloudflare Workers + D1 (optional) | Platform service; no package version. Worker source exists in `worker/src/index.js` and the trust boundary is documented in `context/TOOLS.md` | Cloudflare | Cloudflare service terms and account settings | Usage-based pricing and D1 quotas vary by account | Not currently in use for the static page; only a potential deployed backend | 2026-11-03 |
| GitHub Pages (planned) | Platform service; no package version. Static hosting is described in the README and final-project deployment expectations | GitHub | GitHub Pages terms | Free for public repos; subject to GitHub account policy | Intended deployment target for a public URL if the project is live | 2026-11-03 |

### Scores and Rings
| Dependency | Stability | Pricing | Institutional fit | Exit cost | Weighted | Ring | Reason in one line |
|------------|---|---|---|---|---|---|---|
| Node.js + npm | 5 | 5 | 5 | 4 | 4.75 | Adopt | It is the default course runtime and has no direct app cost or user-facing dependency risk. |
| No third-party npm package | 5 | 5 | 5 | 5 | 5.00 | Adopt | The repo intentionally avoids package drift; there is no direct dependency to remove or replace. |
| GitHub Codespaces | 4 | 4 | 5 | 4 | 4.25 | Adopt | It is the course-supported development environment and is not part of the shipped product. |
| GitHub Copilot | 3 | 4 | 5 | 3 | 3.65 | Trial | It is useful for implementation and review, but it is not a user-facing dependency and should be treated as a review tool rather than a runtime requirement. |
| Cloudflare Workers + D1 (optional) | 3 | 3 | 4 | 3 | 3.20 | Assess | It is a credible deployment path, but it would add a service boundary and a data-hosting responsibility if used in production. |
| GitHub Pages (planned) | 4 | 5 | 5 | 4 | 4.40 | Adopt | It is a low-friction hosting path for a public static site and keeps the exit plan simple if the site is moved. |

### Exit Plans (every critical dependency, every Trial)
| Dependency | Trigger | Substitute | Hours to swap | Tested? (date and how) |
|------------|---|---|---|---|
| Cloudflare Workers + D1 (optional) | Cloudflare changes pricing, terms, or the worker is no longer acceptable for user data | GitHub Pages with static JSON or a different serverless host | 4-6 | No live deployment yet; a real exit step would be to move the app to a static host in a branch and rerun `npm test` |
| GitHub Copilot | The tool is no longer accessible or the maintainers change the terms significantly | Local editing and testing without AI assistance | 1-2 | Yes, 2026-11-03: this repo was checked locally with `npm install` and `npm test` after the AI-assisted changes were reviewed. |

### Changes Caused by This Audit
- No package removal was necessary because the repo currently has zero third-party npm runtime dependencies; the main value of this audit is that the dependency ledger is now explicit.
- ADR check: no architecture change was needed. `docs/ADR-001.md` now points to this file for the sourcing review.
- DDR line added: AI-assisted work was used to review the repository and record the dependency ledger, then verified locally with `npm install` and `npm test`.

### Prediction Stake Resolution
The prediction held: the repository does not depend on any third-party npm package in its runtime or dev stack. The important external dependencies are platform-level services and tooling rather than packaged libraries, so the main value of this audit was documenting trust boundaries and setting a clear exit plan for any future service adoption.
