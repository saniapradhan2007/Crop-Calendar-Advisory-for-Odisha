/* Live Map GIS Engine with All 30 Districts Option & 5-Point Automated Advisory */

let liveGisMapInstance = null;
let currentGpsMarker = null;

const districtCenterCoords = {
  Angul: [20.8444, 85.1511],
  Balasore: [21.4942, 86.9317],
  Bargarh: [21.3340, 83.6186],
  Bhadrak: [21.0574, 86.4969],
  Bolangir: [20.7082, 83.4844],
  Boudh: [20.8358, 84.3242],
  Cuttack: [20.4625, 85.8828],
  Deogarh: [21.5369, 84.7356],
  Dhenkanal: [20.6596, 85.5974],
  Gajapati: [18.8078, 84.1481],
  Ganjam: [19.3804, 84.9924],
  Jagatsinghpur: [20.2667, 86.1667],
  Jajpur: [20.8500, 86.3333],
  Jharsuguda: [21.8570, 84.0080],
  Kalahandi: [19.9079, 83.1659],
  Kandhamal: [20.2333, 84.1500],
  Kendrapara: [20.5000, 86.4167],
  Kendujhar: [21.6289, 85.5817],
  Khordha: [20.1818, 85.6206],
  Koraput: [18.8135, 82.7123],
  Malkangiri: [18.3436, 81.8841],
  Mayurbhanj: [21.9270, 86.7440],
  Nabarangpur: [19.2307, 82.5486],
  Nayagarh: [20.1268, 85.1026],
  Nuapada: [20.8393, 82.5204],
  Puri: [19.8135, 85.8312],
  Rayagada: [19.1711, 83.4163],
  Sambalpur: [21.4669, 83.9812],
  Subarnapur: [20.8385, 83.9167],
  Sundargarh: [22.1200, 84.0300]
};

