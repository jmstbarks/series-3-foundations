import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { checked, lessons, moduleNames, sources } from "./content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = async (relative, contents) => {
  const target = join(root, relative);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents);
};

const esc = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const css = String.raw`
:root{--ink:#17211b;--paper:#f7f1e5;--card:#fffdf8;--forest:#194d3a;--mint:#cce3d5;--gold:#e8ae49;--rust:#b54f32;--muted:#5f6c64;--line:#d9d1c3;--shadow:0 16px 40px rgba(38,48,40,.11);color-scheme:light}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font:17px/1.6 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
body:before{content:"";position:fixed;inset:0 0 auto;height:7px;background:linear-gradient(90deg,var(--forest),var(--gold),var(--rust));z-index:20}
a{color:var(--forest);text-underline-offset:3px}button,a.button{font:inherit}button{cursor:pointer}.shell{width:min(1080px,calc(100% - 32px));margin:auto}.lesson-shell{width:min(820px,calc(100% - 32px));margin:auto}
header.site{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:30px 0 18px}.brand{font-weight:900;letter-spacing:.04em;text-decoration:none;color:var(--ink)}.brand span{color:var(--rust)}nav{display:flex;gap:14px;flex-wrap:wrap}nav a{text-decoration:none;font-size:.9rem;font-weight:750}
.hero{padding:62px 0 42px;display:grid;grid-template-columns:1.3fr .7fr;gap:40px;align-items:end}.kicker,.eyebrow{text-transform:uppercase;letter-spacing:.15em;font-weight:850;font-size:.75rem;color:var(--rust)}h1,h2,h3{font-family:Georgia,"Times New Roman",serif;line-height:1.08}h1{font-size:clamp(2.7rem,7vw,5.4rem);letter-spacing:-.04em;margin:.18em 0}h2{font-size:clamp(1.7rem,4vw,2.5rem);margin:1.6em 0 .6em}h3{font-size:1.35rem}.lede{font-size:1.2rem;color:var(--muted);max-width:62ch}.hero-note,.notice{border-left:5px solid var(--gold);padding:18px 20px;background:#fff7dd;border-radius:0 14px 14px 0}.notice.danger{border-color:var(--rust);background:#fff0ea}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:22px;box-shadow:var(--shadow)}.card h3{margin:.2em 0}.card p{color:var(--muted)}.module{margin:52px 0}.module-head{display:flex;justify-content:space-between;align-items:end;border-bottom:2px solid var(--ink);margin-bottom:18px}.module-head h2{margin:0 0 8px}.lesson-card{position:relative;padding-bottom:56px}.lesson-card .number{font:800 .8rem/1 ui-monospace,monospace;color:var(--rust)}.lesson-card .state{position:absolute;bottom:18px;left:22px;font-size:.82rem;font-weight:800;color:var(--muted)}
.button,button.primary{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:999px;background:var(--forest);color:white;text-decoration:none;padding:11px 18px;font-weight:800}.button.secondary,button.secondary{background:transparent;color:var(--forest);border:2px solid var(--forest)}
.progress-wrap{height:8px;background:var(--line);border-radius:99px;overflow:hidden}.progress-bar{height:100%;width:0;background:var(--gold);transition:width .25s}.lesson-title{padding:48px 0 26px}.lesson-title h1{font-size:clamp(2.5rem,7vw,4.8rem)}.objective{background:var(--forest);color:#fff;border-radius:18px;padding:22px 26px;box-shadow:var(--shadow)}.objective strong{color:#ffda91}.hook{font:italic 1.35rem/1.5 Georgia,serif;border-left:5px solid var(--rust);padding-left:20px;margin:34px 0}
.visual{background:#e8eee7;border:1px solid #c3d2c7;border-radius:22px;padding:28px;margin:30px 0;overflow:auto}.flow,.equation,.compare,.grid4,.ticket,.meter,.curve,.decision{display:flex;align-items:center;justify-content:center;gap:12px;min-width:560px;text-align:center}.flow span,.equation span,.ticket span,.meter span,.curve span,.decision span,.grid4 span,.compare div{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;flex:1}.flow b,.equation b{color:var(--rust);font-size:.8rem}.compare div{display:grid;gap:4px}.compare small,.ticket small{color:var(--muted)}.ticket,.meter,.decision{display:grid;grid-template-columns:repeat(2,1fr)}.ticket b,.decision b{grid-column:1/-1;font-family:ui-monospace,monospace}.curve i{color:var(--rust);font-weight:800}.curve em{font-size:.75rem}.grid4{display:grid;grid-template-columns:repeat(2,1fr)}
.example{background:#1d2d25;color:#f6f0e4;border-radius:22px;padding:26px;margin:28px 0}.example h2{margin:0 0 16px}.example ol{margin-bottom:0}.quiz{margin:50px 0}.question{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:22px;margin:18px 0}.question fieldset{border:0;padding:0;margin:0}.question legend{font-weight:850;margin-bottom:12px}.choice{display:block;border:1px solid var(--line);border-radius:10px;margin:9px 0;padding:10px 12px}.choice:hover{background:#f1ecdf}.feedback{display:none;margin-top:12px;padding:12px;border-radius:10px}.feedback.good{display:block;background:#dff1e4;color:#194d3a}.feedback.bad{display:block;background:#f8dfd6;color:#7a2f1d}.transfer{border:2px dashed var(--gold);border-radius:18px;padding:22px}.reveal{display:none;background:#fff7dd;padding:14px;border-radius:10px;margin-top:12px}.reveal.open{display:block}.confidence{margin:38px 0;background:#ece5d9;border-radius:18px;padding:22px}.confidence-buttons{display:flex;gap:10px;flex-wrap:wrap}.confidence button{border:1px solid var(--forest);color:var(--forest);background:transparent;border-radius:999px;padding:9px 14px}.confidence button.selected{background:var(--forest);color:white}.sources{font-size:.9rem;color:var(--muted);border-top:1px solid var(--line);margin-top:48px;padding-top:20px}.pager{display:flex;justify-content:space-between;gap:12px;margin:38px 0 70px}
.reference table{width:100%;border-collapse:collapse;background:var(--card)}th,td{text-align:left;vertical-align:top;border-bottom:1px solid var(--line);padding:12px}th{background:#e8eee7}.reference .term-grid{columns:2;column-gap:22px}.term{break-inside:avoid;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px;margin:0 0 12px}.term b{display:block;color:var(--forest)}.formula{display:grid;grid-template-columns:1fr auto;gap:18px;border-bottom:1px solid var(--line);padding:14px 0}.formula code{font-size:1rem;background:#ece5d9;border-radius:8px;padding:5px 8px}.tag{display:inline-block;font-size:.72rem;font-weight:850;text-transform:uppercase;letter-spacing:.08em;background:var(--mint);padding:3px 8px;border-radius:999px}.scorebox{position:sticky;top:12px;z-index:5;background:var(--ink);color:white;border-radius:16px;padding:14px 18px;display:flex;justify-content:space-between;gap:12px;align-items:center}.timer{font:800 1.15rem/1 ui-monospace,monospace}.assessment .question.unanswered{border-color:var(--rust)}.results{display:none;background:#e8eee7;border-radius:18px;padding:22px;margin:22px 0}.results.show{display:block}.disclaimer{font-size:.85rem;color:var(--muted)}footer{border-top:1px solid var(--line);padding:28px 0 48px;color:var(--muted);font-size:.85rem}
@media(max-width:760px){.hero{grid-template-columns:1fr;padding-top:34px}.grid{grid-template-columns:1fr}.reference .term-grid{columns:1}.module-head{display:block}.lesson-title{padding-top:22px}.visual{margin-inline:-8px}.scorebox{align-items:flex-start;flex-direction:column}.formula{grid-template-columns:1fr}.pager{flex-direction:column}.pager a{text-align:center}}
@media print{body{background:#fff;font-size:10.5pt}body:before,header.site,footer,.no-print,.pager,.scorebox{display:none!important}.shell,.lesson-shell{width:100%}.card,.term,.visual,.example,table{box-shadow:none;break-inside:avoid}.reference .term-grid{columns:2}a{color:inherit;text-decoration:none}a[href^="http"]:after{content:""}.reference h1{font-size:28pt}.reference h2{font-size:18pt}}
`;

