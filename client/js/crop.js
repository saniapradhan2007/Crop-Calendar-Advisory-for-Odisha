/* Crop Calendar Module Script - 12 Month Visual Calendar & Timetable */

let currentCropData = [];
let activeMonthFilter = 'All';

const twelveMonthCalendarData = [
  {
    monthNum: '01',
    monthName: 'JANUARY',
    season: 'Rabi (Winter)',
    seasonBadge: 'bg-primary',
    bgGradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    crops: ['Biri (Black Gram)', 'Moong (Green Gram)', 'Mustard', 'Potato', 'Onion'],
    activities: ['Top-dressing of Urea in Rabi crops', 'Weeding & intercultural operations', 'Powdery mildew & aphid control'],
    irrigation: 'Light irrigation at 7-8 day intervals',
    weather: 'Cool & Dry (15°C - 25°C)'
  },
  {
    monthNum: '02',
    monthName: 'FEBRUARY',
    season: 'Zaid / Summer Prep',
    seasonBadge: 'bg-warning text-dark',
    bgGradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
    crops: ['Summer Paddy', 'Sunflower', 'Sesame', 'Watermelon', 'Okra'],
    activities: ['Harvesting of Rabi Mustard & Pulses', 'Land preparation for Summer Zaid vegetables', 'Drip line installation'],
    irrigation: 'Irrigate every 6 days as temperature rises',
    weather: 'Mild Sunny (20°C - 30°C)'
  },
  {
    monthNum: '03',
    monthName: 'MARCH',
    season: 'Zaid (Summer)',
    seasonBadge: 'bg-warning text-dark',
    bgGradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
    crops: ['Summer Vegetables (Brinjal/Tomato)', 'Groundnut', 'Maize', 'Cucumber'],
    activities: ['Sowing of summer Zaid crops', 'Whitefly & Red Spider Mite pest monitoring', 'Mulching for soil moisture'],
    irrigation: 'Frequent light irrigation (4-5 days interval)',
    weather: 'Warm & Bright (25°C - 34°C)'
  },
  {
    monthNum: '04',
    monthName: 'APRIL',
    season: 'Zaid (Summer)',
    seasonBadge: 'bg-danger',
    bgGradient: 'linear-gradient(135deg, #dc2626, #f87171)',
    crops: ['Watermelon', 'Muskmelon', 'Chilli', 'Spring Sugarcane'],
    activities: ['Intensive irrigation for standing summer crops', 'Harvesting early Zaid vegetables', 'Orchard shading'],
    irrigation: 'High irrigation requirement (3-4 days interval)',
    weather: 'Hot & Dry (28°C - 38°C)'
  },
  {
    monthNum: '05',
    monthName: 'MAY',
    season: 'Pre-Kharif Prep',
    seasonBadge: 'bg-danger',
    bgGradient: 'linear-gradient(135deg, #9f1239, #f43f5e)',
    crops: ['Pre-Kharif Jute', 'Summer Paddy Harvest', 'Green Manure (Daincha)'],
    activities: ['Summer deep ploughing to destroy pest pupae', 'Seed procurement & germination test', 'Nursery land preparation'],
    irrigation: 'Pre-sowing irrigation for Daincha/Jute',
    weather: 'Pre-Monsoon Heat (30°C - 40°C)'
  },
  {
    monthNum: '06',
    monthName: 'JUNE',
    season: 'Kharif (Monsoon Onset)',
    seasonBadge: 'bg-success',
    bgGradient: 'linear-gradient(135deg, #15803d, #4ade80)',
    crops: ['Kharif Paddy (Swarna/Pooja)', 'Maize', 'Bt Cotton', 'Arhar (Pigeon Pea)'],
    activities: ['Sowing in paddy nurseries', 'Seed treatment with Carbendazim (2g/kg)', 'Main field bunding & ploughing'],
    irrigation: 'Monsoon rain dependent; drainage prep',
    weather: 'Monsoon Onset Rains (25°C - 33°C)'
  },
  {
    monthNum: '07',
    monthName: 'JULY',
    season: 'Kharif (Monsoon)',
    seasonBadge: 'bg-success',
    bgGradient: 'linear-gradient(135deg, #047857, #34d399)',
    crops: ['Kharif Paddy (Transplanting)', 'Groundnut', 'Sesame', 'Turmeric', 'Ginger'],
    activities: ['Paddy seedling transplantation', 'Applying basal dose of NPK (20:40:40)', 'Turmeric & Ginger planting'],
    irrigation: 'Maintain 3-5 cm standing water layer',
    weather: 'Monsoon Showers (24°C - 31°C)'
  },
  {
    monthNum: '08',
    monthName: 'AUGUST',
    season: 'Kharif (Monsoon Peak)',
    seasonBadge: 'bg-success',
    bgGradient: 'linear-gradient(135deg, #065f46, #10b981)',
    crops: ['Standing Kharif Paddy', 'Cotton', 'Vegetables', 'Spices'],
    activities: ['Gap filling in paddy fields', 'First weeding & intercultural ops', '1st Top-dressing of Urea (35 kg/acre)'],
    irrigation: 'Proper field drainage during heavy rains',
    weather: 'Heavy Monsoon (24°C - 30°C)'
  },
  {
    monthNum: '09',
    monthName: 'SEPTEMBER',
    season: 'Kharif (Tillering Stage)',
    seasonBadge: 'bg-success',
    bgGradient: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    crops: ['Paddy (Tillering/Panicle)', 'Maize', 'Pulses'],
    activities: ['Water management (5 cm standing water)', 'Stem Borer & BPH pest inspection', '2nd dose Nitrogen application'],
    irrigation: 'Ensure uninterrupted tillering water',
    weather: 'Passing Monsoon Rains (25°C - 32°C)'
  },
  {
    monthNum: '10',
    monthName: 'OCTOBER',
    season: 'Kharif Harvest & Rabi Prep',
    seasonBadge: 'bg-info text-dark',
    bgGradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
    crops: ['Early Paddy Harvest', 'Rabi Mustard', 'Groundnut', 'Potato Sowing'],
    activities: ['Water drainage 10 days before harvest', 'Paddy harvesting & field drying', 'Ploughing for Rabi pulse sowing'],
    irrigation: 'Pre-sowing irrigation for Rabi crops',
    weather: 'Post-Monsoon Cool (20°C - 30°C)'
  },
  {
    monthNum: '11',
    monthName: 'NOVEMBER',
    season: 'Rabi (Winter Sowing)',
    seasonBadge: 'bg-info text-dark',
    bgGradient: 'linear-gradient(135deg, #0369a1, #7dd3fc)',
    crops: ['Paddy Main Harvest', 'Rabi Mustard', 'Biri', 'Moong', 'Wheat', 'Gram'],
    activities: ['Threshing, winnowing & drying of Paddy', 'Sowing of Rabi oilseeds & pulses', 'Rhizobium seed inoculation'],
    irrigation: 'Light post-sowing irrigation',
    weather: 'Pleasant Winter (16°C - 27°C)'
  },
  {
    monthNum: '12',
    monthName: 'DECEMBER',
    season: 'Rabi (Winter)',
    seasonBadge: 'bg-primary',
    bgGradient: 'linear-gradient(135deg, #1d4ed8, #60a5fa)',
    crops: ['Rabi Pulses', 'Mustard', 'Winter Vegetables (Cabbage/Cauliflower/Pea)'],
    activities: ['1st Irrigation for Rabi mustard & pulses', 'Soil mulching for moisture retention', 'Frost protection measures'],
    irrigation: 'Irrigate Mustard at flowering stage',
    weather: 'Cool Winter (12°C - 24°C)'
  }
];

