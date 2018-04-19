/* global caches self URL fetch */

const r = '__root'.replace(/\/$/, '')
const assets = [
  //
  r,
  r + '/',
  '/index.html',
  '/index.js',
]

const assetCacheKey = assets.join('-').replace(/\//g, '')

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(assetCacheKey)
      .then(cache => cache.addAll(assets))
      .catch(err => console.error(err))
  )
})

self.addEventListener('activate', event => {
  const whiteList = [assetCacheKey]

  event.waitUntil(
    // get the currently cached files, remove the one that are out of date
    caches
      .keys()
      .then(cacheKeys => {
        Promise.all(
          cacheKeys.map(key => !whiteList.includes(key) && caches.delete(key))
        )
      })
      .catch(err => console.error(err))
  )
})

const cacheFirstStrategy = cacheName => async request => {
  const resFromCache = await caches.match(request)

  if (resFromCache) return resFromCache

  const resFromFetch = await fetch(request.clone())

  const cache = await caches.open(cacheName)

  cache.put(request, resFromFetch.clone())

  return resFromFetch
}

const networkFirstStrategy = cacheName => request =>
  fetch(request.clone())
    .then(async resFromFetch => {
      const cache = await caches.open(cacheName)

      cache.put(request, resFromFetch.clone())

      return resFromFetch
    })
    .catch(async err => {
      const resFromCache = await caches.match(request)

      return resFromCache || Promise.reject(err)
    })

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return

  const requestURL = new URL(event.request.url)

  if (assets.includes(requestURL.pathname))
    // cached as asset
    return event.respondWith(caches.match(event.request))
})