const head = (title, description = "Series 3 foundational learning workspace") => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${esc(description)}"><title>${esc(title)} · Series 3 Foundations</title><style>${css}</style></head>`;

const siteHeader = (prefix = "") => `<header class="site shell"><a class="brand" href="${prefix}index.html">SERIES <span>3</span> FOUNDATIONS</a><nav aria-label="Primary"><a href="${prefix}simulation/index.html">Simulation</a><a href="${prefix}index.html#lessons">Lessons</a><a href="${prefix}index.html#references">References</a><a href="${prefix}index.html#assessments">Assessments</a></nav></header>`;
const footer = (prefix = "") => `<footer><div class="shell">Educational material only—not trading, legal, or compliance advice. Sources checked ${checked}. <a href="${prefix}RESOURCES.md">Source ledger</a>.</div></footer>`;

const lessonFile = (index, lesson) => `lessons/${String(index + 1).padStart(4, "0")}-${lesson.slug}.html`;

function lessonHtml(lesson, index) {
  const prev = index > 0 ? lessonFile(index - 1, lessons[index - 1]).split("/").pop() : "../index.html";
  const moduleEnd = index === lessons.length - 1 || lessons[index + 1].module !== lesson.module;
  const next = moduleEnd ? `../assessments/module-${String(lesson.module).padStart(2,"0")}.html` : lessonFile(index + 1, lessons[index + 1]).split("/").pop();
  const nextLabel = moduleEnd ? "Take checkpoint →" : "Next →";
  const key = `series3.lesson.${index + 1}`;
  const quiz = lesson.questions.map((item, qi) => `<div class="question" data-answer="${item.answer}"><fieldset><legend>${qi + 1}. ${item.prompt}</legend>${item.choices.map((choice, ci) => `<label class="choice"><input type="radio" name="q${qi}" value="${ci}"> ${choice}</label>`).join("")}</fieldset><button class="primary check" type="button">Check answer</button><div class="feedback" role="status">${item.explain}</div></div>`).join("");
  const sourceList = lesson.sources.map(id => `<li><a href="${sources[id].url}" target="_blank" rel="noreferrer">${sources[id].name}</a> <small>(checked ${checked})</small></li>`).join("");
  return `${head(`${String(index + 1).padStart(2, "0")} ${lesson.title}`, lesson.objective)}<body>${siteHeader("../")}<main class="lesson-shell">
  <div class="lesson-title"><div class="eyebrow">Module ${lesson.module} · ${moduleNames[lesson.module]} · Lesson ${index + 1} of ${lessons.length}</div><h1>${lesson.title}</h1><div class="progress-wrap" aria-label="Course progress"><div class="progress-bar" style="width:${((index + 1) / lessons.length * 100).toFixed(1)}%"></div></div></div>
  <section class="objective"><strong>You will be able to</strong><br>${lesson.objective}</section>
  <p class="hook">${lesson.hook}</p><div class="visual" aria-label="Concept model">${lesson.model}</div>
  <section><h2>The idea</h2>${lesson.concept.map(p => `<p>${p}</p>`).join("")}</section>
  <section class="example"><h2>${lesson.example.title}</h2><ol>${lesson.example.steps.map(step => `<li>${step}</li>`).join("")}</ol></section>
  <section class="quiz"><div class="eyebrow">Immediate retrieval</div><h2>Check the model</h2>${quiz}</section>
  <section class="transfer"><div class="eyebrow">Transfer problem</div><h2>Use it somewhere new</h2><p>${lesson.transfer.prompt}</p><button class="secondary reveal-button" type="button">Reveal answer</button><div class="reveal">${lesson.transfer.answer}</div></section>
  <section class="confidence"><h2>How solid is this?</h2><p>Choose honestly. Confidence plus quiz performance helps decide whether to continue or revisit.</p><div class="confidence-buttons"><button data-confidence="1">1 · Foggy</button><button data-confidence="2">2 · Partial</button><button data-confidence="3">3 · Usable</button><button data-confidence="4">4 · Can explain</button></div><p class="saved" role="status"></p></section>
  <section class="sources"><strong>Primary sources</strong><ul>${sourceList}</ul><p>Ask the agent about any step that is unclear. Completion is not proof of mastery; apply the idea correctly before creating a learning record.</p></section>
  <div class="pager"><a class="button secondary" href="${prev}">← Previous</a><a class="button" href="${next}">${nextLabel}</a></div></main>${footer("../")}
  <script>
  const lessonKey=${JSON.stringify(key)};let correct=0;const total=${lesson.questions.length};
  document.querySelectorAll('.check').forEach(btn=>btn.addEventListener('click',()=>{const box=btn.closest('.question');const picked=box.querySelector('input:checked');const feedback=box.querySelector('.feedback');if(!picked){feedback.textContent='Choose an answer first.';feedback.className='feedback bad';return}const good=Number(picked.value)===Number(box.dataset.answer);feedback.className='feedback '+(good?'good':'bad');feedback.innerHTML=(good?'Correct. ':'Not quite. ')+${JSON.stringify(lesson.questions.map(x=>x.explain))}[Array.from(document.querySelectorAll('.question')).indexOf(box)];box.dataset.correct=good?'1':'0';correct=document.querySelectorAll('.question[data-correct="1"]').length;}));
  document.querySelector('.reveal-button').addEventListener('click',e=>{document.querySelector('.reveal').classList.toggle('open');e.currentTarget.textContent=document.querySelector('.reveal').classList.contains('open')?'Hide answer':'Reveal answer'});
  document.querySelectorAll('[data-confidence]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-confidence]').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');const data={confidence:Number(btn.dataset.confidence),correct,total,updated:new Date().toISOString()};localStorage.setItem(lessonKey,JSON.stringify(data));const advice=(data.confidence<3||correct<total)?' Revisit this lesson in the next review block before advancing.':' Continue, then retrieve this idea again in 2–3 days.';document.querySelector('.saved').textContent='Saved locally: '+correct+'/'+total+' retrieval questions correct, confidence '+data.confidence+'/4.'+advice;}));
  const prior=JSON.parse(localStorage.getItem(lessonKey)||'null');if(prior){const b=document.querySelector('[data-confidence="'+prior.confidence+'"]');if(b)b.classList.add('selected');document.querySelector('.saved').textContent='Prior local result: '+prior.correct+'/'+prior.total+' correct, confidence '+prior.confidence+'/4.';}
  </script></body></html>`;
}

