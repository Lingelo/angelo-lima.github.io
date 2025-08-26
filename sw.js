// Service Worker pour Angelo Lima - Performance et Cache
const CACHE_NAME = 'angelo-lima-v3';
const OFFLINE_PAGE = '/offline/';

// Assets critiques à mettre en cache
const CRITICAL_ASSETS = [
  '/',
  '/offline/',
  '/assets/css/dark-theme.css',
  '/assets/js/canonical-enforcement.js',
  '/assets/js/image-optimization.js',
  '/assets/img/avatar-icon.png'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Ajouter les assets un par un avec gestion d'erreurs
        return Promise.allSettled(
          CRITICAL_ASSETS.map(asset => 
            cache.add(asset).catch(error => {
              console.warn(`Failed to cache ${asset}:`, error);
              return null;
            })
          )
        );
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker installation failed:', error);
      })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Stratégie de cache : Network First pour le HTML, Cache First pour les assets
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Ignorer les requêtes non-GET et externes
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      // Network First pour les pages HTML
      if (request.headers.get('accept').includes('text/html')) {
        return fetch(request)
          .then(response => {
            // Mettre en cache la réponse si elle est valide
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Fallback vers le cache ou page offline
            return cache.match(request)
              .then(cachedResponse => cachedResponse || cache.match(OFFLINE_PAGE));
          });
      }
      
      // Cache First pour les assets (CSS, JS, images)
      return cache.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // Mise à jour en arrière-plan si l'asset a plus d'1 heure
            const cacheTime = new Date(cachedResponse.headers.get('date')).getTime();
            const now = Date.now();
            if (now - cacheTime > 3600000) { // 1 heure
              fetch(request).then(response => {
                if (response.status === 200) {
                  cache.put(request, response.clone());
                }
              }).catch(() => {}); // Ignore les erreurs de mise à jour
            }
            return cachedResponse;
          }
          
          // Sinon, récupérer depuis le réseau et mettre en cache
          return fetch(request).then(response => {
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          });
        });
    })
  );
});