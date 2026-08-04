# Textbook Creator

A reusable skill for producing rigorous, self-contained university-style textbooks from source material in science, mathematics, and advanced programming.

## What It Does

- Defines terminal capabilities, prerequisites, and a linear learning path.
- Builds a competency graph, evidence map, objective matrix, and source register.
- Produces chapter-length explanations with intuition, formal definitions, derivations, worked examples, code, exercises, visualizations, and failure analysis.
- Scales long content through Markdown-first Sub-agent workflows with explicit role boundaries and independent review gates.
- Generates student and solution editions from frozen exercise records while keeping answer content physically out of the student edition.
- Builds portable HTML and PDF outputs and runs strict structural and publication checks.

## Structure

```text
SKILL.md
references/
  chapter-authoring.md
  intake-and-planning.md
  output-contract.md
  research-and-review.md
  subagent-orchestration.md
  visual-and-interaction.md
scripts/
templates/
evals/
assets/
```

Read `SKILL.md` first. Load reference documents only when the workflow reaches the corresponding phase. For long-form books, always read `references/subagent-orchestration.md` before dispatching authors, exercise writers, editors, or reviewers.

## Requirements

- Node.js 18 or newer
- Microsoft Edge, Google Chrome, or Chromium for PDF export
- The dependencies declared in `package.json` for local math rendering, syntax highlighting, and Playwright Core

## Core Build Commands

Run these commands from a textbook project that follows the output contract:

```bash
npm install
node scripts/build.mjs --project path/to/book-project
node scripts/print-pdf.mjs --project path/to/book-project
node scripts/verify.mjs --project path/to/book-project --strict
```

Code examples and experiments must be marked `not executed` when the declared environment cannot run them. A generated document is not `verified` until blocking evidence, mathematics, code, pedagogy, and publication findings are closed.

## Sub-agent Policy

The main Agent owns the learning graph, decomposition, merge, conflict resolution, stable IDs, and final release gate. Content Sub-agents write bounded Markdown drafts. Exercise Sub-agents generate and independently verify problems. Student and solution editors receive isolated inputs. Review Sub-agents return `pass`, `revise`, or `block` with evidence and a recheck method.
