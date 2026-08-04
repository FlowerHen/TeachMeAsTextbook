# Output and Build Contract

## Project layout

```text
book-project/
├── book.json
├── chapters/              # referenced by book.json, or embedded chapter objects
├── assets/                # local images/SVG/fonts only
├── reports/
└── dist/
```

`book.json` is the source of truth for metadata, chapters, sections, exercises, solutions, references, review status, and rendering theme. Use `templates/book.json` as the minimum shape. Stable IDs must remain unchanged across revisions. Supported themes are `scholarly`, `technical`, `editorial`, and `high-contrast`; choose one based on audience, content, and medium rather than treating themes as decoration.

## Build contract

`node scripts/build.mjs --project <dir>` must:

- validate required metadata and unique IDs;
- render math markers with local KaTeX when installed;
- highlight only declared code languages;
- inline local CSS, JS, images, and SVG for a portable HTML;
- generate student and answer DOMs from the same exercise records;
- omit `solution_html`, `answer_html`, and solution-only IDs from student output;
- write a manifest with input/tool hashes, selected theme, and no absolute local paths.

Use `--allow-unrendered` only for drafts. A verified build fails on unresolved math, missing local assets, remote URLs, placeholder text, or malformed exercise records.

## PDF contract

`node scripts/print-pdf.mjs --project <dir>` uses Playwright Core with a locally installed Edge/Chrome/Chromium. It waits for `document.fonts.ready`, image decoding, and `window.__TEXTBOOK_READY__`. It prints with CSS page size, backgrounds, no browser headers/footers, and separate output names.

## Validation contract

`node scripts/verify.mjs --project <dir> --strict` checks both HTMLs and PDFs, answer separation, heading structure, links, unresolved markers, remote resources, local path leakage, required IDs, and basic paper metadata. Visual review still requires opening the HTML and inspecting representative desktop, narrow, and PDF pages for the selected theme. Check that the theme changes visual treatment without changing content hierarchy, contrast, answer separation, or print readability.

## Failure reporting

Never silently downgrade. The final report must say which dependencies were missing, which outputs were produced, which gates passed or failed, and whether the result is `verified`, `draft`, or `not verified`.
