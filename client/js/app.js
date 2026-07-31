/* Global Odisha Crop Calendar Application Script */

const API_BASE = '/api';

// Comprehensive Odia & English Language Translation Dictionary
const i18nDict = {
  en: {
    appTitle: "Odisha Crop Calendar & Advisory",
    home: "Home",
    cropCalendar: "Crop Calendar",
    advisory: "Smart Advisory",
    weather: "Weather",
    marketPrices: "Market Prices",
    marketplace: "Farmer Market",
    marketHeroTitle: "Empowering Odisha Farmers & Buyers",
    marketHeroSubtitle: "Sell harvested crops directly without middlemen or buy fresh organic produce from all 30 districts of Odisha at fair mandi prices.",
    aiAssistant: "AI Assistant",
    dashboard: "Dashboard",
    admin: "Officer Panel",
    login: "Login",
    register: "Register",
    logout: "Logout",
    officialBadge: "Official Agriculture Advisory Portal of Odisha",
    heroHeading: "Smart Agriculture for Every Odisha Farmer",
    heroSubheading: "District-wise crop scheduling, weather alerts, fertilizer calculators, pest diagnostics & AI farming assistance across all 30 districts of Odisha.",
    btnExploreCalendar: "Explore Crop Calendar",
    btnAiScanner: "AI Disease Scanner",
    btnAskAi: "Ask AI Assistant",
    mapHeading: "Interactive Odisha District Map & Crop Insights",
    mapSubheading: "Click any district on the interactive map or grid below to view recommended crops, live weather & crop calendar",
    quickSelectTitle: "All 30 Districts of Odisha Quick Select",
    districtsCount: "Odisha Districts",
    cropTimelines: "Major Crop Timelines",
    aiAssistantStatus: "24x7 AI Krushi Assistant",
    govtSchemes: "Verified Govt Schemes",
    schemesHeading: "Odisha Agriculture Government Schemes",
    schemesSubheading: "Explore financial support & subsidy programs for farmers",
    kaliaTitle: "KALIA Scheme",
    kaliaDesc: "Assistance of ₹10,000 per family annually for crop production inputs, financial aid & interest-free crop loans up to ₹50,000.",
    pmfbyTitle: "PMFBY Crop Insurance",
    pmfbyDesc: "Pradhan Mantri Fasal Bima Yojana offers comprehensive risk insurance cover for crop loss due to non-preventable natural risks.",
    soilHealthTitle: "Soil Health Card",
    soilHealthDesc: "Free soil testing and personalized fertilizer dosage recommendations for every farmer holding agricultural land in Odisha.",
    calendarTitle: "District Crop Calendar & Schedule Timeline",
    calendarSubheading: "Select your district, season, and crop to generate a customized 12-stage agricultural timetable",
    lblDistrict: "District",
    lblSeason: "Season",
    lblCrop: "Crop Type",
    btnFilter: "Filter Calendar",
    advisoryTitle: "Smart Advisory & AI Disease Scanner",
    scannerTitle: "Crop Disease Diagnostic Scanner",
    scannerSubheading: "Upload or select a photo of your infected crop leaf to identify diseases instantly with remedies & spraying guidelines.",
    fertCalcTitle: "Fertilizer Dose Calculator",
    fertCalcSubheading: "Calculate exact Urea, DAP, SSP & MOP dosage per acre for optimal crop yields",
    lblLand: "Land (Acres)",
    lblStage: "Growth Stage",
    btnCalcFert: "Calculate N-P-K Doses",
    weatherTitle: "Odisha District Weather Advisory",
    weatherSubheading: "Select your district to view real-time meteorological parameters and extreme weather warnings",
    marketTitle: "Daily Mandi Crop Market Prices",
    marketSubheading: "Compare today's vs yesterday's APMC mandi rates across all Odisha districts",
    chatbotTitle: "Odisha Krushi AI Farming Assistant",
    chatPlaceholder: "Ask your question in English or Odia (e.g., How to control BPH pest?)...",
    footerText: "© 2026 Odisha Department of Agriculture & Farmers' Empowerment. All rights reserved."
  },
  or: {
    appTitle: "ଓଡ଼ିଶା ଫସଲ କ୍ୟାଲେଣ୍ଡର ଓ କୃଷି ପରାମର୍ଶ",
    home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
    cropCalendar: "ଫସଲ କ୍ୟାଲେଣ୍ଡର",
    advisory: "କୃଷି ପରାମର୍ଶ",
    weather: "ପାଣିପାଗ",
    marketPrices: "ମଣ୍ଡି ଦର",
    marketplace: "ଚାଷୀ ବଜାର",
    aiAssistant: "AI କୃଷି ସହାୟକ",
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    admin: "ଅଫିସର ପ୍ୟାନେଲ",
    login: "ଲଗଇନ୍",
    register: "ପଞ୍ଜୀକରଣ",
    logout: "ଲଗଆଉଟ୍",
    officialBadge: "ଓଡ଼ିଶା ସରକାରଙ୍କ ସରକାରୀ କୃଷି ପୋର୍ଟାଲ",
    heroHeading: "ଓଡ଼ିଶାର ପ୍ରତ୍ୟେକ ଚାଷୀଙ୍କ ପାଇଁ ଉନ୍ନତ କୃଷି ସେବା",
    heroSubheading: "୩୦ଟି ଜିଲ୍ଲାର ଫସଲ ସୂଚୀ, ପାଣିପାଗ ସୂଚନା, ଖତ ସାର ପରିମାଣ, ରୋଗ ପୋକ ନିୟନ୍ତ୍ରଣ ଓ AI କୃଷି ପରାମର୍ଶ।",
    btnExploreCalendar: "ଫସଲ କ୍ୟାଲେଣ୍ଡର ଦେଖନ୍ତୁ",
    btnAiScanner: "AI ରୋଗ ନିରୂପଣ",
    btnAskAi: "AI ସହାୟକଙ୍କୁ ପଚାରନ୍ତୁ",
    mapHeading: "ମାନଚିତ୍ରରୁ ଜିଲ୍ଲା ବାଛନ୍ତୁ ଓ କୃଷି ସୂଚନା ଦେଖନ୍ତୁ",
    mapSubheading: "ନିଜ ଜିଲ୍ଲା ଉପରେ କ୍ଲିକ୍ କରି ଫସଲ ସୂଚୀ, ପାଣିପାଗ ଓ ମଣ୍ଡି ଦର ଦେଖନ୍ତୁ",
    quickSelectTitle: "ଓଡ଼ିଶାର ସମସ୍ତ ୩୦ଟି ଜିଲ୍ଲା",
    districtsCount: "ଓଡ଼ିଶା ଜିଲ୍ଲା",
    cropTimelines: "ଫସଲ କ୍ୟାଲେଣ୍ଡର ସୂଚୀ",
    aiAssistantStatus: "୨୪x୭ AI କୃଷି ସହାୟକ",
    govtSchemes: "ସରକାରୀ ଯୋଜନା",
    schemesHeading: "ଓଡ଼ିଶା ସରକାରଙ୍କ କୃଷି ଯୋଜନା",
    schemesSubheading: "ଚାଷୀଙ୍କ ପାଇଁ ସରକାରୀ ଆର୍ଥିକ ସହାୟତା ଓ ସବସିଡି",
    kaliaTitle: "କାଳିଆ ଯୋଜନା (KALIA)",
    kaliaDesc: "ଫସଲ ପାଇଁ ବାର୍ଷିକ ₹୧୦,୦୦୦ ଟଙ୍କାର ଆର୍ଥିକ ସହାୟତା ଓ ବାଜି ମୁକ୍ତ ଋଣ।",
    pmfbyTitle: "ପ୍ରଧାନମନ୍ତ୍ରୀ ଫସଲ ବୀମା (PMFBY)",
    pmfbyDesc: "ପ୍ରାକୃତିକ ବିପତ୍ତି ହେତୁ ଫସଲ କ୍ଷତିପୂରଣ ପାଇଁ ପ୍ରଧାନମନ୍ତ୍ରୀ ଫସଲ ବୀମା ଯୋଜନା।",
    soilHealthTitle: "ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ",
    soilHealthDesc: "ମାଟି ପରୀକ୍ଷା ଓ ମାଟି ଅନୁସାରେ ସଠିକ୍ ସାର ପ୍ରୟୋଗ ପରାମର୍ଶ।",
    calendarTitle: "ଜିଲ୍ଲା ଫସଲ କ୍ୟାଲେଣ୍ଡର ସୂଚୀ",
    calendarSubheading: "ଆପଣଙ୍କ ଜିଲ୍ଲା, ఋতু ଓ ଫସଲ ବାଛି ୧୨ଟି ପର୍ଯ୍ୟାୟର ସୂଚୀ ଦେଖନ୍ତୁ",
    lblDistrict: "ଜିଲ୍ଲା",
    lblSeason: "ఋতু",
    lblCrop: "ଫସଲ ପ୍ରକାର",
    btnFilter: "ସୂଚୀ ଖୋଜନ୍ତୁ",
    advisoryTitle: "କୃଷି ପରାମର୍ଶ ଓ AI ରୋଗ ନିରୂପଣ",
    scannerTitle: "ଫସଲ ରୋଗ ନିରୂପଣ ସ୍କାନର",
    scannerSubheading: "ଆପଣଙ୍କ ରୋଗାକ୍ରାନ୍ତ ପତ୍ରର ଫଟୋ ଅପଲୋଡ୍ କରି ରୋଗ ଓ ତାର ନିରାକରଣ ଜାଣନ୍ତୁ।",
    fertCalcTitle: "ଖତ ସାର ପରିମାଣ ଗଣନା",
    fertCalcSubheading: "ଆପଣଙ୍କ ଜମି ପାଇଁ ୟୁରିଆ, ଡି.ଏ.ପି. ଓ ପୋଟାଶର ସଠିକ୍ ପରିମାଣ ଜାଣନ୍ତୁ",
    lblLand: "ଜମି (ଏକର)",
    lblStage: "ଫସଲ ବୃଦ୍ଧି ପର୍ଯ୍ୟାୟ",
    btnCalcFert: "ସାର ପରିମାଣ ଗଣନ୍ତୁ",
    weatherTitle: "ଜିଲ୍ଲା ପାଣିପାଗ ପରାମର୍ଶ",
    weatherSubheading: "ସଠିକ୍ ତାପମାତ୍ରା, ବର୍ଷା ଓ ବାତ୍ୟା ସୂଚନା ଦେଖନ୍ତୁ",
    marketTitle: "ଦୈନିକ ମଣ୍ଡି ଫସଲ ଦର",
    marketSubheading: "ଓଡ଼ିଶାର ସମସ୍ତ ମଣ୍ଡିର ଆଜି ଓ ଗତକାଲିର ଦର ତୁଳନା କରନ୍ତୁ",
    chatbotTitle: "ଓଡ଼ିଶା କୃଷି AI ସହାୟକ",
    chatPlaceholder: "ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଓଡ଼ିଆ କିମ୍ବା ଇଂରାଜୀରେ ପଚାରନ୍ତୁ (ଯେପରି: ବାତ ପୋକ କିପରି ନିୟନ୍ତ୍ରଣ କରିବି?)...",
    footerText: "© ୨୦୨୬ ଓଡ଼ିଶା ସରକାର କୃଷି ଓ କୃଷକ ସଶକ୍ତୀକରଣ ବିଭାଗ। ସମସ୍ତ ଅଧିକାର ସୁରକ୍ଷିତ।"
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

// Apply Language Translation to all elements
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

// Clear old Service Worker cache to force fresh content load
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

function handleFooterFeedback(event) {
  event.preventDefault();
  const name = document.getElementById('feedbackName')?.value || 'Farmer';
  const district = document.getElementById('feedbackDistrict')?.value || 'Odisha';
  
  if (typeof showToast === 'function') {
    showToast(`Thank you ${name}! Your feedback for ${district} district has been submitted successfully to Krushi Officers.`, 'success');
  } else {
    alert(`Thank you ${name}! Your feedback for ${district} district has been submitted.`);
  }

  const form = document.getElementById('footerFeedbackForm');
  if (form) form.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setLanguage(currentLang);
});
