# Sourcing Audit

## Audit 1, November 2026

### Prediction Stake (commit before any evidence)
This project will end up with no third-party npm runtime dependency at all; the important external trust boundaries are GitHub/Codespaces, GitHub Copilot, and the optional Cloudflare worker platform, so the main work is documenting those choices instead of removing packages. Resolution: Partially correct. The package claim held; the final architecture is static curated JSON, and the unused Worker/D1 scaffold and Wrangler workflow were removed.

### Weights (commit in their own commit, before scoring)
| Criterion | Weight | Why this weight for this project |
|-----------|--------|----------------------------------|
| Stability | 40 | The product is a static interface and curated JSON directory, so continuity and predictability matter more than broad feature expansion. |
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
| Browser Web APIs (DOM, modules, Fetch, Clipboard) | platform | `index.html`, `app.js` | Yes |
| Python 3 `http.server` | platform (optional local preview) | `README.md` | No |
| Wrangler CLI (removed) | historical dev tool | Previous `context/AGENTS.md`, removed Worker scaffold | No |
| GitHub repository | platform | Git remote, README | No |
| GitHub Codespaces | platform | `.devcontainer/devcontainer.json`, `context/TOOLS.md` | No |
| GitHub Copilot | builder / VS Code extension | `.devcontainer/devcontainer.json`, `docs/DDR-LOG.md` | No |
| bolt.new (StackBlitz) | builder (historical F-04 generation) | `context/EVALS.md`, `context/SKILLS.md` | No; generated source was integrated, builder is not called at runtime |
| Google AI Studio | builder (historical F-04 generation) | `context/EVALS.md`, `context/SKILLS.md` | No; generated source was integrated, builder is not called at runtime |
| Cloudflare Workers (removed) | platform (unused in-memory scaffold) | Historical `worker/` files, removed | No |
| Cloudflare D1 (removed) | platform (intended but never configured) | Historical Worker/D1 decision, superseded in `docs/ADR-002.md` | No |
| Gemini 3.5 Flash setting (removed) | model | Former `GEMINI_MODEL` in Worker configuration | No |
| Cloudflare AI Gateway setting (removed) | platform | Former `AI_GATEWAY_ID` in Worker configuration | No |
| GitHub Actions | platform | `.github/workflows/pages.yml` | No; runs the deployment workflow |
| `actions/checkout` | action | `.github/workflows/pages.yml` | No; workflow-only |
| `actions/upload-pages-artifact` | action | `.github/workflows/pages.yml` | No; workflow-only |
| `actions/deploy-pages` | action | `.github/workflows/pages.yml` | No; workflow-only |
| GitHub Pages | platform | `.github/workflows/pages.yml`, `README.md`, `docs/DEPLOY.md` | Yes after a successful deployment; not yet verified |


`npm install` completed without warnings and audited the root project with 0 vulnerabilities. `npm ls --all` is empty: 0 direct and 0 transitive npm dependency packages (the root project is not a dependency). The devcontainer separately installs two apt packages (`xdg-utils` and `unzip`), whose versions are not pinned. `index.html` loads only the local `./app.js` module; there is no CDN script. The application reads `data/directory.json`, makes no API calls, uses no localStorage, and does not submit form data. The old Worker was an in-memory scaffold with no D1 binding; those files and the Wrangler workflow have been removed. GitHub Pages deployment remains unverified until the workflow succeeds after merge.

