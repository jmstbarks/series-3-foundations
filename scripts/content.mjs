export const checked = "2026-08-14";

export const sources = {
  nfaOutline: {
    name: "NFA Series 3 study outline",
    url: "https://www.nfa.futures.org/registration-membership/study-outlines/index.html"
  },
  finra: {
    name: "FINRA Series 3 exam overview",
    url: "https://www.finra.org/registration-exams-ce/qualification-exams/series3"
  },
  nfaProficiency: {
    name: "NFA proficiency requirements",
    url: "https://www.nfa.futures.org/registration-membership/how-to-register/proficiency-requirements.html"
  },
  cftcBasics: {
    name: "CFTC Futures Market Basics",
    url: "https://www.cftc.gov/LearnAndProtect/EducationCenter/FuturesMarketBasics/index2.htm"
  },
  cftcPurpose: {
    name: "CFTC Economic Purpose of Futures Markets",
    url: "https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/economicpurpose.html"
  },
  cftcGlossary: {
    name: "CFTC Futures Glossary",
    url: "https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CFTCGlossary/index.htm"
  },
  cftcLimits: {
    name: "CFTC Speculative Position Limits",
    url: "https://www.cftc.gov/IndustryOversight/MarketSurveillance/SpeculativeLimits/speculativelimits.html"
  },
  nfaRules: {
    name: "NFA Rulebook",
    url: "https://www.nfa.futures.org/rulebooksql/rules.aspx"
  },
  nfaRequirements: {
    name: "NFA Regulatory Requirements Guide",
    url: "https://www.nfa.futures.org/members/member-resources/files/regulatory-requirements-guide.pdf"
  },
  nfaCommunications: {
    name: "NFA Communications with the Public Guide",
    url: "https://www.nfa.futures.org/members/member-resources/files/promo-material-guide.pdf"
  },
  cmeFutures: {
    name: "CME Institute Introduction to Futures",
    url: "https://www.cmegroup.com/education/courses/introduction-to-futures"
  },
  cmeOptions: {
    name: "CME Institute Introduction to Options",
    url: "https://www.cmegroup.com/education/courses/cme-institute-live/chapter-1-introduction-to-cme-group-and-fundamentals-of-financial-futures-and-options/introduction-to-options"
  },
  cmeStrategies: {
    name: "CME Institute Option Strategies",
    url: "https://www.cmegroup.com/education/courses/option-strategies"
  }
};

const q = (prompt, choices, answer, explain, section = "market") => ({
  prompt,
  choices,
  answer,
  explain,
  section
});

