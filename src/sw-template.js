importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

registerRoute(
    new RegExp('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'),
    new CacheFirst()
);

registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'),
    new CacheFirst()
);

registerRoute( 
    ({ url }) => url.pathname.startsWith('/api/auth/renew'),
    new NetworkFirst()
);

registerRoute(
    ({ url }) => url.pathname.startsWith('/api/events'),
    new NetworkFirst()
);

//posteos offline
const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60
});

registerRoute(
    ({ url }) => url.pathname.startsWith('/api/events'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ],
    }),
    'POST'
);

registerRoute(
    ({ url }) => url.pathname.startsWith('/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ],
    }),
    'PUT'
);

registerRoute(
    ({ url }) => url.pathname.startsWith('/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ],
    }),
    'DELETE'
);