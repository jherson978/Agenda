const CACHE = "app-cache";
const urlsToCache = ["index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log("Cache opened");
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", (event) => {});
self.addEventListener("activate", (event) => {});
