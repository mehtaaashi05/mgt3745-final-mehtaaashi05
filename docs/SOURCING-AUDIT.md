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
| Node.js + npm | platform | `package.json`, project test command, `.devcontainer/devcontainer.json` | No |
| Microsoft Dev Container JavaScript/Node image | platform | `.devcontainer/devcontainer.json` | No |
| Live Server VS Code extension | dev package | `.devcontainer/devcontainer.json` | No |
| `xdg-utils` | dev package | `.devcontainer/devcontainer.json` (`postCreateCommand`) | No |
| `unzip` | dev package | `.devcontainer/devcontainer.json` (`postCreateCommand`) | No |
| Browser Web APIs (DOM, modules, Fetch, localStorage) | platform | `index.html`, `app.js` | Yes |
| Python 3 `http.server` | platform (optional local preview) | `README.md` | No |
| Wrangler CLI | dev package | `context/AGENTS.md`, `worker/wrangler.toml` | No |
| GitHub repository | platform | Git remote, README | No |
| GitHub Codespaces | platform | `.devcontainer/devcontainer.json`, `context/TOOLS.md` | No |
| GitHub Copilot | builder / VS Code extension | `.devcontainer/devcontainer.json`, `docs/DDR-LOG.md` | No |
| bolt.new (StackBlitz) | builder (historical F-04 generation) | `context/EVALS.md`, `context/SKILLS.md` | No; generated source was integrated, builder is not called at runtime |
| Google AI Studio | builder (historical F-04 generation) | `context/EVALS.md`, `context/SKILLS.md` | No; generated source was integrated, builder is not called at runtime |
| Cloudflare Workers | platform (undeployed scaffold) | `worker/wrangler.toml`, `worker/src/index.js` | No currently |
| Cloudflare D1 | platform (intended, not configured) | `context/ARCHITECTURE.md`; no binding in `worker/wrangler.toml` | No currently |
| Gemini 3.5 Flash setting (removed) | model | Former `GEMINI_MODEL` in `worker/wrangler.toml` | No |
| Cloudflare AI Gateway setting (removed) | platform | Former `AI_GATEWAY_ID` in `worker/wrangler.toml` | No |
| GitHub Pages (planned) | platform | `README.md`, `docs/DEPLOY.md` | No; not deployed 


`npm install` completed without warnings and audited the root project with 0 vulnerabilities. `npm ls --all` is empty: 0 direct and 0 transitive npm dependency packages (the root project is not a dependency). The devcontainer separately installs two apt packages (`xdg-utils` and `unzip`), whose versions are not pinned. `index.html` loads only the local `./app.js` module; there is no CDN script. D1 is described as the intended architecture in `context/ARCHITECTURE.md`, but the checked-in Worker uses an in-memory `Map`, has no D1 binding, and is not deployed; this audit does not treat D1 as live storage.

