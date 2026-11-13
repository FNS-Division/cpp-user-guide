const tech = {
  fiber:{icon:"🧵",name:"Fibre",howSimple:"It offers very high capacity and reliability, but usually requires civil works to deploy (such as trenching, laying ducts, and construction work to bring the cable to the site)."},
  cellular:{icon:"📶",name:"Cellular / FWA",howSimple:"Connectivity is delivered over radio from nearby base stations (towers). Fixed Wireless Access (FWA) can be deployed and upgraded relatively quickly, but performance depends on coverage conditions and available capacity."},
  ptp:{icon:"🗼",name:"Point-to-Point Radio",howSimple:"A dedicated radio link connects two fixed sites using a directional antenna. It is often used for backhaul or to connect specific locations where laying fibre is impractical."},
  satellite:{icon:"📡",name:"Satellite",howSimple:"User terminals connect to satellites. It can serve remote areas without local infrastructure, but costs and performance depend on the service plan and local operating conditions."}
};

const ORDER=["fiber","cellular","ptp","satellite"];
const el=(id)=>document.getElementById(id);
const FIELDS=["remoteness","terrain","density","demand","priority"];

/* Density constraints based on remoteness */
const DENSITY_ALLOWED_BY_REMOTENESS = {
  near:["low","mid","high"],
  mid:["low","mid","high"],
  far:["low","mid"],
  remote:["low"]
};

(function initInfoModal(){
  const btn = el("infoBtn");
  const overlay = el("infoModal");
  const closeBtn = el("infoClose");
  if(!btn || !overlay || !closeBtn) return;

  let lastFocus = null;

  const open = ()=>{
    lastFocus = document.activeElement;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden","false");
    btn.setAttribute("aria-expanded","true");
    closeBtn.focus();
  };
  const close = ()=>{
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden","true");
    btn.setAttribute("aria-expanded","false");
    if(lastFocus && typeof lastFocus.focus==="function") lastFocus.focus();
  };

  btn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  overlay.addEventListener("click", (e)=>{
    if(e.target === overlay) close();
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && overlay.classList.contains("open")){
      e.preventDefault();
      close();
    }
  });
})();

const METER_MIN=-3, METER_MAX=10;
// Remove METER_MIN and METER_MAX entirely
function toPercent(score, maxScore){
  // Floor is 0. If it scores negative, the bar stays empty (0%).
  const clamped = Math.max(0, Math.min(maxScore, score));
  return Math.round((clamped / maxScore) * 100);
}
function getAllowedDensityValues(){
  const rem = el("remoteness").value;
  return DENSITY_ALLOWED_BY_REMOTENESS[rem] || ["low","mid","high"];
}

function enforceDensityConstraint(){
  const densitySel = el("density");
  const allowed = getAllowedDensityValues();
  const currentValue = densitySel.value;

  if(currentValue && !allowed.includes(currentValue)){
    densitySel.value = "";
  }

  const note = el("densityConstraintNote");
  const rem = el("remoteness").value;

  if(rem === "far"){
    note.classList.remove("hidden");
    note.innerHTML = "<strong>Selection rule:</strong> For locations far from infrastructure, dense urban demand is not offered here to avoid contradictory combinations.";
  }else if(rem === "remote"){
    note.classList.remove("hidden");
    note.innerHTML = "<strong>Selection rule:</strong> For locations with limited nearby infrastructure, only low-density contexts are offered here to avoid contradictory combinations.";
  }else{
    note.classList.add("hidden");
    note.innerHTML = "";
  }

  syncTilesFromSelect("density");
}

function buildTilesForSelect(selectId){
  const sel=el(selectId);
  const wrap=document.querySelector(`[data-tiles-for="${selectId}"]`);
  if(!sel||!wrap) return;

  wrap.innerHTML="";
  [...sel.options].forEach(opt=>{
    if(opt.value===""||opt.disabled) return;
    const btn=document.createElement("button");

    btn.type="button";
    btn.className="tile";
    btn.textContent=opt.textContent;
    btn.dataset.value=opt.value;

    btn.addEventListener("click",()=>{
      if(btn.classList.contains("disabled")) return;
      sel.value=opt.value;
      sel.dispatchEvent(new Event("change",{bubbles:true}));
      syncTilesFromSelect(selectId);
    });

    wrap.appendChild(btn);
  });

  syncTilesFromSelect(selectId);
}

