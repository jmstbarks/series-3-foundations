import assert from "node:assert/strict";
await import("../js/model.js");

const base = {
  scenario: "producer", exposureUnits: 50000, contractSize: 5000,
  initialCash: 5.10, initialFutures: 5.20, marketMove: -0.60,
  endingBasis: -0.05, tickSize: 0.0025, slippageTicks: 0,
  initialMargin: 1800, maintenanceMargin: 1400,
  riskDisclosure: true, fundsAtFCM: true, discretionary: false,
  writtenAuthority: false, positionLimit: 100
};

const producer = globalThis.Hedge.compute(base);
assert.equal(producer.sideLabel, "short");
assert.equal(producer.contracts, 10);
assert.ok(Math.abs(producer.futuresPnL - 30000) < 1e-8);
assert.ok(Math.abs(producer.finalCash - 4.55) < 1e-8);
assert.ok(Math.abs(producer.effectivePrice - 5.15) < 1e-8);
assert.equal(producer.basisLabel, "strengthened");
assert.equal(producer.compliancePassed, 4);

const processor = globalThis.Hedge.compute({ ...base, scenario: "processor", marketMove: 0.60 });
assert.equal(processor.sideLabel, "long");
assert.ok(Math.abs(processor.futuresPnL - 30000) < 1e-8);
assert.ok(Math.abs(processor.effectivePrice - 5.15) < 1e-8);

const adverseMargin = globalThis.Hedge.compute({ ...base, marketMove: 0.60 });
assert.ok(adverseMargin.totalCalls > 0);
assert.ok(adverseMargin.settlements.some(day => day.marginCall > 0));

const noncompliant = globalThis.Hedge.compute({
  ...base, riskDisclosure: false, discretionary: true, writtenAuthority: false
});
assert.equal(noncompliant.compliancePassed, 2);

const rounded = globalThis.Hedge.compute({ ...base, exposureUnits: 52000 });
assert.equal(rounded.contracts, 10);
assert.ok(Math.abs(rounded.hedgeRatio - 50000 / 52000) < 1e-12);

console.log("PASS simulation model: producer, processor, margin, compliance, rounding");
