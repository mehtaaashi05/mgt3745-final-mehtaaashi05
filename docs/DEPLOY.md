# Deployment Notes

## Static site

The app is static and can be deployed to GitHub Pages or another static host; it has no server or API requirement. The repository includes a GitHub Actions workflow that publishes only `index.html`, `app.js`, `styles.css`, and `data/directory.json` when changes reach `main`.

The site has not been deployed yet. After merging the workflow, select **Settings → Pages → Build and deployment → GitHub Actions** in the repository. The deployment workflow then publishes the site; add its verified URL to the [README](../README.md). The published URL must not be described as live before the workflow succeeds.

## Directory data and privacy

The app reads [directory.json](../data/directory.json), which is public to every site visitor and visible in the repository. It currently contains fictional profiles and `.invalid` contact addresses only. Never publish real employee contact details here without explicit opt-in, organizational approval, and a privacy review.

The opt-in form downloads a JSON request to the employee's device; it sends no data and does not change the directory. Requests must be shared with the directory maintainer through an approved private channel. The maintainer reviews consent, edits the JSON, and redeploys. An employee requests opt-out through the same private maintainer process; removal is effective only after republishing. This prototype does not implement that private channel or immediate removal.

## Local preview

From the repository root:

1. Run `npm install`.
2. Run `npm test`.
3. Run `python3 -m http.server 8000`.
4. Open `http://localhost:8000`.

The static server serves the checked-in JSON file as a static asset. Search runs in the browser. The opt-in request form only downloads a file; it does not call an API or persist the request in browser storage.

## Wrangler version

The Worker scaffold in [worker/](../worker/) is not used by the app and is not deployed. It stores entries in memory, has no D1 binding, and must not be presented as a shared backend. If a durable backend is reconsidered, implement and test persistence, access control, and opt-out before deployment, then supersede [ADR-003](ADR-003.md) with a new decision.