### Evidence (each fact with its source and the date you read it)
| Dependency | Latest version and date | Maintainers or vendor | License or terms | Limits or price | Other notes | Checked on |
|------------|------|------|------|------|------|------|
| Node.js + npm | Latest stable Node v26.13.0 released 2026-10-28; local Node v24.21.0 released 2026-09-08. npm latest 12.2.2 published 2026-11-04; local npm 11.19.0. The devcontainer selects the mutable Node 22 image tag. | OpenJS Foundation; npm CLI maintainers listed by registry | [Node MIT](https://github.com/nodejs/node/blob/main/LICENSE); npm Artistic-2.0 | $0 software cost; local runtime | Evidence: [Node release index](https://nodejs.org/dist/index.json), [Node v24.21.0 release](https://nodejs.org/en/blog/release/v24.21.0), [npm registry](https://registry.npmjs.org/npm), [devcontainer image documentation](https://github.com/devcontainers/images/tree/main/src/javascript-node) | 2026-11-09 |
| Microsoft Dev Container JavaScript/Node image | Latest image-definition release v0.4.37 published 2026-10-28; repo uses `mcr.microsoft.com/devcontainers/javascript-node:22`, a major tag, not a pinned digest or patch version | Microsoft / Dev Containers maintainers | MIT for image definitions; bundled OS and software components retain their own licenses | Image is free; Codespaces compute/storage may be billed separately | Debian-based Node 22 development image; upstream recommends a specific tag or digest for reproducibility. [Image release](https://github.com/devcontainers/images/releases/tag/v0.4.37), [image documentation and tags](https://github.com/devcontainers/images/tree/main/src/javascript-node), [license](https://github.com/devcontainers/images/blob/main/LICENSE) | 2026-11-09 |
| Live Server VS Code extension | Latest 5.7.10 published 2026-02-27 | Ritwick Dey; Marketplace publisher `ritwickdey` | MIT | Free; launches a local preview server | Optional dev-only extension; substitute is the README's Python server. [Release](https://github.com/ritwickdey/vscode-live-server/releases/tag/5.7.10), [Marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), [source manifest](https://raw.githubusercontent.com/ritwickdey/vscode-live-server/master/package.json) | 2026-11-09 |
| `xdg-utils` | Debian stable 1.2.1-2; Debian changelog dated 2024-11-29; apt version is resolved at container creation and is not pinned | freedesktop.org; Debian package maintainers | Expat | $0; desktop URI/open helpers | Installed by the devcontainer setup command. [Debian package](https://packages.debian.org/stable/xdg-utils), [copyright](https://sources.debian.org/src/xdg-utils/1.2.1-2/debian/copyright/), [changelog](https://metadata.ftp-master.debian.org/changelogs/main/x/xdg-utils/stable_changelog) | 2026-11-09 |
| `unzip` | Debian stable 6.0-29+deb13u1; Debian security changelog dated 2026-08-11; apt version is resolved at container creation and is not pinned | Info-ZIP; Debian package maintainers | Info-ZIP license | $0; ZIP archive extraction utility | Installed by the devcontainer setup command. [Debian package](https://packages.debian.org/stable/unzip), [copyright](https://sources.debian.org/src/unzip/6.0-29%2Bdeb13u1/debian/copyright/), [changelog](https://metadata.ftp-master.debian.org/changelogs/main/u/unzip/stable_changelog) | 2026-11-09 |
| Wrangler CLI (removed) | Formerly referenced at 4.159.0, published 2026-11-09 | Cloudflare; npm publisher `wrangler-publisher` | MIT OR Apache-2.0 | No current project cost; the CLI was not a package dependency | Historical record only; Worker scaffold and Wrangler instructions are removed. [npm registry](https://registry.npmjs.org/wrangler) | 2026-11-11 |
| GitHub Copilot | SaaS; version not applicable; `GitHub.copilot` VS Code extension and its Copilot Chat companion are not version-pinned | GitHub | [GitHub ToS](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) and [privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement) | Free: 2,000 completions/month; Pro: $10/user/month | Used for development and this audit, not at runtime; Marketplace says installing Copilot also installs Copilot Chat. [Plans](https://github.com/features/copilot/plans), [usage limits](https://docs.github.com/copilot/concepts/billing/usage-based-billing-for-individuals), [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) | 2026-11-09 |
| bolt.new (StackBlitz) | SaaS builder; version not applicable | StackBlitz, Inc. | [StackBlitz Terms of Service](https://stackblitz.com/terms-of-service), effective for existing accounts 2026-10-07; [Privacy Policy](https://stackblitz.com/privacy-policy) | Free: 300,000 tokens/day and 1 million/month, 10 MB uploads; Pro: $25/month, starts at 10 million tokens/month | Used for historical F-04 generation on 2026-09-30; `context/EVALS.md` says its extra packages were not retained. Not a current runtime service. [Pricing](https://bolt.new/pricing) | 2026-11-09 |
| Google AI Studio | SaaS builder; version not applicable; exact historical model is not recorded | Google | [Gemini API Additional Terms](https://ai.google.dev/gemini-api/terms), effective 2026-03-23; [Google APIs Terms](https://developers.google.com/terms) | Free tier is $0 for eligible models; model limits vary by RPM/TPM/RPD. Current example: Gemini 4 Argon is $2/M input and $10/M output through 2026-11-30; these are not claimed to be the model used for F-04. | Used for historical F-04 generation on 2026-09-30; free-tier prompts may be used to improve Google products. Not a current runtime service. [Pricing](https://ai.google.dev/gemini-api/docs/pricing), [rate limits](https://ai.google.dev/gemini-api/docs/rate-limits), [F-04 record](../context/EVALS.md) | 2026-11-09 |
| Browser Web APIs (DOM, modules, Fetch, Clipboard) | Browser standards; version follows the user agent | Browser vendors; standards maintained by WHATWG | No separately installed package or project license | No project-specific fee; Clipboard write requires a supported secure context and user action | [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [MDN Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API); no browser storage or remote form submission is used. | 2026-11-11 |
| Python 3 `http.server` | Python standard-library module; runtime version follows the developer environment | Python Software Foundation | Included with Python; PSF license | $0; local preview only; Python warns it is not intended for production | [Python `http.server` documentation](https://docs.python.org/3/library/http.server.html); no package is installed by this repository. | 2026-11-10 |
| GitHub repository | SaaS; version not applicable | GitHub | [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Free plan is $0 for individuals; account and organization terms may apply | Hosts source/history and the course submission URL; [GitHub plans](https://github.com/pricing). A repository bundle was verified as an exit test on 2026-11-10. | 2026-11-10 |
| GitHub Codespaces | SaaS; version not applicable | GitHub | [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Compute and storage are billed separately; personal accounts have included monthly quotas, with additional use billed by machine type and storage | [Codespaces billing documentation](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces); the devcontainer is optional and local Node is supported. | 2026-11-10 |
| Cloudflare Workers (removed) | Historical platform; current repository has no Worker code | Cloudflare | [Cloudflare self-serve terms](https://www.cloudflare.com/terms/) | Former published limits are not current project usage or cost | Historical evidence only; [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) checked 2026-11-10. | 2026-11-11 |
| Cloudflare D1 (removed) | Historical database option; no database or binding was ever configured | Cloudflare | [Cloudflare self-serve terms](https://www.cloudflare.com/terms/) | No current usage or cost; former published limits are not project usage | Historical evidence only; [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/) checked 2026-11-10. | 2026-11-11 |
| Gemini 3.5 Flash setting (removed) | Historical, unused model identifier; removed from `worker/wrangler.toml` | Google (historical placeholder only) | No current model or API terms apply because the project makes no model calls | No current cost or quota exposure | Repository evidence: [removal commit `853b2bf`](https://github.com/mehtaaashi05/mgt3745-final-mehtaaashi05/commit/853b2bf); no model setting remains in the checked-in Worker configuration. | 2026-11-10 |
| Cloudflare AI Gateway setting (removed) | Historical, unused configuration placeholder; removed from `worker/wrangler.toml` | Cloudflare (historical placeholder only) | No current service integration or terms apply because the project makes no gateway calls | No current cost or quota exposure | Repository evidence: [removal commit `853b2bf`](https://github.com/mehtaaashi05/mgt3745-final-mehtaaashi05/commit/853b2bf); no gateway setting remains in the checked-in Worker configuration. | 2026-11-10 |
| GitHub Actions | CI/CD service; workflow uses `ubuntu-latest` | GitHub | [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Standard hosted runners are free for public repositories; private-repo usage draws on plan quotas | [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions); deployment workflow is awaiting its first successful run. | 2026-11-11 |
| `actions/checkout` | v7.0.1, pinned to `3d3c42e5aac5ba805825da76410c181273ba90b1` | GitHub Actions | MIT ([license](https://github.com/actions/checkout/blob/v7.0.1/LICENSE)) | No separate fee; GitHub Actions runner terms apply | [v7.0.1 release](https://github.com/actions/checkout/releases/tag/v7.0.1); SHA checked 2026-11-11. | 2026-11-11 |
| `actions/upload-pages-artifact` | v5.0.0, pinned to `fc324d3547104276b827a68afc52ff2a11cc49c9` | GitHub Actions | MIT ([license](https://github.com/actions/upload-pages-artifact/blob/v5.0.0/LICENSE)) | No separate fee; runner and artifact terms apply | [v5.0.0 release](https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0); SHA checked 2026-11-11. | 2026-11-11 |
| `actions/deploy-pages` | v5.0.1, pinned to `368f82528645a54fb793d4d04e342629a3f51346` | GitHub Actions | MIT ([license](https://github.com/actions/deploy-pages/blob/v5.0.1/LICENSE)) | No separate fee; GitHub Actions runner terms apply | [v5.0.1 release](https://github.com/actions/deploy-pages/releases/tag/v5.0.1); SHA checked 2026-11-11. | 2026-11-11 |
| GitHub Pages | GitHub static hosting; workflow configured, public deployment not yet verified | GitHub | [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | $0 for eligible public repositories; published site max 1 GB, 10-minute deployment timeout, soft bandwidth limit 100 GB/month | [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits); the URL is not claimed live until the workflow passes. | 2026-11-11 |

### Scores and Rings

| Dependency | Stability | Pricing | Institutional fit | Exit cost | Weighted | Ring | Reason in one line |
|------------|-----------|---------|-------------------|-----------|----------|------|--------------------|
| Node.js + npm | 5 | 5 | 5 | 4 | 4.85 | Adopt | Stable local toolchain; no application dependency or recurring app charge. |
| Browser Web APIs (DOM, modules, Fetch, Clipboard) | 5 | 5 | 5 | 3 | 4.70 | Adopt | A standards-based browser fetches public JSON and performs local search; no browser storage is used. |
| Python 3 `http.server` | 5 | 5 | 5 | 5 | 5.00 | Adopt | Optional local preview utility; any static server substitutes in under an hour. |
| Wrangler CLI (removed) | 3 | 5 | 4 | 3 | 3.70 | Hold | The unused CLI and Worker scaffold are removed; no runtime or project workflow depends on Wrangler. |
| GitHub repository | 4 | 5 | 5 | 4 | 4.45 | Adopt | Required for course submission and source history; source can be mirrored elsewhere in 1–2 h. |
| GitHub Codespaces | 4 | 4 | 5 | 4 | 4.20 | Adopt | Course-supported dev environment; not required to run the app. |
| GitHub Copilot | 3 | 4 | 5 | 4 | 3.80 | Trial | Helpful for development, but neither source code nor runtime requires it. |
| Cloudflare Workers (removed) | 4 | 4 | 4 | 3 | 3.85 | Hold | The unused in-memory scaffold has been removed; no deployed service or data depends on it. |
| Cloudflare D1 (removed) | 4 | 4 | 3 | 2 | 3.50 | Hold | No binding or database existed; the static curated-data ADR supersedes this option. |
| Gemini 3.5 Flash setting (removed) | 2 | 4 | 2 | 5 | 2.95 | Hold | Identifier was not in the current catalog and was unused; removed in `853b2bf`, so nothing remains to exit. |
| Cloudflare AI Gateway setting (removed) | 4 | 4 | 2 | 5 | 3.75 | Hold | Unused placeholder removed in `853b2bf`; Hold reflects my judgment (do not re-add) despite the middling score. |
| GitHub Pages | 4 | 4 | 5 | 4 | 4.20 | Assess | Suitable static host; deployment must succeed before a public URL is claimed. |
| GitHub Actions | 4 | 5 | 5 | 3 | 4.30 | Assess | Workflow-only deployment tool; source files can move to another static host. |
| `actions/checkout` | 4 | 5 | 5 | 4 | 4.45 | Adopt | Pinned first-party action used only by the publishing workflow. |
| `actions/upload-pages-artifact` | 4 | 5 | 5 | 4 | 4.45 | Assess | Pinned first-party action packages static files for Pages. |
| `actions/deploy-pages` | 4 | 5 | 5 | 3 | 4.30 | Assess | Pinned first-party action publishes the artifact to Pages. |
| Microsoft Dev Container JavaScript/Node image | 4 | 5 | 5 | 4 | 4.45 | Adopt | Provides the standardized course development environment; the image is free, but the mutable Node 22 tag is less reproducible than a pinned digest. |
| Live Server VS Code extension | 4 | 5 | 5 | 5 | 4.60 | Assess | Useful for local development, but it is optional and the documented Python HTTP server provides a simple fallback. |
| `xdg-utils` | 4 | 5 | 4 | 5 | 4.40 | Adopt | A standard development-container utility with no application runtime dependency; can be reinstalled or replaced if the container changes. |
| `unzip` | 5 | 5 | 5 | 5 | 5.00 | Adopt | A widely used archive utility with no application runtime dependency and a straightforward replacement or reinstall path. |
| bolt.new (StackBlitz) | 3 | 4 | 3 | 5 | 3.55 | Hold | Used only for historical F-04 generation; generated code was reviewed and integrated, so the project does not need to rely on the builder again. |
| Google AI Studio | 4 | 4 | 4 | 5 | 4.15 | Hold | Used only for historical F-04 generation; no current model calls or runtime integration depend on the service. |

Weighted total formula: `(Stability × 40 + Pricing × 25 + Institutional fit × 20 + Exit cost × 15) / 100`.

Exit cost scale (higher is cheaper to leave), based on the upper bound of the hours-to-swap estimate: 5 = 1 h or less; 4 = more than 1 and up to 3 h; 3 = more than 3 and up to 8 h; 2 = more than 8 and up to 24 h; 1 = more than 24 h.

### Exit Plans (all user-serving and source-holding dependencies, every Trial and Assess)
| Dependency | Trigger | Substitute | Hours to swap | Tested? (date and how) |
|------------|---|---|---|---|
| Browser Web APIs (serves interface and loads directory JSON) | A supported browser blocks static Fetch or Clipboard behavior | Another standards-compliant browser; JSON remains host-independent | 1-2 | Yes, 2026-11-11: local static preview loaded the curated JSON and search functions. |
| Wrangler CLI (removed; Hold) | A Worker is deliberately adopted in a future architecture | Install a reviewed, pinned Wrangler version at that time | 2-4 | Not applicable; CLI removed and current app does not invoke it. |
| GitHub Copilot (Trial) | Access ends or terms/data handling no longer fit | Local editor, manual review, and `npm test` | 1-2 | Not separately tested; code/test execution does not require Copilot. |
| Cloudflare Workers (removed; Hold) | A future requirement warrants a shared backend | Re-evaluate Worker + durable database or another documented API host | 4-8 | Not applicable; old scaffold removed and never deployed. |
| Cloudflare D1 (removed; Hold) | A future backend decision selects D1 | Implement and review a migration only if D1 is approved; no existing data needs export | 6-10 | Not applicable; no database or binding existed. |
| GitHub Pages (Assess; serves the public site) | Pages policy, access, or limits prevent publication | Another static host such as Cloudflare Pages | 1-3 | Partly tested 2026-11-11: local Python server served the same static files; public Pages deployment still needs verification. |
| GitHub Actions (Assess) | Workflow permissions, terms, or pricing block the release | Another static host's Git integration or manual upload | 2-4 | Not yet tested successfully; workflow waits for merge and Pages configuration. |
| `actions/upload-pages-artifact` (Assess) | Artifact format changes or action becomes unavailable | The Pages-compatible action supported at migration time | 1-2 | Not yet tested; workflow has not run. |
| `actions/deploy-pages` (Assess) | Action becomes incompatible or deployment is blocked | Another static host's official deployment integration | 2-4 | Not yet tested; workflow has not run. |
| Dev container image `javascript-node:22` (Adopt) | Node 22 reaches end-of-life, or the image tag stops receiving updates | `javascript-node:24` image tag | 1 | Yes, 2026-11-10: ran `npm test` on local Node v24.21.0; this was not a rebuilt container. |
| Live Server extension (Assess) | Extension is removed from the Marketplace or stops working | `python3 -m http.server 8000` (documented in README) | 0.5 | Yes, 2026-11-11: local static preview served `index.html`, `styles.css`, `app.js`, and `data/directory.json`; search worked. |
| GitHub repository (holds source and history) | Account suspended, policy change, or Classroom-style shutdown | Another git host (for example GitLab) | 1-2 | Yes, 2026-11-10: `git bundle create /tmp/repo-backup.bundle --all` followed by `git bundle verify` reported the bundle okay with complete history; backup not committed. |

### Changes Caused by This Audit
- Completed the dated evidence for every inventoried dependency and repaired the score table rows so each item renders and can be compared consistently.
- Removed unused `GEMINI_MODEL`, `CF_ACCOUNT_ID`, and `AI_GATEWAY_ID` placeholders from `worker/wrangler.toml`; the code did not read them and no secret or model integration existed. Commit: `853b2bf`.
- Pinned Wrangler to 4.159.0 in `context/AGENTS.md` and `docs/DEPLOY.md` (it is invoked with npx, not installed, so the package tree stays empty). Re-scored exit cost against a written hours scale so scores match the Exit Plans. Commit: `cfe82e8` (also `7cbb639`). `npm test` passed after the changes: `6 passing`.
- Updated `docs/DEPLOY.md` to distinguish the localStorage prototype from the unconfigured, undeployed Worker/D1 intention.
- Updated `context/TOOLS.md` with dated limits, pricing, rings, and exits; clarified the intended-versus-current D1 state in `context/ARCHITECTURE.md`.
- Kept the package tree dependency-free; the root-only `package-lock.json` records that state.
- The weights/Stake commit `b8c3a70` predates the evidence/scores commit `1d78da5`; this follow-up records facts checked on 2026-11-09.
- ADR-001 Consequences amended (2026-11-09) to record that persistence is currently localStorage and that the Worker/D1 path is not deployed. No decision to deploy a service was made.
-  Added Inventory, Evidence, Scores and Exit Plan rows for the dev container image and the Live Server extension (both found in `.devcontainer/devcontainer.json`). Exit steps tested on 2026-11-10 (Node 24 test run, local static server, repo bundle backup).

### Path 2 implementation changes (2026-11-11)
- Superseded ADR-001 with ADR-002 and removed the unused Worker scaffold. Commit: `ca5c2a9`.
- Replaced the API-contract evals with checks for curated JSON, browser-side search, and the local-only request preview. `npm test` passed 11/11.
- Added the GitHub Pages workflow and static deployment instructions. A successful Pages deployment and public URL remain unverified.
- Updated the tool ledger and exit plans: Workers, D1, and Wrangler are removed and held; localStorage is not used for directory or opt-in data. Live Server remains an optional devcontainer extension with Python's local server as a tested substitute.

### Prediction Stake Resolution
The prediction was only partially correct. Its falsifiable package claim held: `npm ls --all` is empty, with zero direct or transitive npm dependency packages. However, the trust-boundary framing was incomplete: the audit found historical use of bolt.new and Google AI Studio plus the declared devcontainer image, extensions, and apt utilities. It also removed the deprecated Mermaid extension after confirming VS Code now has built-in Mermaid preview. At the time of this audit, Worker/D1 was an undeployed architectural intention; the Path 2 implementation removes the unused scaffold and selects static curated JSON.
