# Intake, Diagnosis, and Learning Path

## Required brief

Use `templates/brief.json`. The brief is a decision record, not a formality. Fill what the conversation establishes and mark the rest as `unknown`, `assumed`, or `confirmed`.

Required fields:

- `learner`: education, domain experience, mathematics, programming, language, accessibility needs;
- `goal`: terminal performance, target depth, final artifact, and what is out of scope;
- `constraints`: time per session, total time, language, date cutoff, tools, and output formats;
- `materials`: user files, URLs, notes, must-use sources, excluded sources, privacy rules;
- `quality`: proof level, citation level, execution policy, review policy, and acceptable fallbacks.

## Clarifying questions

For a substantial project, collect one compact decision sheet rather than asking one question per turn. Extract known decisions from the conversation first, then ask only what is missing:

1. What should the learner be able to explain, derive, implement, or evaluate at the end?
2. What is already reliable knowledge, and which parts are uncertain?
3. How much time is available per session and across the whole route?
4. Which tradeoff matters most: breadth, proof depth, implementation depth, applications, or speed?
5. Which learning path and chapter outline should be used, and which topics are explicitly out of scope?
6. What form should each unit take: explanation, proof, code, experiment, case, exercise, visual, or interaction?
7. What voice, density, reader address, reference sample, and human review cadence should guide the prose?
8. What material, tools, source dates, language, output formats, and visual theme apply?

Present safe defaults beside each missing decision so the user can approve or change them. Do not ask the user to repeat information already present. Ask for confirmation before committing to a large scope, a controversial interpretation, or a domain with safety/legal consequences.

Use these four checkpoints for long projects:

- `brief`: learner, terminal performance, total/session time, scope, language, and constraints;
- `path`: competency graph, chapter sequence, chapter durations, and outline;
- `sample`: one representative section, exercise, visual, and rendering theme;
- `release`: unresolved risks, human feedback, validation results, and deliverables.

Do not block useful work between checkpoints when the user has already approved the relevant decision. Do not pause after every small section unless the user requests it.

## Capability graph

Represent each node as:

```json
{
  "id": "alg.invariant",
  "can_do": "Prove an invariant for a loop and use it to establish partial correctness",
  "level": "analyze",
  "requires": ["logic.quantifiers", "program.loops"],
  "requires_any_of": [["induction"], ["recursion"]],
  "evidence": ["proof", "annotated_program"],
  "assessed_in": ["ch03.ex04"]
}
```

Use `requires` for hard prerequisites and `requires_any_of` for genuinely interchangeable routes. Check for cycles, missing node IDs, self-dependencies, orphan goals, and edges that are merely topical relationships. Produce one recommended topological route; keep alternatives as remediation or optional branches.

## Diagnostics and remediation

Each chapter starts with a short diagnostic, not an intimidating exam. Use one concept item, one small derivation or prediction, and one application/code-reading item when applicable. A failed diagnostic points to a specific prerequisite unit, not to a generic “review basics” page. A passed diagnostic does not remove the need for the chapter's conceptual bridge.

## Backward design checks

For each terminal performance:

- write an observable verb and conditions of success;
- identify evidence that would convince a skeptical instructor;
- add content only when it supports that evidence or a necessary bridge;
- add an exercise that requires the learner to perform, not merely recognize, the target;
- record the relationship in `objective-matrix.csv`.

If a paragraph supports no objective, prerequisite, example, transition, or reference, remove it or move it to optional context. Keep a small editorial style profile in the brief so a later chapter does not silently drift in register, density, or reader address.
