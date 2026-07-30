/* Official Odisha District Map Engine with Live GPS & Nominatim Reverse Geocoding */

const odishaDistrictGPSCoords = {
  Angul: { lat: 20.8444, lng: 85.1511 },
  Balasore: { lat: 21.4942, lng: 86.9317 },
  Bargarh: { lat: 21.3340, lng: 83.6186 },
  Bhadrak: { lat: 21.0574, lng: 86.4969 },
  Bolangir: { lat: 20.7082, lng: 83.4844 },
  Boudh: { lat: 20.8358, lng: 84.3242 },
  Cuttack: { lat: 20.4625, lng: 85.8828 },
  Deogarh: { lat: 21.5369, lng: 84.7356 },
  Dhenkanal: { lat: 20.6596, lng: 85.5974 },
  Gajapati: { lat: 18.8078, lng: 84.1481 },
  Ganjam: { lat: 19.3804, lng: 84.9924 },
  Jagatsinghpur: { lat: 20.2667, lng: 86.1667 },
  Jajpur: { lat: 20.8500, lng: 86.3333 },
  Jharsuguda: { lat: 21.8570, lng: 84.0080 },
  Kalahandi: { lat: 19.9079, lng: 83.1659 },
  Kandhamal: { lat: 20.2333, lng: 84.1500 },
  Kendrapara: { lat: 20.5000, lng: 86.4167 },
  Kendujhar: { lat: 21.6289, lng: 85.5817 },
  Khordha: { lat: 20.1818, lng: 85.6206 },
  Koraput: { lat: 18.8135, lng: 82.7123 },
  Malkangiri: { lat: 18.3436, lng: 81.8841 },
  Mayurbhanj: { lat: 21.9270, lng: 86.7440 },
  Nabarangpur: { lat: 19.2307, lng: 82.5486 },
  Nayagarh: { lat: 20.1268, lng: 85.1026 },
  Nuapada: { lat: 20.8393, lng: 82.5204 },
  Puri: { lat: 19.8135, lng: 85.8312 },
  Rayagada: { lat: 19.1711, lng: 83.4163 },
  Sambalpur: { lat: 21.4669, lng: 83.9812 },
  Subarnapur: { lat: 20.8385, lng: 83.9167 },
  Sundargarh: { lat: 22.1200, lng: 84.0300 }
};

