# TOOLS.md

This project keeps a lightweight sourcing ledger. It records the external tools that matter to the delivery, not every local development utility.

| Tool | Purpose | Ring | Checked on | Limit or price | Exit |
|---|---|---|---|---|---|
| Node.js + npm | Run the repo tests and validate the local build with the standard project toolchain | Adopt | 2026-11-03 | No project fee; local runtime only | Keep the lockfile pinned, or replace the runner with another JavaScript runtime if needed |
| GitHub Codespaces | Host the repo and development environment for this project | Adopt | 2026-11-03 | Account-level GitHub access; no project-specific fee in this repo | Clone the repo to another host and continue development there |
| GitHub Copilot | Review and generation support during implementation | Trial | 2026-11-03 | May be covered by a GitHub plan; no app-level dependency here | Stop using the tool and continue locally with reviewed code |
| Cloudflare Workers + D1 (optional) | Optional backend/data service if the project is deployed beyond a static page | Assess | 2026-11-03 | Usage-based platform pricing and data quotas vary by account | Export data or move the site to a different host, then rewire the API boundary |
| GitHub Pages (planned) | Public static hosting for the app if it is deployed | Adopt | 2026-11-03 | Free for public repos; subject to GitHub account policy | Move the static site to a different host and update the deployment URL |

## Revisit triggers

- A new service is added to the repository.
- A vendor changes pricing, terms, or region.
- A credential moves.
- The repo starts depending on a package or model that needs a formal exit plan.
