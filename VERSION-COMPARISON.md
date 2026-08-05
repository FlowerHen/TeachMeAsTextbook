# Version Comparison: Initial vs Current Textbook Creator Skill

## Scope and Baselines

This document compares the first published implementation with the current implementation in Git history:

| Version | Commit | Description |
|---|---|---|
| Initial | `98c122d` | First standalone publication of the scalable textbook workflow |
| Intermediate | `71c379e` | Human voice, editorial feedback, and multi-theme rendering |
| Current | `cbf9868` | Risk-scaled review profiles and theme-preview validation |

The comparison focuses on three dimensions requested for review:

1. Content contract: what a textbook is required to contain and how prose is shaped.
2. Workflow: how the Agent moves from user request to published artifacts.
3. Supervision: how authors, reviewers, the user, and release gates control quality.

The current version is additive in scope but selective in enforcement. It keeps the original correctness requirements while removing process that does not reduce a real risk.

## Executive Summary

| Area | Initial version | Current version | Net change |
|---|---|---|---|
| Core purpose | Rigorous university-style textbook with a linear path | Same, plus long-content scaling, voice calibration, risk-based review, and themes | Broader operating model |
| Content unit | Chapter contract with a mostly stable ten-part arc | Same contract, explicitly treated as coverage guidance rather than a prose mold | More adaptable and less mechanical |
| User intake | Compact summary and missing questions | One decision sheet with path, time, outline, style, review cadence, and theme | More complete before drafting |
| Learning path | Competency graph, prerequisites, outline approval | Same, with explicit path checkpoint and chapter time budget | Stronger user confirmation |
| Long content | Markdown-first Sub-agent workflow | Same, plus selective context packets and topic-stage protocol | Lower context cost and clearer dispatch |
| Short content | Mentioned as an exception to long workflow | Explicit `light` treatment and upgrade rules | Better process selection |
| Human style | Mostly implied by clarity and pedagogy rules | Voice contract, reference sample, positive style targets, and user-owned editorial decisions | Substantially improved |
| Sub-agent supervision | Bounded roles, Markdown outputs, `pass/revise/block` | Same, plus explicit failure recovery and input isolation | More operationally robust |
| Review depth | Five review passes were presented as the normal path | `light`, `standard`, and `high-stakes` profiles | Less over-processing, clearer risk boundary |
| Human review | Recommended through checkpoints but not a release status | `agent-reviewed`, `human-reviewed`, and `verified` are distinct | Less dependence on self-review |
| Rendering | Single fixed visual system with offline HTML/PDF | Four themes, CLI preview, manifest theme, strict theme validation | More scenario support |
| Verification | Structure, answer separation, links, formulas, PDFs | Same plus theme consistency and preview override validation | Stronger tooling contract |

## 1. Content Contract

### 1.1 What both versions preserve

The initial and current versions agree on the fundamentals. Neither version treats a textbook as a long summary.

Both require:

- an educated adult independent learner as the default audience;
- a terminal capability defined before full drafting;
- a prerequisite graph and one recommended linear route;
- explicit definitions, assumptions, notation, mechanisms, derivations, and boundaries;
- worked examples with intermediate reasoning;
- exercises generated from frozen problem statements;
- an independently produced solution manual;
- physical omission of solutions from the student HTML;
- code version, input/output contract, tests, complexity, failure modes, and honest `not executed` labels;
- evidence, mathematics/science, code, pedagogy, and publication checks where those risks exist;
- portable HTML/PDF output with offline assets and static fallbacks.

The current version does not weaken these correctness and reproducibility requirements. It changes when and how they are applied.

### 1.2 Initial content model

The initial model defined a stable chapter arc:

1. chapter contract and diagnostic;
2. motivating problem;
3. intuition and analogy limits;
4. formal vocabulary and notation;
5. derivation, proof, algorithm, mechanism, or experiment;
6. worked example;
7. non-copying practice;
8. variation, counterexample, failure, or boundary;
9. integration back to the opening problem;
10. summary, mistakes, exercises, and next-chapter bridge.

