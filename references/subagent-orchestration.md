# Sub-agent Orchestration, Review, and Long-Content Scaling

This document defines how the textbook skill uses Sub-agents for authoring, exercise production, editing, and review. The goal is to increase throughput without allowing multiple agents to produce incompatible pseudo-final books. The main Agent always owns the learning graph, task decomposition, versioning, merge, conflict resolution, and release decision.

## When to Use the Long-Content Workflow

Treat a topic as long content when any of the following is true:

- It requires more than roughly 60 minutes of continuous study.
- It introduces three or more new concepts with hard prerequisites.
- It combines at least two of formal definitions, mathematical derivation, code implementation, experiments, or real-world cases.
- It reuses terminology, equations, data grain, time semantics, or case data across chapters.
- It requires a separate exercise book, solution manual, visual assets, or PDF output.

Short content may be drafted directly by the main Agent, but it still needs an objective, a concrete example, a boundary or counterexample, a self-check, and a bridge to the next topic. Upgrade it to the long-content workflow when it is reused by multiple chapters, requires a derivation or experiment, or grows beyond one learning unit.

## Role Model

### Main Agent: Editor-in-Chief

The main Agent must:

1. Derive the chapter structure, capability graph, prerequisite order, and review evidence from the terminal capability.
2. Create the blueprint, terminology list, mathematics checklist, case checklist, visualization checklist, and exercise plan for every long topic.
3. Split work into bounded Markdown tasks that can be reviewed independently.
4. Dispatch a common prompt contract with explicit inputs, versions, output paths, and acceptance criteria.
5. Merge, remove duplication, reorder, fill gaps, and resolve cross-agent conflicts.
6. Freeze problem statements before generating solutions and student/solution editions.
7. Run the final build, strict validation, and visual inspection, and report all unverified items accurately.

The main Agent must not treat “several Sub-agents wrote it” as evidence of quality. A chapter enters the final publication model only after its review findings are closed.

### Content-Author Sub-agent

The content author produces a Markdown draft for an assigned scope. It must not write the final `book.json`, HTML, PDF, build scripts, or whole-book metadata. The draft must retain definitions, reasoning, examples, and boundary analysis; it must not replace missing substance with a summary.

### Exercise Sub-agent

The exercise author reads frozen Markdown, the objective matrix, and exercise constraints. It produces problems, solutions, scoring points, common mistakes, and verification methods. It must not edit the exposition or change the learning objectives. Every problem must be checked by independent recomputation, unit checking, boundary checking, and code-contract checking where applicable.

### Student-Edition Editor Sub-agent

The student editor receives approved exposition, the terminology list, the visualization plan, and frozen problem statements, but no answer fields. It produces the student-edition Markdown or structured content. Solution fields must be physically absent, not hidden with CSS.

### Solution-Manual Editor Sub-agent

The solution editor receives frozen problem statements and an independent solution record. It produces step-by-step solutions, rationale, verification, common errors, and scoring points. It must not modify the problem statements. If a problem is defective, it reports a blocker to the main Agent instead of silently changing the question.

### Review Sub-agent

A review Sub-agent reads the specified source and blueprint in a fresh, read-only context. It must not accept the author's self-check as evidence. It returns `pass`, `revise`, or `block`, with a location, problem, evidence, proposed fix, and recheck method.

## Long-Content Workflow

```text
Main Agent: terminal capability and directory
  -> chapter blueprint, dependency graph, terminology, math/case/visual/exercise checklists
  -> content-author Sub-agents: parallel Markdown drafts
  -> domain, math, pedagogy, engineering, case/visual reviews: parallel read-only review
  -> return failed drafts until they pass, or rewrite them in the main Agent
  -> main Agent merges, reorders, fills gaps, and normalizes cross-chapter references
  -> freeze chapter Markdown and objective matrix
  -> exercise Sub-agents: generate and verify problems
  -> student editor and solution editor: parallel work with isolated inputs
  -> main Agent: whole-book conflict review, build, strict validation, visual inspection
```

Only tasks that do not write the same file may run in parallel. Assign authors separate chapters or clearly separate sections and files. The student and solution editors must use isolated input or output sets. The main Agent performs the only merge into `book.json` or shared build scripts.

## Four-Stage Topic Protocol

Every topic follows these stages in order:

1. **Outline decision:** define objectives, prerequisites, chapter position, estimated time, and acceptance evidence.
2. **Content-composition decision:** decide whether the topic needs intuition, definitions, derivation, code, experiment, table, case, counterexample, and exercise, and record why omitted forms are unnecessary.
3. **Visualization and case analysis:** choose a visual for a specific learning task; define case data grain, constraints, failure cost, and acceptance criteria.
4. **Concrete production:** write the topic as Markdown according to the chapter contract, showing intermediate reasoning and checks instead of only final conclusions.

Do not skip a stage. For short content, the record may be compressed, but the objective, boundary, and self-check remain required.

## Markdown Intermediate-Artifact Contract

The default Sub-agent output is Markdown, not final structured JSON. Every draft must contain at least:

```text
# Topic title

## Objectives and prerequisites
## Motivating problem
## Intuitive model and boundaries
## Formal definitions and notation
## Mechanism, derivation, or algorithm
## Step-by-step worked example
## Counterexamples, boundaries, and engineering failures
## Exercise placeholders
## Visualization suggestions
## Bridge to the next topic
## Author self-check
```

Put metadata in YAML front matter or a neighboring manifest. At minimum record `chapter_id`, `section_id`, `source_version`, `objectives`, `prerequisites`, and `status`. Do not compress the body merely because it will later be converted to JSON.

