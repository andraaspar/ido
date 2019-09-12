self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('v1').then(cache => {
			return cache.addAll([
				'./favicon.ico',
				'./index.html',
				'./logo192.png',
				'./logo512.png',
				'./manifest.json',
			])
		}),
	)
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(cacheResponse => {
			return (
				cacheResponse ||
				fetch(event.request).then(response => {
					return caches.open('v1').then(cache => {
						cache.put(event.request, response.clone())
						return response
					})
				})
			)
		}),
	)
})
