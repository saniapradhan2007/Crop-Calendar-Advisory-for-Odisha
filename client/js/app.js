/* Global Odisha Crop Calendar Application Script */

const API_BASE = '/api';

// Language Dictionary (English & Odia)
const i18nDict = {
  en: {
    appTitle: "Odisha Crop Calendar & Advisory",
    home: "Home",
    cropCalendar: "Crop Calendar",
    advisory: "Smart Advisory",
    weather: "Weather",
    marketPrices: "Market Prices",
    aiAssistant: "AI Assistant",
    dashboard: "Dashboard",
    admin: "Admin",
    login: "Login",
    register: "Register",
    logout: "Logout",
    heroHeading: "Smart Agriculture for Every Odisha Farmer",
    heroSubheading: "District-wise crop scheduling, weather alerts, fertilizer calculators, pest diagnostics & AI farming assistance across all 30 districts of Odisha.",
    selectDistrict: "Select District",
    selectSeason: "Select Season",
    selectCrop: "Select Crop",
    viewSchedule: "View Schedule",
    downloadPDF: "Download PDF"
  },
  or: {
    appTitle: "ଓଡ଼ିଶା ଫସଲ କ୍ୟାଲେଣ୍ଡର ଓ କୃଷି ପରାମର୍ଶ",
    home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
    cropCalendar: "ଫସଲ କ୍ୟାଲେଣ୍ଡର",
    advisory: "କୃଷି ପରାମର୍ଶ",
    weather: "ପାଣିପାଗ",
    marketPrices: "ମଣ୍ଡି ଦର",
    aiAssistant: "AI ସହାୟକ",
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    admin: "ଅଫିସର ପ୍ୟାନେଲ",
    login: "ଲଗଇନ୍",
    register: "ପଞ୍ଜୀକରଣ",
    logout: "ଲଗଆଉଟ୍",
    heroHeading: "ଓଡ଼ିଶାର ପ୍ରତ୍ୟେକ ଚାଷୀଙ୍କ ପାଇଁ ଉନ୍ନତ କୃଷି ସେବା",
    heroSubheading: "୩୦ଟି ଜିଲ୍ଲାର ଫସଲ ସୂଚୀ, ପାଣିପାଗ ସୂଚନା, ଖତ ସାର ପରିମାଣ, ରୋଗ ପୋକ ନିୟନ୍ତ୍ରଣ ଓ AI କୃଷି ପରାମର୍ଶ।",
    selectDistrict: "ଜିଲ୍ଲା ବାଛନ୍ତୁ",
    selectSeason: "ఋతు ବାଛନ୍ତୁ",
    selectCrop: "ଫସଲ ବାଛନ୍ତୁ",
    viewSchedule: "ସୂଚୀ ଦେଖନ୍ତୁ",
    downloadPDF: "PDF ଡାଉନଲୋଡ୍"
  }
};

let currentLang = localStorage.getItem('odisha_lang') || 'en';

// Apply Theme
function initTheme() {
  const theme = localStorage.getItem('odisha_theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('odisha_theme', next);
  initTheme();
}

// Apply Language Translation
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('odisha_lang', lang);
  const dict = i18nDict[lang] || i18nDict.en;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.textContent = lang === 'en' ? 'ଓଡ଼ିଆ' : 'English';
  }
}

function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'or' : 'en');
}

// Toast Alert System
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }

  const bgClass = type === 'success' ? 'bg-success text-white' : type === 'error' ? 'bg-danger text-white' : 'bg-primary text-white';
  const toastId = 'toast_' + Date.now();
  
  const toastHTML = `
    <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 show mb-2 shadow" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body font-weight-bold">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="document.getElementById('${toastId}').remove()"></button>
      </div>
    </div>
  `;
  
  toastContainer.insertAdjacentHTML('beforeend', toastHTML);
  setTimeout(() => {
    const el = document.getElementById(toastId);
    if (el) el.remove();
  }, 4000);
}

// Text-to-Speech Helper
function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[*_#]/g, ''));
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    showToast('🔊 Speaking response...', 'info');
  } else {
    showToast('Speech synthesis not supported in this browser.', 'error');
  }
}

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setLanguage(currentLang);
});
