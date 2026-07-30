/* Farmer Dashboard Script */

function initFarmerDashboard() {
  const user = getUser();
  const userNameEl = document.getElementById('dashFarmerName');
  const userDistEl = document.getElementById('dashFarmerDistrict');

  if (userNameEl && user) userNameEl.textContent = user.name;
  if (userDistEl && user) userDistEl.textContent = user.district || 'Cuttack';

  renderFarmerGrowthChart();
}

function renderFarmerGrowthChart() {
  const ctx = document.getElementById('farmerGrowthChart');
  if (!ctx || typeof Chart === 'undefined') return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['June (Sowing)', 'July (Nursery)', 'Aug (Tillering)', 'Sept (Panicle)', 'Oct (Harvest)'],
      datasets: [{
        label: 'Expected Yield Prediction (Quintals/Acre)',
        data: [0, 4, 12, 22, 26],
        borderColor: '#0d9488',
        backgroundColor: 'rgba(13, 148, 136, 0.15)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('farmerGrowthChart')) {
    initFarmerDashboard();
  }
});
