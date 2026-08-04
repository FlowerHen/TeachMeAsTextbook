#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(here, "..");
const arg = (name, fallback = null) => { const i = process.argv.indexOf(name); return i >= 0 ? process.argv[i + 1] : fallback; };
const project = path.resolve(arg("--project", "."));
const allowUnrendered = process.argv.includes("--allow-unrendered");
const supportedThemes = new Set(["scholarly", "technical", "editorial", "high-contrast"]);
const read = p => fs.readFile(p, "utf8");
const esc = s => String(s ?? "").replace(/[&<>\"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
const hash = s => crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);
function validateBook(book) {
  if (!book.metadata?.title) throw Error("metadata.title is required");
  if (!supportedThemes.has(book.metadata.theme ?? "scholarly")) throw Error(`metadata.theme must be one of: ${[...supportedThemes].join(", ")}`);
  if (!Array.isArray(book.chapters) || !book.chapters.length) throw Error("at least one chapter is required");
  const ids = new Set();
  const add = id => { if (!id || ids.has(id)) throw Error(`duplicate or empty id: ${id}`); ids.add(id); };
  for (const ch of book.chapters) {
    add(ch.id);
    for (const o of ch.objectives ?? []) add(o.id);
    for (const ex of ch.exercises ?? []) { add(ex.id); if (!ex.prompt_html || !ex.solution_html) throw Error(`exercise ${ex.id} needs prompt_html and solution_html`); }
  }
}
async function optionalModules() {
  let katex = null, hljs = null;
  try { katex = (await import("katex")).default; } catch { if (!allowUnrendered) throw Error("katex is missing; run npm install or use --allow-unrendered for a draft"); }
  try { hljs = (await import("highlight.js/lib/core")).default; } catch { if (!allowUnrendered) throw Error("highlight.js is missing; run npm install or use --allow-unrendered for a draft"); }
  if (hljs) for (const lang of ["javascript","typescript","python","java","cpp","c","rust","go","sql","bash","json","yaml"]) { try { const mod = await import(`highlight.js/lib/languages/${lang}`); hljs.registerLanguage(lang, mod.default); } catch {} }
  return {katex, hljs};
}
function renderMath(html, katex) {
  return html.replace(/<(span|div)\b([^>]*?)data-tex="([\s\S]*?)"([^>]*)><\/\1>/gi, (all, tag, a, tex, b) => {
    const decoded = tex.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&');
    if (!katex) return `<${tag} class="math-fallback">${esc(decoded)}</${tag}>`;
    try { return katex.renderToString(decoded, {displayMode: tag.toLowerCase() === "div", throwOnError: !allowUnrendered, trust: false}); }
    catch (e) { if (!allowUnrendered) throw Error(`math marker failed (${decoded.slice(0,60)}): ${e.message}`); return `<${tag} class="math-fallback">${esc(decoded)}</${tag}>`; }
  });
}
function renderCode(html, hljs) {
  if (!hljs) return html;
  return html.replace(/<pre><code\s+class="language-([\w-]+)">([\s\S]*?)<\/code><\/pre>/gi, (all, lang, code) => {
    const raw = code.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'");
    try { return `<pre><code class="hljs language-${esc(lang)}">${hljs.highlight(raw, {language: lang}).value}</code></pre>`; } catch { return all; }
  });
}
async function inlineLocalImages(html, root) {
  const re = /<img\b([^>]*?)src="(?!data:|https?:|#)([^"]+)"([^>]*)>/gi;
  let out = "", last = 0, match;
  while ((match = re.exec(html))) {
    out += html.slice(last, match.index);
    try {
      const file = path.resolve(root, match[2]); const data = await fs.readFile(file); const ext = path.extname(file).toLowerCase();
      const mime = ext === ".svg" ? "image/svg+xml" : ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : null;
      if (!mime) throw Error("unsupported image type");
      out += `<img${match[1]}src="data:${mime};base64,${data.toString("base64")}"${match[3]}>`;
    } catch { out += match[0]; }
    last = re.lastIndex;
  }
  return out + html.slice(last);
}
function chapterHtml(ch, includeSolutions) {
  const objectives = (ch.objectives ?? []).map(o => `<li id="${esc(o.id)}">${esc(o.text)}</li>`).join("");
  const sections = (ch.sections ?? []).map(s => `<section id="${esc(s.id)}"><h3>${esc(s.title)}</h3>${s.html ?? ""}${s.visual_html ?? ""}</section>`).join("\n");
  const exercises = (ch.exercises ?? []).map(ex => `<article class="exercise" id="${esc(ex.id)}"><div class="label">Exercise ${esc(ex.id)} · ${esc(ex.type)} · difficulty ${esc(ex.difficulty ?? "")}</div>${ex.prompt_html}${includeSolutions ? `<div class="solution"><div class="label">Solution</div>${ex.solution_html}</div>` : ""}</article>`).join("\n");
  return `<article class="chapter" id="${esc(ch.id)}"><h2>Chapter ${esc(ch.number)}: ${esc(ch.title)}</h2><div class="chapter-contract"><div class="label">Chapter contract</div><p>${esc(ch.summary ?? "")}</p><p><strong>Estimated study time:</strong> ${esc(ch.estimated_minutes ?? "")} minutes</p><p><strong>Prerequisites:</strong> ${esc((ch.prerequisites ?? []).join(", ") || "None stated")}</p><ul>${objectives}</ul></div>${ch.diagnostic_html ? `<aside class="diagnostic"><div class="label">Entry diagnostic</div>${ch.diagnostic_html}</aside>` : ""}${sections}<h3>Exercises</h3>${exercises}</article>`;
}
async function makeHtml(book, includeSolutions, mods) {
  const title = includeSolutions ? `${book.metadata.title} — Solutions Manual` : book.metadata.title;
  const toc = book.chapters.map(ch => `<li><a href="#${esc(ch.id)}">Chapter ${esc(ch.number)}: ${esc(ch.title)}</a></li>`).join("");
  let chapters = book.chapters.map(ch => chapterHtml(ch, includeSolutions)).join("\n");
  chapters = renderCode(renderMath(chapters, mods.katex), mods.hljs);
  chapters = await inlineLocalImages(chapters, project);
  const refs = (book.references ?? []).map(r => `<li id="ref-${esc(r.id)}">${esc(r.citation)}${r.url ? ` — <a href="${esc(r.url)}">${esc(r.url)}</a>` : ""}${r.accessed ? ` (accessed ${esc(r.accessed)})` : ""}</li>`).join("");
  const theme = book.metadata.theme ?? "scholarly";
  const css = await read(path.join(skillRoot,"assets","screen.css")) + "\n" + await read(path.join(skillRoot,"assets","themes.css")) + "\n" + await read(path.join(skillRoot,"assets","print.css"));
  const runtime = await read(path.join(skillRoot,"assets","runtime.js"));
  const pathItems = (book.learning_path ?? []).map(x => `<li>${esc(typeof x === "string" ? x : x.title ?? x.id)}</li>`).join("");
  return `<!doctype html><html lang="${esc(book.metadata.language ?? "en")}" data-theme="${esc(theme)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>${css}</style></head><body><div class="progress" aria-hidden="true"></div><main class="book-shell ${includeSolutions ? "solution-manual" : ""}"><header class="cover"><div class="label">${includeSolutions ? "Solutions manual" : "Textbook"}</div><h1>${esc(title)}</h1><p class="subtitle">${esc(book.metadata.subtitle ?? "")}</p><p class="meta">${esc(book.metadata.author ?? "")} · ${esc(book.metadata.version ?? "")}</p></header><section class="frontmatter"><h2>How to use this book</h2><p>${esc(book.learner?.summary ?? "Independent study")}</p><p><strong>Terminal performance:</strong> ${esc(book.learner?.terminal_performance ?? "")}</p><h3>Linear learning path</h3><ol>${pathItems}</ol></section><nav class="toc" aria-label="Table of contents"><h2>Contents</h2><ol>${toc}</ol></nav>${chapters}<section class="appendix" id="references"><h2>References</h2><ol>${refs || "<li>References pending review.</li>"}</ol></section></main><script>${runtime}</script></body></html>`;
}
try {
  const book = JSON.parse(await read(path.join(project,"book.json"))); validateBook(book); const mods = await optionalModules(); const out = path.join(project,"dist"); await fs.mkdir(out,{recursive:true});
  const student = await makeHtml(book,false,mods); const solutions = await makeHtml(book,true,mods);
  await fs.writeFile(path.join(out,"textbook.html"),student); await fs.writeFile(path.join(out,"solutions.html"),solutions);
  const manifest = {title:book.metadata.title, version:book.metadata.version, status:book.metadata.status, theme:book.metadata.theme ?? "scholarly", input_hash:hash(JSON.stringify(book)), outputs:{textbook_html:hash(student),solutions_html:hash(solutions)}, built_at:new Date().toISOString()};
  await fs.writeFile(path.join(out,"manifest.json"),JSON.stringify(manifest,null,2)+"\n"); console.log(`built ${out}`);
} catch (e) { console.error(`build error: ${e.message}`); process.exit(1); }
