# Tool and Dependency Ledger

This ledger records tools and services the project depends on or may adopt. “Ships to users” distinguishes the static browser app from developer-only tools and undeployed plans.

| Tool | Purpose | Ring | Checked on | Limit or price | Exit |
|---|---|---|---|---|---|
| Node.js + npm | Run the project tests and local development commands; the devcontainer uses a Node 22 image tag | Adopt | 2026-11-09 | $0 software cost; current local Node 24.21.0; container tag is a mutable major version | Keep the lockfile; replace the test runner with another JavaScript runtime if Node is unavailable |
| Microsoft Dev Container JavaScript/Node image | Optional Codespaces development container | Adopt | 2026-11-09 | Free image; Codespaces compute/storage may be billed separately; tag `:22` is not digest-pinned | Develop locally or switch to another supported Node LTS image and rerun `npm test` |
| Live Server VS Code extension | Optional local preview server installed in the devcontainer | Trial | 2026-11-09 | Free; latest 5.7.10 released 2026-02-27 | Use the README's `python3 -m http.server 8000` command |
| `xdg-utils` | Developer-only URI and desktop integration helpers installed by the devcontainer | Adopt | 2026-11-09 | $0; Debian stable 1.2.1-2; Expat license | Use port forwarding or another local browser-opening mechanism |
| `unzip` | Developer-only ZIP archive utility installed by the devcontainer | Adopt | 2026-11-09 | $0; Debian stable 6.0-29+deb13u1; Info-ZIP license | Use Python `zipfile` or another local archive utility |
| Browser Web APIs | Render the static app and provide Fetch and localStorage fallback | Adopt | 2026-11-09 | No project-specific fee; localStorage is origin-scoped and browser-managed | Use another standards-compliant browser; export or migrate saved entries if changing storage |
| Python 3 `http.server` | Optional local static preview | Adopt | 2026-11-09 | $0; local preview only | Use any static file server |
| Wrangler CLI | Optional Cloudflare Worker development and deployment CLI; not installed or pinned in this project | Assess | 2026-11-09 | CLI is free; Cloudflare runtime usage is billed separately | Use Cloudflare dashboard or the successor provider's deployment tooling |
| GitHub repository | Host source, history, and course submission | Adopt | 2026-11-09 | Free account/repository option; account or organization terms may apply | Mirror the Git repository to another host; preserve the required course submission URL |
| GitHub Codespaces | Optional hosted development environment | Adopt | 2026-11-09 | Personal Free includes 120 compute hours and 15 GB-month storage; 2-core compute $0.18/hour and storage $0.07/GB-month beyond quota | Clone the repo locally or into another development environment |
| GitHub Copilot | Optional AI assistance for development; the `GitHub.copilot` VS Code extension is installed but not version-pinned | Trial | 2026-11-09 | Free plan: 2,000 completions/month; Pro: $10/user/month | Continue with local editing, manual review, and `npm test` |
| bolt.new (StackBlitz) | Historical AI builder used for F-04; not a runtime dependency | Hold | 2026-11-09 | Free: 300,000 tokens/day and 1 million/month; Pro: $25/month | Maintain the checked-in source directly; no live service or user data needs migration |
| Google AI Studio | Historical AI builder used for F-04; no model/API calls remain | Hold | 2026-11-09 | Free tier for eligible models; Gemini 4 Argon example: $2/M input and $10/M output through 2026-11-30; quotas vary by model | Maintain the checked-in source directly; no live service or user data needs migration |
| Cloudflare Workers | Optional API platform; current Worker is an undeployed in-memory scaffold | Assess | 2026-11-09 | Free: 100,000 requests/day and 10 ms CPU/invocation; Standard: $5/month minimum, 10 million requests/month included, then $0.30/million | Keep the single-browser localStorage prototype or select another host and reimplement the API boundary |
| Cloudflare D1 | Intended persistent database in ADR-002; no binding or database is currently configured | Assess | 2026-11-09 | Free: 10 databases, 500 MB/database, 5 GB/account; paid: 100,000 databases included, then $0.10/database/month | Export the database before adoption and migrate to SQLite or another SQL database behind the API boundary |
| GitHub Pages | Planned static hosting; no site is currently deployed | Assess | 2026-11-09 | Published site max 1 GB; soft bandwidth limit 100 GB/month and soft build limit 10/hour | Move the static files to Cloudflare Pages or another static host and update the README URL |

Pricing and limits were checked against the dated vendor sources in [SOURCING-AUDIT.md](../docs/SOURCING-AUDIT.md). Cloudflare Worker/D1 and GitHub Pages are not current production services for this repo.

## Revisit triggers

- A new service is added to the repository.
- A vendor changes pricing, terms, or region.
- A credential moves.
- The repo starts depending on a package or model that needs a formal exit plan.
