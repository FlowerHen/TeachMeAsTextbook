# University-Style Chapter Contract

## Chapter header

Every chapter begins with:

- purpose in the overall path;
- hard prerequisites and estimated time;
- 3–6 measurable learning outcomes;
- entry diagnostic and remediation links;
- an opening problem that the chapter will solve.

## Exposition rules

Use a stable learning arc, but do not fill slots mechanically:

1. **Motivation:** make the limitation of the old tool concrete.
2. **Intuition:** show the shape, invariant, physical meaning, or operational story.
3. **Formalization:** define every symbol and state every condition.
4. **Reasoning:** derive, prove, implement, or test the result step by step.
5. **Example:** solve a nontrivial case while exposing decisions and checks.
6. **Practice:** ask the learner to perform a nearby but non-identical task.
7. **Transfer:** vary assumptions, include a failure or counterexample, and return to the opening problem.

Use complete sentences around equations. A definition states its domain and conditions. A theorem states all assumptions and quantifiers. A proof names the definition or prior result used at each non-direct step. A computational claim records data, parameters, environment, and method. Mark pedagogical simplifications and their boundaries.

## Code chapters

Every core code example includes:

- language and version;
- dependencies and setup;
- input/output contract;
- complete runnable listing;
- exact command and representative output;
- tests for normal, boundary, and invalid inputs;
- time/space complexity and failure modes;
- a debugging or design tradeoff prompt.

Never invent a claimed output. If execution was unavailable, label the example `not executed` and treat it as a publication blocker for a verified edition.

## Exercise ladder

Each chapter should include, as applicable:

- concept check;
- direct procedural exercise;
- error diagnosis or counterexample;
- variation with a changed assumption;
- cumulative integration problem;
- transfer, design, proof, experiment, or implementation task.

Record `objective_ids`, `difficulty`, `expected_minutes`, `prerequisites`, `mode`, and `solution_status` for every exercise. Do not make all exercises numeric substitutions. The answer manual uses: strategy, worked steps, result, verification, common error, and alternate method when useful.

## Exercises and answers

Freeze problem statements before producing solutions. Generate solutions in a separate pass from the problem bank, then independently recompute them. For code, include tests and complexity in the answer. For proofs, include the dependency chain. For open-ended tasks, provide a rubric, invariants, or acceptance tests rather than pretending there is only one answer.

## Chapter close

End with a concept relation map, key definitions/results, common mistakes, cumulative retrieval questions, a short self-check, and a bridge explaining why the next chapter follows. A chapter that becomes shorter and thinner near the end is a quality defect unless the path explicitly marks it as a short review chapter.
