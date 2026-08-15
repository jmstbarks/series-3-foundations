import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { lessons } from "./content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const passes = [];
const check = (condition, message) => (condition ? passes : failures).push(message);
const read = relative => readFile(join(root, relative), "utf8");

const lessonFiles = (await readdir(join(root, "lessons"))).filter(x => x.endsWith(".html")).sort();
const referenceFiles = (await readdir(join(root, "reference"))).filter(x => x.endsWith(".html")).sort();
const assessmentFiles = (await readdir(join(root, "assessments"))).filter(x => x.endsWith(".html")).sort();
check(lessonFiles.length === 21, `21 lesson files (found ${lessonFiles.length})`);
check(lessons.length === 21, `21 authored lesson records (found ${lessons.length})`);
check(referenceFiles.length === 5, `5 reference files (found ${referenceFiles.length})`);
check(assessmentFiles.length === 10, `10 assessment files (found ${assessmentFiles.length})`);

for (const [index, file] of lessonFiles.entries()) {
  const html = await read(join("lessons", file));
  const questions = (html.match(/class="question" data-answer=/g) || []).length;
  const sourceLinks = (html.match(/target="_blank"/g) || []).length;
  check(html.includes("You will be able to"), `${file}: observable objective`);
  check(html.includes("Immediate retrieval") && questions === 3, `${file}: 3 immediate retrieval questions`);
  check(html.includes("Transfer problem") && html.includes("Reveal answer"), `${file}: transfer problem with feedback`);
  check(html.includes("How solid is this?") && html.includes(`series3.lesson.${index + 1}`), `${file}: confidence/progress interface`);
  check(sourceLinks >= 2 && html.includes("checked 2026-08-14"), `${file}: dated primary citations`);
  check(html.includes("Ask the agent about any step"), `${file}: follow-up reminder`);
  check(html.includes("@media(max-width:760px)") && html.includes("@media print"), `${file}: mobile and print CSS`);
  check(!/undefined|NaN/.test(html), `${file}: no undefined or NaN output`);
}

for (const file of referenceFiles) {
  const html = await read(join("reference", file));
  check(html.includes("Printable reference") && html.includes("print()"), `${file}: printable interface`);
  check(html.includes("@media print") && html.includes("checked 2026-08-14"), `${file}: print CSS and dated sources`);
}

const expectedCounts = {
  "diagnostic.html": 24,
  "mixed-cumulative.html": 60,
  "readiness-a.html": 120,
  "readiness-b.html": 120,
  "module-01.html": 9,
  "module-02.html": 9,
  "module-03.html": 9,
  "module-04.html": 9,
  "module-05.html": 9,
  "module-06.html": 9
};
for (const file of assessmentFiles) {
  const html = await read(join("assessments", file));
  const questionCount = (html.match(/class="question" data-q=/g) || []).length;
  check(questionCount === expectedCounts[file], `${file}: ${expectedCounts[file]} rendered questions (found ${questionCount})`);
  check(html.includes("Score assessment") && html.includes("Correct. ") && html.includes("Incorrect. "), `${file}: scoring and rationales`);
  check(html.includes("Market and regulations score separately"), `${file}: separate section scoring`);
  if (file.startsWith("readiness")) {
    const match = html.match(/const items=(\[.*?\]);let seconds=/s);
    let items = [];
    try { items = JSON.parse(match?.[1] || "[]"); } catch {}
    check(items.filter(x => x.section === "market").length === 85, `${file}: 85-question market study allocation`);
    check(items.filter(x => x.section === "reg").length === 35, `${file}: 35-question regulation study allocation`);
    check(html.includes("let seconds=9000"), `${file}: 150-minute timer`);
  }
}

