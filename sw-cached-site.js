const cacheName = 'v2';


// Call Install Function
self.addEventListener('install',e=>{
    console.log('Installed');
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
self.addEventListener('fetch', e=>{
    e.respondWith(
        fetch(e.request)
        .then(res=>{
            // Make copy clone of response
            const resClone = res.clone();
            // Open Cache
            caches
                .open(cacheName)
                .then(cache=>{
                    // Add resposne to the cache
                    cache.put(e.request,resClone);
                });
                return res;
        }).catch(err=>caches.match(e.request).then(res=>res))
    )
})