const glossary = [
  ["AP (Associated Person)", "An individual who solicits orders, customers, or funds—or supervises those activities—on behalf of a registered firm."],
  ["Assignment", "The process by which an option writer is selected to fulfill the obligation created by exercise."],
  ["At-the-money", "An option whose strike is approximately equal to the underlying futures price."],
  ["Basis", "Cash price minus the relevant futures price."],
  ["Basis grade", "The contract grade used as the standard for delivery; other permitted grades may carry premiums or discounts."],
  ["Bear spread", "A spread positioned to benefit when the quoted relationship falls; in an interdelivery futures spread, commonly short nearby and long deferred."],
  ["Bull spread", "A spread positioned to benefit when the quoted relationship rises; in an interdelivery futures spread, commonly long nearby and short deferred."],
  ["Call", "An option giving its buyer the right to buy the underlying futures at the strike."],
  ["Carrying charges", "Costs of holding a commodity or instrument over time, such as storage, insurance, and financing."],
  ["Cash settlement", "Final settlement by a monetary amount rather than physical delivery."],
  ["Churning", "Excessive trading in a customer account primarily to generate commissions or fees."],
  ["Clearing member", "A firm that clears directly through a clearing organization and is responsible for its obligations there."],
  ["Clearinghouse", "The central counterparty that becomes buyer to clearing sellers and seller to clearing buyers and manages settlement and margin."],
  ["Commodity pool", "A vehicle combining participants' funds to trade commodity interests."],
  ["CPO", "A commodity pool operator: a person or organization that operates or solicits for a commodity pool, subject to exclusions/exemptions."],
  ["CTA", "A commodity trading advisor: generally, one who advises others about commodity interests for compensation or profit, subject to exclusions/exemptions."],
  ["Deferred", "A delivery month farther in the future than the nearby month."],
  ["Delta", "An estimate of an option premium's change for a one-unit change in the underlying, all else equal."],
  ["EFP", "Exchange for physical: an exchange-rule transaction swapping a futures position for a corresponding cash position."],
  ["Exercise", "Use of an option buyer's right under the contract."],
  ["FCM", "A futures commission merchant: a firm that solicits/accepts futures or options orders and accepts customer money or property to margin or secure them."],
  ["First notice day", "The first contract-specific day on which notice of intent to deliver may be issued; it is not necessarily last trading day."],
  ["Floor broker", "An individual who executes trades for others on an exchange trading floor, under the applicable definition and registration rules."],
  ["Floor trader", "An individual who trades for their own account on an exchange trading floor, under applicable rules."],
  ["Forward", "A customized bilateral agreement for future purchase or sale, generally not standardized and centrally cleared like futures."],
  ["Full carry", "A normal-market spread reflecting the economically supportable cost of carrying the commodity between delivery periods."],
  ["Futures contract", "A standardized exchange-traded agreement creating obligations to buy or sell under specified terms, ordinarily cleared and marked to market."],
  ["GTC", "Good till canceled: an order duration that remains active until filled, canceled, or ended under platform rules."],
  ["Hedger", "A participant using futures or options to reduce an existing or anticipated cash-market price exposure."],
  ["IB", "An introducing broker: solicits or accepts orders but does not accept customer money or property for those trades."],
  ["In-the-money", "An option with positive intrinsic value."],
  ["Initial margin", "Performance-bond collateral required to open or carry a futures position."],
  ["Interdelivery spread", "Opposite positions in different delivery months of the same futures market."],
  ["Intermarket spread", "Opposite positions in related but different futures markets."],
  ["Intrinsic value", "Call: max(0, futures − strike). Put: max(0, strike − futures)."],
  ["Inverted market", "A futures structure in which nearby prices exceed deferred prices."],
  ["Last trading day", "The contract-specific final day for trading; do not confuse it with first notice day."],
  ["Leverage", "Controlling a large notional exposure with a smaller amount of posted collateral or premium."],
  ["Limit order", "An order to buy at a stated price or lower, or sell at a stated price or higher; execution is not guaranteed."],
  ["Limit up/down", "The maximum permitted daily price move under applicable exchange rules; rules and exceptions vary."],
  ["Lock limit", "A condition in which trading is effectively locked at a price limit because executable opposite interest is unavailable."],
  ["Long", "A bought position that generally gains when price rises."],
  ["Long hedge", "A futures purchase or long call used by an expected cash buyer to reduce rising-price risk."],
  ["Maintenance margin", "The equity threshold below which funds are generally required to restore a futures account to initial margin."],
  ["Margin", "Collateral supporting futures obligations; not a down payment or maximum loss."],
  ["Market-if-touched", "An order that generally becomes market when a favorable-side trigger is touched; exact conventions vary."],
  ["Market order", "An order seeking prompt execution at available prices without a guaranteed price."],
  ["Mark to market", "Daily crediting and debiting of gains and losses using settlement prices."],
  ["Nearby", "The closest actively relevant delivery month, depending on context."],
  ["Normal market", "A futures structure in which deferred prices exceed nearby prices."],
  ["Notional value", "Price × contract unit: the value referenced by a derivatives position."],
  ["Offset", "An equal and opposite transaction in the same futures contract month and quantity that closes a position."],
  ["Open interest", "Outstanding contract interest not yet terminated by offset, delivery, exercise, or other closing process."],
  ["Out-of-the-money", "An option with zero intrinsic value."],
  ["Position trader", "A trader who holds positions beyond the very short term, based on a market view."],
  ["Premium", "The price paid by an option buyer and received by the writer."],
  ["Put", "An option giving its buyer the right to sell the underlying futures at the strike."],
  ["Scalper", "A trader seeking small profits from very short-term price changes."],
  ["Short", "A sold position that generally gains when price falls."],
  ["Short hedge", "A futures sale or long put used by an expected cash seller to reduce falling-price risk."],
  ["Speculator", "A participant accepting price risk in pursuit of profit without an offsetting commercial exposure."],
  ["Spot", "The cash market or current delivery price, depending on context."],
  ["Spread", "Simultaneous long and short positions whose relative price movement is the main exposure."],
  ["Stop order", "An order that generally becomes market after a trigger is reached; fill price is not guaranteed."],
  ["Stop-limit order", "An order that becomes limit after triggering; price is constrained but execution is not guaranteed."],
  ["Straddle", "A long or short call and put with the same strike and expiration."],
  ["Strangle", "A long or short call and put with different strikes, typically the same expiration."],
  ["Synthetic long call", "Long futures plus long put: downside limited by the put while upside remains."],
  ["Synthetic long put", "Short futures plus long call: upside loss limited by the call while downside gains remain."],
  ["Tick", "The minimum quoted price movement specified for a contract."],
  ["Time value", "Option premium minus intrinsic value."],
  ["Variation margin", "Funds transferred or required as positions are marked to market."],
  ["Volume", "The number of contracts traded during a period."],
  ["Warehouse receipt", "A document evidencing ownership/control of a deliverable commodity stored at an approved facility."],
  ["Writer", "The option seller/grantor who receives premium and accepts assignment obligation."]
];

const referenceSources = `<p class="sources"><strong>Source basis:</strong> <a href="${sources.nfaOutline.url}">NFA outline</a>, <a href="${sources.nfaRules.url}">NFA Rulebook</a>, <a href="${sources.finra.url}">FINRA exam overview</a>, <a href="${sources.cftcGlossary.url}">CFTC glossary</a>, and <a href="${sources.cftcBasics.url}">CFTC basics</a>. Checked ${checked}. Product rules can change.</p>`;

function referencePage(title, subtitle, body) {
  return `${head(title, subtitle)}<body>${siteHeader("../")}<main class="shell reference"><div class="lesson-title"><div class="eyebrow">Printable reference</div><h1>${title}</h1><p class="lede">${subtitle}</p><button class="primary no-print" onclick="print()">Print reference</button></div>${body}${referenceSources}</main>${footer("../")}</body></html>`;
}

const formulaBody = `
<div class="notice">All examples are simplified. A live contract's unit, quote convention, tick, settlement, dates, and margin come from its current exchange specifications.</div>
<h2>Contract and futures math</h2>
${[
  ["Notional value", "futures price × contract unit"],
  ["Tick value", "minimum price fluctuation × contract unit"],
  ["Long futures P/L", "(exit − entry) × unit × contracts"],
  ["Short futures P/L", "(entry − exit) × unit × contracts"],
  ["Net speculative P/L", "gross P/L − commissions and fees"],
  ["Return on margin equity", "net P/L ÷ stated margin investment"],
  ["Margin call (restore convention)", "initial margin − current equity, after equity falls below maintenance"]
].map(([a,b])=>`<div class="formula"><strong>${a}</strong><code>${b}</code></div>`).join("")}
<h2>Basis and hedge math</h2>
${[
  ["Basis", "cash price − relevant futures price"],
  ["Strengthening basis", "ending basis is more positive than initial"],
  ["Short-hedge effective sale", "cash sale + futures gain/loss = initial futures + ending basis"],
  ["Long-hedge effective purchase", "cash purchase − futures gain/loss = initial futures + ending basis"],
  ["Short hedger benefits", "basis strengthens"],
  ["Long hedger benefits", "basis weakens"]
].map(([a,b])=>`<div class="formula"><strong>${a}</strong><code>${b}</code></div>`).join("")}
<h2>Options at expiration</h2>
${[
  ["Call intrinsic", "max(0, futures − strike)"],
  ["Put intrinsic", "max(0, strike − futures)"],
  ["Time value", "premium − intrinsic"],
  ["Long call breakeven", "strike + premium"],
  ["Long put breakeven", "strike − premium"],
  ["Long option maximum loss", "premium paid"],
  ["Bull call max gain / loss", "width − debit / debit"],
  ["Bear put max gain / loss", "width − debit / debit"],
  ["Bear call max gain / loss", "credit / width − credit"],
  ["Bull put max gain / loss", "credit / width − credit"]
].map(([a,b])=>`<div class="formula"><strong>${a}</strong><code>${b}</code></div>`).join("")}`;

