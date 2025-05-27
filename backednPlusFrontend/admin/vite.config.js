import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',     // Allows access from LAN devices (like your phone)
    port: 5173,           // You can change this to any available port
    open: true,           // Automatically opens in browser
    strictPort: true      // Fails if the port is already in use
  }
})
