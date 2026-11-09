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
| Node.js + npm | platform | `package.json`, project test command | No |
| Browser Web APIs (DOM, modules, Fetch, localStorage) | platform | `index.html`, `app.js` | Yes |
| Python 3 `http.server` | platform (optional local preview) | `README.md` | No |
| Wrangler CLI | dev package | `context/AGENTS.md`, `docs/DEPLOY.md`, `worker/wrangler.toml` | No |
| GitHub repository | platform | Git remote, README | No |
| GitHub Codespaces | platform | `.devcontainer/devcontainer.json`, `context/TOOLS.md` | No |
| GitHub Copilot | builder | `docs/DDR-LOG.md` | No |
| Cloudflare Workers | platform (undeployed scaffold) | `worker/wrangler.toml`, `worker/src/index.js` | No currently |
| Cloudflare D1 | platform (intended, not configured) | `context/ARCHITECTURE.md`; no binding in `worker/wrangler.toml` | No currently |
| Gemini 3.5 Flash setting (removed) | model | Former `GEMINI_MODEL` in `worker/wrangler.toml` | No |
| Cloudflare AI Gateway setting (removed) | platform | Former `AI_GATEWAY_ID` in `worker/wrangler.toml` | No |
| GitHub Pages (planned) | platform | `README.md`, `docs/DEPLOY.md` | No; not deployed |

`npm ls --all` is empty: 0 direct and 0 transitive npm dependency packages (the root project is not a dependency). `npm audit` reported 0 vulnerabilities. `index.html` loads only the local `./app.js` module; there is no CDN script. D1 is described as the intended architecture in `context/ARCHITECTURE.md`, but the checked-in Worker uses an in-memory `Map`, has no D1 binding, and is not deployed; this audit does not treat D1 as live storage.

