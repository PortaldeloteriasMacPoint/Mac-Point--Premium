const cacheName = 'macpoint-cache-v5'; // Atualize esse número sempre que fizer mudanças
const filesToCache = [
  './index.html',
  './mac.html',
  './macpoint-principal.html'
];

self.addEventListener('install', e => {
  self.skipWaiting(); // força ativação imediata do SW novo
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
  self.clients.claim(); // força atualização nas abas abertas
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
