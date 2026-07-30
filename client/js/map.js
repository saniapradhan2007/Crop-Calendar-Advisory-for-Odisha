/* Interactive Odisha Map Module Script */

const odishaDistrictData = {
  Angul: { crops: ['Paddy', 'Maize', 'Vegetables', 'Mustard'], coords: { x: 48, y: 38 } },
  Balasore: { crops: ['Paddy', 'Mustard', 'Vegetables', 'Groundnut'], coords: { x: 78, y: 22 } },
  Bargarh: { crops: ['Paddy (Rabi)', 'Sugarcane', 'Groundnut', 'Pulses'], coords: { x: 22, y: 32 } },
  Bhadrak: { crops: ['Paddy', 'Vegetables', 'Mustard', 'Black Gram'], coords: { x: 74, y: 30 } },
  Bolangir: { crops: ['Cotton', 'Paddy', 'Maize', 'Groundnut'], coords: { x: 25, y: 48 } },
  Cuttack: { crops: ['Kharif Paddy', 'Vegetables', 'Green Gram', 'Mustard'], coords: { x: 62, y: 46 } },
  Dhenkanal: { crops: ['Paddy', 'Sugarcane', 'Vegetables', 'Mango'], coords: { x: 54, y: 36 } },
  Ganjam: { crops: ['Groundnut', 'Paddy', 'Maize', 'Cashew'], coords: { x: 48, y: 70 } },
  Jagatsinghpur: { crops: ['Paddy', 'Vegetables', 'Betel Leaf', 'Mustard'], coords: { x: 70, y: 52 } },
  Jajpur: { crops: ['Paddy', 'Vegetables', 'Groundnut', 'Jute'], coords: { x: 68, y: 36 } },
  Jharsuguda: { crops: ['Paddy', 'Maize', 'Vegetables', 'Pulses'], coords: { x: 28, y: 18 } },
  Kalahandi: { crops: ['Cotton', 'Maize', 'Paddy', 'Pulses'], coords: { x: 24, y: 62 } },
  Kandhamal: { crops: ['Organic Turmeric', 'Maize', 'Millet', 'Paddy'], coords: { x: 40, y: 56 } },
  Kendrapara: { crops: ['Paddy', 'Jute', 'Vegetables', 'Mustard'], coords: { x: 76, y: 42 } },
  Kendujhar: { crops: ['Paddy', 'Maize', 'Vegetables', 'Pulses'], coords: { x: 56, y: 22 } },
  Khordha: { crops: ['Paddy', 'Vegetables', 'Flowers', 'Sugarcane'], coords: { x: 58, y: 56 } },
  Koraput: { crops: ['Coffee', 'Millet (Ragi)', 'Paddy', 'Ginger'], coords: { x: 18, y: 80 } },
  Malkangiri: { crops: ['Millet', 'Paddy', 'Maize', 'Sesame'], coords: { x: 10, y: 90 } },
  Mayurbhanj: { crops: ['Paddy', 'Maize', 'Mustard', 'Vegetables'], coords: { x: 74, y: 12 } },
  Nabarangpur: { crops: ['Maize', 'Paddy', 'Sugarcane', 'Vegetables'], coords: { x: 14, y: 70 } },
  Nayagarh: { crops: ['Green Gram', 'Sugarcane', 'Paddy', 'Vegetables'], coords: { x: 48, y: 52 } },
  Nuapada: { crops: ['Paddy', 'Cotton', 'Maize', 'Pulses'], coords: { x: 15, y: 52 } },
  Puri: { crops: ['Coastal Paddy', 'Vegetables', 'Coconut', 'Betel Leaf'], coords: { x: 64, y: 64 } },
  Rayagada: { crops: ['Cotton', 'Millet', 'Maize', 'Paddy'], coords: { x: 30, y: 74 } },
  Sambalpur: { crops: ['Paddy', 'Sugarcane', 'Vegetables', 'Groundnut'], coords: { x: 34, y: 28 } },
  Subarnapur: { crops: ['Paddy', 'Handloom Cotton', 'Vegetables', 'Pulses'], coords: { x: 32, y: 42 } },
  Sundargarh: { crops: ['Paddy', 'Maize', 'Mustard', 'Vegetables'], coords: { x: 42, y: 12 } }
};

let activeDistrictName = 'Cuttack';