function syncTilesFromSelect(selectId){
  const sel=el(selectId);
  const wrap=document.querySelector(`[data-tiles-for="${selectId}"]`);
  if(!sel||!wrap) return;

  const val=sel.value;
  const allowedDensity = selectId==="density" ? getAllowedDensityValues() : null;

  wrap.querySelectorAll(".tile").forEach(t=>{
    const on=(t.dataset.value===val);
    const isDisabled = selectId==="density" && !allowedDensity.includes(t.dataset.value);

    t.classList.toggle("selected",on && !isDisabled);
    t.classList.toggle("disabled",isDisabled);
    t.setAttribute("aria-pressed",on && !isDisabled ? "true":"false");
    t.setAttribute("aria-disabled",isDisabled ? "true":"false");
    t.tabIndex = isDisabled ? -1 : 0;
  });
}

function syncMapping(){
  const on=el("mappingToggle").checked;
  document.querySelectorAll(".mapping").forEach(m=>m.style.display=on?"block":"none");
  el("modeSimple").classList.toggle("on",!on);
  el("modeAdv").classList.toggle("on",on);
}

function labelForFit(score){
  if(score >= 4) return ["Strong fit", "strong"];          // Green
  if(score >= 1) return ["Good fit", "good"];              // Yellow
  if(score >= -1) return ["Context-dependent", "neutral"]; // Gray (Neutral)
  return ["Poor fit", "weak"];                             // Red
}

function isContextComplete(rem,terr,dens,dem,pri){
  return !!(rem&&terr&&dens&&dem&&pri);
}

function setStepStatus(elId, done, total){
  const node = el(elId);
  node.className = "stepStatus";
  node.innerHTML = "";

  if(done === 0) return;
  if(done < total){
    node.classList.add("inprogress");
    return;
  }
  node.classList.add("complete");
  node.innerHTML = `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7.7 13.6 4.6 10.5a1 1 0 1 1 1.4-1.4l1.7 1.7 6.4-6.4a1 1 0 1 1 1.4 1.4l-7.8 7.8a1 1 0 0 1-1.4 0Z" fill="rgba(16,185,129,.95)"/>
    </svg>
  `;
}

function setStepExpanded(stepId, expanded){
  const step=el(stepId);
  if(!step) return;
  step.setAttribute("aria-expanded", expanded ? "true" : "false");
}

let guidedMode = true;

function guidedAdvance(step1Done, step2Done, step3Done){
  if(!guidedMode) return;

  const s1Complete = (step1Done === 2);
  const s2Complete = (step2Done === 2);
  const s3Complete = (step3Done === 1);

  if(!s1Complete){
    setStepExpanded("step1", true);
    setStepExpanded("step2", false);
    setStepExpanded("step3", false);
    return;
  }
  if(!s2Complete){
    setStepExpanded("step1", false);
    setStepExpanded("step2", true);
    setStepExpanded("step3", false);
    return;
  }
  if(!s3Complete){
    setStepExpanded("step1", false);
    setStepExpanded("step2", false);
    setStepExpanded("step3", true);
    return;
  }
  setStepExpanded("step1", false);
  setStepExpanded("step2", false);
  setStepExpanded("step3", false);
}

