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

Ask in this order and stop once decisions are sufficient:

1. What should the learner be able to explain, derive, implement, or evaluate at the end?
2. What is already reliable knowledge, and which parts are uncertain?
3. Which tradeoff matters most: breadth, proof depth, implementation depth, applications, or speed?
4. What material, tools, source dates, language, and output constraints apply?

Do not ask the user to repeat information already present. If a reasonable default is safe, state it in the brief and continue. Ask for confirmation before committing to a large scope, a controversial interpretation, or a domain with safety/legal consequences.

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

If a paragraph supports no objective, prerequisite, example, transition, or reference, remove it or move it to optional context.