const payoffBody = `<div class="grid">
<div class="card"><span class="tag">Futures</span><h3>Long futures</h3><p>Bullish. Gains as futures rise; loses as they fall. Symmetric obligation.</p><code>P/L = exit − entry</code></div>
<div class="card"><span class="tag">Futures</span><h3>Short futures</h3><p>Bearish. Gains as futures fall; loses as they rise. Symmetric obligation.</p><code>P/L = entry − exit</code></div>
<div class="card"><span class="tag">Option buyer</span><h3>Long call</h3><p>Bullish right to buy. Max loss premium; BE strike + premium.</p><code>max(0,F−K)−P</code></div>
<div class="card"><span class="tag">Option buyer</span><h3>Long put</h3><p>Bearish right to sell. Max loss premium; BE strike − premium.</p><code>max(0,K−F)−P</code></div>
<div class="card"><span class="tag">Option writer</span><h3>Short call</h3><p>Receives premium; assigned to the selling side if exercised. Uncovered upside risk can be unlimited.</p><code>P−max(0,F−K)</code></div>
<div class="card"><span class="tag">Option writer</span><h3>Short put</h3><p>Receives premium; assigned to the buying side if exercised. Downside risk can be very large.</p><code>P−max(0,K−F)</code></div></div>
<h2>Hedge map</h2><table><thead><tr><th>Cash exposure</th><th>Adverse move</th><th>Futures hedge</th><th>Option hedge</th></tr></thead><tbody>
<tr><td>Producer / future seller</td><td>Price falls</td><td>Short futures</td><td>Buy put for a floor with upside participation</td></tr>
<tr><td>Processor / future buyer</td><td>Price rises</td><td>Long futures</td><td>Buy call for a ceiling with downside participation</td></tr></tbody></table>
<h2>Synthetic shapes</h2><table><tbody><tr><th>Long futures + long put</th><td>Synthetic long call</td></tr><tr><th>Short futures + long call</th><td>Synthetic long put</td></tr><tr><th>Long futures − short call</th><td>Covered call</td></tr></tbody></table>`;

const orderBody = `<table><thead><tr><th>Need</th><th>Order</th><th>What it prioritizes</th><th>Main risk</th></tr></thead><tbody>
<tr><td>Execute promptly</td><td>Market</td><td>Execution</td><td>Fill price / slippage</td></tr>
<tr><td>Buy no higher or sell no lower than a price</td><td>Limit</td><td>Price</td><td>No execution</td></tr>
<tr><td>Exit long after adverse fall</td><td>Sell stop</td><td>Activation, then execution</td><td>Slippage after trigger</td></tr>
<tr><td>Exit short after adverse rise</td><td>Buy stop</td><td>Activation, then execution</td><td>Slippage after trigger</td></tr>
<tr><td>Trigger but retain limit</td><td>Stop-limit</td><td>Post-trigger price boundary</td><td>Market can pass without fill</td></tr>
<tr><td>Enter if favorable-side level is touched</td><td>Market-if-touched</td><td>Conditional market entry</td><td>Slippage; venue convention</td></tr>
<tr><td>Remain active</td><td>GTC</td><td>Duration</td><td>Forgotten/stale order</td></tr>
<tr><td>Entire immediate fill or cancel</td><td>Fill-or-kill</td><td>All-or-none immediacy</td><td>No fill</td></tr>
<tr><td>Execute near official close</td><td>Market-on-close</td><td>Close timing</td><td>Closing price uncertainty</td></tr>
<tr><td>Cancel alternate after one executes</td><td>OCO</td><td>Linked contingencies</td><td>Venue-specific behavior</td></tr></tbody></table>
<div class="notice danger"><strong>Exam-safe caveat:</strong> order availability, trigger method, price protection, and behavior during gaps or price limits vary by exchange, product, and platform. A stop is not a guaranteed fill at the stop price.</div>`;

const regulationBody = `<table><thead><tr><th>Role / rule</th><th>Core exam distinction</th><th>Memory test</th></tr></thead><tbody>
<tr><td>CFTC</td><td>Federal regulator administering/enforcing the Commodity Exchange Act and CFTC regulations.</td><td>Federal authority?</td></tr>
<tr><td>NFA</td><td>Registered futures association and industry SRO; registration, rules, examinations, discipline, arbitration.</td><td>Membership/SRO?</td></tr>
<tr><td>FINRA</td><td>Administers the Series 3 for NFA.</td><td>Exam delivery?</td></tr>
<tr><td>FCM</td><td>Solicits/accepts orders and accepts customer money/property for them.</td><td>May hold margin funds?</td></tr>
<tr><td>IB</td><td>Solicits/accepts orders but does not accept customer money/property.</td><td>Order access without funds?</td></tr>
<tr><td>CTA</td><td>Commodity-interest advice for compensation/profit, subject to exclusions/exemptions.</td><td>Advice?</td></tr>
<tr><td>CPO</td><td>Operates or solicits for a commodity pool, subject to exclusions/exemptions.</td><td>Pooled vehicle?</td></tr>
<tr><td>AP</td><td>Individual solicitation or supervision on behalf of a registrant.</td><td>Person acting for firm?</td></tr>
<tr><td>Rule 2-4</td><td>High standards of commercial honor; just and equitable principles.</td><td>Ethical umbrella?</td></tr>
<tr><td>Rule 2-9</td><td>Diligent supervision of employees and agents.</td><td>Who reviewed/prevented?</td></tr>
<tr><td>Rule 2-13</td><td>CPO/CTA regulation and supervision themes.</td><td>Pool/advisor operations?</td></tr>
<tr><td>Rule 2-29</td><td>Communications and promotional material; no misleading, deceptive, or high-pressure conduct.</td><td>What was said publicly?</td></tr>
<tr><td>Rule 2-30</td><td>Customer information and risk disclosure for covered customers; annual refresh and risk assessment.</td><td>Know and warn customer?</td></tr>
<tr><td>Position reports</td><td>Can apply to hedgers and speculators.</td><td>Report size?</td></tr>
<tr><td>Speculative limits</td><td>Maximum specified net positions, with current aggregation and exemption rules.</td><td>Cap excessive speculation?</td></tr>
<tr><td>NFA discipline</td><td>Complaint, investigation, hearing/settlement, appeal, and authorized sanctions/MRA.</td><td>SRO enforcement?</td></tr>
<tr><td>CFTC enforcement</td><td>Federal Commodity Exchange Act/regulation enforcement.</td><td>Federal case?</td></tr>
<tr><td>NFA arbitration</td><td>Forum for covered futures-industry disputes.</td><td>Dispute forum?</td></tr></tbody></table>
<div class="notice">Definitions have exclusions and exemptions. For real compliance decisions, use the current rule text and qualified counsel/compliance—not this memory matrix.</div>`;