function updateProgress(){
  const values=FIELDS.map(id=>el(id).value);
  const doneCount=values.filter(Boolean).length;
  const total=FIELDS.length;

  const dots=el("progressDots");
  dots.innerHTML="";
  values.forEach(v=>{
    const d=document.createElement("div");
    d.className="dot "+(v?"done":"need");
    dots.appendChild(d);
  });

  el("progressSub").textContent = doneCount===total
    ? "Context complete — results are shown"
    : `${doneCount} of ${total} selected`;

  const leftCard=el("leftCard");
  const cue=el("cueInHeader");
  const showCue=(doneCount===0);
  leftCard.classList.toggle("pulsing",showCue);
  cue.style.display = showCue ? "block" : "none";

  const step1Done=(el("remoteness").value?1:0)+(el("terrain").value?1:0);
  const step2Done=(el("density").value?1:0)+(el("demand").value?1:0);
  const step3Done=(el("priority").value?1:0);

  setStepStatus("step1Status", step1Done, 2);
  setStepStatus("step2Status", step2Done, 2);
  setStepStatus("step3Status", step3Done, 1);

  guidedAdvance(step1Done, step2Done, step3Done);
}

function contextStoryFromSelections(rem,terr,dens,dem,pri){
  const remPhrase={
    near:"very close to infrastructure, inside a city",
    mid:"close to infrastructure, near a city",
    far:"far from infrastructure, outside town",
    remote:"in an area with limited nearby infrastructure, remote"
  }[rem];

  const terrPhrase={
    easy:"in a build-friendly area",
    medium:"in an area with moderate terrain challenges",
    hard:"in rugged, mountainous terrain (which can complicate both construction and signals)"
  }[terr];

  const densPhrase={low:"a small village",mid:"an expanding town",high:"a dense urban area"}[dens];

  const demPhrase = {
  basic: "with essential connectivity (calls, messaging, basic data)",
  video: "with everyday use needs (video, work, education)",
  critical: "with high-performance needs (data-intensive services, advanced applications)"
}[dem];

  const priPhrase={cost:"save money",value:"maximize long-term value",speed:"deploy quickly"}[pri];

  return `Technology fit for points of interest ${remPhrase}, ${terrPhrase}, serving ${densPhrase} ${demPhrase}. What models can you use to ${priPhrase}?`;
}

