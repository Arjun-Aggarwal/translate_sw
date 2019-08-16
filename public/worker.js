// Flag for enabling cache in production
var doCache = true;
var CACHE_NAME = 'pwa-app-cache';
// Delete old caches
self.addEventListener('activate', event => {
  const currentCachelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!currentCachelist.includes(key)) {
            return caches.delete(key);
          }
        }))
      )
  );
});
// This triggers when user starts the app
self.addEventListener('install', function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
              const cacheFiles = [ 
                './',
                './index.html',
                '../src/assets/hindi-image.jpg',
              ];
              cache.addAll(cacheFiles);
        })
    );
  }
});
// Here we intercept request and serve up the matching files
self.addEventListener('fetch', function(event) {
  if (doCache) {
    console.log('[ServiceWorker] request:', event.request)
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          var fetchPromise = fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone())
            return networkResponse
          })
          return response || fetchPromise
        })
      })
    );
  }
});