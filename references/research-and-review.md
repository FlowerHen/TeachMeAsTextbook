# Research, Evidence, and Review

## Source ladder

Prefer, in order: official standards and documentation; university/open textbook sources; peer-reviewed papers and scholarly monographs; maintained reference implementations; reputable technical practice; secondary summaries. Use social posts only as leads, never as sole support for a technical or scientific claim.

For each source record title, stable URL or identifier, publisher/author, publication or update date, access date, authority reason, claims supported, and limitations. User-provided material is valuable for intent and examples but is not automatically authoritative.

## Evidence map and claim ledger

Maintain both:

- `evidence-map.md`: objective/chapter -> source, example, visual, exercise, and test;
- `claim-ledger.csv`: claim, type, source IDs, location, scope, confidence, and review status.

Classify claims as definition, theorem, derivation, observation, empirical result, model, approximation, implementation fact, interpretation, or open question. Time-sensitive claims must show an as-of date. Distinguish “the source says” from “this tutorial infers.”

## Independent review records

Use separate reports for facts, mathematics/science, code, pedagogy, and publication. Load only the report guidance needed for the active pass; do not spend context on every review rubric at every stage. Each finding has:

```text
severity: blocker | major | minor | note
location: file/section/exercise ID
problem: precise statement
evidence: calculation, source, test, or screenshot
fix: proposed correction
verification: how closure was confirmed
```

Do not mark a finding closed merely because prose was rewritten. Re-run the relevant check. An LLM pass is a second reading, not an independent expert or proof checker; state that residual risk. Separate mechanical blockers from editorial feedback. For voice, pacing, examples, cultural fit, and perceived naturalness, the user's explicit feedback is authoritative; record disagreement instead of silently overriding it.

## Blocking rules

Block a verified edition when any of these holds:

- a central nontrivial claim lacks appropriate evidence;
- an equation, proof, unit, boundary case, or answer is wrong or underspecified;
- core code does not run in the declared environment or its output disagrees with the text;
- an objective has no teaching evidence or assessment;
- a prerequisite is used before being taught or diagnosed;
- a student file contains full solutions;
- HTML/PDF has broken formulas, missing figures, clipped content, or unresolved placeholders.

If a blocker cannot be resolved, label the package `draft / not verified` and list it prominently. A strict gate should protect correctness, safety, reproducibility, and answer separation without forcing every subjective style preference through an artificial numeric threshold.
