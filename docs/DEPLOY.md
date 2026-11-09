# Deployment Notes

## Front end

Not deployed. The [README](../README.md) is the source of truth for the public URL; it currently says none.

## Worker

Not deployed and not ready to serve persistent data. [worker/src/index.js](../worker/src/index.js) stores entries in an in-memory `Map`; [worker/wrangler.toml](../worker/wrangler.toml) has no D1 binding. The configuration has no Gemini model, AI Gateway, or secret integration. Do not treat this Worker as the D1-backed architecture described in [context/ARCHITECTURE.md](../context/ARCHITECTURE.md).

Before deploying a backend, implement and test the D1 binding and schema, reconcile the Worker with ADR-002, and verify the frontend API URL and authorization requirements. Keep API keys in the provider's secret store, never in the repository.

## Local preview

From the repository root:

1. Run `npm install`.
2. Run `npm test`.
3. Run `python3 -m http.server 8000`.
4. Open `http://localhost:8000`.

The local static server has no `/entries` API route. The page falls back to browser `localStorage`; a failed API save still shows an error because this fallback is only for the single-browser prototype.