function renderTwelveMonthVisualGrid(filterMonth = 'All', filterSeason = 'All') {
  const container = document.getElementById('visualMonthCalendarGrid');
  if (!container) return;

  let filtered = twelveMonthCalendarData;

  if (filterMonth !== 'All') {
    filtered = filtered.filter(m => m.monthName.toLowerCase() === filterMonth.toLowerCase() || m.monthNum === filterMonth);
  }

  if (filterSeason !== 'All') {
    filtered = filtered.filter(m => m.season.toLowerCase().includes(filterSeason.toLowerCase()));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-4">
        <p class="text-muted">No calendar month matches the selected filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(m => `
    <div class="col-md-6 col-lg-4">
      <div class="glass-card h-100 overflow-hidden border-0 shadow-lg position-relative d-flex flex-column">
        <!-- Month Header Banner -->
        <div class="p-3 text-white d-flex justify-content-between align-items-center" style="background: ${m.bgGradient};">
          <div>
            <span class="fs-4 fw-extrabold opacity-75 me-2">${m.monthNum}</span>
            <span class="fs-5 fw-bold letter-spacing-1">${m.monthName}</span>
          </div>
          <span class="badge ${m.seasonBadge} rounded-pill px-3 py-1 fw-bold shadow-sm">${m.season}</span>
        </div>

        <div class="p-4 d-flex flex-column flex-grow-1">
          <!-- Weather Summary -->
          <div class="mb-3 p-2 bg-light rounded text-muted small d-flex justify-content-between align-items-center">
            <span><i class="fas fa-temperature-half text-danger me-1"></i>${m.weather}</span>
            <span><i class="fas fa-droplet text-primary me-1"></i>${m.irrigation}</span>
          </div>

          <!-- Crops to Sow/Plant -->
          <div class="mb-3">
            <strong class="text-dark d-block mb-1 small"><i class="fas fa-wheat-awn text-warning me-1"></i>Crops to Sow & Plant:</strong>
            <div class="d-flex flex-wrap gap-1">
              ${m.crops.map(c => `<span class="badge bg-success bg-opacity-10 text-success border border-success px-2 py-1 rounded-pill"><i class="fas fa-seedling me-1"></i>${c}</span>`).join('')}
            </div>
          </div>

          <!-- Key Agricultural Activities -->
          <div class="mt-auto pt-2 border-top">
            <strong class="text-dark d-block mb-1 small"><i class="fas fa-list-check text-primary me-1"></i>Key Activities & Schedule:</strong>
            <ul class="mb-0 ps-3 small text-muted">
              ${m.activities.map(a => `<li>${a}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterVisualMonth(month) {
  activeMonthFilter = month;
  document.querySelectorAll('.month-filter-btn').forEach(btn => {
    if (btn.dataset.month === month) btn.classList.add('active', 'btn-success');
    else btn.classList.remove('active', 'btn-success');
  });

  const seasonFilter = document.getElementById('cropSeasonFilter')?.value || 'All';
  renderTwelveMonthVisualGrid(month, seasonFilter);
}

async function loadCrops() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlDistrict = urlParams.get('district');
  const urlCrop = urlParams.get('crop');

  const districtSelect = document.getElementById('cropDistrictFilter');
  if (urlDistrict && districtSelect && !districtSelect.dataset.initialized) {
    districtSelect.value = urlDistrict;
    districtSelect.dataset.initialized = 'true';
  }

  const cropSelect = document.getElementById('cropNameFilter');
  if (urlCrop && cropSelect && !cropSelect.dataset.initialized) {
    cropSelect.value = urlCrop;
    cropSelect.dataset.initialized = 'true';
  }

  const district = districtSelect?.value || 'All';
  const season = document.getElementById('cropSeasonFilter')?.value || 'All';
  const cropName = cropSelect?.value || 'All';

  // Also update visual grid filter
  renderTwelveMonthVisualGrid(activeMonthFilter, season);

  const container = document.getElementById('cropTimelineContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading crop schedule...</span>
      </div>
      <p class="mt-2 text-muted">Fetching crop schedule for ${district} district...</p>
    </div>
  `;

  try {
    const query = new URLSearchParams({ district, season, crop: cropName });
    const res = await fetch(`/api/crops?${query.toString()}`);
    const data = await res.json();

    if (data.success && data.data.length > 0) {
      currentCropData = data.data;
      renderCropTimeline(data.data[0]);
      renderCropSelectorOptions(data.data);
    } else {
      container.innerHTML = `
        <div class="glass-card p-4 text-center my-4">
          <i class="fas fa-seedling fa-3x text-muted mb-3"></i>
          <h4>No Exact Crop Schedule Found</h4>
          <p class="text-muted">No specific timeline found. Please select another district or crop type.</p>
        </div>
      `;
    }
  } catch (err) {
    container.innerHTML = `<div class="alert alert-danger">Error connecting to server. Please try again.</div>`;
  }
}

function renderCropSelectorOptions(crops) {
  const selector = document.getElementById('activeCropSelector');
  if (!selector) return;
  selector.innerHTML = crops.map(c => `<option value="${c._id}">${c.crop} (${c.district} - ${c.season})</option>`).join('');
  selector.onchange = (e) => {
    const selected = crops.find(c => c._id === e.target.value);
    if (selected) renderCropTimeline(selected);
  };
}

function renderCropTimeline(crop) {
  const container = document.getElementById('cropTimelineContainer');
  if (!container) return;

  let stagesHTML = '';
  if (crop.stages && crop.stages.length > 0) {
    stagesHTML = crop.stages.map((stage, idx) => `
      <div class="timeline-item">
        <div class="timeline-icon">
          ${idx + 1}
        </div>
        <div class="timeline-content">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="fw-bold mb-0 text-primary"><i class="fas fa-check-circle me-2 text-success"></i>${stage.stageName}</h5>
            <span class="badge bg-primary-light text-primary px-3 py-1 rounded-pill"><i class="far fa-clock me-1"></i>${stage.durationDays || 'Phase ' + (idx+1)}</span>
          </div>
          <div class="row g-3 mt-1">
            <div class="col-md-6">
              <div class="p-2 bg-light rounded">
                <strong class="d-block text-dark mb-1"><i class="fas fa-list-check text-secondary me-2"></i>Key Activities:</strong>
                <ul class="mb-0 ps-3 small text-muted">
                  ${stage.activities ? stage.activities.map(a => `<li>${a}</li>`).join('') : '<li>Perform standard land/field maintenance</li>'}
                </ul>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-2 bg-light rounded">
                <strong class="d-block text-dark mb-1"><i class="fas fa-flask text-warning me-2"></i>Fertilizer & Dosage:</strong>
                <p class="mb-1 small text-muted">${stage.fertilizers ? stage.fertilizers.join(', ') : 'Standard soil nutrient dose'}</p>
                <strong class="d-block text-dark mt-2 mb-1"><i class="fas fa-bug text-danger me-2"></i>Pest & Disease Focus:</strong>
                <p class="mb-0 small text-muted">${stage.pestsAndDiseases ? stage.pestsAndDiseases.join(', ') : 'Regular field monitoring'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  container.innerHTML = `
    <div class="glass-card p-4 mb-4">
      <div class="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-3 mb-3">
        <div>
          <h3 class="fw-bold text-success mb-1"><i class="fas fa-seedling me-2"></i>${crop.crop} Calendar Schedule</h3>
          <p class="text-muted mb-0"><i class="fas fa-map-marker-alt text-danger me-1"></i>District: <strong>${crop.district}</strong> | <i class="fas fa-sun text-warning me-1"></i>Season: <strong>${crop.season}</strong></p>
        </div>
        <div class="mt-2 mt-md-0">
          <button onclick="exportCropPDF('${crop.crop}', '${crop.district}')" class="btn btn-primary-custom">
            <i class="fas fa-file-pdf me-2"></i>Export Calendar PDF
          </button>
        </div>
      </div>

      <div class="row text-center mb-4 g-3">
        <div class="col-6 col-md-3">
          <div class="p-3 bg-light rounded-3">
            <small class="text-muted d-block">Sowing Window</small>
            <strong class="text-dark fs-6">${crop.sowingDate || 'Optimal Planting Window'}</strong>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="p-3 bg-light rounded-3">
            <small class="text-muted d-block">Harvest Window</small>
            <strong class="text-dark fs-6">${crop.harvestDate || 'Harvest Period'}</strong>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="p-3 bg-light rounded-3">
            <small class="text-muted d-block">Crop Duration</small>
            <strong class="text-dark fs-6">${crop.durationMonths || 3} Months</strong>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="p-3 bg-light rounded-3">
            <small class="text-muted d-block">Seed Rate</small>
            <strong class="text-dark fs-6">${crop.seedRate || 'Standard Rate/acre'}</strong>
          </div>
        </div>
      </div>

      <div class="alert alert-info py-2">
        <i class="fas fa-info-circle me-2"></i><strong>Soil Requirement:</strong> ${crop.soilRequirement || 'Well-drained fertile loamy soil'}
      </div>

      <h4 class="fw-bold mt-4 mb-3 text-dark"><i class="fas fa-tasks me-2 text-primary"></i>Step-by-Step Activity Timeline</h4>
      <div class="timeline">
        ${stagesHTML}
      </div>

      ${crop.advisory ? `
        <div class="mt-4 p-3 border-start border-4 border-warning bg-light rounded">
          <h6 class="fw-bold text-warning mb-1"><i class="fas fa-lightbulb me-2"></i>Officer Smart Advisory:</h6>
          <p class="mb-0 text-muted">${crop.advisory}</p>
        </div>
      ` : ''}
    </div>
  `;
}

function exportCropPDF(cropName, district) {
  if (typeof showToast === 'function') showToast(`Generating PDF for ${cropName} (${district})...`, 'success');
  window.print();
}

document.addEventListener('DOMContentLoaded', () => {
  renderTwelveMonthVisualGrid();
  if (document.getElementById('cropTimelineContainer')) {
    loadCrops();
  }
});
