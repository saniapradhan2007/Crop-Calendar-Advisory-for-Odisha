/* Interactive Realistic Odisha Map Module Script - MapsOfIndia Style */

const odishaDistrictDetails = {
  Sundargarh: {
    crops: ['Paddy', 'Maize', 'Mustard', 'Vegetables', 'Pulses'],
    path: 'M 180,35 L 320,30 L 350,70 L 290,110 L 210,100 L 170,70 Z',
    color: '#dcfce7',
    center: { x: 250, y: 65 },
    region: 'North'
  },
  Jharsuguda: {
    crops: ['Paddy', 'Maize', 'Vegetables', 'Groundnut'],
    path: 'M 140,70 L 180,70 L 210,100 L 180,135 L 130,110 Z',
    color: '#e0f2fe',
    center: { x: 170, y: 100 },
    region: 'North-West'
  },
  Deogarh: {
    crops: ['Paddy', 'Maize', 'Pulses', 'Oilseeds'],
    path: 'M 210,100 L 290,110 L 270,145 L 210,135 Z',
    color: '#f3e8ff',
    center: { x: 245, y: 122 },
    region: 'North-Central'
  },
  Mayurbhanj: {
    crops: ['Paddy', 'Maize', 'Mustard', 'Vegetables', 'Oilseeds'],
    path: 'M 410,30 L 530,45 L 510,125 L 420,110 L 390,70 Z',
    color: '#fce7f3',
    center: { x: 450, y: 75 },
    region: 'North-East'
  },
  Kendujhar: {
    crops: ['Paddy', 'Maize', 'Vegetables', 'Pulses'],
    path: 'M 350,70 L 390,70 L 420,110 L 390,175 L 320,155 L 290,110 Z',
    color: '#fef9c3',
    center: { x: 360, y: 120 },
    region: 'North-Central'
  },
  Balasore: {
    crops: ['Paddy', 'Mustard', 'Vegetables', 'Groundnut', 'Betel Vine'],
    path: 'M 510,125 L 580,145 L 550,215 L 470,185 L 420,110 Z',
    color: '#fef3c7',
    center: { x: 510, y: 160 },
    region: 'Coastal North'
  },
  Bhadrak: {
    crops: ['Paddy', 'Vegetables', 'Mustard', 'Black Gram'],
    path: 'M 470,185 L 550,215 L 520,265 L 450,235 Z',
    color: '#dcfce7',
    center: { x: 500, y: 225 },
    region: 'Coastal'
  },
  Sambalpur: {
    crops: ['Paddy (Hirakud Command)', 'Sugarcane', 'Vegetables', 'Groundnut'],
    path: 'M 180,135 L 270,145 L 320,155 L 260,195 L 190,175 Z',
    color: '#fef9c3',
    center: { x: 240, y: 155 },
    region: 'West-Central'
  },
  Bargarh: {
    crops: ['Paddy (Rabi & Kharif)', 'Sugarcane', 'Groundnut', 'Pulses'],
    path: 'M 90,125 L 180,135 L 190,175 L 140,225 L 80,185 Z',
    color: '#dcfce7',
    center: { x: 135, y: 170 },
    region: 'West'
  },
  Subarnapur: {
    crops: ['Paddy', 'Handloom Cotton', 'Vegetables', 'Pulses'],
    path: 'M 190,175 L 260,195 L 250,245 L 180,225 Z',
    color: '#f3e8ff',
    center: { x: 220, y: 210 },
    region: 'Central West'
  },
  Boudh: {
    crops: ['Paddy', 'Pulses', 'Vegetables', 'Groundnut'],
    path: 'M 250,245 L 320,235 L 300,275 L 230,265 Z',
    color: '#e0e7ff',
    center: { x: 275, y: 255 },
    region: 'Central'
  },
  Bolangir: {
    crops: ['Cotton', 'Paddy', 'Maize', 'Groundnut', 'Sunhemp'],
    path: 'M 140,225 L 180,225 L 220,285 L 130,300 L 90,245 Z',
    color: '#dcfce7',
    center: { x: 150, y: 260 },
    region: 'West'
  },
  Nuapada: {
    crops: ['Paddy', 'Cotton', 'Maize', 'Pulses'],
    path: 'M 50,225 L 90,245 L 130,300 L 60,315 Z',
    color: '#fce7f3',
    center: { x: 85, y: 270 },
    region: 'Far West'
  },
  Angul: {
    crops: ['Paddy', 'Maize', 'Vegetables', 'Mustard', 'Sesame'],
    path: 'M 260,195 L 320,155 L 380,195 L 330,250 L 250,245 Z',
    color: '#fef9c3',
    center: { x: 310, y: 200 },
    region: 'Central'
  },
  Dhenkanal: {
    crops: ['Paddy', 'Sugarcane', 'Vegetables', 'Mango', 'Cashew'],
    path: 'M 380,195 L 450,235 L 410,275 L 330,250 Z',
    color: '#fce7f3',
    center: { x: 390, y: 235 },
    region: 'Central'
  },
  Jajpur: {
    crops: ['Paddy', 'Vegetables', 'Groundnut', 'Jute'],
    path: 'M 450,235 L 520,265 L 480,300 L 410,275 Z',
    color: '#f3e8ff',
    center: { x: 465, y: 270 },
    region: 'Central East'
  },
  Kendrapara: {
    crops: ['Paddy', 'Jute', 'Vegetables', 'Mustard', 'Pulses'],
    path: 'M 520,265 L 585,295 L 540,335 L 480,300 Z',
    color: '#e0f2fe',
    center: { x: 530, y: 300 },
    region: 'Coastal Delta'
  },
  Cuttack: {
    crops: ['Kharif Paddy', 'Vegetables', 'Green Gram', 'Mustard'],
    path: 'M 410,275 L 480,300 L 450,345 L 390,315 Z',
    color: '#dcfce7',
    center: { x: 430, y: 305 },
    region: 'Central Delta'
  },
  Jagatsinghpur: {
    crops: ['Paddy', 'Vegetables', 'Betel Leaf', 'Mustard', 'Sugarcane'],
    path: 'M 480,300 L 540,335 L 500,370 L 450,345 Z',
    color: '#e0f2fe',
    center: { x: 490, y: 335 },
    region: 'Coastal'
  },
  Puri: {
    crops: ['Coastal Paddy', 'Vegetables', 'Coconut', 'Betel Leaf', 'Groundnut'],
    path: 'M 450,345 L 500,370 L 440,425 L 390,385 Z',
    color: '#fff7ed',
    center: { x: 445, y: 380 },
    region: 'Coastal South'
  },
  Khordha: {
    crops: ['Paddy', 'Vegetables', 'Floriculture', 'Sugarcane'],
    path: 'M 390,315 L 450,345 L 390,385 L 340,355 Z',
    color: '#fef9c3',
    center: { x: 390, y: 350 },
    region: 'Central Coastal'
  },
  Nayagarh: {
    crops: ['Green Gram', 'Sugarcane', 'Paddy', 'Vegetables'],
    path: 'M 330,250 L 410,275 L 390,315 L 340,355 L 290,315 Z',
    color: '#dcfce7',
    center: { x: 350, y: 300 },
    region: 'Central South'
  },
  Kandhamal: {
    crops: ['Organic Turmeric', 'Maize', 'Millet (Ragi)', 'Paddy', 'Ginger'],
    path: 'M 220,285 L 330,250 L 290,315 L 310,375 L 230,355 Z',
    color: '#fff7ed',
    center: { x: 275, y: 315 },
    region: 'Central Hills'
  },
  Kalahandi: {
    crops: ['Cotton', 'Maize', 'Paddy', 'Pulses', 'Oilseeds'],
    path: 'M 130,300 L 220,285 L 230,355 L 160,385 L 100,335 Z',
    color: '#fef9c3',
    center: { x: 170, y: 335 },
    region: 'South-West'
  },
  Rayagada: {
    crops: ['Cotton', 'Millet', 'Maize', 'Paddy', 'Cashew'],
    path: 'M 230,355 L 310,375 L 280,435 L 210,415 Z',
    color: '#f3e8ff',
    center: { x: 255, y: 395 },
    region: 'South'
  },
  Gajapati: {
    crops: ['Paddy', 'Maize', 'Cashew', 'Spices'],
    path: 'M 310,375 L 360,400 L 320,445 L 280,435 Z',
    color: '#fce7f3',
    center: { x: 315, y: 415 },
    region: 'South'
  },
  Ganjam: {
    crops: ['Groundnut', 'Paddy', 'Maize', 'Cashew', 'Sugarcane'],
    path: 'M 340,355 L 390,385 L 360,465 L 310,375 Z',
    color: '#dcfce7',
    center: { x: 350, y: 410 },
    region: 'South Coast'
  },
  Nabarangpur: {
    crops: ['Maize (Hybrid)', 'Paddy', 'Sugarcane', 'Vegetables'],
    path: 'M 100,335 L 160,385 L 120,445 L 60,395 Z',
    color: '#fff7ed',
    center: { x: 110, y: 390 },
    region: 'South-West'
  },
  Koraput: {
    crops: ['Highland Coffee', 'Millet (Ragi)', 'Paddy', 'Ginger', 'Pineapple'],
    path: 'M 120,445 L 210,415 L 170,495 L 80,485 Z',
    color: '#dcfce7',
    center: { x: 145, y: 460 },
    region: 'Far South'
  },
  Malkangiri: {
    crops: ['Millet (Ragi)', 'Paddy', 'Maize', 'Sesame', 'Tapioca'],
    path: 'M 80,485 L 170,495 L 120,545 L 40,525 Z',
    color: '#fce7f3',
    center: { x: 100, y: 510 },
    region: 'Southern Tip'
  }
};

