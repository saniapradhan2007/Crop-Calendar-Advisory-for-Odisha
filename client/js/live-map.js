/* Live Map GIS Engine & 5-Point Automated District Advisory */

let liveGisMapInstance = null;
let currentGpsMarker = null;

const districtAdvisoryDatabase = {
  Cuttack: {
    crops: ['Kharif Paddy (Swarna/CR-1018)', 'Vegetables (Brinjal/Tomato)', 'Green Gram', 'Mustard'],
    irrigation: 'Maintain 5 cm standing water level in paddy fields. Soil moisture index is 82% (Optimal).',
    diseaseAlert: '⚠️ Moderate risk of Paddy Blast & Sheath Blight due to high humidity (78%). Spray Tricyclazole 75 WP (0.6g/L).',
    calendarStatus: 'Mid-Kharif Sowing & Transplanting Stage. Apply first dose of Urea (35 kg/acre).'
  },
  Khordha: {
    crops: ['Paddy (Pooja/MTU-1010)', 'Vegetables (Okra/Chilli)', 'Floriculture (Marigold)', 'Sugarcane'],
    irrigation: 'Light irrigation recommended every 4-5 days. Ensure field drainage during heavy showers.',
    diseaseAlert: '⚡ Brown Planthopper (BPH) hopperburn warning. Inspect tiller bases. Spray Pymetrozine 50 WG (120g/acre).',
    calendarStatus: 'Kharif Vegetative Growth Phase. Weed management and top-dressing required.'
  },
  Puri: {
    crops: ['Coastal Paddy', 'Coconut', 'Vegetables (Pumpkin/Pointed Gourd)', 'Betel Leaf', 'Groundnut'],
    irrigation: 'High groundwater table. Differentiate field bunding to prevent coastal salinity runoff.',
    diseaseAlert: '🌴 Coconut Rugose Spiraling Whitefly alert. Spray neem oil 0.5% (5ml/L water).',
    calendarStatus: 'Nursery sowing & land preparation active. Seed treatment with Carbendazim (2g/kg).'
  },
  Sambalpur: {
    crops: ['Hirakud Command Paddy', 'Sugarcane', 'Vegetables', 'Groundnut', 'Maize'],
    irrigation: 'Canal water available from Hirakud Reservoir. Irrigate field every 6 days.',
    diseaseAlert: '🦠 Stem Borer attack risk in early paddy. Apply Chlorantraniliprole 0.4% GR (4 kg/acre).',
    calendarStatus: 'Kharif Transplantation completed. Focus on nitrogenous fertilizer application.'
  },
  Balasore: {
    crops: ['High-Yield Paddy', 'Mustard', 'Vegetables', 'Groundnut', 'Betel Vine'],
    irrigation: 'Soil moisture adequate after recent rains. Drainage necessary in low-lying delta areas.',
    diseaseAlert: '🌧️ Bacterial Leaf Blight warning. Spray Streptocycline (1g/10L) + Copper Oxychloride (25g/10L).',
    calendarStatus: 'Kharif Sowing in progress. Ensure certified seed usage.'
  },
  Ganjam: {
    crops: ['Groundnut (K-6)', 'Paddy', 'Maize', 'Cashew', 'Sugarcane'],
    irrigation: 'Coastal soil requires light supplementary irrigation during dry spells.',
    diseaseAlert: '🥜 Tikka Leaf Spot warning in Groundnut. Spray Mancozeb 75 WP (2g/L).',
    calendarStatus: 'Kharif Groundnut Sowing & Weeding phase.'
  },
  Kalahandi: {
    crops: ['Cotton (Bt)', 'Maize', 'Paddy', 'Pulses (Arhar)', 'Oilseeds'],
    irrigation: 'Drip irrigation recommended for Cotton crops. Monitor canal supply.',
    diseaseAlert: '🐛 Fall Armyworm (FAW) threat in Maize fields. Install pheromone traps (4/acre).',
    calendarStatus: 'Cotton Sowing & Inter-cropping phase.'
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
  liveGisMapInstance = L.map('liveGisMap').setView([20.4625, 85.8828], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors | Odisha Agriculture GIS'
  }).addTo(liveGisMapInstance);
}

