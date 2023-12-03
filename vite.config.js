import { splitVendorChunkPlugin } from 'vite'
import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
import Unfonts from 'unplugin-fonts/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    glsl(),
    svgr(),
    Unfonts(), 
    react()
  ],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    outDir: 'build',
  }
})
