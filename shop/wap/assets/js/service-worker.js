var cacheName = "myCache";

self.addEventListener('install', event => {
  even.waitUtil(caches.open(myCache).then((cache) => {
    // cache.addAll(['https://static.blogapi.top/assets/images/shop/iphone.jpg', 'https://static.blogapi.top/assets/images/shop/1.jpg'])
  }))
})

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => {
    if (response) {
      return response;
    }
    var requestToCache = event.request.clone(); //
    return fetch(requestToCache).then(response=>{
       if(!response||response.status!=200){
          return response;
       }
       var responseToCache  =response.clone();
        caches.open(myCache).then(cache=>{
          cache.put(requestToCache,responseToCache);
        })

         return response;
    })
  }))
})
