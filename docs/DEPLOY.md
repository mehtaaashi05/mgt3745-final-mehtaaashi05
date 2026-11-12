# Deployment Notes

## Static site

The site has no application server. When changes reach `main`, the GitHub Actions workflow runs `npm test` and, if the tests pass, publishes `index.html`,
`app.js`, `styles.css`, and `data/directory.json` to GitHub Pages. GitHub Pages is configured to use **GitHub Actions** as the build and deployment source.

The first Pages deployment attempt ([workflow run 43116196106](https://github.com/mehtaaashi05/mgt3745-final-mehtaaashi05/actions/runs/43116196106)) built and uploaded the artifact, but deployment failed with HTTP 404 because Pages was not enabled. Pages was subsequently enabled, and the deployment workflow completed successfully on `main` in [workflow run 43132898973](https://github.com/mehtaaashi05/mgt3745-final-mehtaaashi05/actions/runs/43132898973): both the test/build and deploy jobs passed. The published site at [https://mehtaaashi05.github.io/mgt3745-final-mehtaaashi05/](https://mehtaaashi05.github.io/mgt3745-final-mehtaaashi05/) was verified to respond with HTTP 200 on November 11, 2026.

The JSON file is public to everyone who can access the site and repository. Only fictional sample records are included. Do not publish real employee details without explicit consent, organizational approval, and an approved private intake and opt-out process.

The opt-in form only displays a JSON snippet in the browser. It does not send the form data, write to the directory, or enroll anyone. No approved private handoff is configured, so do not enter real details.

## Local preview

From the repository root:

1. Run `npm install`.
2. Run `npm test`.
3. Run `python3 -m http.server 8000`.
4. Open `http://localhost:8000`.

The preview loads the checked-in JSON asset and performs search in the browser. There is no API or browser-storage fallback.
