const cacheName = 'v1';

const cacheAssets = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img/',
    '/js/register.js',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500'

]

// Call Install Function
self.addEventListener('install',e=>{
    console.log('Installed');

    e.waitUntil(
        caches.open(cacheName)
        .then(cache=>{
            console.log('Service Worker : Caching');
            cache.addAll(cacheAssets);
        })
        .then(()=>self.skipWaiting())
    );
});

// Call Activator Function

self.addEventListener('activate',e=>{
    console.log('activated');
    // Remove Unwanted caches 
    e.waitUntil(
        caches.keys().then(cacheName =>{
            return Promise.all(
                cacheName.map(cache=>{
                    if (cache != cacheName){
                        console.log('Clearing old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});


//Call Fetch Event 
// self.addEventListener('fetch', e=>{
//     e.respondWith(
//         fetch(e.request).catch(()=>caches.match(e.request))
//     )
// })


self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });