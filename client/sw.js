const CACHE_NAME = 'odisha-krushi-v2';

self.addEventListener('install', (evt) => {
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Network-first strategy for fresh HTML and static assets
self.addEventListener('fetch', (evt) => {
  if (evt.request.url.includes('/api/')) {
    return;
  }
  evt.respondWith(
    fetch(evt.request).catch(() => caches.match(evt.request))
  );
});
