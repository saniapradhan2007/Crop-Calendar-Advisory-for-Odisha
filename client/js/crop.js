/* Crop Calendar Module Script */

let currentCropData = [];

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

  const container = document.getElementById('cropTimelineContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="text-center py-5">
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
        <div class="glass-card p-5 text-center my-4">
          <i class="fas fa-seedling fa-3x text-muted mb-3"></i>
          <h4>No Exact Crop Schedule Found</h4>
          <p class="text-muted">No schedule found. Please select another district or crop type.</p>
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
  showToast(`Generating PDF for ${cropName} (${district})...`, 'success');
  window.print();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cropTimelineContainer')) {
    loadCrops();
  }
});
