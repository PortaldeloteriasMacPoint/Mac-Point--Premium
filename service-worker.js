const cacheName = 'macpoint-cache-v4';
const filesToCache = [
  './index.html',
  './macmac.html',
  './macpoint-principal.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        caches.open(cacheName).then(cache => cache.put(e.request, response.clone()));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});