function buildReasons(rem,terr,dens,dem,pri){
  const remotePenalty=(rem==="far"||rem==="remote");
  const superRemote=(rem==="remote");
  const farRemote=(rem==="far");
  const nearInfra=(rem==="near");
  const outsideTown=(rem==="mid");

  const hardTerrain=(terr==="hard");
  const easyTerrain=(terr==="easy");

  const highDensity=(dens==="high");

  const basicDemand=(dem==="basic");
  const criticalDemand=(dem==="critical");
  const videoDemand=(dem==="video"||dem==="critical");

  const prioritizeCost=(pri==="cost");
  const prioritizeValue=(pri==="value");
  const prioritizeSpeed=(pri==="speed");

  let s={fiber:0,cellular:0,ptp:0,satellite:0};
  let contrib={fiber:[],cellular:[],ptp:[],satellite:[]};

  function addScore(key,delta,label){
    if(!delta) return;
    s[key]+=delta;
    contrib[key].push({label,delta});
  }

  // Fibre
  if(nearInfra) addScore("fiber",3,"Infrastructure proximity");
  if(outsideTown) addScore("fiber",1,"Outside town distance");
  if(farRemote) addScore("fiber",-1,"Remote location");
  if(superRemote) addScore("fiber",-1,"Limited nearby infrastructure");
  if(highDensity) addScore("fiber",2,"High density");
  if(videoDemand) addScore("fiber",2,"Higher performance needs");
  if(criticalDemand) addScore("fiber",2,"High-performance needs");
  if(basicDemand) addScore("fiber",-2,"Essential connectivity only");
  if(hardTerrain) addScore("fiber",-2,"Hard terrain");
  if(easyTerrain) addScore("fiber",1,"Easy terrain");
  if(prioritizeValue) addScore("fiber",1,"Long-term value");
  if(prioritizeSpeed) addScore("fiber",-1,"Speed priority");

  // Cellular / FWA
  if(nearInfra) addScore("cellular",2,"Infrastructure proximity");
  if(outsideTown) addScore("cellular",2,"Outside town distance");
  if(superRemote) addScore("cellular",-1,"Limited nearby infrastructure");
  if(highDensity) addScore("cellular",1,"High density");
  if(videoDemand) addScore("cellular",1,"Higher performance needs");
  if(basicDemand) addScore("cellular",-1,"Essential connectivity only");
  if(prioritizeSpeed) addScore("cellular",2,"Speed priority");
  if(prioritizeCost) addScore("cellular",1,"Cost priority");

  // P2P
  if(outsideTown) addScore("ptp",2,"Outside town distance");
  if(nearInfra) addScore("ptp",1,"Infrastructure proximity");
  if(hardTerrain) addScore("ptp",-1,"Hard terrain");
  if(easyTerrain) addScore("ptp",1,"Easy terrain");
  if(videoDemand) addScore("ptp",1,"Higher performance needs");
  if(basicDemand) addScore("ptp",-1,"Essential connectivity only");
  if(prioritizeSpeed) addScore("ptp",1,"Speed priority");
  if(prioritizeCost) addScore("ptp",1,"Cost priority");

  // Satellite
  if(farRemote) addScore("satellite",2,"Remote location");
  if(superRemote) addScore("satellite",4,"Limited nearby infrastructure");
  if(nearInfra) addScore("satellite",-1,"Infrastructure proximity");
  if(criticalDemand) addScore("satellite",-1,"High-performance needs");
  if(prioritizeSpeed) addScore("satellite",2,"Speed priority");
  if(prioritizeValue) addScore("satellite",-1,"Long-term value");

  function explainFiber(){
    const pros=[],cons=[];
    if(nearInfra) pros.push("Infrastructure is close, so building fibre is more realistic.");
    if(highDensity) pros.push("High density makes long-term investment more worthwhile.");
    if(videoDemand) pros.push("Higher performance needs benefit from fibre’s capacity and stability.");
    if(prioritizeValue) pros.push("If you want something future-proof, fibre tends to win over time.");
    if(remotePenalty) cons.push("Long distances usually make fibre slower and more expensive to build.");
    if(hardTerrain) cons.push("Mountainous terrain can increase civil works effort (access, trenching).");
    if(prioritizeSpeed) cons.push("If time is critical, civil works can be a bottleneck.");
    if(basicDemand) cons.push("For planning, essential connectivity alone is usually not the preferred baseline for long-term service design.");
    return {pros,cons,mappingTags:[
      "Maximum connection distance, [Meters]",
      "Annual hardware maintenance costs, [Fraction of hardware CapEx]",
      "Annual ISP fees per 1 Mbps, [USD per Mbps per year]",
      "Optical fibre line construction cost, [USD per km]",
      "Fibre termination point setup cost, [USD per POI]",
      "Hardware refresh period, [Years]"
    ]};
  }

  function explainCellular(){
    const pros=[],cons=[];
    if(nearInfra||outsideTown) pros.push("Wireless can be quicker when sites and power already exist nearby.");
    if(prioritizeSpeed) pros.push("Often faster to deploy than new cables.");
    if(prioritizeCost) pros.push("Can reduce upfront build costs compared to heavy construction.");
    if(videoDemand) pros.push("Can support everyday use when capacity is planned well.");
    if(superRemote) cons.push("With little nearby infrastructure, new sites/backhaul may be needed first.");
    if(criticalDemand) cons.push("For high-performance needs, extra capacity planning or redundancy may be needed.");
    if(basicDemand) cons.push("Essential connectivity alone is usually not the preferred planning target for long-term connectivity.");
    return {pros,cons,mappingTags:[
      "Cellular terminal maintenance cost, [Fraction of hardware CapEx]",
      "Annual ISP fees per 1 Mbps, [USD per Mbps per year]",
      "Cellular terminal setup cost, [USD per terminal]",
      "Hardware refresh period, [Years]"
    ]};
  }

  function explainPtp(){
    const pros=[],cons=[];
    pros.push("Useful to connect a specific site to a known endpoint (a hub or node).");
    if(prioritizeSpeed) pros.push("Typically faster than trenching new cable.");
    if(prioritizeCost) pros.push("Can be cost-effective for targeted links.");
    if(hardTerrain) cons.push("Mountains can block line-of-sight, so link planning and placement matter.");
    if(superRemote) cons.push("Still needs endpoints; if everything is far away, satellite may be simpler.");
    if(basicDemand) cons.push("This is usually considered for more deliberate connectivity planning than an essential minimum service level alone.");
    return {pros,cons,mappingTags:[
      "Access link maintenance cost, [Fraction of hardware CapEx]",
      "Annual ISP fees per 1 Mbps, [USD per Mbps per year]",
      "Annual license fee per 1 MHz, [USD per Mhz per year]",
      "Point-to point radio link setup cost, [USD per link]",
      "One time license fee per 1 MHz, [USD per Mhz]",
      "Hardware refresh period, [Years]",
      "Access link bandwidth, [MHz per link]"
    ]};
  }

  function explainSatellite(){
    const pros=[],cons=[];
    if(remotePenalty) pros.push("Remoteness is where satellite often becomes the most practical option.");
    if(prioritizeSpeed) pros.push("Fast to activate compared to building new ground infrastructure.");
    if(nearInfra) cons.push("If infrastructure is already close, ground options usually deliver better long-term value.");
    if(criticalDemand) cons.push("High-performance needs may require stronger performance guarantees and cost planning.");
    if(basicDemand) cons.push("Essential connectivity alone is generally not the preferred planning baseline for long-term meaningful connectivity.");
    return {pros,cons,mappingTags:[
      "Satellite terminal maintenance cost, [Fraction of hardware CapEx]",
      "Annual ISP fees per 1 Mbps, [USD per Mbps per year]",
      "Annual transit fees per 1 Mbps, [USD per Mbps per year]",
      "Satellite terminal setup cost, [USD per terminal]",
      "Hardware refresh period, [Years]"
    ]};
  }

  return {
    scores:s,
    contrib,
    explain:{
      fiber:explainFiber(),
      cellular:explainCellular(),
      ptp:explainPtp(),
      satellite:explainSatellite()
    }
  };
}

