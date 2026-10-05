// Bei jeder Änderung an index.html die Versionsnummer erhöhen (hier UND in index.html bei "v2.0")!
const CACHE = "evak-2.0";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "logo.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request).catch(() => caches.match("index.html")))
  );
});
