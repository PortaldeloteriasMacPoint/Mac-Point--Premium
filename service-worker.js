// service-worker.js
const cacheName = 'macpoint-cache-v1';
const filesToCache = [
  './',
  './index.html',
  './macpoint.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
