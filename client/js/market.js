/* Market Prices Module Script */

let priceChartInstance = null;

async function loadMarketPrices() {
  const district = document.getElementById('marketDistrictFilter')?.value || 'All';
  const crop = document.getElementById('marketCropFilter')?.value || 'All';
  const search = document.getElementById('marketSearchInput')?.value || '';

  const tableBody = document.getElementById('marketPricesTableBody');
  if (!tableBody) return;

  try {
    const query = new URLSearchParams({ district, crop, search });
    const res = await fetch(`/api/market?${query.toString()}`);
    const data = await res.json();

    if (data.success && data.data.length > 0) {
      renderMarketTable(data.data);
      renderMarketChart(data.data);
    } else {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No market prices found for selected criteria.</td></tr>`;
    }
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger py-4">Error fetching market prices.</td></tr>`;
  }
}

function renderMarketTable(items) {
  const tableBody = document.getElementById('marketPricesTableBody');
  if (!tableBody) return;

  tableBody.innerHTML = items.map(item => {
    const diff = item.todayPrice - item.yesterdayPrice;
    let trendBadge = '';
    if (diff > 0) {
      trendBadge = `<span class="badge bg-success text-white"><i class="fas fa-arrow-up me-1"></i>+₹${diff}</span>`;
    } else if (diff < 0) {
      trendBadge = `<span class="badge bg-danger text-white"><i class="fas fa-arrow-down me-1"></i>-₹${Math.abs(diff)}</span>`;
    } else {
      trendBadge = `<span class="badge bg-secondary text-white"><i class="fas fa-minus me-1"></i>Stable</span>`;
    }

    return `
      <tr>
        <td class="fw-bold text-dark"><i class="fas fa-seedling text-success me-2"></i>${item.crop}</td>
        <td><i class="fas fa-map-marker-alt text-danger me-1"></i>${item.district}</td>
        <td class="small text-muted">${item.mandi || item.district + ' Mandi'}</td>
        <td class="fw-bold text-primary fs-6">₹${item.todayPrice} / Qtl</td>
        <td class="text-muted">₹${item.yesterdayPrice}</td>
        <td>${trendBadge}</td>
      </tr>
    `;
  }).join('');
}

function renderMarketChart(items) {
  const ctx = document.getElementById('marketPriceChart');
  if (!ctx || typeof Chart === 'undefined') return;

  const topItems = items.slice(0, 6);
  const labels = topItems.map(i => `${i.crop} (${i.district})`);
  const todayData = topItems.map(i => i.todayPrice);
  const yesterdayData = topItems.map(i => i.yesterdayPrice);

  if (priceChartInstance) {
    priceChartInstance.destroy();
  }

  priceChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Today's Mandi Price (₹/Qtl)",
          data: todayData,
          backgroundColor: 'rgba(13, 148, 136, 0.85)',
          borderRadius: 8
        },
        {
          label: "Yesterday's Price (₹/Qtl)",
          data: yesterdayData,
          backgroundColor: 'rgba(217, 119, 6, 0.5)',
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Top Crop Prices Across Odisha Mandis' }
      },
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('marketPricesTableBody')) {
    loadMarketPrices();

    const districtF = document.getElementById('marketDistrictFilter');
    const cropF = document.getElementById('marketCropFilter');
    const searchI = document.getElementById('marketSearchInput');

    if (districtF) districtF.addEventListener('change', loadMarketPrices);
    if (cropF) cropF.addEventListener('change', loadMarketPrices);
    if (searchI) searchI.addEventListener('input', loadMarketPrices);
  }
});
