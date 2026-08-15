/* ui.js: narration, controls and live model readouts. */
(function (global) {
  'use strict';
  var Sim = global.Sim, World = global.World, Hedge = global.Hedge;
  var $ = function (id) { return document.getElementById(id); };
  var el = {}, activeDistrict = null, pinnedDistrict = null;
  var lastPaint = 0, flyTo = null, sheetOpen = false;
  var LABEL = { exposure:'cash risk', hedge:'hedge', order:'order', exchange:'match',
    clearing:'clear', settlement:'settle', basis:'basis', exit:'offset',
    compliance:'review', done:'done' };

  function init() {
    ['stage-chip','stage-tag','stage-name','stage-short','stage-body','dwell','dwell-bar','dwell-hint',
      'journey-list','journey-hint','sum-contracts','sum-pnl','sum-effective','sum-margin','sum-note',
      'settlement-list','district-chips','challenge','challenge-q','challenge-choices','challenge-feedback',
      'hud-phase','hud-side','hud-progress','hud-result','hud-note','inspector','btn-run','btn-play',
      'play-glyph','btn-step','btn-reset','speed','exposure','move','basis-end','slippage','margin',
      'v-speed','v-exposure','v-move','v-basis-end','v-slippage','v-margin','scenario','risk','discretionary',
      'authority','follow','labels','btn-about','about','about-close','btn-panel','tooltip','sheet-handle',
      'btn-tune','dock','dock-tune'].forEach(function (id) { el[id] = $(id); });
    buildChips(); wire(); applyResponsiveLabels();
    Sim.on(function (name, payload) {
      if (name === 'station') onStation(payload);
      if (name === 'reset') { pinnedDistrict = null; paint(true); }
    });
  }
  function buildChips() {
    World.districts.forEach(function (d) {
      var b = document.createElement('button'); b.textContent = d.name; b.dataset.id = d.id;
      b.addEventListener('click', function () { showDistrict(d, true); flyTo = {x:d.x,y:d.y}; });
      el['district-chips'].appendChild(b);
    });
  }
  function wire() {
    el['btn-run'].addEventListener('click', function () { Sim.run(); paint(true); });
    el['btn-play'].addEventListener('click', function () { Sim.toggle(); paint(true); });
    el['btn-step'].addEventListener('click', function () { Sim.step(); });
    el['btn-reset'].addEventListener('click', function () { Sim.replayTour(); Sim.run(); paint(true); });
    bindRange('speed','v-speed',function(v){Sim.state.speed=v;return v.toFixed(2)+'×';});
    bindRange('exposure','v-exposure',function(v){Sim.state.exposureUnits=v;refresh();return v.toLocaleString()+' units';});
    bindRange('move','v-move',function(v){Sim.state.marketMove=v;refresh();return Hedge.signedPrice(v);});
    bindRange('basis-end','v-basis-end',function(v){Sim.state.endingBasis=v;refresh();return Hedge.signedPrice(v);});
    bindRange('slippage','v-slippage',function(v){Sim.state.slippageTicks=v|0;refresh();return (v|0)+' ticks';});
    bindRange('margin','v-margin',function(v){Sim.state.initialMargin=v;Sim.state.maintenanceMargin=Math.round(v*0.78);refresh();return Hedge.money(v)+'/contract';});
    el.scenario.addEventListener('change', function () {
      Sim.state.scenario=el.scenario.value;
      var mv=Sim.state.scenario==='producer'?-0.60:0.60; el.move.value=mv; Sim.state.marketMove=mv;
      el['v-move'].textContent=Hedge.signedPrice(mv); refresh();
    });
    el.risk.addEventListener('change',function(){Sim.state.riskDisclosure=el.risk.checked;refresh();});
    el.discretionary.addEventListener('change',function(){Sim.state.discretionary=el.discretionary.checked;refresh();});
    el.authority.addEventListener('change',function(){Sim.state.writtenAuthority=el.authority.checked;refresh();});
    el.labels.addEventListener('change',function(){global.Renderer.setLabels(el.labels.checked);});
    el['btn-about'].addEventListener('click',function(){el.about.hidden=false;});
    el['about-close'].addEventListener('click',function(){el.about.hidden=true;});
    el.about.addEventListener('click',function(e){if(e.target===el.about)el.about.hidden=true;});
    el['btn-panel'].addEventListener('click',function(){var h=el.inspector.classList.toggle('hidden');el['btn-panel'].setAttribute('aria-expanded',String(!h));applyResponsiveLabels();});
    el['sheet-handle'].addEventListener('click',function(){setSheet(!sheetOpen);});
    el['btn-tune'].addEventListener('click',function(){var o=el.dock.classList.toggle('tune-open');el['btn-tune'].setAttribute('aria-expanded',String(o));});
    window.addEventListener('resize',applyResponsiveLabels);
  }
  function refresh(){Sim.state.result=Sim.planNow();paint(true);}
  function bindRange(id,out,fn){var n=el[id];function a(){el[out].textContent=fn(parseFloat(n.value));}n.addEventListener('input',a);a();}
  function isMobile(){return window.matchMedia('(max-width: 900px)').matches;}
  function applyResponsiveLabels(){var h=el.inspector.classList.contains('hidden'),n=isMobile();el['btn-panel'].textContent=n?(h?'Panel':'Hide'):(h?'Show panel':'Hide panel');el['btn-about'].textContent=n?'About':'About & accuracy';el['dwell-hint'].innerHTML=n?'reading stop: tap <b>❚❚</b> to hold':'reading stop: press <kbd>Space</kbd> to hold';}
  function setSheet(open){sheetOpen=open;el.inspector.classList.toggle('open',open);el['sheet-handle'].setAttribute('aria-expanded',String(open));if(open)el.inspector.scrollTop=0;}

  function onStation(station){var id=station==='done'?null:station;activeDistrict=id;if(!pinnedDistrict&&id)writeCard(World.districtById[id],station);if(station==='done')writeDone();paint(true);}
  function writeCard(d,station){
    el['stage-chip'].textContent=LABEL[station]||d.id;el['stage-chip'].style.color=d.color;
    el['stage-chip'].style.background=global.Iso.rgba(d.color,.14);el['stage-chip'].style.borderColor=global.Iso.rgba(d.color,.3);
    el['stage-tag'].textContent=d.tag;el['stage-name'].textContent=d.name;el['stage-short'].textContent=d.short;el['stage-body'].textContent=d.body;
    el.challenge.hidden=false;el['challenge-q'].textContent=d.question;el['challenge-feedback'].textContent='';el['challenge-feedback'].className='challenge-feedback';
    el['challenge-choices'].innerHTML='';d.choices.forEach(function(choice,i){var b=document.createElement('button');b.textContent=choice;b.addEventListener('click',function(){el['challenge-feedback'].textContent=d.feedback[i];el['challenge-feedback'].className='challenge-feedback '+(i===d.correct?'right':'wrong');});el['challenge-choices'].appendChild(b);});
  }
  function writeDone(){var r=Sim.state.result;el['stage-chip'].textContent='done';el['stage-tag'].textContent='cash + futures combined';el['stage-name'].textContent='Hedge journey complete';el['stage-short'].textContent='The modeled '+r.sideLabel+' hedge produced an effective '+(r.producer?'selling':'purchase')+' price of '+Hedge.money(r.effectivePrice,2)+'.';el['stage-body'].textContent='Change the market move or ending basis and run again. The broad price move is offset; the remaining difference comes from basis, contract rounding and any slippage you selected.';el.challenge.hidden=true;}
  function showDistrict(d,pin){pinnedDistrict=pin?d.id:null;writeCard(d,d.id);if(pin){el['stage-chip'].textContent='pinned';el['stage-tag'].textContent=d.tag+' · tap empty ground to resume';if(isMobile())setSheet(true);}updateChips();}
  function updateChips(){Array.prototype.forEach.call(el['district-chips'].children,function(k){k.classList.toggle('on',k.dataset.id===(pinnedDistrict||activeDistrict));});}

  function paint(force){var now=performance.now();if(!force&&now-lastPaint<90)return;lastPaint=now;var s=Sim.state,r=s.result||Sim.planNow();
    el['play-glyph'].textContent=s.paused||s.finished?'▶':'❚❚';el['hud-phase'].textContent=s.station?(LABEL[s.station]||s.station):'idle';
    el['hud-side'].textContent=r.sideLabel+' '+r.contracts;el['hud-progress'].textContent=Math.round(s.progress*100)+'%';el['hud-result'].textContent=Hedge.money(r.effectivePrice,2);el['hud-note'].textContent=hudNote(s,r);
    var show=s.reading&&s.dwellTotal>0&&s.dwellLeft>0;el.dwell.hidden=!show;if(show)el['dwell-bar'].style.width=(s.dwellLeft/s.dwellTotal*100).toFixed(1)+'%';
    paintJourney(s,r);paintSummary(r);paintSettlements(r);updateChips();
  }
  function hudNote(s,r){if(s.finished)return '✓ journey complete';if(s.reading)return '⏸ reading stop';if(!s.running)return 'Press Run to start.';if(s.station==='hedge')return r.producer?'seller risk → short hedge':'buyer risk → long hedge';if(s.tourDone)return '⏩ all stations explained';return '';}
  function paintJourney(s,r){el['journey-hint'].textContent=Object.keys(s.visited).length+' of 9 visited';el['journey-list'].innerHTML=r.stages.map(function(p){var seen=s.visited[p.id],live=s.station===p.id;return '<div class="bar'+(seen?' paid':'')+(live?' live':'')+'"><span class="lbl">'+esc(p.label)+'</span><span class="track"><span class="fill" style="width:'+(seen?'100':'0')+'%"></span></span><span class="val">'+esc(p.value)+'</span></div>';}).join('');}
  function paintSummary(r){el['sum-contracts'].textContent=r.contracts+' '+r.sideLabel;el['sum-pnl'].textContent=Hedge.signedMoney(r.futuresPnL);el['sum-effective'].textContent=Hedge.money(r.effectivePrice,2);el['sum-margin'].textContent=Hedge.money(r.totalCalls);el['sum-note'].textContent='Basis '+r.basisLabel+' from '+fmtBasis(r.initialBasis)+' to '+fmtBasis(Sim.state.endingBasis)+'. Hedged '+Math.round(r.hedgeRatio*100)+'% of the cash quantity. Compliance checks: '+r.compliancePassed+'/'+r.compliance.length+'.';}
  function paintSettlements(r){el['settlement-list'].innerHTML=r.settlements.map(function(d){return '<div class="settle-row"><span>D'+d.day+' · '+Hedge.money(d.price,2)+'</span><b>'+Hedge.signedMoney(d.variation)+'</b>'+(d.marginCall?'<em>call '+Hedge.money(d.marginCall)+'</em>':'')+'</div>';}).join('');}
  function fmtBasis(v){return Hedge.signedPrice(v);}
  function esc(v){return String(v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}

  global.UI={init:init,paint:paint,run:function(){Sim.run();paint(true);},resetAll:function(){Sim.replayTour();Sim.run();paint(true);},showDistrict:showDistrict,unpin:function(){pinnedDistrict=null;updateChips();},activeDistrict:function(){return pinnedDistrict||activeDistrict;},takeFlyTo:function(){var f=flyTo;flyTo=null;return f;},el:el};
})(window);