This model was strong for coverage and learner progression. Its weakness was that it could encourage mechanical slot filling. An author could technically satisfy ten headings while producing paragraphs with the same rhythm, generic transitions, or thin explanations.

### 1.3 Current content model

The current version retains the chapter arc but adds three controls:

- The chapter arc is a coverage contract, not a prose template. Sections may be reordered when the learning problem requires it, provided the outline explains the deviation.
- A voice contract records register, stance, density, reader address, examples, personality, avoided patterns, and an optional user sample.
- A three-pass writing loop separates reasoning, teaching, and voice work.

The current style target is positive rather than purely subtractive. It asks for:

- concrete learner problems before abstract promises;
- subjects and verbs instead of narrator announcements;
- varied paragraph rhythm;
- examples containing decisions, checks, uncertainty, and failure recovery;
- transitions that state cause, contrast, consequence, or refinement;
- precise uncertainty rather than false confidence;
- purposeful repetition for retrieval;
- explicit tradeoffs instead of universal recommendations.

It also explicitly prohibits fabricated personal experience, invented classroom reactions, fabricated practitioner consensus, and unsupported tool or metric claims.

### 1.4 Content classification

| Question | Initial | Current |
|---|---|---|
| How is long content identified? | Roughly more than 60 minutes, multiple prerequisites, theory plus implementation/cases, or cross-chapter reuse | Same long-content indicators, now recorded in `content_scale` and linked to review profiles |
| How is short content handled? | Direct drafting allowed with basic objective/example/boundary/self-check/bridge | Same minimum, with explicit `light` review profile and upgrade rules |
| Is there a medium category? | No | No separate medium category; `standard` is the practical middle profile for chapters and modules |
| When must short content be upgraded? | When reused or expanded | When reused, needs derivation/experiment, or exceeds one learning unit |
| Does length alone determine rigor? | Too easy to infer from the long-content threshold | Explicitly no: review profile is based on risk, not word count alone |

The remaining simplification is deliberate. The skill uses two content scales, short and long, and three review profiles. Adding a third content-size category would add terminology without improving the dispatch decision.

## 2. Workflow Comparison

### 2.1 Intake and user interaction

| Stage | Initial workflow | Current workflow |
|---|---|---|
| First response | Compact intake summary and missing questions | Compact intake summary plus one decision sheet |
| Required learner decisions | Learner, goal, depth, time, language, tools, source and output constraints | All initial decisions, plus per-session and total study time, outline, writing mode, voice, human review cadence, and rendering theme |
| User confirmation | Confirm the path or accept documented assumptions | Confirm brief, path, representative sample, and release packet |
| Interaction style | Ask missing questions in sequence | Ask only materially consequential questions in a single grouped interaction |
| Drafting start | After intake and outline approval | Full drafting begins only after required long-project decisions are confirmed or accepted as defaults |
| Checkpoint frequency | Chapter checkpoints during production | Four meaningful checkpoints; no interruption after every small section unless requested |

The current workflow is more interactive before writing begins, but less interruptive during writing. This resolves the tension between “ask enough before drafting” and “do not make the user approve every paragraph.”

### 2.2 Research and learning design

The initial workflow required these artifacts before prose:

1. `brief.json`;
2. source register;
3. evidence map;
4. competency graph;
5. learning path;
6. objective matrix.

The current version retains all six. The main workflow change is context selection:

| Initial behavior | Current behavior |
|---|---|
| Read broad research and authoring references at the relevant phase | Use a phase map with a minimum reference pack |
| Sub-agent prompts could receive large copied context | Pass a compact task packet with objective, prerequisites, local terms, source version, output contract, and review criteria |
| Review guidance could be loaded globally | Load only the active review profile and relevant rubric |
| Style expectations were distributed across general prose rules | Load the voice reference only when voice, samples, or naturalness matter |

