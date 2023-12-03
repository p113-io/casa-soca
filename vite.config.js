// vite.config.js
import { splitVendorChunkPlugin } from "vite";
import glsl from "vite-plugin-glsl";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import Unfonts from "unplugin-fonts/vite";
/// <reference types="vite-plugin-svgr/client" />
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [glsl(), svgr(), Unfonts(), react()],
  assetsInclude: ["**/*.glb", "**/*.gltf"],
  optimizeDeps: {
    include: ["@mui/joy", "leva"],
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks: {
          // "Rain-CX9HP6Bc": ["build/assets/Rain-CX9HP6Bc.js"],
          // "Grass-Solll7qS": ["build/assets/Grass-Solll7qS.js"],
          // "react-three-fiber": [
          //  "build/assets/react-three-fiber.esm-tac8LlBS.js",
          // ],
          //"Scenes-Jq2JTKHy": ["build/assets/Scenes-Jq2JTKHy.js"],
        },
      },
    },
    chunkSizeWarningLimit: 500000,
  },
});
