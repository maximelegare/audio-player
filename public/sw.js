if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-62f137f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next//static/media/hodei-logo-white.e31b59a2.svg",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next//static/media/musicNote.f9a50193.svg",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/a6cVkVQJ_wahnIhSJlcsI/_buildManifest.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/a6cVkVQJ_wahnIhSJlcsI/_middlewareManifest.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/a6cVkVQJ_wahnIhSJlcsI/_ssgManifest.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/434-9131028d3078539c.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/95b64a6e-aa8da01eaa7f9c43.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/framework-91d7f78b5b4003c8.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/main-8b135926397f10a5.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/pages/%5Bartist%5D-a85d98674ee76a70.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/pages/%5Bartist%5D/%5Balbum%5D-db0e90f96b1f4f39.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/pages/_app-f2dde1506d930b60.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/pages/albums-ccb6f1f68f2befe5.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/pages/artists-2584e57b40dc719a.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/pages/index-d581ca20d4cdcfd9.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/pages/playlists/%5Bplaylist%5D-8a75c29f84895570.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/pages/queue-18b8ac3d54c1d89f.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/pages/songs-dcf75367e9b14bf0.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/chunks/webpack-39cfd63b158336cc.js",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/css/3e5743829863ce78.css",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/css/ae325938949ec50c.css",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/css/b77de4304c3835ae.css",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/css/eae64e6286045ce6.css",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/css/ee148826cc79bacb.css",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/_next/static/css/ef46db3751d8e999.css",revision:"a6cVkVQJ_wahnIhSJlcsI"},{url:"/android-chrome-192x192.png",revision:"259237630a9186b147abd390edd65216"},{url:"/android-chrome-512x512.png",revision:"3db12a07d8ef53226a726df2c0580a94"},{url:"/apple-touch-icon.png",revision:"093c0eabf0b1b719fce647ffe5592efc"},{url:"/assets/SVG/hodei-logo-white.svg",revision:"fd5d139e863df04600fbc796b5d63996"},{url:"/assets/SVG/musicNote.svg",revision:"e94ce387e9bac5616c41aaebae085e34"},{url:"/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/favicon-16x16.png",revision:"d2c3056dfd81b4b959219e9a26fc63be"},{url:"/favicon-32x32.png",revision:"0cc4dacc243c945dc01d38e4a5ab3914"},{url:"/favicon.ico",revision:"940bead049935df6d7700ff8b66c2321"},{url:"/hodei-favicon.svg",revision:"573bc11b880054456fac99393eb67b3c"},{url:"/manifest.json",revision:"bac1b14906b3730b951e9e46a922eced"},{url:"/mstile-150x150.png",revision:"2c932109b4bd11abd9add844d7f6ff76"},{url:"/safari-pinned-tab.svg",revision:"4849ea39440b8d2e81acfe3d90d97f92"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