let activeDistrictName = 'Cuttack';

// Render Realistic SVG Polygon Map of Odisha (MapsOfIndia Style)
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
              fill="${isActive ? '#fbbf24' : data.color}" 
              stroke="#475569" 
              stroke-width="${isActive ? '2.5' : '1'}" 
              class="district-path"/>
        <circle cx="${data.center.x}" cy="${data.center.y}" r="${isActive ? '4' : '2.5'}" fill="${isActive ? '#dc2626' : '#1e293b'}" class="district-pin-dot"/>
        <text x="${data.center.x}" y="${data.center.y - 5}" text-anchor="middle" font-size="8.5" font-weight="700" fill="#0f172a" class="district-svg-text">${dist.toUpperCase()}</text>
      </g>
    `;
  });

  mapSvg.innerHTML = `
    <!-- Background Canvas: Land & Bay of Bengal Ocean -->
    <rect width="640" height="560" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    
    <!-- Ocean (Bay of Bengal) -->
    <path d="M 440,425 Q 520,370 585,295 Q 620,215 640,165 L 640,560 L 360,560 Z" fill="#7dd3fc" opacity="0.95"/>
    <text x="540" y="470" font-size="13" font-weight="800" fill="#0369a1" letter-spacing="2" transform="rotate(-30 540 470)">BAY OF BENGAL</text>
    
    <!-- Neighboring State Labels -->
    <text x="360" y="22" font-size="10" font-weight="800" fill="#64748b" letter-spacing="1.5">JHARKHAND</text>
    <text x="540" y="28" font-size="9" font-weight="800" fill="#64748b" letter-spacing="1">WEST BENGAL</text>
    <text x="12" y="270" font-size="10" font-weight="800" fill="#64748b" letter-spacing="1.5" transform="rotate(-90 12 270)">CHHATTISGARH</text>
    <text x="210" y="450" font-size="9" font-weight="800" fill="#64748b" letter-spacing="1">ANDHRA PRADESH</text>

    <!-- Top-Left Title Header Box -->
    <g transform="translate(15, 15)">
      <rect width="130" height="34" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect width="130" height="14" fill="#be185d" rx="2"/>
      <text x="65" y="10" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff" letter-spacing="1">ODISHA</text>
      <text x="65" y="27" text-anchor="middle" font-size="8" font-weight="700" fill="#334155">DISTRICT MAP</text>
    </g>

    <!-- State Capital Marker (Bhubaneswar) -->
    <g transform="translate(415, 335)">
      <circle cx="0" cy="0" r="5" fill="#ef4444" stroke="#ffffff" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="2" fill="#ffffff"/>
      <text x="8" y="3" font-size="9" font-weight="900" fill="#0f172a">Bhubaneswar ★</text>
    </g>

    <!-- Compass Rose (Top Right) -->
    <g transform="translate(605, 30)">
      <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
      <path d="M 0,-10 L 3,0 L 0,3 L -3,0 Z" fill="#dc2626"/>
      <text x="0" y="-12" text-anchor="middle" font-size="8" font-weight="800" fill="#dc2626">N</text>
    </g>

    <!-- District Polygons -->
    ${polygonsHTML}

    <!-- Bottom-Right Legend Box -->
    <g transform="translate(480, 485)">
      <rect width="145" height="60" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="72" y="12" text-anchor="middle" font-size="8" font-weight="800" fill="#be185d" letter-spacing="1">LEGEND</text>
      <line x1="10" y1="22" x2="35" y2="22" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 1"/>
      <text x="42" y="25" font-size="7.5" fill="#334155" font-weight="600">State Boundary</text>
      <circle cx="22" cy="36" r="3" fill="#ef4444" stroke="#ffffff"/>
      <text x="42" y="39" font-size="7.5" fill="#334155" font-weight="600">State Capital</text>
      <circle cx="22" cy="49" r="2" fill="#1e293b"/>
      <text x="42" y="52" font-size="7.5" fill="#334155" font-weight="600">District Headquarter</text>
    </g>
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