// Render Interactive SVG Map Pins
function renderOdishaSVGMap() {
  const mapSvg = document.getElementById('odishaInteractiveSvgMap');
  if (!mapSvg) return;

  let pinsHTML = '';
  Object.keys(odishaDistrictData).forEach(dist => {
    const data = odishaDistrictData[dist];
    const isActive = dist === activeDistrictName;

    pinsHTML += `
      <g class="district-map-node ${isActive ? 'active' : ''}" onclick="selectDistrictOnMap('${dist}')" cursor="pointer">
        <circle cx="${data.coords.x * 6}" cy="${data.coords.y * 4.5}" r="${isActive ? '12' : '8'}" fill="${isActive ? '#d97706' : '#0d9488'}" stroke="#ffffff" stroke-width="2" class="map-pin-circle"/>
        <text x="${data.coords.x * 6}" y="${(data.coords.y * 4.5) + 16}" text-anchor="middle" font-size="10" font-weight="bold" fill="var(--text-main)" class="map-pin-label">${dist}</text>
      </g>
    `;
  });

  mapSvg.innerHTML = `
    <rect width="520" height="460" rx="16" fill="rgba(13, 148, 136, 0.05)" />
    <!-- Geographic Outline Mesh representation -->
    <path d="M 180,45 L 340,35 L 440,55 L 480,120 L 410,230 L 360,320 L 260,390 L 90,440 L 40,360 L 80,260 L 110,180 Z" fill="rgba(13, 148, 136, 0.12)" stroke="var(--primary)" stroke-width="2" stroke-dasharray="4 2"/>
    ${pinsHTML}
  `;
}

// Select District and Update Smart Insights Drawer/Card
async function selectDistrictOnMap(distName) {
  activeDistrictName = distName;
  renderOdishaSVGMap();

  // Highlight button in grid if exists
  document.querySelectorAll('.district-btn').forEach(btn => {
    if (btn.textContent.trim() === distName) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  const cardContainer = document.getElementById('mapDistrictDetailsCard');
  if (!cardContainer) return;

  cardContainer.innerHTML = `
    <div class="text-center py-4">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted small">Fetching live insights for ${distName}...</p>
    </div>
  `;

  // Fetch weather and crop recommendations in parallel
  try {
    const weatherRes = await fetch(`/api/weather/${encodeURIComponent(distName)}`);
    const weatherData = await weatherRes.json();

    const cropRes = await fetch(`/api/crops?district=${encodeURIComponent(distName)}`);
    const cropData = await cropRes.json();

    const distInfo = odishaDistrictData[distName] || { crops: ['Paddy', 'Vegetables', 'Maize', 'Mustard'] };
    const w = weatherData.data || { temperature: 32, condition: 'Partly Cloudy', humidity: 75, rainfall: 25, icon: 'fa-cloud-sun' };

    cardContainer.innerHTML = `
      <div class="glass-card p-4 border-start border-5 border-success h-100">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 mb-1 fw-bold"><i class="fas fa-map-pin me-1"></i>Selected District</span>
            <h3 class="fw-bold text-dark mb-0">${distName} District</h3>
          </div>
          <a href="/crop-calendar.html?district=${distName}" class="btn btn-primary-custom btn-sm">
            <i class="fas fa-calendar-alt me-1"></i>Full Calendar
          </a>
        </div>

        <!-- Weather Summary Banner -->
        <div class="p-3 bg-primary bg-opacity-10 rounded-3 mb-3 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <i class="fas ${w.icon || 'fa-cloud-sun'} fa-2x text-primary"></i>
            <div>
              <h5 class="fw-bold mb-0 text-dark">${w.temperature}°C</h5>
              <small class="text-muted">${w.condition} | Humidity: ${w.humidity}%</small>
            </div>
          </div>
          <span class="badge bg-primary text-white"><i class="fas fa-umbrella me-1"></i>${w.rainfall} mm Rain</span>
        </div>

        <!-- Recommended Crops List -->
        <div class="mb-3">
          <h6 class="fw-bold text-dark mb-2"><i class="fas fa-wheat-awn text-warning me-2"></i>Recommended Crops for ${distName}:</h6>
          <div class="d-flex flex-wrap gap-2">
            ${distInfo.crops.map(c => `<span class="badge bg-light text-dark border px-3 py-2 rounded-pill"><i class="fas fa-seedling text-success me-1"></i>${c}</span>`).join('')}
          </div>
        </div>

        <!-- Crop Calendar Schedule Snapshot -->
        <div class="mb-3">
          <h6 class="fw-bold text-dark mb-2"><i class="fas fa-tasks text-primary me-2"></i>Current Crop Stage:</h6>
          <div class="p-2 bg-light rounded text-muted small">
            <strong>Kharif Paddy:</strong> Sowing / Nursery Preparation stage (June-July). Follow seed treatment with Carbendazim 2g/kg before sowing.
          </div>
        </div>

        <!-- Action Links -->
        <div class="row g-2 mt-3 pt-3 border-top">
          <div class="col-6">
            <a href="/weather.html?district=${distName}" class="btn btn-outline-primary btn-sm w-100">
              <i class="fas fa-cloud-sun me-1"></i>Live Weather
            </a>
          </div>
          <div class="col-6">
            <a href="/market.html?district=${distName}" class="btn btn-outline-success btn-sm w-100">
              <i class="fas fa-chart-line me-1"></i>Mandi Prices
            </a>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    cardContainer.innerHTML = `<div class="alert alert-danger">Error loading district details</div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('odishaInteractiveSvgMap')) {
    renderOdishaSVGMap();
    selectDistrictOnMap('Cuttack');
  }
});
