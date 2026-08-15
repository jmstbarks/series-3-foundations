/* sim.js: pacing and state for one commercial hedge journey. */
(function (global) {
  'use strict';
  var Hedge = global.Hedge, World = global.World, Iso = global.Iso;
  var BASE_SPEED = 6;
  var tour = { seen: Object.create(null), done: false };

  var state = {
    running: false, paused: true, finished: false, station: null, stationT: 0,
    stepMode: false, speed: 1, reading: false, dwellLeft: 0, dwellTotal: 0,
    scenario: 'producer', exposureUnits: 50000, contractSize: 5000,
    initialCash: 5.10, initialFutures: 5.20, marketMove: -0.60,
    endingBasis: -0.05, tickSize: 0.0025, slippageTicks: 0,
    initialMargin: 1800, maintenanceMargin: 1400,
    riskDisclosure: true, fundsAtFCM: true, discretionary: false,
    writtenAuthority: false, positionLimit: 100,
    result: null, visited: Object.create(null), cargoContracts: 0,
    carriedPnL: 0, progress: 0, tourDone: false
  };
  var van = { routeName: 'out', dist: 0, stationIdx: 0, dwell: 0 };
  var listeners = [];
  function emit(name, payload) { listeners.forEach(function (fn) { fn(name, payload); }); }

  function inputs() {
    return {
      scenario: state.scenario, exposureUnits: state.exposureUnits,
      contractSize: state.contractSize, initialCash: state.initialCash,
      initialFutures: state.initialFutures, marketMove: state.marketMove,
      endingBasis: state.endingBasis, tickSize: state.tickSize,
      slippageTicks: state.slippageTicks, initialMargin: state.initialMargin,
      maintenanceMargin: state.maintenanceMargin,
      riskDisclosure: state.riskDisclosure, fundsAtFCM: state.fundsAtFCM,
      discretionary: state.discretionary, writtenAuthority: state.writtenAuthority,
      positionLimit: state.positionLimit
    };
  }
  function planNow() { return Hedge.compute(inputs()); }

  function reset() {
    state.running = false; state.paused = true; state.finished = false;
    state.station = null; state.stationT = 0; state.reading = false;
    state.dwellLeft = 0; state.dwellTotal = 0; state.visited = Object.create(null);
    state.cargoContracts = 0; state.carriedPnL = 0; state.progress = 0;
    state.tourDone = tour.done; state.result = planNow();
    van.routeName = 'out'; van.dist = 0; van.stationIdx = 0; van.dwell = 0;
  }
  function run() { reset(); state.running = true; state.paused = false; emit('reset'); }

  function perform(id) {
    state.result = planNow();
    state.visited[id] = true;
    state.progress = Object.keys(state.visited).length / 9;
    if (id === 'hedge') state.cargoContracts = state.result.contracts;
    if (id === 'settlement') state.carriedPnL = state.result.futuresPnL;
    if (id === 'compliance') { tour.done = true; state.tourDone = true; }
  }
  function fire(st) {
    state.station = st.id; state.stationT = 0; perform(st.id); emit('station', st.id);
  }
  function routeOf(name) { return World.routes[name]; }
  function advanceRoute() {
    if (van.routeName === 'out') van.routeName = 'inland';
    else if (van.routeName === 'inland') van.routeName = 'back';
    else {
      state.finished = true; state.paused = true; state.station = 'done';
      emit('station', 'done'); return;
    }
    van.dist = 0; van.stationIdx = 0; van.dwell = 0.35;
  }
  function update(dt) {
    state.stationT += dt;
    if (!state.running || state.paused || state.finished) return;
    if (van.dwell > 0) {
      van.dwell -= dt * state.speed;
      state.dwellLeft = Math.max(0, van.dwell);
      if (van.dwell <= 0) { state.reading = false; state.dwellTotal = 0; }
      return;
    }
    var route = routeOf(van.routeName);
    van.dist += BASE_SPEED * dt * state.speed * (state.tourDone ? 2.2 : 1);
    var stations = World.stations[van.routeName];
    if (van.stationIdx < stations.length) {
      var st = stations[van.stationIdx];
      if (van.dist >= st.dist) {
        van.dist = st.dist; van.stationIdx++;
        var first = !tour.seen[st.id];
        fire(st); tour.seen[st.id] = true;
        van.dwell = first ? World.readSeconds(st.id) : st.dwell;
        state.reading = first; state.dwellTotal = van.dwell; state.dwellLeft = van.dwell;
        if (state.stepMode) { state.paused = true; state.stepMode = false; }
        return;
      }
    }
    if (van.dist >= route.total) advanceRoute();
  }
  function vanPosition() { return Iso.smoothAt(routeOf(van.routeName), van.dist, 0.8); }

  reset();
  global.Sim = {
    state: state, van: van, run: run,
    reset: function () { reset(); emit('reset'); },
    replayTour: function () { tour.seen = Object.create(null); tour.done = false; },
    update: update, vanPosition: vanPosition, planNow: planNow,
    on: function (fn) { listeners.push(fn); },
    play: function () { if (!state.finished) { state.running = true; state.paused = false; } },
    pause: function () { state.paused = true; },
    toggle: function () { if (state.paused) this.play(); else this.pause(); },
    step: function () {
      if (state.finished) return;
      state.running = true; state.stepMode = true; state.paused = false;
      if (van.dwell > 0) van.dwell = 0;
    }
  };
})(window);
