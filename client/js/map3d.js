/* Realistic 3D WebGL Map of Odisha using Three.js & Raycasting */

const odisha3DDistricts = {
  Sundargarh: { pos: [-2.5, 0.8, -3.2], color: 0x10b981, crops: ['Paddy', 'Maize', 'Mustard', 'Vegetables', 'Pulses'], region: 'Northern Hills' },
  Jharsuguda: { pos: [-3.8, 0.6, -2.4], color: 0x0ea5e9, crops: ['Paddy', 'Maize', 'Vegetables', 'Groundnut'], region: 'North-West' },
  Deogarh: { pos: [-1.8, 0.7, -2.0], color: 0xa855f7, crops: ['Paddy', 'Maize', 'Pulses', 'Oilseeds'], region: 'North-Central' },
  Mayurbhanj: { pos: [2.2, 0.9, -2.8], color: 0xec4899, crops: ['Paddy', 'Maize', 'Mustard', 'Vegetables', 'Oilseeds'], region: 'North-East Similipal' },
  Kendujhar: { pos: [0.2, 0.8, -2.2], color: 0xeab308, crops: ['Paddy', 'Maize', 'Vegetables', 'Pulses'], region: 'North-Central Plateau' },
  Balasore: { pos: [3.2, 0.3, -1.5], color: 0xf97316, crops: ['Paddy', 'Mustard', 'Vegetables', 'Groundnut', 'Betel Vine'], region: 'Coastal North' },
  Bhadrak: { pos: [2.8, 0.2, -0.4], color: 0x10b981, crops: ['Paddy', 'Vegetables', 'Mustard', 'Black Gram'], region: 'Coastal Plain' },
  Sambalpur: { pos: [-2.2, 0.6, -1.2], color: 0xf59e0b, crops: ['Paddy (Hirakud Command)', 'Sugarcane', 'Vegetables', 'Groundnut'], region: 'West-Central' },
  Bargarh: { pos: [-4.2, 0.5, -1.0], color: 0x22c55e, crops: ['Paddy (Rabi & Kharif)', 'Sugarcane', 'Groundnut', 'Pulses'], region: 'Western Rice Bowl' },
  Subarnapur: { pos: [-2.8, 0.4, -0.2], color: 0x8b5cf6, crops: ['Paddy', 'Handloom Cotton', 'Vegetables', 'Pulses'], region: 'Central West' },
  Boudh: { pos: [-1.4, 0.5, 0.2], color: 0x6366f1, crops: ['Paddy', 'Pulses', 'Vegetables', 'Groundnut'], region: 'Central Valley' },
  Bolangir: { pos: [-4.0, 0.5, 0.4], color: 0x10b981, crops: ['Cotton', 'Paddy', 'Maize', 'Groundnut', 'Sunhemp'], region: 'Western Belt' },
  Nuapada: { pos: [-5.2, 0.6, 0.6], color: 0xf43f5e, crops: ['Paddy', 'Cotton', 'Maize', 'Pulses'], region: 'Far West' },
  Angul: { pos: [-0.6, 0.5, -0.8], color: 0xeab308, crops: ['Paddy', 'Maize', 'Vegetables', 'Mustard', 'Sesame'], region: 'Central Industrial' },
  Dhenkanal: { pos: [0.8, 0.5, -0.6], color: 0xec4899, crops: ['Paddy', 'Sugarcane', 'Vegetables', 'Mango', 'Cashew'], region: 'Central' },
  Jajpur: { pos: [2.0, 0.3, 0.2], color: 0x8b5cf6, crops: ['Paddy', 'Vegetables', 'Groundnut', 'Jute'], region: 'Central East' },
  Kendrapara: { pos: [3.4, 0.1, 0.4], color: 0x0284c7, crops: ['Paddy', 'Jute', 'Vegetables', 'Mustard', 'Pulses'], region: 'Coastal Delta' },
  Cuttack: { lat: 20.46, lng: 85.88, pos: [1.2, 0.3, 0.4], color: 0x10b981, crops: ['Kharif Paddy', 'Vegetables', 'Green Gram', 'Mustard'], region: 'Central Delta' },
  Jagatsinghpur: { pos: [2.6, 0.1, 1.0], color: 0x0284c7, crops: ['Paddy', 'Vegetables', 'Betel Leaf', 'Mustard', 'Sugarcane'], region: 'Coastal' },
  Puri: { pos: [1.6, 0.1, 1.8], color: 0xf97316, crops: ['Coastal Paddy', 'Vegetables', 'Coconut', 'Betel Leaf', 'Groundnut'], region: 'Coastal South' },
  Khordha: { pos: [0.4, 0.3, 1.2], color: 0xeab308, crops: ['Paddy', 'Vegetables', 'Floriculture', 'Sugarcane'], region: 'Central Capital Zone' },
  Nayagarh: { pos: [-0.8, 0.5, 1.0], color: 0x22c55e, crops: ['Green Gram', 'Sugarcane', 'Paddy', 'Vegetables'], region: 'Central South' },
  Kandhamal: { pos: [-1.8, 1.2, 1.2], color: 0xd97706, crops: ['Organic Turmeric', 'Maize', 'Millet (Ragi)', 'Paddy', 'Ginger'], region: 'Eastern Ghats Highlands' },
  Kalahandi: { pos: [-3.8, 1.0, 1.6], color: 0xf59e0b, crops: ['Cotton', 'Maize', 'Paddy', 'Pulses', 'Oilseeds'], region: 'South-West Plateau' },
  Rayagada: { pos: [-2.2, 1.1, 2.6], color: 0xa855f7, crops: ['Cotton', 'Millet', 'Maize', 'Paddy', 'Cashew'], region: 'Southern Hills' },
  Gajapati: { pos: [-0.6, 1.1, 3.0], color: 0xec4899, crops: ['Paddy', 'Maize', 'Cashew', 'Spices'], region: 'Southern Tribal Belt' },
  Ganjam: { pos: [0.2, 0.4, 2.8], color: 0x10b981, crops: ['Groundnut', 'Paddy', 'Maize', 'Cashew', 'Sugarcane'], region: 'South Coast' },
  Nabarangpur: { pos: [-4.6, 0.9, 2.4], color: 0xf97316, crops: ['Maize (Hybrid)', 'Paddy', 'Sugarcane', 'Vegetables'], region: 'South-West High Altitude' },
  Koraput: { pos: [-3.6, 1.3, 3.4], color: 0x84cc16, crops: ['Highland Coffee', 'Millet (Ragi)', 'Paddy', 'Ginger', 'Pineapple'], region: 'Koraput Coffee Plateau' },
  Malkangiri: { pos: [-4.8, 0.8, 4.4], color: 0xf43f5e, crops: ['Millet (Ragi)', 'Paddy', 'Maize', 'Sesame', 'Tapioca'], region: 'Southern Tip Valley' }
};

