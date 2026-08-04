#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import {execFileSync} from "node:child_process";
const arg = n => { const i=process.argv.indexOf(n); return i>=0?process.argv[i+1]:null; };
const project = path.resolve(arg("--project","."));
function exists(p){try{execFileSync(process.platform==="win32"?"cmd":"test",process.platform==="win32"?["/c","if","exist",p,"exit","0"]:["-x",p]);return true}catch{return false}}
function browser(){ if(process.env.CHROME_PATH)return process.env.CHROME_PATH; const c=process.platform==="win32"?["C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe","C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe","C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"]:["/usr/bin/google-chrome","/usr/bin/chromium","/usr/bin/chromium-browser"]; return c.find(exists); }
try { const {chromium}=await import("playwright-core"); const executablePath=browser(); if(!executablePath) throw Error("No Chrome/Edge/Chromium found. Set CHROME_PATH."); const b=await chromium.launch({headless:true,executablePath}); const p=await b.newPage({viewport:{width:1280,height:1600},deviceScaleFactor:1}); const dist=path.join(project,"dist");
  for(const name of ["textbook","solutions"]){const file=path.join(dist,`${name}.html`); await p.goto(`file:///${file.replace(/\\/g,"/")}`,{waitUntil:"load"}); await p.evaluate(async()=>{if(document.fonts)await document.fonts.ready;await Promise.all(Array.from(document.images).map(i=>i.decode?.().catch(()=>{})));}); await p.waitForFunction(()=>window.__TEXTBOOK_READY__===true,{timeout:10000}); await p.pdf({path:path.join(dist,`${name}.pdf`),printBackground:true,preferCSSPageSize:true,displayHeaderFooter:false}); }
  await b.close(); console.log("PDFs written");
} catch(e){ console.error(`print error: ${e.message}`); process.exit(1); }
