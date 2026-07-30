/* Auth Script for Odisha Crop Calendar */

function getAuthToken() {
  return localStorage.getItem('odisha_token');
}

function getUser() {
  const user = localStorage.getItem('odisha_user');
  return user ? JSON.parse(user) : null;
}

function setAuth(token, user) {
  localStorage.setItem('odisha_token', token);
  localStorage.setItem('odisha_user', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('odisha_token');
  localStorage.removeItem('odisha_user');
  showToast('Logged out successfully', 'info');
  setTimeout(() => {
    window.location.href = '/login.html';
  }, 800);
}

function updateNavAuthUI() {
  const user = getUser();
  const authNav = document.getElementById('authNavItems');
  if (!authNav) return;

  if (user) {
    authNav.innerHTML = `
      <li class="nav-item me-2">
        <span class="nav-link text-primary font-weight-bold">
          <i class="fas fa-user-circle me-1"></i>${user.name} (${user.role})
        </span>
      </li>
      <li class="nav-item">
        <button onclick="logout()" class="btn btn-outline-danger btn-sm rounded-pill px-3">
          <i class="fas fa-sign-out-alt me-1"></i>Logout
        </button>
      </li>
    `;
    if (user.role === 'Admin' || user.role === 'Agriculture Officer') {
      const adminNavItem = document.getElementById('adminNavItem');
      if (adminNavItem) adminNavItem.style.display = 'block';
    }
  } else {
    authNav.innerHTML = `
      <li class="nav-item me-1">
        <a class="nav-link" href="/login.html"><i class="fas fa-sign-in-alt me-1"></i>Login</a>
      </li>
      <li class="nav-item">
        <a class="btn btn-primary-custom btn-sm rounded-pill px-3 text-white" href="/register.html">
          <i class="fas fa-user-plus me-1"></i>Register
        </a>
      </li>
    `;
  }
}

// Login Handler
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      setAuth(data.token, data.user);
      showToast('Welcome back, ' + data.user.name + '!', 'success');
      setTimeout(() => {
        if (data.user.role === 'Admin' || data.user.role === 'Agriculture Officer') {
          window.location.href = '/admin.html';
        } else {
          window.location.href = '/dashboard.html';
        }
      }, 1000);
    } else {
      showToast(data.message || 'Login failed', 'error');
    }
  } catch (err) {
    showToast('Server connection error', 'error');
  }
}

// Register Handler
async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const role = document.getElementById('regRole').value;
  const district = document.getElementById('regDistrict').value;
  const phone = document.getElementById('regPhone').value;

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, district, phone })
    });
    const data = await res.json();
    if (data.success) {
      setAuth(data.token, data.user);
      showToast('Registration successful! Logging in...', 'success');
      setTimeout(() => {
        window.location.href = '/dashboard.html';
      }, 1000);
    } else {
      showToast(data.message || 'Registration failed', 'error');
    }
  } catch (err) {
    showToast('Server connection error', 'error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateNavAuthUI();
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const regForm = document.getElementById('registerForm');
  if (regForm) regForm.addEventListener('submit', handleRegister);
});