let scene, camera, renderer, controls, raycaster, mouse;
let district3DMeshes = [];
let active3DDistrict = 'Cuttack';
let isAutoRotate = true;

function initRealistic3DOdishaMap() {
  const container = document.getElementById('odisha3DMapContainer');
  if (!container || typeof THREE === 'undefined') return;

  container.innerHTML = '';

  // 1. Scene Setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a); // Sleek dark space/sky background
  scene.fog = new THREE.FogExp2(0x0f172a, 0.035);

  // 2. Camera Setup
  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 14, 12);
  camera.lookAt(0, 0, 0);

  // 3. WebGL Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // 4. Orbit Controls
  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1; // Don't go below ground level
    controls.minDistance = 6;
    controls.maxDistance = 25;
  }

  // 5. Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xfffaed, 1.2);
  sunLight.position.set(10, 20, 10);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  scene.add(sunLight);

  const pointLight = new THREE.PointLight(0x38bdf8, 1, 20);
  pointLight.position.set(0, 5, 0);
  scene.add(pointLight);

  // 6. Build 3D Topographic Terrain Mesh of Odisha
  create3DOdishaTerrain();

  // 7. Add 3D Bay of Bengal Animated Ocean Water
  create3DBayOfBengalWater();

  // 8. Add 3D District Glowing Pins & Nodes
  create3DDistrictPins();

  // 9. Raycasting for Click Detection
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  renderer.domElement.addEventListener('pointerdown', on3DMapClick);

  // 10. Animation Loop
  animate3DMap();

  // Window Resize Listener
  window.addEventListener('resize', onWindowResize);

  selectDistrictOn3DMap('Cuttack');
}

// Build 3D Extruded Topographic Terrain of Odisha
function create3DOdishaTerrain() {
  const terrainGeo = new THREE.PlaneGeometry(14, 12, 64, 64);
  terrainGeo.rotateX(-Math.PI / 2);

  const pos = terrainGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);

    // Create realistic Eastern Ghats mountain elevation formula
    let distFromCenter = Math.sqrt(x * x + z * z);
    let elevation = Math.sin(x * 0.8) * Math.cos(z * 0.8) * 0.6;

    // Eastern Ghats highlands (West & South high altitude)
    if (x < 0 && z > -1) {
      elevation += 0.8 + Math.sin(x * 2) * 0.3;
    }
    // Coastal Plains (East low flat)
    if (x > 2 && z > 0) {
      elevation = 0.05;
    }

    pos.setY(i, Math.max(0, elevation));
  }
  terrainGeo.computeVertexNormals();

  // Realistic Green Agriculture & Mountain Terrain Material
  const terrainMat = new THREE.MeshStandardMaterial({
    color: 0x15803d,
    roughness: 0.8,
    metalness: 0.1,
    flatShading: true
  });

  const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
  terrainMesh.receiveShadow = true;
  scene.add(terrainMesh);

  // Grid Helper Base Plane
  const gridHelper = new THREE.GridHelper(24, 24, 0x0d9488, 0x1e293b);
  gridHelper.position.y = -0.05;
  scene.add(gridHelper);
}

