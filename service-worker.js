const CACHE_NAME = "17po-online-v0.4.32";
const APP_SHELL = [
  "./",
  "./index.html",
  "./assets/audio/tanyao_bgm.mp3",
  "./assets/audio/kamiwaza_bgm.mp3",
  "./assets/audio/confirm.wav",
  "./assets/audio/deselect.wav",
  "./assets/audio/discard.wav",
  "./assets/audio/ron.wav",
  "./assets/audio/select.wav",
  "./assets/honors/C.jpg",
  "./assets/honors/E.jpg",
  "./assets/honors/F.jpg",
  "./assets/honors/N.jpg",
  "./assets/honors/P.jpg",
  "./assets/honors/S.jpg",
  "./assets/honors/W.jpg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/manzu/1m.jpg",
  "./assets/manzu/2m.jpg",
  "./assets/manzu/3m.jpg",
  "./assets/manzu/4m.jpg",
  "./assets/manzu/5m.jpg",
  "./assets/manzu/6m.jpg",
  "./assets/manzu/7m.jpg",
  "./assets/manzu/8m.jpg",
  "./assets/manzu/9m.jpg",
  "./assets/pinzu/1p.jpg",
  "./assets/pinzu/2p.jpg",
  "./assets/pinzu/3p.jpg",
  "./assets/pinzu/4p.jpg",
  "./assets/pinzu/5p.jpg",
  "./assets/pinzu/6p.jpg",
  "./assets/pinzu/7p.jpg",
  "./assets/pinzu/8p.jpg",
  "./assets/pinzu/9p.jpg",
  "./assets/souzu/1s.jpg",
  "./assets/souzu/2s.jpg",
  "./assets/souzu/3s.jpg",
  "./assets/souzu/4s.jpg",
  "./assets/souzu/5s.jpg",
  "./assets/souzu/6s.jpg",
  "./assets/souzu/7s.jpg",
  "./assets/souzu/8s.jpg",
  "./assets/souzu/9s.jpg",
  "./manifest.json",
  "./script.js",
  "./style.css"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith("17po-online-") && key !== CACHE_NAME)
            .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Navigation: try latest page online first, fall back to cached app.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Static assets: cache first, then refresh in background.
  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);

      return cached || network;
    })
  );
});
