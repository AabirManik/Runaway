import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base is set via VITE_BASE env var (e.g. /Runaway/ for GitHub Pages project site),
// defaulting to '/' for local development.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE || '/',
})