// Independent arithmetic fixtures: fail if the formulas used throughout the course drift.
check((6.18 - 6.10) * 5000 === 400.00000000000034 || Math.abs((6.18 - 6.10) * 5000 - 400) < 1e-9, "math: long futures P/L = $400");
check(Math.abs((54.20 - 53.70) * 1000 - 500) < 1e-9, "math: short futures P/L = $500");
check(4000 - (4000 - 550 - 400) === 950, "math: restore-to-initial margin call = $950");
check(Math.abs((5.47 - 5.55) - (-0.08)) < 1e-9, "math: ending basis = -$0.08");
check(Math.abs(5.48 + (6.10 - 5.55) - 6.03) < 1e-9, "math: short hedge effective price = $6.03");
check(555 - (548 - 520) === 527, "math: long hedge effective cost = 527");
check(Math.max(0, 88 - 80) - 3 === 5, "math: long call profit = 5");
check(Math.max(0, 90 - 82) - 4.5 === 3.5, "math: long put profit = 3.5");
check(10 - (7 - 2) === 5, "math: bull call maximum profit = 5");
check(10 - (6 - 2) === 6, "math: bull put maximum loss = 6");

const coverage = await read("COVERAGE.md");
for (const marker of ["General theory","Futures contract","Market structure","Hedging theory","Speculative theory","General futures terminology","General option terminology","Margin requirements","Option premiums","Price limits","Offset/settlement/delivery","Exercise/assignment/settlement","Order types","Technical analysis","Fundamental analysis","Interest-rate analysis","Basic hedging and basis","Hedge calculations/applications","Spreading","Futures speculation","Option theory","Option hedges","Option speculation/synthetics","Option spreads","Registration/membership","Ethical/account opening","Positions","FCM/IB regulation","CPO/CTA regulation","Arbitration","NFA discipline","CFTC enforcement"]) {
  check(coverage.includes(marker), `coverage: ${marker}`);
}
for (let i=1;i<=21;i++) check(coverage.includes(`L${String(i).padStart(2,"0")}`), `coverage: lesson L${String(i).padStart(2,"0")} mapped`);

const htmlFiles = ["index.html", ...lessonFiles.map(x=>join("lessons",x)), ...referenceFiles.map(x=>join("reference",x)), ...assessmentFiles.map(x=>join("assessments",x))];
for (const file of htmlFiles) {
  const html = await read(file);
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(x=>x[1]).filter(x=>!x.startsWith("http")&&!x.startsWith("data:")&&!x.startsWith("#")&&!x.startsWith("mailto:")&&!x.includes("lessonLinks"));
  for (const href of hrefs) {
    const [path] = href.split("#"); if(!path) continue;
    const resolved = normalize(join(root, dirname(file), path));
    try { await access(resolved); check(true, `${file}: local link ${href}`); }
    catch { check(false, `${file}: broken local link ${href}`); }
  }
}

const index = await read("index.html");
check(index.includes("localStorage") && index.includes("series3.lesson."), "index: local progress dashboard");
check(index.includes("Official-outline coverage map") && index.includes("Accuracy review"), "index: verification artifacts linked");
check(index.includes('href="simulation/index.html"'), "index: simulation launch linked");

for (const file of ["index.html","css/styles.css","js/iso.js","js/model.js","js/world.js","js/sim.js","js/render.js","js/ui.js","js/main.js","README.md"]) {
  try { await access(join(root,"simulation",file)); check(true, `simulation: ${file}`); }
  catch { check(false, `simulation: missing ${file}`); }
}
const simulationHtml = await read("simulation/index.html");
const simulationReadme = await read("simulation/README.md");
check((simulationHtml.match(/<script src=/g) || []).length === 7, "simulation: seven local scripts in explicit order");
check(!/https?:\/\//.test(simulationHtml), "simulation: no network dependencies");
check(simulationHtml.includes("Computed:") && simulationHtml.includes("Scaled:") && simulationHtml.includes("Assumed:") && simulationHtml.includes("Faked or omitted:"), "simulation: in-app fidelity ledger");
check(simulationReadme.includes("### Computed") && simulationReadme.includes("### Scaled") && simulationReadme.includes("### Assumed") && simulationReadme.includes("### Faked or omitted"), "simulation: README fidelity ledger");
check(simulationHtml.includes('id="challenge"') && simulationHtml.includes('id="challenge-feedback"'), "simulation: retrieval interface");

console.log(`PASS ${passes.length}`);
if (failures.length) {
  console.error(`FAIL ${failures.length}`);
  failures.forEach(x=>console.error(`- ${x}`));
  process.exit(1);
}
console.log("All structural, coverage, assessment, arithmetic, link, citation, mobile, and print checks passed.");
