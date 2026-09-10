import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/ats': 'http://127.0.0.1:8000',
      '/auth': 'http://127.0.0.1:8000',
      '/resume': 'http://127.0.0.1:8000',
    }
  },
  preview: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/ats': 'http://127.0.0.1:8000',
      '/auth': 'http://127.0.0.1:8000',
      '/resume': 'http://127.0.0.1:8000',
    }
  },
  build: {
    outDir: 'dist',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})