### Evidence (each fact with its source and the date you read it)
| Dependency | Latest version and date | Maintainers or vendor | License or terms | Limits or price | Other notes | Checked on |
|------------|------|------|------|------|------|------|
| Node.js + npm | Latest stable Node v26.13.0 released 2026-10-28; local Node v24.21.0 released 2026-09-08. npm latest 12.2.2 published 2026-11-04; local npm 11.19.0. The devcontainer selects the mutable Node 22 image tag. | OpenJS Foundation; npm CLI maintainers listed by registry | [Node MIT](https://github.com/nodejs/node/blob/main/LICENSE); npm Artistic-2.0 | $0 software cost; local runtime | Evidence: [Node release index](https://nodejs.org/dist/index.json), [Node v24.21.0 release](https://nodejs.org/en/blog/release/v24.21.0), [npm registry](https://registry.npmjs.org/npm), [devcontainer image documentation](https://github.com/devcontainers/images/tree/main/src/javascript-node) | 2026-11-09 |
| Microsoft Dev Container JavaScript/Node image | Latest image-definition release v0.4.37 published 2026-10-28; repo uses `mcr.microsoft.com/devcontainers/javascript-node:22`, a major tag, not a pinned digest or patch version | Microsoft / Dev Containers maintainers | MIT for image definitions; bundled OS and software components retain their own licenses | Image is free; Codespaces compute/storage may be billed separately | Debian-based Node 22 development image; upstream recommends a specific tag or digest for reproducibility. [Image release](https://github.com/devcontainers/images/releases/tag/v0.4.37), [image documentation and tags](https://github.com/devcontainers/images/tree/main/src/javascript-node), [license](https://github.com/devcontainers/images/blob/main/LICENSE) | 2026-11-09 |
| Live Server VS Code extension | Latest 5.7.10 published 2026-02-27 | Ritwick Dey; Marketplace publisher `ritwickdey` | MIT | Free; launches a local preview server | Optional dev-only extension; substitute is the README's Python server. [Release](https://github.com/ritwickdey/vscode-live-server/releases/tag/5.7.10), [Marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), [source manifest](https://raw.githubusercontent.com/ritwickdey/vscode-live-server/master/package.json) | 2026-11-09 |
| `xdg-utils` | Debian stable 1.2.1-2; Debian changelog dated 2024-11-29; apt version is resolved at container creation and is not pinned | freedesktop.org; Debian package maintainers | Expat | $0; desktop URI/open helpers | Installed by the devcontainer setup command. [Debian package](https://packages.debian.org/stable/xdg-utils), [copyright](https://sources.debian.org/src/xdg-utils/1.2.1-2/debian/copyright/), [changelog](https://metadata.ftp-master.debian.org/changelogs/main/x/xdg-utils/stable_changelog) | 2026-11-09 |
| `unzip` | Debian stable 6.0-29+deb13u1; Debian security changelog dated 2026-08-11; apt version is resolved at container creation and is not pinned | Info-ZIP; Debian package maintainers | Info-ZIP license | $0; ZIP archive extraction utility | Installed by the devcontainer setup command. [Debian package](https://packages.debian.org/stable/unzip), [copyright](https://sources.debian.org/src/unzip/6.0-29%2Bdeb13u1/debian/copyright/), [changelog](https://metadata.ftp-master.debian.org/changelogs/main/u/unzip/stable_changelog) | 2026-11-09 |
| Browser Web APIs | Version varies by browser; no single release | Browser vendors and web standards maintainers | Browser-vendor terms; Web APIs are part of each browser | No project-specific fee; localStorage is origin-scoped and browser-managed | App depends on DOM, module scripts, Fetch, and localStorage; [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | 2026-11-09 |
| Python 3 `http.server` | Local Python 3.12.3, released 2024-04-09; latest Python 3.15.2 released 2026-10-25; runtime is not pinned and any static server can substitute | Python Software Foundation | [PSF License](https://docs.python.org/3/license.html) | $0; local preview only | Standard-library server; [Python 3.12.3 release](https://www.python.org/downloads/release/python-3123/), [Python 3.15.2 release](https://www.python.org/downloads/release/python-3152/) | 2026-11-09 |
| Wrangler CLI | 4.159.0 published 2026-11-09 | Cloudflare; npm publisher `wrangler-publisher` | MIT OR Apache-2.0 | CLI is free; Cloudflare runtime usage is billed separately | Referenced as `npx wrangler` but not installed in `package.json`; version 4.159.0 was published the same day I checked (2026-11-09), so releases are very frequent and an unpinned `npx wrangler` can change between runs. Pinned in docs to `npx wrangler@4.159.0` (see Changes). [npm registry](https://registry.npmjs.org/wrangler)| 2026-11-09 |
| GitHub repository | SaaS; version not applicable | GitHub | [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Free account/repository option; account and organization terms may apply | Source host and course submission surface, not app hosting; [plans](https://github.com/pricing) | 2026-11-09 |
| GitHub Codespaces | SaaS; version not applicable | GitHub | [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Personal Free: 120 compute hours and 15 GB-month storage; 2-core compute $0.18/hour and storage $0.07/GB-month after quota; organization plans have no included free quota | [Billing and included quota](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces) | 2026-11-09 |
| GitHub Copilot | SaaS; version not applicable; `GitHub.copilot` extension and its Copilot Chat companion are not version-pinned | GitHub | [GitHub ToS](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) and [privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement) | Free: 2,000 completions/month; Pro: $10/user/month | Used for development and this audit, not at runtime; Marketplace says installing Copilot also installs Copilot Chat. [plans](https://github.com/features/copilot/plans), [usage limits](https://docs.github.com/copilot/concepts/billing/usage-based-billing-for-individuals), [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) | 2026-11-09 |
| bolt.new (StackBlitz) | SaaS builder; version not applicable | StackBlitz, Inc. | [StackBlitz Terms of Service](https://stackblitz.com/terms-of-service), effective for existing accounts 2026-10-07; [Privacy Policy](https://stackblitz.com/privacy-policy) | Free: 300,000 tokens/day and 1 million/month, 10 MB uploads; Pro: $25/month, starts at 10 million tokens/month | Used for the historical F-04 generation on 2026-09-30; `context/EVALS.md` says its extra packages were not retained. Not a current runtime service. [Pricing](https://bolt.new/pricing) | 2026-11-09 |
| Google AI Studio | SaaS builder; version not applicable; exact historical model is not recorded | Google | [Gemini API Additional Terms](https://ai.google.dev/gemini-api/terms), effective 2026-03-23; [Google APIs Terms](https://developers.google.com/terms) | Free tier is $0 for eligible models; model limits vary by RPM/TPM/RPD. Current example: Gemini 4 Argon is $2/M input and $10/M output through 2026-11-30; these are not claimed to be the model used for F-04. | Used for historical F-04 generation on 2026-09-30; free-tier prompts may be used to improve Google products. Not a current runtime service. [Pricing](https://ai.google.dev/gemini-api/docs/pricing), [rate limits](https://ai.google.dev/gemini-api/docs/rate-limits), [F-04 record](../context/EVALS.md) | 2026-11-09 |
| Cloudflare Workers | SaaS; version not applicable | Cloudflare | [Cloudflare subscription terms](https://www.cloudflare.com/terms/) | Free: 100,000 requests/day and 10 ms CPU per invocation; Standard: $5/month minimum, 10 million requests/month included, then $0.30/million | The Worker is not deployed; [pricing](https://developers.cloudflare.com/workers/platform/pricing/) (updated 2026-10-02) | 2026-11-09 |
| Cloudflare D1 | SaaS; version not applicable | Cloudflare | [Cloudflare subscription terms](https://www.cloudflare.com/terms/) | Free: 10 databases, 500 MB/database, 5 GB/account; paid: 100,000 databases included, then $0.10/database/month | No binding or database exists in this repo; [limits and pricing notes](https://developers.cloudflare.com/d1/platform/limits/) (updated 2026-10-30) | 2026-11-09 |
| Gemini 3.5 Flash setting (removed) | `gemini-3.5-flash` is not in the current model catalog; Gemini 3.8 Flash is listed | Google | [Gemini API terms](https://ai.google.dev/gemini-api/terms) | Gemini 3.8 Flash: free tier; paid input $0.75/M tokens and output $3.75/M tokens through 2026-12-31 | No model call or key exists in the Worker; stale setting was removed. Sources: [model catalog](https://ai.google.dev/gemini-api/docs/models), [pricing](https://ai.google.dev/gemini-api/docs/pricing) | 2026-11-09 |
| Cloudflare AI Gateway setting (removed) | SaaS; version not applicable | Cloudflare | [Cloudflare subscription terms](https://www.cloudflare.com/terms/) | Core features free; legacy persistent logs: 100,000 total on Workers Free, 10,000,000 per gateway on Workers Paid | No gateway call exists in code; stale ID placeholder was removed. [Pricing and log limits](https://developers.cloudflare.com/ai-gateway/reference/pricing/) (updated 2026-11-02) | 2026-11-09 |
| GitHub Pages (planned) | SaaS; version not applicable | GitHub | [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Public repo hosting; published site max 1 GB, soft bandwidth limit 100 GB/month, soft build limit 10/hour | No site is deployed. [Usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) | 2026-11-09 |

### Scores and Rings

| Dependency | Stability | Pricing | Institutional fit | Exit cost | Weighted | Ring | Reason in one line |
|------------|-----------|---------|-------------------|-----------|----------|------|--------------------|
| Node.js + npm | 5 | 5 | 5 | 4 | 4.85 | Adopt | Stable local toolchain; no application dependency or recurring app charge. |
| Browser Web APIs | 5 | 5 | 5 | 3 | 4.70 | Adopt | The interface needs a standards-based browser; localStorage data is scoped to one browser (4–8 h to move to an API). |
| Python 3 `http.server` | 5 | 5 | 5 | 5 | 5.00 | Adopt | Optional local preview utility; any static server substitutes in under an hour. |
| Wrangler CLI | 3 | 5 | 4 | 3 | 3.70 | Assess | Deployment tooling is released very frequently and was unpinned; now pinned in docs, only needed if the Worker is deployed. |
| GitHub repository | 4 | 5 | 5 | 4 | 4.45 | Adopt | Required for course submission and source history; source can be mirrored elsewhere in 1–2 h. |
| GitHub Codespaces | 4 | 4 | 5 | 4 | 4.20 | Adopt | Course-supported dev environment; not required to run the app. |
| GitHub Copilot | 3 | 4 | 5 | 4 | 3.80 | Trial | Helpful for development, but neither source code nor runtime requires it. |
| Cloudflare Workers | 4 | 4 | 4 | 3 | 3.85 | Assess | Worker code is an in-memory scaffold and is not deployed; score is high but nothing relies on it yet. |
| Cloudflare D1 | 4 | 4 | 3 | 2 | 3.50 | Assess | Architecture notes describe D1, but no D1 binding or persistent database is configured. |
| Gemini 3.5 Flash setting (removed) | 2 | 4 | 2 | 5 | 2.95 | Hold | Identifier was not in the current catalog and was unused; removed in `853b2bf`, so nothing remains to exit. |
| Cloudflare AI Gateway setting (removed) | 4 | 4 | 2 | 5 | 3.75 | Hold | Unused placeholder removed in `853b2bf`; Hold reflects my judgment (do not re-add) despite the middling score. |
| GitHub Pages (planned) | 4 | 4 | 5 | 4 | 4.20 | Assess | Suitable for a static app, but deployment and the actual URL are still pending. |

Weighted total formula: `(Stability × 40 + Pricing × 25 + Institutional fit × 20 + Exit cost × 15) / 100`.

Exit cost scale (higher is cheaper to leave), based on the upper bound of the hours-to-swap estimate: 5 = 1 h or less; 4 = more than 1 and up to 3 h; 3 = more than 3 and up to 8 h; 2 = more than 8 and up to 24 h; 1 = more than 24 h.

### Exit Plans (every critical dependency, every Trial)
| Dependency | Trigger | Substitute | Hours to swap | Tested? (date and how) |
|------------|---|---|---|---|
| Browser localStorage (holds prototype entries and serves the interface) | Storage is disabled, cleared, or users need shared durable data | A user-controlled JSON export/import or an authenticated API with a portable database | 4-8 | Yes, 2026-11-09: served the app without an API route (GET 404/POST 501), saved a test entry, reloaded, and confirmed localStorage restored it; the UI showed the expected API error and this does not provide multi-user durability. |
| Wrangler CLI | Deployment requires a different or unavailable CLI | Cloudflare dashboard or the successor provider's deployment tool | 2-4 | No deployment exists to migrate. |
| GitHub Copilot (Trial) | Access ends or terms/data handling no longer fit | Local editor, manual review, and `npm test` | 1-2 | Not separately tested; code/test execution does not require Copilot. |
| Live Server VS Code extension (Trial) | Extension becomes unavailable or stops working in the course editor | `python3 -m http.server 8000` as documented in the README | 0.5-1 | Not separately migrated; the README already documents the substitute. |
| Cloudflare Workers (Assess) | A Worker deployment becomes necessary but pricing, terms, or limits no longer fit | Static localStorage prototype for single-browser use, or a separately selected serverless host | 4-8 | The localStorage fallback was exercised on 2026-11-09; it is not equivalent to a shared API. |
| Cloudflare D1 (Assess) | D1 is provisioned and its terms, limits, or cost no longer fit | SQLite on a host selected for the project, with a small API adapter | 6-10 | No D1 is provisioned, so no database export was possible; test before adopting it. |
| GitHub Pages (Assess) | Deployment limits or account policy block the site | Cloudflare Pages or another static host | 1-3 | No deployed site exists to migrate. |
| GitHub repository | Account, policy, or availability problem blocks access to the repo | GitLab, Codeberg, or any git host (`git push --mirror`) | 1-2 | Yes, 2026-11-10: `git clone --mirror` of the repo (22 commits on `main`), cloned that mirror to a fresh directory, ran `npm install` (0 vulnerabilities) and `npm test` (6 passing, 0 failing). Did not push to a second host. |
| Live Server extension (Trial) | Extension is removed, unmaintained, or flagged as unsafe | `python3 -m http.server 8000`, already documented in the README | 1 or less | Yes, 2026-11-10: served the app with `python3 -m http.server 8000` and loaded http://localhost:8000; the Team Explorer Directory page rendered with the opt-in form and the Business Credit guide (illustrative summary and conversation starters). |

### Changes Caused by This Audit
- Removed unused `GEMINI_MODEL`, `CF_ACCOUNT_ID`, and `AI_GATEWAY_ID` placeholders from `worker/wrangler.toml`; the code did not read them and no secret or model integration existed. Commit: `853b2bf`.
- Pinned Wrangler to 4.159.0 in `AGENTS.md` and `docs/DEPLOY.md` (it is invoked with npx, not installed, so the package tree stays empty). Re-scored exit cost against a written hours scale so scores match the Exit Plans. Commit: `<hash from step 4>`. `npm test` passed after the changes: `<N> passing`.
- Updated `docs/DEPLOY.md` to distinguish the localStorage prototype from the unconfigured, undeployed Worker/D1 intention.
- Updated `context/TOOLS.md` with dated limits, pricing, rings, and exits; clarified the intended-versus-current D1 state in `context/ARCHITECTURE.md`.
- Kept the package tree dependency-free; the root-only `package-lock.json` records that state.
- The weights/Stake commit `b8c3a70` predates the evidence/scores commit `1d78da5`; this follow-up records facts checked on 2026-11-09.
- ADR-001 Consequences amended (2026-11-09) to record that persistence is currently localStorage and that the Worker/D1 path is not deployed. No decision to deploy a service was made.
- DDR-002 and DDR-003 record the AI assistance and validations for this audit.

### Prediction Stake Resolution
The prediction was only partially correct. Its falsifiable package claim held: `npm ls --all` is empty, with zero direct or transitive npm dependency packages. However, the trust-boundary framing was incomplete: the audit found historical use of bolt.new and Google AI Studio plus the declared devcontainer image, extensions, and apt utilities. It also removed the deprecated Mermaid extension after confirming VS Code now has built-in Mermaid preview. The Worker/D1 path remains an undeployed architectural intention, not a live service dependency.
