if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>i(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-62f137f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next//static/media/hodei-logo-white.e31b59a2.svg",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next//static/media/hodei.bf164b34.svg",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next//static/media/liked.51f33cfd.svg",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next//static/media/musicNote.f9a50193.svg",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next//static/media/spotify.d613bdc2.svg",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/2U92U9eRrpD-Vdj44N7Xb/_buildManifest.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/2U92U9eRrpD-Vdj44N7Xb/_middlewareManifest.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/2U92U9eRrpD-Vdj44N7Xb/_ssgManifest.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/893-7315127b9c21f2d3.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/main-cea9d8f2943e647d.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/%5Bartist%5D-1281b1a8a60182e3.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/%5Bartist%5D/%5Balbum%5D-85592448852a5ce7.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/%5Bartist%5D/%5Balbum%5D/%5Bsong%5D-fa70954b130107d9.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/_app-024cecd11b62a312.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/_error-1995526792b513b2.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/albums-f26db7ecd7e11f08.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/artists-afcdd775fe90dbd8.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/index-93aec3cff3f0f868.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/liked-songs-0a8d72d9f8310490.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/login-e62094df5b5c6bd1.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/playlists/%5Bplaylist%5D-c81cdacc31a49786.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/queue-45e04255295f6ffe.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/pages/songs-bae188cd91834240.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/chunks/webpack-df4cf1c8d23aa877.js",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/css/0225d0398f506340.css",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/css/37b06b3adffe7de7.css",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/css/55a477189fbf23d2.css",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/css/a80863ed0223b4aa.css",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/css/aa5f62367c705ed4.css",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/_next/static/css/d0db78b8bd5f9d27.css",revision:"2U92U9eRrpD-Vdj44N7Xb"},{url:"/android-chrome-192x192.png",revision:"259237630a9186b147abd390edd65216"},{url:"/android-chrome-512x512.png",revision:"3db12a07d8ef53226a726df2c0580a94"},{url:"/apple-touch-icon.png",revision:"093c0eabf0b1b719fce647ffe5592efc"},{url:"/assets/SVG/hodei-logo-white.svg",revision:"fd5d139e863df04600fbc796b5d63996"},{url:"/assets/SVG/hodei.svg",revision:"9dc249e4fc163e60a6e337ed0b0f6193"},{url:"/assets/SVG/liked.svg",revision:"b5a6158f3af20263f0106fc38179e723"},{url:"/assets/SVG/musicNote.svg",revision:"e94ce387e9bac5616c41aaebae085e34"},{url:"/assets/SVG/random.svg",revision:"fd55c06cf0a7e896330950f0456b916f"},{url:"/assets/SVG/repeat.svg",revision:"0f65ca24d113c5014b8236ec13a0e5f3"},{url:"/assets/SVG/spotify.svg",revision:"671f65b3af3d027c558244b1a15cbc80"},{url:"/browserconfig.xml",revision:"68c9044fa4a08749efb85bb2a4edaede"},{url:"/favicon-16x16.png",revision:"d2c3056dfd81b4b959219e9a26fc63be"},{url:"/favicon-32x32.png",revision:"0cc4dacc243c945dc01d38e4a5ab3914"},{url:"/favicon.ico",revision:"940bead049935df6d7700ff8b66c2321"},{url:"/hodei-favicon.svg",revision:"573bc11b880054456fac99393eb67b3c"},{url:"/manifest.json",revision:"a15f2b71fb51864b78b5efcd7bfae0dd"},{url:"/mstile-150x150.png",revision:"2c932109b4bd11abd9add844d7f6ff76"},{url:"/safari-pinned-tab.svg",revision:"134e8d32f46c9b54f09e85c5a810dc39"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
