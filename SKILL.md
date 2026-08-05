---
name: textbook-creator
description: Create rigorous, self-contained textbooks for science, mathematics, and advanced programming. Use when a user wants systematic learning, a long-form study guide, chapter or exercise production with Sub-agents, human-quality prose, or HTML/PDF textbook and solution-manual output. Build a prerequisite path, write Markdown-first long content, calibrate voice with human checkpoints, support scenario-specific themes, and apply risk-scaled evidence, math, code, pedagogy, and publication review.
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
- Read `references/human-style-and-feedback.md` whenever prose quality, voice, naturalness, pacing, human review, or user editing feedback matters. Human editorial preference outranks an automated style preference.
- Read `references/review-profiles.md` before choosing review depth. Use a risk-scaled profile instead of running every possible check for every document.
- Load references selectively by phase. Do not put every reference document into context at once; the active phase determines the minimum context pack.

## Workflow and gates

### Context budget

Load the smallest reference set that can make the current decision. Use this phase map instead of loading the entire skill bundle:

| Phase | Minimum references |
|---|---|
| Intake | `intake-and-planning.md`, `templates/brief.json` |
| Research/path | `intake-and-planning.md`, `research-and-review.md` |
| Outline/chapter | `chapter-authoring.md`, `intake-and-planning.md` |
| Voice/sample | `human-style-and-feedback.md`, `visual-and-interaction.md` |
| Sub-agent scale | `subagent-orchestration.md`, `chapter-authoring.md` |
| Review | `review-profiles.md`, `research-and-review.md`, plus the rubric for the active review |
| Build/render | `output-contract.md`, `visual-and-interaction.md` |

Load section-specific references only when the active task needs them. Return to the source of truth rather than copying full references into every Sub-agent prompt. Pass a compact task packet: relevant objective, prerequisites, local terminology, source version, output contract, and review criteria.

### 1. Intake and interview

Read `references/intake-and-planning.md`. Extract what is already known from the conversation, then present one compact decision sheet instead of scattering questions across many turns. For a long project, do not begin full content generation until the user has confirmed or accepted defaults for the learner, terminal capability, study time, scope, learning path, outline, writing mode, review checkpoints, and output/rendering preferences. Ask only for decisions that materially change the work.

At minimum record:

- learner background, prior courses, mathematics maturity, programming languages and tools;
- target capability or final project, desired depth, time budget, language, and output formats;
- user-provided material, preferred sources, date sensitivity, exclusions, privacy boundaries;
- whether proofs, implementation, experiments, historical context, or applications are required;
- voice/register, reader address, density, reference samples, human review cadence, and preferred render theme when prose or publication style matters.

If target, audience, terminal capability, study budget, or safety boundaries are materially ambiguous, stop and ask. Otherwise present assumptions for confirmation and write them explicitly in `brief.json`; do not hide them.

Use four human checkpoints for long content: brief, path, representative voice/visual sample, and release. Do not interrupt after every section unless the user requests that cadence.

### 2. Research and learning design

Read `references/research-and-review.md` and `references/chapter-authoring.md`. Read `references/human-style-and-feedback.md` when the project has a non-default voice, user writing samples, or a human-naturalness requirement. If the book is long content or will use Sub-agents, also read `references/subagent-orchestration.md`. Load only the references needed for the current phase. Produce these internal artifacts before prose:

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

Use the confirmed voice contract and representative sample. Write like a situated human teacher: vary paragraph rhythm, use concrete subjects and verbs, explain decisions and uncertainty, and avoid repeated rhetorical slots. The chapter contract guarantees coverage; it is not a formula that every section must mechanically fill. Use `references/human-style-and-feedback.md` for the reasoning/teaching/voice pass.

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

Read `references/visual-and-interaction.md`. Every major concept should have a reasoned visual choice: flow, dependency graph, timeline, comparison, geometry, state machine, algorithm trace, plot, or table. Use inline SVG or local assets; no remote CDN is allowed in a portable build. Select a rendering theme from the supported theme set based on audience and medium, and confirm it at the representative-sample checkpoint.

Interactive elements should be progressive enhancement, not a requirement for understanding. Use accessible `<details>`, tabs with keyboard support, self-check prompts, code-copy controls, and diagrams with captions and text alternatives. Every interactive visualization needs a static print fallback and a meaningful no-JavaScript rendering.

### 6. Independent review

Read `references/review-profiles.md` and choose `light`, `standard`, or `high-stakes` before reviewing. Run only the checks that match the selected profile and the actual content risks:

- **Evidence:** every nontrivial or time-sensitive claim has an appropriate source, date, scope, and confidence.
- **Mathematics/science:** recalculate equations and answers; inspect definitions, assumptions, units, limiting cases, counterexamples, and proof dependencies.
- **Code:** execute core snippets from a clean declared environment; test typical, boundary, and invalid inputs; compare documented output and complexity.
- **Pedagogy:** verify objective-to-content-to-assessment coverage, prerequisite order, difficulty progression, explanations between examples and exercises, and cumulative retrieval.
- **Publication:** build both HTMLs and PDFs; check headings, links, formulas, fonts, figures, page breaks, answer separation, and absence of external requests.

For long content, perform relevant reviews as independent read-only passes after Markdown drafting. Return `pass`, `revise`, or `block`; a `revise`/`block` result must return to the author or main Agent with a precise location, evidence, fix, and recheck. Do not let the main Agent replace missing substance with a summary. Record each finding as `severity`, `location`, `problem`, `evidence`, `fix`, and `verification`. Blockers must be fixed and rechecked. If a tool or expert review is unavailable, report the limitation prominently.

Separate mechanical gates from editorial judgment. Missing IDs, answer leakage, broken formulas, unsupported central claims, and non-running core code are blockers. Voice, pacing, example choice, cultural fit, and perceived naturalness are editorial findings: surface them to the user, preserve their decision, and do not convert an Agent score into approval. The user is the authority for the intended voice and teaching feel. Do not label a package `verified` until required human checkpoints are complete; use `agent-reviewed` when only Agent and automated checks have passed.

### 7. Build and deliver

Read `references/output-contract.md`. Before publication, the main Agent must freeze the Markdown source, normalize stable IDs, generate exercises from the frozen problem bank, and generate the answer manual independently. Student-editor inputs must exclude solution fields and solution-only IDs. Choose `metadata.theme` from the supported rendering themes and verify both screen and print behavior. Create a project using `templates/book.json` and `templates/chapter.md`, then run:

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

For a new request, first present a compact intake summary and one decision sheet covering learner, terminal performance, study time, scope, learning path, outline, writing mode, review cadence, and rendering theme. After confirmation, show the competency graph summary and learning path for approval. Before scaling full chapters, show one representative section and one visual/theme sample for human voice and layout feedback. During production, provide meaningful checkpoints rather than dumping an unreviewed book. At completion, report the files, selected review profile, theme, validation status, unresolved risks, source coverage, code execution coverage, human feedback still open, human approval status, and the exact commands used.

## Evaluation guidance

For this Skill, human editorial review matters more than raw token count or an Agent-generated style score, while structural expectations remain objectively testable. Use `evals/evals.json` as a starting set. Test at least one scientific topic, one mathematical topic, one advanced programming topic, and one long-content orchestration case. Compare with-skill and without-skill runs, then inspect representative prose for rhythm, specificity, and voice fit, along with rendered themes and answer separation. Do not reward a long answer that lacks a valid path, evidence, runnable examples, human feedback incorporation, or independently checked solutions.