// Create 3D Animated Ocean Water for Bay of Bengal
function create3DBayOfBengalWater() {
  const waterGeo = new THREE.PlaneGeometry(14, 12);
  waterGeo.rotateX(-Math.PI / 2);

  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.85
  });

  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.position.set(4, 0.02, 1);
  scene.add(waterMesh);
}

// Create 3D Glowing District Pins & Text Badges
function create3DDistrictPins() {
  district3DMeshes = [];

  Object.keys(odisha3DDistricts).forEach(distName => {
    const data = odisha3DDistricts[distName];
    const [x, y, z] = data.pos;

    const pinGroup = new THREE.Group();
    pinGroup.position.set(x, y + 0.3, z);
    pinGroup.name = distName;

    // 3D Glowing Sphere Node
    const sphereGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: data.color,
      emissive: data.color,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.7
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.castShadow = true;
    sphereMesh.name = distName;
    pinGroup.add(sphereMesh);

    // 3D Stem Cylinder
    const stemGeo = new THREE.CylinderGeometry(0.04, 0.04, y, 8);
    const stemMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.position.y = -y / 2;
    pinGroup.add(stemMesh);

    scene.add(pinGroup);
    district3DMeshes.push(sphereMesh);
  });
}

// Render Loop
function animate3DMap() {
  requestAnimationFrame(animate3DMap);

  if (isAutoRotate && scene) {
    scene.rotation.y += 0.002;
  }

  if (controls) controls.update();
  renderer.render(scene, camera);
}

// Raycasting Click Handler
function on3DMapClick(event) {
  const container = document.getElementById('odisha3DMapContainer');
  if (!container) return;

  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(district3DMeshes);

  if (intersects.length > 0) {
    const clickedDist = intersects[0].object.name;
    if (clickedDist) {
      selectDistrictOn3DMap(clickedDist);
    }
  }
}

// Select District in 3D & Update Smart Insights Card
async function selectDistrictOn3DMap(distName) {
  active3DDistrict = distName;

  // Pulse 3D mesh
  district3DMeshes.forEach(mesh => {
    if (mesh.name === distName) {
      mesh.scale.set(1.6, 1.6, 1.6);
      mesh.material.emissiveIntensity = 1.2;
    } else {
      mesh.scale.set(1, 1, 1);
      mesh.material.emissiveIntensity = 0.4;
    }
  });

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
      <p class="mt-2 text-muted small">Loading 3D WebGL data for ${distName}...</p>
    </div>
  `;

  try {
    const weatherRes = await fetch(`/api/weather/${encodeURIComponent(distName)}`);
    const weatherData = await weatherRes.json();

    const distInfo = odisha3DDistricts[distName] || { crops: ['Paddy', 'Vegetables', 'Maize', 'Mustard'], region: 'Odisha' };
    const w = weatherData.data || { temperature: 32, condition: 'Partly Cloudy', humidity: 75, rainfall: 25, icon: 'fa-cloud-sun' };

    cardContainer.innerHTML = `
      <div class="glass-card p-4 border-start border-5 border-success h-100 shadow-lg">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 mb-1 fw-bold">
              <i class="fas fa-cube me-1"></i>3D Topo: ${distInfo.region}
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
            <strong>Kharif / Rabi Season:</strong> Seed treatment with Carbendazim (2g/kg). High elevation & soil moisture ideal for ${distName}.
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
    cardContainer.innerHTML = `<div class="alert alert-danger">Error loading 3D map details</div>`;
  }
}

// Toggle Auto Rotate
function toggle3DRotate() {
  isAutoRotate = !isAutoRotate;
  const btn = document.getElementById('toggle3DRotateBtn');
  if (btn) {
    btn.className = isAutoRotate ? 'btn btn-sm btn-success rounded-pill px-3' : 'btn btn-sm btn-outline-secondary rounded-pill px-3';
    btn.innerHTML = isAutoRotate ? '<i class="fas fa-pause me-1"></i>Pause 3D Rotate' : '<i class="fas fa-play me-1"></i>3D Auto-Rotate';
  }
}

// Reset 3D Camera
function reset3DCamera() {
  if (camera && controls) {
    camera.position.set(0, 14, 12);
    controls.target.set(0, 0, 0);
    controls.update();
  }
}

function onWindowResize() {
  const container = document.getElementById('odisha3DMapContainer');
  if (!container || !renderer || !camera) return;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('odisha3DMapContainer')) {
    initRealistic3DOdishaMap();
  }
});
