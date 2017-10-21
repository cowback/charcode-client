let cacheName = "climalerta-2";
let chacheFiles = [
	'./',
	'./favicon.ico',
	'./logo.png',
	'../src/assets/checkmark.png',
	'../src/assets/logo.png',
	'../src/assets/phone.png',
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches
			.open(cacheName)
			.then(function (cache) {
				return cache.addAll(chacheFiles);
			})
			.then(function () {
				return self.skipWaiting();
			})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== cacheName) return caches.delete(key);
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});

self.addEventListener('push', function(event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};
    if (event.data) {
        data = event.data.json();
    }
    var title = data.title;
    var message = data.message;
    var icon = "./logo.png";

    self.clickTarget = data.clickTarget;

    event.waitUntil(self.registration.showNotification(title, {
        body: message,
        tag: 'climalerta',
        icon: icon,
        badge: icon
    }));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    if(clients.openWindow){
        event.waitUntil(clients.openWindow(self.clickTarget));
    }
});
