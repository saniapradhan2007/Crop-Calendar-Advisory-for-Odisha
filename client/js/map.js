/* Interactive Realistic Odisha Map Module Script */

const odishaDistrictDetails = {
  Sundargarh: {
    crops: ['Paddy', 'Maize', 'Mustard', 'Vegetables', 'Pulses'],
    path: 'M 180,20 L 320,15 L 350,55 L 290,95 L 210,85 L 170,55 Z',
    color: '#0d9488',
    center: { x: 250, y: 50 },
    region: 'North'
  },
  Jharsuguda: {
    crops: ['Paddy', 'Maize', 'Vegetables', 'Groundnut'],
    path: 'M 140,55 L 180,55 L 210,85 L 180,120 L 130,95 Z',
    color: '#14b8a6',
    center: { x: 170, y: 85 },
    region: 'North-West'
  },
  Mayurbhanj: {
    crops: ['Paddy', 'Maize', 'Mustard', 'Vegetables', 'Oilseeds'],
    path: 'M 410,15 L 530,30 L 510,110 L 420,95 L 390,55 Z',
    color: '#059669',
    center: { x: 450, y: 60 },
    region: 'North-East'
  },
  Kendujhar: {
    crops: ['Paddy', 'Maize', 'Vegetables', 'Pulses'],
    path: 'M 350,55 L 390,55 L 420,95 L 390,160 L 320,140 L 290,95 Z',
    color: '#10b981',
    center: { x: 360, y: 105 },
    region: 'North-Central'
  },
  Balasore: {
    crops: ['Paddy', 'Mustard', 'Vegetables', 'Groundnut', 'Betel Vine'],
    path: 'M 510,110 L 580,130 L 550,200 L 470,170 L 420,95 Z',
    color: '#0284c7',
    center: { x: 510, y: 145 },
    region: 'Coastal North'
  },
  Bhadrak: {
    crops: ['Paddy', 'Vegetables', 'Mustard', 'Black Gram'],
    path: 'M 470,170 L 550,200 L 520,250 L 450,220 Z',
    color: '#0369a1',
    center: { x: 500, y: 210 },
    region: 'Coastal'
  },
  Sambalpur: {
    crops: ['Paddy (Hirakud Command)', 'Sugarcane', 'Vegetables', 'Groundnut'],
    path: 'M 180,120 L 290,95 L 320,140 L 260,180 L 190,160 Z',
    color: '#16a34a',
    center: { x: 240, y: 140 },
    region: 'West-Central'
  },
  Bargarh: {
    crops: ['Paddy (Rabi & Kharif)', 'Sugarcane', 'Groundnut', 'Pulses'],
    path: 'M 90,110 L 180,120 L 190,160 L 140,210 L 80,170 Z',
    color: '#15803d',
    center: { x: 135, y: 155 },
    region: 'West'
  },
  Subarnapur: {
    crops: ['Paddy', 'Handloom Cotton', 'Vegetables', 'Pulses'],
    path: 'M 190,160 L 260,180 L 250,230 L 180,210 Z',
    color: '#22c55e',
    center: { x: 220, y: 195 },
    region: 'Central West'
  },
  Bolangir: {
    crops: ['Cotton', 'Paddy', 'Maize', 'Groundnut', 'Sunhemp'],
    path: 'M 140,210 L 180,210 L 220,270 L 130,285 L 90,230 Z',
    color: '#4ade80',
    center: { x: 150, y: 245 },
    region: 'West'
  },
  Nuapada: {
    crops: ['Paddy', 'Cotton', 'Maize', 'Pulses'],
    path: 'M 50,210 L 90,230 L 130,285 L 60,300 Z',
    color: '#86efac',
    center: { x: 85, y: 255 },
    region: 'Far West'
  },
  Angul: {
    crops: ['Paddy', 'Maize', 'Vegetables', 'Mustard', 'Sesame'],
    path: 'M 260,180 L 320,140 L 380,180 L 330,235 L 250,230 Z',
    color: '#0d9488',
    center: { x: 310, y: 185 },
    region: 'Central'
  },
  Dhenkanal: {
    crops: ['Paddy', 'Sugarcane', 'Vegetables', 'Mango', 'Cashew'],
    path: 'M 380,180 L 450,220 L 410,260 L 330,235 Z',
    color: '#0f766e',
    center: { x: 390, y: 220 },
    region: 'Central'
  },
  Jajpur: {
    crops: ['Paddy', 'Vegetables', 'Groundnut', 'Jute'],
    path: 'M 450,220 L 520,250 L 480,285 L 410,260 Z',
    color: '#0ea5e9',
    center: { x: 465, y: 255 },
    region: 'Central East'
  },
  Kendrapara: {
    crops: ['Paddy', 'Jute', 'Vegetables', 'Mustard', 'Pulses'],
    path: 'M 520,250 L 585,280 L 540,320 L 480,285 Z',
    color: '#2563eb',
    center: { x: 530, y: 285 },
    region: 'Coastal Delta'
  },
  Cuttack: {
    crops: ['Kharif Paddy', 'Vegetables', 'Green Gram', 'Mustard'],
    path: 'M 410,260 L 480,285 L 450,330 L 390,300 Z',
    color: '#0d9488',
    center: { x: 430, y: 290 },
    region: 'Central Delta'
  },
  Jagatsinghpur: {
    crops: ['Paddy', 'Vegetables', 'Betel Leaf', 'Mustard', 'Sugarcane'],
    path: 'M 480,285 L 540,320 L 500,355 L 450,330 Z',
    color: '#1d4ed8',
    center: { x: 490, y: 320 },
    region: 'Coastal'
  },
  Puri: {
    crops: ['Coastal Paddy', 'Vegetables', 'Coconut', 'Betel Leaf', 'Groundnut'],
    path: 'M 450,330 L 500,355 L 440,410 L 390,370 Z',
    color: '#3b82f6',
    center: { x: 445, y: 365 },
    region: 'Coastal South'
  },
  Khordha: {
    crops: ['Paddy', 'Vegetables', 'Floriculture', 'Sugarcane'],
    path: 'M 390,300 L 450,330 L 390,370 L 340,340 Z',
    color: '#06b6d4',
    center: { x: 390, y: 335 },
    region: 'Central Coastal'
  },
  Nayagarh: {
    crops: ['Green Gram', 'Sugarcane', 'Paddy', 'Vegetables'],
    path: 'M 330,235 L 410,260 L 390,300 L 340,340 L 290,300 Z',
    color: '#10b981',
    center: { x: 350, y: 285 },
    region: 'Central South'
  },
  Kandhamal: {
    crops: ['Organic Turmeric', 'Maize', 'Millet (Ragi)', 'Paddy', 'Ginger'],
    path: 'M 220,270 L 330,235 L 290,300 L 310,360 L 230,340 Z',
    color: '#d97706',
    center: { x: 275, y: 300 },
    region: 'Central Hills'
  },
  Kalahandi: {
    crops: ['Cotton', 'Maize', 'Paddy', 'Pulses', 'Oilseeds'],
    path: 'M 130,285 L 220,270 L 230,340 L 160,370 L 100,320 Z',
    color: '#f59e0b',
    center: { x: 170, y: 320 },
    region: 'South-West'
  },
  Rayagada: {
    crops: ['Cotton', 'Millet', 'Maize', 'Paddy', 'Cashew'],
    path: 'M 230,340 L 310,360 L 280,420 L 210,400 Z',
    color: '#eab308',
    center: { x: 255, y: 380 },
    region: 'South'
  },
  Ganjam: {
    crops: ['Groundnut', 'Paddy', 'Maize', 'Cashew', 'Sugarcane'],
    path: 'M 340,340 L 390,370 L 360,450 L 280,420 Z',
    color: '#0284c7',
    center: { x: 340, y: 395 },
    region: 'South Coast'
  },
  Nabarangpur: {
    crops: ['Maize (Hybrid)', 'Paddy', 'Sugarcane', 'Vegetables'],
    path: 'M 100,320 L 160,370 L 120,430 L 60,380 Z',
    color: '#fbbf24',
    center: { x: 110, y: 375 },
    region: 'South-West'
  },
  Koraput: {
    crops: ['Highland Coffee', 'Millet (Ragi)', 'Paddy', 'Ginger', 'Pineapple'],
    path: 'M 120,430 L 210,400 L 170,480 L 80,470 Z',
    color: '#ca8a04',
    center: { x: 145, y: 445 },
    region: 'Far South'
  },
  Malkangiri: {
    crops: ['Millet (Ragi)', 'Paddy', 'Maize', 'Sesame', 'Tapioca'],
    path: 'M 80,470 L 170,480 L 120,530 L 40,510 Z',
    color: '#a16207',
    center: { x: 100, y: 495 },
    region: 'Southern Tip'
  }
};