The current version saves context by reducing repeated reference text. It does not save context by omitting the actual local facts an author needs.

### 2.3 Topic production sequence

The initial scalable workflow already established the required topic sequence:

```text
outline
  -> content-composition decision
  -> visualization/case analysis
  -> concrete Markdown production
```

The current version keeps this sequence and adds a voice/sample checkpoint before scaling. A long project therefore has this practical order:

```text
brief confirmation
  -> path and outline confirmation
  -> topic protocol
  -> one voice/visual sample
  -> Markdown drafting
  -> risk-scaled review
  -> exercise freeze
  -> student/solution editing
  -> build and release review
```

### 2.4 Sub-agent workflow

| Responsibility | Initial | Current |
|---|---|---|
| Overall directory and learning path | Main Agent | Main Agent |
| Chapter decomposition | Main Agent | Main Agent, with explicit content-composition and visual/case decisions |
| Body writing | Bounded content Sub-agents writing Markdown | Same, with voice contract and compact task packets |
| Exercise generation | Exercise Sub-agents after content freeze | Same, with independent recomputation and code-contract checks |
| Student edition | Student editor without answer fields | Same, with human sample checkpoint and explicit status tracking |
| Solution manual | Separate solution editor | Same, with question immutability and blocker reporting |
| Review | Fresh, read-only review Sub-agents | Same, plus risk-scaled profile and human/Agent finding separation |
| Merge authority | Main Agent | Main Agent only; unchanged and reinforced |
| Failed output | Invalid package, do not merge | `blocked`, resume from last valid Markdown checkpoint, record the failure |
| Shared output files | Avoid concurrent writes | Avoid concurrent writes, plus isolated input/output sets |

The operational principle is unchanged: Sub-agents are bounded contributors, never independent publishers. The current version makes the recovery behavior explicit because the first textbook run showed that malformed or missing structured output must not be mistaken for a finished chapter.

### 2.5 Exercise and answer workflow

Both versions freeze problem statements before generating solutions. The current version adds more explicit separation:

- the student editor receives no solution prose, scoring points, answer-only IDs, or answer-file paths;
- the solution editor cannot modify the problem statement;
- the final check verifies physical absence of answer fields and answer text;
- an answer defect is a blocker to be reported, not silently repaired inside the solution pass.

### 2.6 Review workflow

Initial review flow:

```text
frozen source
  -> evidence review
  -> mathematics/science review
  -> code review
  -> pedagogy review
  -> publication review
  -> fix blockers and recheck
```

Current review flow:

```text
choose risk profile
  -> run only relevant mechanical and domain checks
  -> classify findings as blocker, major, or editorial
  -> fix/recheck blockers
  -> decide or defer majors with consequences
  -> present editorial findings to the human reviewer
  -> complete required human checkpoints
  -> assign agent-reviewed, human-reviewed, or verified status
```

The current flow is simpler for low-risk content and stricter about the one weakness that automated review cannot solve: whether the result sounds and teaches as intended for the user.

## 3. Supervision and Governance

### 3.1 Initial supervision model

The initial version had strong internal supervision:

- explicit role boundaries;
- Markdown intermediate artifacts;
- fresh-context review Sub-agents;
- `pass/revise/block` results;
- precise finding records with location, evidence, fix, and recheck;
- hard blocks for factual, mathematical, code, answer-separation, and publication failures;
- no acceptance of summary-only or malformed Sub-agent output.

Its weakness was not absence of supervision. It was that much of the supervision was Agent-to-Agent or Agent self-review, while user feedback was described as a checkpoint rather than represented as a release state.

### 3.2 Current supervision model

The current version has four supervision layers:

#### Layer 1: Main-Agent governance

The main Agent owns:

- terminal capability;
- dependency graph;
- chapter sequence;
- task decomposition;
- stable IDs;
- merge and conflict resolution;
- release decision.

