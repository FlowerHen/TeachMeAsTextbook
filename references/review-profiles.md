# Risk-Scaled Review Profiles

Not every piece of writing needs the same review machinery. Choose a review profile from the content risk, not from the author's anxiety or the document's word count alone.

## Profiles

### `light`

Use for a short explanation, a small glossary, a revision with no new claims, or a single low-risk learning unit.

Required:

- objective and prerequisite check;
- factual sanity check against the supplied material;
- one example and one boundary check;
- student/solution separation if exercises exist;
- one human spot check when the text is intended for publication.

Do not run a full source register, independent mathematics report, or PDF matrix unless the content actually contains those risks.

### `standard`

Use for a chapter, course module, technical guide, or multi-chapter textbook.

Required:

- evidence and claim-scope check;
- mathematics/science check when equations or scientific claims appear;
- code execution and test check when runnable code appears;
- pedagogy and prerequisite check;
- publication and answer-isolation check;
- user review of the path, a representative sample, and the release packet.

Run the relevant checks in parallel only after the Markdown source is frozen. Do not run irrelevant passes merely to satisfy a scorecard.

### `high-stakes`

Use for medical, legal, financial, safety-critical, regulated, externally submitted, or materially consequential educational content.

Required:

- all relevant `standard` checks;
- an independent domain expert or authoritative human reviewer;
- explicit source dates and scope limits;
- adversarial review of harmful misinterpretation and overclaiming;
- human release approval recorded with identity or role and date.

The Agent cannot upgrade high-stakes content to verified status by self-review alone.

## Status model

Keep these statuses distinct:

- `draft`: content or required checks are incomplete;
- `agent-reviewed`: automated and Agent checks completed, but the user has not approved the intended path/voice/render sample or release packet;
- `human-reviewed`: the requested human checkpoints are complete and their decisions are recorded;
- `verified`: the relevant risk profile passed, human review is complete when required, and no blocking finding remains.

A user may explicitly waive a non-blocking recommendation. Record the waiver and its reason. A waiver cannot close a factual, mathematical, code, answer-leakage, accessibility, or rendering blocker.

## Finding triage

Use three classes instead of one undifferentiated score:

- `blocker`: wrong or unsupported central claim, unsafe advice, broken core code, answer leakage, inaccessible essential content, or unusable render;
- `major`: a missing bridge, important edge case, weak evidence, serious inconsistency, or a problem likely to prevent the learner from achieving the objective;
- `editorial`: voice, pacing, example preference, local phrasing, or optional visual refinement.

Blockers must be fixed and rechecked. Majors require a decision: fix, narrow scope, or explicitly defer with a consequence. Editorial findings go to the human reviewer and are not “resolved” by an Agent score.

## Compact review packet

For each checkpoint, give the human reviewer only what is needed to decide:

```text
checkpoint: path | sample | release
artifact: path or inline excerpt
decision_needed: one sentence
options: [default, alternative] when useful
known_risks: short list
questions: maximum five focused questions
```

Do not bury a decision in a long automated report. Store the full evidence report separately and summarize only the decision the human needs to make.
