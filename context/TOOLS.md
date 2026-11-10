# Tool and Dependency Ledger

This ledger records tools and services the project depends on or may adopt. “Ships to users” distinguishes the static browser app from developer-only tools and undeployed plans.

| Tool | Purpose | Ring | Checked on | Limit or price | Exit |
|---|---|---|---|---|---|
| Node.js + npm | Run the project tests and local development commands | Adopt | 2026-11-09 | $0 software cost; local runtime | Keep the lockfile; replace the test runner with another JavaScript runtime if Node is unavailable |
| Browser Web APIs | Render the static app and provide Fetch and localStorage fallback | Adopt | 2026-11-09 | No project-specific fee; localStorage is origin-scoped and browser-managed | Use another standards-compliant browser; export or migrate saved entries if changing storage |
| Python 3 `http.server` | Optional local static preview | Adopt | 2026-11-09 | $0; local preview only | Use any static file server |
| Wrangler CLI | Optional Cloudflare Worker development and deployment CLI; not installed or pinned in this project | Assess | 2026-11-09 | CLI is free; Cloudflare runtime usage is billed separately | Use Cloudflare dashboard or the successor provider's deployment tooling |
| GitHub repository | Host source, history, and course submission | Adopt | 2026-11-09 | Free account/repository option; account or organization terms may apply | Mirror the Git repository to another host; preserve the required course submission URL |
| GitHub Codespaces | Optional hosted development environment | Adopt | 2026-11-09 | Personal Free includes 120 compute hours and 15 GB-month storage; 2-core compute $0.18/hour and storage $0.07/GB-month beyond quota | Clone the repo locally or into another development environment |
| GitHub Copilot | Optional AI assistance for development; not a runtime requirement | Trial | 2026-11-09 | Free plan: 2,000 completions/month; Pro: $10/user/month | Continue with local editing, manual review, and `npm test` |
| Cloudflare Workers | Optional API platform; current Worker is an undeployed in-memory scaffold | Assess | 2026-11-09 | Free: 100,000 requests/day and 10 ms CPU/invocation; Standard: $5/month minimum, 10 million requests/month included, then $0.30/million | Keep the single-browser localStorage prototype or select another host and reimplement the API boundary |
| Cloudflare D1 | Intended persistent database in ADR-002; no binding or database is currently configured | Assess | 2026-11-09 | Free: 10 databases, 500 MB/database, 5 GB/account; paid: 100,000 databases included, then $0.10/database/month | Export the database before adoption and migrate to SQLite or another SQL database behind the API boundary |
| GitHub Pages | Planned static hosting; no site is currently deployed | Assess | 2026-11-09 | Published site max 1 GB; soft bandwidth limit 100 GB/month and soft build limit 10/hour | Move the static files to Cloudflare Pages or another static host and update the README URL |

Pricing and limits were checked against the dated vendor sources in [SOURCING-AUDIT.md](../docs/SOURCING-AUDIT.md). Cloudflare Worker/D1 and GitHub Pages are not current production services for this repo.

## Revisit triggers

- A new service is added to the repository.
- A vendor changes pricing, terms, or region.
- A credential moves.
- The repo starts depending on a package or model that needs a formal exit plan.
