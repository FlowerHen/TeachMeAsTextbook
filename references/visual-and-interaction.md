# Visual and Interactive Teaching Layer

## Choose visuals by teaching job

Choose the visual treatment after the audience, content density, and reading medium are known. The renderer supports four portable themes: `scholarly` for a restrained academic book, `technical` for code and systems-heavy material, `editorial` for case-led narrative teaching, and `high-contrast` for accessibility-first or projection-heavy use. Themes change tokens and cover treatment, not the information hierarchy.

- flow/state machine for process and control;
- dependency graph for prerequisites;
- timeline for history or staged systems;
- comparison matrix for tradeoffs;
- geometry/plot for quantitative relationships;
- algorithm trace for state transitions;
- layered diagram for abstraction boundaries;
- table for exact comparison, with prose explaining the pattern.

Every figure has an ID, title, caption, alt text, source or “author-generated,” and a sentence in the chapter explaining what to notice. Do not use decorative diagrams that introduce labels never used in the prose.

## Offline-first components

Allowed defaults are semantic HTML, inline SVG, `<details>`, local JavaScript, local fonts/assets, copy-code buttons, glossary links, self-check prompts, and keyboard-accessible tabs. Do not use CDN scripts, remote images, analytics, or network calls in a portable build.

Interactive diagrams must degrade to a static SVG/PNG or a textual explanation. A print view must hide controls and show the pedagogically relevant state. A screen view must not be the only place where a definition or result exists.

## Visual review

Check labels, contrast, font loading, long labels, mobile width, print size, caption linkage, and whether the visual actually supports the stated objective. Repeat the check for the selected theme and at least one narrow viewport. Verify that theme contrast survives print and that no semantic distinction depends only on color. For plots, include axes, units, legend, sample/data provenance, and uncertainty where relevant. For code and algorithms, use consistent colors and a text equivalent.

## Theme selection and fallback

Show one representative page in the selected theme at the sample checkpoint. Keep a stable neutral fallback for environments that cannot load theme CSS. Do not create a separate content fork for each theme. Print CSS must retain the pedagogically relevant colors or replace them with borders, labels, and patterns.

## Accessibility

Set document language and title; preserve heading order; label inputs; provide visible focus; support keyboard activation; give diagrams alt text and captions; ensure formulas have a readable fallback; avoid color-only distinctions; keep body text and code legible in both screen and print modes.
