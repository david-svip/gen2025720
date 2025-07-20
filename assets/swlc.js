const CACHE_NAME = 'my-pwa-cache-v1'
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/crud-data-list.json',
  '/images/logo.png',
  '/favicon.ico',
]

self.addEventListener('install',event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    if(StorageManager.estimate){
      StorageManager.estimate()
    }
    return cache.addAll(urlsToCache)
  }))
  self.skipWaiting();
})

self.addEventListener('fetch',event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request)
  }))
})

self.addEventListener('push', event => {
  const content = event.data.json() //{"title":"新通知1"}
  const payload = {
    title: '新通知',
    url:'https://www.google.com',
    body:`通知内容${Math.ceil(Math.random()*10000000000)}`
  };
  if(content){
    if(content.title){
      payload.title = content.title
    }
    if(content.url){
      payload.url = content.url
    }
    if(content.body){
      payload.body = content.body
    }
  }
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: '/icons/icon-192.png',
      data: {url: payload.url}
    })
  );
});

// 处理通知点击事件
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    
    })()
  );
});

self.addEventListener("message", (event) => {
  const payload = {
    body:'信息内容',
    url:'https://www.google.com'
  }
  event.waitUntil(
    self.registration.showNotification('Message', {
      body: payload.body,
      icon: '/icons/icon-192.png',
      data: {url:payload.url}
    })
  );
  self.skipWaiting();
});