The main Agent performs chapter ordering, cross-chapter deduplication, terminology normalization, exercise-ID assignment, answer linking, HTML shaping, and final `book.json` generation. If Markdown and the publication schema disagree, fix the merge contract or return to the Markdown; do not ask Sub-agents to guess final fields.

## Prompt Contract

Every content task must state:

- what the learner already knows and does not know;
- the terminal capability and explicit scope exclusions;
- upstream chapters, allowed terminology, and terms that cannot be assumed yet;
- required definitions, derivations, cases, code, boundaries, counterexamples, and exercise objectives;
- code version, execution policy, and the `not executed` rule;
- input-file version, Markdown output path, and files that must not be modified;
- review dimensions and the `pass/revise/block` standard;
- that the response must contain a complete Markdown draft and self-check, not a completion summary.

Recommended prompt skeleton:

```text
You are the content author for {chapter_id}/{section_id}.
Learner knows: {prerequisites}; learner does not yet know: {missing_background}.
Terminal capability: {terminal_performance}.
Must build on: {upstream_concepts}; must not assume: {forbidden_assumptions}.

Write a Markdown draft using the chapter contract: motivation, intuition and limits, formal definitions, step-by-step derivation/mechanism, worked example, counterexample/failure mode, exercise placeholder, visualization suggestion, and bridge to the next section.

For every equation define variables, units, assumptions, and reasoning. For every code example provide the input/output contract, complexity, tests, and a not executed marker when execution evidence is unavailable. For every case provide symptoms, evidence, root cause, tradeoffs, acceptance criteria, and rollback.

Only return or modify the assigned Markdown artifact. Do not write book.json, HTML, PDF, or shared build scripts. When information is missing, mark a TODO or blocker; do not invent facts or replace the body with a summary.
```

## Review Dimensions and Rejection Loop

Every long-content draft must receive independent reviews for:

- **Clarity:** progress from known to unknown, define before use, show intermediate example states, and close the opening problem.
- **Learner fit:** do not assume undeclared mathematics, distributed-systems, engineering, or API knowledge; provide bridges and diagnostics.
- **Mathematical/statistical logic:** check variable domains, units, assumptions, derivations, associativity, numerical stability, empty inputs, limits, and counterexamples.
- **Knowledge/engineering logic:** check data grain, schema, keys, invariants, time semantics, failure, retries, idempotency, cost, and rollback.
- **Cases/visuals:** ensure every visual serves a named cognitive task; tables are recomputable; cases include constraints, failure modes, and acceptance criteria.
- **Code/publication:** check versions, input/output, tests, execution markers, equations, tables, mobile layout, PDF layout, and answer isolation.

Use this record format:

```text
chapter: ch04
section: join-cardinality
version: draft-02
reviewer: math-reviewer
verdict: revise
severity: major
location: worked-example-1
finding: The one-to-many join does not explain repeated accumulation of order amounts.
evidence: Manual calculation on three orders disagrees with the stated result.
fix: Define m_order and show the sum of m_order times amount_order.
recheck: Recalculate the example, the boundary case, and the related exercise answer.
```

A `revise` result returns to the author with concrete edits and a recheck command. A `block` result stops the merge and requires task resplitting, a different author, or a main-Agent rewrite. Do not keep appending text after the same issue has failed to be fixed twice. Freeze the draft only after all blockers and major findings are closed.

## Reliability and Failure Recovery

Sub-agent output capture is not a reliable publication store. Use these safeguards:

- Ask agents to return or write Markdown first; let the main Agent parse and merge it.
- Use unique filenames and pre-existing, explicit work directories for each artifact.
- Never let multiple agents create the same directory, edit the same file, or compete for the same artifact path.
- Give long tasks intermediate checkpoints. If a task times out, resume from the last valid Markdown artifact instead of rewriting from a summary.
- When directory creation, synchronization, artifact capture, or structured-output errors occur, switch to a main-Agent-controlled project path and record the failure.
- Do not accept `no recovered final output`, “implemented”, or a summary paragraph as a valid chapter package.
- Before merging, check that Markdown is non-empty, headings are complete, objectives are covered, and the source version matches the blueprint. Validate JSON only at the main-Agent merge stage.

If a Sub-agent cannot return the contract artifact, its status is `blocked`, not `pass`. The main Agent may continue independent tasks but must list the blocker in the final report.

## Exercise and Two-Document Isolation

Freeze problem statements before generating solutions. The student-editor task may receive only:

- frozen exposition Markdown;
- problem text, IDs, objectives, and difficulty;
- visual and publication rules.

It must not receive `solution_html`, answer prose, scoring points, solution-only IDs, or answer-file paths. The solution-editor task receives problems and solution records but cannot change the problems. Programmatically check that the student HTML contains neither answer fields nor answer text; do not rely on visual hiding.

## Final Gates

Before publishing long content, check in order:

1. Blueprint and capability graph are complete and acyclic.
2. Markdown drafts pass multi-dimensional review and are frozen.
3. Every objective has exposition, an example, an exercise, and answer evidence.
4. Problems, solutions, scoring points, and verification methods correspond one-to-one.
5. Student and solution inputs are isolated and the student output contains no solutions.
6. Build, PDF generation, strict structural checks, and representative visual checks pass.
7. Unexecuted code, environment limitations, factual risks, and remaining review items are stated in the reports.

Any unmet gate means the package remains `draft / not verified`; generation success or attractive layout does not justify `verified`.