const odishaMasterDistricts = {
  Sundargarh: { path: 'M 160,25 L 320,20 L 360,65 L 290,110 L 210,100 L 150,65 Z', center: { x: 240, y: 60 }, color: '#dcfce7', crops: ['Paddy', 'Maize', 'Mustard', 'Vegetables', 'Pulses'], region: 'Northern Odisha' },
  Jharsuguda: { path: 'M 120,65 L 160,65 L 210,100 L 175,135 L 115,110 Z', center: { x: 160, y: 95 }, color: '#e0f2fe', crops: ['Paddy', 'Maize', 'Vegetables', 'Groundnut'], region: 'North-West Odisha' },
  Deogarh: { path: 'M 210,100 L 290,110 L 270,150 L 210,140 Z', center: { x: 245, y: 125 }, color: '#f3e8ff', crops: ['Paddy', 'Maize', 'Pulses', 'Oilseeds'], region: 'North-Central Odisha' },
  Mayurbhanj: { path: 'M 410,30 L 540,45 L 515,130 L 420,115 L 390,70 Z', center: { x: 455, y: 75 }, color: '#fce7f3', crops: ['Paddy', 'Maize', 'Mustard', 'Vegetables', 'Oilseeds'], region: 'North-East Similipal' },
  Kendujhar: { path: 'M 360,65 L 390,70 L 420,115 L 390,180 L 320,160 L 290,110 Z', center: { x: 360, y: 120 }, color: '#fef9c3', crops: ['Paddy', 'Maize', 'Vegetables', 'Pulses'], region: 'North-Central Plateau' },
  Balasore: { path: 'M 515,130 L 590,150 L 555,220 L 470,190 L 420,115 Z', center: { x: 515, y: 160 }, color: '#fef3c7', crops: ['Paddy', 'Mustard', 'Vegetables', 'Groundnut', 'Betel Vine'], region: 'Coastal North' },
  Bhadrak: { path: 'M 470,190 L 555,220 L 525,270 L 450,240 Z', center: { x: 500, y: 230 }, color: '#dcfce7', crops: ['Paddy', 'Vegetables', 'Mustard', 'Black Gram'], region: 'Coastal Plain' },
  Sambalpur: { path: 'M 175,135 L 270,150 L 320,160 L 260,200 L 190,180 Z', center: { x: 240, y: 160 }, color: '#fef9c3', crops: ['Paddy (Hirakud Command)', 'Sugarcane', 'Vegetables', 'Groundnut'], region: 'West-Central' },
  Bargarh: { path: 'M 80,125 L 175,135 L 190,180 L 140,230 L 75,185 Z', center: { x: 130, y: 170 }, color: '#dcfce7', crops: ['Paddy (Rabi & Kharif)', 'Sugarcane', 'Groundnut', 'Pulses'], region: 'Western Rice Bowl' },
  Subarnapur: { path: 'M 190,180 L 260,200 L 250,250 L 180,230 Z', center: { x: 220, y: 215 }, color: '#f3e8ff', crops: ['Paddy', 'Handloom Cotton', 'Vegetables', 'Pulses'], region: 'Central West' },
  Boudh: { path: 'M 250,250 L 320,240 L 300,285 L 230,275 Z', center: { x: 275, y: 263 }, color: '#e0e7ff', crops: ['Paddy', 'Pulses', 'Vegetables', 'Groundnut'], region: 'Central Valley' },
  Bolangir: { path: 'M 140,230 L 180,230 L 220,290 L 130,305 L 85,250 Z', center: { x: 150, y: 265 }, color: '#dcfce7', crops: ['Cotton', 'Paddy', 'Maize', 'Groundnut', 'Sunhemp'], region: 'Western Belt' },
  Nuapada: { path: 'M 45,225 L 85,250 L 130,305 L 55,320 Z', center: { x: 80, y: 275 }, color: '#fce7f3', crops: ['Paddy', 'Cotton', 'Maize', 'Pulses'], region: 'Far West' },
  Angul: { path: 'M 260,200 L 320,160 L 380,200 L 330,255 L 250,250 Z', center: { x: 310, y: 205 }, color: '#fef9c3', crops: ['Paddy', 'Maize', 'Vegetables', 'Mustard', 'Sesame'], region: 'Central Industrial' },
  Dhenkanal: { path: 'M 380,200 L 450,240 L 410,280 L 330,255 Z', center: { x: 390, y: 240 }, color: '#fce7f3', crops: ['Paddy', 'Sugarcane', 'Vegetables', 'Mango', 'Cashew'], region: 'Central' },
  Jajpur: { path: 'M 450,240 L 525,270 L 480,305 L 410,280 Z', center: { x: 465, y: 275 }, color: '#f3e8ff', crops: ['Paddy', 'Vegetables', 'Groundnut', 'Jute'], region: 'Central East' },
  Kendrapara: { path: 'M 525,270 L 590,300 L 545,340 L 480,305 Z', center: { x: 535, y: 305 }, color: '#e0f2fe', crops: ['Paddy', 'Jute', 'Vegetables', 'Mustard', 'Pulses'], region: 'Coastal Delta' },
  Cuttack: { path: 'M 410,280 L 480,305 L 450,350 L 390,320 Z', center: { x: 430, y: 310 }, color: '#dcfce7', crops: ['Kharif Paddy', 'Vegetables', 'Green Gram', 'Mustard'], region: 'Central Delta' },
  Jagatsinghpur: { path: 'M 480,305 L 545,340 L 505,375 L 450,350 Z', center: { x: 495, y: 340 }, color: '#e0f2fe', crops: ['Paddy', 'Vegetables', 'Betel Leaf', 'Mustard', 'Sugarcane'], region: 'Coastal' },
  Puri: { path: 'M 450,350 L 505,375 L 445,430 L 390,390 Z', center: { x: 445, y: 385 }, color: '#fff7ed', crops: ['Coastal Paddy', 'Vegetables', 'Coconut', 'Betel Leaf', 'Groundnut'], region: 'Coastal South' },
  Khordha: { path: 'M 390,320 L 450,350 L 390,390 L 340,360 Z', center: { x: 390, y: 355 }, color: '#fef9c3', crops: ['Paddy', 'Vegetables', 'Floriculture', 'Sugarcane'], region: 'Central Capital Zone' },
  Nayagarh: { path: 'M 330,255 L 410,280 L 390,320 L 340,360 L 290,320 Z', center: { x: 350, y: 305 }, color: '#dcfce7', crops: ['Green Gram', 'Sugarcane', 'Paddy', 'Vegetables'], region: 'Central South' },
  Kandhamal: { path: 'M 220,290 L 330,255 L 290,320 L 310,380 L 230,360 Z', center: { x: 275, y: 320 }, color: '#fff7ed', crops: ['Organic Turmeric', 'Maize', 'Millet (Ragi)', 'Paddy', 'Ginger'], region: 'Eastern Ghats Highlands' },
  Kalahandi: { path: 'M 130,305 L 220,290 L 230,360 L 160,390 L 95,340 Z', center: { x: 165, y: 340 }, color: '#fef9c3', crops: ['Cotton', 'Maize', 'Paddy', 'Pulses', 'Oilseeds'], region: 'South-West Plateau' },
  Rayagada: { path: 'M 230,360 L 310,380 L 280,440 L 210,420 Z', center: { x: 255, y: 400 }, color: '#f3e8ff', crops: ['Cotton', 'Millet', 'Maize', 'Paddy', 'Cashew'], region: 'Southern Hills' },
  Gajapati: { path: 'M 310,380 L 360,405 L 320,450 L 280,440 Z', center: { x: 315, y: 420 }, color: '#fce7f3', crops: ['Paddy', 'Maize', 'Cashew', 'Spices'], region: 'Southern Tribal Belt' },
  Ganjam: { path: 'M 340,360 L 390,390 L 360,470 L 310,380 Z', center: { x: 350, y: 415 }, color: '#dcfce7', crops: ['Groundnut', 'Paddy', 'Maize', 'Cashew', 'Sugarcane'], region: 'South Coast' },
  Nabarangpur: { path: 'M 95,340 L 160,390 L 120,450 L 55,400 Z', center: { x: 105, y: 395 }, color: '#fff7ed', crops: ['Maize (Hybrid)', 'Paddy', 'Sugarcane', 'Vegetables'], region: 'South-West High Altitude' },
  Koraput: { path: 'M 120,450 L 210,420 L 170,500 L 75,490 Z', center: { x: 145, y: 465 }, color: '#dcfce7', crops: ['Highland Coffee', 'Millet (Ragi)', 'Paddy', 'Ginger', 'Pineapple'], region: 'Koraput Coffee Plateau' },
  Malkangiri: { path: 'M 75,490 L 170,500 L 120,550 L 35,530 Z', center: { x: 95, y: 515 }, color: '#fce7f3', crops: ['Millet (Ragi)', 'Paddy', 'Maize', 'Sesame', 'Tapioca'], region: 'Southern Tip Valley' }
};

