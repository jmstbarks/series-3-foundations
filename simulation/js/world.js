/* world.js: the futures lifecycle laid out as a market town. */
(function (global) {
  'use strict';
  var Iso = global.Iso;
  var makeRoute = Iso.makeRoute;

  var OUT = makeRoute([
    [1, 8], [8, 8], [13, 8], [21, 8], [29, 8], [38, 10], [43, 14]
  ]);
  var INLAND = makeRoute([
    [43, 14], [50, 17], [50, 23], [44, 27]
  ]);
  var BACK = makeRoute([
    [44, 27, 0], [40, 31, 1.5], [29, 32, 2.6], [18, 32, 2.6],
    [11, 31, 1.2], [7, 23, 0.3], [6, 8, 0]
  ]);

  function station(route, idx, id, dwell) {
    return { dist: route.cum[idx], id: id, dwell: dwell == null ? 1.1 : dwell };
  }
  var STATIONS = {
    out: [
      station(OUT, 1, 'exposure'), station(OUT, 2, 'hedge'),
      station(OUT, 3, 'order'), station(OUT, 4, 'exchange'),
      station(OUT, 6, 'clearing')
    ],
    inland: [station(INLAND, 1, 'settlement'), station(INLAND, 3, 'basis')],
    back: [station(BACK, 2, 'exit'), station(BACK, 4, 'compliance')]
  };

  var C = {
    wheat: '#c89b45', blue: '#537f9e', violet: '#7668a8', orange: '#c4773c',
    teal: '#438983', rose: '#a95b70', sage: '#6d9068', brick: '#a85a44',
    ink: '#443f38', paper: '#e9e4d8', road: '#c8c0ae', roadTop: '#d9d2c2'
  };

  var DISTRICTS = [
    {
      id: 'exposure', name: 'Cash Business', x: 6, y: 8, r: 4.2, color: C.wheat,
      tag: 'Price risk begins here',
      short: 'A real purchase or sale creates the risk; the futures position is the offset.',
      body: 'The cart begins with a commercial exposure, not a desire to predict prices. A producer expects to sell later and is hurt by falling prices. A processor expects to buy later and is hurt by rising prices. The first exam move is to identify that adverse direction before choosing any contract.',
      question: 'Which move hurts a producer who will sell later?', choices: ['Prices fall', 'Prices rise'], correct: 0,
      feedback: ['Correct: the later cash sale brings in less.', 'A rise helps the later seller; a decline is the risk.']
    },
    {
      id: 'hedge', name: 'Hedge Workshop', x: 13, y: 8, r: 4.2, color: C.blue,
      tag: 'Oppose the cash risk',
      short: 'Sellers hedge short; buyers hedge long.',
      body: 'The workshop gives the cart a futures position whose gain should offset an adverse cash-market move. Expected sellers use short futures. Expected buyers use long futures. Contract count is the exposure divided by contract size and rounded here to the nearest whole contract, so the displayed hedge ratio can be slightly above or below 100%.',
      question: 'A flour mill expects to buy wheat. Its basic hedge is…', choices: ['Long futures', 'Short futures'], correct: 0,
      feedback: ['Correct: rising futures can offset a higher cash purchase price.', 'Short futures adds exposure to the mill’s risk from rising prices.']
    },
    {
      id: 'order', name: 'Order Gate', x: 21, y: 8, r: 4.1, color: C.violet,
      tag: 'Intent becomes an order',
      short: 'Order instructions control when and how the hedge may be filled.',
      body: 'This model uses an immediate market-style fill with adjustable slippage. The selected side changes the direction of that slippage: a long pays above the quoted price and a short sells below it. Real orders face liquidity, timing, partial-fill and exchange-rule details that this compact teaching model does not reproduce.',
      question: 'What is the main risk of a market order?', choices: ['Uncertain fill price', 'No execution'], correct: 0,
      feedback: ['Correct: execution is prioritized, not a particular price.', 'A market order prioritizes execution; price is the uncertainty.']
    },
    {
      id: 'exchange', name: 'Exchange Hall', x: 29, y: 8, r: 4.4, color: C.orange,
      tag: 'Standard terms, matched trade',
      short: 'The exchange standardizes the contract and matches opposing orders.',
      body: 'The matched notional is entry price × contract size × number of contracts. That amount is much larger than the performance-bond margin deposited, which is the source of futures leverage. Notional is exposure represented by the contracts; it is not the amount paid to purchase the position.',
      question: 'Is initial margin a down payment on the commodity?', choices: ['No', 'Yes'], correct: 0,
      feedback: ['Correct: it is a performance bond, not purchase financing.', 'Futures margin is a performance bond, not a commodity down payment.']
    },
    {
      id: 'clearing', name: 'Clearinghouse', x: 43, y: 14, r: 4.6, color: C.teal,
      tag: 'Performance guaranteed',
      short: 'Clearing stands between buyer and seller and manages performance risk.',
      body: 'After matching, clearing becomes the counterparty to each side and collects performance-bond margin. This scene computes initial and maintenance totals per contract. It does not model a real clearinghouse default waterfall, guaranty fund, intraday calls or exchange-specific margin methodology.',
      question: 'Who becomes counterparty to both sides after clearing?', choices: ['The clearinghouse', 'The introducing broker'], correct: 0,
      feedback: ['Correct: clearing interposes itself between the original parties.', 'An IB may handle customer relationships, but clearing becomes counterparty.']
    },
    {
      id: 'settlement', name: 'Settlement Clock', x: 50, y: 17, r: 4.5, color: C.rose,
      tag: 'Marked to market daily',
      short: 'Each settlement-price change becomes cash variation in the margin account.',
      body: 'Every displayed day recalculates variation as side × price change × hedged units. Losses reduce the margin balance. If the balance falls below maintenance, this model restores it to initial margin and records the deposit. The five-day path is an assumed teaching path scaled to the market move you selected.',
      question: 'Below maintenance, this model requires a deposit to…', choices: ['Restore initial margin', 'Restore maintenance only'], correct: 0,
      feedback: ['Correct: the modeled call restores the account to initial margin.', 'In this stated convention, the call restores initial—not merely maintenance—margin.']
    },
    {
      id: 'basis', name: 'Basis Bridge', x: 44, y: 27, r: 4.4, color: C.sage,
      tag: 'Cash minus futures',
      short: 'Basis risk explains why a hedge rarely locks the exact starting futures price.',
      body: 'Basis is cash price minus futures price. The controls set the ending basis, and the bridge compares it with the starting basis. The effective cash price combines the eventual cash transaction with the futures gain or loss. Change the ending basis to see the residual risk that remains after the broad price move is offset.',
      question: 'Cash is $5.10 and futures $5.20. Basis equals…', choices: ['−$0.10', '+$0.10'], correct: 0,
      feedback: ['Correct: cash minus futures is −$0.10.', 'Basis is cash minus futures, not futures minus cash.']
    },
    {
      id: 'exit', name: 'Exit Fork', x: 29, y: 32, r: 4.7, color: C.brick,
      tag: 'Offset or delivery',
      short: 'Most hedgers offset; delivery remains part of the contract mechanism.',
      body: 'At the fork, the modeled hedger offsets the futures position when the cash transaction occurs. The futures profit or loss is combined with the cash price to produce an effective price. The delivery road is visible as a conceptual alternative, but delivery procedures, notices, grades and locations are intentionally outside this compact model.',
      question: 'How does a short hedger normally close the futures position?', choices: ['Buy an offsetting future', 'Sell another future'], correct: 0,
      feedback: ['Correct: buying the same contract offsets the short.', 'Another sale increases the short rather than closing it.']
    },
    {
      id: 'compliance', name: 'Compliance Desk', x: 11, y: 31, r: 4.6, color: C.violet,
      tag: 'The trade must also be permitted',
      short: 'Correct arithmetic does not replace disclosures, supervision and role boundaries.',
      body: 'The desk checks four modeled facts: risk disclosure, custody of customer funds at an FCM, written authority for a discretionary account, and an illustrative position limit. These are learning prompts, not a complete compliance program. Current NFA and CFTC rules—not this scene—control actual conduct.',
      question: 'May an introducing broker accept customer funds?', choices: ['No', 'Yes'], correct: 0,
      feedback: ['Correct: customer funds are handled by an FCM in this relationship.', 'An IB may solicit or accept orders, but cannot accept customer funds.']
    }
  ];

  var DISTRICT_BY_ID = {};
  DISTRICTS.forEach(function (d) { DISTRICT_BY_ID[d.id] = d; });
  function readSeconds(id) {
    var d = DISTRICT_BY_ID[id];
    if (!d) return 9;
    var words = (d.short + ' ' + d.body).split(/\s+/).length;
    return Math.min(26, Math.max(9, words / 3.8 + 3.5));
  }

  var buildings = [], props = [];
  function put(o) { buildings.push(o); }
  function block(x, y, w, d, h, color, lit) {
    put({ x: x, y: y, z: 0, w: w, d: d, h: h, color: color,
      windows: { cols: Math.max(2, Math.round(w)), seed: Math.round(x * 7 + y * 13), color: lit } });
  }
  function distToRoutes(x, y) {
    var best = 1e9;
    [OUT, INLAND, BACK].forEach(function (r) {
      r.segs.forEach(function (s) {
        var vx = s.b.x - s.a.x, vy = s.b.y - s.a.y;
        var den = vx * vx + vy * vy || 1;
        var q = Math.max(0, Math.min(1, ((x-s.a.x)*vx+(y-s.a.y)*vy)/den));
        best = Math.min(best, Math.hypot(x-(s.a.x+vx*q), y-(s.a.y+vy*q)));
      });
    });
    return best;
  }
  function build() {
    if (buildings.length) return;
    block(2.3, 3.5, 3.4, 2.8, 2.2, '#d9c594', C.wheat);
    put({ kind: 'drums', x: 7.5, y: 4.1, color: C.wheat });
    block(11, 3.4, 3.6, 2.6, 2.5, '#b8cbd8', C.blue);
    put({ kind: 'gatePost', x: 13, y: 6.4, color: C.blue }); put({ kind: 'gateBeam', x: 13, y: 8, color: C.blue }); put({ kind: 'gatePost', x: 13, y: 9.6, color: C.blue });
    block(18.5, 3.4, 3.5, 2.5, 3.1, '#ccc4df', C.violet);
    put({ kind: 'screen', x: 22, y: 12, color: C.violet });
    block(27, 3.2, 5.0, 3.0, 4.3, '#dfbd99', C.orange);
    put({ kind: 'stack', x: 33.5, y: 5.2, color: C.orange });
    put({ kind: 'vault', x: 44, y: 10.2, color: C.teal });
    put({ kind: 'drums', x: 53, y: 18.5, color: C.rose });
    block(47, 23.8, 3.6, 2.8, 2.3, '#b9cdb5', C.sage);
    block(28, 35.2, 4.0, 2.4, 2.0, '#d2b2a6', C.brick);
    block(8, 34.5, 4.2, 2.6, 2.7, '#c9c0dc', C.violet);
    put({ kind: 'screen', x: 13.5, y: 35, color: C.violet });
    var spots = [[4,16],[12,17],[19,15],[26,17],[35,17],[39,23],[33,26],[23,26],[17,24],[5,26],[53,29],[37,36],[19,36],[48,7]];
    spots.forEach(function (p, i) {
      if (distToRoutes(p[0], p[1]) > 2.5) props.push({ kind: i % 3 ? 'tree' : 'lamp', x: p[0], y: p[1], seed: i });
    });
  }

  global.World = {
    GW: 57, GH: 39, routes: { out: OUT, inland: INLAND, back: BACK },
    pillars: [[40,31],[34,32],[26,32],[18,32]], stations: STATIONS,
    districts: DISTRICTS, districtById: DISTRICT_BY_ID,
    stationToDistrict: { exposure:'exposure',hedge:'hedge',order:'order',exchange:'exchange',clearing:'clearing',settlement:'settlement',basis:'basis',exit:'exit',compliance:'compliance' },
    readSeconds: readSeconds, buildings: buildings, props: props, palette: C,
    distToRoutes: distToRoutes, build: build
  };
})(window);
