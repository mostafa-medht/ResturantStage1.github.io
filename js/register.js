/* Set up service worker */
if ('serviceWorker' in navigator){
    // console.log('Service Worker supo');
    window.addEventListener('load',()=>{
        navigator.serviceWorker
            .register('../sw-cached-site.js')
            .then(reg=>console.log('Service Worker : Registered'))
            .catch(err=>console.log(`Service Worker : ${err}`))
    });
}