# Evals

## 1. Current risk

The riskiest assumption is that a curated static directory can help an intern
find someone willing to talk. Current profiles are fictional, so automated
tests measure search behavior and interface reliability, not real employee
matching.

## 2. Historical prediction stake (2026-09-28)

- **Tight:** At least 3 of 4 F-04 EARS rows will pass on bolt.new's first
  integrated output.
  - Resolution (2026-09-30): 4 of 4 F-04 rows passed after integration; the
    first output required cleanup.
- **Loose:** bolt.new's first output will follow STYLE.md more consistently
  than AI Studio's output.
  - Resolution (2026-09-30): confirmed; AI Studio retained a broader default
    palette and localStorage behavior outside the spec.
- **Open:** bolt.new will introduce a dependency or network call not requested
  in the prompt.
  - Resolution (2026-09-30): confirmed. Generated dependencies were not
    retained.

## 3. Success criteria

| EARS row | Checked by | Where |
|---|---|---|
| F-01a: Directory opens with fictional curated profiles. | Test | `evals/f01.test.js` |
| F-01b: Search matches name, team, or topic without case sensitivity. | Test | `evals/f01.test.js` |
| F-01c: Opt-in form prepares a local JSON snippet. | Test | `evals/f01.test.js` |
| F-01d: Preparing a request does not change curated directory data. | Test | `evals/f01.test.js` |
| F-01e: Malformed profiles are rejected. | Test | `evals/f01.test.js` |
| F-01f: Blank request fields are rejected. | Test | `evals/f01.test.js` |
| F-04-1: Guide lists Business Credit and Treasury Management. | Test | `evals/f04-guide.test.js` |
| F-04-2: Every guide area has a summary and conversation starter. | Test | `evals/f04-guide.test.js` |
| F-04-3: Every summary is labeled illustrative. | Test | `evals/f04-guide.test.js` |
| F-04-4: Guide selection keeps both areas available. | Test + manual | `evals/f04-guide.test.js`; browser check |
| F-04-5: Guide selection does not change searchable directory data. | Test | `evals/f04-guide.test.js` |

## 4. Historical error-analysis log

| Failure | Count | Source | Category |
|---|---:|---|---|
| Generated output exceeded requested file scope | 2 | bolt and AI Studio | scope |
| Generated output drifted from STYLE.md | 2 | bolt and AI Studio | style |
| Generated output added unnecessary dependencies | 2 | bolt and AI Studio | dependency |
| Generated output did not preserve the intended Worker/D1 integration | 2 | bolt and AI Studio | architecture |
| F-04 switching behavior initially unclear to static test | 1 | code eval | EARS |
| Judgment rubric disagreement on change scope | 1 | judgment eval | rubric |
| Generated zip dependency licenses were not audited | 1 | DDR review | cannot verify |

## 5. Current verification

Run `npm test` for static directory and guide checks. Automated checks use
fictional records; they do not prove that employees opted in or that interns
can reach real employees.

No real-user search test has been completed yet. After deployment, ask an
intern to find a specified fictional profile and record the role, date,
outcome, and disappointment response in [FEEDBACK.md](../docs/FEEDBACK.md).
This evaluates findability only, not real employee matching.

The site is not considered deployed until the GitHub Pages workflow succeeds
and its public URL is verified.

## 6. Historical HW3/HW4 records

Earlier evaluations covered localStorage and an intended Worker/D1 API. Those
results describe previous iterations; they are not evidence that the current
static implementation has a backend, a real employee opt-in workflow, or a
successful deployment. The current decision is in
[ADR-002](../docs/ADR-002.md).
