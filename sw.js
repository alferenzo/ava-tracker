const CACHE_NAME = "ava-care-cache-v1";
const urlsToCache = [
  "./Index.html",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// THIS FETCH LISTENER IS MANDATORY FOR ANDROID TO TREAT IT AS A REAL APP
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return from cache
        }
        return fetch(event.request); // Or fetch from network
      })
  );
});
