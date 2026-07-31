/* ==========================================================================
   Odisha Farmer Marketplace Module - Application Logic
   ========================================================================== */

// Odisha 30 Districts Data List
const ODISHA_DISTRICTS = [
  "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Baudh", "Cuttack",
  "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur",
  "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khordha",
  "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada",
  "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
];

// Sample Image Presets for Odisha Agriculture Produce
const CROP_IMAGE_PRESETS = [
  { label: "Paddy/Rice", url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80" },
  { label: "Sweet Corn", url: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80" },
  { label: "Fresh Tomatoes", url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80" },
  { label: "Organic Turmeric", url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80" },
  { label: "Groundnut/Peanuts", url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80" },
  { label: "Green Pulses / Moong", url: "https://images.unsplash.com/photo-1515543904379-3d757abe9962?auto=format&fit=crop&w=600&q=80" },
  { label: "Fresh Brinjal", url: "https://images.unsplash.com/photo-1615485290178-0e9e99a4c514?auto=format&fit=crop&w=600&q=80" },
  { label: "Juicy Mangoes", url: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80" },
  { label: "Onion Harvest", url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80" },
  { label: "Yellow Mustard", url: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80" }
];

// Pre-seeded Odisha Farmer Crop Listings
const INITIAL_CROPS = [
  {
    id: "crop-101",
    farmerId: "farmer-01",
    farmerName: "Ramesh Sahoo",
    farmerPhone: "+91 98610 12345",
    cropName: "Organic Sambalpur Swarna Paddy",
    category: "Grains & Pulses",
    quantity: 1200,
    unit: "kg",
    price: 24,
    district: "Sambalpur",
    location: "Attabira Village, Sambalpur",
    harvestDate: "2026-07-20",
    organic: true,
    image: CROP_IMAGE_PRESETS[0].url,
    description: "High quality premium Swarna Paddy harvested directly from Hirakud canal irrigated fields. No chemical pesticides used.",
    available: true,
    createdAt: "2026-07-21"
  },
  {
    id: "crop-102",
    farmerId: "farmer-02",
    farmerName: "Prakash Pradhan",
    farmerPhone: "+91 94371 88900",
    cropName: "Fresh Hybrid Sweet Corn",
    category: "Grains & Pulses",
    quantity: 500,
    unit: "kg",
    price: 35,
    district: "Bargarh",
    location: "Barpali, Bargarh",
    harvestDate: "2026-07-25",
    organic: false,
    image: CROP_IMAGE_PRESETS[1].url,
    description: "Juicy, sweet yellow corn ready for bulk mandi or food processing buyers. Direct farm harvest.",
    available: true,
    createdAt: "2026-07-26"
  },
  {
    id: "crop-103",
    farmerId: "farmer-03",
    farmerName: "Subhashree Jena",
    farmerPhone: "+91 99372 44511",
    cropName: "Kandhamal GI Organic Turmeric",
    category: "Spices",
    quantity: 350,
    unit: "kg",
    price: 135,
    district: "Kandhamal",
    location: "Phulbani, Kandhamal",
    harvestDate: "2026-07-15",
    organic: true,
    image: CROP_IMAGE_PRESETS[3].url,
    description: "Pure GI Tagged Kandhamal Haldi with rich curcumin content. Sun-dried and ready for packaging.",
    available: true,
    createdAt: "2026-07-16"
  },
  {
    id: "crop-104",
    farmerId: "farmer-04",
    farmerName: "Bishnu Charan Swain",
    farmerPhone: "+91 97765 33210",
    cropName: "Desi Red Farm Tomatoes",
    category: "Vegetables",
    quantity: 800,
    unit: "kg",
    price: 22,
    district: "Cuttack",
    location: "Banki, Cuttack",
    harvestDate: "2026-07-28",
    organic: false,
    image: CROP_IMAGE_PRESETS[2].url,
    description: "Farm-fresh ripe tomatoes harvested daily morning. Ideal for vegetable traders and hotels.",
    available: true,
    createdAt: "2026-07-28"
  },
  {
    id: "crop-105",
    farmerId: "farmer-05",
    farmerName: "Maheswar Naik",
    farmerPhone: "+91 98533 11200",
    cropName: "Koraput Organic Ginger",
    category: "Spices",
    quantity: 400,
    unit: "kg",
    price: 85,
    district: "Koraput",
    location: "Semiliguda, Koraput",
    harvestDate: "2026-07-22",
    organic: true,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    description: "Aromatic hill ginger with bold roots. Grown organically in Eastern Ghats region.",
    available: true,
    createdAt: "2026-07-23"
  },
  {
    id: "crop-106",
    farmerId: "farmer-06",
    farmerName: "Kalia Parida",
    farmerPhone: "+91 91780 99887",
    cropName: "Bold Groundnut Seeds",
    category: "Oilseeds",
    quantity: 650,
    unit: "kg",
    price: 78,
    district: "Ganjam",
    location: "Aska, Ganjam",
    harvestDate: "2026-07-18",
    organic: false,
    image: CROP_IMAGE_PRESETS[4].url,
    description: "High oil content groundnut suitable for oil extraction and edible snacking.",
    available: true,
    createdAt: "2026-07-19"
  }
];

// LocalStorage Manager Object
const MarketStorage = {
  getCrops: function() {
    const data = localStorage.getItem('odisha_market_crops');
    if (!data) {
      localStorage.setItem('odisha_market_crops', JSON.stringify(INITIAL_CROPS));
      return INITIAL_CROPS;
    }
    return JSON.parse(data);
  },
  saveCrops: function(crops) {
    localStorage.setItem('odisha_market_crops', JSON.stringify(crops));
  },
  getWishlist: function() {
    const data = localStorage.getItem('odisha_market_wishlist');
    return data ? JSON.parse(data) : [];
  },
  saveWishlist: function(list) {
    localStorage.setItem('odisha_market_wishlist', JSON.stringify(list));
  },
  getOrders: function() {
    const data = localStorage.getItem('odisha_market_orders');
    return data ? JSON.parse(data) : [];
  },
  saveOrders: function(orders) {
    localStorage.setItem('odisha_market_orders', JSON.stringify(orders));
  },
  getCurrentUser: function() {
    const user = localStorage.getItem('odisha_market_current_user');
    if (user) return JSON.parse(user);
    // Fallback check on standard site user
    const siteUser = localStorage.getItem('odisha_user');
    if (siteUser) return JSON.parse(siteUser);
    return null;
  },
  setCurrentUser: function(user) {
    localStorage.setItem('odisha_market_current_user', JSON.stringify(user));
  },
  logoutUser: function() {
    localStorage.removeItem('odisha_market_current_user');
  }
};

// Global App State
let currentSelectedDistrict = "All";
let currentCategoryFilter = "All";
let currentSearchQuery = "";
let currentPriceMax = 200;
let currentSort = "newest";
let activeTab = "catalog"; // catalog, wishlist, farmer-dashboard, buyer-orders

// UI Initialization
document.addEventListener('DOMContentLoaded', () => {
  initDistrictChips();
  initImagePresets();
  renderUserStatusBar();
  renderCatalog();
  renderWishlistCount();

  // Price Slider Live Label
  const priceSlider = document.getElementById('priceRangeInput');
  const priceLabel = document.getElementById('priceRangeVal');
  if (priceSlider && priceLabel) {
    priceSlider.addEventListener('input', (e) => {
      currentPriceMax = parseInt(e.target.value);
      priceLabel.innerText = '₹' + currentPriceMax;
      renderCatalog();
    });
  }

  // Search input live search
  const searchInput = document.getElementById('cropSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }

  // Category filter select
  const catSelect = document.getElementById('cropCategorySelect');
  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      currentCategoryFilter = e.target.value;
      renderCatalog();
    });
  }

  // District filter select
  const distSelect = document.getElementById('cropDistrictSelect');
  if (distSelect) {
    distSelect.addEventListener('change', (e) => {
      currentSelectedDistrict = e.target.value;
      highlightDistrictChip(currentSelectedDistrict);
      renderCatalog();
    });
  }

  // Sort select
  const sortSelect = document.getElementById('cropSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }
});

// Populate District Filter Chips (All 30 Districts of Odisha)
function initDistrictChips() {
  const container = document.getElementById('districtChipsContainer');
  if (!container) return;

  const distSelect = document.getElementById('cropDistrictSelect');
  const farmerDistSelect = document.getElementById('farmerCropDistrict');
  const modalDistSelect = document.getElementById('modalRegDistrict');

  let chipsHTML = `<button class="district-chip active" onclick="selectDistrictChip('All', this)">🌾 All Odisha</button>`;
  
  ODISHA_DISTRICTS.forEach(dist => {
    chipsHTML += `<button class="district-chip" onclick="selectDistrictChip('${dist}', this)">📍 ${dist}</button>`;
    if (distSelect) distSelect.innerHTML += `<option value="${dist}">${dist}</option>`;
    if (farmerDistSelect) farmerDistSelect.innerHTML += `<option value="${dist}">${dist}</option>`;
    if (modalDistSelect) modalDistSelect.innerHTML += `<option value="${dist}">${dist}</option>`;
  });

  container.innerHTML = chipsHTML;
}

// Select District Chip Handler
function selectDistrictChip(district, btnEl) {
  currentSelectedDistrict = district;
  document.querySelectorAll('.district-chip').forEach(c => c.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const distSelect = document.getElementById('cropDistrictSelect');
  if (distSelect) distSelect.value = district;

  renderCatalog();
}

function highlightDistrictChip(district) {
  document.querySelectorAll('.district-chip').forEach(chip => {
    if (chip.innerText.includes(district) || (district === 'All' && chip.innerText.includes('All'))) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

// Image Preset Selection in Farmer Modal
function initImagePresets() {
  const container = document.getElementById('imagePresetGrid');
  if (!container) return;

  let html = '';
  CROP_IMAGE_PRESETS.forEach((preset, idx) => {
    html += `
      <div class="preset-img-item ${idx === 0 ? 'selected' : ''}" onclick="selectImagePreset('${preset.url}', this)" title="${preset.label}">
        <img src="${preset.url}" alt="${preset.label}">
      </div>
    `;
  });
  container.innerHTML = html;
}

function selectImagePreset(url, element) {
  document.querySelectorAll('.preset-img-item').forEach(el => el.classList.remove('selected'));
  if (element) element.classList.add('selected');
  const imgUrlInput = document.getElementById('farmerCropImgUrl');
  if (imgUrlInput) imgUrlInput.value = url;
}

// Render User Status & Role Header
function renderUserStatusBar() {
  const container = document.getElementById('userStatusBarContainer');
  if (!container) return;

  const user = MarketStorage.getCurrentUser();
  if (user) {
    const isFarmer = user.role === 'Farmer' || user.role === 'farmer';
    container.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <div class="farmer-avatar bg-success text-white" style="width:38px; height:38px; font-size:1.1rem;">
          <i class="fas ${isFarmer ? 'fa-tractor' : 'fa-shopping-basket'}"></i>
        </div>
        <div>
          <h6 class="fw-bold mb-0">${user.name}</h6>
          <span class="user-badge ${isFarmer ? 'farmer' : 'buyer'}">
            <i class="fas ${isFarmer ? 'fa-seedling' : 'fa-store'} me-1"></i>${user.role} (${user.district || 'Odisha'})
          </span>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        ${isFarmer ? `
          <button class="btn btn-success btn-sm rounded-pill px-3 fw-bold" onclick="openAddCropModal()">
            <i class="fas fa-plus-circle me-1"></i>Post New Crop
          </button>
          <button class="btn btn-outline-success btn-sm rounded-pill px-3" onclick="switchTab('farmer-dashboard')">
            <i class="fas fa-tasks me-1"></i>My Seller Dashboard
          </button>
        ` : `
          <button class="btn btn-outline-primary btn-sm rounded-pill px-3" onclick="switchTab('buyer-orders')">
            <i class="fas fa-box-open me-1"></i>My Orders
          </button>
        `}
        <button class="btn btn-outline-danger btn-sm rounded-pill px-3" onclick="handleLogout()">
          <i class="fas fa-sign-out-alt me-1"></i>Logout
        </button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <i class="fas fa-user-circle fs-3 text-muted me-1"></i>
        <div>
          <h6 class="fw-bold mb-0 text-dark">Welcome to Odisha Farmer Market</h6>
          <p class="text-muted small mb-0">Register as a Farmer to sell crops or Buyer to purchase direct harvest</p>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-outline-success btn-sm rounded-pill px-3 fw-bold" onclick="openAuthModal('farmer')">
          <i class="fas fa-tractor me-1"></i>Farmer Sign In / Register
        </button>
        <button class="btn btn-primary-custom btn-sm rounded-pill px-3 fw-bold" onclick="openAuthModal('buyer')">
          <i class="fas fa-shopping-cart me-1"></i>Buyer Sign In / Register
        </button>
      </div>
    `;
  }
}

// Render Main Marketplace Catalog Cards
function renderCatalog() {
  const grid = document.getElementById('cropCatalogGrid');
  if (!grid) return;

  const crops = MarketStorage.getCrops();
  const wishlist = MarketStorage.getWishlist();

  // Apply filters
  let filtered = crops.filter(c => {
    // District filter
    if (currentSelectedDistrict !== "All" && c.district !== currentSelectedDistrict) return false;
    // Category filter
    if (currentCategoryFilter !== "All" && c.category !== currentCategoryFilter) return false;
    // Max price filter
    if (c.price > currentPriceMax) return false;
    // Search query
    if (currentSearchQuery) {
      const matchName = c.cropName.toLowerCase().includes(currentSearchQuery);
      const matchFarmer = c.farmerName.toLowerCase().includes(currentSearchQuery);
      const matchLoc = c.location.toLowerCase().includes(currentSearchQuery);
      if (!matchName && !matchFarmer && !matchLoc) return false;
    }
    return true;
  });

  // Apply sorting
  if (currentSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "quantity-high") {
    filtered.sort((a, b) => b.quantity - a.quantity);
  } else {
    // Newest
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5 glass-card">
        <i class="fas fa-seedling text-muted mb-3" style="font-size:3.5rem;"></i>
        <h5 class="fw-bold">No Produce Found Matching Filters</h5>
        <p class="text-muted">Try resetting your district search or price slider.</p>
        <button class="btn btn-outline-success rounded-pill px-4" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(crop => {
    const isWishlisted = wishlist.includes(crop.id);

    html += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="crop-card">
          <div class="crop-card-img-wrapper">
            <img src="${crop.image}" class="crop-card-img" alt="${crop.cropName}" onerror="this.src='https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'">
            <span class="crop-badge-district"><i class="fas fa-location-dot me-1 text-warning"></i>${crop.district}</span>
            ${crop.organic ? `<span class="crop-badge-organic"><i class="fas fa-leaf me-1"></i>Organic</span>` : ''}
            <button class="btn-wishlist ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${crop.id}')" title="Save to Wishlist">
              <i class="fas fa-heart"></i>
            </button>
          </div>
          <div class="crop-card-body">
            <div class="crop-category-tag">${crop.category}</div>
            <h5 class="crop-title">${crop.cropName}</h5>
            
            <div class="crop-meta-row">
              <span><i class="fas fa-cubes me-1 text-success"></i><strong>${crop.quantity}</strong> ${crop.unit} available</span>
              <span><i class="fas fa-calendar-alt me-1 text-primary"></i>Harvest: ${crop.harvestDate}</span>
            </div>

            <div class="crop-price-box">
              <div>
                <span class="crop-price">₹${crop.price}</span>
                <span class="crop-unit">/ ${crop.unit}</span>
              </div>
              <span class="badge bg-success-subtle text-success border border-success fw-bold px-2 py-1">Direct Farmer Rate</span>
            </div>

            <div class="farmer-info-strip">
              <div class="farmer-avatar"><i class="fas fa-user"></i></div>
              <div class="text-truncate">
                <strong>${crop.farmerName}</strong> • ${crop.location}
              </div>
            </div>

            <div class="crop-actions">
              <button class="btn btn-outline-success btn-sm rounded-pill fw-bold" onclick="openContactFarmerModal('${crop.id}')">
                <i class="fas fa-phone-alt me-1"></i>Contact
              </button>
              <button class="btn btn-success btn-sm rounded-pill fw-bold text-white" onclick="openBuyModal('${crop.id}')">
                <i class="fas fa-shopping-bag me-1"></i>Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

// Reset Filters
function resetFilters() {
  currentSelectedDistrict = "All";
  currentCategoryFilter = "All";
  currentSearchQuery = "";
  currentPriceMax = 200;
  currentSort = "newest";

  const searchInput = document.getElementById('cropSearchInput');
  const catSelect = document.getElementById('cropCategorySelect');
  const distSelect = document.getElementById('cropDistrictSelect');
  const priceSlider = document.getElementById('priceRangeInput');
  const priceLabel = document.getElementById('priceRangeVal');

  if (searchInput) searchInput.value = '';
  if (catSelect) catSelect.value = 'All';
  if (distSelect) distSelect.value = 'All';
  if (priceSlider) priceSlider.value = 200;
  if (priceLabel) priceLabel.innerText = '₹200';

  selectDistrictChip('All', null);
  renderCatalog();
}

// Wishlist Logic
function toggleWishlist(cropId) {
  let wishlist = MarketStorage.getWishlist();
  if (wishlist.includes(cropId)) {
    wishlist = wishlist.filter(id => id !== cropId);
    showToast('Removed from wishlist', 'info');
  } else {
    wishlist.push(cropId);
    showToast('Added to wishlist ❤️', 'success');
  }
  MarketStorage.saveWishlist(wishlist);
  renderWishlistCount();
  renderCatalog();
  if (activeTab === 'wishlist') renderWishlistGrid();
}

function renderWishlistCount() {
  const badge = document.getElementById('wishlistBadge');
  if (badge) {
    const list = MarketStorage.getWishlist();
    badge.innerText = list.length;
  }
}

function renderWishlistGrid() {
  const grid = document.getElementById('wishlistCatalogGrid');
  if (!grid) return;

  const wishlist = MarketStorage.getWishlist();
  const crops = MarketStorage.getCrops().filter(c => wishlist.includes(c.id));

  if (crops.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5 glass-card">
        <i class="fas fa-heart-broken text-muted mb-3" style="font-size:3.5rem;"></i>
        <h5 class="fw-bold">Your Wishlist is Empty</h5>
        <p class="text-muted">Click the heart icon on any crop card to save items for quick buying later.</p>
        <button class="btn btn-success rounded-pill px-4" onclick="switchTab('catalog')">Explore Farmer Marketplace</button>
      </div>
    `;
    return;
  }

  let html = '';
  crops.forEach(crop => {
    html += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="crop-card">
          <div class="crop-card-img-wrapper">
            <img src="${crop.image}" class="crop-card-img" alt="${crop.cropName}">
            <span class="crop-badge-district"><i class="fas fa-location-dot me-1 text-warning"></i>${crop.district}</span>
            <button class="btn-wishlist active" onclick="toggleWishlist('${crop.id}')">
              <i class="fas fa-heart"></i>
            </button>
          </div>
          <div class="crop-card-body">
            <div class="crop-category-tag">${crop.category}</div>
            <h5 class="crop-title">${crop.cropName}</h5>
            <div class="crop-price-box">
              <span class="crop-price">₹${crop.price}</span> / ${crop.unit}
            </div>
            <div class="crop-actions">
              <button class="btn btn-outline-success btn-sm rounded-pill fw-bold" onclick="openContactFarmerModal('${crop.id}')">Contact</button>
              <button class="btn btn-success btn-sm rounded-pill fw-bold" onclick="openBuyModal('${crop.id}')">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  grid.innerHTML = html;
}

// Tab Switcher
function switchTab(tabName) {
  activeTab = tabName;
  document.querySelectorAll('.market-tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.nav-link-tab').forEach(el => el.classList.remove('active'));

  if (tabName === 'catalog') {
    document.getElementById('tabCatalog').style.display = 'block';
    document.getElementById('tabLinkCatalog').classList.add('active');
    renderCatalog();
  } else if (tabName === 'wishlist') {
    document.getElementById('tabWishlist').style.display = 'block';
    document.getElementById('tabLinkWishlist').classList.add('active');
    renderWishlistGrid();
  } else if (tabName === 'farmer-dashboard') {
    document.getElementById('tabFarmerDashboard').style.display = 'block';
    document.getElementById('tabLinkFarmer').classList.add('active');
    renderFarmerDashboard();
  } else if (tabName === 'buyer-orders') {
    document.getElementById('tabBuyerOrders').style.display = 'block';
    document.getElementById('tabLinkOrders').classList.add('active');
    renderBuyerOrders();
  }
}

// Farmer Dashboard Logic
function renderFarmerDashboard() {
  const container = document.getElementById('farmerProductsContainer');
  if (!container) return;

  const user = MarketStorage.getCurrentUser();
  const crops = MarketStorage.getCrops();

  // Filter farmer crops
  const farmerCrops = user ? crops.filter(c => c.farmerId === user.id || c.farmerName === user.name) : crops.slice(0, 3);

  // Update Farmer stats
  document.getElementById('farmerStatTotal').innerText = farmerCrops.length;
  document.getElementById('farmerStatActive').innerText = farmerCrops.filter(c => c.available).length;
  document.getElementById('farmerStatOrders').innerText = MarketStorage.getOrders().filter(o => o.farmerName === (user ? user.name : '')).length;

  if (farmerCrops.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 glass-card">
        <i class="fas fa-tractor text-muted mb-3" style="font-size:3rem;"></i>
        <h5 class="fw-bold">No Crop Produce Uploaded Yet</h5>
        <p class="text-muted">Start selling your harvest directly to buyers across Odisha with zero commission!</p>
        <button class="btn btn-success rounded-pill px-4" onclick="openAddCropModal()">+ Post Your First Crop</button>
      </div>
    `;
    return;
  }

  let html = `
    <div class="table-responsive glass-card p-3">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>Crop Produce</th>
            <th>District</th>
            <th>Quantity</th>
            <th>Price / Kg</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  `;

  farmerCrops.forEach(crop => {
    html += `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-3">
            <img src="${crop.image}" style="width:48px; height:48px; border-radius:8px; object-fit:cover;">
            <div>
              <strong class="d-block">${crop.cropName}</strong>
              <small class="text-muted">${crop.category} • Harvest: ${crop.harvestDate}</small>
            </div>
          </div>
        </td>
        <td><span class="badge bg-secondary-subtle text-dark">${crop.district}</span></td>
        <td><strong>${crop.quantity}</strong> ${crop.unit}</td>
        <td class="text-success fw-bold">₹${crop.price}</td>
        <td>
          <span class="status-badge ${crop.available ? 'confirmed' : 'pending'}">
            ${crop.available ? 'Available' : 'Sold Out'}
          </span>
        </td>
        <td>
          <button class="btn btn-outline-primary btn-sm me-1" onclick="openEditCropModal('${crop.id}')"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn class-sm btn-outline-danger btn-sm" onclick="deleteCropListing('${crop.id}')"><i class="fas fa-trash"></i> Delete</button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table></div>`;
  container.innerHTML = html;
}

// Add & Edit Crop Listing Handlers
function openAddCropModal() {
  const user = MarketStorage.getCurrentUser();
  if (!user) {
    showToast('Please sign in as a Farmer first', 'warning');
    openAuthModal('farmer');
    return;
  }

  document.getElementById('farmerCropModalTitle').innerText = '🌾 Post New Farm Produce';
  document.getElementById('farmerCropForm').reset();
  document.getElementById('farmerCropId').value = '';
  document.getElementById('farmerCropImgUrl').value = CROP_IMAGE_PRESETS[0].url;
  
  const modal = new bootstrap.Modal(document.getElementById('farmerCropModal'));
  modal.show();
}

function openEditCropModal(cropId) {
  const crops = MarketStorage.getCrops();
  const crop = crops.find(c => c.id === cropId);
  if (!crop) return;

  document.getElementById('farmerCropModalTitle').innerText = '✏️ Edit Produce Details';
  document.getElementById('farmerCropId').value = crop.id;
  document.getElementById('farmerCropName').value = crop.cropName;
  document.getElementById('farmerCropCategory').value = crop.category;
  document.getElementById('farmerCropQuantity').value = crop.quantity;
  document.getElementById('farmerCropPrice').value = crop.price;
  document.getElementById('farmerCropDistrict').value = crop.district;
  document.getElementById('farmerCropHarvestDate').value = crop.harvestDate;
  document.getElementById('farmerCropPhone').value = crop.farmerPhone;
  document.getElementById('farmerCropLocation').value = crop.location;
  document.getElementById('farmerCropDesc').value = crop.description;
  document.getElementById('farmerCropOrganic').checked = crop.organic;
  document.getElementById('farmerCropImgUrl').value = crop.image;

  const modal = new bootstrap.Modal(document.getElementById('farmerCropModal'));
  modal.show();
}

function handleSaveFarmerCrop(e) {
  e.preventDefault();
  const user = MarketStorage.getCurrentUser() || { id: 'farmer-temp', name: 'Odisha Farmer', role: 'Farmer' };
  
  const cropId = document.getElementById('farmerCropId').value;
  const crops = MarketStorage.getCrops();

  const newCropData = {
    id: cropId || 'crop-' + Date.now(),
    farmerId: user.id || 'farmer-' + Date.now(),
    farmerName: user.name || 'Odisha Farmer',
    farmerPhone: document.getElementById('farmerCropPhone').value,
    cropName: document.getElementById('farmerCropName').value,
    category: document.getElementById('farmerCropCategory').value,
    quantity: parseInt(document.getElementById('farmerCropQuantity').value),
    unit: 'kg',
    price: parseFloat(document.getElementById('farmerCropPrice').value),
    district: document.getElementById('farmerCropDistrict').value,
    location: document.getElementById('farmerCropLocation').value,
    harvestDate: document.getElementById('farmerCropHarvestDate').value,
    organic: document.getElementById('farmerCropOrganic').checked,
    image: document.getElementById('farmerCropImgUrl').value || CROP_IMAGE_PRESETS[0].url,
    description: document.getElementById('farmerCropDesc').value,
    available: true,
    createdAt: new Date().toISOString().split('T')[0]
  };

  if (cropId) {
    const idx = crops.findIndex(c => c.id === cropId);
    if (idx !== -1) crops[idx] = newCropData;
    showToast('Crop listing updated successfully!', 'success');
  } else {
    crops.unshift(newCropData);
    showToast('Crop listed on Farmer Marketplace!', 'success');
  }

  MarketStorage.saveCrops(crops);

  const modalEl = document.getElementById('farmerCropModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  renderCatalog();
  renderFarmerDashboard();
}

function deleteCropListing(cropId) {
  if (!confirm('Are you sure you want to delete this crop listing?')) return;
  let crops = MarketStorage.getCrops();
  crops = crops.filter(c => c.id !== cropId);
  MarketStorage.saveCrops(crops);
  showToast('Crop listing deleted', 'info');
  renderFarmerDashboard();
  renderCatalog();
}

// Contact Farmer Modal
function openContactFarmerModal(cropId) {
  const crop = MarketStorage.getCrops().find(c => c.id === cropId);
  if (!crop) return;

  const content = document.getElementById('contactFarmerModalBody');
  content.innerHTML = `
    <div class="text-center mb-3">
      <div class="farmer-avatar bg-success text-white mx-auto mb-2" style="width:56px; height:56px; font-size:1.5rem;">
        <i class="fas fa-user-tie"></i>
      </div>
      <h5 class="fw-bold mb-1">${crop.farmerName}</h5>
      <span class="badge bg-success-subtle text-success border border-success fw-bold px-3 py-1">Verified Odisha Farmer</span>
    </div>

    <div class="bg-light p-3 rounded-3 mb-3">
      <div class="d-flex justify-content-between mb-2">
        <span class="text-muted">Crop Listing:</span>
        <strong>${crop.cropName}</strong>
      </div>
      <div class="d-flex justify-content-between mb-2">
        <span class="text-muted">Location / District:</span>
        <strong>${crop.location} (${crop.district})</strong>
      </div>
      <div class="d-flex justify-content-between">
        <span class="text-muted">Price & Stock:</span>
        <strong class="text-success">₹${crop.price}/kg (${crop.quantity} kg avail.)</strong>
      </div>
    </div>

    <div class="d-grid gap-2">
      <a href="tel:${crop.farmerPhone.replace(/\s+/g, '')}" class="btn btn-success rounded-pill fw-bold py-2">
        <i class="fas fa-phone-alt me-2"></i>Call Farmer (${crop.farmerPhone})
      </a>
      <a href="https://wa.me/${crop.farmerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(crop.farmerName)},%20I%20saw%20your%20listing%20for%20${encodeURIComponent(crop.cropName)}%20on%20Odisha%20Crop%20Marketplace." target="_blank" class="btn btn-outline-success rounded-pill fw-bold py-2">
        <i class="fab fa-whatsapp me-2"></i>Chat on WhatsApp
      </a>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById('contactFarmerModal'));
  modal.show();
}

// Buy Modal & Checkout Flow
let activeCheckoutCrop = null;

function openBuyModal(cropId) {
  const crop = MarketStorage.getCrops().find(c => c.id === cropId);
  if (!crop) return;

  activeCheckoutCrop = crop;

  document.getElementById('checkoutCropTitle').innerText = crop.cropName;
  document.getElementById('checkoutFarmerName').innerText = crop.farmerName + ' (' + crop.district + ')';
  document.getElementById('checkoutPricePerKg').innerText = '₹' + crop.price;
  document.getElementById('checkoutMaxQty').innerText = crop.quantity;

  const qtyInput = document.getElementById('checkoutQtyInput');
  qtyInput.value = 50;
  qtyInput.max = crop.quantity;

  updateCheckoutTotal();

  const user = MarketStorage.getCurrentUser();
  if (user) {
    document.getElementById('checkoutBuyerName').value = user.name || '';
    document.getElementById('checkoutBuyerPhone').value = user.phone || '';
    document.getElementById('checkoutBuyerDistrict').value = user.district || crop.district;
  }

  const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
  modal.show();
}

function updateCheckoutTotal() {
  if (!activeCheckoutCrop) return;
  const qty = parseInt(document.getElementById('checkoutQtyInput').value) || 0;
  const total = qty * activeCheckoutCrop.price;
  document.getElementById('checkoutTotalAmount').innerText = '₹' + total.toLocaleString();
}

function handleConfirmOrder(e) {
  e.preventDefault();
  if (!activeCheckoutCrop) return;

  const qty = parseInt(document.getElementById('checkoutQtyInput').value);
  const buyerName = document.getElementById('checkoutBuyerName').value;
  const buyerPhone = document.getElementById('checkoutBuyerPhone').value;
  const buyerDistrict = document.getElementById('checkoutBuyerDistrict').value;
  const buyerAddress = document.getElementById('checkoutBuyerAddress').value;
  const payMethod = document.getElementById('checkoutPaymentMethod').value;

  const total = qty * activeCheckoutCrop.price;
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  const newOrder = {
    orderId,
    cropId: activeCheckoutCrop.id,
    cropName: activeCheckoutCrop.cropName,
    farmerName: activeCheckoutCrop.farmerName,
    farmerPhone: activeCheckoutCrop.farmerPhone,
    buyerName,
    buyerPhone,
    buyerDistrict,
    buyerAddress,
    quantity: qty,
    unit: 'kg',
    pricePerKg: activeCheckoutCrop.price,
    totalPrice: total,
    paymentMethod: payMethod,
    status: 'Confirmed',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  // Save order
  const orders = MarketStorage.getOrders();
  orders.unshift(newOrder);
  MarketStorage.saveOrders(orders);

  // Hide Checkout Modal
  const checkoutModalEl = document.getElementById('checkoutModal');
  const checkoutModal = bootstrap.Modal.getInstance(checkoutModalEl);
  if (checkoutModal) checkoutModal.hide();

  // Show Order Receipt Modal
  renderOrderReceipt(newOrder);
}

function renderOrderReceipt(order) {
  const body = document.getElementById('orderReceiptModalBody');
  body.innerHTML = `
    <div class="text-center mb-4">
      <div class="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style="width:60px; height:60px;">
        <i class="fas fa-check fs-2"></i>
      </div>
      <h4 class="fw-bold text-success">Order Confirmed!</h4>
      <p class="text-muted small">Order ID: <strong>${order.orderId}</strong> • Date: ${order.date}</p>
    </div>

    <div class="glass-card p-3 mb-3">
      <h6 class="fw-bold border-bottom pb-2 mb-2"><i class="fas fa-receipt me-2 text-success"></i>Order Summary</h6>
      <div class="d-flex justify-content-between py-1">
        <span>Produce Item:</span>
        <strong>${order.cropName}</strong>
      </div>
      <div class="d-flex justify-content-between py-1">
        <span>Farmer:</span>
        <strong>${order.farmerName} (${order.farmerPhone})</strong>
      </div>
      <div class="d-flex justify-content-between py-1">
        <span>Quantity:</span>
        <strong>${order.quantity} kg @ ₹${order.pricePerKg}/kg</strong>
      </div>
      <div class="d-flex justify-content-between py-1 border-top pt-2 mt-1">
        <span class="fs-5 fw-bold">Total Paid / COD:</span>
        <span class="fs-5 fw-bold text-success">₹${order.totalPrice.toLocaleString()}</span>
      </div>
    </div>

    <div class="bg-light p-3 rounded-3 mb-3">
      <h6 class="fw-bold mb-1"><i class="fas fa-truck me-2 text-primary"></i>Delivery Destination</h6>
      <p class="mb-0 small">${order.buyerName}, ${order.buyerAddress}, ${order.buyerDistrict}, Odisha (Tel: ${order.buyerPhone})</p>
    </div>
  `;

  const receiptModal = new bootstrap.Modal(document.getElementById('orderReceiptModal'));
  receiptModal.show();
}

// Buyer Orders List
function renderBuyerOrders() {
  const container = document.getElementById('buyerOrdersContainer');
  if (!container) return;

  const orders = MarketStorage.getOrders();
  if (orders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 glass-card">
        <i class="fas fa-box-open text-muted mb-3" style="font-size:3.5rem;"></i>
        <h5 class="fw-bold">No Orders Placed Yet</h5>
        <p class="text-muted">Browse Odisha farmer produce and buy direct fresh harvest!</p>
        <button class="btn btn-success rounded-pill px-4" onclick="switchTab('catalog')">Start Shopping</button>
      </div>
    `;
    return;
  }

  let html = `
    <div class="table-responsive glass-card p-3">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>Order ID</th>
            <th>Crop Produce</th>
            <th>Farmer</th>
            <th>Qty & Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  `;

  orders.forEach(ord => {
    html += `
      <tr>
        <td><strong>${ord.orderId}</strong><br><small class="text-muted">${ord.date}</small></td>
        <td><strong>${ord.cropName}</strong></td>
        <td>${ord.farmerName}<br><small class="text-muted">${ord.farmerPhone}</small></td>
        <td><strong>${ord.quantity} kg</strong><br><span class="text-success fw-bold">₹${ord.totalPrice}</span></td>
        <td><span class="status-badge confirmed"><i class="fas fa-check-circle me-1"></i>${ord.status}</span></td>
        <td>
          <button class="btn btn-outline-success btn-sm rounded-pill" onclick='renderOrderReceipt(${JSON.stringify(ord)})'>Receipt</button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table></div>`;
  container.innerHTML = html;
}

// Auth Handlers (Farmer & Buyer Sign in/up)
function openAuthModal(role) {
  document.getElementById('modalRegRole').value = role === 'farmer' ? 'Farmer' : 'Buyer';
  const modal = new bootstrap.Modal(document.getElementById('authModal'));
  modal.show();
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modalRegName').value;
  const phone = document.getElementById('modalRegPhone').value;
  const role = document.getElementById('modalRegRole').value;
  const district = document.getElementById('modalRegDistrict').value;

  const newUser = {
    id: 'user-' + Date.now(),
    name,
    phone,
    role,
    district
  };

  MarketStorage.setCurrentUser(newUser);
  showToast(`Welcome, ${name}! Signed in as ${role}`, 'success');

  const modalEl = document.getElementById('authModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  renderUserStatusBar();
}

function handleLogout() {
  MarketStorage.logoutUser();
  showToast('Logged out of Marketplace', 'info');
  renderUserStatusBar();
}

// Simple Toast Notification Helper
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }

  const bgClass = type === 'success' ? 'bg-success' : type === 'warning' ? 'bg-warning text-dark' : 'bg-dark';
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white ${bgClass} border-0 show mb-2`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body font-weight-bold">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button>
    </div>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}