This prevents distributed authorship from becoming distributed authority.

#### Layer 2: Independent Agent review

Review Sub-agents work in fresh, read-only contexts. They produce evidence-based findings rather than self-declared quality scores. Their output may be `pass`, `revise`, or `block`.

#### Layer 3: Risk-scaled mechanical and domain gates

The current profiles are:

| Profile | Intended use | Required supervision |
|---|---|---|
| `light` | Short, low-risk, non-code content | Objective, prerequisite, factual, example, boundary, and answer checks where relevant |
| `standard` | Chapters, modules, technical guides, textbooks | Evidence, relevant math/science, code, pedagogy, publication, answer isolation, and human checkpoints |
| `high-stakes` | Medical, legal, financial, safety-critical, regulated, or consequential content | Standard checks plus independent domain expert or authoritative human approval |

#### Layer 4: Human editorial authority

The user is the authority for:

- intended voice;
- pacing;
- cultural fit;
- example preference;
- perceived naturalness;
- acceptable level of formality;
- rendering choice when multiple themes are valid.

The Agent may identify a possible issue, but it cannot close a subjective editorial finding by assigning itself a passing score.

### 3.3 Status governance

| Status | Meaning in initial version | Meaning in current version |
|---|---|---|
| `draft` | Content or checks not complete | Content or required checks not complete |
| `agent-reviewed` | Not separately defined | Automated and Agent checks complete; user approval incomplete |
| `human-reviewed` | Not separately defined | Required human checkpoints complete and recorded |
| `verified` | Used only when no blocking issue remains | Risk profile passed, required human review completed, and no blocker remains |

This distinction is important because “the Agent inspected it” and “the intended human reader approved the path and voice” are different claims.

### 3.4 Finding supervision

| Finding type | Initial handling | Current handling |
|---|---|---|
| Factual/math/code/answer/publication error | Block and recheck | Block and recheck |
| Missing bridge or serious inconsistency | Review finding, fix before completion | `major`; fix, narrow scope, or explicitly defer with consequence |
| Voice/pacing/example preference | General pedagogy/style review | `editorial`; present to user and preserve their decision |
| User disagreement with Agent | Not formalized as a state | Record the disagreement; user preference controls voice and teaching feel |
| Unavailable expert/tool | Report limitation | Report limitation; high-stakes content cannot become verified without required human review |

### 3.5 Human checkpoint packet

The current version avoids sending a human a full raw audit dump. Each checkpoint is packaged as:

```text
checkpoint: path | sample | release
artifact: path or short excerpt
decision_needed: one sentence
options: default and alternative when useful
known_risks: short list
questions: no more than five focused questions
```

This is a supervision improvement rather than a writing feature: the reviewer sees the decision they need to make, while the full evidence remains available separately.

## 4. Rendering and Publication Comparison

### 4.1 Initial rendering system

The initial renderer provided:

- local KaTeX math rendering;
- Highlight.js code highlighting;
- inlined local CSS, JavaScript, images, and SVG;
- portable screen and print CSS;
- progressive enhancement;
- separate student and solution HTML;
- Playwright-based PDF generation;
- strict structural validation.

The visual system was a single scholarly/technical presentation. It was portable and coherent, but did not offer scenario-specific themes.

### 4.2 Current rendering system

The current renderer adds:

- `scholarly`: restrained academic presentation;
- `technical`: systems and code-focused presentation;
- `editorial`: case-led narrative presentation;
- `high-contrast`: accessibility and projection-oriented presentation;
- `metadata.theme` in the source of truth;
- `data-theme` in both HTML documents;
- selected theme in `manifest.json`;
- `--theme <name>` build override;
- matching `--theme <name>` verification override;
- strict rejection of unsupported themes;
- print overrides for each theme.

Themes change design tokens and cover treatment, not content hierarchy or document semantics. There is no content fork for each theme.