function renderNeutralCards(container){
  container.innerHTML="";
  ORDER.forEach((key)=>{
    const t=tech[key];
    container.innerHTML+=`
      <div class="tech neutral">
        <div class="techName">
          <div class="icon" aria-hidden="true">${t.icon}</div>
          <div class="techText">
            <h3>${t.name}</h3>
            <div class="techHow"><span class="muted">How it works:</span> ${t.howSimple}</div>
          </div>
        </div>
      </div>
    `;
  });
}

function getSignalChips(key, contributions){
  const sorted=(contributions||[]).slice().sort((a,b)=>Math.abs(b.delta)-Math.abs(a.delta));

  const topThree = sorted.slice(0,3);
  const rest = sorted.slice(3);

  const hasNegative = topThree.some(c=>c.delta<0);

  if(!hasNegative){
    const extraNegative = rest.find(c=>c.delta<0);
    if(extraNegative){
      return {
        top:[...topThree, extraNegative],
        rest:rest.filter(r=>r!==extraNegative)
      };
    }
  }

  return {top:topThree, rest};
}

function render(){
  enforceDensityConstraint();
  FIELDS.forEach(syncTilesFromSelect);

  const rem=el("remoteness").value;
  const terr=el("terrain").value;
  const dens=el("density").value;
  const dem=el("demand").value;
  const pri=el("priority").value;

  updateProgress();

  const complete=isContextComplete(rem,terr,dens,dem,pri);
  const container=el("results");

  if(!complete){
    el("contextStory").textContent="—";
    renderNeutralCards(container);
    syncMapping();
    return;
  }

  el("contextStory").textContent=contextStoryFromSelections(rem,terr,dens,dem,pri);

  const {scores,explain,contrib}=buildReasons(rem,terr,dens,dem,pri);
  container.innerHTML="";

  ORDER.forEach((key)=>{
    const t=tech[key];
    const score=scores[key];
    const [fitLabel,fitClass]=labelForFit(score);
    const maxScores = { fiber: 10, cellular: 6, ptp: 5, satellite: 6 };
    const pct = toPercent(score, maxScores[key]);

    const pros=explain[key].pros.slice(0,3);
    const cons=explain[key].cons.slice(0,2);
    const whyLines=[
      ...pros.map(p=>`<li>${p}</li>`),
      ...(cons.length ? cons.map(c=>`<li><span class="muted">Watch out:</span> ${c}</li>`) : [])
    ];

    const chipData = getSignalChips(key, contrib[key]);

    const topChips = chipData.top.map(c=>{
      const cls=c.delta>0?"pos":"neg";
      const sign=c.delta>0?`+${c.delta}`:`${c.delta}`;
      return `<span class="sig ${cls}">${c.label} ${sign}</span>`;
    }).join("");

    const extraChips = chipData.rest.map(c=>{
      const cls=c.delta>0?"pos":"neg";
      const sign=c.delta>0?`+${c.delta}`:`${c.delta}`;
      return `<span class="sig ${cls} extraChip">${c.label} ${sign}</span>`;
    }).join("");

    const chipsHTML = topChips + (extraChips ? `<span class="extraChips">${extraChips}</span>` : "");
    const toggleButtonHTML = extraChips 
      ? `<button class="text-toggle" type="button">
           <span>Show all factors</span>
           <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
         </button>` 
      : "";

    container.innerHTML+=`
      <div class="tech status-${fitClass}">
        <span class="badge ${fitClass}">${fitLabel}</span>

        <div class="meter" aria-label="Match meter">
          <span style="width:${pct}%"></span>
        </div>

        <div class="techName">
          <div class="icon" aria-hidden="true">${t.icon}</div>
          <div class="techText">
            <h3>${t.name}</h3>
            <div class="techHow"><span class="muted">How it works:</span> ${t.howSimple}</div>
          </div>
        </div>

        <div class="signals-wrapper">
          <div class="signals" aria-label="Active logic indicators">
            ${chipsHTML}
          </div>
          ${toggleButtonHTML}
        </div>

        <ul class="bullets">
          ${whyLines.join("")}
        </ul>

        <div class="mapping">
          <div class="muted" style="margin-bottom:6px;">Example CPP parameters (illustrative):</div>
          ${explain[key].mappingTags.map(x=>`<span class="tag">${x}</span>`).join("")}
        </div>
      </div>
    `;
  });

  syncMapping();
}

