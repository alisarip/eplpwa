const CACHE_NAME = 'EPLPWA-v1'
const urlsToCache = [
    '/',
    '/manifest.json',
    '/index.html',
    '/nav.html',
    '/pages/home.html',
    '/pages/teams.html',
    '/pages/favourite.html',
    '/pages/contact.html',
    '/images/icon.png',
    '/images/icon128.png',
    '/images/icon144.png',
    '/images/icon192.png',
    '/images/icon192x192.png',
    '/images/icon256.png',
    '/images/icon512.png',
    '/images/icon72.png',
    '/images/icon96.png',
    '/js/idb.js',
    '/css/materialize.min.css',
    '/js/main.js',
    '/js/materialize.min.js',
    '/js/api.js',
    '/js/nav.js',
    '/js/page.js',
    '/js/db.js',
    '/js/listener.js',
    '/js/app.js',
    '/service-worker.js',
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    )
    self.skipWaiting();
})
self.addEventListener('fetch', event => {
    let base_url = 'https://api.football-data.org/'
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME)
            .then(cache => {
                return fetch(event.request)
                    .then(response => {
                        cache.put(event.request.url, response.clone())
                        return response
                    })
            })
        )
    } else {
        event.respondWith(
            caches
            .match(event.request, {
                cacheName: CACHE_NAME
            }).then(response => {
                if (response) {
                    return response
                }
                return fetch(event.request)
            })
        )
    }
})
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
        .then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if (cacheName != CACHE_NAME && cacheName.startsWith('EPLPWA-V1')) {
                    console.log('Delete Older Cache : ', cacheName)
                    return caches.delete(cacheName)
                }
            })
        ))
    )
})
self.addEventListener('push', event => {
    let body
    event.data ? body = event.data.text() : body = 'No Payload'
    const options = {
        body: body,
        icon: '/images/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})