### 4.3 Rendering limitations that remain

The renderer is more capable, but the current version does not yet provide all of the following:

- automated screenshot comparison across every theme and viewport;
- automatic contrast measurement for every generated visual;
- automatic semantic inspection of custom SVGs;
- a browser-based human feedback form;
- programmatic enforcement that `review.status` matches the actual human checkpoint record;
- automatic detection of prose rhythm or naturalness.

These remain human or project-level checks. The skill documents them as responsibilities rather than pretending the existing scripts can prove them.

## 5. Context and Complexity Comparison

### Initial context behavior

The initial skill was already relatively compact in `SKILL.md`, with detailed references loaded by phase. However, the Sub-agent workflow reference was large and could be copied wholesale into multiple prompts. The review section also described five review passes as the default, which encouraged overloading every task with every rubric.

### Current context behavior

The current version adds a phase map:

| Phase | Minimum context |
|---|---|
| Intake | Intake reference and brief template |
| Research/path | Intake and research references |
| Outline/chapter | Chapter and intake references |
| Voice/sample | Human-style and visual references |
| Sub-agent scale | Orchestration and chapter references |
| Review | Review profile, research reference, active rubric |
| Build/render | Output and visual references |

Sub-agent prompts now receive compact task packets instead of full duplicated reference documents. This is a context-saving change that preserves the facts needed for local decisions.

## 6. What Became Stricter

The current version is stricter in these areas:

- full content generation waits for confirmation of major user decisions;
- human voice/sample and release checkpoints are explicit;
- `verified` cannot be claimed from Agent review alone when human review is required;
- high-stakes content requires an independent human/domain review;
- theme names are validated by the build and verify scripts;
- theme preview and manifest metadata must agree;
- editorial disagreements must be recorded rather than silently overridden;
- answer isolation is treated as a physical input/output boundary.

## 7. What Became More Flexible

The current version is more flexible in these areas:

- short, low-risk content can use the `light` profile;
- irrelevant review passes can be skipped with a recorded reason;
- chapter sections may deviate from the standard arc when the learning problem justifies it;
- human style can be formal, scholarly, practical, or mixed;
- editorial findings do not need to satisfy an artificial numeric score;
- users are not interrupted after every small section;
- theme selection can vary by audience and medium without duplicating content.

## 8. Residual Risks and Next Improvements

The comparison also identifies limits that the current version should not conceal:

1. The renderer validates theme metadata but does not perform pixel-level visual regression. A future `render-matrix` script could capture representative desktop, mobile, and print pages for each theme.
2. The templates expose human-review fields, but the build tool does not yet enforce that a `verified` status has a signed human checkpoint record. A future release manifest could require checkpoint evidence.
3. The skill has positive style guidance but no deterministic naturalness metric. This is appropriate: human style should be reviewed by people, not reduced to a detector score. A future eval suite should compare human ratings of specificity, rhythm, and voice fit.
4. External writing skills were used as research inputs, not runtime dependencies. Their tools, word lists, and genre assumptions are not automatically suitable for textbook prose.
5. The current profile system uses risk rather than document size, but authors still need to state why a topic is `light`, `standard`, or `high-stakes` when the classification is not obvious.

## Final Assessment

The initial version was already strong on textbook structure, prerequisite logic, independent exercises, answer isolation, Sub-agent boundaries, and strict publication validation. Its main weakness was process imbalance: it had more Agent-side correctness machinery than explicit human control over voice, pacing, and release status, and it treated review depth too uniformly.

The current version is a better general-purpose skill because it makes five distinctions explicit:

1. content scale versus risk level;
2. mechanical correctness versus editorial judgment;
3. Agent review versus human review;
4. chapter coverage contract versus prose template;
5. content structure versus rendering theme.

It therefore preserves rigor while reducing unnecessary process and making the user's role visible in the production state. It should be described as `verified` only when the relevant technical gates and required human checkpoints are both complete.
