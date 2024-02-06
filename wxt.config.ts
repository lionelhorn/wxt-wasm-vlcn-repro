import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";
import { copyFile } from "node:fs/promises";

// See https://wxt.dev/api/config.html
export default defineConfig({
  publicDir: "public",
  srcDir: "src",
  entrypointsDir: "entrypoints",
  runner: {
    disabled: false
  },
  hooks: {
    build: {
      async done() {
        await copyFile("./node_modules/@vlcn.io/crsqlite-wasm/dist/crsqlite.wasm", "./.output/chrome-mv3/crsqlite.wasm");
      }
    }
  },
  manifest: {
    "host_permissions": [
      "https://*/*",
      "file://*/*"
    ],
    "permissions": [
      "scripting",
      "tabs",
      "declarativeNetRequest",
      "declarativeNetRequestFeedback",
      "browsingData",
      "webNavigation"
    ],
    "content_security_policy": {
      "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self' 'wasm-unsafe-eval'; worker-src 'self' 'wasm-unsafe-eval';"
    },
  },
  vite: () => ({
    plugins: [
      react(),
    ]
  })
});