function indexHtml() {
  const modules = Object.keys(moduleNames).map(Number).map(module => {
    const cards = lessons.map((lesson, index) => ({ lesson, index })).filter(x => x.lesson.module === module).map(({ lesson, index }) => `<article class="card lesson-card" data-lesson="${index + 1}"><div class="number">${String(index + 1).padStart(2,"0")}</div><h3>${lesson.title}</h3><p>${lesson.objective}</p><a class="button secondary" href="${lessonFile(index, lesson)}">Start lesson</a><span class="state">Not started</span></article>`).join("");
    return `<section class="module"><div class="module-head"><h2>Module ${module}: ${moduleNames[module]}</h2><p>${cards.match(/<article/g)?.length || 0} lessons</p></div><div class="grid">${cards}</div></section>`;
  }).join("");
  const refs = [
    ["Glossary", "reference/series-3-glossary.html", "Canonical language for futures, options, hedging, and regulation."],
    ["Formula sheet", "reference/formula-sheet.html", "Contract, margin, basis, hedge, futures, and option formulas."],
    ["Payoff map", "reference/payoff-map.html", "Long/short and call/put rights, risks, and hedge directions."],
    ["Order guide", "reference/order-guide.html", "Choose execution certainty, price control, or trigger behavior."],
    ["Regulatory matrix", "reference/regulatory-matrix.html", "Agencies, registrants, NFA rules, and enforcement roles."]
  ].map(([a,b,c])=>`<article class="card"><h3>${a}</h3><p>${c}</p><a class="button secondary" href="${b}">Open</a></article>`).join("");
  const assessments = [
    ["Initial diagnostic", "assessments/diagnostic.html", "24 questions · untimed recommendation"],
    ["Mixed cumulative", "assessments/mixed-cumulative.html", "60 mixed questions · study feedback"],
    ["Readiness form A", "assessments/readiness-a.html", "120 questions · 150 minutes"],
    ["Readiness form B", "assessments/readiness-b.html", "120 questions · 150 minutes"]
  ].map(([a,b,c])=>`<article class="card"><h3>${a}</h3><p>${c}</p><a class="button secondary" href="${b}">Open</a></article>`).join("");
  const checkpointCard = `<article class="card"><h3>Module checkpoints</h3><p>Six focused checks · 9 questions each</p><p>${Object.keys(moduleNames).map(module=>`<a href="assessments/module-${String(module).padStart(2,"0")}.html">M${module}</a>`).join(" · ")}</p></article>`;
  return `${head("Home")}<body>${siteHeader()}<main class="shell"><section class="hero"><div><div class="kicker">Pass it. Keep it.</div><h1>Build the market in your head.</h1><p class="lede">A source-backed Series 3 foundation for a beginner: one mental move per lesson, immediate feedback, and a two-part readiness gate.</p><a class="button" href="assessments/diagnostic.html">Take the diagnostic</a></div><aside class="hero-note"><strong>The real target</strong><br>80% overall, with market knowledge and regulations each at least 75%. The official exam requires 70% on each part.</aside></section>
  <section class="notice danger"><strong>Risk note:</strong> futures and options are leveraged and can produce losses beyond initial funds. This course is exam education, not a recommendation to trade.</section>
  <section class="module card"><div class="eyebrow">Interactive foundation</div><h2 style="margin-top:.25em">Ride a hedge through Futures Market Journey</h2><p class="lede">Follow cash exposure through hedge selection, order entry, exchange matching, clearing, daily settlement, basis, offset, and compliance review. The cart carries calculations from a real model, with a retrieval check at every station.</p><a class="button" href="simulation/index.html">Launch the simulation</a></section>
  <section class="module card"><div class="eyebrow">Spaced retrieval</div><h2 style="margin-top:.25em">Today's review queue</h2><ul id="review-queue"><li>Take the diagnostic, then begin lesson 1.</li></ul></section>
  <section id="lessons"><div class="module-head"><h2>Your learning path</h2><p><span id="completed">0</span> / ${lessons.length} lessons recorded locally</p></div>${modules}</section>
  <section id="references" class="module"><div class="module-head"><h2>Print-ready references</h2><p>Compress after learning</p></div><div class="grid">${refs}</div></section>
  <section id="assessments" class="module"><div class="module-head"><h2>Mastery gates</h2><p>Retrieval before confidence</p></div><div class="grid">${assessments}${checkpointCard}</div></section>
  <section class="module"><div class="card"><h2>How to use one session</h2><ol><li>Retrieve yesterday's idea without notes for 5–10 minutes.</li><li>Complete one lesson and its transfer problem for 20–25 minutes.</li><li>Practice mixed calculations or regulation scenarios for 15–20 minutes.</li><li>Record a learning insight only after you can apply it correctly.</li></ol><p><a href="COVERAGE.md">Official-outline coverage map</a> · <a href="ACCURACY-REVIEW.md">Accuracy review</a> · <a href="SIMULATION-BLUEPRINT.md">Simulation design record</a></p></div></section>
  </main>${footer()}<script>const lessonLinks=${JSON.stringify(lessons.map((lesson,index)=>lessonFile(index,lesson)))};const lessonTitles=${JSON.stringify(lessons.map(x=>x.title))};let done=0,review=[];document.querySelectorAll('[data-lesson]').forEach(card=>{const n=Number(card.dataset.lesson);const data=JSON.parse(localStorage.getItem('series3.lesson.'+n)||'null');if(data){done++;card.querySelector('.state').textContent=data.correct+'/'+data.total+' correct · confidence '+data.confidence+'/4';card.querySelector('.state').style.color='var(--forest)';const age=(Date.now()-new Date(data.updated).getTime())/86400000;if(data.confidence<3||data.correct<data.total)review.push({n,why:'needs reinforcement'});else if(age>=2)review.push({n,why:'due for retrieval'})}});document.getElementById('completed').textContent=done;const queue=document.getElementById('review-queue');if(review.length){queue.innerHTML=review.slice(0,5).map(x=>'<li><a href="'+lessonLinks[x.n-1]+'">'+lessonTitles[x.n-1]+'</a> — '+x.why+'</li>').join('')}else if(done){queue.innerHTML='<li>No lesson is due today. Try the mixed cumulative review or explain the latest lesson aloud without notes.</li>';}</script></body></html>`;
}

function seeded(seed) { let value = seed >>> 0; return () => ((value = (value * 1664525 + 1013904223) >>> 0) / 4294967296); }
function shuffle(items, seed) { const result = [...items]; const random = seeded(seed); for (let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];} return result; }
const aq = (prompt, choices, answer, rationale, section = "market") => ({ prompt, choices, answer, rationale, section });

