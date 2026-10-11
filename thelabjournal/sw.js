/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-f0c192c2'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "manifest.webmanifest",
    "revision": "945960e92a6daf139838263934a1a4b5"
  }, {
    "url": "index.html",
    "revision": "63ee1c2b03ee6296ccd513ba6e2590ba"
  }, {
    "url": "favicon.svg",
    "revision": "a8931b756400ec35f5e6b86bd48f46f6"
  }, {
    "url": "icons/icon-maskable-512.png",
    "revision": "c9edcfb30ce29ecef7bdf85f36a4a05d"
  }, {
    "url": "icons/icon-512.png",
    "revision": "8684b38f79833177a8d3709381bddf12"
  }, {
    "url": "icons/icon-192.png",
    "revision": "e10f6d522e23656a8f34a3b7effec00f"
  }, {
    "url": "icons/apple-touch-icon.png",
    "revision": "f1e6874ab696eecf53464c6646cb0f6e"
  }, {
    "url": "assets/workbox-window.prod.es5-BBnX5xw4.js",
    "revision": null
  }, {
    "url": "assets/WindowedPane-AZrdcgRh.js",
    "revision": null
  }, {
    "url": "assets/WindowedArchive-fZSnR8Nm.js",
    "revision": null
  }, {
    "url": "assets/MobileNavigator-DQOWqsBj.js",
    "revision": null
  }, {
    "url": "assets/index-CxIatNiF.js",
    "revision": null
  }, {
    "url": "assets/index-BwJIaSck.js",
    "revision": null
  }, {
    "url": "assets/index-BUfu8c-9.css",
    "revision": null
  }, {
    "url": "favicon.svg",
    "revision": "a8931b756400ec35f5e6b86bd48f46f6"
  }, {
    "url": "icons/apple-touch-icon.png",
    "revision": "f1e6874ab696eecf53464c6646cb0f6e"
  }, {
    "url": "icons/icon-192.png",
    "revision": "e10f6d522e23656a8f34a3b7effec00f"
  }, {
    "url": "icons/icon-512.png",
    "revision": "8684b38f79833177a8d3709381bddf12"
  }, {
    "url": "icons/icon-maskable-512.png",
    "revision": "c9edcfb30ce29ecef7bdf85f36a4a05d"
  }, {
    "url": "manifest.webmanifest",
    "revision": "945960e92a6daf139838263934a1a4b5"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/api(?:\/|$)/]
  }));

}));
