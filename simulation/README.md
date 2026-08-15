# Futures Market Journey

An offline, dependency-free Series 3 explorable. A grain cart follows one commercial exposure through hedge selection, order entry, exchange matching, clearing, daily settlement, basis change, offset, and a final compliance review. It uses the Learnscape `isometric-explainer` method: a real calculation model underneath, a station-by-station narrated town on top.

## Run it

Open `index.html` directly in a modern browser. It works over `file://` and makes no network requests. For local development you can also serve the workspace root and open `/simulation/`.

## Controls

- **Run hedge** starts a new journey while preserving stations already read.
- **Space** plays or pauses; **S** advances one station; **R** resets and replays the guided tour.
- **F** toggles the follow camera; **L** toggles labels; **Escape** closes About.
- Drag to pan, wheel or pinch to zoom, and double-click or press **⤢** to fit the whole town.
- Business, exposure, futures move, ending basis, slippage, margin, and compliance toggles recalculate the result immediately.

## Pacing

On the first visit to a station, the cart waits 9–26 seconds according to the amount of text at that station. Repeat visits use a short beat. The speed control scales both travel and reading time. `tour.seen` survives **Run**, while **Reset** deliberately clears it so the slow lesson can be replayed.

## Stations

| # | Place | Model event | Core Series 3 idea |
|---:|---|---|---|
| 1 | Cash Business | Identify buyer/seller exposure | Adverse price direction |
| 2 | Hedge Workshop | Select long/short; size contracts | Short hedge vs long hedge |
| 3 | Order Gate | Apply directional slippage | Execution versus price control |
| 4 | Exchange Hall | Calculate matched notional | Standardization and leverage |
| 5 | Clearinghouse | Deposit performance-bond margin | Clearing and counterparty performance |
| 6 | Settlement Clock | Mark the account to market for five days | Variation margin and margin calls |
| 7 | Basis Bridge | Compare cash − futures at start and end | Basis risk and hedge outcome |
| 8 | Exit Fork | Offset and combine cash with futures P/L | Effective buying/selling price |
| 9 | Compliance Desk | Run four explicit rule checks | Disclosures, roles, authority, limits |

Every station includes one immediate retrieval question. The values shown on its map label and in the journey ledger come from `js/model.js`.

## Fidelity ledger

### Computed

- Hedge direction from the commercial exposure: expected seller → short; expected buyer → long.
- Whole contract count, hedged units, and hedge ratio.
- Tick value, directional slippage, fill price, and contract notional.
- Starting basis, ending cash and futures prices, basis change, and strengthening/weakening.
- Futures profit or loss and the combined effective cash buying or selling price.
- Five daily settlement prices, daily variation, cumulative variation, margin balance, maintenance breaches, restore-to-initial calls, and total deposits.
- Four explicit compliance checks: disclosure, FCM custody, documented discretion, and a modeled position limit.

### Scaled

- One visible crate represents one contract and is capped at ten crates; the exact count remains on screen.
- Five settlements and the entire contract lifecycle are compressed into one short trip.
- The cart’s side gauge shows journey completion, not account equity.
- Distances between institutions are spatial storytelling, not physical or latency measurements.

### Assumed

- A fictional contract has 5,000 units and a $0.0025 price tick; these are teaching inputs, not a named exchange contract.
- Defaults are $5.10 initial cash, $5.20 initial futures, 50,000 cash units, and $1,800 initial margin per contract.
- The illustrative daily path uses cumulative fractions `[0, 0.18, 0.42, 0.35, 0.71, 1]` of the chosen total futures move.
- Maintenance margin is 78% of selected initial margin, and a breach is restored to initial margin.
- The order fills immediately with the selected number of adverse ticks.
- Customer funds are held by an FCM and the illustrative position limit is 100 contracts.

### Faked or omitted

- Buildings, roads, crops, the cart, and all travel time are visual metaphor.
- The order book, liquidity, partial fills, exchange matching algorithms, brokerage fees, and intraday margin are omitted.
- The clearinghouse default waterfall, guaranty fund, member tiers, and real margin methodologies are omitted.
- The delivery branch is conceptual; notices, grades, locations, warehouse receipts, and delivery timing are not simulated.
- No actual exchange rule, contract specification, tax treatment, accounting treatment, suitability determination, or complete compliance program is represented.

This explorable is education, not trading advice. Current NFA, CFTC, FINRA, and exchange materials remain authoritative; the companion workspace links and maps those primary sources.

## File map

- `index.html` — semantic shell, controls, modal, and script order.
- `css/styles.css` — full-screen canvas shell, responsive inspector, mobile bottom sheet, and print-like palette.
- `js/iso.js` — unchanged isometric projection and primitive drawing engine.
- `js/model.js` — independent hedge, basis, margin, and compliance arithmetic.
- `js/world.js` — routes, waypoint-anchored stations, lessons, questions, buildings, and props.
- `js/sim.js` — route state machine, visit ledger, reading stops, and carried state.
- `js/render.js` — single depth-sorted Canvas 2D painter pass and live cart markings.
- `js/ui.js` — narration, retrieval feedback, controls, journey ledger, settlement table, and summaries.
- `js/main.js` — camera, input, responsive framing, and animation loop; retained from the Learnscape engine with only project-neutral behavior.

## Architecture

`model.js` is the source of numerical truth. `sim.js` advances the cart by distance and fires a model event only when a waypoint-anchored station is reached; all route transitions live in `advanceRoute()`. `world.js` owns static meaning and geometry. `render.js` reads the current state into a single depth-sorted painter’s pass, while `ui.js` reads that same state into accessible DOM controls and explanations. Neither view owns a second copy of the result, so the cart, labels, tables, and final effective price cannot drift apart.