function numericMarketQuestions(seed, count = 44) {
  const random = seeded(seed); const items=[]; const n=(min,max)=>Math.floor(random()*(max-min+1))+min;
  for(let i=0;i<count;i++){
    const kind=i%10;
    if(kind===0){const unit=n(2,10)*500, move=n(2,12)/100, contracts=n(1,3), value=move*unit*contracts;items.push(aq(`A long ${contracts}-contract position rises by ${move.toFixed(2)}. Each contract covers ${unit.toLocaleString()} units. Gross profit is…`,[`$${(value/10).toLocaleString()}`,`$${value.toLocaleString()}`,`$${(value*contracts).toLocaleString()}`,`$${unit.toLocaleString()}`],1,`Price change × unit × contracts = ${move.toFixed(2)} × ${unit} × ${contracts} = $${value}.`));}
    if(kind===1){const unit=n(2,12)*250, tick=n(1,8)/1000, value=unit*tick;items.push(aq(`A contract covers ${unit.toLocaleString()} units and the minimum move is ${tick.toFixed(3)}. Tick value is…`,[`$${tick.toFixed(3)}`,`$${value.toFixed(2)}`,`$${unit.toLocaleString()}`,`$${(value*10).toFixed(2)}`],1,`Tick value = ${tick.toFixed(3)} × ${unit} = $${value.toFixed(2)}.`));}
    if(kind===2){const initial=n(4,9)*1000, maintenance=initial-n(8,16)*100, equity=maintenance-n(1,7)*100, call=initial-equity;items.push(aq(`Initial margin is $${initial.toLocaleString()}, maintenance is $${maintenance.toLocaleString()}, and equity falls to $${equity.toLocaleString()}. Under the restore-to-initial convention, the call is…`,[`$${(maintenance-equity).toLocaleString()}`,`$${call.toLocaleString()}`,`$${maintenance.toLocaleString()}`,"No call"],1,`Equity is below maintenance, so restore to initial: $${initial} − $${equity} = $${call}.`));}
    if(kind===3){const futures=n(60,120)+n(0,9)/10, basis=(n(-15,15)/10), cash=futures+basis;items.push(aq(`Cash is ${cash.toFixed(1)} and futures is ${futures.toFixed(1)}. Basis is…`,[(cash+futures).toFixed(1),basis.toFixed(1),(-basis).toFixed(1),"Cannot be calculated"],1,`Basis = cash − futures = ${cash.toFixed(1)} − ${futures.toFixed(1)} = ${basis.toFixed(1)}.`));}
    if(kind===4){const f0=n(70,110), f1=f0-n(3,12), b1=-n(1,8), cash=f1+b1, effective=f0+b1;items.push(aq(`A short hedger sells futures at ${f0}, later sells cash at ${cash} and buys futures at ${f1}. Effective sale price is…`,[cash,f1,effective,f0+(f0-f1)],2,`Cash ${cash} + futures gain ${f0-f1} = ${effective}.`));}
    if(kind===5){const f0=n(70,110), f1=f0+n(3,12), b1=n(-5,5), cash=f1+b1, effective=f0+b1;items.push(aq(`A long hedger buys futures at ${f0}, later buys cash at ${cash} and sells futures at ${f1}. Effective purchase cost is…`,[cash,f1,effective,f0-(f1-f0)],2,`Cash ${cash} − futures gain ${f1-f0} = ${effective}.`));}
    if(kind===6){const strike=n(5,12)*10, premium=n(2,7), finish=strike+premium+n(1,8), profit=finish-strike-premium;items.push(aq(`A ${strike} call is bought for ${premium}. Futures expire at ${finish}. Profit per unit is…`,[premium,finish-strike,profit,strike+premium],2,`Intrinsic ${finish-strike} − premium ${premium} = ${profit}.`));}
    if(kind===7){const strike=n(6,13)*10, premium=n(2,7), finish=strike-premium-n(1,8), profit=strike-finish-premium;items.push(aq(`A ${strike} put is bought for ${premium}. Futures expire at ${finish}. Profit per unit is…`,[premium,strike-finish,profit,strike-premium],2,`Intrinsic ${strike-finish} − premium ${premium} = ${profit}.`));}
    if(kind===8){const width=n(5,15), debit=n(1,width-1), max=width-debit;items.push(aq(`A ${width}-point-wide bull call spread costs a net ${debit}. Maximum profit per unit is…`,[debit,width,max,width+debit],2,`Maximum profit = width ${width} − debit ${debit} = ${max}.`));}
    if(kind===9){const near0=n(80,120), defer0=near0+n(2,8), near1=near0+n(-4,8), defer1=defer0+n(-4,8), result=(near1-near0)-(defer1-defer0);items.push(aq(`A trader buys nearby at ${near0} and sells deferred at ${defer0}. Later nearby is ${near1} and deferred is ${defer1}. Net result in quote units is…`,[result,Math.abs(result),near1-defer1,(near1-near0)+(defer1-defer0)],0,`Long-nearby change ${(near1-near0)} plus short-deferred change ${-(defer1-defer0)} = ${result}.`));}
  }
  return items;
}

const extraReg = [
  aq("Passing Series 3 by itself permits a person to conduct registered commodity business immediately.",["True","False"],1,"Passing satisfies an exam requirement; registration, membership, sponsorship, and other filings may still be required.","reg"),
  aq("Which organization is the federal derivatives regulator?",["NFA","CFTC","FINRA","CME clearing only"],1,"The CFTC administers and enforces the federal Commodity Exchange Act framework.","reg"),
  aq("Which organization is the futures-industry self-regulatory organization?",["NFA","Treasury","Federal Reserve","SEC only"],0,"NFA is the registered futures association/SRO.","reg"),
  aq("An independent IB differs from a guaranteed IB chiefly because the independent IB…",["May accept customer funds","Meets its own financial requirements rather than operating under an FCM guarantee","Needs no registration","May guarantee profits"],1,"A guaranteed IB is guaranteed by an FCM; an independent IB meets applicable capital requirements.","reg"),
  aq("A customer gives an AP verbal permission to choose all trades. The clearest missing control is…",["A warehouse receipt","Written discretionary authority and supervision","A price limit","Open interest"],1,"Discretionary authority generally requires written authorization and supervisory review.","reg"),
  aq("Customer funds carried by an FCM may be used as the firm's ordinary operating money.",["True","False"],1,"Customer funds are subject to segregation and handling rules.","reg"),
  aq("Rule 2-4 is best remembered as…",["The ethical umbrella of commercial honor and just/equitable trade","The option delta rule","The contract tick rule","The exam scheduling rule"],0,"Rule 2-4 states broad ethical standards.","reg"),
  aq("Rule 2-9 most directly concerns…",["Supervision","Basis","Margin arithmetic","Delivery grade"],0,"It requires diligent supervision of employees and agents.","reg"),
  aq("Rule 2-29 most directly concerns…",["Promotional material and public communications","Daily settlement","Forward customization","Tick size"],0,"Rule 2-29 prohibits misleading/deceptive/high-pressure communications.","reg"),
  aq("Rule 2-30 most directly concerns…",["Customer information and risk disclosure","Exchange delivery premiums","Option assignment","Circuit breakers"],0,"It covers the customer-information and risk-disclosure process for covered customers.","reg"),
  aq("A materially changed customer circumstance should generally trigger…",["Deletion of the account record","A customer-information refresh and risk reassessment","Guaranteed recommendations","Automatic option exercise"],1,"Rule 2-30 includes annual refresh and reassessment for material changes in covered accounts.","reg"),
  aq("If a covered customer is advised that futures are too risky, the Member may nevertheless make individualized recommendations.",["True","False"],1,"Current Rule 2-30 guidance prohibits individualized recommendations in that circumstance.","reg"),
  aq("An advertisement can be misleading even if one performance number is literally accurate.",["True","False"],0,"Omitted risks, context, costs, or limitations can make the overall impression misleading.","reg"),
  aq("High-pressure sales tactics are principally tested under…",["Rule 2-29","Basis convergence","Initial margin","Position offset"],0,"Rule 2-29 prohibits high-pressure sales practices.","reg"),
  aq("Outsourcing advertising to a lead generator eliminates a Member's supervisory duty.",["True","False"],1,"Members cannot evade public-communication and supervision duties by outsourcing.","reg"),
  aq("CPO disclosure themes include fees, performance, trading program, conflicts, and principals' business backgrounds.",["True","False"],0,"Those are listed CPO/CTA disclosure-document topics in the official outline.","reg"),
  aq("Bunched orders and allocation records are especially associated with…",["CTA/CPO account management controls","Contract delivery grades only","Exam scheduling","Cash settlement only"],0,"The outline includes bunched orders under CPO/CTA records.","reg"),
  aq("Speculative position limits are intended chiefly to…",["Guarantee trader profits","Address excessive speculation and market integrity","Set option premiums","Set customer commissions"],1,"Federal/exchange limits are designed to address excessive speculation and related market harms.","reg"),
  aq("Position-reporting duties may apply to bona fide hedgers.",["True","False"],0,"Reporting is distinct from speculative-limit exemptions and can apply to hedgers.","reg"),
  aq("A guarantor FCM has responsibilities for its guaranteed IB.",["True","False"],0,"The guarantee relationship carries oversight and financial responsibility under applicable rules.","reg"),
  aq("Which record most directly helps reconstruct when an order was received and handled?",["Time-stamped order record","Warehouse insurance only","Option delta table","Yield curve"],0,"Time-stamping supports the order audit trail.","reg"),
  aq("A Member should promise that a stop order guarantees the stop price.",["True","False"],1,"Stops can slip; a guarantee would be misleading.","reg"),
  aq("Which forum is associated with covered customer/member futures disputes?",["NFA arbitration","Federal Reserve discount window","Delivery warehouse only","Option assignment lottery"],0,"NFA arbitration is a dispute-resolution forum.","reg"),
  aq("NFA disciplinary outcomes may include fines and expulsion.",["True","False"],0,"The outline includes fines, cease-and-desist orders, and expulsion among sanctions.","reg"),
  aq("A Member Responsibility Action is part of…",["NFA's protective/disciplinary framework","Option pricing","Basis calculation","Cash settlement arithmetic"],0,"MRAs are listed within NFA disciplinary procedures.","reg"),
  aq("The CFTC can bring federal enforcement actions under the Commodity Exchange Act.",["True","False"],0,"That is a core CFTC function.","reg"),
  aq("An AP minimum-experience rule and review controls are especially relevant to…",["Discretionary accounts","Calculating tick value","Classifying a normal market","Option intrinsic value"],0,"The NFA outline flags experience, authorization, supervision, and review for discretionary accounts.","reg"),
  aq("FCM/IB disclosures include costs associated with futures transactions.",["True","False"],0,"Cost disclosure is an explicit FCM/IB outline topic.","reg"),
  aq("Promotional-material records and approvals are irrelevant once an ad stops running.",["True","False"],1,"Review and retention obligations persist under current procedures and rules.","reg"),
  aq("An exemption from a speculative limit always removes every reporting duty.",["True","False"],1,"Limit exemptions and reporting obligations are distinct; current rules determine both.","reg"),
  aq("Which role generally gives commodity-interest advice for compensation?",["CTA","FCM only","Floor trader only","Clearinghouse"],0,"That fact pattern points toward CTA activity, subject to exclusions and exemptions.","reg"),
  aq("Which role generally operates a pooled commodity-interest vehicle?",["CPO","IB only","AP only","FINRA"],0,"Operating or soliciting for a pool points toward CPO activity.","reg")
];