let activeDistrictName = localStorage.getItem('odisha_user_district') || 'Cuttack';

// Haversine formula distance calculator
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Live GPS & Nominatim Reverse Geocoding Engine
async function detectUserLiveLocationDistrict(isManual = false) {
  const btn = document.getElementById('detectLocationBtn');
  if (btn) {
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Detecting GPS Location...`;
    btn.disabled = true;
  }

  if (!navigator.geolocation) {
    if (typeof showToast === 'function') showToast('Geolocation is not supported by your browser.', 'error');
    if (btn) { btn.innerHTML = `<i class="fas fa-location-crosshairs me-1"></i>Detect My District`; btn.disabled = false; }
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      let detectedDistrict = null;

      // 1. Try Nominatim reverse geocoding API for exact district matching
      try {
        const nomRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLng}`);
        const nomData = await nomRes.json();
        
        if (nomData && nomData.address) {
          const addr = nomData.address;
          const rawDist = addr.state_district || addr.county || addr.city || addr.district || '';
          
          // Match against known Odisha districts
          Object.keys(odishaMasterDistricts).forEach(d => {
            if (rawDist.toLowerCase().includes(d.toLowerCase())) {
              detectedDistrict = d;
            }
          });
        }
      } catch (e) {
        console.log('Nominatim reverse geocode fallback to distance calculation');
      }

      // 2. Fallback to Haversine nearest GPS coordinate math
      if (!detectedDistrict) {
        let minDistance = Infinity;
        Object.keys(odishaDistrictGPSCoords).forEach(dist => {
          const coords = odishaDistrictGPSCoords[dist];
          const distKm = calculateDistance(userLat, userLng, coords.lat, coords.lng);
          if (distKm < minDistance) {
            minDistance = distKm;
            detectedDistrict = dist;
          }
        });
      }

      detectedDistrict = detectedDistrict || 'Cuttack';
      localStorage.setItem('odisha_user_district', detectedDistrict);
      selectMasterDistrict(detectedDistrict, true);

      if (typeof showToast === 'function') {
        showToast(`📍 GPS Detected Your District: ${detectedDistrict}!`, 'success');
      }

      if (btn) {
        btn.innerHTML = `<i class="fas fa-check-circle text-success me-1"></i>GPS Live: ${detectedDistrict}`;
        btn.disabled = false;
      }
    },
    (error) => {
      // Permission denied or error - prompt user to select their district manually
      const fallbackDist = localStorage.getItem('odisha_user_district') || 'Cuttack';
      selectMasterDistrict(fallbackDist);

      if (isManual && typeof showToast === 'function') {
        showToast('GPS permission required. Please pick your district manually below.', 'info');
      }

      if (btn) {
        btn.innerHTML = `<i class="fas fa-location-crosshairs me-1"></i>Select / Detect District`;
        btn.disabled = false;
      }
    },
    { timeout: 10000, maximumAge: 30000, enableHighAccuracy: true }
  );
}

