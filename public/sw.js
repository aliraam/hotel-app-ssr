self.addEventListener("install", event => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open("app-cache").then(cache => {
      return cache.addAll(["/", "/manifest.json"]).catch(err => console.error("Cache failed:", err));
    }),
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // 🚨 Bypass API requests (do not cache API calls)
  if (url.origin === "http://localhost:3001") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then(networkResponse => {
          // Clone response so we can store it in cache and return it
          let responseClone = networkResponse.clone();
          caches.open("app-cache").then(cache => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })
        .catch(error => {
          console.error("Fetch failed:", event.request.url, error);
          return new Response(`<h1>Offline Mode</h1><p>This content is unavailable offline.</p>`, {
            headers: { "Content-Type": "text/html" },
          });
        });
    }),
  );
});

self.addEventListener("activate", event => {
  console.log("Service Worker activated.");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== "app-cache") {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});