let activeDistrictName = 'Cuttack';

// Render Realistic SVG Polygon Map of Odisha
function renderOdishaSVGMap() {
  const mapSvg = document.getElementById('odishaInteractiveSvgMap');
  if (!mapSvg) return;

  let polygonsHTML = '';
  
  Object.keys(odishaDistrictDetails).forEach(dist => {
    const data = odishaDistrictDetails[dist];
    const isActive = dist === activeDistrictName;

    polygonsHTML += `
      <g class="district-polygon-group ${isActive ? 'active' : ''}" onclick="selectDistrictOnMap('${dist}')" cursor="pointer">
        <path d="${data.path}" 
              fill="${isActive ? '#f59e0b' : data.color}" 
              fill-opacity="${isActive ? '0.95' : '0.75'}" 
              stroke="#ffffff" 
              stroke-width="${isActive ? '2.5' : '1.2'}" 
              class="district-path"/>
        <circle cx="${data.center.x}" cy="${data.center.y}" r="${isActive ? '5' : '3'}" fill="#ffffff" class="district-pin-dot"/>
        <text x="${data.center.x}" y="${data.center.y + 11}" text-anchor="middle" font-size="9" font-weight="700" fill="#ffffff" class="district-svg-text">${dist}</text>
      </g>
    `;
  });

  mapSvg.innerHTML = `
    <!-- Bay of Bengal Ocean background graphic -->
    <rect width="640" height="550" rx="16" fill="#0f172a" />
    <path d="M 440,410 Q 520,350 585,280 Q 620,200 640,150 L 640,550 L 360,550 Z" fill="#0284c7" opacity="0.35"/>
    <text x="560" y="440" font-size="12" font-weight="bold" fill="#38bdf8" opacity="0.8" transform="rotate(-35 560 440)">Bay of Bengal</text>
    
    <!-- State boundary glow backdrop -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Map Title & Compass -->
    <g transform="translate(20, 30)">
      <rect width="140" height="35" rx="8" fill="rgba(15, 23, 42, 0.8)" stroke="rgba(255,255,255,0.2)"/>
      <text x="12" y="22" font-size="11" font-weight="bold" fill="#10b981">🗺️ Odisha State Map</text>
    </g>

    <!-- Compass -->
    <g transform="translate(580, 40)">
      <circle cx="0" cy="0" r="16" fill="rgba(15, 23, 42, 0.8)" stroke="#38bdf8"/>
      <text x="0" y="-4" text-anchor="middle" font-size="10" font-weight="bold" fill="#ef4444">N</text>
      <text x="0" y="10" text-anchor="middle" font-size="8" fill="#94a3b8">S</text>
    </g>

    <!-- District Polygons -->
    ${polygonsHTML}
  `;
}

