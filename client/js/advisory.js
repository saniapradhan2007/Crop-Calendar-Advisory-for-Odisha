/* Smart Advisory Module Script */

const pestDiagnosticCards = [
  {
    name: 'Brown Plant Hopper (BPH)',
    crop: 'Paddy',
    icon: 'fa-bug',
    symptoms: 'Yellowing of leaves, "hopper burn" patches where plants dry up in circular patterns near ground level.',
    causes: 'High humidity, dense planting without walkway lanes, excessive nitrogenous fertilizer application.',
    prevention: 'Maintain 30cm walkway gaps every 2m. Drain water periodically. Avoid over-fertilizing with Urea.',
    organic: 'Neem Seed Kernel Extract (NSKE 5%) @ 20ml/L water or Neem Oil (5ml/L).',
    chemical: 'Triflumezopyrim 10% SC @ 0.5ml/L or Pymetrozine 50% WDG @ 0.6g/L water.'
  },
  {
    name: 'Stem Borer (Yellow Stem Borer)',
    crop: 'Paddy / Maize',
    icon: 'fa-disease',
    symptoms: 'Central shoot wilts and dries producing "dead hearts" in early stage or "white heads" at panicle stage.',
    causes: 'Moth activity during warm humid nights; carry-over from infested stubble.',
    prevention: 'Set up Pheromone traps @ 8-10 traps/acre. Deep plowing after harvest to destroy egg masses.',
    organic: 'Release Trichogramma japonicum egg parasitoid @ 20,000/acre.',
    chemical: 'Chlorantraniliprole 0.4% GR @ 4 kg/acre or Cartap Hydrochloride 4G @ 7.5 kg/acre.'
  },
  {
    name: 'Blast Disease (Leaf & Neck Blast)',
    crop: 'Paddy',
    icon: 'fa-virus',
    symptoms: 'Spindle-shaped diamond lesions on leaves with brownish margins. Black neck rot causing panicle breakage.',
    causes: 'Magnaporthe oryzae fungus favored by cloudy sky, high relative humidity (>90%) and cool night temperatures.',
    prevention: 'Use resistant varieties (CR Dhan 307, Swarna). Treat seeds with Carbendazim 2g/kg before sowing.',
    organic: 'Pseudomonas fluorescens @ 10g/L water spray at 15-day intervals.',
    chemical: 'Tricyclazole 75% WP @ 0.6 g/L water or Isoprothiolane 40% EC @ 1.5 ml/L water.'
  },
  {
    name: 'Leaf Folder',
    crop: 'Paddy',
    icon: 'fa-leaf',
    symptoms: 'Leaves are folded longitudinally with white transparent streaks due to larvae scraping chlorophyll.',
    causes: 'High nitrogen doses, shaded field conditions.',
    prevention: 'Pass a rough rope across crop canopy to dislodge larvae in early stage.',
    organic: 'Spray Bacillus thuringiensis (Bt) formulation @ 1 kg/acre.',
    chemical: 'Flubendiamide 20% WG @ 50g/acre or Chlorpyrifos 20% EC @ 500ml/acre.'
  },
  {
    name: 'Sheath Blight',
    crop: 'Paddy',
    icon: 'fa-microscope',
    symptoms: 'Snake-skin like greenish-gray lesions on leaf sheaths near water line.',
    causes: 'Rhizoctonia solani fungus spread by irrigation water.',
    prevention: 'Keep field borders clean. Avoid close planting distance.',
    organic: 'Soil application of Trichoderma viride enriched FYM.',
    chemical: 'Hexaconazole 5% EC @ 2 ml/L or Validamycin 3% L @ 2 ml/L water.'
  },
  {
    name: 'Mustard / Groundnut Aphids',
    crop: 'Mustard / Groundnut',
    icon: 'fa-spider',
    symptoms: 'Small green/black insects sucking sap from young shoots, causing curling and honeydew mold.',
    causes: 'Dry warm winter weather.',
    prevention: 'Install yellow sticky traps @ 15-20 traps/acre.',
    organic: 'Neem Oil 10,000 ppm @ 2 ml/L or Fish Oil Rosin Soap @ 25 g/L.',
    chemical: 'Dimethoate 30% EC @ 1.7 ml/L or Imidacloprid 17.8% SL @ 0.5 ml/L water.'
  },
  {
    name: 'Fall Armyworm (FAW)',
    crop: 'Maize',
    icon: 'fa-skull-crossbones',
    symptoms: 'Large ragged holes on leaves and heavy frass (poop) in the central whorl.',
    causes: 'Spodoptera frugiperda moth laying eggs on whorl leaves.',
    prevention: 'Apply sand/ash mixture inside whorl leaves.',
    organic: 'Metarhizium anisopliae @ 5g/L water.',
    chemical: 'Emamectin Benzoate 5% SG @ 0.4 g/L or Spinetoram 11.7% SC @ 0.5 ml/L.'
  }
];

async function loadAdvisories() {
  const container = document.getElementById('advisoriesFeedContainer');
  if (!container) return;

  try {
    const res = await fetch('/api/advisories');
    const data = await res.json();
    if (data.success && data.data.length > 0) {
      renderAdvisories(data.data);
    } else {
      container.innerHTML = `<div class="p-4 text-center text-muted">No active advisories reported at present.</div>`;
    }
  } catch (err) {
    container.innerHTML = `<div class="alert alert-danger">Failed to load advisories</div>`;
  }
}