const districtAdvisoryDatabase = {
  Angul: {
    crops: ['Paddy (Swarna)', 'Maize', 'Vegetables', 'Mustard', 'Sesame'],
    irrigation: 'Maintain 4-5 cm standing water layer in paddy fields. Irrigation interval: 5 days.',
    diseaseAlert: '⚠️ Stem Borer & Leaf Folder warning in Paddy. Apply Cartap Hydrochloride 4G (10 kg/acre).',
    calendarStatus: 'Kharif Sowing & Transplanting active. Apply 1st top-dressing dose of Urea.'
  },
  Balasore: {
    crops: ['High-Yield Paddy', 'Mustard', 'Vegetables', 'Groundnut', 'Betel Vine'],
    irrigation: 'Soil moisture adequate after coastal showers. Ensure proper field drainage in lowlands.',
    diseaseAlert: '🌧️ Bacterial Leaf Blight warning. Spray Streptocycline (1g/10L) + Copper Oxychloride (25g/10L).',
    calendarStatus: 'Kharif Vegetative Growth Phase. Weed control and seedling protection active.'
  },
  Bargarh: {
    crops: ['Paddy (Rabi & Kharif)', 'Sugarcane', 'Groundnut', 'Pulses'],
    irrigation: 'Canal water flowing in Hirakud command. Irrigate fields every 6-7 days.',
    diseaseAlert: '🌾 Gall Midge attack risk. Apply Carbofuran 3G granules (12 kg/acre).',
    calendarStatus: 'Kharif Sowing & Nursery preparation complete. Focus on transplanting.'
  },
  Bhadrak: {
    crops: ['Paddy', 'Vegetables', 'Mustard', 'Black Gram'],
    irrigation: 'Maintain moist soil condition. Avoid water stagnation in pulse crop fields.',
    diseaseAlert: '⚡ Sheath Blight alert due to high humidity. Spray Hexaconazole 5 EC (2ml/L).',
    calendarStatus: 'Kharif Paddy Transplanting active. Apply Basal dose of NPK (20:40:40).'
  },
  Bolangir: {
    crops: ['Cotton (Bt)', 'Paddy', 'Maize', 'Groundnut', 'Sunhemp'],
    irrigation: 'Light supplementary irrigation for Cotton. Soil moisture index at 65%.',
    diseaseAlert: '🐛 Pink Bollworm warning in Cotton. Install Pheromone Traps (5 traps/acre).',
    calendarStatus: 'Cotton vegetative growth stage. Inter-cultivation and weeding required.'
  },
  Boudh: {
    crops: ['Paddy', 'Pulses (Green Gram)', 'Vegetables', 'Groundnut'],
    irrigation: 'Mahanadi river basin soil retains good moisture. Irrigate every 6 days.',
    diseaseAlert: '🍃 Yellow Mosaic Virus in Pulses. Spray Dimethoate 30 EC (1.7 ml/L) for whitefly control.',
    calendarStatus: 'Kharif Sowing in progress. Seed treatment with Rhizobium culture.'
  },
  Cuttack: {
    crops: ['Kharif Paddy (Swarna/CR-1018)', 'Vegetables (Brinjal/Tomato)', 'Green Gram', 'Mustard'],
    irrigation: 'Maintain 5 cm standing water level in paddy fields. Soil moisture index is 82% (Optimal).',
    diseaseAlert: '⚠️ Moderate risk of Paddy Blast & Sheath Blight due to high humidity (78%). Spray Tricyclazole 75 WP (0.6g/L).',
    calendarStatus: 'Mid-Kharif Sowing & Transplanting Stage. Apply first dose of Urea (35 kg/acre).'
  },
  Deogarh: {
    crops: ['Paddy', 'Maize', 'Pulses', 'Oilseeds (Niger)'],
    irrigation: 'Rainfed hill farming zone. Apply soil mulching to conserve moisture.',
    diseaseAlert: '🐛 Cutworm warning in young Maize plants. Dust Chlorpyrifos 1.5% DP around roots.',
    calendarStatus: 'Early Kharif land preparation and organic manure application.'
  },
  Dhenkanal: {
    crops: ['Paddy', 'Sugarcane', 'Vegetables', 'Mango', 'Cashew'],
    irrigation: 'Irrigate Sugarcane crops at 8-10 day intervals. Provide drainage for Paddy.',
    diseaseAlert: '🍈 Anthracnose spot alert in Mango/Cashew orchards. Spray Carbendazim 50 WP (1g/L).',
    calendarStatus: 'Kharif Sowing & Orchard maintenance phase.'
  },
  Gajapati: {
    crops: ['Paddy', 'Maize', 'Cashew', 'Spices (Turmeric/Ginger)'],
    irrigation: 'Tribal hill slopes require contour bunding and light slope irrigation.',
    diseaseAlert: '🧄 Rhizome Rot alert in Ginger/Turmeric. Drench soil with Metalaxyl + Mancozeb (2g/L).',
    calendarStatus: 'Turmeric planting and paddy nursery preparation active.'
  },
  Ganjam: {
    crops: ['Groundnut (K-6)', 'Paddy', 'Maize', 'Cashew', 'Sugarcane'],
    irrigation: 'Coastal sandy loam soil requires light supplementary irrigation during dry spells.',
    diseaseAlert: '🥜 Tikka Leaf Spot warning in Groundnut. Spray Mancozeb 75 WP (2g/L).',
    calendarStatus: 'Kharif Groundnut Sowing & Weeding phase.'
  },
  Jagatsinghpur: {
    crops: ['Paddy', 'Vegetables', 'Betel Leaf', 'Mustard', 'Sugarcane'],
    irrigation: 'High coastal water table. Maintain proper field drainage after coastal showers.',
    diseaseAlert: '🍃 Betel Vine Vine Rot alert. Apply Bordeaux mixture (1%) at vine base.',
    calendarStatus: 'Kharif Paddy transplanting & betel vine care.'
  },
  Jajpur: {
    crops: ['Paddy', 'Vegetables', 'Groundnut', 'Jute'],
    irrigation: 'Ribbon canal irrigation active. Irrigate fields every 5 days.',
    diseaseAlert: '🌾 Stem Rot warning in Jute. Spray Copper Oxychloride 50 WP (3g/L).',
    calendarStatus: 'Jute harvesting & Paddy Kharif transplantation.'
  },
  Jharsuguda: {
    crops: ['Paddy', 'Maize', 'Vegetables', 'Groundnut'],
    irrigation: 'Soil moisture adequate. Irrigate groundnut fields at flowering stage.',
    diseaseAlert: '🐛 Spodoptera caterpillar alert in Maize. Spray Emamectin Benzoate 5 SG (0.4g/L).',
    calendarStatus: 'Kharif Sowing completed. Apply 1st top dressing of fertilizers.'
  },
  Kalahandi: {
    crops: ['Cotton (Bt)', 'Maize', 'Paddy', 'Pulses (Arhar)', 'Oilseeds'],
    irrigation: 'Drip irrigation recommended for Cotton crops. Monitor canal supply.',
    diseaseAlert: '🐛 Fall Armyworm (FAW) threat in Maize fields. Install pheromone traps (4/acre).',
    calendarStatus: 'Cotton Sowing & Inter-cropping phase.'
  },
  Kandhamal: {
    crops: ['Organic Turmeric', 'Maize', 'Millet (Ragi)', 'Paddy', 'Ginger'],
    irrigation: 'Highland organic farming zone. Natural monsoon rain is sufficient.',
    diseaseAlert: '🌱 Leaf Spot in Organic Turmeric. Apply Trichoderma viride bio-agent (5g/L).',
    calendarStatus: 'Organic Turmeric weeding & mulching phase.'
  },
  Kendrapara: {
    crops: ['Paddy', 'Jute', 'Vegetables', 'Mustard', 'Pulses'],
    irrigation: 'Coastal delta region. Maintain drainage channels to avoid crop submergence.',
    diseaseAlert: '⚡ Brown Planthopper (BPH) warning. Avoid excessive Nitrogen fertilizer.',
    calendarStatus: 'Kharif Paddy transplanting active.'
  },
  Kendujhar: {
    crops: ['Paddy', 'Maize', 'Vegetables', 'Pulses'],
    irrigation: 'Plateau zone. Irrigate paddy fields during 10-day dry spells.',
    diseaseAlert: '🌾 Paddy Blast alert. Spray Tricyclazole 75 WP (0.6g/L).',
    calendarStatus: 'Kharif Sowing & Weeding stage.'
  },
  Khordha: {
    crops: ['Paddy (Pooja/MTU-1010)', 'Vegetables (Okra/Chilli)', 'Floriculture (Marigold)', 'Sugarcane'],
    irrigation: 'Light irrigation recommended every 4-5 days. Ensure field drainage during heavy showers.',
    diseaseAlert: '⚡ Brown Planthopper (BPH) hopperburn warning. Inspect tiller bases. Spray Pymetrozine 50 WG (120g/acre).',
    calendarStatus: 'Kharif Vegetative Growth Phase. Weed management and top-dressing required.'
  },
  Koraput: {
    crops: ['Highland Coffee', 'Millet (Ragi)', 'Paddy', 'Ginger', 'Pineapple'],
    irrigation: 'Highland cool climate. Supplementary mist irrigation for coffee plants.',
    diseaseAlert: '☕ Coffee Berry Borer warning. Set up Brocap traps in orchards.',
    calendarStatus: 'Ragi transplanting & Coffee berry development stage.'
  },
  Malkangiri: {
    crops: ['Millet (Ragi)', 'Paddy', 'Maize', 'Sesame', 'Tapioca'],
    irrigation: 'Southern valley soil. Provide light channel irrigation.',
    diseaseAlert: '🌾 Blast in Ragi crops. Spray Mancozeb 75 WP (2g/L).',
    calendarStatus: 'Millet sowing & seedling transplantation.'
  },
  Mayurbhanj: {
    crops: ['Paddy', 'Maize', 'Mustard', 'Vegetables', 'Oilseeds'],
    irrigation: 'Similipal foothill region. Soil moisture optimal.',
    diseaseAlert: '🐛 Armyworm outbreak risk in Paddy. Spray Quinalphos 25 EC (2ml/L).',
    calendarStatus: 'Kharif Nursery raising & field ploughing.'
  },
  Nabarangpur: {
    crops: ['Maize (Hybrid)', 'Paddy', 'Sugarcane', 'Vegetables'],
    irrigation: 'Highland plateau. Irrigate Hybrid Maize at cob formation stage.',
    diseaseAlert: '🌽 Turcicum Leaf Blight in Maize. Spray Mancozeb 75 WP (2.5g/L).',
    calendarStatus: 'Hybrid Maize weeding & earthing-up stage.'
  },
  Nayagarh: {
    crops: ['Green Gram', 'Sugarcane', 'Paddy', 'Vegetables'],
    irrigation: 'Pulse crops require light irrigation at flowering & pod formation.',
    diseaseAlert: '🍃 Powdery Mildew in Pulses. Spray Wettable Sulphur 80 WP (3g/L).',
    calendarStatus: 'Green Gram harvesting & Kharif Paddy sowing.'
  },
  Nuapada: {
    crops: ['Paddy', 'Cotton', 'Maize', 'Pulses'],
    irrigation: 'Dryland area. Irrigate Cotton crop at 10-day intervals.',
    diseaseAlert: '🐛 Leaf Hopper alert in Cotton. Spray Imidacloprid 17.8 SL (0.3ml/L).',
    calendarStatus: 'Kharif Sowing & weeding phase.'
  },
  Puri: {
    crops: ['Coastal Paddy', 'Coconut', 'Vegetables (Pumpkin/Pointed Gourd)', 'Betel Leaf', 'Groundnut'],
    irrigation: 'High groundwater table. Differentiate field bunding to prevent coastal salinity runoff.',
    diseaseAlert: '🌴 Coconut Rugose Spiraling Whitefly alert. Spray neem oil 0.5% (5ml/L water).',
    calendarStatus: 'Nursery sowing & land preparation active. Seed treatment with Carbendazim (2g/kg).'
  },
  Rayagada: {
    crops: ['Cotton', 'Millet', 'Maize', 'Paddy', 'Cashew'],
    irrigation: 'Tribal hill slope cultivation. Rainfed supplementary watering.',
    diseaseAlert: '🐛 Cashew Stem & Root Borer alert. Clean trunk base & apply Chlorpyrifos.',
    calendarStatus: 'Millet transplantation & Cashew orchard weeding.'
  },
  Sambalpur: {
    crops: ['Hirakud Command Paddy', 'Sugarcane', 'Vegetables', 'Groundnut', 'Maize'],
    irrigation: 'Canal water available from Hirakud Reservoir. Irrigate field every 6 days.',
    diseaseAlert: '🦠 Stem Borer attack risk in early paddy. Apply Chlorantraniliprole 0.4% GR (4 kg/acre).',
    calendarStatus: 'Kharif Transplantation completed. Focus on nitrogenous fertilizer application.'
  },
  Subarnapur: {
    crops: ['Paddy', 'Handloom Cotton', 'Vegetables', 'Pulses'],
    irrigation: 'Mahanadi river plain. Irrigate Paddy crops every 5 days.',
    diseaseAlert: '⚡ Bacterial Leaf Streak in Paddy. Spray Copper Oxychloride 50 WP (2.5g/L).',
    calendarStatus: 'Kharif Paddy transplanting active.'
  },
  Sundargarh: {
    crops: ['Highland Paddy', 'Maize', 'Mustard', 'Vegetables', 'Pulses'],
    irrigation: 'Dryland farming zone. Apply mulching to preserve soil moisture.',
    diseaseAlert: '🌾 Paddy Gall Midge warning. Apply Carbofuran 3G (12 kg/acre).',
    calendarStatus: 'Early Kharif land preparation and soil testing.'
  }
};

