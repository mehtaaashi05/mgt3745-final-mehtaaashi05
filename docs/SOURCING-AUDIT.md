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
