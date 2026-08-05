# Changelog

## 0.3.1 - 2026-08-04

### Fixed

- `verify.mjs` now accepts the same `--theme` override as `build.mjs`, so theme previews can pass strict validation without mutating the source book metadata.
- Added `VERSION-COMPARISON.md` and `VERSION-COMPARISON.zh-CN.md` with commit-grounded comparisons of the initial and current content, workflow, supervision, and rendering models.

## 0.3.0 - 2026-08-04

### Added

- Risk-scaled `light`, `standard`, and `high-stakes` review profiles.
- Separate `draft`, `agent-reviewed`, `human-reviewed`, and `verified` release statuses.
- Command-line theme preview with `--theme` and strict theme consistency validation.
- Regression evaluations for short-content triage and human checkpoint planning.

### Changed

- Review depth is selected by actual content risk instead of applying every possible pass to every document.
- Human feedback is now a release-state requirement where the selected profile requires it; Agent self-review cannot silently upgrade the package.
- Mechanical blockers and editorial preferences are explicitly separated.

## 0.2.0 - 2026-08-04

### Added

- A selective-context workflow for long-form textbook production.
- A human-style and editorial-feedback contract with voice profiles, representative-sample review, and user-owned style decisions.
- Multi-theme rendering with `scholarly`, `technical`, `editorial`, and `high-contrast` themes.
- A centralized intake decision sheet covering learning path, study time, outline, writing mode, review checkpoints, and rendering preferences.
- An evaluation case for long-content Sub-agent orchestration.

### Changed

- Long content now uses a four-stage topic protocol: outline, content-composition decision, visualization/case analysis, and concrete production.
- Automated checks are explicitly separated from human editorial judgment.
- Review is risk-scaled: blockers are enforced, while style and pacing feedback remains open to the user rather than being converted into an automatic score.
- Human-sounding prose is defined positively through specificity, rhythm, situated examples, calibrated uncertainty, and varied paragraph structure.
- Rendering documentation now describes theme selection, static print fallbacks, and scenario-appropriate visual treatment.

### Research Basis

This iteration reviewed public writing-oriented agent skills and their documented workflows, including research-paper writing, AI-pattern auditing, chapter writing, academic paper composition, and structured humanization guidance. The skill incorporates generalizable practices without copying third-party text or requiring their tools.
