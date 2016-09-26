const cacheId = 'blitzprog.org-v1'
const cachePaths = [
	'/',
	'/styles.css',
	'/scripts.js'
]

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(cacheId).then(cache => cache.addAll(cachePaths))
	)
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(cachedResponse => {
			// Serve cached response if available.
			if(cachedResponse)
				return cachedResponse

			// If not, fetch the resource...
			return fetch(event.request).then(response => {
				/// ...and save it in the cache.
				caches.open(cacheId).then(cache => {
					cache.put(event.request, response)
				})

				// Return the response immediately.
				return response
			})
		})
	)
})