function renderMasterOdishaSVGMap() {
  const container = document.getElementById('odishaRealMapContainer') || document.getElementById('odishaOfficialMapCanvas');
  if (!container) return;

  let districtPathsHTML = '';
  Object.keys(odishaMasterDistricts).forEach(dist => {
    const d = odishaMasterDistricts[dist];
    const isActive = dist === activeDistrictName;

    districtPathsHTML += `
      <g class="master-district-group ${isActive ? 'active' : ''}" onclick="selectMasterDistrict('${dist}')" cursor="pointer">
        <path d="${d.path}" 
              fill="${isActive ? '#f59e0b' : d.color}" 
              stroke="#334155" 
              stroke-width="${isActive ? '3' : '1.5'}"
              class="master-district-shape" />
        <circle cx="${d.center.x}" cy="${d.center.y}" r="${isActive ? '4' : '2.5'}" fill="${isActive ? '#dc2626' : '#1e293b'}" />
        <text x="${d.center.x}" y="${d.center.y - 4}" text-anchor="middle" font-size="8.5" font-weight="800" fill="#0f172a" class="master-district-label">${dist}</text>
      </g>
    `;
  });

  container.innerHTML = `
    <div class="glass-card p-3 shadow-lg rounded-4 overflow-hidden border">
      <svg viewBox="0 0 680 580" style="width: 100%; height: auto; display: block; background: #f8fafc; border-radius: 12px;">
        <defs>
          <linearGradient id="oceanBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#0284c7" />
          </linearGradient>
        </defs>

        <!-- Bay of Bengal Ocean -->
        <path d="M 440,430 Q 520,375 590,300 Q 625,220 640,170 L 680,170 L 680,580 L 360,580 Z" fill="url(#oceanBlue)" opacity="0.9" />
        <text x="530" y="480" font-size="15" font-weight="900" fill="#0284c7" letter-spacing="2" transform="rotate(-30 530 480)">BAY OF BENGAL</text>

        <!-- Chilika Lagoon -->
        <path d="M 390,390 Q 420,415 400,440 Z" fill="#0284c7" stroke="#ffffff" stroke-width="1" />
        <text x="405" y="420" font-size="8" font-weight="bold" fill="#ffffff">Chilika</text>

        <!-- Neighboring States -->
        <text x="360" y="22" font-size="11" font-weight="900" fill="#64748b" letter-spacing="1.5">JHARKHAND</text>
        <text x="560" y="28" font-size="10" font-weight="900" fill="#64748b" letter-spacing="1">WEST BENGAL</text>
        <text x="14" y="270" font-size="11" font-weight="900" fill="#64748b" letter-spacing="1.5" transform="rotate(-90 14 270)">CHHATTISGARH</text>
        <text x="210" y="450" font-size="10" font-weight="900" fill="#64748b" letter-spacing="1">ANDHRA PRADESH</text>

        <!-- Official Header Logo Inset -->
        <g transform="translate(15, 15)">
          <rect width="140" height="38" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <rect width="140" height="16" fill="#be185d" rx="3"/>
          <text x="70" y="12" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff" letter-spacing="1">ODISHA</text>
          <text x="70" y="31" text-anchor="middle" font-size="8.5" font-weight="800" fill="#334155">OFFICIAL DISTRICT MAP</text>
        </g>

        <!-- Capital Marker (Bhubaneswar) -->
        <g transform="translate(415, 335)">
          <circle cx="0" cy="0" r="5.5" fill="#ef4444" stroke="#ffffff" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="2" fill="#ffffff"/>
          <text x="8" y="3" font-size="9.5" font-weight="900" fill="#0f172a">Bhubaneswar ★</text>
        </g>

        <!-- Compass Compass Rose -->
        <g transform="translate(640, 30)">
          <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
          <path d="M 0,-10 L 3,0 L 0,3 L -3,0 Z" fill="#dc2626"/>
          <text x="0" y="-12" text-anchor="middle" font-size="8.5" font-weight="900" fill="#dc2626">N</text>
        </g>

        <!-- 30 District Boundaries & Labels -->
        ${districtPathsHTML}

        <!-- Bottom-Right Title Box & Legend -->
        <g transform="translate(470, 470)">
          <rect width="195" height="95" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="97" y="20" text-anchor="middle" font-size="12" font-weight="900" fill="#be185d" letter-spacing="1">ODISHA DISTRICTS</text>
          <line x1="10" y1="28" x2="185" y2="28" stroke="#e2e8f0" stroke-width="1"/>
          
          <line x1="15" y1="42" x2="40" y2="42" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3 1"/>
          <text x="45" y="45" font-size="8" font-weight="700" fill="#334155">State Boundary</text>
          <text x="125" y="45" font-size="8" font-weight="700" fill="#334155">★ State Capital</text>
          
          <line x1="15" y1="62" x2="40" y2="62" stroke="#475569" stroke-width="1.5"/>
          <text x="45" y="65" font-size="8" font-weight="700" fill="#334155">District Boundary</text>
          <circle cx="128" cy="62" r="2.5" fill="#1e293b"/>
          <text x="135" y="65" font-size="8" font-weight="700" fill="#334155">District Node</text>
        </g>
      </svg>
    </div>
  `;
}