function baseQuestions() { return lessons.flatMap((lesson, li) => lesson.questions.map(item => ({...item, rationale:item.explain, lesson:li+1}))); }

function assessmentHtml(title, subtitle, questions, minutes = 0, kind="study") {
  const safe = questions.map((item,index)=>({...item,id:index+1}));
  const rendered = safe.map((item,index)=>`<div class="question" data-q="${index}"><fieldset><legend>${index+1}. <span class="tag">${item.section === "reg" ? "Regulations" : "Market"}</span> ${item.prompt}</legend>${item.choices.map((choice,ci)=>`<label class="choice"><input type="radio" name="q${index}" value="${ci}"> ${choice}</label>`).join("")}</fieldset><div class="feedback" role="status"></div></div>`).join("");
  return `${head(title,subtitle)}<body>${siteHeader("../")}<main class="shell assessment"><div class="lesson-title"><div class="eyebrow">Mastery gate</div><h1>${title}</h1><p class="lede">${subtitle}</p></div><div class="scorebox"><span><strong>${questions.length}</strong> questions · Market and regulations score separately</span><span class="timer" aria-live="polite">${minutes ? `${minutes}:00` : "Untimed"}</span></div><div class="notice"><strong>Closed-note first pass.</strong> Submit when complete. Review every rationale afterward; confidence is not evidence.</div><form>${rendered}<button class="primary submit" type="button">Score assessment</button></form><section class="results" tabindex="-1"></section><p class="disclaimer">Original practice questions—not actual, recalled, or represented Series 3 questions. Full forms use an 85/35 study allocation; public official pages specify the 120 scored total and two-part 70% passing rule, not that allocation.</p></main>${footer("../")}<script>
  const items=${JSON.stringify(safe)};let seconds=${minutes*60};const timer=document.querySelector('.timer');let interval=null;if(seconds){interval=setInterval(()=>{seconds--;const m=Math.floor(seconds/60),s=seconds%60;timer.textContent=m+':'+String(s).padStart(2,'0');if(seconds<=0){clearInterval(interval);score(true)}},1000)}
  function score(timedOut=false){let market={right:0,total:0},reg={right:0,total:0},unanswered=0;document.querySelectorAll('.question').forEach((box,i)=>{const item=items[i],bucket=item.section==='reg'?reg:market;bucket.total++;const picked=box.querySelector('input:checked'),feedback=box.querySelector('.feedback');box.classList.remove('unanswered');if(!picked){unanswered++;box.classList.add('unanswered');feedback.className='feedback bad';feedback.textContent='Unanswered. '+item.rationale;return}const good=Number(picked.value)===item.answer;if(good)bucket.right++;feedback.className='feedback '+(good?'good':'bad');feedback.textContent=(good?'Correct. ':'Incorrect. ')+item.rationale;});if(unanswered&&!timedOut){document.querySelector('.question.unanswered').scrollIntoView({behavior:'smooth',block:'center'});return}if(interval)clearInterval(interval);const mp=market.total?Math.round(market.right/market.total*100):100,rp=reg.total?Math.round(reg.right/reg.total*100):100,overall=Math.round((market.right+reg.right)/(market.total+reg.total)*100),ready=overall>=80&&mp>=75&&rp>=75;const results=document.querySelector('.results');results.classList.add('show');results.innerHTML='<h2>'+(ready?'Readiness threshold met':'Keep building')+'</h2><p><strong>Overall:</strong> '+overall+'% ('+(market.right+reg.right)+'/'+(market.total+reg.total)+')</p><p><strong>Market:</strong> '+mp+'% ('+market.right+'/'+market.total+') · <strong>Regulations:</strong> '+rp+'% ('+reg.right+'/'+reg.total+')</p><p>Workspace target: 80% overall and at least 75% in each part. Official passing standard: 70% on each part.</p>';results.focus();localStorage.setItem('series3.assessment.${kind}',JSON.stringify({overall,market:mp,regulations:rp,date:new Date().toISOString()}));}
  document.querySelector('.submit').addEventListener('click',()=>score(false));
  </script></body></html>`;
}

