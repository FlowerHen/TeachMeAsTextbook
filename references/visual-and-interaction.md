# Visual and Interactive Teaching Layer

## Choose visuals by teaching job

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

Check labels, contrast, font loading, long labels, mobile width, print size, caption linkage, and whether the visual actually supports the stated objective. For plots, include axes, units, legend, sample/data provenance, and uncertainty where relevant. For code and algorithms, use consistent colors and a text equivalent.

## Accessibility

Set document language and title; preserve heading order; label inputs; provide visible focus; support keyboard activation; give diagrams alt text and captions; ensure formulas have a readable fallback; avoid color-only distinctions; keep body text and code legible in both screen and print modes.
