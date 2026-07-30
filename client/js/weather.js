/* Weather Module Script */

async function fetchWeather(district = 'Cuttack') {
  const container = document.getElementById('weatherModuleContainer');
  if (!container) return;

  try {
    const res = await fetch(`/api/weather/${encodeURIComponent(district)}`);
    const result = await res.json();

    if (result.success) {
      renderWeather(result.data);
    } else {
      showToast('Could not load weather data for ' + district, 'error');
    }
  } catch (err) {
    showToast('Failed to fetch weather data', 'error');
  }
}

function renderWeather(data) {
  const container = document.getElementById('weatherModuleContainer');
  if (!container) return;

  let alertsHTML = '';
  if (data.alerts && data.alerts.length > 0) {
    alertsHTML = data.alerts.map(alert => `
      <div class="alert alert-danger d-flex align-items-center mb-3 shadow-sm border-0" role="alert">
        <i class="fas fa-exclamation-triangle fa-2x me-3"></i>
        <div>
          <strong class="d-block">Weather Alert for ${data.district} District:</strong>
          <span>${alert}</span>
        </div>
      </div>
    `).join('');
  }

  let forecastHTML = '';
  if (data.forecast && data.forecast.length > 0) {
    forecastHTML = data.forecast.map(item => `
      <div class="col">
        <div class="glass-card p-3 text-center h-100">
          <small class="text-muted fw-bold">${item.day}</small>
          <div class="my-2">
            <i class="fas ${getWeatherIcon(item.condition)} fa-2x text-primary"></i>
          </div>
          <h5 class="fw-bold mb-0 text-dark">${item.temp}°C</h5>
          <small class="text-muted d-block">${item.condition}</small>
          <span class="badge bg-light text-primary mt-2"><i class="fas fa-umbrella me-1"></i>${item.rainChance}% Rain</span>
        </div>
      </div>
    `).join('');
  }

  container.innerHTML = `
    ${alertsHTML}
    
    <div class="weather-main-card mb-4">
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <div class="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
            <i class="fas fa-map-marker-alt text-warning fs-4"></i>
            <h2 class="fw-bold mb-0">${data.district} District Weather</h2>
          </div>
          <p class="opacity-75 mb-3">Live Agri-Weather & Irrigation Advisory</p>
          <div class="d-flex align-items-baseline justify-content-center justify-content-md-start gap-3">
            <h1 class="display-3 fw-bold mb-0">${data.temperature}°C</h1>
            <div>
              <h5 class="mb-0 fw-bold">${data.condition}</h5>
              <small class="opacity-75">Feels like ${data.temperature + 1}°C</small>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="row g-3 text-center">
            <div class="col-6 col-sm-4">
              <div class="p-3 bg-white bg-opacity-10 rounded-3 backdrop-blur">
                <i class="fas fa-tint fs-4 text-info mb-1"></i>
                <small class="d-block opacity-75">Humidity</small>
                <strong class="fs-5">${data.humidity}%</strong>
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="p-3 bg-white bg-opacity-10 rounded-3 backdrop-blur">
                <i class="fas fa-wind fs-4 text-warning mb-1"></i>
                <small class="d-block opacity-75">Wind Speed</small>
                <strong class="fs-5">${data.windSpeed} km/h</strong>
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="p-3 bg-white bg-opacity-10 rounded-3 backdrop-blur">
                <i class="fas fa-cloud-showers-heavy fs-4 text-primary mb-1"></i>
                <small class="d-block opacity-75">Rainfall</small>
                <strong class="fs-5">${data.rainfall} mm</strong>
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="p-3 bg-white bg-opacity-10 rounded-3 backdrop-blur">
                <i class="fas fa-compress-arrows-alt fs-4 text-light mb-1"></i>
                <small class="d-block opacity-75">Pressure</small>
                <strong class="fs-5">${data.pressure} hPa</strong>
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="p-3 bg-white bg-opacity-10 rounded-3 backdrop-blur">
                <i class="fas fa-sun fs-4 text-warning mb-1"></i>
                <small class="d-block opacity-75">UV Index</small>
                <strong class="fs-5">${data.uvIndex} / 10</strong>
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="p-3 bg-white bg-opacity-10 rounded-3 backdrop-blur">
                <i class="fas fa-seedling fs-4 text-success mb-1"></i>
                <small class="d-block opacity-75">Agri Advice</small>
                <strong class="fs-6">${data.rainfall > 40 ? 'Drainage' : 'Irrigate'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h4 class="fw-bold mb-3 text-dark"><i class="fas fa-calendar-alt me-2 text-primary"></i>5-Day Agricultural Forecast</h4>
    <div class="row row-cols-2 row-cols-md-5 g-3 mb-4">
      ${forecastHTML}
    </div>
  `;
}

function getWeatherIcon(condition) {
  if (!condition) return 'fa-cloud-sun';
  const c = condition.toLowerCase();
  if (c.includes('rain')) return 'fa-cloud-showers-heavy';
  if (c.includes('thunder') || c.includes('bolt')) return 'fa-bolt';
  if (c.includes('cloud')) return 'fa-cloud-sun';
  if (c.includes('sun') || c.includes('clear')) return 'fa-sun';
  if (c.includes('wind')) return 'fa-wind';
  return 'fa-cloud-sun';
}

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('weatherDistrictSelect');
  if (select) {
    select.addEventListener('change', (e) => fetchWeather(e.target.value));
    fetchWeather(select.value);
  }
});
