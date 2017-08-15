/* globals caches: true, self: true */

const CACHE_NAME = 'derrickshowers-v0.0.3';
const urlsToCache = [
  '/',
  '/css/main.css',
  '/main.js'
];

self.addEventListener('install', function(event) {
  console.log('Service worker installed');
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(urlsToCache);
  }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // Cache hit - return response
    if (response) {
      return response;
    }

    // IMPORTANT: Clone the request. A request is a stream and
    // can only be consumed once. Since we are consuming this
    // once by cache and once by the browser for fetch, we need
    // to clone the response
    let fetchRequest = event.request.clone();

    return fetch(fetchRequest).catch(() => {
      // Send postMessage that we're offline
      self.clients.matchAll().then(function(clients) {
        clients.forEach(function(client) {
          client.postMessage({ offline: true });
        });
      });
    });
  }));
});
