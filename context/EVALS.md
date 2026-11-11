# Evals

## 1. Current risk

The riskiest assumption is that a curated static directory can help an intern
find an opted-in employee. Current automated tests use fictional examples, so
they measure search behavior and interface reliability, not whether a real
employee can be reached.

## 2. Historical prediction stake (2026-09-28)

- **Tight:** At least 3 of 4 F-04 EARS rows will pass on bolt.new's first integrated output.
  - Resolution (2026-09-30): 4 of 4 F-04 rows passed after integration; the first output required cleanup.
- **Loose:** bolt.new's first output will follow STYLE.md more consistently than AI Studio's output.
  - Resolution (2026-09-30): confirmed; AI Studio retained a broader default palette and localStorage behavior outside the spec.
- **Open:** bolt.new will introduce a dependency or network call not requested in the prompt.
  - Resolution (2026-09-30): confirmed. Generated dependencies were not retained.

## 3. Success criteria

| EARS row | Checked by | Where |
|---|---|---|
| F-01a: Directory opens with fictional curated profiles. | Test | `evals/f01.test.js`, data fields and reserved `.invalid` contacts |
| F-01b: Search matches name, team, or topic without case sensitivity. | Test | `evals/f01.test.js` |
| F-01c: Opt-in form prepares a local request payload. | Test | `evals/f01.test.js` |
| F-01d: Preparing a request does not alter published directory data. | Test | `evals/f01.test.js` |
| F-04-1: Guide lists Business Credit and Treasury Management. | Test | `evals/f04-guide.test.js` |
| F-04-2: Every guide area has a summary and conversation starter. | Test + judgment | `evals/f04-guide.test.js` |
| F-04-3: Selecting a different area returns its content while both areas remain available. | Test + human | `evals/f04-guide.test.js`; browser check |
| F-04-4: Each selected guide is labeled illustrative. | Test + judgment | `evals/f04-guide.test.js` |
| F-04-5: Guide selection does not change curated directory results. | Test | `evals/f04-guide.test.js` |

## 4. Historical error-analysis log

| Failure | Count | Source | Category |
|---|---:|---|---|
| Generated output exceeded requested file scope | 2 | bolt and AI Studio | scope |
| Generated output drifted from STYLE.md | 2 | bolt and AI Studio | style |
| Generated output added unnecessary dependencies | 2 | bolt and AI Studio | dependency |
| Generated builds did not preserve the intended Worker/D1 integration | 2 | bolt and AI Studio | architecture |
| F-04 switching behavior initially unclear to static test | 1 | code eval | EARS |
| Judgment rubric disagreement on change scope | 1 | judgment eval | rubric |
| Generated zip dependency licenses were not audited | 1 | DDR review | cannot verify |

## 5. Running the checks

Run `npm test` for static directory and guide checks. The browser does not need
an API URL. There is no deployed site or real employee data yet.

## 6. Verification boundary

The automated checks use fictional records and verify local search and request
payload behavior only. They do not prove that employees opted in, that an
intern can reach a real employee, that private submissions are securely
handled, or that a deployment exists. Real-user testing can evaluate whether
interns understand and can search the sample directory; it cannot yet test
real employee matching.
