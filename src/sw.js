const cacheName = 'my-todo-cache';
const isExcluded = f => /hot-update|sockjs/.test(f);

let filesToCache = [];
// eslint-disable-next-line no-undef
filesToCache = [
  // eslint-disable-next-line no-undef
  ...serviceWorkerOption.assets.filter(file => !isExcluded(file)),
  '/',
  'https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/superhero/bootstrap.min.css',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
];

const updateCache = (request, response) =>
  caches
    .open(cacheName)
    .then(cache => cache.put(request, response));

// eslint-disable-next-line arrow-parens
async function fetchFromNetwork(request) {
  // eslint-disable-next-line no-new
  return new Promise((resolve, reject) => {
    fetch(request)
      .then(
        // eslint-disable-next-line consistent-return
        (response) => {
          if (!isExcluded(request.url) && response) {
            updateCache(request, response.clone()).then(() => resolve(response));
          } else {
            resolve(response);
          }
        },
        reject,
      );
  });
}

const fetchFromCache = request => caches.match(request).then(response => response || Promise.reject('failed'));

const preCache = () =>
  caches.open(cacheName)
    .then((cache) => {
      cache.addAll(filesToCache);
    }).catch(
      error => console.log(error),
    );

self.addEventListener('install', (event) => {
  event.waitUntil(preCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetchFromNetwork(event.request).catch(() => fetchFromCache(event.request)),
  );
});

