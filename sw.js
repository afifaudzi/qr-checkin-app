/*
 * Simple service worker to provide offline‑first behaviour.
 * It caches the core application shell so that the app continues to
 * operate when the network is unavailable. When a resource is
 * requested it is served from the cache if available, otherwise it
 * falls back to the network.
 */

const CACHE_NAME = 'qr-event-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/admin.html',
  '/scan.html',
  '/style.css',
  '/manifest.json'
];

self.addEventListener('install', event => {
  // Precache the application shell on install.
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', event => {
  // Serve cached content when available, otherwise fetch from network.
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});