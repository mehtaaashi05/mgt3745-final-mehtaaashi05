# Deployment Notes

## Static site

The app is static and can be deployed to GitHub Pages or another static host; it has no server or API requirement. The repository includes a GitHub Actions workflow that publishes only `index.html`, `app.js`, `styles.css`, and `data/directory.json` when changes reach `main`.

The repository owner reports that Pages is enabled with the GitHub Actions source, but the only recorded deployment run failed before Pages was enabled. No successful deployment or public URL has been verified. After this workflow change reaches `main`, confirm the new run succeeds and that the URL serves the site before adding it to the [README](../README.md).

## Directory data and privacy

The app reads [directory.json](../data/directory.json), which is public to every site visitor and visible in the repository. It currently contains fictional profiles and `.invalid` contact addresses only. Never publish real employee contact details here without explicit opt-in, organizational approval, and a privacy review.

The form only prepares a demo JSON file on the user's device; it sends no data and does not change the directory. No approved private submission channel is configured, so real opt-in and opt-out workflows are not active. Do not enter real employee details. To use real profiles later, approve a private intake and removal process, review consent, edit the JSON, and redeploy.

## Local preview

From the repository root:

1. Run `npm install`.
2. Run `npm test`.
3. Run `python3 -m http.server 8000`.
4. Open `http://localhost:8000`.

The static server serves the checked-in JSON file as a static asset. Search runs in the browser. The opt-in request form only downloads a file; it does not call an API or persist the request in browser storage.

## Wrangler version

The Worker scaffold in [worker/](../worker/) is not used by the app and is not deployed. It stores entries in memory, has no D1 binding, and must not be presented as a shared backend. If a durable backend is reconsidered, implement and test persistence, access control, and opt-out before deployment, then supersede [ADR-003](ADR-003.md) with a new decision.
