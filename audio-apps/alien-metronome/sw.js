const CACHE_NAME = 'alien-metronome-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './Alien Metronome no BG.png',
  './Alien Metronome.png',
  './aldebaran-s-uXchDIKs4qI-unsplash (1).jpg',
  './aldebaran-s-uXchDIKs4qI-unsplash.jpg',
  './wikiimages-christmas-background-11107_1920.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    }).catch(function(err) {
      console.warn('[SW] cache addAll failed:', err);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
          .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // Skip non-GET requests and cross-origin fetches
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request).then(function(networkResponse) {
        // Optionally cache successful same-origin GETs
        return networkResponse;
      }).catch(function() {
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
