#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = file => fs.readFile(path.join(root, file), "utf8");
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

try {
  const skill = await read("SKILL.md");
  const lines = skill.split(/\r?\n/).length;
  check(lines <= 500, `SKILL.md is ${lines} lines; keep the body under 500 lines`);
  check(skill.startsWith("---\n") || skill.startsWith("---\r\n"), "SKILL.md is missing YAML frontmatter");
  const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  check(Boolean(frontmatter), "SKILL.md frontmatter is not closed");
  const name = frontmatter?.[1].match(/^name:\s*(\S+)\s*$/m)?.[1];
  const description = frontmatter?.[1].match(/^description:\s*(.+)$/m)?.[1];
  check(Boolean(name) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name), "frontmatter name must be a lowercase hyphenated identifier");
  check(Boolean(description) && description.length >= 40 && description.length <= 1000, "frontmatter description must be concise and descriptive");

  const references = [...skill.matchAll(/`((?:references|templates)\/[^`]+)`/g)].map(match => match[1]);
  for (const relative of new Set(references)) {
    try { await fs.access(path.join(root, relative)); }
    catch { errors.push(`referenced resource does not exist: ${relative}`); }
  }

  const book = JSON.parse(await read("templates/book.json"));
  const brief = JSON.parse(await read("templates/brief.json"));
  const evals = JSON.parse(await read("evals/evals.json"));
  check(Boolean(book.metadata?.theme), "book template must define metadata.theme");
  check(Boolean(brief.quality?.review_profile), "brief template must define quality.review_profile");
  check(Array.isArray(evals.evals) && evals.evals.length >= 4, "evals.json must contain at least four evals");
  const ids = (evals.evals ?? []).map(item => item.id);
  check(new Set(ids).size === ids.length, "eval IDs must be unique");

  const primaryDocs = ["SKILL.md", "README.md", "CHANGELOG.md"];
  for (const file of primaryDocs) {
    const text = await read(file);
    check(!/OneDrive|[A-Z]:\\|[A-Z]:\//i.test(text), `${file} contains a machine-specific path`);
  }

  if (errors.length) {
    console.error("skill check failed");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`skill check passed: ${name}, ${lines} SKILL.md lines, ${evals.evals.length} evals`);
} catch (error) {
  console.error(`skill check error: ${error.message}`);
  process.exit(1);
}