async function selectMasterDistrict(distName) {
  activeDistrictName = distName;
  localStorage.setItem('odisha_user_district', distName);
  renderMasterOdishaSVGMap();

  // Highlight button in quick select grid
  document.querySelectorAll('.district-btn').forEach(btn => {
    if (btn.textContent.trim().toLowerCase() === distName.toLowerCase()) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  const cardContainer = document.getElementById('mapDistrictDetailsCard');
  if (!cardContainer) return;

  cardContainer.innerHTML = `
    <div class="text-center py-4">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted small">Loading weather & crop calendar for ${distName}...</p>
    </div>
  `;

  try {
    const weatherRes = await fetch(`/api/weather/${encodeURIComponent(distName)}`);
    const weatherData = await weatherRes.json();

    const distInfo = odishaMasterDistricts[distName] || { crops: ['Paddy', 'Vegetables', 'Maize', 'Mustard'], region: 'Odisha' };
    const w = weatherData.data || { temperature: 32, condition: 'Partly Cloudy', humidity: 75, rainfall: 25, icon: 'fa-cloud-sun' };

    cardContainer.innerHTML = `
      <div class="glass-card p-4 border-start border-5 border-success h-100 shadow-lg">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 mb-1 fw-bold">
              <i class="fas fa-map-marked-alt me-1"></i>${distInfo.region || 'Odisha'}
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

        <!-- Active Season Status -->
        <div class="mb-3">
          <h6 class="fw-bold text-dark mb-2"><i class="fas fa-tasks text-primary me-2"></i>Active Season Status:</h6>
          <div class="p-2 bg-light rounded text-muted small">
            <strong>Kharif / Rabi Season:</strong> Seed treatment with Carbendazim (2g/kg). Soil condition optimal for ${distName} crops.
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
  renderMasterOdishaSVGMap();
  const savedDist = localStorage.getItem('odisha_user_district') || 'Khordha';
  selectMasterDistrict(savedDist);
});
