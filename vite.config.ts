import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  // GitHub Pages deployment - set base path to repo name
  base: process.env.GITHUB_PAGES === 'true' ? '/sindhi-cultural-soci/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
});
