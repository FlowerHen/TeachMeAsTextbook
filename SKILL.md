---
name: textbook-creator
description: Create rigorous, self-contained university-style textbooks from arbitrary source material for science, mathematics, and advanced programming. Use whenever the user asks to learn a difficult subject systematically, build a course or textbook, explain prerequisites, produce a long-form study guide, coordinate Sub-agents for chapter or exercise production, or export a textbook and separate answer manual as HTML/PDF. The skill researches and normalizes background knowledge, builds a prerequisite graph and linear learning path, scales long content through Markdown-first Sub-agent workflows with independent review and rejection gates, writes chapter-length explanations with intuition, formal definitions, proofs or mechanisms, worked examples, exercises, visualizations, and code, then performs evidence, mathematics, code, pedagogy, and rendering reviews before delivery.
license: LICENSE.txt
compatibility: Requires Node.js 18+. For PDF export, requires Microsoft Edge, Google Chrome, or Chromium. Run npm install in this skill directory for KaTeX, Highlight.js, and Playwright Core.
---

# Textbook Creator

Create a teachable textbook, not an expanded list of notes. The learner is an educated adult studying independently. Optimize for durable understanding, explicit reasoning, and a linear route from prerequisites to the requested capability.

## Operating principles

- Use the user's language by default. Preserve standard English terminology, symbols, API names, and code identifiers; define them at first use.
- Treat the textbook as a small scholarly publication: state scope, assumptions, source dates, notation, limitations, and errata.
- Prefer backward design: define terminal performances, evidence of learning, then content and activities. Do not draft a table of contents before the learning outcomes and prerequisite graph exist.
- Distinguish intuition, definition, theorem, proof, empirical observation, model, approximation, implementation detail, and open question. Never let an analogy stand in for a proof.
- Keep one recommended linear path. Put alternative prerequisites and optional branches in a clearly marked appendix or remediation box.
- Generate exercises from a frozen structured exercise bank, then generate the answer manual independently from the problem statements. Never put full solutions, answer fields, or solution JSON in the student HTML.
- A polished layout is not evidence of correctness. Do not call the result verified while a blocking fact, math, code, pedagogy, or rendering issue remains open.
- Treat Sub-agents as bounded authors or reviewers, not as independent publishers. The main Agent owns the learning graph, task decomposition, merge, conflict resolution, and final gate.
- For long content, use Markdown as the intermediate authoring format. Do not ask multiple Sub-agents to write the same final JSON, HTML, build script, or shared directory.
- Read `references/subagent-orchestration.md` whenever the request involves long-form scaling, chapter parallelism, exercise generation, separate student/solution editing, or Sub-agent delegation.

## Workflow and gates

### 1. Intake and interview

Read `references/intake-and-planning.md`. Extract what is already known from the conversation, then ask only for missing decisions. At minimum record:

- learner background, prior courses, mathematics maturity, programming languages and tools;
- target capability or final project, desired depth, time budget, language, and output formats;
- user-provided material, preferred sources, date sensitivity, exclusions, privacy boundaries;
- whether proofs, implementation, experiments, historical context, or applications are required.

If target, audience, or safety boundaries are materially ambiguous, stop and ask. Otherwise write assumptions explicitly in `brief.json`; do not hide them.

### 2. Research and learning design

Read `references/research-and-review.md` and `references/chapter-authoring.md`. If the book is long content or will use Sub-agents, also read `references/subagent-orchestration.md`. Produce these internal artifacts before prose:

1. `brief.json` — learner, scope, constraints, assumptions, and success criteria.
2. `research/source-register.md` — authoritative sources with URL, access date, authority reason, claim supported, and limitations.
3. `research/evidence-map.md` — chapter claims and learning objectives mapped to sources, examples, visuals, and tests.
4. `competency-graph.json` — capability nodes, hard prerequisites, alternative prerequisite clauses, and assessment evidence.
5. `learning-path.md` — a topologically valid primary sequence, diagnostic entry points, remediation links, and optional branches.
6. `objective-matrix.csv` — every objective mapped to explanation, example, exercise, answer, and review status.

The graph must be acyclic after expanding alternative prerequisite clauses. A dependency means “cannot reliably understand or perform this yet,” not merely “is related.” Diagnose with small representative tasks when the user's background is uncertain. A self-report is a hint, not mastery evidence.

Classify each topic as short or long before assigning it. Treat a topic as long when it exceeds roughly 60 minutes, has multiple hard prerequisites, combines theory with implementation/cases, or requires exercises, visuals, or cross-chapter reuse. Long topics follow the Markdown-first Sub-agent workflow and review gates in `references/subagent-orchestration.md`; short topics may be drafted directly but still require an objective, example, boundary, self-check, and bridge.

### 3. Outline approval

