var cacheName = 'Color-Selector';
var filesToCache = [
  '',
 'index.html',
 'main.js', 
 'MyfunctionsLib.js',
 'jquery3.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("caches")
      self.clients.claim();
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

//console.log(self.cleints);

//git Serve fetch content when offline 
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener("activate",()=>{
  console.log("PWA activated");
});