function renderAdvisories(advisories) {
  const container = document.getElementById('advisoriesFeedContainer');
  if (!container) return;

  container.innerHTML = advisories.map(adv => `
    <div class="glass-card p-4 mb-3 border-start border-4 ${adv.severity === 'High' ? 'border-danger' : adv.severity === 'Medium' ? 'border-warning' : 'border-success'}">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="fw-bold mb-0 text-dark">${adv.title}</h5>
        <span class="badge ${adv.severity === 'High' ? 'badge-high' : adv.severity === 'Medium' ? 'badge-medium' : 'badge-low'}">${adv.severity} Severity</span>
      </div>
      <p class="text-muted mb-2">${adv.description}</p>
      <div class="row g-2 mt-2">
        <div class="col-md-6">
          <small class="d-block text-dark fw-bold"><i class="fas fa-shield-alt text-success me-1"></i>Preventive Action:</small>
          <small class="text-muted">${adv.preventiveAction || 'Follow crop rotation and clean field borders'}</small>
        </div>
        <div class="col-md-6">
          <small class="d-block text-dark fw-bold"><i class="fas fa-pills text-primary me-1"></i>Treatment:</small>
          <small class="text-muted">${adv.chemicalTreatment || adv.organicTreatment || 'Consult local KVK officer'}</small>
        </div>
      </div>
      <div class="mt-3 pt-2 border-top d-flex justify-content-between text-muted fs-7">
        <span><i class="fas fa-map-marker-alt me-1"></i>${adv.district} (${adv.crop})</span>
        <span><i class="fas fa-building me-1"></i>${adv.publishedBy || 'Odisha Ag Department'}</span>
      </div>
    </div>
  `).join('');
}

function renderPestDiagnostics() {
  const container = document.getElementById('pestDiagnosticGrid');
  if (!container) return;

  container.innerHTML = pestDiagnosticCards.map(p => `
    <div class="col-md-6 col-lg-4">
      <div class="glass-card p-3 h-100 d-flex flex-direction-column justify-content-between">
        <div>
          <div class="d-flex align-items-center gap-2 mb-2">
            <div class="p-2 bg-danger bg-opacity-10 text-danger rounded-circle">
              <i class="fas ${p.icon} fa-lg"></i>
            </div>
            <div>
              <h6 class="fw-bold mb-0 text-dark">${p.name}</h6>
              <small class="text-success font-weight-bold">${p.crop}</small>
            </div>
          </div>
          <p class="small text-muted mb-2"><strong>Symptoms:</strong> ${p.symptoms}</p>
          <p class="small text-muted mb-2"><strong>Causes:</strong> ${p.causes}</p>
        </div>
        <div class="mt-2 pt-2 border-top">
          <small class="d-block text-success fw-bold">🌿 Organic Control:</small>
          <small class="text-muted d-block mb-1">${p.organic}</small>
          <small class="d-block text-primary fw-bold">🧪 Chemical Control:</small>
          <small class="text-muted d-block">${p.chemical}</small>
        </div>
      </div>
    </div>
  `).join('');
}

// Fertilizer Calculator Function
function calculateFertilizer() {
  const crop = document.getElementById('fertCropSelect').value;
  const acres = parseFloat(document.getElementById('fertAcresInput').value) || 1;
  const stage = document.getElementById('fertStageSelect').value;

  const resultDiv = document.getElementById('fertResultBox');
  if (!resultDiv) return;

  let urea = 0, dap = 0, mop = 0, ssp = 0;

  if (crop === 'Paddy') {
    if (stage === 'Basal') { dap = 50 * acres; mop = 40 * acres; urea = 20 * acres; }
    else if (stage === 'Tillering') { urea = 50 * acres; }
    else if (stage === 'Panicle') { urea = 25 * acres; }
  } else if (crop === 'Maize') {
    if (stage === 'Basal') { dap = 50 * acres; mop = 40 * acres; urea = 25 * acres; }
    else if (stage === 'Knee-high') { urea = 50 * acres; }
    else if (stage === 'Tasseling') { urea = 30 * acres; }
  } else if (crop === 'Groundnut') {
    ssp = 150 * acres; mop = 30 * acres; urea = 15 * acres;
  } else {
    urea = 40 * acres; dap = 35 * acres; mop = 25 * acres;
  }

  resultDiv.innerHTML = `
    <div class="glass-card p-3 border-start border-4 border-success">
      <h6 class="fw-bold text-success mb-2"><i class="fas fa-calculator me-2"></i>Fertilizer Recommendation (${acres} Acre - ${crop}):</h6>
      <ul class="mb-0 text-dark font-weight-bold">
        ${urea > 0 ? `<li>Urea: <span class="text-primary">${urea.toFixed(1)} kg</span></li>` : ''}
        ${dap > 0 ? `<li>DAP (Di-ammonium Phosphate): <span class="text-success">${dap.toFixed(1)} kg</span></li>` : ''}
        ${ssp > 0 ? `<li>SSP (Single Super Phosphate): <span class="text-warning">${ssp.toFixed(1)} kg</span></li>` : ''}
        ${mop > 0 ? `<li>MOP (Muriate of Potash): <span class="text-danger">${mop.toFixed(1)} kg</span></li>` : ''}
      </ul>
      <small class="d-block text-muted mt-2">⚡ Safety Tip: Always apply fertilizers when soil has adequate moisture. Wear gloves while handling chemical inputs.</small>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  loadAdvisories();
  renderPestDiagnostics();
  const fertBtn = document.getElementById('calcFertBtn');
  if (fertBtn) fertBtn.addEventListener('click', calculateFertilizer);
});
