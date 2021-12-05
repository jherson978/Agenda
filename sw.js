const CACHE = "app-cache";
const urlsToCache = [
  "index.html",
  "acabados.html",
  "agregar.html",
  "css/general.css",
  "css/index.css",
  "css/acabados.css",
  "css/agregar.css",
  "js/index.js",
  "js/acabados.js",
  "js/agregar.js",
  "js/citas.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log("Cache opened");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      return (
        r ||
        fetch(e.request).then((response) => {
          return caches.open(CACHE).then((cache) => {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
self.addEventListener("activate", (event) => {});
