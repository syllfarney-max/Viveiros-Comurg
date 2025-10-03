import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hosts liberados
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  preview: {
    port: 10000,
    allowedHosts: [
      "localhost",
      "viveiro-comurg-frontend.onrender.com",
      "viveiro-comurg-frontend-34cj.onrender.com",
      "viveiro-comurg-frontend-jrpv.onrender.com"
    ]
  }
})
