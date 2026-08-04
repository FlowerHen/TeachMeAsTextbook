# Human Style, Voice, and Editorial Feedback

A textbook should sound like a careful human teacher addressing a particular learner, not like a template filling a chapter schema. This reference governs voice calibration and the boundary between automated review and human editorial judgment.

## Voice contract before drafting

For a long project, ask the user to confirm a compact voice profile before full drafting:

```text
register: conversational / formal / scholarly / practical / mixed
stance: instructor / guide / reference / workshop
density: spacious / balanced / dense
reader_address: direct / impersonal / mixed
examples: conceptual / engineering / historical / case-driven
humor_and_personality: none / restrained / present
avoid: [specific phrases, tones, or cultural assumptions]
reference_sample: [user-provided passage or "none"]
```

When no preference is given, use a calm, precise instructor voice: concrete verbs, explicit reasoning, varied paragraph lengths, and restrained transitions. Do not imitate a named living author without permission. A reference sample calibrates rhythm and register; it does not authorize copying its wording or distinctive expressions.

## Positive signs of human teaching prose

Prefer:

- a concrete learner problem before an abstract promise;
- a real subject and verb instead of a narrator announcing what the section will do;
- sentence rhythm that varies with the reasoning;
- occasional short paragraphs when a result or warning deserves space;
- examples that include decisions, hesitation, checks, and failure recovery;
- transitions that state the logical relation, such as cause, contrast, or consequence;
- precise uncertainty: state what is known, assumed, estimated, or not run;
- useful repetition when the learner needs retrieval, with a changed angle or example;
- explicit tradeoffs instead of universal recommendations;
- a closing paragraph that resolves the problem or sets up the next decision.

## Patterns to avoid

Do not force every section into identical rhetorical slots. The chapter contract is a coverage guard, not a sentence template. Avoid:

- generic openings such as “In today's rapidly changing world”;
- empty signposts such as “It is important to note” when the fact can be stated directly;
- repeated “not X, but Y” reveals and compulsory rule-of-three lists;
- inflated claims such as “comprehensive,” “seamless,” or “game-changing” without evidence;
- paragraphs that all have the same length and cadence;
- summaries that repeat headings without changing the reader's understanding;
- fake personal experience, invented classroom reactions, or fabricated practitioner consensus;
- motivational praise, emotional mind-reading, or claims that the learner has understood without evidence;
- adding a specific tool, product, capability, metric, or causal relation that the source did not establish.

Technical precision may require formal or repetitive language. Preserve necessary repetition when it carries a definition, invariant, safety condition, or retrieval cue. The goal is not casualness; it is purposeful, situated prose.

## Drafting loop

Use a three-pass writing loop for substantial sections:

1. **Reasoning pass:** check the concept order, facts, definitions, examples, equations, and boundaries. Do not polish style yet.
2. **Teaching pass:** add the missing bridge, intermediate state, learner decision, counterexample, or check. Vary examples and paragraph rhythm.
3. **Voice pass:** remove narrator filler, inflated language, mechanical headings, and repeated transition patterns. Preserve technical terms and the author's intended level of formality.

For a short section, combine the passes. Do not perform a full rewrite when only a local sentence needs adjustment.

## Human review is authoritative for voice

Automated checks can detect structure, placeholders, answer leakage, missing headings, repeated phrases, and some unsupported claims. They cannot decide whether a chapter feels like the intended teacher, whether a metaphor is culturally natural, or whether the pacing is right for this learner.

Record editorial feedback separately from mechanical findings:

```text
kind: editorial | factual | mathematical | pedagogical | publication
status: open | accepted | rejected | deferred
source: learner | author | editor | automated-check
location: chapter/section/paragraph
feedback: precise observation in the reviewer's words
decision: requested change or reason to keep the passage
owner: main-agent | author | user
```

For voice, pacing, examples, and cultural fit, the user's explicit feedback outranks the Agent's preference. If feedback is ambiguous, ask one focused question or present two short alternatives. Do not silently “improve” a passage after the user has approved its voice.

## Review checkpoints

Do not interrupt the user after every section. Use four checkpoints for long content:

1. **Brief checkpoint:** confirm learner, outcome, study time, scope, language, depth, and constraints.
2. **Path checkpoint:** confirm the dependency graph, chapter sequence, chapter durations, and outline.
3. **Voice/sample checkpoint:** show one representative section and one visual/interaction sample before scaling to all chapters.
4. **Release checkpoint:** show the review report, unresolved risks, representative renderings, and the exact student/solution separation result.

A user may request extra checkpoints. The Agent may continue between checkpoints when decisions are already clear and the user has approved the relevant artifact.

## Humanization is not anti-precision

Do not weaken definitions, remove necessary caveats, replace domain terms with vague synonyms, or turn a scholarly explanation into chatty prose merely to avoid an AI-like style. A human textbook can be formal. Improve specificity, continuity, and reader orientation first; change surface tone only when the voice contract calls for it.