const coverageRows = [
  ["General theory", "Development; futures vs securities—rights, obligations, ownership transfer", "L01–L02; glossary"],
  ["Futures contract", "Forward comparison; offset; clearing/non-clearing members; delivery; basis grade; premiums/discounts", "L02–L04; glossary"],
  ["Market structure", "Normal/full-carry markets; carrying charges; inverted markets; shortages/other factors", "L07; glossary"],
  ["Hedging theory", "Risk reduction; unhedged exposure; cash pricing; short hedgers; long hedgers", "L01, L08–L09; formula/payoff references"],
  ["Speculative theory", "Leverage; risk; liquidity; volatility", "L01, L06, L12"],
  ["General futures terminology", "AP, basis, carry, churning, clearinghouse, CPO, CTA, deferred, FCM, notice day, floor roles, forward, IB, limits, long/short, normal, pit, position trader, scalper, spot, receipt", "Glossary; L01–L08, L18–L21"],
  ["General option terminology", "ATM, call, conversion, delta, exercise, expiration, grantor/writer, ITM/OTM, intrinsic/time value, premium, put, spread, straddle/strangle, synthetics", "L14–L18; glossary/payoff map"],
  ["Margin requirements", "Performance bond vs securities margin; exchange authority; initial/maintenance; agreements; margin calculations; changes; excess equity; hedge/spread margin", "L03, L06, L13; formula sheet"],
  ["Option premiums", "Intrinsic; time; delta; quotations", "L14–L16; formula sheet"],
  ["Price limits", "Limit up/down; expanded limits; margin effects; lock limit; circuit breakers", "L04, L10, L12; glossary/order guide"],
  ["Offset/settlement/delivery", "Liquidating positions; notice day; spot month; clearing delivery; notices; physical delivery; receipts; EFP", "L04; glossary"],
  ["Exercise/assignment/settlement", "Assignment; exercise margin; final trading/exercise dates", "L04, L14–L18; glossary"],
  ["Order types", "Market, stop, stop-limit, MIT, electronic orders, GTC, FOK, MOC, OCO", "L10; order guide"],
  ["Technical analysis", "Charts, trends, support/resistance, congestion, gaps, volume/open interest", "L11"],
  ["Fundamental analysis", "Economic/political instability; elasticity; agricultural policy; crop years", "L11"],
  ["Interest-rate analysis", "Positive/inverted/flat curves; tax and monetary policy", "L11"],
  ["Basic hedging and basis", "Anticipatory long/short hedges; long/short basis; basis change; transport; grade; financial-market basis", "L08–L09; formula sheet"],
  ["Hedge calculations/applications", "Net result and effective price across grains, livestock, food, metals, energy, lumber, rates, currencies, and indices", "L09 plus mixed assessment variants"],
  ["Spreading", "Execution; widening/narrowing; normal/inverted strategies; carry; interdelivery; bull/bear; intermarket", "L07, L13"],
  ["Futures speculation", "Single/multiple contract P/L; commissions; return on margin; trade/order selection", "L05, L10, L12"],
  ["Option theory", "Long limited premium risk; writer premium and potentially substantial loss", "L14–L16; payoff map"],
  ["Option hedges", "Long put vs short hedge; long call vs long hedge", "L17"],
  ["Option speculation/synthetics", "Long call/put breakeven and return; protective call/put synthetics; covered call", "L16–L17; payoff/formula references"],
  ["Option spreads", "Bull/bear call and put spreads; widening/narrowing; max gain/loss; calendar and arbitrage spreads", "L18; formula sheet"],
  ["Registration/membership", "FB, FT, AP, CPO, CTA, IB, FCM; exemptions; NFA membership", "L19; regulatory matrix"],
  ["Ethical/account opening", "Rule 2-4; customer information/risk disclosure; agreements; discretionary authority; supervision; experience", "L20–L21; regulatory matrix"],
  ["Positions", "Reporting; CFTC/exchange limits; daily reports; hedgers/speculators; maximum net positions", "L20; regulatory matrix"],
  ["FCM/IB regulation", "Guaranteed/independent IB; guarantor duties; customer funds; capital; reports; margin; complaints/adjustments; time stamps; Rule 2-29; cost disclosure", "L19–L21; regulatory matrix"],
  ["CPO/CTA regulation", "Rule 2-13; disclosure—fees, performance, statements, program, backgrounds, conflicts; records; bunched orders; Rule 2-29", "L19, L21; regulatory matrix"],
  ["Arbitration", "NFA arbitration procedures", "L21; regulatory matrix"],
  ["NFA discipline", "Complaints; warning letters; hearings; settlement; appeal; MRA; fines; cease/desist; expulsion", "L21; regulatory matrix"],
  ["CFTC enforcement", "Commodity Exchange Act enforcement", "L21; regulatory matrix"]
];

function coverageMarkdown() {
  const inventory=lessons.map((lesson,index)=>`- L${String(index+1).padStart(2,"0")}: ${lesson.title} — Module ${lesson.module}, ${moduleNames[lesson.module]}`).join("\n");
  return `# Series 3 official-outline coverage\n\nSource of truth: [NFA Study Outline for Futures Industry Exams](${sources.nfaOutline.url}), checked ${checked}. “L01” means the numbered lesson in \`lessons/\`. The outline is expressly not an exhaustive list of actual questions.\n\n| NFA area | Included outline items | Workspace coverage |\n|---|---|---|\n${coverageRows.map(row=>`| ${row.join(" | ")} |`).join("\n")}\n\n## Lesson inventory\n\n${inventory}\n\n## Assessment gates\n\n- Diagnostic: 24 mixed items to establish a starting point.\n- Module checkpoints: nine items after each of six modules.\n- Cumulative review: 60 mixed items with rationales.\n- Readiness forms A and B: 120 items, 150 minutes, separately scored market/regulation sections.\n- Workspace readiness: 80% overall and at least 75% in each section. Official pass standard: 70% in each part.\n\n## Simplification policy\n\nEvery worked product uses stated fictional specifications. Actual contract units, ticks, delivery rules, limits, settlement, order availability, and margin must be checked against current exchange/FCM rules. Regulatory definitions can contain exclusions and exemptions; the current rule text controls.\n`;
}

await out("index.html", indexHtml());
for (const [index, lesson] of lessons.entries()) await out(lessonFile(index, lesson), lessonHtml(lesson, index));
await out("reference/series-3-glossary.html", referencePage("Series 3 glossary", "Canonical language used consistently across every lesson.", `<div class="term-grid">${glossary.map(([term,def])=>`<div class="term"><b>${term}</b>${def}</div>`).join("")}</div>`));
await out("reference/formula-sheet.html", referencePage("Formula sheet", "Contract, futures, margin, basis, hedge, and option arithmetic on two printable pages.", formulaBody));
await out("reference/payoff-map.html", referencePage("Position and payoff map", "Turn a market view or cash exposure into the correct direction, right, or obligation.", payoffBody));
await out("reference/order-guide.html", referencePage("Order-type decision guide", "Choose the tradeoff you actually want: execution, price, timing, or trigger.", orderBody));
await out("reference/regulatory-matrix.html", referencePage("Regulatory roles matrix", "A compact map of agencies, registrants, customer controls, rules, and enforcement.", regulationBody));

const base = baseQuestions();
const diagnostic = shuffle([...base.filter(x=>x.section==="market").slice(0,18), ...base.filter(x=>x.section==="reg").slice(0,6)], 3003);
await out("assessments/diagnostic.html", assessmentHtml("Initial diagnostic", "Answer without notes. The purpose is placement, not judgment.", diagnostic, 0, "diagnostic"));
for(let module=1;module<=6;module++){
  const indices=lessons.map((x,i)=>x.module===module?i+1:null).filter(Boolean);
  const pool=base.filter(x=>indices.includes(x.lesson));
  const supplement=module===6 ? extraReg : numericMarketQuestions(4000+module,18);
  const qs=shuffle([...pool, ...supplement],4000+module).filter((x,i,a)=>a.findIndex(y=>y.prompt===x.prompt)===i).slice(0,9);
  await out(`assessments/module-${String(module).padStart(2,"0")}.html`, assessmentHtml(`Module ${module} checkpoint`, `${moduleNames[module]} · nine retrieval and transfer questions.`, qs, 0, `module-${module}`));
}
const cumulative = shuffle([...base,...numericMarketQuestions(5050,30),...extraReg],5050).filter((x,i,a)=>a.findIndex(y=>y.prompt===x.prompt)===i).slice(0,60);
await out("assessments/mixed-cumulative.html", assessmentHtml("Mixed cumulative review", "Sixty mixed questions. Use the rationales to choose what to revisit.", cumulative, 0, "cumulative"));
for(const [label,seed] of [["A",7001],["B",9001]]){
  const markets=shuffle([...base.filter(x=>x.section==="market"),...numericMarketQuestions(seed,48)],seed).slice(0,85);
  const regs=shuffle([...base.filter(x=>x.section==="reg"),...extraReg],seed+1).slice(0,35);
  const form=shuffle([...markets,...regs],seed+2);
  await out(`assessments/readiness-${label.toLowerCase()}.html`, assessmentHtml(`Readiness form ${label}`, "120 original practice questions · 150 minutes · market knowledge and regulations scored separately.", form, 150, `readiness-${label.toLowerCase()}`));
}
await out("COVERAGE.md", coverageMarkdown());
console.log(`Built ${lessons.length} lessons, 5 references, 10 assessments, and the learning hub.`);