### Evidence (each fact with its source and the date you read it)
| Dependency | Latest version and date | Maintainers or vendor | License or terms | Limits or price | Other notes | Checked on |
|------------|------|------|------|------|------|------|
| Node.js + npm | Latest stable Node v26.13.0 released 2026-10-28; local Node v24.21.0 released 2026-09-08. npm latest 12.2.2 published 2026-11-04; local npm 11.19.0 | OpenJS Foundation; npm CLI maintainers listed by registry | [Node MIT](https://github.com/nodejs/node/blob/main/LICENSE); npm Artistic-2.0 | $0 software cost; local runtime | Evidence: [Node release index](https://nodejs.org/dist/index.json), [Node v24.21.0 release](https://nodejs.org/en/blog/release/v24.21.0), [npm registry](https://registry.npmjs.org/npm) | 2026-11-09 |
| Browser Web APIs | Version varies by browser; no single release | Browser vendors and web standards maintainers | Browser-vendor terms; Web APIs are part of each browser | No project-specific fee; localStorage is origin-scoped and browser-managed | App depends on DOM, module scripts, Fetch, and localStorage; [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | 2026-11-09 |
| Python 3 `http.server` | Local Python 3.12.3, released 2024-04-09; runtime is not pinned and any static server can substitute | Python Software Foundation | [PSF License](https://docs.python.org/3/license.html) | $0; local preview only | Standard-library server; [Python 3.12.3 release](https://www.python.org/downloads/release/python-3123/) | 2026-11-09 |
| Wrangler CLI | 4.159.0 published 2026-11-09 | Cloudflare; npm publisher `wrangler-publisher` | MIT OR Apache-2.0 | CLI is free; Cloudflare runtime usage is billed separately | Referenced as `npx wrangler` but not pinned or installed in `package.json`; [npm registry](https://registry.npmjs.org/wrangler) | 2026-11-09 |
| GitHub repository | SaaS; version not applicable | GitHub | [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Free account/repository option; account and organization terms may apply | Source host and course submission surface, not app hosting; [plans](https://github.com/pricing) | 2026-11-09 |
| GitHub Codespaces | SaaS; version not applicable | GitHub | [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Personal Free: 120 compute hours and 15 GB-month storage; 2-core compute $0.18/hour and storage $0.07/GB-month after quota; organization plans have no included free quota | [Billing and included quota](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces) | 2026-11-09 |
| GitHub Copilot | SaaS; version not applicable | GitHub | [GitHub ToS](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) and [privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement) | Free: 2,000 completions/month; Pro: $10/user/month | Used for development, not at runtime; [plans](https://github.com/features/copilot/plans), [usage limits](https://docs.github.com/copilot/concepts/billing/usage-based-billing-for-individuals) | 2026-11-09 |
| Cloudflare Workers | SaaS; version not applicable | Cloudflare | [Cloudflare subscription terms](https://www.cloudflare.com/terms/) | Free: 100,000 requests/day and 10 ms CPU per invocation; Standard: $5/month minimum, 10 million requests/month included, then $0.30/million | The Worker is not deployed; [pricing](https://developers.cloudflare.com/workers/platform/pricing/) (updated 2026-10-02) | 2026-11-09 |
| Cloudflare D1 | SaaS; version not applicable | Cloudflare | [Cloudflare subscription terms](https://www.cloudflare.com/terms/) | Free: 10 databases, 500 MB/database, 5 GB/account; paid: 100,000 databases included, then $0.10/database/month | No binding or database exists in this repo; [limits and pricing notes](https://developers.cloudflare.com/d1/platform/limits/) (updated 2026-10-30) | 2026-11-09 |
| Gemini 3.5 Flash setting (removed) | `gemini-3.5-flash` is not in the current model catalog; Gemini 3.8 Flash is listed | Google | [Gemini API terms](https://ai.google.dev/gemini-api/terms) | Gemini 3.8 Flash: free tier; paid input $0.75/M tokens and output $3.75/M tokens through 2026-12-31 | No model call or key exists in the Worker; stale setting was removed. Sources: [model catalog](https://ai.google.dev/gemini-api/docs/models), [pricing](https://ai.google.dev/gemini-api/docs/pricing) | 2026-11-09 |
| Cloudflare AI Gateway setting (removed) | SaaS; version not applicable | Cloudflare | [Cloudflare subscription terms](https://www.cloudflare.com/terms/) | Core features free; legacy persistent logs: 100,000 total on Workers Free, 10,000,000 per gateway on Workers Paid | No gateway call exists in code; stale ID placeholder was removed. [Pricing and log limits](https://developers.cloudflare.com/ai-gateway/reference/pricing/) (updated 2026-11-02) | 2026-11-09 |
| GitHub Pages (planned) | SaaS; version not applicable | GitHub | [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Public repo hosting; published site max 1 GB, soft bandwidth limit 100 GB/month, soft build limit 10/hour | No site is deployed. [Usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) | 2026-11-09 |

### Scores and Rings
| Dependency | Stability | Pricing | Institutional fit | Exit cost | Weighted | Ring | Reason in one line |
|------------|---|---|---|---|---|---|---|
| Node.js + npm | 5 | 5 | 5 | 4 | 4.85 | Adopt | Stable local toolchain; no application dependency or recurring app charge. |
| Browser Web APIs | 5 | 5 | 5 | 4 | 4.85 | Adopt | The interface needs a standards-based browser; localStorage data is scoped to one browser. |
| Python 3 `http.server` | 5 | 5 | 5 | 5 | 5.00 | Adopt | Optional local preview utility with a zero-cost substitute in any static server. |
| Wrangler CLI | 3 | 5 | 4 | 2 | 3.55 | Assess | Deployment tooling is unpinned and only needed if the unused Worker is deployed. |
| GitHub repository | 4 | 5 | 5 | 4 | 4.45 | Adopt | Required for course submission and source history, but source can be mirrored elsewhere. |
| GitHub Codespaces | 4 | 4 | 5 | 4 | 4.20 | Adopt | Course-supported dev environment; not required to run the app. |
| GitHub Copilot | 3 | 4 | 5 | 4 | 3.80 | Trial | Helpful for development, but neither source code nor runtime requires it. |
| Cloudflare Workers | 4 | 4 | 4 | 2 | 3.70 | Assess | Worker code is an in-memory scaffold and is not a deployed service. |
| Cloudflare D1 | 4 | 4 | 3 | 2 | 3.50 | Assess | Architecture notes describe D1, but no D1 binding or persistent database is configured. |
| Gemini 3.5 Flash setting (removed) | 2 | 4 | 2 | 1 | 2.35 | Hold | The configured identifier was not in the current catalog and was unused, so the setting was removed. |
| Cloudflare AI Gateway setting (removed) | 4 | 4 | 2 | 1 | 3.15 | Hold | The placeholder was unused and removed; no gateway is required by the app. |
| GitHub Pages (planned) | 4 | 4 | 5 | 4 | 4.20 | Assess | Suitable for a static app, but deployment and the actual URL are still pending. |

Weighted total formula: `(Stability × 40 + Pricing × 25 + Institutional fit × 20 + Exit cost × 15) / 100`.

### Exit Plans (every critical dependency, every Trial)
| Dependency | Trigger | Substitute | Hours to swap | Tested? (date and how) |
|------------|---|---|---|---|
| Browser localStorage (holds prototype entries and serves the interface) | Storage is disabled, cleared, or users need shared durable data | A user-controlled JSON export/import or an authenticated API with a portable database | 4-8 | Yes, 2026-11-09: served the app without an API route (GET 404/POST 501), saved a test entry, reloaded, and confirmed localStorage restored it; the UI showed the expected API error and this does not provide multi-user durability. |
| Wrangler CLI | Deployment requires a different or unavailable CLI | Cloudflare dashboard or the successor provider's deployment tool | 2-4 | No deployment exists to migrate. |
| GitHub Copilot (Trial) | Access ends or terms/data handling no longer fit | Local editor, manual review, and `npm test` | 1-2 | Not separately tested; code/test execution does not require Copilot. |
| Cloudflare Workers (Assess) | A Worker deployment becomes necessary but pricing, terms, or limits no longer fit | Static localStorage prototype for single-browser use, or a separately selected serverless host | 4-8 | The localStorage fallback was exercised on 2026-11-09; it is not equivalent to a shared API. |
| Cloudflare D1 (Assess) | D1 is provisioned and its terms, limits, or cost no longer fit | SQLite on a host selected for the project, with a small API adapter | 6-10 | No D1 is provisioned, so no database export was possible; test before adopting it. |
| GitHub Pages (Assess) | Deployment limits or account policy block the site | Cloudflare Pages or another static host | 1-3 | No deployed site exists to migrate. |

### Changes Caused by This Audit
- Removed unused `GEMINI_MODEL`, `CF_ACCOUNT_ID`, and `AI_GATEWAY_ID` placeholders from `worker/wrangler.toml`; the code did not read them and no secret or model integration existed. Commit: `853b2bf`.
- Kept the package tree dependency-free; the root-only `package-lock.json` records that state.
- The weights/Stake commit `b8c3a70` predates the evidence/scores commit `1d78da5`; this follow-up records facts checked on 2026-11-09.
- No architecture decision was made to deploy a service. `docs/ADR-001.md` points here; `context/ARCHITECTURE.md` still describes D1 as intended, while the checked-in Worker has no D1 binding. Do not treat it as a production deployment claim.
- DDR-002 records the AI assistance and validations for this audit.

### Prediction Stake Resolution
The prediction held narrowly: `npm ls --all` is empty, with zero direct or transitive npm dependency packages. The audit also found stale, unused model and AI Gateway placeholders and removed them. The Worker/D1 path remains an un-deployed architectural intention, not a live service dependency.
