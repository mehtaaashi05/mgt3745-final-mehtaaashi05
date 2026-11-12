# Architecture

## Current implementation (2026-11-11)

The app is a static site. It fetches read-only profiles from
`data/directory.json` and filters them in the browser by name, team, and topic.
The opt-in form creates a copyable JSON snippet in the browser; it does not
send, store, or publish the request. The GitHub Pages workflow runs the tests
and publishes the site files and JSON when changes reach `main` if they pass.
The site is not considered deployed until a workflow run succeeds and its URL
is verified.

This architecture is selected in [ADR-002](../docs/ADR-002.md), which
supersedes the earlier localStorage and Worker/D1 decisions. Those earlier
designs were not the shipped, shared directory.

## Trust boundary and data handling

- **Directory data:** each profile contains a name or alias, team, topics, and
  contact value. The checked-in profiles use fictional names and the reserved
  `.invalid` domain. The JSON file is visible in the repository and readable by
  every site visitor; there is no authentication.
- **Opt-in request:** the form collects those same fields and displays a JSON
  snippet locally. It makes no request to a server and does not persist the
  values in browser storage. No approved private intake channel exists, so do
  not enter real employee details or treat the form as a real enrollment.
- **Editing and publication:** repository collaborators with write access can
  change `data/directory.json`; GitHub Pages serves the published file publicly
  after a successful deployment. Before any real profile is added, obtain
  explicit consent and organizational approval, and arrange a private intake
  and removal process.
- **Opt-out:** the prototype has no live opt-out route because it contains no
  real employee profiles. An approved private request route must be arranged
  before adding real profiles; removal would require updating the JSON and
  redeploying the static site.
- **Hosting metadata:** GitHub handles ordinary hosting request metadata under
  its service terms. The app does not intentionally collect analytics or send
  form data to the host.

## Limitations and test boundary

The search flow can be evaluated with fictional records for findability and
usability. That test cannot show that interns can reach real opted-in employees.
The architecture supports sharing curated directory data, but the current demo
does not provide an approved real employee intake process.
