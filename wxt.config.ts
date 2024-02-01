import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  publicDir: "public",
  srcDir: "src",
  entrypointsDir: "entrypoints",
  runner: {
    disabled: false
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
    ],
    define: {
      document: {},
    },
  })
});