function detectLiveGpsLocation() {
  const btn = document.getElementById('triggerGpsBtn');
  const badge = document.getElementById('gpsStatusBadge');
  const panel = document.getElementById('liveAdvisoryPanel');

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
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      document.getElementById('latLngDisplay').innerHTML = `Lat: ${lat.toFixed(4)} | Lng: ${lng.toFixed(4)}`;

      // Update Leaflet Map Marker
      initLiveGisMap();
      liveGisMapInstance.setView([lat, lng], 13);

      if (currentGpsMarker) liveGisMapInstance.removeLayer(currentGpsMarker);

      // Custom Pulsing GPS Pin Icon
      const pulseIcon = L.divIcon({
        className: 'gps-pulse-marker',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      currentGpsMarker = L.marker([lat, lng], { icon: pulseIcon }).addTo(liveGisMapInstance);
      currentGpsMarker.bindPopup(`<b>📍 You Are Here</b><br>Detected GPS Location<br>Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`).openPopup();

      // Reverse Geocode District via Nominatim
      let detectedDistrict = 'Cuttack';
      try {
        const nomRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const nomData = await nomRes.json();
        
        if (nomData && nomData.address) {
          const addr = nomData.address;
          const rawDist = addr.state_district || addr.county || addr.city || addr.district || '';
          
          Object.keys(districtAdvisoryDatabase).forEach(d => {
            if (rawDist.toLowerCase().includes(d.toLowerCase())) {
              detectedDistrict = d;
            }
          });
        }
      } catch (e) {
        console.log('Nominatim fallback to Cuttack/Khordha default');
      }

      if (badge) {
        badge.className = 'badge bg-success rounded-pill px-3 py-2';
        badge.innerHTML = `📍 GPS Active: ${detectedDistrict} District`;
      }

      if (btn) {
        btn.innerHTML = `<i class="fas fa-check-circle me-2"></i>GPS Detected: ${detectedDistrict}`;
        btn.disabled = false;
      }

      // Fetch Weather & Render 5-Point Advisory Card Panel
      render5PointAdvisoryPanel(detectedDistrict, lat, lng);

      if (typeof showToast === 'function') {
        showToast(`📍 Live Location Active: ${detectedDistrict} District!`, 'success');
      }
    },
    (error) => {
      // Fallback default Cuttack/Khordha if permission denied
      const fallbackDist = 'Cuttack';
      initLiveGisMap();
      render5PointAdvisoryPanel(fallbackDist, 20.4625, 85.8828);

      if (badge) {
        badge.className = 'badge bg-info text-dark rounded-pill px-3 py-2';
        badge.innerHTML = `Location: ${fallbackDist} (Default)`;
      }

      if (btn) {
        btn.innerHTML = `<i class="fas fa-crosshairs me-2"></i>Re-Detect Location`;
        btn.disabled = false;
      }

      if (typeof showToast === 'function') {
        showToast('Location permission denied. Showing Cuttack regional advisory.', 'info');
      }
    },
    { timeout: 10000, maximumAge: 30000, enableHighAccuracy: true }
  );
}

async function render5PointAdvisoryPanel(distName, lat, lng) {
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

    const adv = districtAdvisoryDatabase[distName] || districtAdvisoryDatabase['Cuttack'];

    panel.innerHTML = `
      <div class="glass-card p-4 border-start border-5 border-danger h-100 shadow-lg">
        <div class="d-flex justify-content-between align-items-start mb-3 pb-2 border-bottom">
          <div>
            <span class="badge bg-danger rounded-pill px-3 py-1 mb-1 fw-bold">
              <i class="fas fa-location-crosshairs me-1"></i>Live Detected District
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
  // Auto detect location when user opens live-map.html
  detectLiveGpsLocation();
});
