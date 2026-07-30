/* Crop Calendar Module Script - Month-Wise Odisha Crop Calendar */

let currentCropData = [];
let activeMonthFilter = 'All';

const twelveMonthCalendarData = [
  {
    monthNum: '01',
    monthName: 'January',
    season: 'Rabi (Winter)',
    seasonBadge: 'bg-primary',
    bgGradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    crops: ['Biri (Black Gram)', 'Moong (Green Gram)', 'Mustard', 'Potato', 'Onion'],
    cropDetails: [
      {
        cropName: 'Rabi Black Gram (Biri - PU 31)',
        sowingTime: 'Nov 15 - Jan 15',
        harvestTime: 'Feb 25 - Mar 15',
        fertilizerSchedule: 'Basal Dose: DAP 40 kg/acre + Gypsum 100 kg/acre at land prep. Folia spray of 2% Urea at flowering.',
        farmingAdvisory: 'Spray Wettable Sulphur (3g/L) for powdery mildew protection. Maintain moist soil during pod development.'
      },
      {
        cropName: 'Rabi Mustard (M-27 / Anuradha)',
        sowingTime: 'Oct 25 - Nov 30',
        harvestTime: 'Feb 10 - Feb 28',
        fertilizerSchedule: 'NPK 30:15:15 kg/acre. Apply 1st Urea top-dressing (15 kg/acre) after 1st irrigation at 25 DAS.',
        farmingAdvisory: 'Monitor for aphid infestation. Spray Dimethoate 30 EC (1.5 ml/L) if aphid colony exceeds 10 per plant.'
      },
      {
        cropName: 'Winter Potato (Kufri Jyoti)',
        sowingTime: 'Nov 01 - Dec 10',
        harvestTime: 'Feb 15 - Mar 10',
        fertilizerSchedule: 'NPK 60:40:50 kg/acre. Apply 50% N + full P & K at planting; remaining N at earthing-up (30 DAS).',
        farmingAdvisory: 'Perform earthing-up at 30 DAS. Spray Mancozeb 75 WP (2.5g/L) against Late Blight disease.'
      }
    ],
    activities: ['Top-dressing of Urea in Rabi crops', 'Weeding & intercultural operations', 'Powdery mildew & aphid control'],
    irrigation: 'Light irrigation at 7-8 day intervals',
    weather: 'Cool & Dry (15°C - 25°C)'
  },
  {
    monthNum: '02',
    monthName: 'February',
    season: 'Zaid / Summer Prep',
    seasonBadge: 'bg-warning text-dark',
    bgGradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
    crops: ['Summer Paddy', 'Sunflower', 'Sesame', 'Watermelon', 'Okra'],
    cropDetails: [
      {
        cropName: 'Summer Paddy (Naveen / Lalat)',
        sowingTime: 'Dec 15 - Jan 31 (Nursery)',
        harvestTime: 'May 01 - May 20',
        fertilizerSchedule: 'Basal NPK 20:40:40. 1st Top-dressing (21 DAT): Urea 30 kg/acre. 2nd Top-dressing (45 DAT): Urea 20 kg + MOP 15 kg/acre.',
        farmingAdvisory: 'Maintain 3 cm standing water. Spray Cartap Hydrochloride 4G (10 kg/acre) for stem borer control.'
      },
      {
        cropName: 'Sunflower (KBSH-44)',
        sowingTime: 'Jan 15 - Feb 28',
        harvestTime: 'May 10 - May 30',
        fertilizerSchedule: 'NPK 24:36:24 kg/acre. Apply Boron (2g/L) at ray floret stage to improve seed filling.',
        farmingAdvisory: 'Hand-pollination in early morning hours increases seed yield by 20%. Keep soil moist during flowering.'
      }
    ],
    activities: ['Harvesting of Rabi Mustard & Pulses', 'Land preparation for Summer Zaid vegetables', 'Drip line installation'],
    irrigation: 'Irrigate every 6 days as temperature rises',
    weather: 'Mild Sunny (20°C - 30°C)'
  },
  {
    monthNum: '03',
    monthName: 'March',
    season: 'Zaid (Summer)',
    seasonBadge: 'bg-warning text-dark',
    bgGradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
    crops: ['Summer Vegetables (Brinjal/Tomato)', 'Groundnut', 'Maize', 'Cucumber'],
    cropDetails: [
      {
        cropName: 'Summer Groundnut (TAG-24)',
        sowingTime: 'Jan 25 - Mar 10',
        harvestTime: 'May 20 - Jun 15',
        fertilizerSchedule: 'Basal NPK 8:16:16 kg/acre + Gypsum 100 kg/acre at pegging stage (35 DAS).',
        farmingAdvisory: 'Apply Gypsum near root zone during earthing up. Spray Chlorpyrifos 20 EC (2ml/L) for white grub control.'
      },
      {
        cropName: 'Summer Okra / Lady Finger',
        sowingTime: 'Feb 15 - Mar 31',
        harvestTime: 'Apr 25 - Jun 30',
        fertilizerSchedule: 'NPK 30:20:20 kg/acre. Top-dress Urea (15 kg/acre) at 30 and 45 DAS.',
        farmingAdvisory: 'Spray Imidacloprid 17.8 SL (0.3 ml/L) for Yellow Vein Mosaic Virus (YVMV) whitefly vector control.'
      }
    ],
    activities: ['Sowing of summer Zaid crops', 'Whitefly & Red Spider Mite pest monitoring', 'Mulching for soil moisture'],
    irrigation: 'Frequent light irrigation (4-5 days interval)',
    weather: 'Warm & Bright (25°C - 34°C)'
  },
  {
    monthNum: '04',
    monthName: 'April',
    season: 'Zaid (Summer)',
    seasonBadge: 'bg-danger',
    bgGradient: 'linear-gradient(135deg, #dc2626, #f87171)',
    crops: ['Watermelon', 'Muskmelon', 'Chilli', 'Spring Sugarcane'],
    cropDetails: [
      {
        cropName: 'Summer Watermelon (Sugar Baby)',
        sowingTime: 'Feb 01 - Mar 15',
        harvestTime: 'Apr 20 - May 31',
        fertilizerSchedule: 'NPK 35:25:25 kg/acre. Apply 13-0-45 (Water soluble K) during fruit enlargement.',
        farmingAdvisory: 'Place straw mulching below fruits to avoid soil contact rot. Irrigate strictly at 3-day intervals.'
      }
    ],
    activities: ['Intensive irrigation for standing summer crops', 'Harvesting early Zaid vegetables', 'Orchard shading'],
    irrigation: 'High irrigation requirement (3-4 days interval)',
    weather: 'Hot & Dry (28°C - 38°C)'
  },
  {
    monthNum: '05',
    monthName: 'May',
    season: 'Pre-Kharif Prep',
    seasonBadge: 'bg-danger',
    bgGradient: 'linear-gradient(135deg, #9f1239, #f43f5e)',
    crops: ['Pre-Kharif Jute', 'Summer Paddy Harvest', 'Green Manure (Daincha)'],
    cropDetails: [
      {
        cropName: 'Pre-Kharif Jute (JRC-321)',
        sowingTime: 'Apr 15 - May 31',
        harvestTime: 'Aug 15 - Sep 15',
        fertilizerSchedule: 'NPK 24:12:12 kg/acre. Top-dress Urea (15 kg/acre) at 3 weeks after sowing.',
        farmingAdvisory: 'Perform thinning at 20 DAS to maintain 10 cm plant distance. Retting in clean running water.'
      }
    ],
    activities: ['Summer deep ploughing to destroy pest pupae', 'Seed procurement & germination test', 'Nursery land preparation'],
    irrigation: 'Pre-sowing irrigation for Daincha/Jute',
    weather: 'Pre-Monsoon Heat (30°C - 40°C)'
  },
  {
    monthNum: '06',
    monthName: 'June',
    season: 'Kharif (Monsoon Onset)',
    seasonBadge: 'bg-success',
    bgGradient: 'linear-gradient(135deg, #15803d, #4ade80)',
    crops: ['Kharif Paddy (Swarna/Pooja)', 'Maize', 'Bt Cotton', 'Arhar (Pigeon Pea)'],
    cropDetails: [
      {
        cropName: 'Kharif Paddy (Swarna / CR-1018)',
        sowingTime: 'Jun 10 - Jul 10 (Nursery)',
        harvestTime: 'Nov 01 - Nov 30',
        fertilizerSchedule: 'Basal NPK 20:40:40 kg/acre. 1st Top-dressing (21 DAT): Urea 35 kg/acre. 2nd Top-dressing (45 DAT): Urea 25 kg + MOP 15 kg/acre.',
        farmingAdvisory: 'Seed treatment with Carbendazim (2g/kg). Maintain 5 cm standing water layer. Spray Tricyclazole 75 WP (0.6g/L) for Paddy Blast.'
      },
      {
        cropName: 'Bt Cotton',
        sowingTime: 'Jun 01 - Jun 30',
        harvestTime: 'Nov 15 - Dec 31',
        fertilizerSchedule: 'NPK 40:20:20 kg/acre. Apply Urea in 3 split doses at 30, 60 & 90 days after sowing.',
        farmingAdvisory: 'Install 5 Pheromone Traps/acre to monitor Pink Bollworm. Spray Imidacloprid 17.8 SL (0.3ml/L) for sucking pests.'
      }
    ],
    activities: ['Sowing in paddy nurseries', 'Seed treatment with Carbendazim (2g/kg)', 'Main field bunding & ploughing'],
    irrigation: 'Monsoon rain dependent; drainage prep',
    weather: 'Monsoon Onset Rains (25°C - 33°C)'
  },
  {
    monthNum: '07',
    monthName: 'July',
    season: 'Kharif (Monsoon)',
    seasonBadge: 'bg-success',
    bgGradient: 'linear-gradient(135deg, #047857, #34d399)',
    crops: ['Kharif Paddy (Transplanting)', 'Groundnut', 'Sesame', 'Turmeric', 'Ginger'],
    cropDetails: [
      {
        cropName: 'Kharif Groundnut (AK-12-24)',
        sowingTime: 'Jun 20 - Jul 25',
        harvestTime: 'Oct 15 - Nov 10',
        fertilizerSchedule: 'Basal NPK 8:16:16 kg/acre + Gypsum 100 kg/acre at pegging stage.',
        farmingAdvisory: 'Seed treatment with Trichoderma (10g/kg). Drench soil with Chlorpyrifos for white grub prevention.'
      }
    ],
    activities: ['Paddy seedling transplantation', 'Applying basal dose of NPK (20:40:40)', 'Turmeric & Ginger planting'],
    irrigation: 'Maintain 3-5 cm standing water layer',
    weather: 'Monsoon Showers (24°C - 31°C)'
  },
  {
    monthNum: '08',
    monthName: 'August',
    season: 'Kharif (Monsoon Peak)',
    seasonBadge: 'bg-success',
    bgGradient: 'linear-gradient(135deg, #065f46, #10b981)',
    crops: ['Standing Kharif Paddy', 'Cotton', 'Vegetables', 'Spices'],
    cropDetails: [
      {
        cropName: 'Standing Kharif Paddy (Vegetative Stage)',
        sowingTime: 'Transplanted in July',
        harvestTime: 'Nov 15 - Dec 15',
        fertilizerSchedule: 'Apply 1st Top-Dressing of Urea (35 kg/acre) mixed with Neem cake at 21-25 days after transplanting.',
        farmingAdvisory: 'Inspect tiller bases for Brown Planthopper (BPH). Spray Pymetrozine 50 WG (120g/acre) if BPH count > 10/hill.'
      }
    ],
    activities: ['Gap filling in paddy fields', 'First weeding & intercultural ops', '1st Top-dressing of Urea (35 kg/acre)'],
    irrigation: 'Proper field drainage during heavy rains',
    weather: 'Heavy Monsoon (24°C - 30°C)'
  },
  {
    monthNum: '09',
    monthName: 'September',
    season: 'Kharif (Tillering Stage)',
    seasonBadge: 'bg-success',
    bgGradient: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    crops: ['Paddy (Tillering/Panicle)', 'Maize', 'Pulses'],
    cropDetails: [
      {
        cropName: 'Kharif Paddy (Panicle Initiation)',
        sowingTime: 'Transplanted in July',
        harvestTime: 'Nov 10 - Dec 10',
        fertilizerSchedule: 'Apply 2nd Top-Dressing of Urea (25 kg/acre) + MOP (15 kg/acre) at Panicle Initiation stage.',
        farmingAdvisory: 'Maintain 5 cm standing water during flowering. Spray Hexaconazole 5 EC (2ml/L) for Sheath Blight control.'
      }
    ],
    activities: ['Water management (5 cm standing water)', 'Stem Borer & BPH pest inspection', '2nd dose Nitrogen application'],
    irrigation: 'Ensure uninterrupted tillering water',
    weather: 'Passing Monsoon Rains (25°C - 32°C)'
  },
  {
    monthNum: '10',
    monthName: 'October',
    season: 'Kharif Harvest & Rabi Prep',
    seasonBadge: 'bg-info text-dark',
    bgGradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
    crops: ['Early Paddy Harvest', 'Rabi Mustard', 'Groundnut', 'Potato Sowing'],
    cropDetails: [
      {
        cropName: 'Early Kharif Paddy Harvesting',
        sowingTime: 'Sown in June',
        harvestTime: 'Oct 15 - Nov 05',
        fertilizerSchedule: 'No chemical fertilizer application required during harvest window.',
        farmingAdvisory: 'Drain out water 10 days before harvesting. Harvest when 85% grains turn golden yellow to avoid shattering loss.'
      }
    ],
    activities: ['Water drainage 10 days before harvest', 'Paddy harvesting & field drying', 'Ploughing for Rabi pulse sowing'],
    irrigation: 'Pre-sowing irrigation for Rabi crops',
    weather: 'Post-Monsoon Cool (20°C - 30°C)'
  },
  {
    monthNum: '11',
    monthName: 'November',
    season: 'Rabi (Winter Sowing)',
    seasonBadge: 'bg-info text-dark',
    bgGradient: 'linear-gradient(135deg, #0369a1, #7dd3fc)',
    crops: ['Paddy Main Harvest', 'Rabi Mustard', 'Biri', 'Moong', 'Wheat', 'Gram'],
    cropDetails: [
      {
        cropName: 'Rabi Mustard Sowing',
        sowingTime: 'Oct 25 - Nov 25',
        harvestTime: 'Feb 15 - Mar 05',
        fertilizerSchedule: 'Basal NPK 30:15:15 kg/acre + Sulphur 10 kg/acre at land prep.',
        farmingAdvisory: 'Seed treatment with Metalaxyl 35 SD (6g/kg). Ensure 30x10 cm plant spacing.'
      }
    ],
    activities: ['Threshing, winnowing & drying of Paddy', 'Sowing of Rabi oilseeds & pulses', 'Rhizobium seed inoculation'],
    irrigation: 'Light post-sowing irrigation',
    weather: 'Pleasant Winter (16°C - 27°C)'
  },
  {
    monthNum: '12',
    monthName: 'December',
    season: 'Rabi (Winter)',
    seasonBadge: 'bg-primary',
    bgGradient: 'linear-gradient(135deg, #1d4ed8, #60a5fa)',
    crops: ['Rabi Pulses', 'Mustard', 'Winter Vegetables (Cabbage/Cauliflower/Pea)'],
    cropDetails: [
      {
        cropName: 'Winter Cauliflower & Cabbage',
        sowingTime: 'Nov 01 - Dec 15',
        harvestTime: 'Feb 10 - Mar 20',
        fertilizerSchedule: 'NPK 50:30:40 kg/acre. Top-dress Urea (20 kg/acre) 25 days after transplanting.',
        farmingAdvisory: 'Inspect for Diamondback Moth (DBM). Spray Spinosad 45 SC (0.3ml/L) if larva observed.'
      }
    ],
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
            <strong class="text-dark d-block mb-1 small"><i class="fas fa-wheat-awn text-warning me-1"></i>Crops Grown in ${m.monthName}:</strong>
            <div class="d-flex flex-wrap gap-1">
              ${m.crops.map(c => `<span class="badge bg-success bg-opacity-10 text-success border border-success px-2 py-1 rounded-pill"><i class="fas fa-seedling me-1"></i>${c}</span>`).join('')}
            </div>
          </div>

          <!-- Action Button to Open Full Month Advisory Modal -->
          <button onclick="openMonthAdvisoryModal('${m.monthName}')" class="btn btn-outline-success btn-sm w-100 rounded-pill fw-bold mb-3">
            <i class="fas fa-book-open me-1"></i>View ${m.monthName} Crop Schedule & Advisory
          </button>

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

function openMonthAdvisoryModal(monthName) {
  const m = twelveMonthCalendarData.find(x => x.monthName.toLowerCase() === monthName.toLowerCase());
  if (!m) return;

  const modalTitle = document.getElementById('monthModalTitle');
  const modalBody = document.getElementById('monthModalBody');

  if (modalTitle) modalTitle.innerHTML = `<i class="fas fa-calendar-check text-success me-2"></i>${m.monthName.toUpperCase()} Odisha Crop Advisory & Schedule`;

  if (modalBody) {
    let cropsHTML = '';
    if (m.cropDetails && m.cropDetails.length > 0) {
      cropsHTML = m.cropDetails.map(c => `
        <div class="glass-card p-3 mb-3 border-start border-4 border-success">
          <h5 class="fw-bold text-success mb-2"><i class="fas fa-seedling me-2"></i>${c.cropName}</h5>
          
          <div class="row g-2 text-center mb-3">
            <div class="col-6">
              <div class="p-2 bg-light rounded">
                <small class="text-muted d-block">Sowing Time Window</small>
                <strong class="text-dark small"><i class="fas fa-calendar-plus text-primary me-1"></i>${c.sowingTime}</strong>
              </div>
            </div>
            <div class="col-6">
              <div class="p-2 bg-light rounded">
                <small class="text-muted d-block">Harvesting Time Window</small>
                <strong class="text-dark small"><i class="fas fa-scissors text-danger me-1"></i>${c.harvestTime}</strong>
              </div>
            </div>
          </div>

          <div class="mb-2">
            <strong class="d-block text-dark small mb-1"><i class="fas fa-flask text-warning me-1"></i>Fertilizer Schedule & Dosage:</strong>
            <p class="mb-0 small text-muted bg-light p-2 rounded">${c.fertilizerSchedule}</p>
          </div>

          <div>
            <strong class="d-block text-dark small mb-1"><i class="fas fa-lightbulb text-danger me-1"></i>Farming Advisory & Pest Guidance:</strong>
            <p class="mb-0 small text-danger bg-danger bg-opacity-10 p-2 rounded fw-semibold">${c.farmingAdvisory}</p>
          </div>
        </div>
      `).join('');
    } else {
      cropsHTML = `<div class="alert alert-info">General crop care and seasonal field maintenance for ${m.monthName}.</div>`;
    }

    modalBody.innerHTML = `
      <div class="mb-3 p-3 text-white rounded-3 d-flex justify-content-between align-items-center" style="background: ${m.bgGradient};">
        <div>
          <h4 class="fw-bold mb-0">${m.monthName} (${m.season})</h4>
          <small><i class="fas fa-temperature-half me-1"></i>${m.weather} | <i class="fas fa-droplet me-1"></i>${m.irrigation}</small>
        </div>
        <span class="badge ${m.seasonBadge} fs-6 px-3 py-2 rounded-pill">Odisha Season</span>
      </div>

      <h5 class="fw-bold text-dark mb-3"><i class="fas fa-wheat-awn text-success me-2"></i>Crops Grown in ${m.monthName} (Sowing, Harvesting, Fertilizer & Advisory)</h5>
      ${cropsHTML}
    `;
  }

  const modalEl = document.getElementById('monthDetailModal');
  if (modalEl && typeof bootstrap !== 'undefined') {
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }
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
