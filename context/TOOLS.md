# Tool and Dependency Ledger

This ledger records tools and services the project depends on or may adopt. “Ships to users” distinguishes the static browser app from developer-only tools and undeployed plans.

| Tool | Purpose | Ring | Checked on | Limit or price | Exit |
|---|---|---|---|---|---|
| Node.js + npm | Run the project tests and local development commands; the devcontainer uses a Node 22 image tag | Adopt | 2026-11-09 | $0 software cost; current local Node 24.21.0; container tag is a mutable major version | Keep the lockfile; replace the test runner with another JavaScript runtime if Node is unavailable |
| Microsoft Dev Container JavaScript/Node image | Optional Codespaces development container | Adopt | 2026-11-09 | Free image; Codespaces compute/storage may be billed separately; tag `:22` is not digest-pinned | Develop locally or switch to another supported Node LTS image and rerun `npm test` |
| Live Server VS Code extension | Optional local preview server installed in the devcontainer | Assess | 2026-11-09 | Free; latest 5.7.10 released 2026-02-27 | Use the README's `python3 -m http.server 8000` command |
| `xdg-utils` | Developer-only URI and desktop integration helpers installed by the devcontainer | Adopt | 2026-11-09 | $0; Debian stable 1.2.1-2; Expat license | Use port forwarding or another local browser-opening mechanism |
| `unzip` | Developer-only ZIP archive utility installed by the devcontainer | Adopt | 2026-11-09 | $0; Debian stable 6.0-29+deb13u1; Info-ZIP license | Use Python `zipfile` or another local archive utility |
| Browser Web APIs | Render the static app, fetch curated JSON, filter profiles, and prepare a local request snippet | Adopt | 2026-11-11 | No project-specific fee; request data stays in the browser and is not submitted | Use another standards-compliant browser; static JSON is host-independent |
| Python 3 `http.server` | Optional local static preview | Adopt | 2026-11-10 | $0; local preview only | Use any static file server |
| Wrangler CLI (removed) | Historical Cloudflare Worker development/deployment CLI; no longer used | Hold | 2026-11-11 | No current usage or project cost | No migration needed; reconsider only if a Worker is deliberately adopted |
| GitHub repository | Host source, history, and course submission | Adopt | 2026-11-10 | Free account/repository option; account or organization terms may apply | Mirror the Git repository to another host; preserve the required course submission URL |
| GitHub Codespaces | Optional hosted development environment | Adopt | 2026-11-10 | Personal Free includes 120 compute hours and 15 GB-month storage; 2-core compute $0.18/hour and storage $0.07/GB-month beyond quota | Clone the repo locally or into another development environment |
| GitHub Copilot | Optional AI assistance for development; the `GitHub.copilot` VS Code extension is installed but not version-pinned | Trial | 2026-11-09 | Free plan: 2,000 completions/month; Pro: $10/user/month | Continue with local editing, manual review, and `npm test` |
| bolt.new (StackBlitz) | Historical AI builder used for F-04; not a runtime dependency | Hold | 2026-11-09 | Free: 300,000 tokens/day and 1 million/month; Pro: $25/month | Maintain the checked-in source directly; no live service or user data needs migration |
| Google AI Studio | Historical AI builder used for F-04; no model/API calls remain | Hold | 2026-11-11 | Free tier for eligible models; Gemini 4 Carbon example: $2/M input and $10/M output through 2026-11-30; quotas vary by model | Maintain the checked-in source directly; no live service or user data needs migration |
| Cloudflare Workers (removed) | Historical in-memory Worker scaffold; no longer used or deployed | Hold | 2026-11-11 | No current runtime use or cost; the former scaffold did not persist data | No migration needed; implement and review a durable backend if requirements change |
| Cloudflare D1 (removed) | Historical intended database; no binding or database was configured | Hold | 2026-11-11 | No current usage or cost | No data to export; reconsider only with an approved backend design |
| GitHub Actions | Build and deploy the static site | Assess | 2026-11-11 | Standard hosted runners are free for public repositories; private-repository usage draws on plan quotas | Move deployment to another static host's integration; 2-4 hours |
| `actions/checkout` | Workflow checkout; pinned to SHA `3d3c42e5aac5ba805825da76410c181273ba90b1` (`v7.0.1`) | Adopt | 2026-11-11 | MIT; no separate fee; GitHub Actions runner terms apply | Replace with another maintained checkout implementation; 1-3 hours |
| `actions/upload-pages-artifact` | Package the static site for Pages; pinned to SHA `fc324d3547104276b827a68afc52ff2a11cc49c9` (`v5.0.0`) | Assess | 2026-11-11 | MIT; no separate fee; runner and artifact terms apply | Use the Pages-compatible artifact action supported at migration time; 1-2 hours |
| `actions/deploy-pages` | Publish the Pages artifact; pinned to SHA `368f82528645a54fb793d4d04e342629a3f51346` (`v5.0.1`) | Assess | 2026-11-11 | MIT; no separate fee; GitHub Actions runner terms apply | Use another static host's official deployment integration; 2-4 hours |
| GitHub Pages | Candidate public static host; deployment must be verified before the URL is claimed live | Assess | 2026-11-11 | Public site max 1 GB; 10-minute deployment timeout; soft bandwidth limit 100 GB/month | Move the static files to another static host; 1-3 hours |
| Gemini 3.5 Flash setting (removed) | Historical model configuration placeholder; no current model call or API key exists | Hold | 2026-11-09 | Removed unused setting; no current model usage or associated runtime cost | Do not reintroduce the obsolete model identifier; select and evaluate a supported model only if AI functionality is added |
| Cloudflare AI Gateway setting (removed) | Historical gateway configuration placeholder; no current gateway integration exists | Hold | 2026-11-09 | Removed unused placeholder; no current gateway usage or associated cost | Do not reintroduce an unused gateway configuration; evaluate gateway requirements if an actual AI integration is added |

Pricing and limits were checked against the dated vendor sources in [SOURCING-AUDIT.md](../docs/SOURCING-AUDIT.md). Cloudflare Worker/D1 and Wrangler are historical tools, not current project dependencies. GitHub Pages is not current production hosting until a successful deployment is verified.

## Revisit triggers

- A new service is added to the repository.
- A vendor changes pricing, terms, or region.
- A credential moves.
- The repo starts depending on a package or model that needs a formal exit plan.
