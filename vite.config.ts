import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  envDir: './env/',
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    allowedHosts: ['.pedal-dashboard.com', 'localhost'],  
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
