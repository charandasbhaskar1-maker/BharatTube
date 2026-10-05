const CACHE_NAME = 'bharattube-v1';
const ASSETS_TO_CACHE = [
  './assets/css/global.css',
  './assets/css/components.css',
  './assets/js/app-state.js',
  './assets/js/icons.js',
  './assets/js/ui-kit.js',
  './assets/icons/bharattube-logo.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
