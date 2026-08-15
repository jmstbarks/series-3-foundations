# Futures Market Journey — post-foundation handoff

Status: **implemented as the verified foundational explorable in `simulation/`**.

## Learning promise

Follow one commercial price risk through a low-poly market town: exposure appears, a hedge is selected, an order enters the market, the clearinghouse becomes the counterparty, equity changes through daily settlement, the position is offset or reaches delivery, and a compliance desk reviews the customer-facing conduct.

## Stations

1. **Cash business:** choose producer/inventory-holder or processor/user and identify the adverse price move.
2. **Hedge workshop:** choose short futures or long futures from the cash exposure and calculate whole-contract coverage.
3. **Order gate:** choose an appropriate order and observe fill certainty versus price certainty.
4. **Exchange:** the standardized position is matched and its notional value is calculated; order-book mechanics are explicitly omitted.
5. **Clearinghouse:** the bilateral trade becomes cleared obligations; performance-bond margin is posted.
6. **Settlement clock:** daily price changes credit or debit equity and may trigger a margin call.
7. **Basis bridge:** cash and futures approach convergence; changing basis explains the hedge result.
8. **Exit fork:** offset combines cash price and futures P/L into an effective price; physical delivery is shown only as a conceptual alternative.
9. **Compliance desk:** identify the registrant, required customer information/disclosure, fund-handling boundary, promotional rule, and supervisor.

## Interaction contract

- Pause, resume, advance one station, restart, and change scenario.
- Keyboard accessible and usable on narrow and wide screens.
- Every station has a “why?” layer tied to a verified lesson citation.
- Challenges use new values and scenarios, give immediate feedback, and distinguish teaching simplifications from contract rules.
- Simulation challenges give immediate feedback but do not update a learning record; transfer outside the animation remains the mastery gate.

## Accuracy gate

The implementation is built from `COVERAGE.md` and the reviewed lessons. Its fictional contract values are labeled as assumptions rather than exchange rules. Re-run regulatory freshness and calculation checks before publishing, and see `simulation/README.md` for the full fidelity ledger.
