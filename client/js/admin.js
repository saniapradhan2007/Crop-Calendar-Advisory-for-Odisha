/* Admin & Officer Management Panel Script */

async function initAdminPanel() {
  const token = getAuthToken();
  const user = getUser();

  if (!token || !user || (user.role !== 'Admin' && user.role !== 'Agriculture Officer')) {
    showToast('Unauthorized access. Redirecting to login...', 'error');
    setTimeout(() => { window.location.href = '/login.html'; }, 1200);
    return;
  }

  loadAdminUsers();
}

async function loadAdminUsers() {
  const container = document.getElementById('adminUsersTableBody');
  if (!container) return;

  try {
    const res = await fetch('/api/auth/users', {
      headers: { 'Authorization': 'Bearer ' + getAuthToken() }
    });
    const data = await res.json();
    if (data.success && data.users) {
      container.innerHTML = data.users.map((u, i) => `
        <tr>
          <td>${i + 1}</td>
          <td class="fw-bold text-dark">${u.name}</td>
          <td>${u.email}</td>
          <td><span class="badge ${u.role === 'Admin' ? 'bg-danger' : u.role === 'Agriculture Officer' ? 'bg-primary' : 'bg-success'}">${u.role}</span></td>
          <td>${u.district || 'Cuttack'}</td>
          <td>${u.phone || 'N/A'}</td>
        </tr>
      `).join('');
    }
  } catch (err) {
    container.innerHTML = `<tr><td colspan="6" class="text-muted text-center py-3">Could not load users list</td></tr>`;
  }
}

// Add Crop Schedule Form Submission
async function handleAddCropSchedule(e) {
  e.preventDefault();
  const crop = document.getElementById('adminCropName').value;
  const district = document.getElementById('adminCropDistrict').value;
  const season = document.getElementById('adminCropSeason').value;
  const sowingDate = document.getElementById('adminSowingDate').value;
  const harvestDate = document.getElementById('adminHarvestDate').value;
  const advisory = document.getElementById('adminCropAdvisory').value;

  const body = {
    crop, district, season, sowingDate, harvestDate, advisory,
    stages: [
      { stageName: 'Land Preparation', durationDays: '1-10 Days', activities: ['Plowing and leveling'] },
      { stageName: 'Sowing/Transplanting', durationDays: '11-30 Days', activities: ['Sowing seeds/Transplanting'] },
      { stageName: 'Harvesting', durationDays: '90-120 Days', activities: ['Harvesting and drying'] }
    ]
  };

  try {
    const res = await fetch('/api/crops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken()
      },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.success) {
      showToast('Crop schedule added successfully!', 'success');
      document.getElementById('addCropForm')?.reset();
    } else {
      showToast(data.message || 'Failed to add crop', 'error');
    }
  } catch (err) {
    showToast('Error adding crop schedule', 'error');
  }
}

// Publish Advisory Form Submission
async function handlePublishAdvisory(e) {
  e.preventDefault();
  const title = document.getElementById('advTitle').value;
  const crop = document.getElementById('advCrop').value;
  const district = document.getElementById('advDistrict').value;
  const category = document.getElementById('advCategory').value;
  const severity = document.getElementById('advSeverity').value;
  const description = document.getElementById('advDescription').value;
  const chemicalTreatment = document.getElementById('advTreatment').value;

  try {
    const res = await fetch('/api/advisories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken()
      },
      body: JSON.stringify({ title, crop, district, category, severity, description, chemicalTreatment })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Advisory published successfully!', 'success');
      document.getElementById('publishAdvForm')?.reset();
    } else {
      showToast(data.message || 'Failed to publish advisory', 'error');
    }
  } catch (err) {
    showToast('Error publishing advisory', 'error');
  }
}

// Update Mandi Prices Form Submission
async function handleUpdateMarketPrice(e) {
  e.preventDefault();
  const crop = document.getElementById('mktCrop').value;
  const district = document.getElementById('mktDistrict').value;
  const todayPrice = parseFloat(document.getElementById('mktTodayPrice').value);
  const yesterdayPrice = parseFloat(document.getElementById('mktYesterdayPrice').value);
  const mandi = document.getElementById('mktMandiName').value;

  try {
    const res = await fetch('/api/market', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken()
      },
      body: JSON.stringify({ crop, district, todayPrice, yesterdayPrice, mandi })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Mandi price updated successfully!', 'success');
      document.getElementById('updateMarketForm')?.reset();
    } else {
      showToast(data.message || 'Failed to update price', 'error');
    }
  } catch (err) {
    showToast('Error updating market price', 'error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('adminUsersTableBody')) {
    initAdminPanel();

    const cropForm = document.getElementById('addCropForm');
    const advForm = document.getElementById('publishAdvForm');
    const mktForm = document.getElementById('updateMarketForm');

    if (cropForm) cropForm.addEventListener('submit', handleAddCropSchedule);
    if (advForm) advForm.addEventListener('submit', handlePublishAdvisory);
    if (mktForm) mktForm.addEventListener('submit', handleUpdateMarketPrice);
  }
});