Draft the outline before full chapters. Each chapter must have a purpose in the path, 3–6 observable outcomes, hard prerequisites, estimated study time, a motivating problem, a visual plan, and an assessment plan. Ask the user to approve the path or explicitly accept the documented assumptions.

### 4. Chapter authoring

Use the chapter contract in `references/chapter-authoring.md`. For long content, complete the topic sequence “outline -> content composition decision -> visualization/case analysis -> concrete Markdown production” before merging into the publication model. Assign independent Sub-agents to distinct Markdown files or sections, then have the main Agent merge and normalize them. Never treat a missing, timed-out, summary-only, malformed, or artifact-capture-failed Sub-agent response as a valid chapter package.

Each core chapter normally follows:

1. Chapter contract and entry diagnostic.
2. Motivating problem and promise.
3. Intuitive model, with the limits of the analogy stated.
4. Formal vocabulary, notation, definitions, and contracts.
5. Derivation, proof, algorithm, mechanism, or experimental method.
6. Worked example: plan, execution, checks, and reflection.
7. Immediate non-copying practice with feedback or a pointer to the manual.
8. Variation, counterexample, failure mode, or boundary case.
9. Integration/application that returns to the opening problem.
10. Summary, concept relations, common mistakes, cumulative exercises, and bridge to the next chapter.

For mathematics, make quantifiers, domains, assumptions, and proof dependencies explicit. For science, separate phenomenon, model, evidence, uncertainty, and scope. For code, include versioned environment, runnable input/output contract, command, expected output, tests, complexity, and failure modes. Do not use “obvious” to conceal an unintroduced step.

### 5. Visual and interactive layer

Read `references/visual-and-interaction.md`. Every major concept should have a reasoned visual choice: flow, dependency graph, timeline, comparison, geometry, state machine, algorithm trace, plot, or table. Use inline SVG or local assets; no remote CDN is allowed in a portable build.

Interactive elements should be progressive enhancement, not a requirement for understanding. Use accessible `<details>`, tabs with keyboard support, self-check prompts, code-copy controls, and diagrams with captions and text alternatives. Every interactive visualization needs a static print fallback and a meaningful no-JavaScript rendering.

### 6. Independent review

Run five passes against the frozen source:

- **Evidence:** every nontrivial or time-sensitive claim has an appropriate source, date, scope, and confidence.
- **Mathematics/science:** recalculate equations and answers; inspect definitions, assumptions, units, limiting cases, counterexamples, and proof dependencies.
- **Code:** execute core snippets from a clean declared environment; test typical, boundary, and invalid inputs; compare documented output and complexity.
- **Pedagogy:** verify objective-to-content-to-assessment coverage, prerequisite order, difficulty progression, explanations between examples and exercises, and cumulative retrieval.
- **Publication:** build both HTMLs and PDFs; check headings, links, formulas, fonts, figures, page breaks, answer separation, and absence of external requests.

For long content, perform these reviews as independent read-only passes after Markdown drafting. Return only `pass`, `revise`, or `block`; a `revise`/`block` result must return to the author or main Agent with a precise location, evidence, fix, and recheck. Do not let the main Agent replace missing substance with a summary. Record each finding as `severity`, `location`, `problem`, `evidence`, `fix`, and `verification`. Blocking findings must be fixed and rechecked. If a tool or expert review is unavailable, report the limitation prominently.

### 7. Build and deliver

Read `references/output-contract.md`. Before publication, the main Agent must freeze the Markdown source, normalize stable IDs, generate exercises from the frozen problem bank, and generate the answer manual independently. Student-editor inputs must exclude solution fields and solution-only IDs. Create a project using `templates/book.json` and `templates/chapter.md`, then run:

```bash
npm install
node scripts/build.mjs --project path/to/book-project
node scripts/print-pdf.mjs --project path/to/book-project
node scripts/verify.mjs --project path/to/book-project --strict
```

The normal deliverables are:

```text
dist/textbook.html
dist/textbook.pdf
dist/solutions.html
dist/solutions.pdf
dist/manifest.json
reports/facts.md
reports/math.md
reports/code.md
reports/pedagogy.md
reports/publication.md
```

The builder must physically omit solutions from the student output. If PDF tooling is unavailable, deliver the verified HTML plus a precise fallback report; do not silently claim PDF success.

## Output behavior

For a new request, first present a compact intake summary and missing questions. After the answers, show the competency graph summary and learning path for approval. During production, provide chapter checkpoints rather than dumping an unreviewed book. At completion, report the files, validation status, unresolved risks, source coverage, code execution coverage, and the exact commands used.

## Evaluation guidance

For this Skill, qualitative review matters more than raw token count, but structural expectations are objectively testable. Use `evals/evals.json` as a starting set. Test at least one scientific topic, one mathematical topic, and one advanced programming topic. Compare with-skill and without-skill runs, then review both the rendered textbook and the answer separation. Do not reward a long answer that lacks a valid path, evidence, runnable examples, or independently checked solutions.