// Select District and Update Smart Insights Card
async function selectDistrictOnMap(distName) {
  activeDistrictName = distName;
  renderOdishaSVGMap();

  // Highlight button in grid if exists
  document.querySelectorAll('.district-btn').forEach(btn => {
    if (btn.textContent.trim().toLowerCase() === distName.toLowerCase()) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  const cardContainer = document.getElementById('mapDistrictDetailsCard');
  if (!cardContainer) return;

  cardContainer.innerHTML = `
    <div class="text-center py-4">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted small">Loading real-time map data for ${distName}...</p>
    </div>
  `;

  try {
    const weatherRes = await fetch(`/api/weather/${encodeURIComponent(distName)}`);
    const weatherData = await weatherRes.json();

    const distInfo = odishaDistrictDetails[distName] || { crops: ['Paddy', 'Vegetables', 'Maize', 'Mustard'], region: 'Odisha' };
    const w = weatherData.data || { temperature: 32, condition: 'Partly Cloudy', humidity: 75, rainfall: 25, icon: 'fa-cloud-sun' };

    cardContainer.innerHTML = `
      <div class="glass-card p-4 border-start border-5 border-success h-100 shadow-lg">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 mb-1 fw-bold">
              <i class="fas fa-map-pin me-1"></i>${distInfo.region} Odisha
            </span>
            <h3 class="fw-bold text-dark mb-0">${distName} District</h3>
          </div>
          <a href="/crop-calendar.html?district=${distName}" class="btn btn-primary-custom btn-sm">
            <i class="fas fa-calendar-alt me-1"></i>Full Calendar
          </a>
        </div>

        <!-- Live Weather Summary -->
        <div class="p-3 bg-primary bg-opacity-10 rounded-3 mb-3 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <i class="fas ${w.icon || 'fa-cloud-sun'} fa-2x text-primary"></i>
            <div>
              <h4 class="fw-bold mb-0 text-dark">${w.temperature}°C</h4>
              <small class="text-muted">${w.condition} | Humidity: ${w.humidity}%</small>
            </div>
          </div>
          <span class="badge bg-primary text-white fs-6"><i class="fas fa-umbrella me-1"></i>${w.rainfall} mm</span>
        </div>

        <!-- Recommended Crops -->
        <div class="mb-3">
          <h6 class="fw-bold text-dark mb-2"><i class="fas fa-wheat-awn text-warning me-2"></i>Recommended High-Yield Crops:</h6>
          <div class="d-flex flex-wrap gap-2">
            ${distInfo.crops.map(c => `<span class="badge bg-light text-dark border px-3 py-2 rounded-pill shadow-sm"><i class="fas fa-seedling text-success me-1"></i>${c}</span>`).join('')}
          </div>
        </div>

        <!-- Current Season Status -->
        <div class="mb-3">
          <h6 class="fw-bold text-dark mb-2"><i class="fas fa-tasks text-primary me-2"></i>Active Season Status:</h6>
          <div class="p-2 bg-light rounded text-muted small">
            <strong>Kharif / Rabi Season:</strong> Optimal seed treatment with Carbendazim (2g/kg). Follow recommended N-P-K dosage for ${distName} soil profile.
          </div>
        </div>

        <!-- Action Links -->
        <div class="row g-2 mt-3 pt-3 border-top">
          <div class="col-6">
            <a href="/weather.html?district=${distName}" class="btn btn-outline-primary btn-sm w-100">
              <i class="fas fa-cloud-sun me-1"></i>Weather Forecast
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
    cardContainer.innerHTML = `<div class="alert alert-danger">Error loading map details</div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('odishaInteractiveSvgMap')) {
    renderOdishaSVGMap();
    selectDistrictOnMap('Cuttack');
  }
});
