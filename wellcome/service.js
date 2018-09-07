var cacheName="v4";
var cacheList=['https://m.360buyimg.com/mobilecms/s220x220_jfs/t4609/82/3930097281/257779/31a2cad7/590a9282N051ca8c4.jpg!q70.jpg.dpg','./serviceWorker.html','./service.js'];

//装载缓存
self.addEventListener('install', function(event) {
    console.log('install.....');
    //缓存数据
    event.waitUntil(caches.open(cacheName).then(function(cache){
          return cache.addAll(cacheList)
    }));
});

//更新缓存
self.addEventListener('activate',function(event){
    console.log('activate.....');
    event.waitUntil(caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.map(function(caName){
             console.log(caName);
            if(caName!=cacheName){
              return caches.delete(caName)
            }
        })
      )
    }))
})

//拦截请求
self.addEventListener('fetch',function(event){
  console.log('fetch.....');
  event.respondWith(caches.match(event.request).catch(()=>{
    return fetch(event.request)
  }).then(function(res){
    if(res){
      caches.open(cacheName).then((cache)=>{
         cache.put(event.request,res);
      })
      return res.clone();
    }else{
      //如果res不存在则在发送在线请求
      return fetch(event.request)
    }
   }).catch(()=>{
     return caches.match('https://m.360buyimg.com/mobilecms/s220x220_jfs/t4609/82/3930097281/257779/31a2cad7/590a9282N051ca8c4.jpg!q70.jpg.dpg')
   }));

})
