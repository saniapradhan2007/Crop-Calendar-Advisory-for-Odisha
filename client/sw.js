const CACHE_NAME = 'odisha-krushi-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/login.html',
  '/register.html',
  '/dashboard.html',
  '/crop-calendar.html',
  '/advisory.html',
  '/weather.html',
  '/market.html',
  '/chatbot.html',
  '/admin.html',
  '/css/style.css',
  '/css/responsive.css',
  '/js/app.js',
  '/js/auth.js',
  '/js/crop.js',
  '/js/weather.js',
  '/js/advisory.js',
  '/js/market.js',
  '/js/chatbot.js',
  '/js/dashboard.js',
  '/js/admin.js'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  if (evt.request.url.includes('/api/')) {
    return; // Don't cache dynamic API requests
  }
  evt.respondWith(
    caches.match(evt.request).then((cachedResponse) => {
      return cachedResponse || fetch(evt.request);
    })
  );
});