function initLiveGisMap() {
  if (liveGisMapInstance) return;

  // Default center Odisha (Bhubaneswar/Cuttack coords)
  liveGisMapInstance = L.map('liveGisMap').setView([20.2961, 85.8245], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors | Odisha Agriculture GIS'
  }).addTo(liveGisMapInstance);
}

function selectLiveDistrict(distName, isGps = false) {
  localStorage.setItem('odisha_user_district', distName);

  // Update Dropdown Selection
  const dropdown = document.getElementById('liveDistrictDropdown');
  if (dropdown) dropdown.value = distName;

  // Highlight button in quick select grid
  document.querySelectorAll('#liveDistrictGrid .district-btn').forEach(btn => {
    if (btn.textContent.trim().toLowerCase() === distName.toLowerCase()) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  const coords = districtCenterCoords[distName] || [20.2961, 85.8245];
  const lat = coords[0];
  const lng = coords[1];

  document.getElementById('latLngDisplay').innerHTML = `Lat: ${lat.toFixed(4)} | Lng: ${lng.toFixed(4)}`;

  // Pan GIS Satellite Map to District
  initLiveGisMap();
  liveGisMapInstance.setView([lat, lng], 11);

  if (currentGpsMarker) liveGisMapInstance.removeLayer(currentGpsMarker);

  const pulseIcon = L.divIcon({
    className: 'gps-pulse-marker',
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });

  currentGpsMarker = L.marker([lat, lng], { icon: pulseIcon }).addTo(liveGisMapInstance);
  currentGpsMarker.bindPopup(`<b>📍 ${distName} District</b><br>${isGps ? 'GPS Detected Location' : 'Selected District'}<br>Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`).openPopup();

  const badge = document.getElementById('gpsStatusBadge');
  if (badge) {
    badge.className = `badge ${isGps ? 'bg-success' : 'bg-primary'} rounded-pill px-3 py-2`;
    badge.innerHTML = `📍 ${isGps ? 'GPS Active' : 'Selected'}: ${distName} District`;
  }

  render5PointAdvisoryPanel(distName, lat, lng, isGps);
}

function onDistrictDropdownChange(distName) {
  if (distName) {
    selectLiveDistrict(distName, false);
    if (typeof showToast === 'function') {
      showToast(`Selected ${distName} District on Live Map!`, 'info');
    }
  }
}

// Live GPS & Nominatim Reverse Geocoding Engine
async function detectLiveGpsLocation() {
  const btn = document.getElementById('triggerGpsBtn');
  const badge = document.getElementById('gpsStatusBadge');

  if (btn) {
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Locating GPS...`;
    btn.disabled = true;
  }
  if (badge) {
    badge.className = 'badge bg-warning text-dark rounded-pill px-3 py-2';
    badge.innerHTML = 'Acquiring GPS Satellite Signal...';
  }

  if (!navigator.geolocation) {
    if (typeof showToast === 'function') showToast('Geolocation is not supported by your browser.', 'error');
    if (btn) { btn.innerHTML = `<i class="fas fa-crosshairs me-1"></i>Auto GPS Detect`; btn.disabled = false; }
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      document.getElementById('latLngDisplay').innerHTML = `Lat: ${lat.toFixed(4)} | Lng: ${lng.toFixed(4)}`;

      initLiveGisMap();
      liveGisMapInstance.setView([lat, lng], 13);

      if (currentGpsMarker) liveGisMapInstance.removeLayer(currentGpsMarker);

      const pulseIcon = L.divIcon({
        className: 'gps-pulse-marker',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      currentGpsMarker = L.marker([lat, lng], { icon: pulseIcon }).addTo(liveGisMapInstance);
      currentGpsMarker.bindPopup(`<b>📍 You Are Here</b><br>Detected GPS Location<br>Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`).openPopup();

      let detectedDistrict = null;
      try {
        const nomRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const nomData = await nomRes.json();
        
        if (nomData && nomData.address) {
          const addr = nomData.address;
          const rawDist = addr.state_district || addr.county || addr.city || addr.district || addr.town || addr.village || '';
          
          Object.keys(districtAdvisoryDatabase).forEach(d => {
            if (rawDist.toLowerCase().includes(d.toLowerCase())) {
              detectedDistrict = d;
            }
          });
        }
      } catch (e) {
        console.log('Nominatim reverse geocode fallback');
      }

      detectedDistrict = detectedDistrict || localStorage.getItem('odisha_user_district') || 'Khordha';
      selectLiveDistrict(detectedDistrict, true);

      if (btn) {
        btn.innerHTML = `<i class="fas fa-check-circle me-1"></i>GPS Live: ${detectedDistrict}`;
        btn.disabled = false;
      }
    },
    (error) => {
      const fallbackDist = localStorage.getItem('odisha_user_district') || 'Khordha';
      selectLiveDistrict(fallbackDist, false);

      if (btn) {
        btn.innerHTML = `<i class="fas fa-crosshairs me-1"></i>Auto GPS Detect`;
        btn.disabled = false;
      }

      if (typeof showToast === 'function') {
        showToast('Location permission denied. Please select your district from the dropdown or grid below.', 'info');
      }
    },
    { timeout: 10000, maximumAge: 30000, enableHighAccuracy: true }
  );
}

async function render5PointAdvisoryPanel(distName, lat, lng, isGps = false) {
  const panel = document.getElementById('liveAdvisoryPanel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
      <p class="mt-2 text-muted">Building 5-point advisory for ${distName}...</p>
    </div>
  `;

  try {
    const weatherRes = await fetch(`/api/weather/${encodeURIComponent(distName)}`);
    const weatherData = await weatherRes.json();
    const w = weatherData.data || { temperature: 32, condition: 'Partly Cloudy', humidity: 78, rainfall: 35, icon: 'fa-cloud-sun' };

    const adv = districtAdvisoryDatabase[distName] || districtAdvisoryDatabase['Khordha'];

    panel.innerHTML = `
      <div class="glass-card p-4 border-start border-5 border-danger h-100 shadow-lg">
        <div class="d-flex justify-content-between align-items-start mb-3 pb-2 border-bottom">
          <div>
            <span class="badge ${isGps ? 'bg-danger' : 'bg-primary'} rounded-pill px-3 py-1 mb-1 fw-bold">
              <i class="fas ${isGps ? 'fa-location-crosshairs' : 'fa-map-marked-alt'} me-1"></i>${isGps ? '📍 GPS Active District' : '📍 Selected District'}
            </span>
            <h3 class="fw-bold text-dark mb-0">${distName} District</h3>
          </div>
          <a href="/crop-calendar.html?district=${distName}" class="btn btn-outline-danger btn-sm rounded-pill fw-bold">
            <i class="fas fa-calendar-alt me-1"></i>Full Calendar
          </a>
        </div>

        <!-- 1. 🌤️ Live Weather -->
        <div class="p-3 bg-primary bg-opacity-10 rounded-3 mb-3 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <i class="fas ${w.icon || 'fa-cloud-sun'} fa-2x text-primary"></i>
            <div>
              <h5 class="fw-bold mb-0 text-dark">${w.temperature}°C | ${w.condition}</h5>
              <small class="text-muted">Humidity: ${w.humidity}% | Wind: ${w.windSpeed || 14} km/h</small>
            </div>
          </div>
          <span class="badge bg-primary text-white fs-6"><i class="fas fa-umbrella me-1"></i>${w.rainfall} mm</span>
        </div>

        <!-- 2. 🌾 Crop Calendar -->
        <div class="mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="fas fa-calendar-check text-success me-2"></i>1. Crop Calendar Schedule:</h6>
          <p class="text-muted small mb-0 bg-light p-2 rounded border-start border-3 border-success">${adv.calendarStatus}</p>
        </div>

        <!-- 3. 🌱 Recommended Crops -->
        <div class="mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="fas fa-seedling text-warning me-2"></i>2. Recommended High-Yield Crops:</h6>
          <div class="d-flex flex-wrap gap-1">
            ${adv.crops.map(c => `<span class="badge bg-light text-dark border px-2 py-1 rounded-pill"><i class="fas fa-leaf text-success me-1"></i>${c}</span>`).join('')}
          </div>
        </div>

        <!-- 4. 💧 Irrigation Advice -->
        <div class="mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="fas fa-droplet text-primary me-2"></i>3. Real-Time Irrigation Advice:</h6>
          <p class="text-muted small mb-0 bg-light p-2 rounded border-start border-3 border-primary">${adv.irrigation}</p>
        </div>

        <!-- 5. 🦠 Disease Alert -->
        <div class="mb-3">
          <h6 class="fw-bold text-dark mb-1"><i class="fas fa-bug text-danger me-2"></i>4. Disease & Pest Alert:</h6>
          <p class="text-danger small mb-0 bg-danger bg-opacity-10 p-2 rounded border-start border-3 border-danger fw-semibold">${adv.diseaseAlert}</p>
        </div>
      </div>
    `;
  } catch (err) {
    panel.innerHTML = `<div class="alert alert-danger">Error loading live advisory panel.</div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initLiveGisMap();
  const savedDist = localStorage.getItem('odisha_user_district') || 'Khordha';
  selectLiveDistrict(savedDist, false);
});
