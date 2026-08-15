/* model.js: the arithmetic underneath Futures Market Journey.
 *
 * This file is deliberately independent of the town. The cart, gauges and
 * station readouts all consume compute(); none of the outcomes are animated
 * guesses or pre-written answer tables.
 */
(function (global) {
  'use strict';

  var DAY_FRACTIONS = [0, 0.18, 0.42, 0.35, 0.71, 1];

  function roundTo(value, places) {
    var p = Math.pow(10, places || 0);
    return Math.round(value * p) / p;
  }

  function money(value, decimals) {
    var sign = value < 0 ? '−' : '';
    var n = Math.abs(value);
    return sign + '$' + n.toLocaleString('en-US', {
      minimumFractionDigits: decimals == null ? 0 : decimals,
      maximumFractionDigits: decimals == null ? 0 : decimals
    });
  }

  function signedMoney(value) {
    return (value >= 0 ? '+' : '−') + money(Math.abs(value));
  }

  function signedPrice(value) {
    return (value < 0 ? '−$' : '+$') + Math.abs(value).toFixed(2);
  }

  function compute(p) {
    var producer = p.scenario === 'producer';
    var side = producer ? -1 : 1; // short = -1, long = +1
    var sideLabel = producer ? 'short' : 'long';
    var rawContracts = p.exposureUnits / p.contractSize;
    var contracts = Math.max(1, Math.round(rawContracts));
    var hedgedUnits = contracts * p.contractSize;
    var initialBasis = p.initialCash - p.initialFutures;
    var finalFutures = p.initialFutures + p.marketMove;
    var finalCash = finalFutures + p.endingBasis;
    var tickValue = p.tickSize * p.contractSize;
    var slippage = p.slippageTicks * p.tickSize;
    var entryPrice = p.initialFutures + side * slippage;
    var futuresPnL = side * (finalFutures - entryPrice) * hedgedUnits;
    var cashChange = finalCash - p.initialCash;
    var cashBenefit = (producer ? 1 : -1) * cashChange * p.exposureUnits;
    var combinedChange = cashBenefit + futuresPnL;
    var effectivePrice = producer
      ? finalCash + futuresPnL / p.exposureUnits
      : finalCash - futuresPnL / p.exposureUnits;
    var basisChange = p.endingBasis - initialBasis;
    var basisLabel = Math.abs(basisChange) < 0.00001 ? 'unchanged'
      : basisChange > 0 ? 'strengthened' : 'weakened';
    var notional = entryPrice * hedgedUnits;
    var initialMarginTotal = p.initialMargin * contracts;
    var maintenanceTotal = p.maintenanceMargin * contracts;

    var settlements = [];
    var balance = initialMarginTotal;
    var totalCalls = 0;
    var cumulativeVariation = 0;
    for (var i = 1; i < DAY_FRACTIONS.length; i++) {
      var prev = p.initialFutures + p.marketMove * DAY_FRACTIONS[i - 1];
      var price = p.initialFutures + p.marketMove * DAY_FRACTIONS[i];
      var variation = side * (price - prev) * hedgedUnits;
      cumulativeVariation += variation;
      balance += variation;
      var marginCall = 0;
      if (balance < maintenanceTotal) {
        marginCall = initialMarginTotal - balance;
        balance = initialMarginTotal;
        totalCalls += marginCall;
      }
      settlements.push({
        day: i,
        price: price,
        variation: variation,
        cumulativeVariation: cumulativeVariation,
        marginCall: marginCall,
        balance: balance
      });
    }

    var compliance = [
      { label: 'Risk disclosure delivered', pass: !!p.riskDisclosure,
        note: 'Required disclosure precedes the modeled account opening.' },
      { label: 'Customer funds sent to an FCM', pass: p.fundsAtFCM,
        note: 'An IB may solicit or accept orders, but does not accept customer funds.' },
      { label: 'Discretion documented', pass: !p.discretionary || !!p.writtenAuthority,
        note: 'The model treats written authority as required for this discretionary account.' },
      { label: 'Position within modeled limit', pass: contracts <= p.positionLimit,
        note: contracts + ' contract' + (contracts === 1 ? '' : 's') +
          ' versus an illustrative limit of ' + p.positionLimit + '.' }
    ];
    var compliancePassed = compliance.filter(function (c) { return c.pass; }).length;

    var stages = [
      { id: 'exposure', label: 'Cash exposure', value: p.exposureUnits.toLocaleString() + ' units' },
      { id: 'hedge', label: 'Hedge selected', value: sideLabel + ' ' + contracts },
      { id: 'order', label: 'Order filled', value: money(entryPrice, 2) },
      { id: 'exchange', label: 'Notional matched', value: money(notional) },
      { id: 'clearing', label: 'Initial margin', value: money(initialMarginTotal) },
      { id: 'settlement', label: 'Futures P/L', value: signedMoney(futuresPnL) },
      { id: 'basis', label: 'Basis', value: signedPrice(initialBasis) + ' → ' + signedPrice(p.endingBasis) },
      { id: 'exit', label: 'Effective price', value: money(effectivePrice, 2) },
      { id: 'compliance', label: 'Checks passed', value: compliancePassed + ' / ' + compliance.length }
    ];

    return {
      producer: producer,
      side: side,
      sideLabel: sideLabel,
      contracts: contracts,
      rawContracts: rawContracts,
      hedgedUnits: hedgedUnits,
      hedgeRatio: hedgedUnits / p.exposureUnits,
      initialBasis: initialBasis,
      finalFutures: finalFutures,
      finalCash: finalCash,
      tickValue: tickValue,
      entryPrice: entryPrice,
      futuresPnL: futuresPnL,
      cashChange: cashChange,
      cashBenefit: cashBenefit,
      combinedChange: combinedChange,
      effectivePrice: effectivePrice,
      basisChange: basisChange,
      basisLabel: basisLabel,
      notional: notional,
      initialMarginTotal: initialMarginTotal,
      maintenanceTotal: maintenanceTotal,
      settlements: settlements,
      totalCalls: totalCalls,
      endingMarginBalance: balance,
      compliance: compliance,
      compliancePassed: compliancePassed,
      stages: stages
    };
  }

  function stageOf(result, id) {
    for (var i = 0; i < result.stages.length; i++) {
      if (result.stages[i].id === id) return result.stages[i];
    }
    return null;
  }

  global.Hedge = {
    DAY_FRACTIONS: DAY_FRACTIONS,
    compute: compute,
    stageOf: stageOf,
    money: money,
    signedMoney: signedMoney,
    roundTo: roundTo,
    signedPrice: signedPrice
  };
})(typeof window !== 'undefined' ? window : globalThis);