FIELDS.forEach(id=>{
  buildTilesForSelect(id);
  el(id).addEventListener("change", ()=>{
    if(id==="remoteness"){
      enforceDensityConstraint();
    }
    render();
  });
});

document.addEventListener("click", (e)=>{
  const btn = e.target.closest(".text-toggle");
  if(!btn) return;

  const wrapper = btn.closest(".signals-wrapper");
  if(!wrapper) return;

  const extra = wrapper.querySelector(".extraChips");
  if(!extra) return;

  const isOpen = extra.classList.contains("open");
  extra.classList.toggle("open", !isOpen);
  btn.classList.toggle("open", !isOpen);

  const textSpan = btn.querySelector("span");
  if(textSpan) {
    textSpan.textContent = isOpen ? "Show all factors" : "Hide extra factors";
  }
});

el("mappingToggle").addEventListener("change", syncMapping);

["step1","step2","step3"].forEach((sid)=>{
  const step=el(sid);
  const header=step.querySelector(".stepHeader");
  const toggle=()=>{
    guidedMode = false;
    const isOpen=step.getAttribute("aria-expanded")==="true";
    step.setAttribute("aria-expanded", isOpen ? "false" : "true");
  };
  header.addEventListener("click", toggle);
  header.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"||e.key===" "){
      e.preventDefault();
      toggle();
    }
  });
});

syncMapping();
render();