export const lessons = [
  {
    module: 1,
    slug: "why-futures-exist",
    title: "Why futures exist",
    objective: "Given a business exposure, identify the adverse price move and whether the business is a hedger or speculator.",
    hook: "A wheat farmer and a flour mill disagree about tomorrow's price—but both can use the same market to reduce uncertainty.",
    model: `<div class="flow"><span>Producer</span><b>price risk</b><span>Futures market</span><b>risk transfer</b><span>User / speculator</span></div>`,
    concept: [
      `A <strong>hedger</strong> already has—or expects to have—a cash-market exposure. The farmer expects to sell wheat and is hurt by falling prices. The mill expects to buy wheat and is hurt by rising prices. A futures position can create an opposing gain when the cash price moves adversely.`,
      `A <strong>speculator</strong> accepts price risk in pursuit of profit without an offsetting commercial cash exposure. Speculators can add liquidity, but their goal is different from the hedger's risk reduction. Hedging reduces price risk; it does not guarantee a perfect result because cash and futures prices may not move identically.`,
      `Futures markets also support price discovery: competitive bids and offers create observable prices that businesses can use for planning. Futures and options are leveraged and risky; this course teaches exam concepts, not a recommendation to trade.`
    ],
    example: {
      title: "Classify the exposure",
      steps: [
        `A cereal manufacturer will buy corn in three months. Its adverse move is a <strong>price rise</strong>.`,
        `Because it has a planned commercial purchase, it is a <strong>hedger</strong>, not a speculator.`,
        `The direction that can gain when prices rise is <strong>long futures</strong>. The later basis lessons will measure the imperfect part of the hedge.`
      ]
    },
    questions: [
      q("A cattle feeder expects to buy feed in two months. Which price move hurts it?", ["A rise in feed prices", "A fall in feed prices", "Either move creates the same cost", "Only a futures price move matters"], 0, "A future buyer is exposed to rising purchase prices."),
      q("A trader buys crude-oil futures solely because she expects prices to rise. She is acting as a…", ["Short hedger", "Long hedger", "Speculator", "Clearing member"], 2, "Without an offsetting commercial exposure, the position is speculative."),
      q("What is the primary purpose of a hedge?", ["Eliminate every possible business risk", "Reduce exposure to adverse price changes", "Guarantee a profit", "Avoid posting margin"], 1, "A hedge transfers or offsets price risk; it does not remove basis, operational, credit, or other risks.")
    ],
    transfer: {
      prompt: "An airline expects to purchase jet fuel later. State its adverse price move, its market role, and the futures direction that could offset that move.",
      answer: "The airline is hurt by rising fuel prices, is a long hedger (a future buyer), and would generally buy/hold a long position in a suitably related futures contract. Cross-hedging can leave basis risk."
    },
    sources: ["nfaOutline", "cftcBasics", "cftcPurpose"]
  },
  {
    module: 1,
    slug: "forwards-futures-securities",
    title: "Forward, futures, and security",
    objective: "Distinguish a forward contract, a futures contract, and ownership of a security from a short fact pattern.",
    hook: "All three can change value with a market price, but they create different rights, obligations, and counterparty structures.",
    model: `<div class="compare"><div><strong>Forward</strong><small>Private • customized • bilateral credit</small></div><div><strong>Futures</strong><small>Standardized • exchange-traded • cleared</small></div><div><strong>Security</strong><small>Often ownership or creditor claim</small></div></div>`,
    concept: [
      `A <strong>forward</strong> is a privately negotiated agreement between counterparties. Quantity, quality, date, and place can be customized, but the parties face each other's credit and liquidity risk.`,
      `A <strong>futures contract</strong> is standardized by an exchange and processed through a clearing system. Both buyer and seller have obligations. Positions are marked to market, and most are offset rather than held to delivery.`,
      `Buying common stock normally transfers an ownership interest. Buying a futures contract does not mean the long has paid for or owns the underlying commodity. Futures margin is a performance bond, not a down payment. A long futures position has an obligation to accept the contract's settlement outcome unless it is offset.`
    ],
    example: {
      title: "Read the contract clues",
      steps: [
        `A coffee roaster privately agrees with one farm on a unique grade, quantity, and delivery warehouse.`,
        `The customization and direct counterparty relationship indicate a <strong>forward</strong>.`,
        `If the roaster instead buys a standardized exchange contract cleared through a clearinghouse, it is a <strong>futures</strong> position.`
      ]
    },
    questions: [
      q("Which feature most strongly identifies a futures contract?", ["Customized private terms", "Standardized exchange terms and clearing", "Immediate transfer of commodity ownership", "No obligation for either party"], 1, "Standardization and clearing distinguish exchange-traded futures from bilateral forwards."),
      q("A long futures position is best described as…", ["Ownership of the underlying today", "A right with no obligation", "A contractual obligation unless offset", "A loan secured by the commodity"], 2, "Both futures sides carry obligations; an option buyer holds a right."),
      q("Which instrument most directly exposes two named parties to each other's credit?", ["A cleared futures contract", "A private forward", "A long exchange call", "A warehouse receipt"], 1, "A forward is bilateral; clearing interposes a clearinghouse for futures.")
    ],
    transfer: {
      prompt: "A jeweler wants exactly 2,350 ounces of a particular alloy delivered to its own plant on a nonstandard date. Which contract form fits the customization, and what risk becomes more direct?",
      answer: "A private forward fits the custom terms. Bilateral counterparty credit and liquidity risk become more direct than in a standardized cleared futures contract."
    },
    sources: ["nfaOutline", "cftcPurpose", "cmeFutures"]
  },
  {
    module: 1,
    slug: "contract-anatomy-long-short",
    title: "Read a futures contract",
    objective: "Translate contract specifications and a long or short position into economic exposure.",
    hook: "A futures price is meaningless until you attach its unit, multiplier, month, grade, and settlement method.",
    model: `<div class="ticket"><b>DEC WHEAT</b><span>Price: $6.20 / bu</span><span>Unit: 5,000 bu</span><span>Long: gains ↑</span><span>Short: gains ↓</span></div>`,
    concept: [
      `Contract specifications define the underlying, contract unit, quotation method, minimum price fluctuation (tick), listed months, last trading or notice dates, deliverable grades and locations, and settlement method. Always read the actual exchange rulebook for a live contract.`,
      `<strong>Long</strong> means bought: the position gains when the futures price rises and loses when it falls. <strong>Short</strong> means sold: it gains when the futures price falls and loses when it rises. “Sell” can open a short position; ownership of the commodity is not required to enter the trade.`,
      `Notional value is price × contract unit. It measures the value referenced by the contract, not the cash initially deposited as margin.`
    ],
    example: {
      title: "Calculate notional exposure",
      steps: [
        `Simplified contract: 5,000 units quoted at $6.20 per unit.`,
        `Notional value = $6.20 × 5,000 = <strong>$31,000</strong>.`,
        `A long has $31,000 of referenced exposure at that price, even though the initial performance bond may be much smaller.`
      ]
    },
    questions: [
      q("A short futures position gains when the futures price…", ["Rises", "Falls", "Stays unchanged only", "Reaches the spot price"], 1, "A short sells first and can offset by buying later at a lower price."),
      q("A contract covers 1,000 units at $42.50 per unit. Its notional value is…", ["$1,000", "$4,250", "$42,500", "The initial margin"], 2, "$42.50 × 1,000 = $42,500."),
      q("Which item must be checked in actual exchange specifications?", ["Only the contract symbol", "Only the current price", "Unit, tick, months, and settlement terms", "The trader's directional opinion"], 2, "Specifications determine what the quote means and how the contract ends.")
    ],
    transfer: {
      prompt: "A contract represents 100 units and is quoted at 82.40. State the notional value and which position benefits from a rise to 83.10.",
      answer: "Notional value is 82.40 × 100 = $8,240 if the quote is dollars per unit. The long benefits from the 0.70 rise."
    },
    sources: ["nfaOutline", "cmeFutures", "cftcGlossary"]
  },
  {
    module: 1,
    slug: "offset-clearing-delivery",
    title: "Offset, clearing, or delivery",
    objective: "Trace a futures position from execution to offset, settlement, or delivery and explain the clearinghouse's role.",
    hook: "The person on the other side of the trade can disappear; your cleared obligation remains.",
    model: `<div class="flow"><span>Buyer ↔ Seller</span><b>novation</b><span>Buyer ↔ Clearinghouse ↔ Seller</span><b>exit</b><span>Offset / settlement / delivery</span></div>`,
    concept: [
      `After a trade is accepted for clearing, the clearinghouse becomes the buyer to every clearing seller and the seller to every clearing buyer. Clearing members interface directly with the clearinghouse; customers commonly reach clearing through an FCM. This structure manages, but does not magically eliminate, performance risk.`,
      `An <strong>offset</strong> is an equal and opposite transaction in the same contract month: a long sells, or a short buys. Because both trades clear to the same central counterparty, the position closes. Most futures positions are liquidated before delivery.`,
      `Contracts can use physical delivery or cash settlement. Physical-delivery contracts specify grades, premiums/discounts, locations, notice procedures, and documents such as warehouse receipts. First notice day and last trading day are distinct contract-specific dates. An exchange for physical (EFP) is a privately negotiated exchange of a futures position for a corresponding cash position, subject to exchange rules.`
    ],
    example: {
      title: "Close the position",
      steps: [
        `A customer buys two September contracts. The open position is long two September.`,
        `Before the delivery period, the customer sells two September contracts.`,
        `The equal and opposite position in the same month offsets to zero. Selling October instead would create an intermonth spread, not close September.`
      ]
    },
    questions: [
      q("A trader is long three May contracts. Which action offsets the position?", ["Buy three July", "Sell three May", "Sell three July", "Take delivery immediately"], 1, "Offset requires the opposite transaction in the same contract month and quantity."),
      q("After clearing, the clearinghouse generally becomes…", ["Only recordkeeper", "Buyer to each seller and seller to each buyer", "Owner of the commodity", "The customer's advisor"], 1, "The clearinghouse interposes itself between clearing counterparties."),
      q("Selling October while remaining long September creates…", ["A complete offset", "A calendar/interdelivery spread", "A cash position", "An option straddle"], 1, "Different months remain open as two legs of a spread.")
    ],
    transfer: {
      prompt: "A short December position is nearing the contract's notice period, but the trader does not intend to deliver. What is the direct closing transaction, and what should be checked first?",
      answer: "Buy the same number of December contracts to offset. Check the exchange's actual first notice, last trading, and liquidation rules before the relevant deadlines."
    },
    sources: ["nfaOutline", "cftcPurpose", "cftcBasics"]
  },
  {
    module: 2,
    slug: "ticks-and-futures-profit-loss",
    title: "Turn a quote into dollars",
    objective: "Calculate tick value and futures profit or loss from stated contract specifications.",
    hook: "The exam's most reusable move is translating a quoted price change into contract dollars.",
    model: `<div class="equation"><span>price change</span><b>×</b><span>contract unit</span><b>×</b><span>contracts</span><b>=</b><span>dollar P/L</span></div>`,
    concept: [
      `A <strong>tick</strong> is the contract's minimum quoted price movement. Tick value = tick size × contract unit, after correctly interpreting the quote. Contract specifications control the conversion.`,
      `For a long, P/L = (exit price − entry price) × unit × contracts. For a short, reverse the price difference: (entry − exit) × unit × contracts. Subtract commissions and fees when asked for net profit.`,
      `Do not divide by margin to calculate dollar profit. Margin affects leverage and return on equity, not the contract's dollar price change.`
    ],
    example: {
      title: "Long futures P/L",
      steps: [
        `Simplified contract: 5,000 units; tick = $0.0025 per unit. Tick value = 5,000 × $0.0025 = <strong>$12.50</strong>.`,
        `Buy at $6.1000 and sell at $6.1800: price change = $0.0800.`,
        `Gross profit = $0.0800 × 5,000 = <strong>$400</strong>. Equivalently, 32 ticks × $12.50.`
      ]
    },
    questions: [
      q("A contract covers 2,000 units and its minimum move is $0.005. Tick value is…", ["$0.005", "$4", "$10", "$100"], 2, "2,000 × $0.005 = $10."),
      q("A trader shorts one 1,000-unit contract at 54.20 and offsets at 53.70. Gross result?", ["$500 profit", "$500 loss", "$50 profit", "$50 loss"], 0, "Short P/L = (54.20 − 53.70) × 1,000 = $500 profit."),
      q("Two contracts each gain $375 before $40 total commissions. Net profit is…", ["$335", "$710", "$750", "$790"], 1, "Gross is 2 × $375 = $750; subtract $40 = $710.")
    ],
    transfer: {
      prompt: "A 50-unit contract moves from 1,982.5 to 1,976.0. Calculate one-contract P/L for a short and for a long.",
      answer: "The move is 6.5 points × 50 = $325. The short gains $325; the long loses $325."
    },
    sources: ["nfaOutline", "cmeFutures", "cftcGlossary"]
  },
  {
    module: 2,
    slug: "margin-marking-leverage",
    title: "Margin and daily settlement",
    objective: "Update a futures margin account and determine when a margin call occurs.",
    hook: "Futures margin is not the price of the contract; it is collateral supporting a daily obligation.",
    model: `<div class="meter"><span>Initial margin</span><span>Daily ± P/L</span><span>Maintenance line</span><span>Restore to initial</span></div>`,
    concept: [
      `Futures <strong>initial margin</strong> is a performance bond. <strong>Maintenance margin</strong> is the equity threshold below which additional funds are generally required. Exchanges/clearinghouses establish minimums; an FCM may require more.`,
      `Open positions are <strong>marked to market</strong>: gains are credited and losses debited through daily settlement. If equity falls below maintenance, a margin call commonly restores the account to the initial requirement. Exact timing and house rules can differ.`,
      `Leverage comes from controlling a large notional exposure with smaller posted collateral. Return on margin equity = profit or loss ÷ relevant margin investment, when the question specifies that basis. High percentage returns and losses can result.`
    ],
    example: {
      title: "Follow account equity",
      steps: [
        `Initial margin = $4,000; maintenance = $3,200. Customer deposits $4,000.`,
        `Day-one loss = $550 → equity $3,450. No call because equity remains above $3,200.`,
        `Day-two loss = $400 → equity $3,050, below maintenance. Call = $4,000 − $3,050 = <strong>$950</strong> to restore initial.`
      ]
    },
    questions: [
      q("Futures margin is best understood as…", ["A down payment transferring ownership", "A performance bond supporting obligations", "The maximum possible loss", "The option premium"], 1, "Futures margin is collateral, not partial payment for the underlying."),
      q("Initial margin is $6,000 and maintenance is $4,800. Equity falls to $4,650. Typical call amount?", ["$150", "$1,200", "$1,350", "$4,800"], 2, "Below maintenance, restore to initial: $6,000 − $4,650 = $1,350."),
      q("A $1,200 profit on $6,000 margin represents what return on margin equity?", ["5%", "20%", "50%", "500%"], 1, "$1,200 ÷ $6,000 = 20%. This measure also magnifies losses.")
    ],
    transfer: {
      prompt: "Initial margin is $5,500, maintenance is $4,400, and equity is $4,450 before a $175 daily loss. Is there a call, and for how much under the restore-to-initial convention?",
      answer: "New equity is $4,275, below maintenance. The call is $5,500 − $4,275 = $1,225."
    },
    sources: ["nfaOutline", "cftcBasics", "cmeFutures"]
  },
  {
    module: 3,
    slug: "term-structure-and-carry",
    title: "Read the futures curve",
    objective: "Classify a normal or inverted market and connect the shape to carrying charges or scarcity.",
    hook: "The same commodity can have several prices at once because each delivery month is a different contract.",
    model: `<div class="curve"><span>Nearby 72</span><i>↗ normal</i><span>Deferred 75</span><em>or</em><span>Nearby 78</span><i>↘ inverted</i><span>Deferred 75</span></div>`,
    concept: [
      `In Series 3 terminology, a <strong>normal market</strong> generally has deferred futures prices above nearby prices. Storage, insurance, financing, and other carrying charges can support that relationship. A <strong>full-carry</strong> market reflects the maximum economically sustainable cost of carrying the commodity between months, subject to the market's actual rules and constraints.`,
      `An <strong>inverted market</strong> has nearby prices above deferred prices. Immediate scarcity or strong near-term demand can make available supply more valuable now than later.`,
      `The curve can change without every contract moving in the same direction or amount. Spread traders focus on the price relationship between months, not simply whether the outright market rises or falls.`
    ],
    example: {
      title: "Classify two curves",
      steps: [
        `May = 610; July = 618; September = 625. Deferred prices rise with time: <strong>normal</strong>.`,
        `May = 640; July = 626; September = 620. Nearby is highest: <strong>inverted</strong>.`,
        `The labels describe relative delivery-month prices, not a guarantee about future spot prices.`
      ]
    },
    questions: [
      q("Nearby is 81 and deferred is 84. The structure is generally…", ["Inverted", "Normal", "Locked limit", "At parity"], 1, "Deferred above nearby is the usual Series 3 normal-market pattern."),
      q("Which condition can support an inverted market?", ["Immediate supply shortage", "Abundant immediately available inventory only", "Guaranteed delivery failure", "Lower nearby demand with no other change"], 0, "Near-term scarcity can create a premium for nearby delivery."),
      q("Carrying charges can include…", ["Storage, insurance, and financing", "Only exchange commissions", "Only option premiums", "Only variation margin"], 0, "Cost of carry commonly includes storage, insurance, financing, and related holding costs.")
    ],
    transfer: {
      prompt: "August is 102.40 and December is 99.10. Classify the curve and give one plausible economic explanation without claiming certainty.",
      answer: "It is inverted because nearby August exceeds deferred December. One plausible explanation is tight immediate supply or strong near-term demand; the curve alone does not prove the cause."
    },
    sources: ["nfaOutline", "cftcGlossary", "cmeFutures"]
  },
  {
    module: 3,
    slug: "basis-and-convergence",
    title: "Basis and convergence",
    objective: "Calculate basis and identify whether it strengthened or weakened.",
    hook: "A hedge result depends less on the price level than on the relationship between cash and futures.",
    model: `<div class="equation"><span>cash price</span><b>−</b><span>futures price</span><b>=</b><span>basis</span></div>`,
    concept: [
      `<strong>Basis = local cash price − relevant futures price.</strong> Basis can be positive or negative. A move from −20¢ to −8¢ is strengthening because it becomes more positive; a move from +10¢ to −5¢ is weakening.`,
      `Cash and futures prices generally converge as the delivery period approaches because delivery or settlement links the two markets. Location, grade, transportation, timing, and contract terms can make a local cash basis differ from zero.`,
      `<strong>Basis risk</strong> is the risk that basis changes unexpectedly. Futures can offset broad price movement while a changing basis improves or worsens the effective price.`
    ],
    example: {
      title: "Track basis",
      steps: [
        `Start: cash $5.80, futures $6.00 → basis = $5.80 − $6.00 = <strong>−$0.20</strong>.`,
        `End: cash $5.47, futures $5.55 → basis = <strong>−$0.08</strong>.`,
        `Basis strengthened by $0.12 because −$0.08 is more positive than −$0.20.`
      ]
    },
    questions: [
      q("Cash is 74.25 and futures is 75.10. Basis equals…", ["+0.85", "−0.85", "149.35", "0"], 1, "Cash − futures = 74.25 − 75.10 = −0.85."),
      q("Basis moves from −0.30 to −0.12. It has…", ["Strengthened by 0.18", "Weakened by 0.18", "Strengthened by 0.42", "Not changed"], 0, "The basis became more positive by 0.18."),
      q("Why should cash and futures converge near delivery?", ["Margin becomes zero", "Delivery/settlement links the markets and permits arbitrage pressure", "All grades become identical", "The clearinghouse sets the cash price"], 1, "The contract's settlement mechanism ties deliverable cash value to futures value.")
    ],
    transfer: {
      prompt: "Cash changes from 3.92 to 4.28 while futures changes from 4.05 to 4.33. Calculate both bases and describe the change.",
      answer: "Initial basis = −0.13. Ending basis = −0.05. Basis strengthened by 0.08."
    },
    sources: ["nfaOutline", "cftcPurpose", "cftcGlossary"]
  },
  {
    module: 3,
    slug: "short-and-long-hedges",
    title: "Build a futures hedge",
    objective: "Choose a short or long hedge and calculate the effective cash price after offset.",
    hook: "Hedge direction is determined by the cash risk: future sellers fear down; future buyers fear up.",
    model: `<div class="compare"><div><strong>Future seller</strong><small>short hedge • fears ↓</small></div><div><strong>Future buyer</strong><small>long hedge • fears ↑</small></div></div>`,
    concept: [
      `A producer, inventory holder, or other expected seller normally uses a <strong>short hedge</strong>. A processor, manufacturer, exporter with a purchase commitment, or other expected buyer normally uses a <strong>long hedge</strong>.`,
      `For matched units, a short hedge's effective sale price = cash sale price + futures gain/loss. A long hedge's effective purchase cost = cash purchase price − futures gain/loss. Both simplify to initial futures price + ending basis when the futures position is offset.`,
      `The initial basis helps set expectations, while the ending basis determines the realized effective price. Short hedgers benefit from a strengthening basis; long hedgers benefit from a weakening basis.`
    ],
    example: {
      title: "Short hedge result",
      steps: [
        `Farmer sells futures at $6.10. Later, cash wheat is sold at $5.48 and futures are bought back at $5.55.`,
        `Futures gain = $6.10 − $5.55 = $0.55. Effective sale price = $5.48 + $0.55 = <strong>$6.03</strong>.`,
        `Check with basis: ending basis = $5.48 − $5.55 = −$0.07; $6.10 + (−$0.07) = $6.03.`
      ]
    },
    questions: [
      q("A manufacturer will buy copper in four months. The conventional hedge is…", ["Short futures", "Long futures", "Sell cash copper now", "Long inventory"], 1, "A future buyer is hurt by rising prices and uses a long hedge."),
      q("A short hedger sells futures at 80, sells cash at 73, and buys futures at 75. Effective sale price?", ["68", "73", "78", "82"], 2, "Futures gain is 5; cash 73 + 5 = 78."),
      q("Which basis change benefits a long hedger?", ["Strengthening", "Weakening", "No possible change", "Only a move to exactly zero"], 1, "Effective purchase cost = initial futures + ending basis; a weaker/lower basis reduces cost.")
    ],
    transfer: {
      prompt: "A bakery buys futures at 520, later buys the cash commodity at 555, and sells futures at 548. What is its effective purchase cost?",
      answer: "Futures gain = 548 − 520 = 28. Effective cash cost = 555 − 28 = 527. Ending basis is 555 − 548 = 7; 520 + 7 = 527."
    },
    sources: ["nfaOutline", "cftcPurpose", "cftcBasics"]
  },
  {
    module: 4,
    slug: "order-types",
    title: "Choose the order",
    objective: "Select an order type from a customer's priority for execution or price control.",
    hook: "Every order trades one uncertainty for another: execution certainty, price certainty, timing, or trigger behavior.",
    model: `<div class="decision"><b>Priority?</b><span>Execute now → Market</span><span>Price or better → Limit</span><span>Activate beyond trigger → Stop / stop-limit</span></div>`,
    concept: [
      `A <strong>market order</strong> prioritizes prompt execution but not a specific price. A <strong>limit order</strong> specifies a price or better but may never fill.`,
      `A <strong>stop order</strong> generally becomes a market order after its stop trigger is reached; it can experience slippage. A <strong>stop-limit</strong> becomes a limit order after triggering; it controls the limit but may remain unfilled. A market-if-touched order is generally placed on the favorable side of the current market and becomes a market order when touched—the opposite trigger logic from a stop.`,
      `Time and contingency instructions include GTC, fill-or-kill, market-on-close, and one-cancels-the-other. Electronic-platform availability and trigger conventions vary, so live orders require current exchange/FCM rules.`
    ],
    example: {
      title: "Protect a long position",
      steps: [
        `A trader is long at 100 and wants an order to activate if the market falls to 96.`,
        `A sell stop at 96 is the conventional protective instruction. Once triggered, it seeks execution as a market order.`,
        `It does not guarantee a 96 fill. A sell stop-limit adds price control but creates non-execution risk in a fast decline.`
      ]
    },
    questions: [
      q("Which order prioritizes execution rather than price?", ["Market", "Limit", "Stop-limit", "GTC limit"], 0, "A market order seeks prompt execution at available prices."),
      q("After triggering, a stop-limit order becomes…", ["A market order", "A limit order", "A canceled order", "An option"], 1, "Its limit protects price but can prevent a fill."),
      q("A sell limit is normally placed…", ["Below the current market only", "At a specified price or higher", "Only at the close", "At any price with guaranteed execution"], 1, "A sell limit requires its limit price or better (higher).")
    ],
    transfer: {
      prompt: "A customer must buy promptly and accepts an uncertain fill price. Which order fits? If instead the customer refuses to pay above 72.40, what changes?",
      answer: "Use a market order for prompt execution. Use a buy limit at 72.40 for price control, accepting that it may not fill."
    },
    sources: ["nfaOutline", "cftcGlossary", "cmeFutures"]
  },
  {
    module: 4,
    slug: "price-analysis",
    title: "Separate fundamental and technical signals",
    objective: "Classify common price inputs as fundamental or technical and infer their directional implication cautiously.",
    hook: "Fundamentals ask why supply and demand might change; technicals ask what price and participation are doing.",
    model: `<div class="compare"><div><strong>Fundamental</strong><small>supply • demand • policy • weather • rates</small></div><div><strong>Technical</strong><small>trend • support • gaps • volume • open interest</small></div></div>`,
    concept: [
      `Fundamental analysis studies supply, demand, inventories, production, consumption, weather, crop years, elasticity, monetary/fiscal policy, and political or economic events. A factor is not automatically bullish or bearish; connect it to expected supply or demand.`,
      `Technical analysis studies recorded market behavior: charts, trends, support/resistance, congestion, gaps, volume, and open interest. Volume counts trading activity; open interest counts outstanding contracts not yet offset or otherwise terminated.`,
      `Interest-rate markets also use the yield curve. A positive/normal curve generally has longer yields above shorter yields; an inverted curve has shorter yields above longer yields; a flat curve has little difference. Policy expectations can shift the curve.`
    ],
    example: {
      title: "Reason from supply",
      steps: [
        `Unexpected drought lowers expected crop production while demand is unchanged.`,
        `Lower expected supply is a fundamental factor that tends to support higher prices, all else equal.`,
        `A chart breakout on high volume would be technical evidence; it does not prove the drought caused the move.`
      ]
    },
    questions: [
      q("A government crop report cuts expected production. This is primarily…", ["Technical analysis", "Fundamental analysis", "A stop order", "Open interest"], 1, "Production changes affect expected supply."),
      q("Open interest measures…", ["All contracts traded during the day", "Outstanding contracts not yet terminated", "Only long customer accounts", "Cash-market inventory"], 1, "Volume is transactions; open interest is outstanding contract interest."),
      q("Short-term yields above long-term yields describe a generally…", ["Positive curve", "Inverted curve", "Full-carry commodity market", "Locked-limit market"], 1, "An inverted yield curve has shorter yields above longer yields.")
    ],
    transfer: {
      prompt: "Classify each: a trendline break, a central-bank rate change, rising open interest, and a plant shutdown that reduces supply.",
      answer: "Trendline break and rising open interest are technical. The rate change and supply-reducing shutdown are fundamental."
    },
    sources: ["nfaOutline", "cftcGlossary"]
  },
  {
    module: 4,
    slug: "futures-speculation",
    title: "Construct a speculative futures trade",
    objective: "Given a directional view and risk constraint, choose the position, protective order, and calculate net return on margin.",
    hook: "A view is not a complete trade until direction, size, exit, risk, and cost are explicit.",
    model: `<div class="flow"><span>View</span><b>→</b><span>Long / short</span><b>→</b><span>Protective order</span><b>→</b><span>Net P/L ÷ margin</span></div>`,
    concept: [
      `A bullish futures view maps to a long position; a bearish view maps to a short position. The position is leveraged, so a small price move relative to notional value can be large relative to margin.`,
      `A protective sell stop can be used below a long; a protective buy stop can be used above a short. Stops do not guarantee the trigger price, especially through gaps or locked-limit conditions.`,
      `Gross P/L comes from price movement × unit × contracts. Net P/L subtracts commissions and fees. Return on margin equity = net P/L ÷ stated margin investment. Ensure the question's denominator and whether commissions are round-turn or per side.`
    ],
    example: {
      title: "Net result and return",
      steps: [
        `Buy two contracts at 118.20 and sell at 119.05. Unit = 1,000; total commissions = $80.`,
        `Gross = 0.85 × 1,000 × 2 = $1,700. Net = $1,700 − $80 = <strong>$1,620</strong>.`,
        `If total margin invested was $9,000, return = $1,620 ÷ $9,000 = <strong>18%</strong>.`
      ]
    },
    questions: [
      q("A bearish speculator normally initiates…", ["A long futures position", "A short futures position", "A long cash hedge", "Delivery notice"], 1, "A short benefits from a futures price decline."),
      q("A protective order for a short position is commonly…", ["A sell stop below market", "A buy stop above market", "A buy limit below market only", "A market-on-close sale"], 1, "The short is harmed by a rise; a buy stop can activate above the market."),
      q("Net profit is $900 on $6,000 margin. Return on margin is…", ["6.7%", "15%", "66.7%", "150%"], 1, "$900 ÷ $6,000 = 15%.")
    ],
    transfer: {
      prompt: "A short earns $1,250 gross, pays $70 total costs, and used $5,900 margin. Calculate net profit and return on margin.",
      answer: "Net profit is $1,180. Return is $1,180 ÷ $5,900 = 20%."
    },
    sources: ["nfaOutline", "cftcBasics", "cmeFutures"]
  },
  {
    module: 4,
    slug: "futures-spreads",
    title: "Trade a futures spread",
    objective: "Identify spread legs and calculate profit from a change in the quoted price relationship.",
    hook: "A spread trader is long one price relationship and short another, so relative movement matters most.",
    model: `<div class="equation"><span>nearby price</span><b>−</b><span>deferred price</span><b>=</b><span>spread</span></div>`,
    concept: [
      `An <strong>intramarket/interdelivery</strong> spread uses different months of the same commodity. An <strong>intermarket</strong> spread uses related but different markets. This lesson quotes an interdelivery spread as nearby minus deferred; always follow the convention stated in a question.`,
      `A conventional bull spread buys nearby and sells deferred; it benefits when nearby strengthens relative to deferred—the quoted spread rises. A bear spread sells nearby and buys deferred; it benefits when the quoted spread falls.`,
      `Spread P/L can be calculated leg by leg. Exchanges may give reduced margin for recognized spreads because relative-price risk can be lower than two unrelated outright positions, but margin is contract- and portfolio-specific.`
    ],
    example: {
      title: "Bull spread widens",
      steps: [
        `Buy May at 610 and sell July at 622. Initial May − July spread = −12.`,
        `Later May = 618 and July = 625. Ending spread = −7. The spread rose/widened in the bull spread's favor by 5.`,
        `Leg check: May gains 8; July short loses 3; net = <strong>+5 quote units</strong> × contract conversion.`
      ]
    },
    questions: [
      q("Buy March and sell May of the same commodity is…", ["Intermarket spread", "Interdelivery spread", "Straddle", "Offset"], 1, "Different months of the same market form an interdelivery/calendar spread."),
      q("With spread = nearby − deferred, a bull spread benefits when the spread…", ["Rises", "Falls", "Must equal zero", "Becomes locked limit"], 0, "The trader is long nearby and short deferred, so relative nearby strength helps."),
      q("Buy corn and sell wheat is best classified as…", ["Intermarket spread", "Interdelivery spread", "Offset", "Conversion"], 0, "It uses two related but different markets.")
    ],
    transfer: {
      prompt: "Sell nearby at 94 and buy deferred at 98. Later nearby is 91 and deferred is 97. Calculate the leg result and identify whether the bear spread worked.",
      answer: "Nearby short gains 3; deferred long loses 1; net gain is 2 quote units. The spread moved from −4 to −6, so it fell as a bear spread expects."
    },
    sources: ["nfaOutline", "cftcGlossary", "cmeFutures"]
  },
  {
    module: 5,
    slug: "option-rights-and-obligations",
    title: "Option rights and obligations",
    objective: "Determine the market right, obligation, directional view, and expiration value of a call or put.",
    hook: "An option buyer purchases a choice; the writer accepts a contingent obligation.",
    model: `<div class="compare"><div><strong>Call</strong><small>right to buy futures • bullish buyer</small></div><div><strong>Put</strong><small>right to sell futures • bearish buyer</small></div></div>`,
    concept: [
      `A call buyer has the right, but not the obligation, to buy the underlying futures at the strike price. A put buyer has the right to sell futures at the strike. The buyer pays premium; the writer receives premium and accepts assignment risk.`,
      `At expiration, a call's intrinsic value is max(0, futures price − strike). A put's is max(0, strike − futures price). In-the-money means positive intrinsic value; at-the-money is approximately at the strike; out-of-the-money means zero intrinsic value.`,
      `A long option's loss is limited to premium paid. An uncovered call writer can face theoretically unlimited price risk; an uncovered put writer can face very large downside risk. Exact exercise, assignment, and settlement procedures are contract-specific.`
    ],
    example: {
      title: "Value at expiration",
      steps: [
        `A 70 call expires when futures are 76. Intrinsic value = 76 − 70 = <strong>6</strong>.`,
        `A 70 put at the same futures price is out-of-the-money: max(0, 70 − 76) = <strong>0</strong>.`,
        `To convert quote units to dollars, multiply by the option contract's stated value per unit.`
      ]
    },
    questions: [
      q("A put buyer has the right to…", ["Buy futures at the strike", "Sell futures at the strike", "Receive unlimited premium", "Avoid expiration"], 1, "A put conveys a selling right."),
      q("A 55 call expires with futures at 61. Intrinsic value is…", ["0", "6", "55", "61"], 1, "Call intrinsic = max(0, 61 − 55) = 6."),
      q("Who has an assignment obligation?", ["The option buyer", "The option writer", "Only the clearinghouse", "The cash commodity buyer"], 1, "The writer receives premium in exchange for the contingent obligation.")
    ],
    transfer: {
      prompt: "Futures settle at 92. Calculate expiration intrinsic value for an 88 call and a 96 put, then name each as ITM or OTM.",
      answer: "The 88 call is ITM by 4. The 96 put is ITM by 4. Both have 4 of intrinsic value."
    },
    sources: ["nfaOutline", "cftcBasics", "cmeOptions"]
  },
  {
    module: 5,
    slug: "option-premium-and-delta",
    title: "Decompose an option premium",
    objective: "Separate premium into intrinsic and time value and use delta as an approximate sensitivity.",
    hook: "Before expiration, an option can be worth more than immediate exercise value because time preserves possibility.",
    model: `<div class="equation"><span>premium</span><b>=</b><span>intrinsic value</span><b>+</b><span>time value</span></div>`,
    concept: [
      `<strong>Time value = premium − intrinsic value.</strong> At expiration, time value is zero. Before expiration, time value reflects remaining time, volatility, and other pricing inputs. At-the-money options commonly have no intrinsic value but can have substantial time value.`,
      `<strong>Delta</strong> estimates the option premium's change for a one-unit change in the underlying futures price, all else equal. Call deltas are generally between 0 and +1; put deltas between −1 and 0. Delta changes as market conditions change and is not a guaranteed price move.`,
      `Premium quotations must be converted using the contract's stated multiplier or dollar value. The option buyer pays premium; the writer receives it. An option buyer does not post futures-style margin merely to own a fully paid option, though an exercised futures position may require margin.`
    ],
    example: {
      title: "Find time value",
      steps: [
        `Futures = 74; 70 call premium = 6.50. Intrinsic value = 74 − 70 = 4.00.`,
        `Time value = 6.50 − 4.00 = <strong>2.50</strong>.`,
        `If delta is +0.60 and futures rise 1.00, premium is estimated to rise about 0.60, all else equal.`
      ]
    },
    questions: [
      q("Futures are 48. A 50 put trades at 3.25. Time value is…", ["1.25", "2.00", "3.25", "5.25"], 0, "Put intrinsic is 2; time value = 3.25 − 2 = 1.25."),
      q("An at-the-money option before expiration can have…", ["Only intrinsic value", "Time value despite zero intrinsic value", "No premium", "Guaranteed exercise"], 1, "Remaining possibility can give an ATM option time value."),
      q("A call delta of +0.40 means a one-point futures rise is estimated to change premium by…", ["−1.00", "−0.40", "+0.40", "+1.40"], 2, "Delta is an approximate sensitivity, holding other inputs constant.")
    ],
    transfer: {
      prompt: "Futures are 105. A 110 put premium is 7.80. Find intrinsic and time value. If delta is −0.65 and futures rise 2 points, estimate the premium change.",
      answer: "Intrinsic = 5.00; time value = 2.80. Delta estimate = −0.65 × 2 = −1.30, so premium would fall about 1.30, all else equal."
    },
    sources: ["nfaOutline", "cftcGlossary", "cmeOptions"]
  },
  {
    module: 5,
    slug: "long-option-trades",
    title: "Calculate a long option trade",
    objective: "Calculate breakeven, maximum loss, and expiration profit for a long call or long put.",
    hook: "A long option converts an uncertain market move into an asymmetric payoff with a known premium at risk.",
    model: `<div class="compare"><div><strong>Long call</strong><small>BE = strike + premium</small></div><div><strong>Long put</strong><small>BE = strike − premium</small></div></div>`,
    concept: [
      `Long call expiration profit per unit = max(0, futures − strike) − premium. Breakeven = strike + premium. Maximum loss is premium; upside is theoretically unlimited as futures rise.`,
      `Long put expiration profit per unit = max(0, strike − futures) − premium. Breakeven = strike − premium. Maximum loss is premium; profit grows as futures fall, bounded by how low the underlying can go.`,
      `For dollar results, multiply quote-unit profit by the contract's dollar value and contracts. Include commissions when the question requests net profit or return on premium.`
    ],
    example: {
      title: "Long call at expiration",
      steps: [
        `Buy 80 call for 3.00. Breakeven = 80 + 3 = <strong>83</strong>. Maximum loss = 3.00.`,
        `At futures 88, intrinsic value = 8. Profit = 8 − 3 = <strong>5 per unit</strong>.`,
        `If each point is $100, dollar profit = 5 × $100 = <strong>$500</strong>.`
      ]
    },
    questions: [
      q("Buy a 65 put for 2.50. Expiration breakeven is…", ["62.50", "65.00", "67.50", "70.00"], 0, "Long put BE = strike − premium = 62.50."),
      q("Maximum loss for a long call, ignoring costs, is…", ["Unlimited", "The strike", "The premium paid", "The contract notional"], 2, "The buyer can let an unfavorable option expire; premium is at risk."),
      q("Buy 50 call for 4. Futures finish at 57. Profit per unit is…", ["3", "4", "7", "11"], 0, "Intrinsic 7 − premium 4 = 3.")
    ],
    transfer: {
      prompt: "Buy a 90 put for 4.50; each point is $50. Futures expire at 82. Calculate breakeven, profit per unit, and dollar profit.",
      answer: "Breakeven = 85.50. Intrinsic = 8; profit = 8 − 4.50 = 3.50 per unit; dollar profit = $175."
    },
    sources: ["nfaOutline", "cmeOptions", "cmeStrategies"]
  },
  {
    module: 5,
    slug: "options-as-hedges",
    title: "Use options as price insurance",
    objective: "Choose a long put or long call hedge and calculate the protected effective price at expiration.",
    hook: "Futures lock a relationship; long options establish a floor or ceiling while preserving favorable price movement.",
    model: `<div class="compare"><div><strong>Future seller</strong><small>buy put → price floor</small></div><div><strong>Future buyer</strong><small>buy call → price ceiling</small></div></div>`,
    concept: [
      `A future seller can buy a put instead of selling futures. The put creates downside protection while allowing benefit if cash/futures prices rise. A future buyer can buy a call to cap upside price risk while retaining benefit if prices fall.`,
      `The premium is the cost of this asymmetry. Ignoring basis and costs, a long put's approximate minimum net selling price is strike − premium; a long call's approximate maximum net purchase price is strike + premium.`,
      `Long futures + long put resembles a synthetic long call. Short futures + long call resembles a synthetic long put. These combinations describe payoff shape; contract matching and basis still matter.`
    ],
    example: {
      title: "Producer buys a put",
      steps: [
        `Producer buys a 70 put for 2. Futures and local cash later are both 61 for this simplified no-basis example.`,
        `Put value = 70 − 61 = 9. Net cash result = 61 + 9 − 2 premium = <strong>68</strong>.`,
        `The floor is strike 70 − premium 2 = 68. If prices had risen, the producer could sell cash higher and let the put expire.`
      ]
    },
    questions: [
      q("A producer wanting a floor with upside participation generally buys…", ["A call", "A put", "A futures spread only", "A warehouse receipt"], 1, "A long put gains as the market falls and can expire if the market rises."),
      q("A buyer pays 3 for an 80 call. Ignoring basis, approximate price ceiling is…", ["77", "80", "83", "Unlimited with no protection"], 2, "Strike + premium = 83."),
      q("Long futures plus long put has a payoff resembling…", ["Long call", "Short call", "Short put", "Short straddle"], 0, "The put limits downside while the long futures preserves upside: a synthetic long call shape.")
    ],
    transfer: {
      prompt: "A processor buys a 120 call for 4. Cash and futures later rise to 134 in a no-basis example. Calculate the effective purchase cost after call value and premium.",
      answer: "Call value is 14. Effective cost = 134 − 14 + 4 = 124, equal to strike + premium."
    },
    sources: ["nfaOutline", "cmeOptions", "cmeStrategies"]
  },
  {
    module: 5,
    slug: "vertical-option-spreads",
    title: "Build a vertical option spread",
    objective: "Calculate breakeven, maximum gain, and maximum loss for four basic vertical spreads.",
    hook: "A vertical spread exchanges some profit potential for a lower, defined net cost or risk.",
    model: `<div class="grid4"><span>Bull call: debit</span><span>Bear put: debit</span><span>Bear call: credit</span><span>Bull put: credit</span></div>`,
    concept: [
      `A <strong>bull call</strong> buys the lower strike call and sells the higher: debit; max loss = debit; max gain = strike width − debit; BE = lower strike + debit. A <strong>bear put</strong> buys the higher strike put and sells the lower: debit; max loss = debit; max gain = width − debit; BE = higher strike − debit.`,
      `A <strong>bear call</strong> sells the lower strike call and buys the higher: credit; max gain = credit; max loss = width − credit; BE = lower strike + credit. A <strong>bull put</strong> sells the higher strike put and buys the lower: credit; max gain = credit; max loss = width − credit; BE = higher strike − credit.`,
      `A calendar spread uses different expirations. A conversion or reversal combines options and futures to exploit pricing relationships; detailed execution depends on costs, exercise features, and contract rules.`
    ],
    example: {
      title: "Bull call spread",
      steps: [
        `Buy 60 call for 7 and sell 70 call for 2. Net debit = 5; strike width = 10.`,
        `Maximum loss = <strong>5</strong>. Maximum gain = 10 − 5 = <strong>5</strong>.`,
        `Breakeven = lower strike 60 + debit 5 = <strong>65</strong>.`
      ]
    },
    questions: [
      q("A bull call spread buys the…", ["Higher call and sells lower", "Lower call and sells higher", "Higher put and sells lower", "Same call twice"], 1, "The lower-strike long call supplies bullish exposure; the short higher call caps it."),
      q("A 10-point-wide debit spread costs 3. Maximum gain is…", ["3", "7", "10", "13"], 1, "For a vertical debit spread, max gain = width − debit = 7."),
      q("A bear call credit spread receives 2 with 8-point width. Maximum loss is…", ["2", "6", "8", "10"], 1, "Max loss = width − credit = 6.")
    ],
    transfer: {
      prompt: "A bull put spread sells a 90 put for 6 and buys an 80 put for 2. Find net credit, breakeven, maximum gain, and maximum loss.",
      answer: "Credit = 4. Breakeven = 90 − 4 = 86. Maximum gain = 4. Maximum loss = 10 width − 4 = 6."
    },
    sources: ["nfaOutline", "cmeStrategies"]
  },
  {
    module: 6,
    slug: "regulators-and-registrants",
    title: "Map the regulatory system",
    objective: "Given a described business, identify the likely registrant role and the CFTC, NFA, or FINRA function involved.",
    hook: "Series 3 regulation becomes manageable when every acronym answers two questions: what does it do, and may it hold customer funds?",
    model: `<div class="flow"><span>CFTC<br><small>federal regulator</small></span><b>oversees</b><span>NFA<br><small>SRO / registration</small></span><b>exam via</b><span>FINRA<br><small>administration</small></span></div>`,
    concept: [
      `The <strong>CFTC</strong> is the federal derivatives regulator. <strong>NFA</strong> is the registered futures association and industry self-regulatory organization. <strong>FINRA</strong> administers the Series 3 examination for NFA; passing alone does not authorize commodity business without the required registration and membership steps.`,
      `An <strong>FCM</strong> solicits or accepts futures/options orders and accepts money or property to margin or secure them. An <strong>IB</strong> solicits or accepts orders but does not accept customer money or property for those trades. A guaranteed IB is backed by a guarantor FCM; an independent IB meets its own financial requirements.`,
      `A <strong>CTA</strong> advises others about commodity interests for compensation or profit. A <strong>CPO</strong> operates or solicits for a pooled vehicle trading commodity interests. An <strong>AP</strong> is an individual who solicits orders, customers, or funds—or supervises those activities—on behalf of a registrant. Floor broker/trader roles and exemptions also appear in the outline; always test the precise facts against current definitions.`
    ],
    example: {
      title: "Identify the firm",
      steps: [
        `Firm A solicits futures orders and accepts customer margin funds. That points to an <strong>FCM</strong>.`,
        `Firm B solicits orders but sends all customer funds to its carrying FCM. That points to an <strong>IB</strong>.`,
        `Person C gives paid, individualized commodity-interest advice. That points toward <strong>CTA</strong> activity, subject to exclusions and exemptions.`
      ]
    },
    questions: [
      q("Which firm may accept customer funds to margin futures trades?", ["IB", "FCM", "CTA only", "AP only"], 1, "Accepting order-related customer money/property is the key FCM distinction.", "reg"),
      q("Which entity administers the Series 3 exam for NFA?", ["CFTC", "FINRA", "CME only", "SEC only"], 1, "Series 3 is an NFA exam administered by FINRA.", "reg"),
      q("A business operating a pooled vehicle that trades commodity interests is generally a…", ["CPO", "CTA only", "Floor broker", "Clearinghouse"], 0, "Operating or soliciting for a commodity pool is CPO activity, subject to current exclusions/exemptions.", "reg")
    ],
    transfer: {
      prompt: "A firm solicits customer futures orders but never accepts customer money; a separate FCM carries the accounts. Identify the likely role and the fund-handling boundary.",
      answer: "The firm is likely an IB. It may solicit/accept orders but must not accept customer money or property for those trades; the FCM handles the customer funds."
    },
    sources: ["nfaOutline", "finra", "nfaProficiency", "cftcBasics", "nfaRules"]
  },
  {
    module: 6,
    slug: "customer-account-protection",
    title: "Open and protect a customer account",
    objective: "Identify the information, disclosure, authorization, fund-handling, and record controls implicated by an account scenario.",
    hook: "Most regulation questions are control questions: who knew what, who authorized what, where did the money go, and who reviewed it?",
    model: `<div class="flow"><span>Know customer</span><b>→</b><span>Risk disclosure</span><b>→</b><span>Written authority</span><b>→</b><span>Supervise & record</span></div>`,
    concept: [
      `NFA Rule 2-30 applies to covered non-ECP customers and requires specified customer information and appropriate risk disclosure. For an active customer who is an individual, the carrying FCM must request updated information at least annually. If the Member determines futures are too risky based on the information, it must so advise the customer and may not make individualized recommendations to that customer.`,
      `Discretionary trading authority generally requires written authorization and heightened supervision. Account opening and activity must be reviewed under the Member's procedures. Time-stamped order records help reconstruct when instructions were received and executed.`,
      `Customer funds carried by an FCM are subject to segregation and handling rules; they are not the firm's operating money. An IB's defining boundary is that it does not accept customer funds for futures trades. Position reporting can apply to hedgers and speculators, while speculative position limits cap specified net positions subject to current rules and exemptions.`
    ],
    example: {
      title: "Spot the control failure",
      steps: [
        `An AP opens a covered retail account without complete financial information and begins choosing trades based on verbal permission.`,
        `The missing customer-information/risk process implicates Rule 2-30. Trading discretion requires documented authority and supervisory controls; verbal permission alone is not the planned control.`,
        `The remedy is not to backdate paperwork. Stop unauthorized discretionary activity, escalate, obtain valid documentation, and follow current firm/NFA procedures.`
      ]
    },
    questions: [
      q("Rule 2-30 primarily addresses…", ["Contract delivery grades", "Customer information and risk disclosure", "Option delta", "Spread margin"], 1, "Rule 2-30 is the NFA customer-information and risk-disclosure rule.", "reg"),
      q("An IB may generally…", ["Accept customer margin into its own account", "Solicit orders but not accept customer funds for them", "Guarantee profits", "Ignore time-stamping"], 1, "The inability to accept customer money/property is central to the IB definition.", "reg"),
      q("Position reporting requirements can apply to…", ["Speculators only", "Hedgers only", "Both hedgers and speculators", "Only option buyers"], 2, "The NFA outline expressly includes both hedgers and speculators.", "reg")
    ],
    transfer: {
      prompt: "An active individual customer materially changes employment and financial circumstances. What control should occur, and what may follow if futures are now assessed as too risky?",
      answer: "Refresh the customer information and reassess risk disclosure under Rule 2-30 procedures. If futures are determined too risky, advise the customer and do not make individualized recommendations."
    },
    sources: ["nfaOutline", "nfaRules", "nfaRequirements", "cftcLimits"]
  },
  {
    module: 6,
    slug: "communications-supervision-enforcement",
    title: "Communicate, supervise, and enforce",
    objective: "Classify a promotional or supervisory fact pattern and identify the appropriate NFA or CFTC response path.",
    hook: "A statement can be literally true and still mislead when material risk, cost, or context is omitted.",
    model: `<div class="decision"><b>Public claim</b><span>Fair & balanced?</span><span>Supportable performance?</span><span>Reviewed & retained?</span><span>No pressure?</span></div>`,
    concept: [
      `NFA Rule 2-4 requires high standards of commercial honor and just and equitable principles of trade. Rule 2-29 governs communications with the public and prohibits misleading or deceptive material and high-pressure sales tactics. Performance presentations require the disclosures, calculations, and context specified by current rules.`,
      `Rule 2-9 requires diligent supervision of employees and agents. Outsourcing an advertisement or buying leads does not erase a Member's responsibilities. CPOs and CTAs also face disclosure-document, performance, fee, conflict, business-background, recordkeeping, and promotional requirements under the applicable rules.`,
      `NFA disciplinary tools include complaints, warning letters, hearings, settlement offers, appeals, member responsibility actions, fines, cease-and-desist orders, suspension, or expulsion as authorized. The CFTC enforces the Commodity Exchange Act and regulations. NFA arbitration provides a forum for covered disputes; customer complaints must be handled and documented under applicable procedures.`
    ],
    example: {
      title: "Evaluate a promotion",
      steps: [
        `An ad says “Our strategy earned 40%” in large type but omits that the example is hypothetical and omits prominent risk and limitation context.`,
        `A numerically accurate figure does not cure a misleading overall impression. Rule 2-29 and current performance-presentation guidance are implicated.`,
        `The Member should prevent use until appropriately reviewed, supported, balanced, disclosed, and retained under its procedures.`
      ]
    },
    questions: [
      q("Which rule governs NFA Member communications with the public?", ["2-4 only", "2-29", "2-30 only", "Registration Rule 401 only"], 1, "Rule 2-29 specifically addresses communications and promotional material.", "reg"),
      q("A Member buys leads generated by a third-party ad. Supervisory responsibility is…", ["Automatically eliminated", "Still relevant; outsourcing does not erase it", "Transferred to the customer", "Only the exchange's concern"], 1, "Members must supervise employees/agents and cannot evade duties through outside lead sources.", "reg"),
      q("Which body brings federal Commodity Exchange Act enforcement actions?", ["CFTC", "FINRA only", "The option buyer", "The clearing customer"], 0, "The CFTC is the federal derivatives regulator; NFA has its own disciplinary process.", "reg")
    ],
    transfer: {
      prompt: "An AP tells a prospect to ‘act today or miss a guaranteed opportunity’ and the branch has never reviewed the script. Identify the two clearest rule themes.",
      answer: "Rule 2-29 concerns misleading/guaranteed claims and high-pressure sales tactics; Rule 2-9 concerns the Member's failure to supervise the AP and sales material."
    },
    sources: ["nfaOutline", "nfaRules", "nfaCommunications", "nfaRequirements"]
  }
];

export const moduleNames = {
  1: "Futures language",
  2: "Contract mathematics",
  3: "Prices and hedging",
  4: "Trading applications",
  5: "Options",
  6: "Regulation"
};

export { q };
